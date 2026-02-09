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
            title: 'Announcements',
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
        }
    ]
};
