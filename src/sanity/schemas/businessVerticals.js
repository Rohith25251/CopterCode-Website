export const businessVerticalsPage = {
    name: 'businessVerticalsPage',
    title: 'Business Verticals Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Business Verticals'
        },
        {
            name: 'verticals',
            title: 'Business Verticals',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Business Vertical',
                    fields: [
                        // --- IDENTIFIERS ---
                        { 
                            name: 'title', 
                            type: 'string', 
                            title: 'Vertical Name (Internal)',
                            description: 'e.g. Industrial Drones',
                            validation: Rule => Rule.required()
                        },
                        { 
                            name: 'slug', 
                            type: 'slug', 
                            title: 'Slug', 
                            options: { source: 'title' },
                            validation: Rule => Rule.required()
                        },
                        {
                            name: 'id',
                            type: 'string',
                            title: 'Component ID',
                            description: 'Unique ID to match with frontend (e.g. industrial-drones, infra-security)',
                            validation: Rule => Rule.required()
                        },

                        // --- HERO SECTION ---
                        {
                            name: 'heroTitle',
                            title: 'Hero Title',
                            type: 'string'
                        },
                        {
                            name: 'heroSubtitle',
                            title: 'Hero Subtitle',
                            type: 'text',
                            rows: 3
                        },
                        {
                            name: 'heroVideo',
                            title: 'Hero Video',
                            type: 'object',
                            fields: [
                                {
                                    name: 'type',
                                    title: 'Source Type',
                                    type: 'string',
                                    options: { list: [{ title: 'External URL', value: 'url' }, { title: 'Upload File', value: 'file' }] },
                                    initialValue: 'url'
                                },
                                { name: 'url', type: 'url', title: 'Video URL', hidden: ({ parent }) => parent?.type === 'file' },
                                { name: 'file', type: 'file', title: 'Video File', hidden: ({ parent }) => parent?.type === 'url' }
                            ]
                        },

                        // --- INTRO SECTION ---
                        {
                            name: 'introTitle',
                            title: 'Intro Title',
                            type: 'string'
                        },
                        {
                            name: 'introText',
                            title: 'Intro Text',
                            type: 'text',
                            rows: 4
                        },
                        {
                            name: 'introPoints',
                            title: 'Intro Points',
                            type: 'array',
                            of: [{ type: 'string' }]
                        },
                        {
                            name: 'introMedia',
                            title: 'Intro Media',
                            type: 'object',
                            fields: [
                                {
                                    name: 'mediaType',
                                    title: 'Media Type',
                                    type: 'string',
                                    options: { list: [{ title: 'Image', value: 'image' }, { title: 'Video', value: 'video' }] },
                                    initialValue: 'video'
                                },
                                {
                                    name: 'sourceType',
                                    title: 'Source Type',
                                    type: 'string',
                                    options: { list: [{ title: 'External URL', value: 'url' }, { title: 'Upload File', value: 'file' }] },
                                    initialValue: 'url'
                                },
                                { name: 'url', type: 'url', title: 'Media URL', hidden: ({ parent }) => parent?.sourceType === 'file' },
                                { name: 'file', type: 'file', title: 'Media File', hidden: ({ parent }) => parent?.sourceType === 'url' },
                                { name: 'image', type: 'image', title: 'Image File', hidden: ({ parent }) => parent?.mediaType !== 'image' || parent?.sourceType === 'url', options: { hotspot: true } }
                            ]
                        },

                        // --- PORTFOLIO SECTION ---
                        {
                            name: 'portfolioTitle',
                            title: 'Portfolio Title',
                            type: 'string'
                        },
                        {
                            name: 'portfolioItems',
                            title: 'Portfolio Items',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    fields: [
                                        { name: 'title', type: 'string', title: 'Title' },
                                        { name: 'desc', type: 'text', title: 'Description' },
                                        { name: 'features', type: 'array', of: [{ type: 'string' }], title: 'Features' }
                                    ]
                                }
                            ]
                        },

                        // --- FEATURES SECTION ---
                        {
                            name: 'featuresTitle',
                            title: 'Features Title',
                            type: 'string'
                        },
                        {
                            name: 'featuresList',
                            title: 'Features List',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    fields: [
                                        { name: 'title', type: 'string', title: 'Title' },
                                        { name: 'desc', type: 'string', title: 'Description' }
                                    ]
                                }
                            ]
                        },

                        // --- IMPACT SECTION ---
                        {
                            name: 'impactTitle',
                            title: 'Impact Title',
                            type: 'string'
                        },
                        {
                            name: 'impactItems',
                            title: 'Impact Items',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    fields: [
                                        { name: 'area', type: 'string', title: 'Area/Industry' },
                                        { name: 'desc', type: 'string', title: 'Description' }
                                    ]
                                }
                            ]
                        },

                        // --- TESTIMONIALS ---
                        {
                            name: 'testimonialQuote',
                            title: 'Testimonial Quote',
                            type: 'text'
                        },
                        {
                            name: 'testimonialAuthor',
                            title: 'Testimonial Author',
                            type: 'string'
                        },

                        // --- R&D SECTION ---
                        {
                            name: 'rdTitle',
                            title: 'R&D Title',
                            type: 'string'
                        },
                        {
                            name: 'rdText',
                            title: 'R&D Text',
                            type: 'text'
                        },
                        {
                            name: 'rdList',
                            title: 'R&D List',
                            type: 'array',
                            of: [{ type: 'string' }]
                        },

                        // --- COMPLIANCE SECTION ---
                        {
                            name: 'complianceTitle',
                            title: 'Compliance Title',
                            type: 'string'
                        },
                        {
                            name: 'complianceText',
                            title: 'Compliance Text',
                            type: 'text'
                        },
                        {
                            name: 'complianceList',
                            title: 'Compliance List',
                            type: 'array',
                            of: [{ type: 'string' }]
                        },
                        {
                            name: 'complianceFooter',
                            title: 'Compliance Footer',
                            type: 'text',
                            rows: 2
                        },

                        // --- CTA SECTION ---
                        {
                            name: 'ctaTitle',
                            title: 'CTA Title',
                            type: 'string'
                        },
                        {
                            name: 'ctaText',
                            title: 'CTA Text',
                            type: 'text'
                        },
                        {
                            name: 'ctaButtonText',
                            title: 'CTA Button Text',
                            type: 'string'
                        }
                    ]
                }
            ]
        }
    ]
};
