import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = (import.meta.env.VITE_SANITY_PROJECT_ID || 'wsuk3wqx').trim();
const dataset = (import.meta.env.VITE_SANITY_DATASET || 'production').trim();

export const client = createClient({
    projectId,
    dataset,
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
});

// Sanity Connection Status
if (typeof window !== 'undefined') {
    console.log('✅ Sanity Client Initialized:', { projectId, dataset, useCdn: true });
}

const builder = imageUrlBuilder(client);

export function urlFor(source) {
    return builder.image(source);
}
