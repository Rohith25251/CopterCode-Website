export const sustainabilityPage = {
    name: 'sustainabilityPage',
    title: 'Sustainability Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Sustainability Page',
            description: 'Internal title for this page'
        },
        // --- SEO ---
        {
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                { name: 'metaTitle', type: 'string', title: 'Meta Title' },
                { name: 'metaDescription', type: 'text', title: 'Meta Description' }
            ]
        },
        // --- HERO ---
        {
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Title', initialValue: 'Sustainability' },
                { name: 'subtitle', type: 'text', title: 'Subtitle', initialValue: 'Impacting People, Planet, and Prosperity through innovation.' }
            ]
        },
        // --- INTRO ---
        {
            name: 'intro',
            title: 'Introduction Impact',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'CopterCode Nexus Impact' },
                { name: 'description', type: 'text', title: 'Description', rows: 3, initialValue: 'We are committed to building societal and business value together, driving sustainable growth across all our operations.' }
            ]
        },
        // --- IMPACT GRID ---
        {
            name: 'impactGrid',
            title: 'Impact Grid',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Impact Item',
                    fields: [
                        {
                            name: 'icon',
                            title: 'Icon',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Users', value: 'users' },
                                    { title: 'Briefcase', value: 'briefcase' },
                                    { title: 'Globe', value: 'globe' },
                                    { title: 'Leaf', value: 'leaf' },
                                    { title: 'Zap', value: 'zap' },
                                    { title: 'Shield', value: 'shield' },
                                    { title: 'Code', value: 'code' },
                                    { title: 'Sun', value: 'sun' },
                                    { title: 'Star', value: 'star' }
                                ]
                            },
                            initialValue: 'star'
                        },
                        { name: 'text', type: 'string', title: 'Text' }
                    ]
                }
            ]
        },
        // --- CSR INITIATIVES ---
        {
            name: 'csr',
            title: 'CSR Initiatives',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'CSR Initiatives' },
                { name: 'description', type: 'text', title: 'Description', rows: 2, initialValue: 'Supporting arts, culture, and heritage through CSR. Serving multiple industries across India and the USA (Texas).' }
            ]
        }
    ]
};
