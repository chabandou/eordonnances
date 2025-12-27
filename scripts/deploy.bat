@echo off
REM Production Deployment Script for Windows
REM Run this before deploying to production

echo 🚀 Starting deployment process...
echo.

echo 📊 Step 1: Creating database indexes...
call npm run create-indexes

if %ERRORLEVEL% EQU 0 (
    echo ✅ Database indexes created successfully
) else (
    echo ⚠️  Warning: Index creation failed, but continuing deployment
)

echo.
echo 📦 Step 2: Building production bundle...
call npm run build

if %ERRORLEVEL% EQU 0 (
    echo ✅ Build successful
) else (
    echo ❌ Build failed
    exit /b 1
)

echo.
echo 🎉 Deployment ready! Run 'npm start' to launch production server.
