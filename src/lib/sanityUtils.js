/**
 * Sanity CMS Utilities
 * Centralized helper functions for consistent Sanity data fetching, error handling, and logging
 */

import { client, urlFor, urlForOptimized } from './sanity';

/**
 * Fetch data from Sanity with consistent error handling and logging
 * @param {string} query - GROQ query string
 * @param {object} params - Query parameters (optional)
 * @param {string} pageName - Name of the page/component fetching (for logging)
 * @returns {Promise}
 */
export const fetchSanityData = async (query, params = {}, pageName = 'Unknown') => {
  try {
    console.log(`📡 Fetching ${pageName} data from Sanity...`);
    
    const data = await client.fetch(query, params);
    
    if (data) {
      console.log(`✅ ${pageName} data loaded from Sanity successfully`);
    } else {
      console.warn(`⚠️  No ${pageName} data found in Sanity - will use fallbacks`);
    }
    
    return data;
  } catch (error) {
    console.error(`❌ Error fetching ${pageName} from Sanity:`, {
      message: error.message || error,
      query: query.substring(0, 100) + (query.length > 100 ? '...' : ''),
      params
    });
    return null;
  }
};

/**
 * Convert Sanity image object to an optimized, Retina-ready URL.
 * @param {object} imageObject - Sanity image object
 * @param {number} [width=800] - Logical CSS width of the container (px)
 * @param {number} [height]    - Logical CSS height (optional)
 * @returns {string|null}      - Optimized image URL or null
 */
export const getImageUrl = (imageObject, width = 800, height = undefined) => {
  if (!imageObject) return null;
  try {
    return urlForOptimized(imageObject, width, height);
  } catch (error) {
    console.warn('⚠️  Failed to generate image URL:', error.message);
    return null;
  }
};

/**
 * Safely extract nested data from Sanity response
 * @param {object} data - Sanity data object
 * @param {string} path - Dot-notation path (e.g., 'hero.title')
 * @param {any} fallback - Fallback value if path doesn't exist
 * @returns {any} - Value at path or fallback
 */
export const getSafeData = (data, path, fallback = null) => {
  try {
    const keys = path.split('.');
    let value = data;
    
    for (const key of keys) {
      if (value === null || value === undefined) return fallback;
      value = value[key];
    }
    
    return value ?? fallback;
  } catch (error) {
    console.warn(`⚠️  Error accessing path "${path}":`, error.message);
    return fallback;
  }
};

/**
 * Format array of Sanity data with consistent error handling
 * Maps array items and extracts image URLs
 * @param {array} items - Array of items from Sanity
 * @param {function} mapper - Function to map each item
 * @returns {array} - Formatted array
 */
export const formatSanityArray = (items = [], mapper = null) => {
  try {
    if (!Array.isArray(items)) return [];
    
    if (typeof mapper === 'function') {
      return items.map(mapper);
    }
    
    return items;
  } catch (error) {
    console.warn('⚠️  Error formatting Sanity array:', error.message);
    return [];
  }
};

/**
 * Check Sanity client connection status
 * @returns {Promise<boolean>} - True if connection is successful
 */
export const checkSanityConnection = async () => {
  try {
    const result = await client.fetch('*[_type == "homePage"][0] | { _id }', {});
    if (result && result._id) {
      console.log('✅ Sanity connection verified successfully');
      return true;
    }
  } catch (error) {
    console.error('❌ Sanity connection failed:', error.message);
    return false;
  }
};

/**
 * Log Sanity configuration (for debugging)
 */
export const logSanityConfig = () => {
  const projectId = (import.meta.env.VITE_SANITY_PROJECT_ID || '').trim();
  const dataset = (import.meta.env.VITE_SANITY_DATASET || '').trim();

  console.log('🔧 Sanity Configuration:', {
    projectId: projectId.substring(0, 5) + '...' + projectId.substring(projectId.length - 3),
    dataset,
    useCdn: true,
    apiVersion: '2023-05-03'
  });
};

/**
 * Generate a standardized error message for Sanity fetch failures
 * @param {string} pageName - Name of the page/component
 * @param {string} context - Additional context about what was being fetched
 * @returns {string} - Formatted error message
 */
export const generateSanityErrorMessage = (pageName, context = '') => {
  return `Unable to load ${pageName}. ${context || 'Please check your Sanity connection and environment variables.'}`;
};

export default {
  fetchSanityData,
  getImageUrl,
  getSafeData,
  formatSanityArray,
  checkSanityConnection,
  logSanityConfig,
  generateSanityErrorMessage
};
