# WorkersBD Deployment Guide

Complete guide for deploying the WorkersBD job portal to production.

## 📋 Pre-Deployment Checklist

### 1. Environment Configuration
- [ ] Set up production environment variables
- [ ] Configure database connection strings
- [ ] Set up API keys (Google Maps, Analytics, etc.)
- [ ] Configure email service (SendGrid, AWS SES, etc.)
- [ ] Set up CDN for static assets
- [ ] Configure SSL certificates

### 2. SEO Preparation
- [ ] Generate sitemap: `npm run sitemap`
- [ ] Verify robots.txt configuration
- [ ] Test all meta tags
- [ ] Verify structured data with Google's Rich Results Test
- [ ] Set up Google Search Console
- [ ] Set up Bing Webmaster Tools
- [ ] Configure Google Analytics 4
- [ ] Set up Facebook Pixel

### 3. Performance Optimization
- [ ] Run production build: `npm run build`
- [ ] Test Lighthouse scores (target: 90+)
- [ ] Optimize images (compress, convert to WebP/AVIF)
- [ ] Enable CDN for static assets
- [ ] Configure caching headers
- [ ] Set up database indexing

### 4. Security
- [ ] Enable HTTPS/SSL
- [ ] Configure security headers
- [ ] Set up rate limiting
- [ ] Enable CSRF protection
- [ ] Configure CORS properly
- [ ] Set up backup system
- [ ] Enable DDoS protection (Cloudflare)

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

**Advantages:**
- Zero configuration
- Automatic SSL
- Global CDN
- Excellent Next.js support
- Free tier available

**Steps:**

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

4. Set environment variables in Vercel dashboard:
```
NEXT_PUBLIC_SITE_URL=https://workersbd.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXXXXX
DATABASE_URL=your_database_url
```

5. Configure custom domain:
```bash
vercel domains add workersbd.com
```

**Production URL:** `https://workersbd.com`

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod
```

4. Configure build settings in `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: AWS (Advanced)

**Services needed:**
- EC2 or ECS for hosting
- RDS for database
- S3 + CloudFront for static assets
- Route 53 for DNS
- ALB for load balancing

**Deployment with PM2:**

1. Build the project:
```bash
npm run build
```

2. Install PM2:
```bash
npm install -g pm2
```

3. Start the application:
```bash
pm2 start npm --name "workersbd" -- start
```

4. Configure PM2 for auto-restart:
```bash
pm2 startup
pm2 save
```

### Option 4: Docker

**Dockerfile:**
```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

**Build and run:**
```bash
docker build -t workersbd .
docker run -p 3000:3000 workersbd
```

**Docker Compose:**
```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
    restart: always
```

## 🗄️ Database Setup

### PostgreSQL

```sql
-- Create database
CREATE DATABASE workersbd;

-- Create user
CREATE USER workersbd_user WITH PASSWORD 'secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE workersbd TO workersbd_user;

-- Run migrations
-- (Use your preferred migration tool: Prisma, Knex, etc.)
```

### MongoDB

```javascript
// Connection string
mongodb+srv://username:password@cluster.mongodb.net/workersbd

// Create indexes
db.jobs.createIndex({ district: 1, status: 1 });
db.jobs.createIndex({ posted_date: -1 });
db.worker_profiles.createIndex({ district: 1, profession: 1 });
```

## 🔧 Post-Deployment Configuration

### 1. Google Search Console

1. Add property: https://workersbd.com
2. Verify ownership
3. Submit sitemap: https://workersbd.com/sitemap.xml
4. Monitor indexing status

### 2. Google Analytics 4

1. Create GA4 property
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to environment variables
4. Verify tracking in Real-time reports

### 3. Facebook Pixel

1. Create Facebook Business Manager account
2. Create Pixel
3. Get Pixel ID
4. Add to environment variables
5. Test with Facebook Pixel Helper

### 4. CDN Configuration (Cloudflare)

1. Add domain to Cloudflare
2. Update nameservers
3. Enable:
   - Auto Minify (CSS, JS, HTML)
   - Brotli compression
   - HTTP/2
   - HTTP/3
4. Set caching rules:
   - HTML: 2 hours
   - CSS/JS: 1 year
   - Images: 1 year

### 5. Email Service

**SendGrid Setup:**
```javascript
// lib/email.js
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendEmail({ to, subject, html }) {
  await sgMail.send({
    to,
    from: 'noreply@workersbd.com',
    subject,
    html
  });
}
```

## 📊 Monitoring & Analytics

### 1. Performance Monitoring

**Google Lighthouse CI:**
```bash
npm install -g @lhci/cli
lhci autorun --collect.url=https://workersbd.com
```

### 2. Error Tracking (Sentry)

```javascript
// pages/_app.jsx
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### 3. Uptime Monitoring

- Use UptimeRobot or Pingdom
- Set up alerts for downtime
- Monitor from multiple locations

## 🔄 CI/CD Pipeline

**GitHub Actions:**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## 🔐 Security Best Practices

1. **Environment Variables:**
   - Never commit `.env` files
   - Use different values for development/production
   - Rotate keys regularly

2. **Database Security:**
   - Use parameterized queries
   - Enable SSL connections
   - Regular backups
   - Implement rate limiting

3. **API Security:**
   - Implement authentication (JWT)
   - Use HTTPS only
   - Validate all inputs
   - Set up CORS properly

4. **Content Security Policy:**
```javascript
// next.config.js
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google-analytics.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com;
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self' data: *.gstatic.com;
`;
```

## 📱 Mobile App Integration (Future)

1. Set up deep linking
2. Configure app banners
3. Implement PWA install prompts
4. Create native app (React Native)

## 🆘 Troubleshooting

### Common Issues:

**Build fails:**
```bash
# Clear cache
rm -rf .next
npm run build
```

**Database connection issues:**
- Check connection string
- Verify firewall rules
- Check database credentials

**Images not loading:**
- Verify Image domain configuration
- Check CDN settings
- Verify image paths

## 📞 Support

For deployment assistance:
- Email: devops@workersbd.com
- Slack: #deployment-help
- Documentation: https://docs.workersbd.com

## 🎯 Production Checklist

Final checks before going live:

- [ ] All tests passing
- [ ] Production build successful
- [ ] Environment variables configured
- [ ] Database migrated and indexed
- [ ] SSL certificate active
- [ ] CDN configured
- [ ] Analytics tracking verified
- [ ] Error monitoring active
- [ ] Backup system running
- [ ] Domain DNS configured
- [ ] Email service working
- [ ] Search Console configured
- [ ] Sitemap submitted
- [ ] Performance score > 90
- [ ] Security headers configured
- [ ] GDPR compliance verified

## 🚦 Go Live!

```bash
# Final deployment
npm run build
npm run sitemap
vercel --prod

# Or
docker-compose up -d --build

# Monitor logs
pm2 logs workersbd
```

🎉 **Congratulations! WorkersBD is now live!**

Monitor the first 24 hours closely and be ready to rollback if needed.

---

Last Updated: October 28, 2025
