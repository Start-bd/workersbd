// pages/jobs/[jobId].jsx - Individual Job Listing Page
import { useState } from 'react';
import SEOHead from '../../components/SEOHead';
import { generateJobPostingSchema, generateBreadcrumbSchema } from '../../lib/seo';

export default function JobPage({ job, relatedJobs, locale }) {
  const [isApplying, setIsApplying] = useState(false);
  const isBangla = locale === 'bn';

  // SEO Configuration
  const pageTitle = `${job.title} at ${job.company} - ${job.location}`;
  const pageTitleBn = `${job.titlebn || job.title} - ${job.companybn || job.company} - ${job.locationbn || job.location}`;
  const pageDescription = `Apply for ${job.title} position at ${job.company} in ${job.location}. Salary: ${job.salary}. ${job.employmentType}. Required: ${job.skills.join(', ')}`;
  const pageDescriptionBn = `${job.company} তে ${job.title} পদের জন্য আবেদন করুন। বেতন: ${job.salary}। প্রয়োজনীয় দক্ষতা: ${job.skills.join(', ')}`;

  // Structured Data
  const jobSchema = generateJobPostingSchema(job);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://workersbd.com' },
    { name: 'Jobs', url: 'https://workersbd.com/jobs' },
    { name: job.title, url: `https://workersbd.com/jobs/${job.id}` }
  ]);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [jobSchema, breadcrumbSchema]
  };

  const keywords = [
    job.title,
    job.company,
    job.location,
    job.category,
    ...job.skills,
    'Bangladesh jobs',
    'job vacancy',
    'employment'
  ];

  return (
    <>
      <SEOHead
        title={pageTitle}
        titlebn={pageTitleBn}
        description={pageDescription}
        descriptionbn={pageDescriptionBn}
        canonical={`https://workersbd.com/jobs/${job.id}`}
        locale={locale}
        keywords={keywords}
        structuredData={structuredData}
        ogImage={job.image || `https://workersbd.com/og/job-${job.id}.jpg`}
      />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem', fontSize: '0.875rem', color: '#666' }}>
          <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0 }}>
            <li><a href="/" style={{ color: '#0066cc' }}>{isBangla ? 'হোম' : 'Home'}</a></li>
            <li style={{ color: '#999' }}>/</li>
            <li><a href="/jobs" style={{ color: '#0066cc' }}>{isBangla ? 'চাকরি' : 'Jobs'}</a></li>
            <li style={{ color: '#999' }}>/</li>
            <li style={{ color: '#333' }}>{job.title}</li>
          </ol>
        </nav>

        {/* Job Header */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: '2rem', border: '1px solid #eee' }}>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '700', marginBottom: '0.5rem', color: '#1a1a1a' }}>
            {isBangla && job.titlebn ? job.titlebn : job.title}
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#444', marginBottom: '1rem' }}>{job.company}</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#555' }}>
            <span>📍 {job.location}</span>
            <span>💰 {job.salary}</span>
            <span>⏰ {job.employmentType}</span>
            <span>📅 {isBangla ? 'পোস্ট তারিখ:' : 'Posted:'} {job.datePosted}</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {job.skills.map(skill => (
              <span key={skill} style={{ padding: '0.25rem 0.75rem', background: '#e8f0fe', color: '#0066cc', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '500' }}>
                {skill}
              </span>
            ))}
          </div>

          <button
            onClick={() => setIsApplying(true)}
            style={{
              padding: '0.875rem 2.5rem',
              background: isApplying ? '#28a745' : '#0066cc',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            {isApplying
              ? (isBangla ? 'আবেদন জমা দেওয়া হয়েছে!' : 'Application Submitted!')
              : (isBangla ? 'এখনই আবেদন করুন' : 'Apply Now')
            }
          </button>
        </div>

        {/* Job Description */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: '2rem', border: '1px solid #eee' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '1rem' }}>
            {isBangla ? 'চাকরির বিবরণ' : 'Job Description'}
          </h2>
          <p style={{ lineHeight: '1.8', color: '#444', whiteSpace: 'pre-line' }}>{job.description}</p>
        </div>

        {/* Related Jobs */}
        {relatedJobs && relatedJobs.length > 0 && (
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '1rem' }}>
              {isBangla ? 'সম্পর্কিত চাকরি' : 'Related Jobs'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
              {relatedJobs.slice(0, 3).map(rj => (
                <a key={rj.id} href={`/jobs/${rj.id}`}
                  style={{ background: 'white', borderRadius: '10px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #eee', textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem', color: '#1a1a1a' }}>{rj.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#666', margin: 0 }}>{rj.company} • {rj.location}</p>
                  <p style={{ fontSize: '0.875rem', color: '#0066cc', marginTop: '0.5rem' }}>{rj.salary}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export async function getStaticProps({ params, locale }) {
  const { jobId } = params;
  const job = await fetchJobById(jobId);
  if (!job) return { notFound: true };
  const relatedJobs = await fetchRelatedJobs(job.category, jobId);
  return {
    props: { job, relatedJobs, locale: locale || 'en' },
    revalidate: 3600
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

async function fetchJobById(jobId) {
  return {
    id: jobId,
    title: 'Software Developer',
    titlebn: 'সফটওয়্যার ডেভেলপার',
    company: 'Tech Company BD',
    companybn: 'টেক কোম্পানি বিডি',
    location: 'Dhaka',
    locationbn: 'ঢাকা',
    salary: '৳30,000 - ৳60,000',
    employmentType: 'Full-time',
    skills: ['JavaScript', 'React', 'Node.js'],
    description: 'We are looking for a skilled software developer to join our growing team in Dhaka. You will work on exciting web projects using modern technologies.',
    datePosted: '3 days ago',
    category: 'technology',
    image: null,
  };
}

async function fetchRelatedJobs(category, excludeId) {
  return [
    { id: 'job-1', title: 'Frontend Developer', company: 'Startup BD', location: 'Dhaka', salary: '৳25,000 - ৳45,000' },
    { id: 'job-2', title: 'Backend Engineer', company: 'Enterprise Ltd', location: 'Chittagong', salary: '৳35,000 - ৳65,000' },
    { id: 'job-3', title: 'Full Stack Developer', company: 'Digital Agency', location: 'Sylhet', salary: '৳40,000 - ৳70,000' },
  ].filter(j => j.id !== excludeId);
}
