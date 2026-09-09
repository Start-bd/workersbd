#!/bin/bash

# WorkersBD Quick Start Script
# This script helps you set up the project quickly

echo "🚀 WorkersBD Portal - Quick Start Setup"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
echo "   (This may take a few minutes)"
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    cp .env.example .env.local
    echo "✅ .env.local created!"
    echo "⚠️  Please edit .env.local with your configuration before running"
else
    echo "✅ .env.local already exists"
fi

echo ""

# Generate sitemaps
echo "🗺️  Generating sitemaps..."
npm run generate-sitemaps

if [ $? -eq 0 ]; then
    echo "✅ Sitemaps generated successfully!"
else
    echo "⚠️  Sitemap generation failed (you can run it later)"
fi

echo ""
echo "============================================"
echo "🎉 Setup Complete!"
echo "============================================"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your configuration"
echo "2. Run 'npm run dev' to start development server"
echo "3. Visit http://localhost:3000"
echo ""
echo "For deployment:"
echo "- Run 'npm run build' to build for production"
echo "- Run 'npm start' to start production server"
echo "- Or deploy to Vercel with 'vercel --prod'"
echo ""
echo "📚 Documentation:"
echo "- README.md - Technical documentation"
echo "- IMPLEMENTATION_GUIDE.md - Step-by-step guide"
echo "- PROJECT_SUMMARY.md - Overview of all features"
echo ""
echo "Need help? Check the documentation or visit:"
echo "https://workersbd.com/docs"
echo ""
echo "Good luck! 🚀🇧🇩"
