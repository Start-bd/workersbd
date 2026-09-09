#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📦 WorkersBD - Pushing Audit Fixes to GitHub\n');

const files = [
  'vercel.json',
  'next.config.js',
  'pages/_document.jsx',
  '.env.example',
  'public/robots.txt',
  'public/manifest.json',
  'public/icons/icon-192x192.png',
  'public/icons/icon-512x512.png',
  'AUDIT_FIXES.md',
  'DEPLOYMENT_GUIDE.md'
];

console.log('Files to be committed:');
files.forEach(f => console.log(`  ✓ ${f}`));
console.log();

try {
  console.log('🔄 Adding files to git...');
  execSync('git add vercel.json next.config.js pages/_document.jsx .env.example public/ AUDIT_FIXES.md DEPLOYMENT_GUIDE.md', {
    stdio: 'inherit',
    cwd: __dirname
  });

  console.log('\n✍️  Committing changes...');
  execSync('git commit -m "fix: Resolve Vercel schema validation, SEO, and PWA issues\n\n- Remove invalid envSecrets and deprecated name from vercel.json\n- Replace deprecated images.domains with images.remotePatterns\n- Simplify webpack configuration (remove unused params)\n- Add PWA manifest and icons\n- Create robots.txt for SEO crawlers\n- Add manifest.json link to _document.jsx\n- Add comprehensive audit and deployment documentation"', {
    stdio: 'inherit',
    cwd: __dirname
  });

  console.log('\n📤 Pushing to GitHub...');
  execSync('git push origin main', {
    stdio: 'inherit',
    cwd: __dirname
  });

  console.log('\n✅ All changes pushed to GitHub successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Go to Vercel Dashboard');
  console.log('2. Set environment variables in Project Settings');
  console.log('3. Deployment will start automatically (or manually via Dashboard)');
  console.log('4. Verify with: curl https://workersbd.com/api/health');
  
} catch (error) {
  console.error('\n❌ Error pushing to GitHub:');
  console.error(error.message);
  process.exit(1);
}
