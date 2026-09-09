// pages/district/[districtSlug].jsx - District Job Listings Page
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  bangladeshDistricts,
  jobCategories
} from '../../lib/seo';

export default function DistrictPage({ district, jobs, locale }) {
  const [filteredJobs, setFilteredJobs] = useState(jobs || []);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const isBangla = locale === 'bn';
  const districtSlugKey = district ? district.name.toLowerCase() : '';
  const districtName = (isBangla && district && district.namebn) ? district.namebn : (district ? district.name : '');

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    const allJobs = jobs || [];
    setFilteredJobs(category === 'all' ? allJobs : allJobs.filter(j => j.category === category));
  };

  if (!district) return <div>District not found</div>;

  return (
    <>
      <Head>
        <title>{districtName} Jobs - Find Employment in Bangladesh</title>
        <meta name="description" content={`Browse ${(jobs || []).length}+ jobs in ${districtName}, Bangladesh.`} />
        <link rel="canonical" href={`https://workersbd.com/district/${districtSlugKey}`} />
      </Head>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
        <h1>{isBangla ? `${districtName} এ চাকরি` : `Jobs in ${districtName}`}</h1>
        <p>{isBangla ? `${(jobs || []).length}+ চাকরির তালিকা পাওয়া গেছে` : `${(jobs || []).length}+ active job listings available`}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '1rem 0' }}>
          <button
            onClick={() => handleCategoryFilter('all')}
            style={{ padding: '0.5rem 1rem', borderRadius: '20px', background: selectedCategory === 'all' ? '#0066cc' : 'white', color: selectedCategory === 'all' ? 'white' : '#333', border: '1px solid #ddd', cursor: 'pointer' }}
          >
            {isBangla ? 'সব' : 'All'} ({(jobs || []).length})
          </button>
          {(jobCategories || []).slice(0, 6).map(category => (
            <button
              key={category.slug}
              onClick={() => handleCategoryFilter(category.slug)}
              style={{ padding: '0.5rem 1rem', borderRadius: '20px', background: selectedCategory === category.slug ? '#0066cc' : 'white', color: selectedCategory === category.slug ? 'white' : '#333', border: '1px solid #ddd', cursor: 'pointer' }}
            >
              {(isBangla && category.namebn) ? category.namebn : category.name}
            </button>
          ))}
        </div>

        <h2>{isBangla ? 'চাকরির তালিকা' : 'Available Jobs'}</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {filteredJobs.map(job => (
            <div key={job.id} style={{ background: 'white', border: '1px solid #eee', borderRadius: '8px', padding: '1.25rem' }}>
              <h3 style={{ margin: '0 0 0.5rem' }}>{job.title}</h3>
              <p style={{ margin: '0 0 0.25rem', color: '#666' }}>{job.company} &bull; {job.location}</p>
              <p style={{ margin: '0 0 0.5rem', color: '#0066cc' }}>{job.salary}</p>
              <p style={{ margin: '0 0 0.75rem', fontSize: '0.875rem' }}>{job.description ? job.description.substring(0, 120) : ''}...</p>
              <Link href={`/jobs/${job.id}`} style={{ background: '#0066cc', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', textDecoration: 'none', fontSize: '0.875rem' }}>
                {isBangla ? 'আবেদন করুন' : 'Apply Now'}
              </Link>
            </div>
          ))}
        </div>

        <section style={{ marginTop: '2rem' }}>
          <h2>{isBangla ? 'অন্যান্য জেলায় চাকরি' : 'Jobs in Other Districts'}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1rem' }}>
            {(bangladeshDistricts || []).filter(d => d.name !== district.name).slice(0, 6).map(d => (
              <Link
                key={d.name}
                href={`/district/${d.name.toLowerCase()}`}
                style={{ padding: '0.5rem 1rem', background: '#e9ecef', borderRadius: '6px', textDecoration: 'none', color: '#495057', fontSize: '0.875rem' }}
              >
                {(isBangla && d.namebn) ? d.namebn : d.name}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps({ params, locale }) {
  const { districtSlug } = params;
  const district = bangladeshDistricts.find(
    d => d.name.toLowerCase() === districtSlug.toLowerCase()
  );
  if (!district) return { notFound: true };
  const jobs = await fetchJobsByDistrict(district.name);
  return {
    props: { district, jobs, locale: locale || 'en' },
    revalidate: 3600
  };
}

export async function getStaticPaths() {
  const paths = bangladeshDistricts.map(district => ({
    params: { districtSlug: district.name.toLowerCase() }
  }));
  return { paths, fallback: 'blocking' };
}

async function fetchJobsByDistrict(district) {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `${district.toLowerCase().replace(/\s/g, '-')}-${i}`,
    title: `Job ${i + 1} in ${district}`,
    company: `Company ${i + 1}`,
    location: district,
    salary: 'BDT 15,000 - 25,000',
    type: 'Full-time',
    description: 'Quality employment opportunity for skilled workers and professionals.',
    datePosted: '2 days ago',
    category: jobCategories[i % jobCategories.length].slug
  }));
}
