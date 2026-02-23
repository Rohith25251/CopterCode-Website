import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = (import.meta.env.VITE_SANITY_PROJECT_ID || 'wsuk3wqx').trim();
const dataset = (import.meta.env.VITE_SANITY_DATASET || 'production').trim();

// Validate environment variables
if (!projectId || projectId === 'wsuk3wqx') {
    console.warn('⚠️  VITE_SANITY_PROJECT_ID not properly configured. Using fallback value.');
}

if (!dataset || dataset === 'production') {
    console.log('ℹ️  Using dataset:', dataset);
}

/**
 * Create and configure Sanity client
 * @see https://www.sanity.io/docs/client
 */
export const client = createClient({
    projectId,
    dataset,
    useCdn: true, // Set to false to bypass the edge cache for real-time updates
    apiVersion: '2023-05-03', // Pin API version for consistency
    perspective: 'raw', // Include draft documents if needed
});

/**
 * Configure image URL builder for Sanity image optimization
 * @see https://www.sanity.io/docs/image-url
 */
const builder = imageUrlBuilder(client);

/**
 * Generate optimized image URL from Sanity image object
 * @param {Object} source - Sanity image object
 * @returns {Object} - Image URL builder instance
 * @example
 * const imageUrl = urlFor(imageObject).width(400).url()
 */
export function urlFor(source) {
    return builder.image(source);
}

/**
 * Log Sanity client initialization status
 */
if (typeof window !== 'undefined') {
    const masked_id = projectId.substring(0, 5) + '...' + projectId.substring(projectId.length - 3);
    console.log('✅ Sanity Client Initialized:', {
        projectId: masked_id,
        dataset,
        useCdn: true,
        apiVersion: '2023-05-03',
        timestamp: new Date().toISOString()
    });
}
