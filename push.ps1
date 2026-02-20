$msg = Read-Host "Commit message"

if ([string]::IsNullOrWhiteSpace($msg)) {
    Write-Host "Commit message cannot be empty!" -ForegroundColor Red
    exit 1
}

git add .

git diff --cached --quiet
if ($LASTEXITCODE -eq 0) {
    Write-Host "No changes to commit." -ForegroundColor Yellow
    exit 0
}

git commit -m "$msg"
git push

Write-Host "Push completed." -ForegroundColor Green