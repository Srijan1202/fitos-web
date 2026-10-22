<#
.SYNOPSIS
  Build the FITOS website and publish it (and, with -Apk, the APK) on the
  FITOS server, where Caddy serves it with HTTPS beside api.tryfitos.me.

.DESCRIPTION
  No CloudFront (that path, for later, is deploy/cloudfront/). In order,
  stopping at the first failure while the site that is serving keeps serving:

    1. pnpm build (unless -SkipBuild) -> out/, then one archive of it;
    2. the archive (and the APK) to the private transfer bucket (stack
       fitos-website-transfer, created on the first run), with 15-minute links;
    3. on the server, through Systems Manager, deploy/server/website.sh:
       download, SHA-256 checks, unpack, Caddy reload, HTTPS smoke, tidy;
    4. the transfer files deleted; public checks from this PC.

  Until tryfitos.me and www point at the server's Elastic IP, step 3 only
  puts the files in place and this prints the DNS records to set; run it
  again once they resolve.

.EXAMPLE
  .\deploy\deploy.ps1 -Apk "$HOME\Downloads\fitos-beta-1.0.0-beta.3-6-cfe8aca-api.tryfitos.me.apk"
  .\deploy\deploy.ps1            # the site only (the APK already on the server)
#>
[CmdletBinding()]
param(
  [string]$Apk,
  [string]$AwsProfileName = 'fitos',
  [string]$Region = 'ap-south-1',
  [string]$ServerStack = 'fitos-beta',
  [switch]$SkipBuild
)
. (Join-Path $PSScriptRoot 'common.ps1')
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Initialize-Aws $AwsProfileName $Region
$server = Get-StackOutputs $ServerStack

# The domain and the APK the site links to (src/site.ts).
$siteTs = Get-Content (Join-Path $script:Root 'src\site.ts') -Raw
if ($siteTs -notmatch "url: 'https://([a-z0-9.-]+)'") { throw 'src/site.ts has no url.' }
$domain = $Matches[1]
if ($siteTs -notmatch "const apkFile = '([^']+)'") { throw 'src/site.ts has no apkFile.' }
$linked = $Matches[1]
if ($Apk) {
  $name = Split-Path $Apk -Leaf
  if ($name -ne $linked) { throw "The APK is $name but src/site.ts links $linked. Update site.ts (file, size, sha256) first." }
  $apkSha = (Get-FileHash $Apk -Algorithm SHA256).Hash.ToLower()
  if ($siteTs -notmatch [regex]::Escape($apkSha)) { throw "The APK's SHA-256 ($apkSha) is not the one in src/site.ts." }
}

# Does the domain point at the server? (Caddy can only get a certificate then.)
function Get-ARecords([string]$Name) {
  try { @(Resolve-DnsName $Name -Type A -Server 1.1.1.1 -DnsOnly -ErrorAction Stop | Where-Object { $_.Section -eq 'Answer' -and $_.Type -eq 'A' } | ForEach-Object { $_.IPAddress }) }
  catch { @() }
}
$pointed = $true
foreach ($n in $domain, "www.$domain") {
  $a = Get-ARecords $n
  if ($a.Count -eq 0 -or @($a | Where-Object { $_ -ne $server.ElasticIp }).Count -gt 0) { $pointed = $false }
}

Push-Location $script:Root
try {
  if (-not $SkipBuild) {
    Write-Host '1. build'
    & pnpm build
    if ($LASTEXITCODE -ne 0) { throw 'The build failed.' }
  }
  if (-not (Test-Path 'out\index.html')) { throw 'out\index.html is missing: build first.' }
  $commit = (& git rev-parse --short=7 HEAD).Trim()
  $dirty = if (& git status --porcelain) { '-dirty' } else { '' }
  $release = "$((Get-Date).ToUniversalTime().ToString('yyyyMMddHHmmss'))-$commit$dirty"
  $archive = Join-Path $env:TEMP "fitos-site-$release.tar.gz"
  $tar = Join-Path $env:SystemRoot 'System32\tar.exe'
  if (-not (Test-Path $tar)) { $tar = 'tar' }
  & $tar -czf $archive -C out .
  if ($LASTEXITCODE -ne 0) { throw 'Packing out/ failed.' }
  $siteSha = (Get-FileHash $archive -Algorithm SHA256).Hash.ToLower()
  Write-Host "   release $release ($([math]::Round((Get-Item $archive).Length / 1KB)) KB)"

  Write-Host '2. transfer bucket'
  $previous = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  $cf = & aws cloudformation deploy --stack-name fitos-website-transfer --template-file (Join-Path $PSScriptRoot 'server\transfer.yaml') `
    --tags project=fitos --no-fail-on-empty-changeset --profile $script:AwsProfile --region $script:Region 2>&1
  $code = $LASTEXITCODE
  $ErrorActionPreference = $previous
  if ($code -ne 0) { throw "The transfer bucket did not deploy: $($cf -join "`n")" }
  $bucket = (Get-StackOutputs 'fitos-website-transfer').BucketName
  $prefix = "s3://$bucket/$release"
  Invoke-Aws s3 cp $archive "$prefix/site.tar.gz" --only-show-errors | Out-Null
  $siteUrl = Invoke-Aws s3 presign "$prefix/site.tar.gz" --expires-in 900
  $command = "/opt/fitos/website-bin/website.sh $domain $release '$siteUrl' $siteSha"
  if ($Apk) {
    Write-Host "   APK $linked"
    Invoke-Aws s3 cp $Apk "$prefix/$linked" --only-show-errors | Out-Null
    $apkUrl = Invoke-Aws s3 presign "$prefix/$linked" --expires-in 900
    $command += " --apk $linked '$apkUrl' $apkSha"
  }
  if (-not $pointed) { $command += ' --files-only' }

  Write-Host "3. on the server $($server.InstanceId)"
  try {
    Invoke-ServerScript $server.InstanceId $command | Out-Null
  } finally {
    Invoke-Aws s3 rm $prefix --recursive --only-show-errors | Out-Null
    Remove-Item $archive -ErrorAction SilentlyContinue
  }

  if (-not $pointed) {
    Write-Host "`nThe files are on the server, but $domain is not served yet: it does not point at the server." -ForegroundColor Yellow
    Write-Host 'At Namecheap (Domain List -> tryfitos.me -> Advanced DNS), replace the @ and www records (GitHub Pages) with:'
    Write-Host "  A      host: @    value: $($server.ElasticIp)"
    Write-Host "  CNAME  host: www  value: $domain"
    Write-Host 'Keep api and the two _acm validation CNAMEs. Then run this again (add -SkipBuild if nothing changed).'
    exit 0
  }

  Write-Host "4. public checks on https://$domain"
  function Get-Status([string]$Url, [string]$Method = 'GET') {
    $req = [Net.HttpWebRequest]::Create($Url)
    $req.Method = $Method
    $req.AllowAutoRedirect = $false
    $req.Timeout = 20000
    try { $res = $req.GetResponse() } catch [Net.WebException] { $res = $_.Exception.Response }
    if ($null -eq $res) { return 0 }
    $code = [int]$res.StatusCode
    $res.Close()
    return $code
  }
  $checks = @(
    @{ Url = "https://$domain/"; Want = 200 },
    @{ Url = "https://$domain/features/"; Want = 200 },
    @{ Url = "https://$domain/no-such-page/"; Want = 404 },
    @{ Url = "https://www.$domain/"; Want = 301 },
    @{ Url = "http://$domain/"; Want = 308 },
    @{ Url = "https://$domain/downloads/$linked"; Want = 200; Method = 'HEAD' }
  )
  $ok = $true
  foreach ($c in $checks) {
    $method = if ($c.Method) { $c.Method } else { 'GET' }
    $code = Get-Status $c.Url $method
    $mark = if ($code -eq $c.Want) { 'ok ' } else { $ok = $false; 'BAD' }
    Write-Host "  $mark $method $($c.Url) -> $code (want $($c.Want))"
  }
  if (-not $ok) { Write-Host 'A public check failed (the server-side smoke passed). If only the APK failed, run again with -Apk.' -ForegroundColor Red; exit 1 }
  Write-Host "Published $release at https://$domain/"
} finally {
  Pop-Location
}
