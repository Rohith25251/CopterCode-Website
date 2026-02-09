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
                { name: 'metaDescription', type: 'text', title: 'Meta Description', initialValue: 'Latest updates and announcements from CopterCode' }
            ]
        },
        // --- HERO ---
        {
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Title', initialValue: 'Insights' },
                { name: 'subtitle', type: 'string', title: 'Subtitle', initialValue: 'A chronological journey of our milestones, events, and innovations.' }
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
            ]
        }
    ]
};
