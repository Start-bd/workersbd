// Automated Sitemap Generator for WorkersBD
// Generates XML sitemaps for better SEO indexing

import { bangladeshDistricts, jobCategories } from './seo';
import fs from 'fs';
import path from 'path';

// Generate main sitemap index
export const generateSitemapIndex = (outputDir = './public') => {
  const sitemaps = [
    'sitemap-main.xml',
    'sitemap-districts.xml',
    'sitemap-categories.xml',
    'sitemap-jobs.xml',
    'sitemap-blog.xml'
  ];

  const currentDate = new Date().toISOString();

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(sitemap => `  <sitemap>
    <loc>https://workersbd.com/${sitemap}</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  const filePath = path.join(outputDir, 'sitemap.xml');
  fs.writeFileSync(filePath, sitemapIndex);
  console.log(`✅ Sitemap index generated: ${filePath}`);

  return filePath;
};

// Generate main pages sitemap
export const generateMainSitemap = (outputDir = './public') => {
  const pages = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/about', priority: 0.8, changefreq: 'monthly' },
    { url: '/how-it-works', priority: 0.8, changefreq: 'monthly' },
    { url: '/pricing', priority: 0.7, changefreq: 'weekly' },
    { url: '/contact', priority: 0.6, changefreq: 'monthly' },
    { url: '/register/worker', priority: 0.9, changefreq: 'weekly' },
    { url: '/register/employer', priority: 0.9, changefreq: 'weekly' },
    { url: '/login', priority: 0.7, changefreq: 'weekly' },
    { url: '/districts', priority: 0.8, changefreq: 'daily' },
    { url: '/categories', priority: 0.8, changefreq: 'daily' },
    { url: '/blog', priority: 0.7, changefreq: 'weekly' },
    { url: '/faq', priority: 0.6, changefreq: 'monthly' },
    { url: '/terms', priority: 0.5, changefreq: 'monthly' },
    { url: '/privacy', priority: 0.5, changefreq: 'monthly' }
  ];

  const sitemap = generateSitemapXML(pages);
  const filePath = path.join(outputDir, 'sitemap-main.xml');
  fs.writeFileSync(filePath, sitemap);
  console.log(`✅ Main sitemap generated: ${filePath} (${pages.length} pages)`);

  return filePath;
};

// Generate districts sitemap
export const generateDistrictsSitemap = (outputDir = './public') => {
  const pages = [];

  // Add district list pages for both languages
  pages.push(
    { url: '/en/districts', priority: 0.8, changefreq: 'daily' },
    { url: '/bn/districts', priority: 0.8, changefreq: 'daily' }
  );

  // Add individual district pages
  bangladeshDistricts.forEach(district => {
    const slug = district.name.toLowerCase().replace(/\s+/g, '-');
    
    // English version
    pages.push({
      url: `/en/districts/${slug}`,
      priority: district.population > 1000000 ? 0.9 : 0.8,
      changefreq: 'daily'
    });

    // Bangla version
    pages.push({
      url: `/bn/districts/${slug}`,
      priority: district.population > 1000000 ? 0.9 : 0.8,
      changefreq: 'daily'
    });

    // Add district + category combinations for major districts
    if (district.population > 500000) {
      jobCategories.slice(0, 10).forEach(category => {
        pages.push({
          url: `/en/districts/${slug}/${category.id}`,
          priority: 0.7,
          changefreq: 'daily'
        });
        pages.push({
          url: `/bn/districts/${slug}/${category.id}`,
          priority: 0.7,
          changefreq: 'daily'
        });
      });
    }
  });

  const sitemap = generateSitemapXML(pages);
  const filePath = path.join(outputDir, 'sitemap-districts.xml');
  fs.writeFileSync(filePath, sitemap);
  console.log(`✅ Districts sitemap generated: ${filePath} (${pages.length} pages)`);

  return filePath;
};

// Generate categories sitemap
export const generateCategoriesSitemap = (outputDir = './public') => {
  const pages = [];

  // Add category list pages
  pages.push(
    { url: '/en/categories', priority: 0.8, changefreq: 'daily' },
    { url: '/bn/categories', priority: 0.8, changefreq: 'daily' }
  );

  // Add individual category pages
  jobCategories.forEach(category => {
    // English version
    pages.push({
      url: `/en/categories/${category.id}`,
      priority: 0.8,
      changefreq: 'daily'
    });

    // Bangla version
    pages.push({
      url: `/bn/categories/${category.id}`,
      priority: 0.8,
      changefreq: 'daily'
    });

    // Add category + district combinations for major categories
    const majorCategories = ['construction', 'electrical', 'garments', 'driver', 'it'];
    if (majorCategories.includes(category.id)) {
      bangladeshDistricts.slice(0, 10).forEach(district => {
        const slug = district.name.toLowerCase().replace(/\s+/g, '-');
        pages.push({
          url: `/en/categories/${category.id}/${slug}`,
          priority: 0.7,
          changefreq: 'daily'
        });
        pages.push({
          url: `/bn/categories/${category.id}/${slug}`,
          priority: 0.7,
          changefreq: 'daily'
        });
      });
    }
  });

  const sitemap = generateSitemapXML(pages);
  const filePath = path.join(outputDir, 'sitemap-categories.xml');
  fs.writeFileSync(filePath, sitemap);
  console.log(`✅ Categories sitemap generated: ${filePath} (${pages.length} pages)`);

  return filePath;
};

// Generate jobs sitemap (would be dynamic from database in production)
export const generateJobsSitemap = (jobs = [], outputDir = './public') => {
  const pages = jobs.map(job => ({
    url: `/jobs/${job.id}`,
    priority: 0.6,
    changefreq: 'daily',
    lastmod: job.datePosted || new Date().toISOString()
  }));

  // Add job search pages
  pages.push(
    { url: '/jobs', priority: 0.9, changefreq: 'hourly' },
    { url: '/en/jobs', priority: 0.9, changefreq: 'hourly' },
    { url: '/bn/jobs', priority: 0.9, changefreq: 'hourly' }
  );

  const sitemap = generateSitemapXML(pages);
  const filePath = path.join(outputDir, 'sitemap-jobs.xml');
  fs.writeFileSync(filePath, sitemap);
  console.log(`✅ Jobs sitemap generated: ${filePath} (${pages.length} pages)`);

  return filePath;
};

// Generate blog sitemap
export const generateBlogSitemap = (posts = [], outputDir = './public') => {
  const pages = [];

  // Add blog index
  pages.push(
    { url: '/blog', priority: 0.8, changefreq: 'weekly' },
    { url: '/en/blog', priority: 0.8, changefreq: 'weekly' },
    { url: '/bn/blog', priority: 0.8, changefreq: 'weekly' }
  );

  // Add individual blog posts
  posts.forEach(post => {
    pages.push({
      url: `/blog/${post.slug}`,
      priority: 0.6,
      changefreq: 'monthly',
      lastmod: post.publishDate || new Date().toISOString()
    });
  });

  // Add common blog categories
  const blogCategories = [
    'career-tips',
    'interview-guides',
    'salary-guides',
    'worker-rights',
    'employer-guides',
    'success-stories'
  ];

  blogCategories.forEach(category => {
    pages.push({
      url: `/blog/category/${category}`,
      priority: 0.7,
      changefreq: 'weekly'
    });
  });

  const sitemap = generateSitemapXML(pages);
  const filePath = path.join(outputDir, 'sitemap-blog.xml');
  fs.writeFileSync(filePath, sitemap);
  console.log(`✅ Blog sitemap generated: ${filePath} (${pages.length} pages)`);

  return filePath;
};

// Helper function to generate XML from pages array
const generateSitemapXML = (pages) => {
  const currentDate = new Date().toISOString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages.map(page => `  <url>
    <loc>https://workersbd.com${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
};

// Generate robots.txt
export const generateRobotsTxt = (outputDir = './public') => {
  const robotsTxt = `# WorkersBD Robots.txt
# Generated on ${new Date().toISOString()}

User-agent: *
Allow: /
Allow: /jobs
Allow: /districts
Allow: /categories
Allow: /blog
Disallow: /admin
Disallow: /api/private
Disallow: /dashboard
Disallow: /*?*utm_source=
Disallow: /*?*session_id=

# Sitemaps
Sitemap: https://workersbd.com/sitemap.xml
Sitemap: https://workersbd.com/sitemap-districts.xml
Sitemap: https://workersbd.com/sitemap-categories.xml
Sitemap: https://workersbd.com/sitemap-jobs.xml
Sitemap: https://workersbd.com/sitemap-blog.xml

# Crawl-delay for specific bots
User-agent: Googlebot
Crawl-delay: 0

User-agent: Bingbot
Crawl-delay: 1

# Block bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Crawl-delay: 10

# Allow images
User-agent: Googlebot-Image
Allow: /images/
Allow: /uploads/

# Mobile
User-agent: Googlebot-Mobile
Allow: /
`;

  const filePath = path.join(outputDir, 'robots.txt');
  fs.writeFileSync(filePath, robotsTxt);
  console.log(`✅ Robots.txt generated: ${filePath}`);

  return filePath;
};

// Generate all sitemaps
export const generateAllSitemaps = (jobs = [], posts = [], outputDir = './public') => {
  console.log('🚀 Generating all sitemaps...\n');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate all sitemaps
  generateSitemapIndex(outputDir);
  generateMainSitemap(outputDir);
  generateDistrictsSitemap(outputDir);
  generateCategoriesSitemap(outputDir);
  generateJobsSitemap(jobs, outputDir);
  generateBlogSitemap(posts, outputDir);
  generateRobotsTxt(outputDir);

  console.log('\n✅ All sitemaps generated successfully!');
  console.log(`📍 Location: ${outputDir}`);
  console.log('\n🔗 Submit these URLs to Google Search Console:');
  console.log('   https://workersbd.com/sitemap.xml');
  console.log('   https://workersbd.com/robots.txt');
};

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const outputDir = args[0] || './public';
  
  // Mock data for demonstration
  const mockJobs = Array.from({ length: 100 }, (_, i) => ({
    id: `job-${i + 1}`,
    datePosted: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  }));

  const mockPosts = [
    { slug: 'how-to-write-cv-bangladesh', publishDate: '2025-01-15' },
    { slug: 'best-paid-jobs-bangladesh-2025', publishDate: '2025-01-20' },
    { slug: 'interview-tips-bangla', publishDate: '2025-01-25' },
    { slug: 'worker-rights-bangladesh', publishDate: '2025-02-01' },
    { slug: 'find-electrician-jobs-dhaka', publishDate: '2025-02-05' }
  ];

  generateAllSitemaps(mockJobs, mockPosts, outputDir);
}

export default {
  generateSitemapIndex,
  generateMainSitemap,
  generateDistrictsSitemap,
  generateCategoriesSitemap,
  generateJobsSitemap,
  generateBlogSitemap,
  generateRobotsTxt,
  generateAllSitemaps
};
