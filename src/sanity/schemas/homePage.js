export const homePage = {
    name: 'homePage',
    title: 'Home Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            description: 'Internal title for this page (e.g. "Home Page")',
        },
        // --- HERO SECTION ---
        {
            name: 'heroSection',
            title: 'Hero Section',
            type: 'object',
            fields: [
                {
                    name: 'tagline',
                    title: 'Tagline',
                    type: 'string',
                    initialValue: 'Engineering The Unknown'
                },
                {
                    name: 'title',
                    title: 'Main Headline',
                    type: 'string',
                    initialValue: 'Future Ready Systems.'
                },
                {
                    name: 'subtitle',
                    title: 'Subtitle',
                    type: 'text',
                    rows: 3,
                    initialValue: "We don't just build software. We engineer intelligent ecosystems where Drone Tech meets Enterprise AI."
                },
                {
                    name: 'heroImages',
                    title: 'Hero Images',
                    type: 'array',
                    options: { layout: 'grid' },
                    of: [{ type: 'image', options: { hotspot: true } }]
                },
                {
                    name: 'primaryCTA',
                    title: 'Primary CTA (Button)',
                    type: 'object',
                    fields: [
                        { name: 'text', type: 'string', title: 'Button Text', initialValue: 'View Our Work' },
                        { name: 'link', type: 'string', title: 'Button Link', initialValue: '/projects' }
                    ]
                },
                {
                    name: 'secondaryCTA',
                    title: 'Secondary CTA (Link)',
                    type: 'object',
                    fields: [
                        { name: 'text', type: 'string', title: 'Link Text', initialValue: 'Start a Project' },
                        { name: 'link', type: 'string', title: 'Link URL', initialValue: '/contact' }
                    ]
                }
            ]
        },
        // --- SCROLLING ANNOUNCEMENT BAR ---
        {
            name: 'scrollingAnnouncementBar',
            title: 'Scrolling Announcement Bar',
            type: 'scrollingAnnouncementBar'
        },
        // --- BUSINESSES SECTION ---
        {
            name: 'businessesSection',
            title: 'Our Businesses Section',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'business',
                    title: 'Business Utility',
                    fields: [
                        { name: 'title', type: 'string', title: 'Business Title' },
                        { name: 'description', type: 'text', title: 'Description' },
                        {
                            name: 'videoType',
                            title: 'Video Source Type',
                            type: 'string',
                            options: { list: [{ title: 'External URL', value: 'url' }, { title: 'Upload File', value: 'file' }] },
                            initialValue: 'url'
                        },
                        { name: 'videoUrl', type: 'url', title: 'Video URL (MP4)', hidden: ({ parent }) => parent?.videoType === 'file' },
                        { name: 'videoFile', type: 'file', title: 'Upload Video', hidden: ({ parent }) => parent?.videoType === 'url' },
                        { name: 'link', type: 'string', title: 'Link', initialValue: '/business' }
                    ]
                }
            ]
        },
        // --- CINEMATIC VIDEO SHOWCASE (CopterCode in Action) ---
        {
            name: 'cinematicShowcase',
            title: 'CopterCode in Action (Video Slider)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Label/Category' },
                        {
                            name: 'videoType',
                            title: 'Video Source Type',
                            type: 'string',
                            options: { list: [{ title: 'External URL', value: 'url' }, { title: 'Upload File', value: 'file' }] },
                            initialValue: 'url'
                        },
                        { name: 'videoUrl', type: 'url', title: 'Video URL', hidden: ({ parent }) => parent?.videoType === 'file' },
                        { name: 'videoFile', type: 'file', title: 'Upload Video', hidden: ({ parent }) => parent?.videoType === 'url' }
                    ]
                }
            ]
        },
        // --- ANNOUNCEMENTS SECTION ---
        {
            name: 'announcementsSection',
            title: 'Latest Insights',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', type: 'string', title: 'Title' },
                        { name: 'date', type: 'date', title: 'Date', options: { dateFormat: 'DD MMM, YYYY' } },
                        { name: 'type', type: 'string', title: 'Update Type', initialValue: 'COPTERCODE UPDATE' },
                        { name: 'image', type: 'image', title: 'Thumbnail Image', options: { hotspot: true } }
                    ]
                }
            ]
        },
        // --- ADVANCED TECHNOLOGY SECTION ---
        {
            name: 'advancedTechSection',
            title: 'Advanced Technology Section',
            type: 'object',
            fields: [
                { name: 'statsValue', type: 'string', title: 'Statistic Value (e.g. 99)', initialValue: '99' },
                { name: 'statsUnit', type: 'string', title: 'Statistic Unit', initialValue: '' },
                { name: 'statsLabel', type: 'string', title: 'Statistic Label', initialValue: 'Operational Efficiency' },
                { name: 'heading', type: 'string', title: 'Main Heading', initialValue: 'Revolutionizing Logistics & Surveillance with AI-Powered Autonomous Drone Systems' },
                {
                    name: 'videoType',
                    title: 'Video Source Type',
                    type: 'string',
                    options: { list: [{ title: 'External URL', value: 'url' }, { title: 'Upload File', value: 'file' }] },
                    initialValue: 'url'
                },
                { name: 'videoUrl', type: 'url', title: 'Video URL', hidden: ({ parent }) => parent?.videoType === 'file' },
                { name: 'videoFile', type: 'file', title: 'Upload Video', hidden: ({ parent }) => parent?.videoType === 'url' }
            ]
        },
        // --- TESTIMONIALS (Voice of Success) ---
        {
            name: 'testimonialsSection',
            title: 'Testimonials (Voice of Success)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', type: 'string', title: 'Title' },
                        {
                            name: 'videoType',
                            title: 'Video Source Type',
                            type: 'string',
                            options: { list: [{ title: 'External URL (YouTube/MP4)', value: 'url' }, { title: 'Upload File', value: 'file' }] },
                            initialValue: 'url'
                        },
                        { name: 'videoUrlOrId', type: 'string', title: 'YouTube ID or Video URL', hidden: ({ parent }) => parent?.videoType === 'file' },
                        { name: 'videoFile', type: 'file', title: 'Upload Video', hidden: ({ parent }) => parent?.videoType === 'url' }
                    ]
                }
            ]
        },
        // --- GLOBAL FOOTPRINT ---
        {
            name: 'globalFootprintImage',
            title: 'Global Footprint Image',
            type: 'image',
            options: { hotspot: true }
        },
        // --- OUR PHILOSOPHY SECTION (ImpactTabs) ---
        {
            name: 'ourPhilosophySection',
            title: 'Our Philosophy Section',
            type: 'object',
            fields: [
                {
                    name: 'heading',
                    title: 'Section Heading',
                    type: 'string',
                    initialValue: 'Driven by Purpose'
                },
                {
                    name: 'tabs',
                    title: 'Tabs',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            title: 'Tab Item',
                            fields: [
                                {
                                    name: 'tabTitle',
                                    title: 'Tab Title (e.g. Sustainability)',
                                    type: 'string'
                                },
                                {
                                    name: 'sectionTitle',
                                    title: 'Main Title',
                                    type: 'string'
                                },
                                {
                                    name: 'description',
                                    title: 'Description',
                                    type: 'text',
                                    rows: 4
                                },
                                {
                                    name: 'supportingIcon',
                                    title: 'Icon Type',
                                    type: 'string',
                                    options: {
                                        list: [
                                            { title: 'Sustainability (Leaf)', value: 'sustainability' },
                                            { title: 'Innovation (Lightbulb)', value: 'innovation' },
                                            { title: 'Impact (Chart)', value: 'impact' }
                                        ]
                                    },
                                    initialValue: 'sustainability'
                                },
                                {
                                    name: 'metrics',
                                    title: 'Key Metrics',
                                    type: 'array',
                                    of: [
                                        {
                                            type: 'object',
                                            fields: [
                                                { name: 'metricValue', type: 'string', title: 'Value (e.g. 2035)' },
                                                { name: 'metricLabel', type: 'string', title: 'Label (e.g. Net-Zero)' }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        // --- UPCOMING EVENTS SECTION ---
        {
            name: 'upcomingEventsSection',
            title: 'Upcoming Events Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Section Heading', initialValue: 'Upcoming Events' },
                {
                    name: 'events',
                    title: 'Events List',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'title', type: 'string', title: 'Event Title' },
                                { name: 'date', type: 'string', title: 'Date' },
                                { name: 'location', type: 'string', title: 'Location' },
                                { name: 'category', type: 'string', title: 'Category (e.g. Exhibition, Hackathon)' },
                                { name: 'image', type: 'image', title: 'Event Image', options: { hotspot: true } }
                            ]
                        }
                    ]
                }
            ]
        },
        // --- CAREERS SECTION ---
        {
            name: 'careersSection',
            title: 'Careers Section',
            type: 'object',
            fields: [
                { name: 'tagline', type: 'string', title: 'Tagline', initialValue: 'Join Our Elite Team' },
                { name: 'heading', type: 'string', title: 'Main Heading', initialValue: 'Build The Future With Us' },
                { name: 'description', type: 'text', title: 'Description' },
                {
                    name: 'benefits',
                    title: 'Benefits / Highlights',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'title', type: 'string', title: 'Title' },
                                { name: 'description', type: 'text', title: 'Description' },
                                {
                                    name: 'icon',
                                    title: 'Icon',
                                    type: 'string',
                                    options: {
                                        list: [
                                            { title: 'Zap (Learning)', value: 'zap' },
                                            { title: 'Globe (Global)', value: 'globe' },
                                            { title: 'Heart (Inclusive)', value: 'heart' }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        // --- INTERNSHIP SECTION ---
        {
            name: 'internshipSection',
            title: 'Internship Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Internship Programme' },
                { name: 'description', type: 'text', title: 'Description' },
                {
                    name: 'stats',
                    title: 'Statistics',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'value', type: 'string', title: 'Value (e.g. 40+)' },
                                { name: 'label', type: 'string', title: 'Label (e.g. Partner Colleges)' }
                            ]
                        }
                    ]
                },
                { name: 'applyLink', type: 'url', title: 'Apply Now Link' },
                { name: 'image', type: 'image', title: 'Main Image', options: { hotspot: true } }
            ]
        },
        // --- SUSTAINABILITY SECTION ---
        {
            name: 'sustainabilitySection',
            title: 'Sustainability Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Sustainability & CSR' },
                { name: 'description', type: 'text', title: 'Description' },
                {
                    name: 'impactItems',
                    title: 'Impact Items',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'text', type: 'string', title: 'Text' },
                                {
                                    name: 'icon',
                                    title: 'Icon',
                                    type: 'string',
                                    options: {
                                        list: [
                                            { title: 'Users', value: 'users' },
                                            { title: 'Globe', value: 'globe' },
                                            { title: 'Leaf', value: 'leaf' },
                                            { title: 'Code', value: 'code' }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                { name: 'bannerImage', type: 'image', title: 'Banner Image', options: { hotspot: true } }
            ]
        }
    ]
};
