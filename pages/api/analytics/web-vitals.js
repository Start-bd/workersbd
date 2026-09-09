// Web Vitals analytics endpoint
// Receives Core Web Vitals metrics from the client

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { metric, value, id, page, userAgent } = req.body;

    // Log Web Vitals metrics
    console.log('[Web Vitals]', {
      metric,
      value: typeof value === 'number' ? value.toFixed(2) : value,
      page,
      timestamp: new Date().toISOString()
    });

    // In production, you would store these in a database or analytics service
    // For now, we just acknowledge receipt

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.status(200).json({ 
      success: true,
      message: 'Web Vitals metric received'
    });
  } catch (error) {
    console.error('[Web Vitals Error]', error);
    res.status(500).json({ 
      error: 'Failed to process Web Vitals metric'
    });
  }
}
