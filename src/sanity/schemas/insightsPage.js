export const insightsPage = {
    name: 'insightsPage',
    title: 'Insights Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Insights Page',
            description: 'Internal title for this page'
        },
        // --- SEO ---
        {
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                { name: 'metaTitle', type: 'string', title: 'Meta Title', initialValue: 'Insights' },
                { name: 'metaDescription', type: 'text', title: 'Meta Description', initialValue: 'Latest updates and announcements from CopterCode' },
                { name: 'keywords', type: 'string', title: 'Keywords', initialValue: 'Drone Tech, Enterprise AI, Industrial Automation, UAV, CopterCode, Software Solutions, Insights, News, Announcements', description: 'Comma separated list of search keywords' }
            ]
        },
        // --- HERO ---
        {
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Title', initialValue: 'Insights' },
                { name: 'subtitle', type: 'string', title: 'Subtitle', initialValue: 'A chronological journey of our milestones, events, and innovations.' },
                {
                    name: 'image',
                    title: 'Hero Background Image',
                    type: 'image',
                    options: { hotspot: true }
                },
                {
                    name: 'tag',
                    title: 'Hero Tag',
                    type: 'string',
                    initialValue: 'Latest Updates'
                }
            ]
        },
        // --- YEARS ---
        {
            name: 'years',
            title: 'Chronological Sections',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'insightYear',
                    title: 'Insight Year',
                    fields: [
                        { name: 'year', type: 'string', title: 'Year', initialValue: '2025' },
                        {
                            name: 'events',
                            title: 'Events',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    name: 'insightItem',
                                    title: 'Insight Item',
                                    fields: [
                                        { name: 'category', type: 'string', title: 'Category' },
                                        { name: 'date', type: 'date', title: 'Date' },
                                        { name: 'title', type: 'string', title: 'Title' },
                                        { name: 'excerpt', type: 'text', title: 'Excerpt' },
                                        { name: 'author', type: 'string', title: 'Author/Division' },
                                        { name: 'readTime', type: 'string', title: 'Read Time' }
                                    ]
                                }
                            ]
                        },
                        {
                            name: 'gallery',
                            title: 'Gallery',
                            type: 'array',
                            of: [{ type: 'image' }]
                        }
                    ]
                }
            ],
            initialValue: [
                {
                    year: '2025',
                    events: [
                        {
                            category: 'Internship',
                            date: '2025-05-05',
                            title: 'CopterCode Summer Internship 2025 at IIT Madras Research Park',
                            excerpt: 'Students from 40+ institutions joined hands-on UAV projects.',
                            author: 'Internship Division',
                            readTime: '3 min read'
                        },
                        {
                            category: 'Workshop',
                            date: '2025-07-12',
                            title: 'AI in Drones Workshop 2025',
                            excerpt: 'Machine learning applied to flight path optimization.',
                            author: 'AI Research Team',
                            readTime: '3 min read'
                        }
                    ],
                    gallery: []
                },
                {
                    year: '2024',
                    events: [
                        {
                            category: 'Internship',
                            date: '2024-07-02',
                            title: 'CopterCode Internship 2024 Welcomes 150 Students Nationwide',
                            excerpt: 'Advanced training on UAV automation and field operations.',
                            author: 'HR & Training Division',
                            readTime: '3 min read'
                        }
                    ],
                    gallery: []
                }
            ]
        }
    ]
};
