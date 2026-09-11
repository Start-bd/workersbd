/**
 * Data Indexes - High-Performance Lookup Structures
 * 
 * This module builds efficient Map-based indexes for districts and categories
 * to replace inefficient .find() operations. All indexes are built once at
 * module load and reused throughout the application.
 * 
 * Performance Impact: O(n) → O(1) lookups
 */

import { bangladeshDistricts, jobCategories } from './seo';

/**
 * District Indexes
 */
let districtByNameMap = null;
let districtBySlugMap = null;
let districtByIdMap = null;
let districtsByDivisionMap = null;

/**
 * Category Indexes
 */
let categoryByIdMap = null;
let categoryBySlugMap = null;

/**
 * Initialize all indexes (lazy-loaded on first access)
 */
const initializeIndexes = () => {
  if (districtByNameMap) return; // Already initialized

  // ============ DISTRICT INDEXES ============
  districtByNameMap = new Map();
  districtBySlugMap = new Map();
  districtByIdMap = new Map();
  districtsByDivisionMap = new Map();

  bangladeshDistricts.forEach((district, index) => {
    // Index by name (case-insensitive)
    districtByNameMap.set(district.name.toLowerCase(), district);
    if (district.bn) {
      districtByNameMap.set(district.bn.toLowerCase(), district);
    }

    // Index by slug
    const slug = district.name.toLowerCase().replace(/\s+/g, '-');
    districtBySlugMap.set(slug, district);

    // Index by ID
    districtByIdMap.set(district.id || index, district);

    // Index by division (group multiple districts)
    if (!districtsByDivisionMap.has(district.division)) {
      districtsByDivisionMap.set(district.division, []);
    }
    districtsByDivisionMap.get(district.division).push(district);
  });

  // ============ CATEGORY INDEXES ============
  categoryByIdMap = new Map();
  categoryBySlugMap = new Map();

  jobCategories.forEach((category) => {
    categoryByIdMap.set(category.id, category);
    const slug = (category.slug || category.en.toLowerCase().replace(/\s+/g, '-'));
    categoryBySlugMap.set(slug, category);
  });
};

/**
 * Get a district by name (case-insensitive)
 * @param {string} name - District name in English or Bangla
 * @returns {Object|null} District object or null
 */
export const getDistrictByName = (name) => {
  initializeIndexes();
  return districtByNameMap.get(name.toLowerCase()) || null;
};

/**
 * Get a district by URL slug
 * @param {string} slug - URL-friendly slug
 * @returns {Object|null} District object or null
 */
export const getDistrictBySlug = (slug) => {
  initializeIndexes();
  return districtBySlugMap.get(slug.toLowerCase()) || null;
};

/**
 * Get a district by ID
 * @param {string|number} id - District ID
 * @returns {Object|null} District object or null
 */
export const getDistrictById = (id) => {
  initializeIndexes();
  return districtByIdMap.get(id) || null;
};

/**
 * Get all districts in a division
 * @param {string} divisionName - Division name
 * @returns {Array} Array of districts in the division
 */
export const getDistrictsByDivision = (divisionName) => {
  initializeIndexes();
  return districtsByDivisionMap.get(divisionName) || [];
};

/**
 * Get nearby districts (same division)
 * @param {Object} district - District object
 * @param {number} limit - Maximum number of nearby districts to return
 * @returns {Array} Array of nearby districts
 */
export const getNearbyDistricts = (district, limit = 4) => {
  initializeIndexes();
  const nearbyList = districtsByDivisionMap
    .get(district.division)
    ?.filter((d) => d.name !== district.name) || [];
  return nearbyList.slice(0, limit);
};

/**
 * Get a category by ID
 * @param {string} categoryId - Category ID
 * @returns {Object|null} Category object or null
 */
export const getCategoryById = (categoryId) => {
  initializeIndexes();
  return categoryByIdMap.get(categoryId) || null;
};

/**
 * Get a category by slug
 * @param {string} slug - Category slug
 * @returns {Object|null} Category object or null
 */
export const getCategoryBySlug = (slug) => {
  initializeIndexes();
  return categoryBySlugMap.get(slug.toLowerCase()) || null;
};

/**
 * Get all categories
 * @returns {Array} Array of all categories
 */
export const getAllCategories = () => {
  initializeIndexes();
  return Array.from(categoryByIdMap.values());
};

/**
 * Get top districts by population
 * @param {number} limit - Number of districts to return
 * @returns {Array} Array of top districts by population
 */
export const getTopDistricts = (limit = 10) => {
  initializeIndexes();
  return bangladeshDistricts
    .sort((a, b) => (b.population || 0) - (a.population || 0))
    .slice(0, limit);
};

/**
 * Get major categories (filtered by some criteria)
 * @param {number} limit - Number of categories to return
 * @returns {Array} Array of major categories
 */
export const getMajorCategories = (limit = 6) => {
  initializeIndexes();
  return Array.from(categoryByIdMap.values()).slice(0, limit);
};

/**
 * Cache statistics for debugging
 */
export const getCacheStats = () => {
  initializeIndexes();
  return {
    districtsByName: districtByNameMap.size,
    districtsBySlugs: districtBySlugMap.size,
    districtsByDivision: districtsByDivisionMap.size,
    categoriesById: categoryByIdMap.size,
    categoriesBySlug: categoryBySlugMap.size,
  };
};

export default {
  getDistrictByName,
  getDistrictBySlug,
  getDistrictById,
  getDistrictsByDivision,
  getNearbyDistricts,
  getCategoryById,
  getCategoryBySlug,
  getAllCategories,
  getTopDistricts,
  getMajorCategories,
  getCacheStats,
};
