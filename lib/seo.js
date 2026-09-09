// lib/seo.js - Comprehensive SEO Utilities

export const siteConfig = {
  name: 'WorkersBD',
  namebn: 'ওয়ার্কার্স বিডি',
  url: 'https://workersbd.com',
  description: 'Find skilled workers and quality jobs across Bangladesh. Connect employers with talented professionals in Dhaka, Chittagong, and beyond.',
  descriptionbn: 'বাংলাদেশ জুড়ে দক্ষ শ্রমিক এবং মানসম্মত চাকরি খুঁজুন। ঢাকা, চট্টগ্রাম এবং সর্বত্র নিয়োগকর্তাদের সাথে প্রতিভাবান পেশাদারদের সংযুক্ত করুন।',
  ogImage: 'https://workersbd.com/og-image.jpg',
  twitterHandle: '@workersbd',
  fbAppId: 'YOUR_FB_APP_ID'
};

// Generate Job Posting Schema
export function generateJobPostingSchema(job) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    identifier: {
      '@type': 'PropertyValue',
      name: job.employerName,
      value: job.id
    },
    datePosted: job.datePosted,
    validThrough: job.validThrough,
    employmentType: job.employmentType || 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: job.employerName,
      sameAs: job.employerWebsite,
      logo: job.employerLogo
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: job.streetAddress,
        addressLocality: job.city,
        addressRegion: job.district,
        postalCode: job.postalCode,
        addressCountry: 'BD'
      }
    },
    baseSalary: job.salary ? {
      '@type': 'MonetaryAmount',
      currency: 'BDT',
      value: {
        '@type': 'QuantitativeValue',
        value: job.salary,
        unitText: job.salaryPeriod || 'MONTH'
      }
    } : undefined,
    skills: job.skills,
    qualifications: job.qualifications,
    responsibilities: job.responsibilities,
    benefits: job.benefits
  };
}

// Generate Person Schema for Worker Profiles
export function generatePersonSchema(worker) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Person',
    name: worker.name,
    jobTitle: worker.profession,
    description: worker.bio,
    image: worker.photo,
    address: {
      '@type': 'PostalAddress',
      addressLocality: worker.city,
      addressRegion: worker.district,
      addressCountry: 'BD'
    },
    knowsAbout: worker.skills,
    hasOccupation: {
      '@type': 'Occupation',
      name: worker.profession,
      skills: worker.skills,
      experienceRequirements: worker.experience
    },
    url: `https://workersbd.com/worker/${worker.id}`
  };
}

// Generate Local Business Schema
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'WorkersBD',
    image: 'https://workersbd.com/logo.png',
    '@id': 'https://workersbd.com',
    url: 'https://workersbd.com',
    telephone: '+880-XXX-XXXXXX',
    priceRange: 'Free',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Your Street',
      addressLocality: 'Dhaka',
      postalCode: '1000',
      addressCountry: 'BD'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 23.8103,
      longitude: 90.4125
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '00:00',
      closes: '23:59'
    },
    sameAs: [
      'https://www.facebook.com/workersbd',
      'https://twitter.com/workersbd',
      'https://www.linkedin.com/company/workersbd'
    ]
  };
}

// Generate Breadcrumb Schema
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

// Generate FAQ Schema
export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
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
}

// Generate Organization Schema
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WorkersBD',
    alternateName: 'ওয়ার্কার্স বিডি',
    url: 'https://workersbd.com',
    logo: 'https://workersbd.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+880-XXX-XXXXXX',
      contactType: 'customer service',
      areaServed: 'BD',
      availableLanguage: ['en', 'bn']
    },
    sameAs: [
      'https://www.facebook.com/workersbd',
      'https://twitter.com/workersbd',
      'https://www.linkedin.com/company/workersbd'
    ]
  };
}

// Bangladesh Districts for Local SEO
export const bangladeshDistricts = [
  { name: 'Dhaka', namebn: 'ঢাকা', lat: 23.8103, lng: 90.4125 },
  { name: 'Chittagong', namebn: 'চট্টগ্রাম', lat: 22.3569, lng: 91.7832 },
  { name: 'Sylhet', namebn: 'সিলেট', lat: 24.8949, lng: 91.8687 },
  { name: 'Rajshahi', namebn: 'রাজশাহী', lat: 24.3745, lng: 88.6042 },
  { name: 'Khulna', namebn: 'খুলনা', lat: 22.8456, lng: 89.5403 },
  { name: 'Barisal', namebn: 'বরিশাল', lat: 22.7010, lng: 90.3535 },
  { name: 'Rangpur', namebn: 'রংপুর', lat: 25.7439, lng: 89.2752 },
  { name: 'Mymensingh', namebn: 'ময়মনসিংহ', lat: 24.7471, lng: 90.4203 },
  { name: 'Comilla', namebn: 'কুমিল্লা', lat: 23.4607, lng: 91.1809 },
  { name: 'Gazipur', namebn: 'গাজীপুর', lat: 24.0022, lng: 90.4264 },
  { name: 'Narayanganj', namebn: 'নারায়ণগঞ্জ', lat: 23.6238, lng: 90.5000 },
  { name: 'Cox\'s Bazar', namebn: 'কক্সবাজার', lat: 21.4272, lng: 92.0058 }
];

// Job Categories for SEO
export const jobCategories = [
  { slug: 'construction', name: 'Construction', namebn: 'নির্মাণ' },
  { slug: 'electrician', name: 'Electrician', namebn: 'বিদ্যুৎকর্মী' },
  { slug: 'plumber', name: 'Plumber', namebn: 'প্লাম্বার' },
  { slug: 'driver', name: 'Driver', namebn: 'চালক' },
  { slug: 'it-software', name: 'IT & Software', namebn: 'আইটি ও সফটওয়্যার' },
  { slug: 'healthcare', name: 'Healthcare', namebn: 'স্বাস্থ্যসেবা' },
  { slug: 'education', name: 'Education', namebn: 'শিক্ষা' },
  { slug: 'hospitality', name: 'Hospitality', namebn: 'আতিথেয়তা' },
  { slug: 'manufacturing', name: 'Manufacturing', namebn: 'উৎপাদন' },
  { slug: 'retail', name: 'Retail', namebn: 'খুচরা বিক্রয়' }
];

// Generate Meta Tags
export function generateMetaTags({ 
  title, 
  titlebn,
  description, 
  descriptionbn,
  canonical,
  locale = 'en',
  ogImage,
  keywords = [],
  noindex = false 
}) {
  const isBangla = locale === 'bn';
  const finalTitle = isBangla && titlebn ? titlebn : title;
  const finalDescription = isBangla && descriptionbn ? descriptionbn : description;
  
  return {
    title: finalTitle,
    description: finalDescription,
    canonical: canonical || siteConfig.url,
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonical || siteConfig.url,
      siteName: isBangla ? siteConfig.namebn : siteConfig.name,
      images: [
        {
          url: ogImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: finalTitle
        }
      ],
      locale: locale,
      type: 'website'
    },
    twitter: {
      handle: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
      cardType: 'summary_large_image'
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: keywords.join(', ')
      },
      {
        name: 'author',
        content: 'WorkersBD'
      },
      {
        name: 'theme-color',
        content: '#0066cc'
      },
      {
        property: 'fb:app_id',
        content: siteConfig.fbAppId
      }
    ],
    robotsProps: noindex ? {
      noindex: true,
      nofollow: true
    } : {
      index: true,
      follow: true
    }
  };
}

const seoModule = {
  siteConfig,
  generateJobPostingSchema,
  generatePersonSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateMetaTags,
  bangladeshDistricts,
  jobCategories
};

export default seoModule;
