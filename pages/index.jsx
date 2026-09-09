// pages/index.jsx - Mobile-Optimized Homepage
import { useState, useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import dynamic from 'next/dynamic';
import { 
  generateOrganizationSchema, 
  generateFAQSchema,
  bangladeshDistricts, 
  jobCategories 
} from '../lib/seo';
import { getTranslation } from '../lib/translations';

// Lazy load heavy components
const MapComponent = dynamic(() => import('../components/Map'), { ssr: false });
const TestimonialsSection = dynamic(() => import('../components/Testimonials'), { ssr: false });

export default function HomePage({ featuredJobs, topWorkers, stats, locale }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const isBangla = locale === 'bn';

  // SEO Configuration
  const pageTitle = isBangla 
    ? 'ওয়ার্কার্স বিডি - বাংলাদেশে চাকরি ও দক্ষ কর্মী খুঁজুন'
    : 'WorkersBD - Find Jobs & Skilled Workers in Bangladesh';
  
  const pageDescription = isBangla
    ? 'বাংলাদেশের শীর্ষস্থানীয় চাকরি পোর্টাল। ঢাকা, চট্টগ্রাম, সিলেট এবং সর্বত্র মানসম্মত চাকরি এবং দক্ষ কর্মী খুঁজুন। বিনামূল্যে নিবন্ধন করুন।'
    : 'Bangladesh\'s leading job portal. Find quality jobs and skilled workers in Dhaka, Chittagong, Sylhet, and across all districts. Register free today.';

  const keywords = [
    'Bangladesh jobs',
    'jobs in Dhaka',
    'Chittagong jobs',
    'skilled workers Bangladesh',
    'employment Bangladesh',
    'job portal BD',
    'চাকরি বাংলাদেশ',
    'ঢাকা চাকরি',
    'দক্ষ কর্মী',
    'কর্মসংস্থান'
  ];

  // Structured Data
  const organizationSchema = generateOrganizationSchema();
  const faqSchema = generateFAQSchema([
    {
      question: 'How do I find jobs in Bangladesh?',
      answer: 'Browse our extensive job listings by location, category, or skill. Create a free profile to apply directly to employers and get notifications for new opportunities.'
    },
    {
      question: 'Is WorkersBD free to use?',
      answer: 'Yes! WorkersBD is completely free for job seekers. Create your profile, search jobs, and apply without any charges.'
    },
    {
      question: 'How can employers post jobs?',
      answer: 'Employers can register for a free account and post job listings. Our platform helps you reach thousands of qualified candidates across Bangladesh.'
    },
    {
      question: 'Which cities are covered?',
      answer: 'We cover all major cities and districts in Bangladesh including Dhaka, Chittagong, Sylhet, Rajshahi, Khulna, Barisal, Rangpur, and Mymensingh.'
    }
  ]);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema, faqSchema]
  };

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        canonical="https://workersbd.com"
        locale={locale}
        keywords={keywords}
        structuredData={structuredData}
      />

      <div className="homepage" style={styles.page}>
        
        {/* Hero Section - Above the Fold */}
        <section className="hero" style={styles.hero}>
          <div className="container" style={styles.container}>
            <h1 style={styles.heroTitle}>
              {isBangla 
                ? 'বাংলাদেশে মানসম্মত চাকরি ও দক্ষ কর্মী খুঁজুন'
                : 'Find Quality Jobs & Skilled Workers in Bangladesh'
              }
            </h1>
            
            <p style={styles.heroSubtitle}>
              {isBangla
                ? 'ঢাকা, চট্টগ্রাম, সিলেট এবং সর্বত্র হাজার হাজার সুযোগের সাথে সংযুক্ত হন'
                : 'Connect with thousands of opportunities across Dhaka, Chittagong, Sylhet, and beyond'
              }
            </p>

            {/* Search Bar */}
            <div className="hero-search" style={styles.heroSearch}>
              <div style={styles.searchContainer}>
                <input
                  type="text"
                  placeholder={isBangla 
                    ? 'চাকরি, দক্ষতা বা অবস্থান অনুসন্ধান করুন...'
                    : 'Search for jobs, skills, or locations...'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={styles.searchInput}
                  aria-label="Job search"
                />
                <button style={styles.searchButton} aria-label="Search">
                  🔍 {isBangla ? 'খুঁজুন' : 'Search'}
                </button>
              </div>
              
              {/* Quick Category Pills */}
              <div className="quick-categories" style={styles.quickCategories}>
                <span style={styles.quickLabel}>
                  {isBangla ? 'জনপ্রিয়:' : 'Popular:'}
                </span>
                {jobCategories.slice(0, 5).map(cat => (
                  <a 
                    key={cat.slug} 
                    href={`/category/${cat.slug}`}
                    style={styles.categoryPill}
                  >
                    {isBangla ? cat.namebn : cat.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Stats Bar */}
            <div className="stats-bar" style={styles.statsBar}>
              <div style={styles.statItem}>
                <strong style={styles.statNumber}>{stats.totalJobs.toLocaleString()}</strong>
                <span style={styles.statLabel}>{isBangla ? 'সক্রিয় চাকরি' : 'Active Jobs'}</span>
              </div>
              <div style={styles.statItem}>
                <strong style={styles.statNumber}>{stats.totalWorkers.toLocaleString()}</strong>
                <span style={styles.statLabel}>{isBangla ? 'নিবন্ধিত কর্মী' : 'Registered Workers'}</span>
              </div>
              <div style={styles.statItem}>
                <strong style={styles.statNumber}>{stats.totalEmployers.toLocaleString()}</strong>
                <span style={styles.statLabel}>{isBangla ? 'নিয়োগকর্তা' : 'Employers'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Jobs Section */}
        <section className="featured-jobs" style={styles.section}>
          <div className="container" style={styles.container}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>
                {isBangla ? 'বৈশিষ্ট্যযুক্ত চাকরি' : 'Featured Jobs'}
              </h2>
              <a href="/jobs" style={styles.viewAllLink}>
                {isBangla ? 'সব দেখুন' : 'View All'} →
              </a>
            </div>

            <div className="jobs-grid" style={styles.jobsGrid}>
              {featuredJobs.map(job => (
                <article key={job.id} className="job-card" style={styles.jobCard}>
                  <div className="job-badge" style={styles.jobBadge}>
                    {isBangla ? 'বৈশিষ্ট্যযুক্ত' : 'FEATURED'}
                  </div>
                  
                  <h3 style={styles.jobTitle}>{job.title}</h3>
                  <p style={styles.jobCompany}>{job.company}</p>
                  
                  <div style={styles.jobMeta}>
                    <span>📍 {job.location}</span>
                    <span>💰 {job.salary}</span>
                  </div>

                  <div style={styles.jobSkills}>
                    {job.skills.slice(0, 3).map(skill => (
                      <span key={skill} style={styles.skillBadge}>{skill}</span>
                    ))}
                  </div>

                  <a href={`/jobs/${job.id}`} style={styles.viewJobButton}>
                    {isBangla ? 'বিস্তারিত দেখুন' : 'View Details'}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Top Categories */}
        <section className="top-categories" style={styles.categoriesSection}>
          <div className="container" style={styles.container}>
            <h2 style={styles.sectionTitle}>
              {isBangla ? 'শীর্ষ শ্রেণী' : 'Browse by Category'}
            </h2>
            
            <div className="categories-grid" style={styles.categoriesGrid}>
              {jobCategories.map(category => (
                <a 
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="category-card"
                  style={styles.categoryCard}
                >
                  <div style={styles.categoryIcon}>
                    {getCategoryIcon(category.slug)}
                  </div>
                  <h3 style={styles.categoryName}>
                    {isBangla ? category.namebn : category.name}
                  </h3>
                  <p style={styles.categoryCount}>
                    50+ {isBangla ? 'চাকরি' : 'jobs'}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Districts Map */}
        <section className="districts-section" style={styles.section}>
          <div className="container" style={styles.container}>
            <h2 style={styles.sectionTitle}>
              {isBangla ? 'অবস্থান অনুযায়ী খুঁজুন' : 'Browse by Location'}
            </h2>
            
            <div className="districts-grid" style={styles.districtsGrid}>
              {bangladeshDistricts.map(district => (
                <a 
                  key={district.name}
                  href={`/district/${district.name.toLowerCase()}`}
                  className="district-card"
                  style={styles.districtCard}
                >
                  <h3 style={styles.districtName}>
                    {isBangla ? district.namebn : district.name}
                  </h3>
                  <p style={styles.districtJobs}>
                    50+ {isBangla ? 'চাকরি' : 'jobs'}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works" style={styles.howItWorksSection}>
          <div className="container" style={styles.container}>
            <h2 style={styles.sectionTitle}>
              {isBangla ? 'কিভাবে কাজ করে' : 'How It Works'}
            </h2>
            
            <div className="steps-grid" style={styles.stepsGrid}>
              <div className="step" style={styles.step}>
                <div style={styles.stepNumber}>1</div>
                <h3 style={styles.stepTitle}>
                  {isBangla ? 'নিবন্ধন করুন' : 'Create Account'}
                </h3>
                <p style={styles.stepText}>
                  {isBangla 
                    ? 'বিনামূল্যে অ্যাকাউন্ট তৈরি করুন এবং আপনার প্রোফাইল সম্পূর্ণ করুন'
                    : 'Sign up for free and complete your profile in minutes'
                  }
                </p>
              </div>

              <div className="step" style={styles.step}>
                <div style={styles.stepNumber}>2</div>
                <h3 style={styles.stepTitle}>
                  {isBangla ? 'খুঁজুন এবং আবেদন করুন' : 'Search & Apply'}
                </h3>
                <p style={styles.stepText}>
                  {isBangla 
                    ? 'হাজার হাজার চাকরি ব্রাউজ করুন এবং সরাসরি আবেদন করুন'
                    : 'Browse thousands of jobs and apply directly to employers'
                  }
                </p>
              </div>

              <div className="step" style={styles.step}>
                <div style={styles.stepNumber}>3</div>
                <h3 style={styles.stepTitle}>
                  {isBangla ? 'নিয়োগ পান' : 'Get Hired'}
                </h3>
                <p style={styles.stepText}>
                  {isBangla 
                    ? 'নিয়োগকর্তাদের সাথে সংযোগ করুন এবং আপনার স্বপ্নের চাকরি পান'
                    : 'Connect with employers and land your dream job'
                  }
                </p>
              </div>
            </div>

            <div style={styles.ctaContainer}>
              <a href="/signup" style={styles.ctaButton}>
                {isBangla ? 'আজই শুরু করুন' : 'Get Started Today'}
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section" style={styles.faqSection}>
          <div className="container" style={styles.container}>
            <h2 style={styles.sectionTitle}>
              {isBangla ? 'প্রায়শই জিজ্ঞাসিত প্রশ্ন' : 'Frequently Asked Questions'}
            </h2>
            
            <div className="faq-list" style={styles.faqList}>
              <details style={styles.faqItem}>
                <summary style={styles.faqQuestion}>
                  {isBangla 
                    ? 'বাংলাদেশে কিভাবে চাকরি খুঁজবো?'
                    : 'How do I find jobs in Bangladesh?'
                  }
                </summary>
                <p style={styles.faqAnswer}>
                  {isBangla 
                    ? 'অবস্থান, শ্রেণী বা দক্ষতা অনুসারে আমাদের বিস্তৃত চাকরির তালিকা ব্রাউজ করুন। নিয়োগকর্তাদের সরাসরি আবেদন করতে এবং নতুন সুযোগের জন্য বিজ্ঞপ্তি পেতে একটি বিনামূল্যে প্রোফাইল তৈরি করুন।'
                    : 'Browse our extensive job listings by location, category, or skill. Create a free profile to apply directly to employers and get notifications for new opportunities.'
                  }
                </p>
              </details>

              <details style={styles.faqItem}>
                <summary style={styles.faqQuestion}>
                  {isBangla 
                    ? 'ওয়ার্কার্স বিডি কি বিনামূল্যে?'
                    : 'Is WorkersBD free to use?'
                  }
                </summary>
                <p style={styles.faqAnswer}>
                  {isBangla 
                    ? 'হ্যাঁ! চাকরি প্রার্থীদের জন্য ওয়ার্কার্স বিডি সম্পূর্ণ বিনামূল্যে। আপনার প্রোফাইল তৈরি করুন, চাকরি অনুসন্ধান করুন এবং কোনো চার্জ ছাড়াই আবেদন করুন।'
                    : 'Yes! WorkersBD is completely free for job seekers. Create your profile, search jobs, and apply without any charges.'
                  }
                </p>
              </details>

              <details style={styles.faqItem}>
                <summary style={styles.faqQuestion}>
                  {isBangla 
                    ? 'কোন শহরগুলি কভার করা হয়?'
                    : 'Which cities are covered?'
                  }
                </summary>
                <p style={styles.faqAnswer}>
                  {isBangla 
                    ? 'আমরা ঢাকা, চট্টগ্রাম, সিলেট, রাজশাহী, খুলনা, বরিশাল, রংপুর এবং ময়মনসিংহ সহ বাংলাদেশের সমস্ত প্রধান শহর এবং জেলা কভার করি।'
                    : 'We cover all major cities and districts in Bangladesh including Dhaka, Chittagong, Sylhet, Rajshahi, Khulna, Barisal, Rangpur, and Mymensingh.'
                  }
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* Testimonials - Lazy Loaded */}
        <TestimonialsSection locale={locale} />

        {/* CTA Section */}
        <section className="cta-section" style={styles.ctaSection}>
          <div className="container" style={styles.container}>
            <h2 style={styles.ctaTitle}>
              {isBangla 
                ? 'আজই আপনার ক্যারিয়ার যাত্রা শুরু করুন'
                : 'Start Your Career Journey Today'
              }
            </h2>
            <p style={styles.ctaText}>
              {isBangla 
                ? 'হাজার হাজার চাকরির সুযোগে বিনামূল্যে অ্যাক্সেস পান'
                : 'Get free access to thousands of job opportunities'
              }
            </p>
            <div style={styles.ctaButtons}>
              <a href="/signup" style={styles.ctaButtonPrimary}>
                {isBangla ? 'চাকরিপ্রার্থী হিসেবে যোগ দিন' : 'Join as Job Seeker'}
              </a>
              <a href="/employers/signup" style={styles.ctaButtonSecondary}>
                {isBangla ? 'নিয়োগকর্তা হিসেবে পোস্ট করুন' : 'Post as Employer'}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

// Category Icons
function getCategoryIcon(slug) {
  const icons = {
    'construction': '🏗️',
    'electrician': '⚡',
    'plumber': '🔧',
    'driver': '🚗',
    'it-software': '💻',
    'healthcare': '🏥',
    'education': '📚',
    'hospitality': '🏨',
    'manufacturing': '🏭',
    'retail': '🛍️'
  };
  return icons[slug] || '💼';
}

// Styles
const styles = {
  page: {
    minHeight: '100vh',
    background: '#ffffff'
  },
  hero: {
    background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)',
    color: 'white',
    padding: '3rem 1rem',
    textAlign: 'center'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem'
  },
  heroTitle: {
    fontSize: 'clamp(1.75rem, 5vw, 3rem)',
    fontWeight: '800',
    marginBottom: '1rem',
    lineHeight: '1.2'
  },
  heroSubtitle: {
    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
    opacity: '0.95',
    marginBottom: '2rem',
    maxWidth: '700px',
    margin: '0 auto 2rem'
  },
  heroSearch: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  searchContainer: {
    display: 'flex',
    background: 'white',
    borderRadius: '50px',
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    marginBottom: '1rem'
  },
  searchInput: {
    flex: '1',
    padding: '1.25rem 1.5rem',
    border: 'none',
    fontSize: '16px',
    outline: 'none'
  },
  searchButton: {
    padding: '0 2rem',
    background: '#ff6b35',
    border: 'none',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '1rem',
    whiteSpace: 'nowrap'
  },
  quickCategories: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    justifyContent: 'center',
    alignItems: 'center'
  },
  quickLabel: {
    fontSize: '0.875rem',
    opacity: '0.9'
  },
  categoryPill: {
    padding: '0.5rem 1rem',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '20px',
    fontSize: '0.875rem',
    textDecoration: 'none',
    color: 'white',
    transition: 'background 0.2s'
  },
  statsBar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '2rem',
    marginTop: '3rem',
    padding: '2rem',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '12px',
    backdropFilter: 'blur(10px)'
  },
  statItem: {
    textAlign: 'center'
  },
  statNumber: {
    display: 'block',
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    fontWeight: '700',
    marginBottom: '0.25rem'
  },
  statLabel: {
    fontSize: '0.875rem',
    opacity: '0.9'
  },
  section: {
    padding: '4rem 0'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  sectionTitle: {
    fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
    fontWeight: '700',
    color: '#1a1a1a'
  },
  viewAllLink: {
    color: '#0066cc',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem'
  },
  jobsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem'
  },
  jobCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    border: '1px solid #eee',
    position: 'relative',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  jobBadge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: '#ff6b35',
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '600'
  },
  jobTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#1a1a1a'
  },
  jobCompany: {
    fontSize: '0.875rem',
    color: '#0066cc',
    marginBottom: '1rem',
    fontWeight: '500'
  },
  jobMeta: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    fontSize: '0.875rem',
    color: '#666',
    flexWrap: 'wrap'
  },
  jobSkills: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
    flexWrap: 'wrap'
  },
  skillBadge: {
    padding: '0.25rem 0.75rem',
    background: '#e7f3ff',
    color: '#0066cc',
    borderRadius: '12px',
    fontSize: '0.75rem'
  },
  viewJobButton: {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    background: '#0066cc',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '0.875rem',
    textAlign: 'center',
    width: '100%',
    transition: 'background 0.2s'
  },
  categoriesSection: {
    background: '#f8f9fa',
    padding: '4rem 0'
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem'
  },
  categoryCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    textAlign: 'center',
    textDecoration: 'none',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  categoryIcon: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  categoryName: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '0.5rem'
  },
  categoryCount: {
    fontSize: '0.875rem',
    color: '#666'
  },
  districtsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem',
    marginTop: '2rem'
  },
  districtCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'transform 0.2s'
  },
  districtName: {
    fontSize: '1.125rem',
    fontWeight: '600',
    marginBottom: '0.5rem'
  },
  districtJobs: {
    fontSize: '0.875rem',
    opacity: '0.9'
  },
  howItWorksSection: {
    background: '#f8f9fa',
    padding: '4rem 0'
  },
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '2rem'
  },
  step: {
    textAlign: 'center'
  },
  stepNumber: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: '#0066cc',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: '700',
    margin: '0 auto 1rem'
  },
  stepTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '0.75rem',
    color: '#1a1a1a'
  },
  stepText: {
    fontSize: '0.9375rem',
    color: '#666',
    lineHeight: '1.6'
  },
  ctaContainer: {
    textAlign: 'center',
    marginTop: '3rem'
  },
  ctaButton: {
    display: 'inline-block',
    padding: '1rem 2.5rem',
    background: '#0066cc',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '50px',
    fontWeight: '600',
    fontSize: '1.125rem',
    boxShadow: '0 4px 12px rgba(0,102,204,0.3)',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  faqSection: {
    padding: '4rem 0'
  },
  faqList: {
    maxWidth: '800px',
    margin: '2rem auto 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  faqItem: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid #eee',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  faqQuestion: {
    fontSize: '1.0625rem',
    fontWeight: '600',
    cursor: 'pointer',
    color: '#1a1a1a'
  },
  faqAnswer: {
    marginTop: '1rem',
    fontSize: '0.9375rem',
    color: '#666',
    lineHeight: '1.7'
  },
  ctaSection: {
    background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)',
    color: 'white',
    padding: '4rem 1rem',
    textAlign: 'center'
  },
  ctaTitle: {
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    fontWeight: '700',
    marginBottom: '1rem'
  },
  ctaText: {
    fontSize: '1.125rem',
    marginBottom: '2rem',
    opacity: '0.95'
  },
  ctaButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  ctaButtonPrimary: {
    padding: '1rem 2rem',
    background: 'white',
    color: '#0066cc',
    textDecoration: 'none',
    borderRadius: '50px',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'transform 0.2s'
  },
  ctaButtonSecondary: {
    padding: '1rem 2rem',
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '50px',
    fontWeight: '600',
    fontSize: '1rem',
    border: '2px solid white',
    transition: 'background 0.2s'
  }
};

// Server-side props
export async function getServerSideProps({ locale }) {
  // Fetch data (replace with actual API calls)
  const featuredJobs = await fetchFeaturedJobs();
  const topWorkers = await fetchTopWorkers();
  const stats = {
    totalJobs: 15420,
    totalWorkers: 48532,
    totalEmployers: 3245
  };

  return {
    props: {
      featuredJobs,
      topWorkers,
      stats,
      locale: locale || 'en'
    }
  };
}

// Mock functions
async function fetchFeaturedJobs() {
  return Array.from({ length: 6 }, (_, i) => ({
    id: `featured-${i}`,
    title: `Featured Job ${i + 1}`,
    company: `Company ${i + 1}`,
    location: 'Dhaka',
    salary: '৳30,000 - ৳50,000',
    skills: ['JavaScript', 'React', 'Node.js']
  }));
}

async function fetchTopWorkers() {
  return [];
}
