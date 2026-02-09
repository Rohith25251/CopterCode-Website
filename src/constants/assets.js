// Firebase Storage Base URL pattern (Replace PROJECT_ID with your actual project ID if strictly manual, 
// but usually we get the full tokenized URL from the upload utility)
// For now, these are placeholders. After you use the upload utility, replace these strings with the actual URLs.

export const ASSETS = {
    LOGO: "/mediafiles/Coptercode Logo.jpeg", // Replace with Firebase URL: e.g., https://firebasestorage.googleapis.com/.../media%2Fimages%2Flogo.jpeg

    VIDEOS: {
        DRONES: "/mediafiles/videos/industrial-drones-uav.mp4",
        DIGITAL: "/mediafiles/videos/digital-services.mp4",
        ENERGY: "/mediafiles/videos/new-energy-materials.mp4",
        ERP: "/mediafiles/videos/erp-software-solutions.mp4",
        RETAIL: "/mediafiles/videos/retail-food-collaborations.mp4",
        SECURITY: "/mediafiles/videos/infra-security.mp4",
        ADVANCED_TECH: "https://www.pexels.com/download/video/35033957/" // External example remains or can be moved to storage
    }
};

/**
 * Helper to get Firebase URL if available, else fallback to local (during migration)
 * @param {string} key 
 * @returns {string}
 */
export const getAssetUrl = (path) => {
    // In production, this should only return the remote URL.
    // For now, returning the path as is.
    return path;
};
