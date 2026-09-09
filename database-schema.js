// lib/database-schema.js - Complete Database Schema Definition

/**
 * WorkersBD Database Schema
 * 
 * This file defines the complete database structure for the WorkersBD job portal.
 * Compatible with MongoDB, PostgreSQL, MySQL, or any SQL/NoSQL database.
 * 
 * Collections/Tables:
 * - users
 * - profiles (worker_profiles, employer_profiles)
 * - jobs
 * - applications
 * - messages
 * - districts
 * - categories
 * - reviews
 * - notifications
 * - saved_jobs
 * - analytics
 */

export const databaseSchema = {
  
  // ==================== USERS ====================
  users: {
    id: "string (UUID/ObjectId)", // Primary key
    email: "string (unique, indexed)",
    password: "string (hashed)",
    user_type: "enum ('worker', 'employer', 'admin')",
    phone: "string",
    phone_verified: "boolean (default: false)",
    email_verified: "boolean (default: false)",
    status: "enum ('active', 'suspended', 'deleted')",
    created_at: "datetime",
    updated_at: "datetime",
    last_login: "datetime",
    locale: "string (en/bn)",
    
    // Indexes
    indexes: ["email", "user_type", "status", "created_at"]
  },

  // ==================== WORKER PROFILES ====================
  worker_profiles: {
    id: "string (UUID/ObjectId)",
    user_id: "string (foreign key to users.id)",
    
    // Basic Information
    full_name: "string",
    full_name_bn: "string",
    display_name: "string",
    photo_url: "string",
    date_of_birth: "date",
    gender: "enum ('male', 'female', 'other')",
    
    // Location
    district: "string",
    city: "string",
    address: "string",
    postal_code: "string",
    latitude: "float",
    longitude: "float",
    
    // Professional Information
    profession: "string",
    profession_bn: "string",
    bio: "text",
    bio_bn: "text",
    skills: "array of strings",
    experience_years: "integer",
    education: "string",
    certifications: "array of objects [{name, issuer, date, url}]",
    
    // Work Preferences
    availability: "enum ('available', 'busy', 'not_available')",
    work_type: "array ('full_time', 'part_time', 'contract', 'freelance')",
    expected_salary: "integer",
    salary_period: "enum ('hourly', 'daily', 'monthly', 'project')",
    willing_to_relocate: "boolean",
    
    // Portfolio
    portfolio_images: "array of strings (URLs)",
    portfolio_videos: "array of strings (URLs)",
    projects: "array of objects [{title, description, image, url}]",
    
    // Social Links
    facebook_url: "string",
    linkedin_url: "string",
    website_url: "string",
    
    // Stats
    profile_views: "integer (default: 0)",
    total_applications: "integer (default: 0)",
    rating: "float (0-5)",
    total_reviews: "integer (default: 0)",
    
    // Metadata
    profile_completed: "integer (0-100)",
    verified: "boolean (default: false)",
    featured: "boolean (default: false)",
    created_at: "datetime",
    updated_at: "datetime",
    
    // Indexes
    indexes: [
      "user_id",
      "district",
      "profession",
      "availability",
      "rating",
      "featured",
      "created_at",
      {
        "type": "text",
        "fields": ["full_name", "profession", "skills"]
      }
    ]
  },

  // ==================== EMPLOYER PROFILES ====================
  employer_profiles: {
    id: "string (UUID/ObjectId)",
    user_id: "string (foreign key to users.id)",
    
    // Company Information
    company_name: "string",
    company_name_bn: "string",
    company_logo: "string (URL)",
    industry: "string",
    company_size: "enum ('1-10', '11-50', '51-200', '201-500', '500+')",
    website: "string",
    founded_year: "integer",
    
    // Contact Information
    contact_person: "string",
    position: "string",
    phone: "string",
    email: "string",
    
    // Location
    district: "string",
    city: "string",
    address: "string",
    postal_code: "string",
    latitude: "float",
    longitude: "float",
    
    // Description
    description: "text",
    description_bn: "text",
    benefits: "array of strings",
    
    // Verification
    trade_license: "string (URL)",
    verified: "boolean (default: false)",
    verification_date: "datetime",
    
    // Stats
    total_jobs_posted: "integer (default: 0)",
    total_hires: "integer (default: 0)",
    rating: "float (0-5)",
    total_reviews: "integer (default: 0)",
    
    // Metadata
    featured: "boolean (default: false)",
    created_at: "datetime",
    updated_at: "datetime",
    
    // Indexes
    indexes: [
      "user_id",
      "company_name",
      "district",
      "industry",
      "verified",
      "featured"
    ]
  },

  // ==================== JOBS ====================
  jobs: {
    id: "string (UUID/ObjectId)",
    employer_id: "string (foreign key to users.id)",
    
    // Job Information
    title: "string",
    title_bn: "string",
    slug: "string (unique, indexed)",
    category: "string",
    description: "text",
    description_bn: "text",
    
    // Requirements
    responsibilities: "array of strings",
    requirements: "array of strings",
    skills_required: "array of strings",
    education: "string",
    experience_required: "string",
    
    // Employment Details
    employment_type: "enum ('full_time', 'part_time', 'contract', 'internship', 'freelance')",
    workplace_type: "enum ('on_site', 'remote', 'hybrid')",
    
    // Location
    district: "string",
    city: "string",
    address: "string",
    latitude: "float",
    longitude: "float",
    
    // Compensation
    salary_min: "integer",
    salary_max: "integer",
    salary_currency: "string (default: 'BDT')",
    salary_period: "enum ('hourly', 'monthly', 'yearly')",
    salary_negotiable: "boolean",
    
    // Benefits
    benefits: "array of strings",
    
    // Application
    application_email: "string",
    application_url: "string",
    application_instructions: "text",
    
    // Dates
    posted_date: "datetime",
    deadline: "datetime",
    start_date: "date",
    
    // Status
    status: "enum ('open', 'closed', 'filled', 'draft')",
    vacancies: "integer (default: 1)",
    
    // Stats
    views: "integer (default: 0)",
    applications_count: "integer (default: 0)",
    
    // SEO
    meta_title: "string",
    meta_description: "string",
    keywords: "array of strings",
    
    // Metadata
    featured: "boolean (default: false)",
    urgent: "boolean (default: false)",
    remote_friendly: "boolean (default: false)",
    created_at: "datetime",
    updated_at: "datetime",
    
    // Indexes
    indexes: [
      "employer_id",
      "slug",
      "category",
      "district",
      "employment_type",
      "status",
      "posted_date",
      "deadline",
      "featured",
      {
        "type": "text",
        "fields": ["title", "description", "skills_required"]
      }
    ]
  },

  // ==================== APPLICATIONS ====================
  applications: {
    id: "string (UUID/ObjectId)",
    job_id: "string (foreign key to jobs.id)",
    worker_id: "string (foreign key to users.id)",
    employer_id: "string (foreign key to users.id)",
    
    // Application Details
    cover_letter: "text",
    resume_url: "string",
    portfolio_url: "string",
    expected_salary: "integer",
    available_from: "date",
    
    // Status
    status: "enum ('pending', 'reviewing', 'shortlisted', 'rejected', 'accepted', 'withdrawn')",
    viewed_by_employer: "boolean (default: false)",
    viewed_at: "datetime",
    
    // Communication
    notes: "text",
    employer_feedback: "text",
    
    // Metadata
    applied_at: "datetime",
    updated_at: "datetime",
    
    // Indexes
    indexes: [
      "job_id",
      "worker_id",
      "employer_id",
      "status",
      "applied_at",
      {"fields": ["worker_id", "job_id"], "unique": true} // Prevent duplicate applications
    ]
  },

  // ==================== MESSAGES ====================
  messages: {
    id: "string (UUID/ObjectId)",
    conversation_id: "string",
    from_user_id: "string (foreign key to users.id)",
    to_user_id: "string (foreign key to users.id)",
    
    // Message Content
    content: "text",
    attachments: "array of objects [{type, url, name, size}]",
    
    // Status
    read: "boolean (default: false)",
    read_at: "datetime",
    
    // Metadata
    created_at: "datetime",
    deleted_by_sender: "boolean (default: false)",
    deleted_by_receiver: "boolean (default: false)",
    
    // Indexes
    indexes: [
      "conversation_id",
      "from_user_id",
      "to_user_id",
      "read",
      "created_at"
    ]
  },

  // ==================== REVIEWS ====================
  reviews: {
    id: "string (UUID/ObjectId)",
    reviewer_id: "string (foreign key to users.id)",
    reviewee_id: "string (foreign key to users.id)",
    reviewee_type: "enum ('worker', 'employer')",
    
    // Review Content
    rating: "integer (1-5)",
    title: "string",
    comment: "text",
    
    // Context
    job_id: "string (foreign key to jobs.id, nullable)",
    verified_hire: "boolean (default: false)",
    
    // Status
    status: "enum ('pending', 'published', 'hidden')",
    
    // Metadata
    helpful_count: "integer (default: 0)",
    created_at: "datetime",
    updated_at: "datetime",
    
    // Indexes
    indexes: [
      "reviewee_id",
      "reviewer_id",
      "rating",
      "status",
      "created_at"
    ]
  },

  // ==================== SAVED JOBS ====================
  saved_jobs: {
    id: "string (UUID/ObjectId)",
    user_id: "string (foreign key to users.id)",
    job_id: "string (foreign key to jobs.id)",
    
    // Metadata
    notes: "text",
    saved_at: "datetime",
    
    // Indexes
    indexes: [
      "user_id",
      "job_id",
      {"fields": ["user_id", "job_id"], "unique": true}
    ]
  },

  // ==================== NOTIFICATIONS ====================
  notifications: {
    id: "string (UUID/ObjectId)",
    user_id: "string (foreign key to users.id)",
    
    // Notification Details
    type: "enum ('job_posted', 'application_received', 'message', 'review', 'system')",
    title: "string",
    content: "text",
    link: "string",
    
    // Status
    read: "boolean (default: false)",
    read_at: "datetime",
    
    // Metadata
    created_at: "datetime",
    expires_at: "datetime",
    
    // Indexes
    indexes: [
      "user_id",
      "type",
      "read",
      "created_at"
    ]
  },

  // ==================== DISTRICTS (Reference Data) ====================
  districts: {
    id: "string (UUID/ObjectId)",
    name: "string",
    name_bn: "string",
    slug: "string (unique)",
    division: "string",
    latitude: "float",
    longitude: "float",
    
    // Stats
    total_jobs: "integer (default: 0)",
    total_workers: "integer (default: 0)",
    
    // SEO
    meta_description: "text",
    meta_description_bn: "text",
    
    // Indexes
    indexes: ["slug", "division", "total_jobs"]
  },

  // ==================== CATEGORIES (Reference Data) ====================
  categories: {
    id: "string (UUID/ObjectId)",
    name: "string",
    name_bn: "string",
    slug: "string (unique)",
    icon: "string",
    description: "text",
    description_bn: "text",
    parent_id: "string (nullable, for subcategories)",
    
    // Stats
    total_jobs: "integer (default: 0)",
    
    // Display
    featured: "boolean (default: false)",
    sort_order: "integer",
    
    // Indexes
    indexes: ["slug", "parent_id", "featured", "sort_order"]
  },

  // ==================== ANALYTICS ====================
  analytics_events: {
    id: "string (UUID/ObjectId)",
    user_id: "string (nullable)",
    session_id: "string",
    
    // Event Details
    event_type: "enum ('page_view', 'job_view', 'job_apply', 'search', 'click')",
    event_data: "object (JSON)",
    
    // Context
    page_url: "string",
    referrer: "string",
    user_agent: "string",
    device_type: "string",
    browser: "string",
    os: "string",
    country: "string",
    city: "string",
    
    // Metadata
    created_at: "datetime",
    
    // Indexes
    indexes: [
      "user_id",
      "event_type",
      "created_at",
      "device_type"
    ]
  }
};

// ==================== EXAMPLE QUERIES ====================

export const exampleQueries = {
  
  // Get all jobs in a district
  getJobsByDistrict: {
    query: "SELECT * FROM jobs WHERE district = ? AND status = 'open' ORDER BY posted_date DESC",
    params: ["Dhaka"]
  },
  
  // Search jobs by keywords
  searchJobs: {
    query: "SELECT * FROM jobs WHERE (title LIKE ? OR description LIKE ?) AND status = 'open'",
    params: ["%engineer%", "%engineer%"]
  },
  
  // Get worker profile with stats
  getWorkerProfile: {
    query: `
      SELECT wp.*, 
             COUNT(DISTINCT a.id) as total_applications,
             AVG(r.rating) as avg_rating,
             COUNT(DISTINCT r.id) as total_reviews
      FROM worker_profiles wp
      LEFT JOIN applications a ON wp.user_id = a.worker_id
      LEFT JOIN reviews r ON wp.user_id = r.reviewee_id
      WHERE wp.user_id = ?
      GROUP BY wp.id
    `,
    params: ["user_id"]
  },
  
  // Get featured jobs
  getFeaturedJobs: {
    query: "SELECT * FROM jobs WHERE featured = true AND status = 'open' ORDER BY posted_date DESC LIMIT ?",
    params: [10]
  }
};

export default databaseSchema;
