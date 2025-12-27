#!/bin/bash
# Production Deployment Script
# Run this before deploying to production

echo "🚀 Starting deployment process..."

echo ""
echo "📊 Step 1: Creating database indexes..."
npm run create-indexes

if [ $? -eq 0 ]; then
    echo "✅ Database indexes created successfully"
else
    echo "⚠️  Warning: Index creation failed, but continuing deployment"
fi

echo ""
echo "📦 Step 2: Building production bundle..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

echo ""
echo "🎉 Deployment ready! Run 'npm start' to launch production server."
