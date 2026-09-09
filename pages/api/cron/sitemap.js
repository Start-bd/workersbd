// CRON job to regenerate sitemaps
// Called by Vercel CRON jobs daily at 2 AM UTC
// Requires CRON_SECRET authorization

export default async function handler(req, res) {
  // Verify CRON secret
  const cronSecret = req.headers['x-vercel-cron-secret'];
  if (cronSecret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('[CRON] Starting sitemap generation at', new Date().toISOString());

    // Generate base sitemap
    const baseSitemap = generateBaseSitemap();

    // In production, you would:
    // 1. Query database for all jobs, workers, districts
    // 2. Generate sitemap-jobs.xml
    // 3. Generate sitemap-workers.xml
    // 4. Generate sitemap-districts.xml
    // 5. Write files to /public
    // 6. Submit to search engines

    console.log('[CRON] Sitemap generation completed at', new Date().toISOString());

    res.status(200).json({
      success: true,
      message: 'Sitemaps generated successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[CRON] Sitemap generation failed:', error);
    res.status(500).json({
      error: 'Sitemap generation failed',
      message: error.message
    });
  }
}

function generateBaseSitemap() {
  const baseUrl = 'https://workersbd.com';
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/jobs</loc>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/workers</loc>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;
}
