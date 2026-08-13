import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = (import.meta.env.VITE_SANITY_PROJECT_ID || '').trim();
const dataset = (import.meta.env.VITE_SANITY_DATASET || 'production').trim();

// Validate environment variables
if (!projectId) {
    throw new Error('VITE_SANITY_PROJECT_ID is required. Add it to your .env/.env.production file.');
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
 * Generate a fully-optimized, Retina-ready Sanity image URL.
 * - Explicit pixel width so the CDN resizes server-side (no upscaling in CSS)
 * - dpr(2) for Retina / high-density screens
 * - quality(85) — sharp without excess file size
 * - auto('format') — serves WebP/AVIF where the browser supports it
 * - fit('crop') + crop('focalpoint') — respects the hotspot set in Sanity Studio
 *
 * @param {Object} source  - Sanity image reference object
 * @param {number} width   - Logical CSS width of the rendered container (px)
 * @param {number} [height]- Logical CSS height (optional; omit to keep aspect ratio)
 * @returns {string}       - Fully-qualified CDN URL
 *
 * @example
 * // 430px-wide card on desktop at 2x → requests 860px from CDN
 * urlForOptimized(p.image, 430)
 */
export function urlForOptimized(source, width, height) {
    if (!source) return '';
    let chain = builder
        .image(source)
        .width(width * 2)          // 2× physical pixels for Retina
        .dpr(2)                    // explicit DPR hint for Sanity CDN
        .quality(85)               // crisp but compressed
        .auto('format')            // WebP / AVIF where supported
        .fit('crop')               // server-side crop, not CSS upscale
        .crop('focalpoint');       // respect the hotspot set in Studio
    if (height) chain = chain.height(height * 2);
    return chain.url();
}

/**
 * Build a srcset string for a Sanity image at multiple widths.
 * Pass the logical (CSS) widths you need; the helper doubles each for Retina.
 *
 * @param {Object}   source  - Sanity image reference object
 * @param {number[]} widths  - Array of logical CSS widths, e.g. [320, 640, 860]
 * @returns {string}         - Comma-separated srcset value
 *
 * @example
 * srcsetFor(p.image, [320, 640, 860])
 * // => "https://cdn.sanity.io/...&w=640&dpr=2 320w,
 * //     https://cdn.sanity.io/...&w=1280&dpr=2 640w, ..."
 */
export function srcsetFor(source, widths) {
    if (!source) return '';
    return widths
        .map(w => {
            const url = builder
                .image(source)
                .width(w * 2)
                .dpr(2)
                .quality(85)
                .auto('format')
                .fit('crop')
                .crop('focalpoint')
                .url();
            return `${url} ${w}w`;
        })
        .join(', ');
}

/**
 * Log Sanity client initialization status
 */
if (typeof window !== 'undefined') {
    const masked_id = projectId.length > 8
        ? projectId.substring(0, 5) + '...' + projectId.substring(projectId.length - 3)
        : projectId;
    console.log('✅ Sanity Client Initialized:', {
        projectId: masked_id,
        dataset,
        useCdn: true,
        apiVersion: '2023-05-03',
        timestamp: new Date().toISOString()
    });
}
