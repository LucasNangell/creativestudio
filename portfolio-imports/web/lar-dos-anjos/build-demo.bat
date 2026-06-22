@echo off
setlocal
cd /d "%~dp0source"

if not exist "apps\web\.env.local" (
  copy "apps\web\.env.demo" "apps\web\.env.local" >nul
)

echo Instalando dependencias...
call pnpm install
if errorlevel 1 exit /b 1

echo Gerando build estatico da demo...
set NEXT_PUBLIC_DEMO_MODE=true
call pnpm build:demo
if errorlevel 1 exit /b 1

echo Copiando build para pasta build/...
if exist "..\build" rmdir /s /q "..\build"
xcopy "apps\web\out" "..\build\" /E /I /Y >nul

echo Build concluido em portfolio-imports/web/lar-dos-anjos/build/
endlocal
