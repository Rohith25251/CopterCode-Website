import { iconsList } from './icons';

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
                { name: 'metaTitle', type: 'string', title: 'Meta Title', initialValue: 'Sustainability & Impact' },
                { name: 'metaDescription', type: 'text', title: 'Meta Description', initialValue: 'CopterCode Nexus Impact - People, Planet, Prosperity' },
                { name: 'keywords', type: 'string', title: 'Keywords', initialValue: 'Drone Tech, Enterprise AI, Industrial Automation, UAV, CopterCode, Software Solutions, Sustainability, ESG, Clean Energy, CSR', description: 'Comma separated list of search keywords' }
            ]
        },
        // --- HERO ---
        {
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Title', initialValue: 'Sustainability' },
                { name: 'subtitle', type: 'text', title: 'Subtitle', initialValue: 'Impacting People, Planet, and Prosperity through innovation.' },
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
                    initialValue: 'Our Responsibility'
                }
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
                                list: iconsList.map(icon => ({
                                    title: icon.title,
                                    value: icon.value
                                }))
                            },
                            initialValue: 'star'
                        },
                        { name: 'text', type: 'string', title: 'Text' }
                    ]
                }
            ],
            initialValue: [
                { icon: "users", text: "Empowering people with care, empathy, and inclusiveness" },
                { icon: "briefcase", text: "Creating employment and enriching human capital" },
                { icon: "globe", text: "Collaborating globally to bring innovation to India" },
                { icon: "leaf", text: "Promoting sustainability, clean energy, and digital transformation" },
                { icon: "zap", text: "Driving education and innovation among youth" },
                { icon: "shield", text: "Delivering stakeholder-centric growth" },
                { icon: "code", text: "Building manufacturing and digital assets for India" },
                { icon: "sun", text: "Innovating in solar, textiles, and food sectors" }
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
