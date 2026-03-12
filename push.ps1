#Requires -Version 5.1
<#
.SYNOPSIS
    ich-ag-website – One-Click Git Push (Entwickler-Seite)
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

function Write-Step { param($msg) Write-Host "`n[*] $msg" -ForegroundColor Cyan }
function Write-OK   { param($msg) Write-Host "[OK] $msg" -ForegroundColor Green }
function Write-Warn { param($msg) Write-Host "[!]  $msg" -ForegroundColor Yellow }
function Exit-WithError {
    param($msg)
    Write-Host "`n[FEHLER] $msg" -ForegroundColor Red
    Write-Host "`nFenster schliessen mit einer beliebigen Taste..." -ForegroundColor Red
    exit 1
}

Clear-Host
Write-Host "  ich-ag-website – Git Push`n" -ForegroundColor Cyan

# ── [1] Git prüfen ────────────────────────────────────────────────────────────
Write-Step "Prüfe Git-Repository..."
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Exit-WithError "Git nicht gefunden. Bitte Git installieren."
}
if (-not (Test-Path (Join-Path $ProjectRoot ".git"))) {
    Exit-WithError "Kein Git-Repository in $ProjectRoot gefunden."
}
Push-Location $ProjectRoot

try {
    # ── [2] Status anzeigen ───────────────────────────────────────────────────
    Write-Step "Aktueller Git-Status:"
    git status --short
    $statusOutput = git status --porcelain

    # ── [3] Commit-Nachricht ──────────────────────────────────────────────────
    if ([string]::IsNullOrWhiteSpace($statusOutput)) {
        Write-Warn "Keine lokalen Änderungen vorhanden."
        $pushAnyway = Read-Host "`n  Trotzdem pushen (z.B. um Remote zu aktualisieren)? [j/N]"
        if ($pushAnyway -notin @("j", "J", "y", "Y")) {
            Write-Host "Abgebrochen." -ForegroundColor Yellow
            exit 0
        }
    } else {
        Write-Step "Commit-Nachricht eingeben:"
        $commitMsg = Read-Host "  Nachricht"
        if ([string]::IsNullOrWhiteSpace($commitMsg)) {
            Exit-WithError "Leere Commit-Nachricht. Abgebrochen."
        }

        # ── [4] Add + Commit ──────────────────────────────────────────────────
        Write-Step "Füge Dateien hinzu und erstelle Commit..."
        git add -A
        git commit -m $commitMsg
        if ($LASTEXITCODE -ne 0) { Exit-WithError "git commit fehlgeschlagen." }
        Write-OK "Commit erstellt."
    }

    # ── [5] Push ──────────────────────────────────────────────────────────────
    Write-Step "Pushe zu GitHub..."
    git push
    if ($LASTEXITCODE -ne 0) { Exit-WithError "git push fehlgeschlagen." }

    # ── [6] Abschluss ─────────────────────────────────────────────────────────
    $branch     = git rev-parse --abbrev-ref HEAD
    $commitHash = git rev-parse --short HEAD
    $remote     = git remote get-url origin

    Write-Host ""
    Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Green
    Write-Host "  Push erfolgreich!" -ForegroundColor Green
    Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Green
    Write-Host ""
    Write-Host "  Branch:  $branch" -ForegroundColor White
    Write-Host "  Commit:  $commitHash" -ForegroundColor White
    Write-Host "  Remote:  $remote" -ForegroundColor DarkGray
    Write-Host ""
    Write-Host "  Server-Update: bash scripts/server/install.sh" -ForegroundColor Yellow
    Write-Host ""

} finally {
    Pop-Location
}
