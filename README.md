# WorkersBD - Advanced Bangladeshi Job Portal

> A comprehensive, SEO-optimized, mobile-first bilingual (English/বাংলা) job portal for Bangladesh

## 🚀 Features

### Core Features
- ✅ **Bilingual Support** - Full English and বাংলা (Bangla) language support
- ✅ **Mobile-First Design** - Optimized for mobile devices with responsive layouts
- ✅ **Advanced SEO** - Comprehensive SEO implementation with structured data
- ✅ **District Pages** - Individual pages for all 64+ Bangladesh districts
- ✅ **Category Pages** - Job listings by industry/category
- ✅ **Job Listings** - Detailed job postings with rich information
- ✅ **Worker Profiles** - Skilled worker directory with portfolios
- ✅ **Interactive Maps** - Location-based job search with maps
- ✅ **Real-time Search** - Fast, client-side job search functionality
- ✅ **Analytics Integration** - Google Analytics, Facebook Pixel, Microsoft Clarity

### SEO Features
- 📊 **Structured Data** - JobPosting, Person, Organization, FAQ schemas
- 📊 **Meta Tags** - Comprehensive Open Graph and Twitter Card support
- 📊 **Sitemap Generation** - Automated XML sitemap creation
- 📊 **Robots.txt** - Optimized for search engine crawling
- 📊 **Canonical URLs** - Proper URL canonicalization
- 📊 **hreflang Tags** - Language alternate tags for bilingual pages
- 📊 **Local SEO** - District and city-specific optimization
- 📊 **Rich Snippets** - Enhanced search result appearance

### Performance Optimizations
- ⚡ **Static Site Generation (SSG)** - Pre-rendered pages for fast loading
- ⚡ **Incremental Static Regeneration (ISR)** - Dynamic updates without rebuild
- ⚡ **Image Optimization** - Next.js Image component with AVIF/WebP
- ⚡ **Code Splitting** - Automatic code splitting for faster loads
- ⚡ **Lazy Loading** - Dynamic imports for heavy components
- ⚡ **CDN Ready** - Optimized for CDN deployment
- ⚡ **Service Worker** - PWA support for offline functionality

## 📁 Project Structure

```
workersbd-portal/
├── pages/
│   ├── _app.jsx                 # App wrapper with analytics
│   ├── _document.jsx            # Custom document with bilingual support
│   ├── index.jsx                # Homepage
│   ├── district/
│   │   └── [districtSlug].jsx   # District-specific pages
│   ├── jobs/
│   │   ├── index.jsx            # Job listings page
│   │   └── [jobId].jsx          # Individual job page
│   ├── workers/
│   │   └── [workerId].jsx       # Worker profile pages
│   └── category/
│       └── [categorySlug].jsx   # Category pages
├── components/
│   ├── SEOHead.jsx              # SEO component
│   ├── Map.jsx                  # Interactive map
│   └── Testimonials.jsx         # Testimonials section
├── lib/
│   ├── seo.js                   # SEO utilities and structured data
│   ├── translations.js          # Bilingual content
│   └── analytics.js             # Analytics integration
├── scripts/
│   └── generate-sitemap.js      # Sitemap generator
├── public/
│   ├── sitemap.xml              # Auto-generated sitemap
│   ├── robots.txt               # Search engine directives
│   └── [various icons]          # Favicon and app icons
├── styles/
│   └── globals.css              # Global styles
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── package.json                 # Dependencies
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- Git

### Step 1: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 2: Environment Variables
Create a `.env.local` file in the root directory:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://workersbd.com

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# API Keys (if using external APIs)
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
DATABASE_URL=your_database_url
```

### Step 3: Generate Sitemap
```bash
npm run sitemap
```

### Step 4: Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the site.

### Step 5: Production Build
```bash
npm run build
npm start
```

## 📊 SEO Implementation Details

### Structured Data
The site implements multiple schema types:

1. **JobPosting Schema** - For individual job listings
2. **Person Schema** - For worker profiles
3. **Organization Schema** - For company information
4. **LocalBusiness Schema** - For local SEO
5. **BreadcrumbList Schema** - For navigation
6. **FAQPage Schema** - For FAQ sections

### Meta Tags
Each page includes:
- Title and description (bilingual)
- Open Graph tags (Facebook, LinkedIn)
- Twitter Card tags
- Canonical URLs
- Language alternate tags (hreflang)
- Geographic tags for Bangladesh

### Sitemap Structure
- Main sitemap index
- Job listings sitemap
- District pages sitemap
- Category pages sitemap
- Blog/content sitemap

## 🌍 Bilingual Support

The site supports **English** and **বাংলা (Bangla)**:

### Language Implementation
- URL-based locale detection (`/en/` and `/bn/`)
- Automatic locale switching based on user preference
- Full translation of UI elements
- Language-specific fonts (Inter for English, Hind Siliguri for Bangla)
- Proper hreflang tags for search engines

### Adding Translations
Edit `lib/translations.js`:

```javascript
export const translations = {
  en: {
    common: {
      home: 'Home',
      // ... more translations
    }
  },
  bn: {
    common: {
      home: 'হোম',
      // ... more translations
    }
  }
};
```

## 📱 Mobile Optimization

### Features
- Mobile-first responsive design
- Touch-optimized UI elements
- Optimized font sizes (min 16px to prevent iOS zoom)
- Sticky headers and footers
- Swipeable carousels
- Progressive Web App (PWA) support
- Service Worker for offline functionality

### Performance
- Lighthouse Score Target: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change brand colors:

```javascript
colors: {
  primary: {
    500: '#0066cc',  // Main brand color
  },
  secondary: {
    500: '#ff6b35',  // Accent color
  }
}
```

### Districts
Add or modify districts in `lib/seo.js`:

```javascript
export const bangladeshDistricts = [
  { name: 'Dhaka', namebn: 'ঢাকা', lat: 23.8103, lng: 90.4125 },
  // ... add more
];
```

### Job Categories
Modify categories in `lib/seo.js`:

```javascript
export const jobCategories = [
  { slug: 'construction', name: 'Construction', namebn: 'নির্মাণ' },
  // ... add more
];
```

## 📈 Analytics & Tracking

### Implemented Tracking
- Page views
- Job views and applications
- Search queries
- User signups
- District/category navigation
- Conversions

### Custom Events
Use the analytics utilities:

```javascript
import { trackJobApplication } from '../lib/analytics';

const handleApply = () => {
  trackJobApplication(jobId, jobTitle);
  // ... application logic
};
```

## 🔒 Security Features

- HTTPS enforcement
- Content Security Policy headers
- XSS protection
- CSRF protection
- Secure headers (X-Frame-Options, etc.)
- Input validation and sanitization

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Netlify
```bash
netlify deploy --prod
```

### Custom Server
```bash
npm run build
npm start
```

## 📊 SEO Checklist

- ✅ Unique title and description for every page
- ✅ Structured data on all pages
- ✅ XML sitemap generated and submitted
- ✅ Robots.txt configured
- ✅ Canonical URLs set
- ✅ hreflang tags for bilingual content
- ✅ Fast loading times (< 3s)
- ✅ Mobile-friendly design
- ✅ Proper heading hierarchy (H1, H2, etc.)
- ✅ Image alt text
- ✅ Internal linking structure
- ✅ SSL certificate

## 🌐 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Content Management

### Adding New Jobs
Create API endpoint or use the admin panel to add jobs with:
- Title and description
- Company information
- Location and salary
- Required skills
- Employment type
- Application deadline

### Adding Blog Posts
Create MDX files in `content/blog/` directory with frontmatter:

```mdx
---
title: "Your Blog Title"
titlebn: "আপনার ব্লগের শিরোনাম"
date: "2025-10-28"
category: "Career Tips"
---

Your blog content here...
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - See LICENSE file for details

## 💬 Support

For questions or issues:
- Email: support@workersbd.com
- GitHub Issues: [github.com/workersbd/portal/issues]

## 🎯 Roadmap

- [ ] Advanced filtering system
- [ ] Real-time chat between employers and workers
- [ ] Video resume uploads
- [ ] AI-powered job matching
- [ ] Mobile apps (iOS/Android)
- [ ] Email notification system
- [ ] Payment integration for premium listings

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Google Search Console](https://search.google.com/search-console)
- [Schema.org](https://schema.org)

---

**Built with ❤️ for Bangladesh**

Last Updated: October 28, 2025
