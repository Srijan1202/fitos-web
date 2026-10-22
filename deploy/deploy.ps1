<#
.SYNOPSIS
  Build the FITOS website and publish it (and, with -Apk, the APK) to AWS.

.DESCRIPTION
  1. pnpm build (unless -SkipBuild) -> out/
  2. out/ to the bucket: pages revalidated on every visit, hashed assets
     cached for a year; files no longer in out/ are removed (not downloads/).
  3. -Apk: uploads the APK to downloads/<its file name>; the name must be
     the one in src/site.ts, so the download button never points at nothing.
  4. A CloudFront invalidation, then a check that the APK the site links to
     is in the bucket.

.EXAMPLE
  .\deploy\deploy.ps1 -Apk "$HOME\Downloads\fitos-beta-1.0.0-beta.3-6-cfe8aca-api.tryfitos.me.apk"
  .\deploy\deploy.ps1            # the site only
#>
[CmdletBinding()]
param(
  [string]$Apk,
  [string]$AwsProfileName = 'fitos',
  [switch]$SkipBuild
)
. (Join-Path $PSScriptRoot 'common.ps1')
Initialize-Aws $AwsProfileName
$o = Get-StackOutputs
$bucket = "s3://$($o.BucketName)"

# The APK the site links to (src/site.ts).
$siteTs = Get-Content (Join-Path $script:Root 'src\site.ts') -Raw
if ($siteTs -notmatch "const apkFile = '([^']+)'") { throw 'src/site.ts has no apkFile.' }
$linked = $Matches[1]
if ($Apk) {
  $name = Split-Path $Apk -Leaf
  if ($name -ne $linked) { throw "The APK is $name but src/site.ts links $linked. Update site.ts (file, size, sha256) first." }
  $sha = (Get-FileHash $Apk -Algorithm SHA256).Hash.ToLower()
  if ($siteTs -notmatch [regex]::Escape($sha)) { throw "The APK's SHA-256 ($sha) is not the one in src/site.ts." }
}

Push-Location $script:Root
try {
  if (-not $SkipBuild) {
    Write-Host '1. build'
    & pnpm build
    if ($LASTEXITCODE -ne 0) { throw 'The build failed.' }
  }
  Write-Host "2. upload to $bucket"
  Invoke-Aws s3 sync out $bucket --delete --exclude 'downloads/*' --exclude '_next/static/*' `
    --cache-control 'public, max-age=0, must-revalidate' | Out-Null
  Invoke-Aws s3 sync out/_next/static "$bucket/_next/static" `
    --cache-control 'public, max-age=31536000, immutable' | Out-Null

  if ($Apk) {
    Write-Host "3. APK -> downloads/$linked"
    Invoke-Aws s3 cp $Apk "$bucket/downloads/$linked" --content-type 'application/vnd.android.package-archive' `
      --content-disposition "attachment; filename=`"$linked`"" --cache-control 'public, max-age=31536000, immutable' | Out-Null
  }

  Write-Host '4. invalidate CloudFront'
  Invoke-Aws cloudfront create-invalidation --distribution-id $o.DistributionId --paths '/*' --query 'Invalidation.Id' --output text | Out-Null

  $previous = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  & aws s3api head-object --bucket $o.BucketName --key "downloads/$linked" --profile $script:AwsProfile --region $script:Region *> $null
  $present = $LASTEXITCODE -eq 0
  $ErrorActionPreference = $previous
  if ($present) { Write-Host "   the linked APK is in place: downloads/$linked" }
  else { Write-Host "   WARNING: downloads/$linked is not in the bucket; the download button will 404. Run again with -Apk." -ForegroundColor Red }
  Write-Host "Published to https://$((Get-Content (Join-Path $script:Root 'src\site.ts') -Raw) -replace '(?s).*url: ''https://([^'']+)''.*', '$1')/ (via $($o.DistributionDomainName))"
} finally {
  Pop-Location
}
