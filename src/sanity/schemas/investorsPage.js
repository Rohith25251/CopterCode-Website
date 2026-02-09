export const investorsPage = {
    name: 'investorsPage',
    title: 'Investors Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Investors Page',
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
                { name: 'title', type: 'string', title: 'Title', initialValue: 'Our Investors' },
                { name: 'subtitle', type: 'text', title: 'Subtitle', initialValue: 'Transparent governance and sustainable value creation.' },
                {
                    name: 'introText',
                    type: 'text',
                    title: 'Intro Text',
                    rows: 3,
                    initialValue: 'CopterCode is committed to delivering long-term value to our stakeholders through innovation, responsible governance, and strategic growth.'
                }
            ]
        },
        // --- HIGHLIGHTS ---
        {
            name: 'highlights',
            title: 'Highlights Grid',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Highlight Item',
                    fields: [
                        {
                            name: 'icon',
                            title: 'Icon',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Trending Up', value: 'trendingUp' },
                                    { title: 'File Text', value: 'fileText' },
                                    { title: 'Pie Chart', value: 'pieChart' },
                                    { title: 'Shield Check', value: 'shieldCheck' },
                                    { title: 'Bar Chart', value: 'barChart' },
                                    { title: 'Briefcase', value: 'briefcase' }
                                ]
                            },
                            initialValue: 'trendingUp'
                        },
                        { name: 'title', type: 'string', title: 'Title' },
                        { name: 'description', type: 'text', title: 'Description' },
                        { name: 'linkText', type: 'string', title: 'Link Text', initialValue: 'View Details' },
                        { name: 'linkUrl', type: 'string', title: 'Link URL', initialValue: '#' }
                    ]
                }
            ]
        },
        // --- INVESTORS LIST ---
        {
            name: 'investors',
            title: 'Investors List',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Investor',
                    fields: [
                        { name: 'name', type: 'string', title: 'Investor Name' },
                        { name: 'logo', type: 'image', title: 'Logo', options: { hotspot: true } },
                        { name: 'description', type: 'text', title: 'Description' }
                    ]
                }
            ]
        },
        // --- INQUIRIES CTA ---
        {
            name: 'inquiries',
            title: 'Inquiries CTA',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Investor Inquiries' },
                { name: 'description', type: 'text', title: 'Description', initialValue: 'For investor relations inquiries, financial information, or partnership opportunities, please contact our investor relations team.' },
                { name: 'buttonText', type: 'string', title: 'Button Text', initialValue: 'Contact Investor Relations' },
                { name: 'buttonLink', type: 'string', title: 'Button Link', initialValue: 'mailto:investors@coptercode.co.in' }
            ]
        }
    ]
};
