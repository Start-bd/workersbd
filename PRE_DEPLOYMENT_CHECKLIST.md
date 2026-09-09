# WorkersBD - Pre-Deployment Checklist

**Date**: March 12, 2026  
**Status**: Ready for Production  
**Estimated Time to Deploy**: 5-10 minutes

---

## ✅ All Code Fixes Complete

The following critical issues have been fixed:

- [x] Vercel schema validation error (removed `envSecrets` and `name`)
- [x] Deprecated `images.domains` replaced with `images.remotePatterns`
- [x] Unused webpack parameters removed
- [x] robots.txt created for SEO crawlers
- [x] PWA manifest.json created
- [x] PWA icons generated (192x192, 512x512)
- [x] _document.jsx updated with manifest and icon links

**All fixes are tested and ready for production.**

---

## 📋 Your Deployment Checklist

### Phase 1: Environment Variables (Do This First) ⚠️ REQUIRED

Go to [Vercel Dashboard](https://vercel.com) and complete these steps:

1. **Select Your Project**: Click "workersbd" project
2. **Go to Settings**: Click Settings tab at top
3. **Click Environment Variables**: In left sidebar
4. **Add Each Variable**: Copy-paste from below

#### Required Environment Variables:

```
Name: NEXT_PUBLIC_SITE_URL
Value: https://workersbd.com
Environments: ✓ Production, ✓ Preview, ✓ Development
```

```
Name: NEXT_PUBLIC_SITE_NAME
Value: WorkersBD
Environments: ✓ Production, ✓ Preview, ✓ Development
```

```
Name: CRON_SECRET
Value: [Generate using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"]
Environments: ✓ Production (mark as Encrypted)
```

```
Name: DATABASE_URL
Value: [Your database connection string]
Environments: ✓ Production (mark as Encrypted)
```

```
Name: NEXTAUTH_SECRET
Value: [Generate using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"]
Environments: ✓ Production (mark as Encrypted)
```

```
Name: NEXT_PUBLIC_GA_ID
Value: [Your Google Analytics ID, e.g., G-XXXXXXXXXX]
Environments: ✓ Production, ✓ Preview, ✓ Development
```

```
Name: NEXT_PUBLIC_FB_PIXEL_ID
Value: [Your Facebook Pixel ID]
Environments: ✓ Production, ✓ Preview, ✓ Development
```

**✓ Checklist**:
- [ ] All 7 environment variables added
- [ ] Encrypted variables marked as "Encrypted"
- [ ] Production environment selected for each

---

### Phase 2: Push Code to GitHub

**Option A: Using Command Line**
```bash
# Navigate to project
cd /vercel/share/v0-project

# Add all changes
git add .

# Commit with detailed message
git commit -m "fix: Resolve Vercel deployment issues

- Remove invalid envSecrets and deprecated name from vercel.json
- Replace deprecated images.domains with images.remotePatterns
- Remove unused webpack parameters
- Add PWA manifest and icons for mobile installation
- Create robots.txt for SEO optimization
- Update _document.jsx with manifest and icon links
- Add comprehensive deployment documentation"

# Push to main branch
git push origin main
```

**Option B: Using Provided Script**
```bash
cd /vercel/share/v0-project
node push-fixes.js
```

**✓ Checklist**:
- [ ] Code committed to git
- [ ] Push successful (no errors)
- [ ] Changes visible on GitHub

---

### Phase 3: Trigger Deployment

**Option A: Automatic (Recommended)**
- If you have GitHub integration enabled in Vercel
- Deployment automatically starts when you push
- Check Vercel Dashboard for progress

**Option B: Manual**
1. Go to Vercel Dashboard
2. Select "workersbd" project
3. Click "Deployments" tab
4. Click "Deploy" button

**✓ Checklist**:
- [ ] Deployment started
- [ ] No build errors
- [ ] Deployment successful

---

### Phase 4: Verify Deployment

Wait for deployment to complete, then verify each endpoint:

#### 1. Health Check
```bash
curl https://workersbd.com/api/health
```
**Expected**: `{"status":"ok"}`  
- [ ] Responds with OK status

#### 2. Robots.txt
```bash
curl https://workersbd.com/robots.txt
```
**Expected**: Crawler directives with sitemap reference  
- [ ] Contains `Disallow: /api/`
- [ ] Contains `Sitemap: https://workersbd.com/sitemap.xml`

#### 3. PWA Manifest
```bash
curl https://workersbd.com/manifest.json
```
**Expected**: JSON with app metadata and icons  
- [ ] Contains `"name": "WorkersBD"`
- [ ] Contains icons array with 192x192 and 512x512
- [ ] Contains `"display": "standalone"`

#### 4. Sitemap
```bash
curl https://workersbd.com/sitemap.xml
```
**Expected**: Valid XML sitemap  
- [ ] Starts with `<?xml version="1.0"`
- [ ] Contains `<urlset>` tags
- [ ] Contains main URLs (/, /jobs, /workers, /about, /contact)

#### 5. PWA Installability (Mobile)
1. Open https://workersbd.com on mobile device
2. Expected: Browser shows "Add to Home Screen" prompt
   - [ ] Android: Install button appears
   - [ ] iOS: Share → Add to Home Screen available

#### 6. Open Graph Tags
1. Open https://workersbd.com in browser
2. Right-click → View Page Source
3. Search for these tags:
   - [ ] `<meta property="og:title"`
   - [ ] `<meta property="og:description"`
   - [ ] `<meta property="og:image"`
   - [ ] `<meta property="og:url"`

---

### Phase 5: Post-Deployment Tasks

#### SEO Setup
- [ ] Submit sitemap to [Google Search Console](https://search.google.com/search-console)
  - Go to Sitemaps section
  - Submit: `https://workersbd.com/sitemap.xml`
  
- [ ] Submit sitemap to [Bing Webmaster Tools](https://www.bing.com/webmaster/)
  - Go to Sitemaps section
  - Submit: `https://workersbd.com/sitemap.xml`

#### Monitoring Setup
- [ ] Check Vercel deployment logs for errors
- [ ] Monitor CRON job execution
  - View in Vercel Dashboard → Deployments → Cron Jobs
  
- [ ] Set up error tracking (optional but recommended)
  - Services: Sentry, LogRocket, or similar

#### Analytics Setup
- [ ] Verify Google Analytics is receiving data
  - Check: https://analytics.google.com
  
- [ ] Verify Facebook Pixel is firing
  - Check: https://www.facebook.com/events_manager

---

## 🚨 Troubleshooting Guide

### Problem: Deployment Failed

**Check these in order:**
1. [ ] All environment variables set correctly
2. [ ] No syntax errors in code (run `npm run build` locally)
3. [ ] Check Vercel build logs for specific error message
4. [ ] Verify package.json has all required dependencies

**Solution**: Fix the error shown in build logs and push again

---

### Problem: PWA Won't Install

**Check these:**
1. [ ] Manifest.json is accessible: `curl https://workersbd.com/manifest.json`
2. [ ] Icons exist: Check in Vercel dashboard under "Storage"
3. [ ] HTTPS is enabled (required for PWA)
4. [ ] Try on different device/browser

**Solution**: Clear browser cache and try again after 24 hours (cache takes time)

---

### Problem: Sitemap Not Working

**Check these:**
1. [ ] `/api/sitemap.js` route exists
2. [ ] Test route: `curl https://workersbd.com/api/sitemap`
3. [ ] Rewrite configured in vercel.json

**Solution**: Verify `/api/sitemap.js` file exists and returns valid XML

---

### Problem: CRON Jobs Not Running

**Check these:**
1. [ ] CRON_SECRET set in environment variables
2. [ ] Check Vercel logs for CRON execution
3. [ ] Verify API routes exist:
   - `/pages/api/cron/refresh-jobs.js`
   - `/pages/api/cron/sitemap.js`

**Solution**: Check Vercel dashboard Deployments → Cron Jobs section

---

## 📚 Documentation Reference

For detailed information, see:

- **AUDIT_FIXES.md** - Complete technical breakdown of all issues
- **DEPLOYMENT_GUIDE.md** - Step-by-step deployment walkthrough
- **CHANGES_REFERENCE.md** - Detailed code changes
- **FIX_SUMMARY.txt** - Quick summary of all fixes

---

## ⏱️ Time Breakdown

| Task | Time | Status |
|------|------|--------|
| Set Environment Variables | 3-5 min | ⏳ Now |
| Push Code to GitHub | 1-2 min | ⏳ After vars |
| Trigger Deployment | 1 min | ⏳ After push |
| Deployment Builds | 3-5 min | ⏳ Auto |
| Verify Endpoints | 2-3 min | ⏳ After deploy |
| **Total Time** | **10-15 min** | ⏳ Start now! |

---

## ✅ Final Checklist

Before you click deploy:

- [ ] Read through this entire checklist
- [ ] Set all 7 environment variables in Vercel Dashboard
- [ ] Understand what each variable does
- [ ] Have credentials ready (GA ID, FB Pixel ID, etc.)
- [ ] Ready to push code to GitHub
- [ ] Understand how to verify endpoints
- [ ] Have time to monitor deployment (5-10 min)

Before going live:

- [ ] All 6 verification endpoints working
- [ ] PWA installable on mobile device
- [ ] No errors in Vercel deployment logs
- [ ] Open Graph tags present in HTML

---

## 🎉 Success Criteria

Your deployment is successful when:

✅ All endpoints respond correctly  
✅ PWA installs on mobile device  
✅ Sitemap appears in Google Search Console  
✅ robots.txt blocks correct routes  
✅ No errors in Vercel logs  
✅ Analytics receiving data  

---

## 🚀 You're Ready!

Everything is prepared and tested. Follow this checklist step-by-step and you'll have WorkersBD live in production within 10-15 minutes!

**Questions?** See the detailed documentation files listed above.

**Next Step**: Go to Vercel Dashboard and add environment variables!

---

**Status**: ✅ All code fixes complete  
**Status**: ✅ All documentation ready  
**Status**: ⏳ Waiting for you to set environment variables and deploy!

Let's go live! 🚀
