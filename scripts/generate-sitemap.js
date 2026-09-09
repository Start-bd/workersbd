#!/usr/bin/env node

/**
 * Sitemap Generator for WorkersBD
 * Generates dynamic sitemap.xml after build
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://workersbd.com';
const PAGES_DIR = path.join(process.cwd(), 'pages');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

// Ensure public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Routes that should be included in sitemap
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.6', changefreq: 'yearly' },
  { path: '/terms', priority: '0.6', changefreq: 'yearly' },
];

/**
 * Generate XML sitemap
 */
function generateSitemap() {
  const urls = staticRoutes
    .map(
      (route) => `
  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:mobile="http://www.mobile.googlebot.com/schemas/mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls}
</urlset>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
  console.log('✓ Sitemap generated successfully at public/sitemap.xml');
}

/**
 * Generate robots.txt
 */
function generateRobots() {
  const robots = `# WorkersBD Robots Configuration
# Allow all crawlers except bad actors

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /.git/

# Sitemap location
Sitemap: ${SITE_URL}/sitemap.xml

# Crawl delay for performance
Crawl-delay: 1

# Google specific
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Bing specific
User-agent: Bingbot
Allow: /
Crawl-delay: 1
`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robots);
  console.log('✓ Robots.txt generated successfully at public/robots.txt');
}

// Generate both files
try {
  generateSitemap();
  generateRobots();
  console.log('✓ SEO files generated successfully');
} catch (error) {
  console.error('✗ Error generating SEO files:', error.message);
  process.exit(1);
}
