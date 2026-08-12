import { iconsList } from './icons';

export const aboutPage = {
    name: 'aboutPage',
    title: 'About Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'About Page',
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
        // --- HERO SECTION ---
        {
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Hero Title', initialValue: 'About Us' },
                { name: 'subtitle', type: 'text', title: 'Hero Subtitle', initialValue: 'Revolutionizing industries with drones, technology, and sustainable innovation.' },
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
                    initialValue: 'Our Story'
                }
            ]
        },


        // --- ORIGIN SECTION ---
        {
            name: 'origin',
            title: 'Origin Section',
            type: 'object',
            fields: [
                { name: 'tag', type: 'string', title: 'Tag Badge Text', initialValue: 'Our Origin' },
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'From Vision to Reality' },
                { name: 'description', type: 'text', title: 'Description', rows: 4, initialValue: 'A journey of relentless innovation, guided by a legacy of excellence and a commitment to transforming the future.' },
                { name: 'quote', type: 'text', title: 'Quote (Mission)', rows: 2, initialValue: 'Driven by sustainability, impacting People, Planet, and Prosperity.' }
            ]
        },

        // --- JOURNEY SECTION ---
        {
            name: 'journey',
            title: 'Our Journey Timeline',
            description: 'Create one entry per year: 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026-Present',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Journey Milestone',
                    fields: [
                        { 
                            name: 'year', 
                            type: 'string', 
                            title: 'Year / Period',
                            description: 'e.g., "2019", "2020", "2021", etc.'
                        },
                        { name: 'title', type: 'string', title: 'Title' },
                        { 
                            name: 'description', 
                            type: 'text', 
                            title: 'Description',
                            rows: 5,
                            description: 'Detailed description of what happened this year'
                        },
                        { name: 'image', type: 'image', title: 'Milestone Image', options: { hotspot: true } },
                        {
                            name: 'icon',
                            type: 'string',
                            title: 'Icon Type',
                            options: {
                                list: iconsList.map(icon => ({
                                    title: icon.title,
                                    value: icon.value
                                }))
                            },
                            initialValue: 'lightbulb'
                        }
                    ]
                }
            ]
        },


        {
            name: 'foundersSection',
            title: 'Founders Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Section Heading', initialValue: 'Founder' },
                {
                    name: 'founder',
                    title: 'Founder',
                    type: 'object',
                    fields: [
                        { name: 'name', type: 'string', title: 'Name', initialValue: 'Karthikeyan Sundharesan' },
                        { name: 'role', type: 'string', title: 'Role', initialValue: 'FOUNDER / CEO' },
                        { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
                        { name: 'description', type: 'text', title: 'Description', rows: 6 }
                    ]
                },
                {
                    name: 'cofounder',
                    title: 'Co-Founder',
                    type: 'object',
                    fields: [
                        { name: 'name', type: 'string', title: 'Name', initialValue: 'Sundharesan Duraiswamy' },
                        { name: 'role', type: 'string', title: 'Role', initialValue: 'CO-FOUNDER' },
                        { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
                        { name: 'description', type: 'text', title: 'Description', rows: 6 }
                    ]
                }
            ]
        },
        {
            name: 'milestonesHeading',
            title: 'Milestones Section Heading',
            type: 'string',
            initialValue: 'Milestones at a Glance'
        },
        // --- MILESTONES GRID ---
        {
            name: 'milestones',
            title: 'Milestones at a Glance',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Milestone',
                    fields: [
                        { 
                            name: 'year', 
                            type: 'string', 
                            title: 'Year',
                            description: 'e.g., "2019", "2020", "2021", "2022", "2023", "2024", "2025", "Future"'
                        },
                        { name: 'title', type: 'string', title: 'Title' },
                        { name: 'description', type: 'string', title: 'Short Description' }
                    ]
                }
            ],
            initialValue: [
                { year: "2019", title: "Foundation", description: "Established by Late Sundharesan Duraiswamy." },
                { year: "2020", title: "Cybersecurity", description: "Expansion into IT security services." },
                { year: "2021", title: "Education", description: "Launch of Drone Labs & Science Space." },
                { year: "2022", title: "Sustainability", description: "Textile Mfg & Solar Solutions." },
                { year: "2023", title: "Infrastructure", description: "Construction & Real Estate Ventures." },
                { year: "2024", title: "Strategic Partnerships", description: "Collab with Shree Murugappa Food Corp." },
                { year: "2025", title: "Digital Transformation", description: "ERP, LMS & Infra Security Launch." },
                { year: "2026", title: "Global 2.0", description: "Continued innovation & global expansion." }
            ]
        }
    ]
};
