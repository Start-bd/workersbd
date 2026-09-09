# Vercel Secrets Setup Guide - Final Step to Production

## Status
- ✅ Build: PASSING
- ✅ Linting: PASSING
- ✅ Code: Ready
- ⏳ Deployment: Waiting for Vercel secrets

## What You Need to Do

The CI/CD workflow is ready and waiting. You need to add 3 Vercel secrets to your GitHub repository to enable automatic production deployment.

---

## Step-by-Step Setup

### Step 1: Get Vercel API Token
1. Go to [https://vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click "Create" to generate a new token
3. Name it: `workersbd-ci-cd`
4. Set expiration to a safe duration (e.g., 90 days)
5. Copy the token (you'll only see it once)

### Step 2: Get Vercel Organization & Project IDs
1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your "workersbd" project
3. Go to **Settings → General**
4. Find and copy:
   - **Project ID** - looks like `prj_XXXXXXXXXXXX`
   - **Team/Org ID** - scroll down to find it or check `.vercel/project.json` locally

Alternatively, if you have the Vercel CLI installed:
```bash
vercel link  # Links your local project to Vercel
cat .vercel/project.json  # Shows both IDs
```

### Step 3: Add Secrets to GitHub Repository

1. Go to your GitHub repository: **https://github.com/bdaiprompt-hue/workersbd**
2. Navigate to: **Settings → Secrets and variables → Actions**
3. Click **"New repository secret"** and add these 3 secrets:

| Secret Name | Value | Where to find |
|------------|-------|---------------|
| `VERCEL_TOKEN` | Your API token from Step 1 | https://vercel.com/account/tokens |
| `VERCEL_ORG_ID` | Your Organization/Team ID | Vercel Dashboard Settings or `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | Your Project ID | Vercel Dashboard Settings or `.vercel/project.json` |

**Important**: Each secret should be added individually using the "New repository secret" button.

### Step 4: Verify Secrets Are Added

On the GitHub repository **Settings → Secrets and variables → Actions** page, you should see:
```
✓ VERCEL_TOKEN (last updated X minutes ago)
✓ VERCEL_ORG_ID (last updated X minutes ago)
✓ VERCEL_PROJECT_ID (last updated X minutes ago)
```

---

## Step 5: Trigger Deployment

Once all 3 secrets are added, the deployment will start automatically. You have two options:

### Option A: Wait for Next Push (Automatic)
Simply push any commit to `main` branch:
```bash
git push origin main
```

### Option B: Manually Trigger (If Using GitHub CLI)
```bash
gh workflow run main.yml -b main
```

---

## Monitoring Deployment

1. Go to **GitHub Actions** tab in your repository
2. Find the "WorkersBD CI/CD" workflow
3. Click the latest run to see real-time status:
   - ✅ Lint & Build Check
   - ✅ Deploy Preview (on pull requests)
   - ✅ Deploy Production (on main push)

4. Once "Deploy Production" completes, your site will be live at **https://workersbd.com**

---

## After Deployment: Verification Checks

Once deployment completes, run these commands to verify everything:

```bash
# Check health endpoint
curl https://workersbd.com/api/health

# Check SEO
curl https://workersbd.com/robots.txt
curl https://workersbd.com/sitemap.xml

# Check PWA manifest
curl https://workersbd.com/manifest.json

# Check CRON jobs are registered (in Vercel dashboard)
# Settings → Functions → Cron Jobs
```

---

## Scheduled Maintenance Tasks (Auto-Running)

Once deployed, these CRON jobs run automatically:

| Job | Schedule | Purpose |
|-----|----------|---------|
| `/api/cron/refresh-jobs` | Daily at 00:00 UTC | Refresh job listings |
| `/api/cron/sitemap` | Daily at 02:00 UTC | Generate dynamic sitemap |

---

## Environment Variables Deployed

The following environment variables are already configured in vercel.json and will be picked up from GitHub secrets:

```
NEXT_PUBLIC_SITE_URL: https://workersbd.com
NEXT_PUBLIC_SITE_NAME: WorkersBD
NEXT_PUBLIC_GA_ID: (from GitHub secrets)
NEXT_PUBLIC_FB_PIXEL_ID: (from GitHub secrets)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: (from GitHub secrets)
```

---

## Troubleshooting

### "Deploy Production" step fails with "VERCEL_TOKEN not found"
- Check that all 3 secrets are added to GitHub
- Wait 30 seconds after adding secrets (GitHub sometimes has slight sync delays)
- Trigger a new push to main

### "Deploy Production" step fails with "Invalid Project ID"
- Verify VERCEL_PROJECT_ID matches your actual Vercel project
- Go to vercel.com/dashboard → Your Project → Settings → General to confirm

### "Deploy Production" step fails with "Unauthorized"
- Verify VERCEL_TOKEN is valid and not expired
- Generate a new token from https://vercel.com/account/tokens if needed

### "Deploy Production" step fails with "Invalid Team ID"
- Verify VERCEL_ORG_ID is correct
- Check it matches what appears in `.vercel/project.json`

---

## Rollback Plan (If Needed)

If there are issues after deployment:

1. Go to **Vercel Dashboard → Deployments**
2. Find the previous working deployment
3. Click the three dots menu → **Promote to Production**
4. Your site will revert to the previous version instantly

---

## Next Steps After Deployment

1. **Test the live site**: https://workersbd.com
2. **Check Core Web Vitals**: Google PageSpeed Insights or Vercel Analytics
3. **Monitor Analytics**: GA4 dashboard should show traffic
4. **Submit sitemap to Google Search Console**: https://search.google.com/search-console
5. **Check CRON jobs in Vercel**: Verify they're running daily

---

## Support

If you encounter issues:
1. Check GitHub Actions logs for error details
2. Verify all 3 secrets are properly set in GitHub
3. Check Vercel project exists and is correctly linked
4. Review workflow file at `.github/workflows/main.yml`

---

**You're 3 steps away from going live!** 🚀
