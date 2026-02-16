import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({
    title,
    description,
    ogTitle,
    ogDescription,
    ogUrl,
    ogImage,
    twitterTitle,
    twitterDescription,
    twitterImage,
    keywords
}) => {
    const location = useLocation();

    useEffect(() => {
        // --- CONFIGURATION ---
        const siteTitle = "CopterCode";
        const defaultTitle = "CopterCode | Industrial Automation, Drones & Enterprise AI";

        // Optimized Description (approx 150-160 chars max is ideal)
        // Optimized Description (compelling & keyword-rich)
        const defaultDescription = "Unlock the power of Drone Tech & AI with CopterCode. We bridge Industrial Automation and Enterprise Software Intelligence to future-proof your business.";

        const currentUrl = window.location.href;
        const defaultImage = "https://coptercode.com/mediafiles/Coptercode Logo.png"; // Fallback image

        // --- TITLES & DESCRIPTIONS ---
        const finalTitle = title ? `${title} | ${siteTitle}` : defaultTitle;
        const finalDescription = description || defaultDescription;
        const finalImage = ogImage || defaultImage;

        // 1. Document Title
        document.title = finalTitle;

        // 2. Meta Description
        setMetaTag('name', 'description', finalDescription);
        setMetaTag('name', 'keywords', keywords || "Drone Tech, Enterprise AI, Industrial Automation, UAV, CopterCode, Software Solutions");

        // 3. Canonical Tag - Force non-www https://coptercode.com
        let linkCanonical = document.querySelector("link[rel='canonical']");
        if (!linkCanonical) {
            linkCanonical = document.createElement('link');
            linkCanonical.setAttribute('rel', 'canonical');
            document.head.appendChild(linkCanonical);
        }

        // Remove trailing slash if present (except for root) to avoid duplicates like /about/ vs /about
        const pathname = location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, "");
        const canonicalUrl = `https://coptercode.com${pathname}`;

        linkCanonical.setAttribute('href', canonicalUrl);

        // 4. Open Graph
        setMetaTag('property', 'og:title', ogTitle || finalTitle);
        setMetaTag('property', 'og:description', ogDescription || finalDescription);
        setMetaTag('property', 'og:url', ogUrl || currentUrl);
        setMetaTag('property', 'og:image', finalImage);
        setMetaTag('property', 'og:type', 'website');
        setMetaTag('property', 'og:site_name', siteTitle);

        // 5. Twitter Card
        setMetaTag('name', 'twitter:card', 'summary_large_image');
        setMetaTag('name', 'twitter:title', twitterTitle || finalTitle);
        setMetaTag('name', 'twitter:description', twitterDescription || finalDescription);
        setMetaTag('name', 'twitter:image', twitterImage || finalImage);

        // 6. Structured Data (JSON-LD)
        const schemaData = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "CopterCode",
            "url": "https://coptercode.com",
            "logo": "https://coptercode.com/mediafiles/Coptercode Logo.png",
            "sameAs": [
                "https://www.linkedin.com/company/coptercode",
                "https://twitter.com/coptercode"
            ],
            "description": defaultDescription
        };

        let scriptSchema = document.querySelector("script[id='schema-org']");
        if (!scriptSchema) {
            scriptSchema = document.createElement('script');
            scriptSchema.id = 'schema-org';
            scriptSchema.type = 'application/ld+json';
            document.head.appendChild(scriptSchema);
        }
        scriptSchema.text = JSON.stringify(schemaData);

    }, [title, description, ogTitle, ogDescription, ogUrl, ogImage, twitterTitle, twitterDescription, twitterImage, location]);

    return null;
};

const setMetaTag = (attr, key, content) => {
    if (!content) return;
    let element = document.querySelector(`meta[${attr}="${key}"]`);
    if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
    }
    element.setAttribute('content', content);
};

export default SEO;
