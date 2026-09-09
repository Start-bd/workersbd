# WorkersBD - Production Deployment Guide

## Quick Start (5 minutes)

### Step 1: Set Environment Variables in Vercel
1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your **workersbd** project
3. Click **Settings → Environment Variables**
4. Add these variables:

```
Key: NEXT_PUBLIC_SITE_URL
Value: https://workersbd.com
Environments: Production, Preview, Development

Key: NEXT_PUBLIC_SITE_NAME
Value: WorkersBD
Environments: Production, Preview, Development

Key: CRON_SECRET
Value: <generate-a-random-32-char-secret-here>
Environments: Production (encrypted)

Key: DATABASE_URL
Value: <your-database-connection-string>
Environments: Production (encrypted)

Key: NEXTAUTH_SECRET
Value: <generate-a-random-secret>
Environments: Production (encrypted)

Key: NEXT_PUBLIC_GA_ID
Value: <your-google-analytics-id>
Environments: Production, Preview, Development

Key: NEXT_PUBLIC_FB_PIXEL_ID
Value: <your-facebook-pixel-id>
Environments: Production, Preview, Development
```

### Step 2: Generate Secrets
If you don't have secret values, generate them:
```bash
# Generate CRON_SECRET (32 characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate NEXTAUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 3: Push Code to GitHub
```bash
git add .
git commit -m "fix: Resolve Vercel schema validation and SEO issues"
git push origin main
```

### Step 4: Deploy
- **Automatic**: If GitHub integration enabled, deployment starts automatically
- **Manual**: Go to Vercel Dashboard → Click "Deploy"

---

## Verification Checklist

After deployment, verify everything works:

### 1. Health Check
```bash
curl https://workersbd.com/api/health
# Expected response: { "status": "ok" }
```

### 2. Sitemap
```bash
curl https://workersbd.com/sitemap.xml
# Expected: Valid XML sitemap with proper URLs
```

### 3. Robots.txt
```bash
curl https://workersbd.com/robots.txt
# Expected: Crawler directives
```

### 4. PWA Manifest
```bash
curl https://workersbd.com/manifest.json
# Expected: JSON with app metadata and icons
```

### 5. Open Graph (Social Share)
- Open https://workersbd.com in browser
- Right-click → View Page Source
- Search for `og:title`, `og:description`, `og:image`
- All should be properly set

### 6. Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add/select your domain
3. Submit sitemap: `https://workersbd.com/sitemap.xml`
4. Monitor indexing status

### 7. PWA Installability (Mobile)
1. Open https://workersbd.com on mobile browser
2. Should show "Add to Home Screen" option
3. Verify manifest.json loads without errors

---

## Post-Deployment Tasks

### Priority 1: SEO
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Configure Search Console to monitor indexing
- [ ] Monitor Core Web Vitals

### Priority 2: Monitoring
- [ ] Set up error tracking (Sentry, LogRocket, etc.)
- [ ] Monitor CRON job execution in Vercel logs
- [ ] Set up alerts for failed deployments

### Priority 3: Optimization
- [ ] Analyze Web Vitals at `/api/analytics/web-vitals`
- [ ] Check sitemap completeness
- [ ] Verify image optimization working

---

## Troubleshooting

### Issue: "Deployment Failed"
1. Check Vercel build logs for errors
2. Ensure all environment variables are set
3. Run `npm run build` locally to debug
4. Check for missing dependencies in package.json

### Issue: "PWA Not Installing"
1. Verify manifest.json is accessible
2. Check PWA icons exist in `/public/icons/`
3. Verify HTTPS is enabled (required for PWA)
4. Clear browser cache and try again

### Issue: "Sitemap Not Found"
1. Check `/api/sitemap.js` route exists
2. Verify rewrite in `vercel.json`: `/sitemap.xml` → `/api/sitemap`
3. Test endpoint directly: `curl https://workersbd.com/api/sitemap`

### Issue: "CRON Jobs Not Running"
1. Verify CRON_SECRET is set in environment variables
2. Check Vercel logs for CRON execution
3. Ensure API routes exist:
   - `/pages/api/cron/refresh-jobs.js`
   - `/pages/api/cron/sitemap.js`

---

## Rollback Procedure

If you need to rollback to the previous version:

### Via Vercel Dashboard
1. Go to Vercel Dashboard → Deployments
2. Find the previous successful deployment
3. Click the three dots → "Promote to Production"

### Via Git
```bash
git revert <commit-hash>
git push origin main
```

---

## Monitoring & Maintenance

### Weekly
- Check Vercel deployment logs for errors
- Monitor CRON job success in logs
- Check error rates in analytics

### Monthly
- Review Core Web Vitals performance
- Analyze sitemap submission status in Search Console
- Review analytics for SEO metrics

### Quarterly
- Update package dependencies
- Security audit of environment variables
- Performance optimization review

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Google Search Console**: https://search.google.com/search-console
- **PWA Standards**: https://web.dev/pwa/

---

## Summary

You're now ready to deploy WorkersBD to production! All critical issues have been fixed:

- ✓ Vercel schema validation passed
- ✓ SEO infrastructure in place
- ✓ PWA ready for installation
- ✓ CRON jobs configured
- ✓ Environment variables documented

**Next Action**: Set environment variables in Vercel Dashboard and push code to GitHub. Deployment will be automatic!
