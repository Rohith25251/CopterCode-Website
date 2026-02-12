import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({
    title,
    description,
    ogTitle,
    ogDescription,
    ogUrl,
    twitterTitle,
    twitterDescription
}) => {
    const location = useLocation();

    useEffect(() => {
        // Standard SEO
        const siteTitle = "CopterCode";
        const fullTitle = title ? `${title} | ${siteTitle}` : "CopterCode - Bridging Industrial Automation and Enterprise Software Intelligence";
        document.title = fullTitle;

        const defaultDescription = "CopterCode creates cutting-edge solutions bridging industrial automation and enterprise software intelligence. Explore our innovations in drone technology and AI.";
        setMetaTag('name', 'description', description || defaultDescription);

        // Open Graph
        setMetaTag('property', 'og:title', ogTitle || fullTitle);
        setMetaTag('property', 'og:description', ogDescription || description || defaultDescription);
        setMetaTag('property', 'og:url', ogUrl || window.location.href);
        setMetaTag('property', 'og:type', 'website');
        setMetaTag('property', 'og:site_name', siteTitle);

        // Twitter Card
        setMetaTag('name', 'twitter:card', 'summary_large_image');
        setMetaTag('name', 'twitter:title', twitterTitle || fullTitle);
        setMetaTag('name', 'twitter:description', twitterDescription || description || defaultDescription);

    }, [title, description, ogTitle, ogDescription, ogUrl, twitterTitle, twitterDescription, location]);

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
