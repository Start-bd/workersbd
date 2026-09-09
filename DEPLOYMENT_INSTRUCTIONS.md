# WorkersBD Portal - Deployment Instructions

## 🚀 Quick Start Deployment

### Option 1: Deploy via Vercel UI (Recommended)

1. **Click "Publish" Button**
   - Look for the "Publish" button in the top-right of v0 chat
   - This automatically deploys to your connected Vercel project

2. **Environment Variables Setup**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add required variables from `.env.example`:
     ```
     NEXT_PUBLIC_SITE_URL=https://workersbd.com
     NEXT_PUBLIC_SITE_NAME=WorkersBD
     NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX (optional)
     ```

3. **Domain Configuration**
   - In Vercel Dashboard → Domains
   - Add your custom domain (workersbd.com)
   - Configure DNS records

---

### Option 2: Deploy via GitHub (Git Integration)

1. **Connect Repository**
   - In v0 top-right settings, ensure GitHub repo is connected
   - Branch: `main`

2. **Push Changes**
   ```bash
   git add .
   git commit -m "chore: audit fixes and project initialization"
   git push origin main
   ```

3. **Automatic Deployment**
   - Vercel automatically detects push to `main`
   - Build starts automatically
   - View deployment in Vercel Dashboard

4. **Set Environment Variables**
   - Vercel Dashboard → Settings → Environment Variables
   - Add variables for production

---

### Option 3: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel deploy --prod
   ```

3. **Follow Interactive Prompts**
   - Confirm project settings
   - Set environment variables if prompted

---

## ✅ Pre-Deployment Checklist

- [ ] All files are created (pages/, lib/, styles/)
- [ ] Dependencies installed: `npm install`
- [ ] Local development works: `npm run dev`
- [ ] Production build succeeds: `npm run build`
- [ ] No TypeScript errors: `npm run type-check` (if applicable)
- [ ] Linting passes: `npm run lint`
- [ ] Environment variables configured in Vercel
- [ ] Custom domain configured (if applicable)

---

## 🔧 Local Testing Before Deploy

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Visit `http://localhost:3000`

### Test Production Build
```bash
npm run build
npm start
```

### Run Linting
```bash
npm run lint
npm run lint:fix  # Auto-fix issues
```

---

## 📦 What's Included

✅ **Core Files Created:**
- `pages/_app.jsx` - Next.js app wrapper with analytics
- `pages/_document.jsx` - Custom HTML document
- `pages/index.jsx` - Homepage
- `pages/api/health.js` - Health check endpoint

✅ **Libraries Created:**
- `lib/analytics.js` - GA4, FB Pixel, Clarity integration
- `lib/seo.js` - SEO utilities & structured data
- `lib/translations.js` - EN/BN bilingual support

✅ **Styles:**
- `styles/globals.css` - Global styles with Tailwind

✅ **Configuration Fixed:**
- `package.json` - Added Tailwind plugins
- `tailwind.config.js` - Color system & theme
- `next.config.js` - Vercel-optimized settings
- `vercel.json` - Deployment configuration

---

## 🌍 Environment Variables

### Production Setup

Create `.env.production.local` in Vercel:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://workersbd.com
NEXT_PUBLIC_SITE_NAME=WorkersBD
NEXT_PUBLIC_SITE_DESCRIPTION=Advanced Bilingual Job Portal for Bangladesh

# Analytics (Get IDs from respective platforms)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=000000000000000
NEXT_PUBLIC_CLARITY_ID=project-id-here
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### Optional - Future Features

```env
# Database (when adding backend)
DATABASE_URL=postgresql://user:pass@host:5432/workersbd

# Authentication
NEXTAUTH_URL=https://workersbd.com
NEXTAUTH_SECRET=your-32-char-secret-here

# Google OAuth
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx

# Email Service
SENDGRID_API_KEY=SG.xxxxx
EMAIL_FROM=noreply@workersbd.com

# File Storage
CLOUDINARY_CLOUD_NAME=your-name
CLOUDINARY_API_KEY=xxx
```

---

## 📊 Vercel Deployment Settings

### Recommended Settings:

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm ci`

**Environment:**
- Node.js Version: 18.x or higher (default)
- Function Memory: 1024MB (default)

**Advanced:**
- Enable Build Caching: ✅ Yes
- Source Maps: ✅ Yes (for debugging)
- Server Functions: ✅ Enabled

---

## 🔄 After Deployment

1. **Test Live Site**
   - Visit your deployment URL
   - Check all pages load correctly
   - Test responsiveness on mobile

2. **Monitor Performance**
   - Check Lighthouse scores
   - Monitor Core Web Vitals in Vercel Analytics
   - Review error logs in Vercel

3. **Set Up Analytics**
   - Add GA4 tracking ID to environment variables
   - Verify events in Google Analytics
   - Set up Facebook Pixel conversion tracking

4. **SEO Setup**
   - Submit sitemap to Google Search Console
   - Add domain to Google Search Console
   - Monitor search performance

5. **Domain Configuration**
   - Update DNS records for custom domain
   - Verify SSL certificate (auto-generated by Vercel)
   - Configure email (if applicable)

---

## 🐛 Troubleshooting

### Build Fails

**Check:**
```bash
npm install  # Ensure dependencies installed
npm run build  # Test local build
npm run lint  # Check for linting errors
```

**Clear Cache:**
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working

- Verify variables in Vercel Dashboard
- Prefix public vars with `NEXT_PUBLIC_`
- Restart deployment after changing variables

### Port Issues Locally

```bash
npm run dev -- -p 3001  # Use different port
```

### Analytics Not Tracking

- Verify IDs in environment variables
- Check browser console for script load errors
- Wait 24 hours for initial GA data
- Test with Google Analytics Debugger

---

## 📞 Support

- **Issues:** Check GitHub Issues in your repository
- **Vercel Help:** https://vercel.com/help
- **Next.js Docs:** https://nextjs.org/docs
- **Email:** support@workersbd.com

---

## ✨ Next Steps

1. **Deploy** - Use Publish button or `vercel deploy --prod`
2. **Monitor** - Check Vercel Analytics & logs
3. **Optimize** - Improve based on Core Web Vitals
4. **Scale** - Add backend features as needed

---

**Happy Deploying! 🚀**

For detailed audit findings, see `AUDIT_REPORT.md`
