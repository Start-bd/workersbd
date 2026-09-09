// lib/analytics.js - Comprehensive Analytics Integration

// Google Analytics 4
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

// Page view tracking
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Event tracking
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track specific events
export const trackJobView = (jobId, jobTitle) => {
  event({
    action: 'view_job',
    category: 'Jobs',
    label: `${jobTitle} (${jobId})`,
  });
};

export const trackJobApplication = (jobId, jobTitle) => {
  event({
    action: 'apply_job',
    category: 'Conversions',
    label: `${jobTitle} (${jobId})`,
    value: 1,
  });
};

export const trackSearch = (searchTerm, resultsCount) => {
  event({
    action: 'search',
    category: 'Engagement',
    label: searchTerm,
    value: resultsCount,
  });
};

export const trackSignup = (userType) => {
  event({
    action: 'sign_up',
    category: 'Conversions',
    label: userType,
    value: 1,
  });
};

export const trackDistrictView = (districtName) => {
  event({
    action: 'view_district',
    category: 'Navigation',
    label: districtName,
  });
};

export const trackCategoryView = (categoryName) => {
  event({
    action: 'view_category',
    category: 'Navigation',
    label: categoryName,
  });
};

// Facebook Pixel
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || 'XXXXXXXXXXXXX';

export const fbPageView = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

export const fbEvent = (name, options = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', name, options);
  }
};

// Microsoft Clarity
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || 'XXXXXXXXXX';

// Performance Monitoring
export const reportWebVitals = (metric) => {
  if (process.env.NODE_ENV === 'production') {
    const body = JSON.stringify(metric);
    const url = '/api/analytics/web-vitals';

    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, body);
    } else {
      fetch(url, { body, method: 'POST', keepalive: true });
    }
  }
};

// User tracking for personalization
export const identifyUser = (userId, traits) => {
  if (typeof window !== 'undefined') {
    // Store in localStorage for personalization
    localStorage.setItem('user_traits', JSON.stringify(traits));
    
    // Track in GA4
    if (window.gtag) {
      window.gtag('set', 'user_properties', {
        user_id: userId,
        user_type: traits.type,
        location: traits.location,
      });
    }
  }
};

// A/B Testing utilities
export const getVariant = (experimentId, variants) => {
  if (typeof window === 'undefined') return variants[0];
  
  const stored = localStorage.getItem(`experiment_${experimentId}`);
  if (stored) return stored;
  
  const variant = variants[Math.floor(Math.random() * variants.length)];
  localStorage.setItem(`experiment_${experimentId}`, variant);
  return variant;
};

// Conversion tracking
export const trackConversion = (type, value) => {
  event({
    action: 'conversion',
    category: 'Conversions',
    label: type,
    value: value,
  });
  
  fbEvent('Purchase', { value: value, currency: 'BDT' });
};

const analyticsModule = {
  pageview,
  event,
  trackJobView,
  trackJobApplication,
  trackSearch,
  trackSignup,
  trackDistrictView,
  trackCategoryView,
  fbPageView,
  fbEvent,
  reportWebVitals,
  identifyUser,
  getVariant,
  trackConversion,
};

export default analyticsModule;
