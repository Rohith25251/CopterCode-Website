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
    keywords,
    canonicalUrl
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
        const defaultImage = "https://www.coptercode.co.in/mediafiles/Coptercode_Logo.svg"; // Fallback image

        // --- TITLES & DESCRIPTIONS ---
        const finalTitle = title ? `${title} | ${siteTitle}` : defaultTitle;
        const finalDescription = description || defaultDescription;
        const finalImage = ogImage || defaultImage;

        // 1. Document Title
        document.title = finalTitle;

        // 2. Meta Description
        setMetaTag('name', 'description', finalDescription);
        setMetaTag('name', 'keywords', keywords || "Drone Tech, Enterprise AI, Industrial Automation, UAV, CopterCode, Software Solutions");

        // 3. Canonical Tag - Using explicit canonicalUrl or auto-generating from pathname
        let linkCanonical = document.querySelector("link[rel='canonical']");
        if (!linkCanonical) {
            linkCanonical = document.createElement('link');
            linkCanonical.setAttribute('rel', 'canonical');
            document.head.appendChild(linkCanonical);
        }

        // Use explicit canonicalUrl if provided, otherwise generate from pathname
        let canonicalHref;
        if (canonicalUrl) {
            canonicalHref = canonicalUrl;
        } else {
            // Auto-generate: Remove trailing slash if present (except for root) to avoid duplicates like /about/ vs /about
            const pathname = location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, "");
            canonicalHref = `https://www.coptercode.co.in${pathname}`;
        }

        linkCanonical.setAttribute('href', canonicalHref);

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

        // 6. Structured Data (JSON-LD) - Organization + Founder + Website + Breadcrumbs
        
        // Breadcrumb Schema for Sitelinks
        const pathSegments = location.pathname.split('/').filter(Boolean);
        const breadcrumbItems = [
          { position: 1, name: 'Home', url: 'https://www.coptercode.co.in' },
          ...pathSegments.map((segment, idx) => ({
            position: idx + 2,
            name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
            url: `https://www.coptercode.co.in/${pathSegments.slice(0, idx + 1).join('/')}`
          }))
        ];

        const breadcrumbSchema = {
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbItems.map(item => ({
                "@type": "ListItem",
                "position": item.position,
                "name": item.name,
                "item": item.url
            }))
        };

        const organizationSchema = {
            "@type": "Organization",
            "@id": "https://www.coptercode.co.in/#organization",
            "name": "CopterCode",
            "alternateName": "CopterCode",
            "url": "https://www.coptercode.co.in",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.coptercode.co.in/mediafiles/Coptercode_Logo.svg"
            },
            "description": "CopterCode is a Chennai-based technology company specializing in software development, drone technology, cybersecurity, cloud computing, AI solutions, ERP systems, and industry-focused internship programs.",
            "foundingDate": "2019",
            "founder": {
                "@id": "https://www.coptercode.co.in/founder#person"
            },
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Chennai",
                "addressRegion": "Tamil Nadu",
                "addressCountry": "India"
            },
            "sameAs": [
                "https://in.linkedin.com/company/coptercode",
                "https://www.instagram.com/coptercode/",
                "https://www.facebook.com/p/Copter-Code-61575029495479/"
            ]
        };

        const personSchema = {
            "@type": "Person",
            "@id": "https://www.coptercode.co.in/founder#person",
            "name": "Karthikeyan Sundaresan",
            "jobTitle": "Founder & CEO",
            "worksFor": {
                "@id": "https://www.coptercode.co.in/#organization"
            },
            "url": "https://www.coptercode.co.in/founder"
        };

        const websiteSchema = {
            "@type": "WebSite",
            "@id": "https://www.coptercode.co.in/#website",
            "url": "https://www.coptercode.co.in",
            "name": "CopterCode",
            "publisher": {
                "@id": "https://www.coptercode.co.in/#organization"
            },
            // SiteLinksSearchBox — enables the search box in Google results
            "potentialAction": {
                "@type": "SearchAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://www.coptercode.co.in/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
            }
        };

        // SiteNavigationElement — signals preferred sitelinks to Google
        // Order matters: put the most important pages first
        const siteNavSchema = {
            "@type": "ItemList",
            "name": "CopterCode Site Navigation",
            "itemListElement": [
                { "@type": "SiteLinksSearchBox", "url": "https://www.coptercode.co.in" },
                { "@type": "ListItem", "position": 1, "name": "Industrial Drones & UAV",   "url": "https://www.coptercode.co.in/industrial-drones" },
                { "@type": "ListItem", "position": 2, "name": "About CopterCode",           "url": "https://www.coptercode.co.in/about" },
                { "@type": "ListItem", "position": 3, "name": "Internship Programme",       "url": "https://www.coptercode.co.in/internship" },
                { "@type": "ListItem", "position": 4, "name": "Events & Hackathons",         "url": "https://www.coptercode.co.in/events" },
                { "@type": "ListItem", "position": 5, "name": "Articles & Research",         "url": "https://www.coptercode.co.in/articles" },
                { "@type": "ListItem", "position": 6, "name": "Careers",                    "url": "https://www.coptercode.co.in/careers" }
            ]
        };

        let scriptSchema = document.querySelector("script[id='schema-org']");
        if (!scriptSchema) {
            scriptSchema = document.createElement('script');
            scriptSchema.id = 'schema-org';
            scriptSchema.type = 'application/ld+json';
            document.head.appendChild(scriptSchema);
        }
        // Include Organization, Founder, Website, SiteNav and Breadcrumb schemas in Graph
        scriptSchema.text = JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [organizationSchema, personSchema, websiteSchema, siteNavSchema, breadcrumbSchema]
        });

    }, [title, description, ogTitle, ogDescription, ogUrl, ogImage, twitterTitle, twitterDescription, twitterImage, keywords, canonicalUrl, location]);

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
