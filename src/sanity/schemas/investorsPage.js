import { iconsList } from './icons';

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
                { name: 'metaTitle', type: 'string', title: 'Meta Title', initialValue: 'Investor Relations & Financial Reporting' },
                { name: 'metaDescription', type: 'text', title: 'Meta Description', initialValue: 'Explore CopterCode\'s investor relations, financial reports, shareholder information, and corporate governance. Transparent financial performance and investor resources.' },
                { name: 'keywords', type: 'string', title: 'Keywords', initialValue: 'investor relations, financial reporting, shareholder information, corporate governance, CopterCode, annual reports, financial performance', description: 'Comma separated list of search keywords' }
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
                },
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
                    initialValue: 'Investor Relations'
                }
            ]
        },
        // --- ABOUT PROGRAM SECTION ---
        {
            name: 'about',
            title: 'About IR Program Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'About Our Investor Relations Program' },
                { name: 'paragraph1', type: 'text', title: 'Paragraph 1', rows: 4, initialValue: 'At CopterCode, we believe in maintaining transparent communication with our investors and stakeholders. Our investor relations program provides comprehensive access to financial information, corporate governance details, and strategic insights into our diversified business operations.' },
                { name: 'paragraph2', type: 'text', title: 'Paragraph 2', rows: 4, initialValue: 'Whether you\'re researching our drone technology solutions, our digital services and ERP offerings, or our sustainable initiatives, our investor resources offer detailed insights into CopterCode\'s growth trajectory and market position.' }
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
                                list: iconsList.map(icon => ({
                                    title: icon.title,
                                    value: icon.value
                                }))
                            },
                            initialValue: 'trendingUp'
                        },
                        { name: 'title', type: 'string', title: 'Title' },
                        { name: 'description', type: 'text', title: 'Description' },
                        { name: 'linkText', type: 'string', title: 'Link Text', initialValue: 'View Details' },
                        { name: 'linkUrl', type: 'string', title: 'Link URL', initialValue: '#' }
                    ]
                }
            ],
            initialValue: [
                { icon: "trendingUp", title: "Financial Highlights", description: "Quarterly and annual financial performance reports.", linkText: "View Details", linkUrl: "#" },
                { icon: "fileText", title: "Annual Reports", description: "Comprehensive innovative and financial reviews of our fiscal years.", linkText: "View Details", linkUrl: "#" },
                { icon: "pieChart", title: "Shareholder Info", description: "Stock information, dividend history, and shareholder services.", linkText: "View Details", linkUrl: "#" },
                { icon: "shieldCheck", title: "Governance", description: "Board of directors, committees, and corporate policies.", linkText: "View Details", linkUrl: "#" }
            ]
        },
        // --- PARTNERS SECTION ---
        {
            name: 'partners',
            title: 'Partners Section Heading & Copy',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Our Strategic Investment Partners' },
                { name: 'description', type: 'text', title: 'Description', rows: 3, initialValue: 'Our investors are carefully selected partners who share our vision of innovation, sustainability, and long-term value creation in industrial automation and enterprise technology.' }
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
                        { name: 'url', type: 'url', title: 'Website URL', description: 'The investor\'s website or company URL' },
                        { name: 'description', type: 'text', title: 'Description' }
                    ]
                }
            ],
            initialValue: [
                {
                    name: "MurgDur",
                    url: "https://murgdur.com/",
                    description: "A leading venture capital firm focused on early-stage technology startups with high growth potential, supporting our vision since inception."
                },
                {
                    name: "Karvensen",
                    url: "https://karvensen.com/",
                    description: "A global investment group specializing in sustainable infrastructure and innovative industrial solutions, partnering for long-term strategic growth."
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
                { name: 'buttonLink', type: 'string', title: 'Button Link', initialValue: '/contact' }
            ]
        }
    ]
};
