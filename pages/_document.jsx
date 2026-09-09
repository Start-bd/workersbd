import { Html, Head, Main, NextScript } from 'next/document';
import { siteConfig } from '../lib/seo';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preload fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Hind+Siliguri:wght@400;500;700&display=swap"
          as="style"
        />

        {/* Basic meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="description" content={siteConfig.description} />
        <meta name="theme-color" content="#0066cc" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English,Bengali" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="WorkersBD" />

        {/* Open Graph */}
        <meta property="og:title" content={siteConfig.name} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteConfig.url} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta property="og:site_name" content={siteConfig.name} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="bn_BD" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteConfig.name} />
        <meta name="twitter:description" content={siteConfig.description} />
        <meta name="twitter:image" content={siteConfig.ogImage} />
        <meta name="twitter:handle" content={siteConfig.twitterHandle} />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* PWA Icons */}
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512x512.png" />

        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Canonical */}
        <link rel="canonical" href={siteConfig.url} />

        {/* Alternate language links */}
        <link rel="alternate" hrefLang="en" href={`${siteConfig.url}/en`} />
        <link rel="alternate" hrefLang="bn" href={`${siteConfig.url}/bn`} />
        <link rel="alternate" hrefLang="x-default" href={siteConfig.url} />

        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />

        {/* Preconnect for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'WorkersBD',
              alternateName: 'ওয়ার্কার্স বিডি',
              url: siteConfig.url,
              logo: `${siteConfig.url}/logo.png`,
              description: siteConfig.description,
              sameAs: [
                'https://www.facebook.com/workersbd',
                'https://twitter.com/workersbd',
                'https://www.linkedin.com/company/workersbd'
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                areaServed: 'BD',
                availableLanguage: ['en', 'bn']
              }
            }),
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'WorkersBD',
              url: siteConfig.url,
              description: siteConfig.description,
              inLanguage: ['en', 'bn'],
              potentialAction: {
                '@type': 'SearchAction',
                target: `${siteConfig.url}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string'
              }
            }),
          }}
        />
      </Head>
      <body className="bg-white text-gray-900">
        <Main />
        <NextScript />

        {/* Noscript fallback for analytics */}
        <noscript>
          <div
            style={{ display: 'none' }}
          >
            {/* Facebook pixel placeholder - replace with actual pixel ID */}
            fb-pixel
          </div>
        </noscript>
      </body>
    </Html>
  );
}
