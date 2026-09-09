// pages/districts/[districtSlug].jsx - Mobile-Optimized District Page
import { useState, useEffect } from 'react';
import SEOHead from '../../components/SEOHead';
import dynamic from 'next/dynamic';
import { 
  generateBreadcrumbSchema, 
  generateFAQSchema,
  generateLocalBusinessSchema,
  bangladeshDistricts,
  jobCategories 
} from '../../lib/seo';
import { getTranslation } from '../../lib/translations';

// Lazy load map component for better mobile performance
const MapComponent = dynamic(() => import('../../components/Map'), {
  ssr: false,
  loading: () => <div className="skeleton-map">Loading map...</div>
});

export default function DistrictPage({ district, jobs, locale }) {
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isBangla = locale === 'bn';
  const districtName = isBangla ? district.namebn : district.name;
  
  // SEO Configuration
  const pageTitle = `${districtName} Jobs - Find Latest Employment Opportunities`;
  const pageTitleBn = `${district.namebn} এ চাকরি - সর্বশেষ কর্মসংস্থানের সুযোগ খুঁজুন`;
  const pageDescription = `Browse ${jobs.length}+ jobs in ${districtName}, Bangladesh. Find quality employment opportunities for skilled workers, professionals, and laborers in ${districtName} district.`;
  const pageDescriptionBn = `${district.namebn}, বাংলাদেশে ${jobs.length}+ চাকরি ব্রাউজ করুন। ${district.namebn} জেলায় দক্ষ কর্মী, পেশাদার এবং শ্রমিকদের জন্য মানসম্মত কর্মসংস্থানের সুযোগ খুঁজুন।`;
  
  const keywords = [
    `${districtName} jobs`,
    `jobs in ${districtName}`,
    `${districtName} employment`,
    `${districtName} vacancies`,
    `${districtName} careers`,
    'Bangladesh jobs',
    `${district.namebn} চাকরি`,
    'কর্মসংস্থান',
    'নিয়োগ'
  ];

  // Structured Data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://workersbd.com' },
    { name: 'Districts', url: 'https://workersbd.com/districts' },
    { name: districtName, url: `https://workersbd.com/district/${district.slug}` }
  ]);

  const faqSchema = generateFAQSchema([
    {
      question: `How many jobs are available in ${districtName}?`,
      answer: `Currently, there are ${jobs.length}+ active job listings in ${districtName}, Bangladesh across various categories including construction, IT, healthcare, and more.`
    },
    {
      question: `What are the top industries hiring in ${districtName}?`,
      answer: `The top hiring industries in ${districtName} include construction, manufacturing, IT & software, healthcare, education, and retail sectors.`
    },
    {
      question: `How can I apply for jobs in ${districtName}?`,
      answer: `You can browse available jobs on this page and click 'Apply Now' on any listing. Create a free WorkersBD account to apply and track your applications.`
    }
  ]);

  const localBusinessSchema = generateLocalBusinessSchema();

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [breadcrumbSchema, faqSchema, localBusinessSchema]
  };

  // Filter jobs by category
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter(job => job.category === category));
    }
  };

  return (
    <>
      <SEOHead
        title={pageTitle}
        titlebn={pageTitleBn}
        description={pageDescription}
        descriptionbn={pageDescriptionBn}
        canonical={`https://workersbd.com/district/${district.slug}`}
        locale={locale}
        keywords={keywords}
        structuredData={structuredData}
        ogImage={`https://workersbd.com/og/district-${district.slug}.jpg`}
      />

      {/* Mobile-Optimized Layout */}
      <div className="district-page mobile-optimized">
        
        {/* Hero Section - Mobile First */}
        <section className="hero-section" style={styles.hero}>
          <div className="container" style={styles.container}>
            <h1 style={styles.h1}>
              {isBangla ? `${district.namebn} এ চাকরি` : `Jobs in ${districtName}`}
            </h1>
            <p style={styles.subtitle}>
              {isBangla 
                ? `${jobs.length}+ সক্রিয় চাকরির তালিকা উপলব্ধ`
                : `${jobs.length}+ active job listings available`
              }
            </p>
            
            {/* Mobile Search Bar */}
            <div className="mobile-search" style={styles.searchBar}>
              <input
                type="text"
                placeholder={isBangla ? 'চাকরি, দক্ষতা বা কোম্পানি অনুসন্ধান করুন...' : 'Search jobs, skills, or companies...'}
                style={styles.searchInput}
                aria-label="Job search"
              />
              <button style={styles.searchButton} aria-label="Search">
                🔍
              </button>
            </div>
          </div>
        </section>

        {/* Mobile Filter Pills */}
        <section className="filter-section" style={styles.filterSection}>
          <div className="container" style={styles.container}>
            <div className="filter-pills" style={styles.filterPills}>
              <button
                onClick={() => handleCategoryFilter('all')}
                style={{
                  ...styles.filterPill,
                  ...(selectedCategory === 'all' ? styles.filterPillActive : {})
                }}
                aria-pressed={selectedCategory === 'all'}
              >
                {isBangla ? 'সব' : 'All'} ({jobs.length})
              </button>
              {jobCategories.slice(0, 6).map(category => (
                <button
                  key={category.slug}
                  onClick={() => handleCategoryFilter(category.slug)}
                  style={{
                    ...styles.filterPill,
                    ...(selectedCategory === category.slug ? styles.filterPillActive : {})
                  }}
                  aria-pressed={selectedCategory === category.slug}
                >
                  {isBangla ? category.namebn : category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section - Lazy Loaded */}
        <section className="map-section" style={styles.mapSection}>
          <div className="container" style={styles.container}>
            <h2 style={styles.h2}>
              {isBangla ? `${district.namebn} এ চাকরির অবস্থান` : `Job Locations in ${districtName}`}
            </h2>
            <div style={styles.mapContainer}>
              <MapComponent 
                center={[district.lat, district.lng]} 
                zoom={11}
                jobs={filteredJobs}
              />
            </div>
          </div>
        </section>

        {/* Jobs Grid - Mobile Optimized */}
        <section className="jobs-section" style={styles.jobsSection}>
          <div className="container" style={styles.container}>
            <div className="jobs-header" style={styles.jobsHeader}>
              <h2 style={styles.h2}>
                {isBangla ? 'সব চাকরি' : 'Available Jobs'}
              </h2>
              <span style={styles.jobCount}>
                {filteredJobs.length} {isBangla ? 'টি চাকরি' : 'jobs'}
              </span>
            </div>

            <div className="jobs-grid" style={styles.jobsGrid}>
              {filteredJobs.map(job => (
                <article key={job.id} className="job-card" style={styles.jobCard}>
                  <div className="job-card-header">
                    <h3 style={styles.jobTitle}>{job.title}</h3>
                    <span style={styles.jobCompany}>{job.company}</span>
                  </div>
                  
                  <div className="job-meta" style={styles.jobMeta}>
                    <span style={styles.metaItem}>
                      📍 {job.location}
                    </span>
                    <span style={styles.metaItem}>
                      💰 {job.salary}
                    </span>
                    <span style={styles.metaItem}>
                      ⏰ {job.type}
                    </span>
                  </div>

                  <p style={styles.jobDescription}>
                    {job.description.substring(0, 100)}...
                  </p>

                  <div className="job-footer" style={styles.jobFooter}>
                    <span style={styles.postedDate}>
                      {isBangla ? 'পোস্ট করা হয়েছে: ' : 'Posted: '}{job.datePosted}
                    </span>
                    <button style={styles.applyButton} aria-label={`Apply for ${job.title}`}>
                      {isBangla ? 'আবেদন করুন' : 'Apply Now'}
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More Button for Mobile */}
            {filteredJobs.length > 20 && (
              <div style={styles.loadMoreContainer}>
                <button style={styles.loadMoreButton}>
                  {isBangla ? 'আরো দেখুন' : 'Load More Jobs'}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section for SEO */}
        <section className="faq-section" style={styles.faqSection}>
          <div className="container" style={styles.container}>
            <h2 style={styles.h2}>
              {isBangla ? 'প্রায়শই জিজ্ঞাসিত প্রশ্ন' : 'Frequently Asked Questions'}
            </h2>
            
            <div className="faq-list" style={styles.faqList}>
              <details style={styles.faqItem}>
                <summary style={styles.faqQuestion}>
                  {isBangla ? `${district.namebn} এ কত চাকরি উপলব্ধ?` : `How many jobs are available in ${districtName}?`}
                </summary>
                <p style={styles.faqAnswer}>
                  {isBangla 
                    ? `বর্তমানে ${district.namebn}, বাংলাদেশে ${jobs.length}+ সক্রিয় চাকরির তালিকা রয়েছে।`
                    : `Currently, there are ${jobs.length}+ active job listings in ${districtName}, Bangladesh.`
                  }
                </p>
              </details>

              <details style={styles.faqItem}>
                <summary style={styles.faqQuestion}>
                  {isBangla ? `${district.namebn} এ কোন শিল্পগুলি নিয়োগ দিচ্ছে?` : `What industries are hiring in ${districtName}?`}
                </summary>
                <p style={styles.faqAnswer}>
                  {isBangla 
                    ? 'শীর্ষ নিয়োগকারী শিল্পগুলির মধ্যে রয়েছে নির্মাণ, উৎপাদন, আইটি, স্বাস্থ্যসেবা এবং শিক্ষা।'
                    : 'Top hiring industries include construction, manufacturing, IT, healthcare, and education.'
                  }
                </p>
              </details>

              <details style={styles.faqItem}>
                <summary style={styles.faqQuestion}>
                  {isBangla ? 'কিভাবে আবেদন করবো?' : 'How do I apply for jobs?'}
                </summary>
                <p style={styles.faqAnswer}>
                  {isBangla 
                    ? 'যেকোনো চাকরিতে "আবেদন করুন" বাটনে ক্লিক করুন। একটি বিনামূল্যে অ্যাকাউন্ট তৈরি করুন আবেদন করতে।'
                    : 'Click "Apply Now" on any job listing. Create a free account to apply and track applications.'
                  }
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* Related Districts */}
        <section className="related-districts" style={styles.relatedSection}>
          <div className="container" style={styles.container}>
            <h2 style={styles.h2}>
              {isBangla ? 'অন্যান্য জেলায় চাকরি' : 'Jobs in Other Districts'}
            </h2>
            <div className="district-links" style={styles.districtLinks}>
              {bangladeshDistricts
                .filter(d => d.name !== district.name)
                .slice(0, 6)
                .map(d => (
                  <a 
                    key={d.name}
                    href={`/district/${d.name.toLowerCase()}`}
                    style={styles.districtLink}
                  >
                    {isBangla ? d.namebn : d.name}
                  </a>
                ))
              }
            </div>
          </div>
        </section>
      </div>

      {/* Inline Critical CSS for Mobile Performance */}
      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-search input {
            font-size: 16px !important; /* Prevent zoom on iOS */
          }
          
          .job-card {
            animation: fadeIn 0.3s ease-in;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        }
      `}</style>
    </>
  );
}

// Mobile-First Styles
const styles = {
  hero: {
    background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)',
    color: 'white',
    padding: '2rem 1rem',
    textAlign: 'center'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem'
  },
  h1: {
    fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
    fontWeight: '700',
    marginBottom: '0.5rem',
    lineHeight: '1.2'
  },
  h2: {
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#1a1a1a'
  },
  subtitle: {
    fontSize: '1rem',
    opacity: '0.9',
    marginBottom: '1.5rem'
  },
  searchBar: {
    display: 'flex',
    maxWidth: '600px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '50px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  searchInput: {
    flex: '1',
    padding: '1rem 1.5rem',
    border: 'none',
    fontSize: '16px',
    outline: 'none'
  },
  searchButton: {
    padding: '0 1.5rem',
    background: '#0066cc',
    border: 'none',
    color: 'white',
    fontSize: '1.25rem',
    cursor: 'pointer'
  },
  filterSection: {
    background: '#f8f9fa',
    padding: '1rem 0',
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch'
  },
  filterPills: {
    display: 'flex',
    gap: '0.5rem',
    padding: '0.5rem 0',
    whiteSpace: 'nowrap'
  },
  filterPill: {
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    border: '1px solid #ddd',
    background: 'white',
    cursor: 'pointer',
    fontSize: '0.875rem',
    transition: 'all 0.2s'
  },
  filterPillActive: {
    background: '#0066cc',
    color: 'white',
    borderColor: '#0066cc'
  },
  mapSection: {
    padding: '2rem 0'
  },
  mapContainer: {
    height: '300px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  jobsSection: {
    padding: '2rem 0'
  },
  jobsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },
  jobCount: {
    color: '#666',
    fontSize: '0.875rem'
  },
  jobsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1rem'
  },
  jobCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    border: '1px solid #eee',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  jobTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    marginBottom: '0.25rem',
    color: '#1a1a1a'
  },
  jobCompany: {
    fontSize: '0.875rem',
    color: '#666'
  },
  jobMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    margin: '1rem 0',
    fontSize: '0.875rem'
  },
  metaItem: {
    color: '#666'
  },
  jobDescription: {
    fontSize: '0.875rem',
    color: '#444',
    lineHeight: '1.6',
    marginBottom: '1rem'
  },
  jobFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '1rem',
    borderTop: '1px solid #eee'
  },
  postedDate: {
    fontSize: '0.75rem',
    color: '#999'
  },
  applyButton: {
    padding: '0.5rem 1.25rem',
    background: '#0066cc',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.875rem',
    transition: 'background 0.2s'
  },
  loadMoreContainer: {
    textAlign: 'center',
    marginTop: '2rem'
  },
  loadMoreButton: {
    padding: '0.75rem 2rem',
    background: '#0066cc',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  faqSection: {
    background: '#f8f9fa',
    padding: '2rem 0',
    marginTop: '2rem'
  },
  faqList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  faqItem: {
    background: 'white',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid #eee'
  },
  faqQuestion: {
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    color: '#1a1a1a'
  },
  faqAnswer: {
    marginTop: '0.75rem',
    fontSize: '0.875rem',
    color: '#666',
    lineHeight: '1.6'
  },
  relatedSection: {
    padding: '2rem 0'
  },
  districtLinks: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem'
  },
  districtLink: {
    padding: '0.5rem 1rem',
    background: '#e9ecef',
    borderRadius: '6px',
    textDecoration: 'none',
    color: '#495057',
    fontSize: '0.875rem',
    transition: 'background 0.2s'
  }
};

// Server-side props with ISR for performance
export async function getStaticProps({ params }) {
  const { districtSlug } = params;
  
  // Fetch district data
  const district = bangladeshDistricts.find(
    d => d.name.toLowerCase() === districtSlug.toLowerCase()
  );

  if (!district) {
    return { notFound: true };
  }

  // Fetch jobs for this district (replace with actual API call)
  const jobs = await fetchJobsByDistrict(district.name);

  return {
    props: {
      district,
      jobs,
      locale: 'en'
    },
    revalidate: 3600 // Revalidate every hour
  };
}

export async function getStaticPaths() {
  const paths = bangladeshDistricts.map(district => ({
    params: { districtSlug: district.name.toLowerCase() }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
}

// Mock function - replace with actual API call
async function fetchJobsByDistrict(district) {
  // This would be replaced with actual database query
  return Array.from({ length: 25 }, (_, i) => ({
    id: `${district}-${i}`,
    title: `Sample Job ${i + 1}`,
    company: `Company ${i + 1}`,
    location: district,
    salary: '৳15,000 - ৳25,000',
    type: 'Full-time',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    datePosted: '2 days ago',
    category: jobCategories[i % jobCategories.length].slug
  }));
}
