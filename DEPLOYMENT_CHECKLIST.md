# WorkersBD Deployment Checklist

## Build Issues Fixed ✅
- [x] Created `tsconfig.json` - TypeScript configuration for Next.js build
- [x] Created `.eslintrc.json` - ESLint configuration for code linting
- [x] Removed duplicate `globals.css` - Eliminated conflicting CSS file
- [x] Fixed `postcss.config.js` - Removed reference to missing cssnano package

## Pre-Deployment Verification

### Environment Variables (Required in Vercel)
Configure these in Vercel Settings > Environment Variables:

#### Site Configuration
- [ ] `NEXT_PUBLIC_SITE_URL` - Production domain (https://workersbd.com)
- [ ] `NEXT_PUBLIC_SITE_NAME` - WorkersBD

#### Analytics (Required for tracking)
- [ ] `NEXT_PUBLIC_GA_ID` - Google Analytics 4 ID (format: G-XXXXXXXXXX)
- [ ] `NEXT_PUBLIC_FB_PIXEL_ID` - Facebook Pixel ID
- [ ] `NEXT_PUBLIC_CLARITY_ID` - Microsoft Clarity ID

#### Optional but Recommended
- [ ] Database credentials (if using backend)
- [ ] Email service keys (SendGrid)
- [ ] File storage keys (Cloudinary)
- [ ] Google Maps API key

### Build Commands Verified
```bash
npm run build    # Builds the application
npm run lint     # Runs ESLint
npm run type-check  # Checks TypeScript
npm start        # Starts production server
```

### Next.js Configuration
- [x] `next.config.js` - Properly configured with:
  - Output: standalone (Vercel-optimized)
  - i18n: Bilingual support (EN + BN)
  - Image optimization: Multiple domains whitelisted
  - Security headers: CSP, HSTS, X-Frame-Options configured
  - Redirects & rewrites: SEO-friendly

### Vercel Configuration
- [x] `vercel.json` - Configured with:
  - Region: Singapore (sin1)
  - Build: `npm run build`
  - Install: `npm ci`
  - Cron jobs: For job refresh and sitemap generation
  - Headers: Cache control for static assets

## Deployment Steps

### 1. Set Environment Variables in Vercel
- Go to Project Settings > Environment Variables
- Add all required variables from above
- Set for Production environment

### 2. Deploy to Production
```bash
# Option 1: Use Vercel Dashboard
# Click "Publish" button in v0 UI

# Option 2: Use Vercel CLI (from local machine)
vercel --prod
```

### 3. Verify Deployment
- [ ] Health check: Visit `/api/health`
- [ ] Homepage loads: https://workersbd.com
- [ ] Analytics tracking: Check Google Analytics
- [ ] Responsive design: Test on mobile/tablet/desktop
- [ ] SEO meta tags: Check page source for proper og: tags

## Post-Deployment Checks

### Analytics Setup
- [ ] Google Analytics showing page views
- [ ] Facebook Pixel firing events
- [ ] Microsoft Clarity recording sessions

### Performance
- [ ] Lighthouse score > 80
- [ ] First Contentful Paint < 2s
- [ ] Core Web Vitals passing

### SEO
- [ ] Sitemap generated and accessible
- [ ] robots.txt accessible
- [ ] Canonical tags correct
- [ ] Schema markup valid

### Security
- [ ] HTTPS enforced
- [ ] Security headers present
- [ ] No console errors
- [ ] No sensitive data in logs

## Database Setup (When Ready)
If implementing backend:
- [ ] Supabase project created
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] RLS policies configured
- [ ] Auth setup complete

## Service Worker / PWA (Optional)
- Create `/public/sw.js` for offline support
- Add manifest.json (referenced in _document.jsx)
- Test PWA installation

## Cron Jobs (Auto-configured)
- Refresh jobs: Every 6 hours
- Sitemap generation: Daily at 2 AM UTC

## Common Issues & Solutions

### Build Fails
```
Error: Module not found
→ Run: npm install
→ Check import paths in code
```

### Analytics Not Tracking
```
IDs not set in environment variables
→ Verify NEXT_PUBLIC_GA_ID, etc. in Vercel dashboard
→ Clear browser cache and reload
```

### SEO Issues
```
Missing meta tags
→ Check lib/seo.js configuration
→ Verify og: images are accessible
→ Test with Google Search Console
```

## Rollback Procedure
If deployment fails:
1. Go to Vercel dashboard
2. Click "Deployments" tab
3. Select previous successful deployment
4. Click "Promote to Production"

## Support & Monitoring

### Vercel Monitoring
- Check deployment logs: Deployments tab
- Monitor function performance: Functions tab
- View analytics: Analytics tab

### Error Tracking (When Integrated)
- Set up Sentry for error tracking
- Configure log aggregation
- Set up alerts for critical errors

## Contact & Resources

- **Documentation**: https://workersbd.com/docs
- **GitHub**: https://github.com/bdaiprompt-hue/workersbd
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
