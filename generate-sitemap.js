// scripts/generate-sitemap.js - Automated Sitemap Generator
const fs = require('fs');
const { bangladeshDistricts, jobCategories } = require('../lib/seo');

// Base URL configuration
const BASE_URL = 'https://workersbd.com';

// Generate sitemap XML
function generateSitemap() {
  const currentDate = new Date().toISOString();
  
  // Static pages
  const staticPages = [
    { url: '', changefreq: 'daily', priority: '1.0' },
    { url: '/jobs', changefreq: 'hourly', priority: '0.9' },
    { url: '/workers', changefreq: 'hourly', priority: '0.9' },
    { url: '/employers', changefreq: 'weekly', priority: '0.8' },
    { url: '/about', changefreq: 'monthly', priority: '0.7' },
    { url: '/contact', changefreq: 'monthly', priority: '0.7' },
    { url: '/blog', changefreq: 'daily', priority: '0.8' }
  ];

  // District pages (high priority for local SEO)
  const districtPages = bangladeshDistricts.flatMap(district => [
    {
      url: `/district/${district.name.toLowerCase()}`,
      changefreq: 'daily',
      priority: '0.9',
      locale: 'en'
    },
    {
      url: `/bn/district/${district.name.toLowerCase()}`,
      changefreq: 'daily',
      priority: '0.9',
      locale: 'bn'
    }
  ]);

  // Category pages
  const categoryPages = jobCategories.flatMap(category => [
    {
      url: `/category/${category.slug}`,
      changefreq: 'daily',
      priority: '0.8',
      locale: 'en'
    },
    {
      url: `/bn/category/${category.slug}`,
      changefreq: 'daily',
      priority: '0.8',
      locale: 'bn'
    }
  ]);

  // District + Category combination pages for deep local SEO
  const districtCategoryPages = bangladeshDistricts.flatMap(district =>
    jobCategories.slice(0, 5).map(category => ({
      url: `/district/${district.name.toLowerCase()}/category/${category.slug}`,
      changefreq: 'daily',
      priority: '0.85',
      locale: 'en'
    }))
  );

  // Combine all URLs
  const allPages = [
    ...staticPages,
    ...districtPages,
    ...categoryPages,
    ...districtCategoryPages
  ];

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map(page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${page.locale ? `
    <xhtml:link rel="alternate" hreflang="${page.locale}" href="${BASE_URL}${page.url}" />` : ''}
  </url>`).join('\n')}
</urlset>`;

  // Write sitemap
  fs.writeFileSync('./public/sitemap.xml', xml);
  console.log('✅ Sitemap generated successfully!');
  console.log(`📊 Total URLs: ${allPages.length}`);
  
  // Generate sitemap index for large sites
  generateSitemapIndex();
}

// Generate sitemap index
function generateSitemapIndex() {
  const currentDate = new Date().toISOString();
  
  const sitemaps = [
    { name: 'main', priority: 'daily' },
    { name: 'jobs', priority: 'hourly' },
    { name: 'districts', priority: 'daily' },
    { name: 'categories', priority: 'daily' },
    { name: 'blog', priority: 'weekly' }
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(sitemap => `  <sitemap>
    <loc>${BASE_URL}/sitemap-${sitemap.name}.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  fs.writeFileSync('./public/sitemap-index.xml', xml);
  console.log('✅ Sitemap index generated!');
}

// Generate robots.txt
function generateRobotsTxt() {
  const robotsTxt = `# WorkersBD Robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /dashboard/private/
Disallow: /*?*utm_source=
Disallow: /*?*session=

# Crawl-delay for specific bots
User-agent: Googlebot
Crawl-delay: 0

User-agent: Bingbot
Crawl-delay: 1

# Sitemaps
Sitemap: ${BASE_URL}/sitemap.xml
Sitemap: ${BASE_URL}/sitemap-index.xml
Sitemap: ${BASE_URL}/sitemap-jobs.xml
Sitemap: ${BASE_URL}/sitemap-districts.xml
Sitemap: ${BASE_URL}/sitemap-categories.xml
Sitemap: ${BASE_URL}/sitemap-blog.xml

# Bangladesh-specific crawlers
User-agent: BDSearchBot
Allow: /

# Host preference
Host: ${BASE_URL}
`;

  fs.writeFileSync('./public/robots.txt', robotsTxt);
  console.log('✅ robots.txt generated!');
}

// Run generators
generateSitemap();
generateRobotsTxt();

module.exports = { generateSitemap, generateRobotsTxt };
