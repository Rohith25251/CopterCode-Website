# JSON-LD Structured Data Enhancement Guide

## Overview
JSON-LD (JSON for Linking Data) structured data helps search engines better understand your content. This improves rich snippets, featured snippets, and overall SEO performance.

## Current Implementation (SEO Component)

Your `SEO.jsx` component already includes basic Organization schema. Here's how to enhance it:

### Current Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CopterCode",
  "url": "https://coptercode.com",
  "logo": "https://coptercode.com/mediafiles/Coptercode Logo.png",
  "sameAs": [
    "https://www.linkedin.com/company/coptercode",
    "https://twitter.com/coptercode"
  ],
  "description": "Unlock the power of Drone Tech & AI with CopterCode..."
}
```

## Enhanced Schema Implementations

### 1. Organization Schema (Homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CopterCode",
  "alternateName": "Coper Code",
  "url": "https://coptercode.com",
  "logo": "https://coptercode.com/mediafiles/Coptercode Logo.png",
  "image": "https://coptercode.com/mediafiles/Home/IMG_1851.jpg",
  "description": "CopterCode delivers cutting-edge drone technology, AI automation, ERP systems, digital services, cybersecurity, sustainable energy, and innovative tech solutions.",
  "sameAs": [
    "https://www.linkedin.com/company/coptercode",
    "https://twitter.com/coptercode",
    "https://www.facebook.com/coptercode",
    "https://www.instagram.com/coptercode"
  ],
  "founder": [
    {
      "@type": "Person",
      "name": "Sundharesan Duraiswamy"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "CopterCode HQ",
    "addressLocality": "Chennai",
    "addressRegion": "Tamil Nadu",
    "postalCode": "600000",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+91-8072-193-600",
    "email": "coptercode@gmail.com"
  },
  "employee": [
    {
      "@type": "Person",
      "name": "Team Lead 1",
      "jobTitle": "CTO"
    }
  ]
}
```

### 2. Product/Service Schema

#### Industrial Drones Page
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Industrial Drones & UAV Solutions",
  "description": "Advanced unmanned aerial vehicles for inspection, surveillance, mapping, agriculture, logistics, and disaster management.",
  "brand": {
    "@type": "Brand",
    "name": "CopterCode"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://coptercode.com/industrial-drones",
    "priceCurrency": "INR",
    "price": "Contact for pricing",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "45",
    "bestRating": "5",
    "worstRating": "1"
  },
  "image": "https://coptercode.com/mediafiles/Intern/drone-image.jpg"
}
```

#### ERP Software Page
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "CopterCode ERP & LMS Software",
  "description": "Cloud-based enterprise resource planning and learning management system for businesses.",
  "url": "https://coptercode.com/erp-solutions",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "Contact for pricing",
    "priceCurrency": "INR"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "ratingCount": "120"
  },
  "screenshot": "https://coptercode.com/mediafiles/screenshots/erp-dashboard.png"
}
```

### 3. Breadcrumb Schema

Add to all inner pages (About, Services, etc.):

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://coptercode.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://coptercode.com/services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Web Development",
      "item": "https://coptercode.com/services#web-development"
    }
  ]
}
```

### 4. Local Business Schema

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "CopterCode",
  "image": "https://coptercode.com/mediafiles/Coptercode Logo.png",
  "description": "Technology company specializing in drone technology and enterprise software.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Chennai, Tamil Nadu",
    "addressLocality": "Chennai",
    "addressRegion": "Tamil Nadu",
    "postalCode": "600000",
    "addressCountry": "IN"
  },
  "telephone": "+91-8072-193-600",
  "email": "coptercode@gmail.com",
  "url": "https://coptercode.com"
}
```

### 5. Event Schema (For Hackathons/Events Page)

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Code the Skies: National Hackathon",
  "description": "Join CopterCode hackathon and innovation challenges.",
  "startDate": "2026-04-15T09:00:00Z",
  "endDate": "2026-04-17T18:00:00Z",
  "location": {
    "@type": "Place",
    "name": "Chennai",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chennai",
      "addressCountry": "IN"
    }
  },
  "image": "https://coptercode.com/mediafiles/news and media/IMG_3365.jpg",
  "organizer": {
    "@type": "Organization",
    "name": "CopterCode",
    "url": "https://coptercode.com"
  },
  "url": "https://coptercode.com/hackathon"
}
```

### 6. Job Posting Schema (Careers Page)

```json
{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "Senior AI Engineer",
  "description": "Join CopterCode as a Senior AI Engineer and work on cutting-edge drone technology.",
  "hiringOrganization": {
    "@type": "Organization",
    "name": "CopterCode",
    "sameAs": "https://coptercode.com"
  },
  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chennai",
      "addressCountry": "IN"
    }
  },
  "baseSalary": {
    "@type": "PriceSpecification",
    "priceCurrency": "INR",
    "price": "800000"
  },
  "employmentType": "FULL_TIME",
  "datePosted": "2026-02-21"
}
```

### 7. FAQ Schema

For the Contact or Help pages:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is CopterCode?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CopterCode is a technology company specializing in drone technology, AI automation, and enterprise software solutions."
      }
    },
    {
      "@type": "Question",
      "name": "What drone services does CopterCode offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer industrial drones for inspection, surveillance, mapping, agriculture, and logistics applications."
      }
    }
  ]
}
```

### 8. Review/Rating Schema

If you have customer testimonials:

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5",
    "worstRating": "1"
  },
  "author": {
    "@type": "Person",
    "name": "James Anderson"
  },
  "reviewBody": "CopterCode's industrial drones have transformed our inspection process. Highly recommended!",
  "datePublished": "2026-02-20"
}
```

## Implementation in React

Update your `SEO.jsx` component to include multiple schemas:

```jsx
// In SEO.jsx useEffect

const schemas = [
  // Organization Schema
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CopterCode",
    "url": "https://coptercode.com",
    "logo": "https://coptercode.com/mediafiles/Coptercode Logo.png",
    "sameAs": [...],
    "address": {...},
    "contactPoint": {...}
  },
  // Add page-specific schema based on pathname
  ...(location.pathname === '/industrial-drones' ? [droneProductSchema] : []),
  ...(location.pathname === '/erp-solutions' ? [erpSoftwareSchema] : []),
  ...(location.pathname === '/careers' ? [jobPostingSchema] : []),
];

// Update existing schema script
let scriptSchema = document.querySelector("script[id='schema-org']");
if (!scriptSchema) {
  scriptSchema = document.createElement('script');
  scriptSchema.id = 'schema-org';
  scriptSchema.type = 'application/ld+json';
  document.head.appendChild(scriptSchema);
}
scriptSchema.text = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": schemas
});
```

## Testing & Validation

### 1. Google Rich Results Test
Visit: https://search.google.com/test/rich-results

Enter your URL to test:
- ✅ Organization schema
- ✅ Breadcrumbs
- ✅ Product/Service schema
- ✅ Job postings
- ✅ Event schema

### 2. Schema.org Validator
Visit: https://validator.schema.org/

Copy your JSON-LD and validate for errors.

### 3. Structured Data Testing Tool
Visit: https://developers.google.com/search/docs/beginner/structured-data

Check for warnings and errors.

## Benefits of Enhanced Structured Data

| Benefit | Impact |
|---------|--------|
| Rich Snippets | Better CTR in search results |
| Featured Snippets | Higher visibility |
| Knowledge Panel | Brand authority |
| Job Listings | Recruiter visibility |
| Event Listings | Event discovery |
| Product Reviews | Consumer trust |

## Schema.org Properties Reference

### Organization Required Properties
- `name`: Company name
- `url`: Website URL
- `logo`: Logo image URL

### Organization Recommended Properties
- `description`: Company description
- `sameAs`: Social media profiles
- `address`: Physical location
- `contactPoint`: Contact details
- `founder`: Company founder
- `employee`: Team members

### Product Required Properties
- `name`: Product name
- `description`: Product description
- `image`: Product image
- `offers.priceCurrency`: Currency code (INR, USD, etc.)

## Monitoring Schema Performance

1. **Google Search Console**
   - Check "Enhancements" section
   - Monitor rich results performance
   - Fix any validation errors

2. **Schema.org Validator**
   - Regular audits (monthly)
   - Fix warnings and errors
   - Keep schemas updated

3. **Analytics**
   - Track CTR improvement
   - Monitor organic traffic
   - Measure visibility increase

## Checklist

- [ ] Add Organization schema to homepage
- [ ] Add Product schema to product pages
- [ ] Add Breadcrumb schema to all inner pages
- [ ] Add LocalBusiness schema to contact page
- [ ] Add Event schema to events page
- [ ] Add JobPosting schema to careers page
- [ ] Test all schemas in Google Rich Results test
- [ ] Fix validation errors in Schema.org Validator
- [ ] Monitor performance in Google Search Console
- [ ] Set up quarterly schema audits

## Next Steps

1. Implement page-specific schemas gradually
2. Test each schema type separately
3. Monitor rich results in Google Search Console
4. Track improvements in CTR and visibility
5. Update schemas quarterly with new content

---

**Created:** February 21, 2026
**CopterCode SEO Enhancement Project**

**Reference:**
- https://schema.org/
- https://developers.google.com/search/docs/appearance/structured-data
- https://validator.schema.org/
