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
        // --- SEO SECTION ---
        {
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                { name: 'metaTitle', type: 'string', title: 'Meta Title' },
                { name: 'metaDescription', type: 'text', title: 'Meta Description' },
                { name: 'keywords', type: 'string', title: 'Keywords (comma separated)' },
                { name: 'metaImage', type: 'image', title: 'Meta Share Image', options: { hotspot: true } }
            ]
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
                    type: 'array',
                    of: [
                        {
                            type: 'block',
                            styles: [{ title: 'Normal', value: 'normal' }],
                            marks: {
                                decorators: [{ title: 'Strong', value: 'strong' }, { title: 'Emphasis', value: 'em' }],
                                annotations: [
                                    {
                                        name: 'link',
                                        type: 'object',
                                        title: 'Link',
                                        fields: [
                                            {
                                                name: 'href',
                                                type: 'url',
                                                title: 'URL',
                                                validation: Rule => Rule.uri({
                                                    allowRelative: true,
                                                    scheme: ['http', 'https', 'mailto', 'tel']
                                                })
                                            }
                                        ]
                                    },

                                ]
                            }
                        }
                    ]
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
        // --- ABOUT SUMMARY SECTION ---
        {
            name: 'aboutSummarySection',
            title: 'About Summary Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Who We Are' },
                { name: 'subheading', type: 'string', title: 'Subheading', initialValue: 'Pioneering the Future of Aerial Tech' },
                { name: 'description', type: 'text', title: 'Description' },
                { name: 'image', type: 'image', title: 'Feature Image', options: { hotspot: true } },
                {
                    name: 'stats',
                    title: 'Key Stats',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'value', type: 'string', title: 'Value' },
                                { name: 'label', type: 'string', title: 'Label' }
                            ]
                        }
                    ]
                }
            ]
        },
        // --- INVESTOR SUMMARY SECTION ---
        {
            name: 'investorSummarySection',
            title: 'Investor Summary Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Investor Relations' },
                { name: 'description', type: 'text', title: 'Description' },
                {
                    name: 'highlights',
                    title: 'Highlights',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'title', type: 'string', title: 'Title' },
                                { name: 'description', type: 'string', title: 'Description' },
                                {
                                    name: 'icon',
                                    type: 'string',
                                    options: {
                                        list: [
                                            { title: 'Chart', value: 'chart' },
                                            { title: 'Shield', value: 'shield' },
                                            { title: 'File', value: 'file' },
                                            { title: 'Pie Chart', value: 'piechart' }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'investors',
                    title: 'Our Investors List',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'name', type: 'string', title: 'Investor Name' },
                                { name: 'description', type: 'text', title: 'Description' },
                                { name: 'logo', type: 'image', title: 'Logo', options: { hotspot: true } }
                            ]
                        }
                    ]
                }
            ]
        },
        // --- SCROLLING ANNOUNCEMENT BAR ---
        {
            name: 'scrollingAnnouncementBar',
            title: 'Scrolling Announcement Bar',
            type: 'object',
            fields: [
                {
                    name: 'isEnabled',
                    title: 'Enable Announcement Bar',
                    type: 'boolean',
                    initialValue: true
                },
                {
                    name: 'announcements',
                    title: 'Announcements',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'text', type: 'string', title: 'Announcement Text' },
                                { name: 'link', type: 'string', title: 'Link (Optional)' },
                                { name: 'isHighlight', type: 'boolean', title: 'Highlight Text?', initialValue: false }
                            ]
                        }
                    ]
                },
                {
                    name: 'scrollSpeed',
                    title: 'Scroll Speed (Duration in seconds)',
                    description: 'Lower is faster. Default: 30',
                    type: 'number',
                    initialValue: 30
                },
                {
                    name: 'direction',
                    title: 'Direction',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Left', value: 'left' },
                            { title: 'Right', value: 'right' }
                        ]
                    },
                    initialValue: 'left'
                },
                {
                    name: 'backgroundColor', // Optional override
                    title: 'Background Color (Hex)',
                    type: 'string',
                    description: 'e.g. #000000. Leave empty for default premium dark theme.',
                },
                {
                    name: 'textColor',
                    title: 'Text Color (Hex)',
                    type: 'string',
                    description: 'e.g. #FFFFFF. Leave empty for default.',
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
                { name: 'statsUnit', type: 'string', title: 'Statistic Unit', initialValue: '%' },
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
                { name: 'image', type: 'image', title: 'Main Image (Fallback)', options: { hotspot: true } },
                {
                    name: 'images',
                    title: 'Slideshow Images',
                    type: 'array',
                    of: [{ type: 'image', options: { hotspot: true } }]
                }
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
        },
        // --- ENGINEERING COMMAND CENTER SECTION ---
        {
            name: 'engineeringCommandCenterSection',
            title: 'Engineering Command Center',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'ENGINEERING COMMAND CENTER.' },
                { name: 'subtext', type: 'text', title: 'Subtext', initialValue: 'Where industrial automation meets enterprise software intelligence.' },
                {
                    name: 'focusAreas',
                    title: 'Strategic Focus Areas',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'title', type: 'string', title: 'Title' },
                                { name: 'description', type: 'string', title: 'Description' }
                            ]
                        }
                    ]
                },
                {
                    name: 'coreCapabilities',
                    title: 'Core Capabilities',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'title', type: 'string', title: 'Title' },
                                { name: 'description', type: 'string', title: 'Description' }
                            ]
                        }
                    ]
                },
                {
                    name: 'infoCard',
                    title: 'Right Side Info Card',
                    type: 'object',
                    fields: [
                        { name: 'engineersCount', type: 'string', title: 'Engineers Count' },
                        { name: 'status', type: 'string', title: 'Lab Status' }
                    ]
                }
            ]
        },
        // --- WHY CHOOSE SECTION ---
        {
            name: 'whyChooseSection',
            title: 'Why Choose Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Main Heading', initialValue: 'Why Choose CopterCode?' },
                { name: 'description', type: 'text', title: 'Description' },
                {
                    name: 'features',
                    title: 'Features List',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'title', type: 'string', title: 'Feature Title' },
                                { name: 'description', type: 'string', title: 'Feature Description' }
                            ]
                        }
                    ]
                },
                {
                    name: 'caseStudies',
                    title: 'Case Studies',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'title', type: 'string', title: 'Case Study Title' },
                                { name: 'subtitle', type: 'string', title: 'Subtitle' },
                                {
                                    name: 'stats',
                                    title: 'Key Stats',
                                    type: 'array',
                                    of: [
                                        {
                                            type: 'object',
                                            fields: [
                                                { name: 'value', type: 'string', title: 'Value' },
                                                { name: 'label', type: 'string', title: 'Label' }
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
