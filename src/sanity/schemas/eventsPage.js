export const eventsPage = {
    name: 'eventsPage',
    title: 'Events Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Events Page',
            description: 'Internal title for this page'
        },
        // --- SEO ---
        {
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                { name: 'metaTitle', type: 'string', title: 'Meta Title', initialValue: 'Events | Conferences & Networking' },
                { name: 'metaDescription', type: 'text', title: 'Meta Description', initialValue: "Join CopterCode's global events, conferences, and hackathons. Network with industry leaders in drone technology, AI, and enterprise solutions." },
                { name: 'keywords', type: 'string', title: 'Keywords', initialValue: 'events, conferences, hackathons, tech summit, innovation, networking, drone technology' }
            ]
        },
        // --- HERO ---
        {
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Title', initialValue: 'Events' },
                { name: 'subtitle', type: 'text', title: 'Subtitle', initialValue: 'Connect with us at our upcoming global summits, workshops, and exclusive meets.' }
            ]
        },
        // --- HERO SLIDE CAROUSEL ---
        {
            name: 'heroSlides',
            title: 'Hero Slide Carousel',
            description: 'Slides for the main top hero carousel.',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Hero Slide',
                    fields: [
                        { name: 'title', type: 'string', title: 'Title' },
                        { name: 'quote', type: 'text', title: 'Quote', rows: 2 },
                        { name: 'category', type: 'string', title: 'Category/Tag', initialValue: 'Featured Event' },
                        { name: 'image', type: 'image', title: 'Slide Image', options: { hotspot: true } },
                        { name: 'linkText', type: 'string', title: 'Button Text', initialValue: 'Register Interest' },
                        { name: 'link', type: 'string', title: 'Button Link', initialValue: '/contact' }
                    ]
                }
            ]
        },
        // --- EVENTS LIST ---
        {
            name: 'eventsList',
            title: 'Events List',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Event',
                    fields: [
                        { name: 'title', type: 'string', title: 'Event Title' },
                        { name: 'date', type: 'string', title: 'Date (e.g. February 28, 2026)' },
                        { name: 'location', type: 'string', title: 'Location' },
                        { name: 'category', type: 'string', title: 'Category (e.g. Exhibition)' },
                        { name: 'description', type: 'text', title: 'Description' },
                        { name: 'image', type: 'image', title: 'Event Image', options: { hotspot: true } },
                        { name: 'registerLink', type: 'string', title: 'Register Link (URL or Path)', initialValue: '/contact' }
                    ]
                }
            ]
        },
        // --- CATEGORIES SECTIONS CONFIG ---
        {
            name: 'categoriesConfig',
            title: 'Category Sections Configuration',
            description: 'Define the headings, descriptions, and category mappings for grouping the events on the page.',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Section Config',
                    fields: [
                        { name: 'id', type: 'string', title: 'Section ID (e.g. summits, challenges, corporate)', description: 'Must match the ID used to select layouts in code' },
                        { name: 'title', type: 'string', title: 'Section Title' },
                        { name: 'description', type: 'text', title: 'Section Description', rows: 2 },
                        { 
                            name: 'matchCategories', 
                            type: 'array', 
                            title: 'Match Categories', 
                            description: 'List of event categories (e.g. Exhibition, Conference, Hackathon) that belong to this section.',
                            of: [{ type: 'string' }]
                        }
                    ]
                }
            ],
            initialValue: [
                {
                    id: "summits",
                    title: "Major Summits & Conferences",
                    description: "Leading strategic dialogues and showcasing the next frontier of autonomous aviation worldwide.",
                    matchCategories: ["Exhibition", "Conference", "Summit", "Symposium"]
                },
                {
                    id: "challenges",
                    title: "Developer Hackathons & Workshops",
                    description: "Empowering developers and engineers to build next-generation algorithms and control systems.",
                    matchCategories: ["Hackathon", "Workshop", "Challenge"]
                },
                {
                    id: "corporate",
                    title: "Corporate & Partner Meets",
                    description: "Engaging stakeholders, sharing financial milestones, and forging key institutional partnerships.",
                    matchCategories: ["Corporate", "Shareholder", "Meeting", "Partner"]
                }
            ]
        }
    ]
};
