#!/bin/bash

# Deploy and push fixes to GitHub
cd /vercel/share/v0-project

# Configure git
git config user.email "deployment@workersbd.com"
git config user.name "WorkersBD Deployment"

# Add all changes
git add .

# Commit the deployment fixes
git commit -m "Fix: Prepare project for production deployment and SEO - Add tsconfig.json, .eslintrc.json, fix postcss.config.js, remove duplicate globals.css"

# Push to the deploy-to-production branch
git push origin deploy-to-production

echo "✅ Changes pushed to GitHub successfully!"
