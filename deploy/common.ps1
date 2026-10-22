<#
  Shared by deploy.ps1 (the site on the FITOS server) and cloudfront/*.ps1.
  Every call runs as the owner's AWS CLI profile (`aws login --profile
  fitos`): no access key is stored or passed. The server is reached only
  through Systems Manager: it has no SSH.
#>
$ErrorActionPreference = 'Stop'
$script:Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$script:Stack = 'fitos-website'

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

function Initialize-Aws([string]$ProfileName, [string]$Region) {
  $script:AwsProfile = $ProfileName
  $script:Region = $Region
  try {
    $id = Invoke-Aws sts get-caller-identity --output json | ConvertFrom-Json
  } catch {
    throw "Not signed in to AWS as '$ProfileName'. Run: aws login --profile $ProfileName"
  }
  Write-Host "AWS account $($id.Account) as $($id.Arn) ($Region)"
}

function Get-StackOutputs([string]$Stack = $script:Stack) {
  $json = Invoke-Aws cloudformation describe-stacks --stack-name $Stack --query 'Stacks[0].Outputs' --output json
  $map = @{}
  foreach ($o in ($json | ConvertFrom-Json)) { $map[$o.OutputKey] = $o.OutputValue }
  return $map
}

<#
  Runs a shell command on the server as root through Systems Manager and
  waits. The deploy/server/ files go with every command (to
  /opt/fitos/website-bin), so this repository is their only source.
  Returns the output; throws on failure.
#>
function Invoke-ServerScript([string]$InstanceId, [string]$Command, [int]$TimeoutSeconds = 600) {
  $lines = @('set -euo pipefail', 'install -d -m 0750 /opt/fitos/website-bin')
  foreach ($f in Get-ChildItem (Join-Path $PSScriptRoot 'server') -File | Where-Object { $_.Extension -in '.sh', '.caddy' }) {
    $text = [IO.File]::ReadAllText($f.FullName) -replace "`r`n", "`n"
    $b64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($text))
    $lines += "printf '%s' '$b64' | base64 -d > /opt/fitos/website-bin/$($f.Name)"
  }
  $lines += 'chmod 0750 /opt/fitos/website-bin/*.sh', $Command
  $params = @{ commands = $lines; executionTimeout = @("$TimeoutSeconds") } | ConvertTo-Json -Compress -Depth 4
  $file = Join-Path $env:TEMP "fitos-website-ssm-$([guid]::NewGuid()).json"
  [IO.File]::WriteAllText($file, $params)
  try {
    $commandId = Invoke-Aws ssm send-command --instance-ids $InstanceId --document-name AWS-RunShellScript `
      --comment 'fitos website' --parameters "file://$file" --query Command.CommandId --output text
  } finally { Remove-Item $file -ErrorAction SilentlyContinue }

  $deadline = (Get-Date).AddSeconds($TimeoutSeconds + 60)
  do {
    Start-Sleep -Seconds 5
    try {
      $inv = Invoke-Aws ssm get-command-invocation --command-id $commandId --instance-id $InstanceId --output json | ConvertFrom-Json
    } catch { $inv = $null } # not registered yet
  } while (($null -eq $inv -or $inv.Status -in 'Pending', 'InProgress', 'Delayed') -and (Get-Date) -lt $deadline)

  if ($null -ne $inv) {
    if ($inv.StandardOutputContent) { Write-Host $inv.StandardOutputContent }
    if ($inv.StandardErrorContent) { Write-Host $inv.StandardErrorContent -ForegroundColor Yellow }
  }
  if ($null -eq $inv -or $inv.Status -ne 'Success') { throw "the server command did not succeed ($($inv.Status))" }
  return $inv.StandardOutputContent
}
