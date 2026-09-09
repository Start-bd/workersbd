#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

function runCommand(cmd, description) {
  try {
    console.log(`\n[Deploy] ${description}...`);
    const output = execSync(cmd, { cwd: projectRoot, encoding: 'utf-8' });
    console.log(`[Deploy] ✓ ${description}`);
    return output;
  } catch (error) {
    console.error(`[Deploy] ✗ Error: ${description}`);
    console.error(error.message);
    process.exit(1);
  }
}

// Check git status
console.log('[Deploy] Starting deployment process...');
console.log('[Deploy] Project root:', projectRoot);

// Stage all changes
runCommand('git add .', 'Staging all changes');

// Check if there are changes to commit
try {
  const status = execSync('git diff --cached --name-only', { cwd: projectRoot, encoding: 'utf-8' });
  if (!status.trim()) {
    console.log('[Deploy] No changes to commit');
    process.exit(0);
  }
  console.log('[Deploy] Files to commit:');
  console.log(status);
} catch (error) {
  console.error('[Deploy] Error checking git status:', error.message);
}

// Commit changes
runCommand(
  'git commit -m "fix: resolve build and lint errors for production deployment\n\n- Add tsconfig.json for TypeScript configuration\n- Add .eslintrc.json for ESLint configuration\n- Remove duplicate globals.css file\n- Fix postcss.config.js to remove cssnano dependency\n- Add deployment checklist"',
  'Committing changes'
);

// Push to GitHub
runCommand('git push origin deploy-to-production', 'Pushing to deploy-to-production branch');

console.log('\n[Deploy] ✓ Deployment complete! Changes have been pushed to GitHub.');
console.log('[Deploy] The CI/CD pipeline should now trigger automatically.');
