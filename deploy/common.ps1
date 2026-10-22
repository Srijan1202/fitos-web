<#
  Shared by setup.ps1 and deploy.ps1. Every call runs as the owner's AWS CLI
  profile (`aws login --profile fitos`): no access key is stored or passed.
#>
$ErrorActionPreference = 'Stop'
$script:Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$script:Stack = 'fitos-website'
$script:Region = 'us-east-1'

if (-not (Get-Command aws -ErrorAction SilentlyContinue)) {
  $cli = 'C:\Program Files\Amazon\AWSCLIV2'
  if (Test-Path "$cli\aws.exe") { $env:Path += ";$cli" } else { throw 'The AWS CLI is not installed.' }
}

function Invoke-Aws {
  param([Parameter(ValueFromRemainingArguments = $true)][string[]]$AwsArgs)
  $previous = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  try {
    $out = & aws @AwsArgs --profile $script:AwsProfile --region $script:Region 2>&1
    $code = $LASTEXITCODE
  } finally { $ErrorActionPreference = $previous }
  if ($code -ne 0) { throw "aws $($AwsArgs[0..1] -join ' ') failed ($code): $($out -join "`n")" }
  return ($out | Where-Object { $_ -is [string] }) -join "`n"
}

function Initialize-Aws([string]$ProfileName) {
  $script:AwsProfile = $ProfileName
  try {
    $id = Invoke-Aws sts get-caller-identity --output json | ConvertFrom-Json
  } catch {
    throw "Not signed in to AWS as '$ProfileName'. Run: aws login --profile $ProfileName"
  }
  Write-Host "AWS account $($id.Account) as $($id.Arn) ($script:Region)"
}

function Get-StackOutputs {
  $json = Invoke-Aws cloudformation describe-stacks --stack-name $script:Stack --query 'Stacks[0].Outputs' --output json
  $map = @{}
  foreach ($o in ($json | ConvertFrom-Json)) { $map[$o.OutputKey] = $o.OutputValue }
  return $map
}
