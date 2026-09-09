// Advanced SEO Utilities for WorkersBD Portal
// Mobile-optimized, Bangladesh-focused SEO helpers

export const generateMetaTags = (page, language = 'en') => {
  const baseUrl = 'https://workersbd.com';
  
  const translations = {
    en: {
      siteName: 'WorkersBD - Bangladesh Job Portal',
      tagline: 'Connect Skilled Workers with Employers Across Bangladesh',
    },
    bn: {
      siteName: 'ওয়ার্কার্সবিডি - বাংলাদেশ চাকরি পোর্টাল',
      tagline: 'বাংলাদেশ জুড়ে দক্ষ কর্মী এবং নিয়োগকর্তাদের সংযুক্ত করুন',
    }
  };

  const meta = {
    charset: 'UTF-8',
    viewport: 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes',
    'theme-color': '#10B981',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    googlebot: 'index, follow',
    'google-site-verification': 'your-verification-code',
    language: language,
    'content-language': language === 'bn' ? 'bn-BD' : 'en-US',
    author: 'WorkersBD Team',
    publisher: 'WorkersBD',
    ...page.meta
  };

  return meta;
};

// Bangladesh Districts for SEO
export const bangladeshDistricts = [
  { name: 'Dhaka', bn: 'ঢাকা', division: 'Dhaka', population: 12000000, lat: 23.8103, lng: 90.4125 },
  { name: 'Chattogram', bn: 'চট্টগ্রাম', division: 'Chattogram', population: 5000000, lat: 22.3569, lng: 91.7832 },
  { name: 'Sylhet', bn: 'সিলেট', division: 'Sylhet', population: 500000, lat: 24.8949, lng: 91.8687 },
  { name: 'Rajshahi', bn: 'রাজশাহী', division: 'Rajshahi', population: 840000, lat: 24.3745, lng: 88.6042 },
  { name: 'Khulna', bn: 'খুলনা', division: 'Khulna', population: 1500000, lat: 22.8456, lng: 89.5403 },
  { name: 'Barishal', bn: 'বরিশাল', division: 'Barishal', population: 330000, lat: 22.7010, lng: 90.3535 },
  { name: 'Rangpur', bn: 'রংপুর', division: 'Rangpur', population: 300000, lat: 25.7439, lng: 89.2752 },
  { name: 'Mymensingh', bn: 'ময়মনসিংহ', division: 'Mymensingh', population: 500000, lat: 24.7471, lng: 90.4203 },
  { name: 'Cumilla', bn: 'কুমিল্লা', division: 'Chattogram', population: 500000, lat: 23.4607, lng: 91.1809 },
  { name: 'Narayanganj', bn: 'নারায়ণগঞ্জ', division: 'Dhaka', population: 900000, lat: 23.6238, lng: 90.5000 },
  { name: 'Gazipur', bn: 'গাজীপুর', division: 'Dhaka', population: 3400000, lat: 23.9999, lng: 90.4203 },
  { name: 'Jessore', bn: 'যশোর', division: 'Khulna', population: 250000, lat: 23.1634, lng: 89.2182 },
  { name: 'Bogra', bn: 'বগুড়া', division: 'Rajshahi', population: 400000, lat: 24.8465, lng: 89.3770 },
  { name: 'Dinajpur', bn: 'দিনাজপুর', division: 'Rangpur', population: 200000, lat: 25.6279, lng: 88.6332 },
  { name: 'Pabna', bn: 'পাবনা', division: 'Rajshahi', population: 160000, lat: 24.0064, lng: 89.2372 },
  { name: 'Tangail', bn: 'টাঙ্গাইল', division: 'Dhaka', population: 180000, lat: 24.2513, lng: 89.9167 }
];

// Job Categories with Bangla translations
export const jobCategories = [
  { id: 'construction', en: 'Construction & Building', bn: 'নির্মাণ ও বিল্ডিং', icon: '🏗️' },
  { id: 'electrical', en: 'Electrical Work', bn: 'বৈদ্যুতিক কাজ', icon: '⚡' },
  { id: 'plumbing', en: 'Plumbing & Sanitation', bn: 'প্লাম্বিং ও স্যানিটেশন', icon: '🔧' },
  { id: 'carpentry', en: 'Carpentry & Woodwork', bn: 'কাঠমিস্ত্রি', icon: '🪚' },
  { id: 'welding', en: 'Welding & Metal Work', bn: 'ঢালাই ও ধাতব কাজ', icon: '🔥' },
  { id: 'painting', en: 'Painting & Decoration', bn: 'পেইন্টিং ও সাজসজ্জা', icon: '🎨' },
  { id: 'driver', en: 'Driving & Transport', bn: 'চালনা ও পরিবহন', icon: '🚗' },
  { id: 'garments', en: 'Garments & Textile', bn: 'গার্মেন্টস ও টেক্সটাইল', icon: '👔' },
  { id: 'housekeeping', en: 'Housekeeping & Cleaning', bn: 'গৃহকর্ম ও পরিচ্ছন্নতা', icon: '🧹' },
  { id: 'security', en: 'Security & Guard', bn: 'নিরাপত্তা ও প্রহরী', icon: '🛡️' },
  { id: 'cooking', en: 'Cooking & Food Service', bn: 'রান্না ও খাদ্য সেবা', icon: '👨‍🍳' },
  { id: 'agriculture', en: 'Agriculture & Farming', bn: 'কৃষি ও খামার', icon: '🌾' },
  { id: 'mechanic', en: 'Mechanic & Repair', bn: 'মেকানিক ও মেরামত', icon: '⚙️' },
  { id: 'beauty', en: 'Beauty & Salon', bn: 'বিউটি ও সেলুন', icon: '💇' },
  { id: 'healthcare', en: 'Healthcare & Nursing', bn: 'স্বাস্থ্যসেবা ও নার্সিং', icon: '⚕️' },
  { id: 'it', en: 'IT & Computer', bn: 'আইটি ও কম্পিউটার', icon: '💻' },
  { id: 'delivery', en: 'Delivery & Logistics', bn: 'ডেলিভারি ও লজিস্টিকস', icon: '📦' },
  { id: 'teaching', en: 'Teaching & Tutoring', bn: 'শিক্ষকতা ও টিউশন', icon: '📚' }
];

// Generate structured data for Job Posting
export const generateJobPostingSchema = (job, language = 'en') => {
  return {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    identifier: {
      '@type': 'PropertyValue',
      name: job.employerName || 'WorkersBD',
      value: job.id
    },
    datePosted: job.datePosted,
    validThrough: job.validThrough || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    employmentType: job.employmentType || 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: job.employerName || 'WorkersBD',
      sameAs: `https://workersbd.com/employer/${job.employerId}`,
      logo: job.employerLogo || 'https://workersbd.com/logo.png'
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: job.address || '',
        addressLocality: job.location,
        addressRegion: job.district,
        addressCountry: 'BD'
      },
      geo: job.lat && job.lng ? {
        '@type': 'GeoCoordinates',
        latitude: job.lat,
        longitude: job.lng
      } : undefined
    },
    baseSalary: job.salary ? {
      '@type': 'MonetaryAmount',
      currency: 'BDT',
      value: {
        '@type': 'QuantitativeValue',
        value: job.salary,
        unitText: 'MONTH'
      }
    } : undefined,
    skills: job.skills || [],
    industry: job.category,
    workHours: job.workHours || '8-10 hours per day'
  };
};

// Generate Person/Worker Profile Schema
export const generatePersonSchema = (worker) => {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Person',
    name: worker.name,
    jobTitle: worker.jobTitle,
    description: worker.bio,
    address: {
      '@type': 'PostalAddress',
      addressLocality: worker.location,
      addressCountry: 'BD'
    },
    knowsAbout: worker.skills || [],
    email: worker.publicEmail || undefined,
    telephone: worker.publicPhone || undefined,
    image: worker.profileImage || undefined
  };
};

// Generate FAQ Schema
export const generateFAQSchema = (faqs) => {
  return {
    '@context': 'https://schema.org/',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

// Generate BreadcrumbList Schema
export const generateBreadcrumbSchema = (breadcrumbs) => {
  return {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://workersbd.com${item.url}`
    }))
  };
};

// SEO-friendly URL generator
export const generateSEOUrl = (text, language = 'en') => {
  const banglaToEnglish = {
    'ঢাকা': 'dhaka',
    'চট্টগ্রাম': 'chattogram',
    'সিলেট': 'sylhet',
    'রাজশাহী': 'rajshahi',
    'খুলনা': 'khulna',
    'বরিশাল': 'barishal',
    'রংপুর': 'rangpur',
    'ময়মনসিংহ': 'mymensingh'
  };

  let slug = text.toLowerCase();
  
  // Replace Bangla words with English equivalents
  Object.keys(banglaToEnglish).forEach(bn => {
    slug = slug.replace(bn, banglaToEnglish[bn]);
  });
  
  // Remove special characters and spaces
  slug = slug
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  
  return slug;
};

// Generate sitemap entry
export const generateSitemapEntry = (url, lastmod, changefreq = 'weekly', priority = 0.8) => {
  return {
    loc: `https://workersbd.com${url}`,
    lastmod: lastmod || new Date().toISOString().split('T')[0],
    changefreq,
    priority
  };
};

// Bangladesh-specific keywords generator
export const generateLocalKeywords = (baseKeyword, district, language = 'en') => {
  const templates = {
    en: [
      `${baseKeyword} in ${district}`,
      `${baseKeyword} jobs ${district}`,
      `${district} ${baseKeyword}`,
      `${baseKeyword} near ${district}`,
      `find ${baseKeyword} ${district}`,
      `hire ${baseKeyword} ${district}`,
      `${baseKeyword} vacancy ${district}`,
      `skilled ${baseKeyword} ${district} bangladesh`
    ],
    bn: [
      `${district} ${baseKeyword}`,
      `${district} এ ${baseKeyword}`,
      `${district} ${baseKeyword} চাকরি`,
      `${baseKeyword} খুঁজুন ${district}`,
      `${district} দক্ষ ${baseKeyword}`
    ]
  };
  
  return templates[language] || templates.en;
};

// Mobile performance optimization hints
export const mobileOptimizationHeaders = {
  'Cache-Control': 'public, max-age=31536000, immutable',
  'Content-Encoding': 'gzip',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(self), microphone=(), camera=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
};

export default {
  generateMetaTags,
  generateJobPostingSchema,
  generatePersonSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateSEOUrl,
  generateSitemapEntry,
  generateLocalKeywords,
  bangladeshDistricts,
  jobCategories,
  mobileOptimizationHeaders
};
