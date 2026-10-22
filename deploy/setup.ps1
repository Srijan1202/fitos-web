<#
.SYNOPSIS
  One-time setup of the FITOS website on AWS (us-east-1), in two runs.

.DESCRIPTION
  Run 1 requests the HTTPS certificate for the domain and www and prints the
  two DNS records that prove you own the domain: add them at Namecheap.
  Run it again: once the certificate is issued it creates (or updates) the
  CloudFormation stack deploy/website.yaml and prints the two records that
  point the domain at CloudFront. Then deploy.ps1 uploads the site.

.EXAMPLE
  .\deploy\setup.ps1
#>
[CmdletBinding()]
param(
  [string]$AwsProfileName = 'fitos',
  [string]$DomainName = 'tryfitos.me'
)
. (Join-Path $PSScriptRoot 'common.ps1')
Initialize-Aws $AwsProfileName

# 1. The certificate: reuse one for this domain, or request it.
$certs = Invoke-Aws acm list-certificates --certificate-statuses PENDING_VALIDATION ISSUED --output json | ConvertFrom-Json
$cert = $certs.CertificateSummaryList | Where-Object { $_.DomainName -eq $DomainName } | Select-Object -First 1
if ($null -eq $cert) {
  $arn = Invoke-Aws acm request-certificate --domain-name $DomainName --subject-alternative-names "www.$DomainName" `
    --validation-method DNS --idempotency-token fitossite --tags Key=project,Value=fitos --query CertificateArn --output text
  Write-Host "Requested a certificate: $arn"
  Start-Sleep -Seconds 10
} else {
  $arn = $cert.CertificateArn
}
$detail = (Invoke-Aws acm describe-certificate --certificate-arn $arn --output json | ConvertFrom-Json).Certificate
if ($detail.Status -ne 'ISSUED') {
  Write-Host "`nThe certificate is $($detail.Status). At Namecheap (Domain List -> tryfitos.me -> Advanced DNS) add:" -ForegroundColor Yellow
  $seen = @{}
  foreach ($v in $detail.DomainValidationOptions) {
    $r = $v.ResourceRecord
    if ($null -eq $r -or $seen.ContainsKey($r.Name)) { continue }
    $seen[$r.Name] = $true
    $hostPart = $r.Name.TrimEnd('.') -replace "\.$([regex]::Escape($DomainName))$", ''
    Write-Host ("  CNAME  host: {0}  value: {1}" -f $hostPart, $r.Value.TrimEnd('.'))
  }
  Write-Host "`nThen run this script again (validation usually takes a few minutes after the records exist)."
  exit 0
}
Write-Host "Certificate issued: $arn"

# 2. The stack.
$template = Join-Path $PSScriptRoot 'website.yaml'
Write-Host "Deploying stack $script:Stack ..."
$previous = $ErrorActionPreference
$ErrorActionPreference = 'Continue'
$out = & aws cloudformation deploy --stack-name $script:Stack --template-file $template `
  --parameter-overrides "DomainName=$DomainName" "CertificateArn=$arn" `
  --tags project=fitos --no-fail-on-empty-changeset --profile $script:AwsProfile --region $script:Region 2>&1
$code = $LASTEXITCODE
$ErrorActionPreference = $previous
$out | ForEach-Object { Write-Host "  $_" }
if ($code -ne 0) { throw "The stack did not deploy ($code)." }

$o = Get-StackOutputs
Write-Host "`nBucket: $($o.BucketName)  Distribution: $($o.DistributionId)"
Write-Host "Point the domain at CloudFront. At Namecheap, replace the current @ and www records with:" -ForegroundColor Yellow
Write-Host "  ALIAS  host: @    value: $($o.DistributionDomainName)"
Write-Host "  CNAME  host: www  value: $($o.DistributionDomainName)"
Write-Host "Keep the api record (api -> the server) as it is. Then run .\deploy\deploy.ps1 -Apk <path to the APK>."
