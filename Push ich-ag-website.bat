@echo off
chcp 65001 >nul
title ich-ag-website Push
PowerShell -NoProfile -ExecutionPolicy Bypass -File "%~dp0push.ps1"
pause
