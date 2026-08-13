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
                {
                    name: 'descriptionBody',
                    type: 'text',
                    title: 'Full Description Body',
                    rows: 10,
                    description: 'The full company story shown below the heading. Each paragraph separated by a blank line. Defaults to the "From Vision to Reality" content if left empty.',
                    initialValue: `CopterCode was founded on a simple belief: technology should serve people, planet, and prosperity in equal measure. What began as a focused effort in drone innovation has grown into a multidisciplinary company bridging industrial automation, enterprise AI, and custom software engineering.

We work at the intersection of hardware and intelligence — designing UAV systems, building AI-driven solutions, and delivering digital transformation for businesses that refuse to stand still. Every product we build is guided by the same principle: innovation should be practical, scalable, and built to last.

Our journey has been shaped by curiosity, discipline, and a relentless pursuit of better ways to solve real-world problems. From early prototypes to enterprise-grade deployments, we've stayed committed to engineering excellence and to a future where automation and sustainability move forward together.

Today, CopterCode partners with businesses and institutions across industries — helping them modernize operations, unlock new efficiencies, and future-proof their growth through drone technology, AI, and intelligent software systems.`
                },
                { name: 'description', type: 'text', title: 'Short Description (Legacy)', rows: 4, description: 'Legacy short description — superseded by Full Description Body above.', initialValue: 'A journey of relentless innovation, guided by a legacy of excellence and a commitment to transforming the future.' },
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
                    name: 'cofounder',
                    title: 'Co-Founder',
                    type: 'object',
                    fields: [
                        { name: 'name', type: 'string', title: 'Name', initialValue: 'Sundharesan Duraiswamy' },
                        { name: 'role', type: 'string', title: 'Role', initialValue: 'CO-FOUNDER' },
                        { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
                        { name: 'description', type: 'text', title: 'Description', rows: 6 },
                        { name: 'linkedin', type: 'url', title: 'LinkedIn Profile URL', initialValue: '#' }
                    ]
                },
                {
                    name: 'founder',
                    title: 'Founder',
                    type: 'object',
                    fields: [
                        { name: 'name', type: 'string', title: 'Name', initialValue: 'Karthikeyan Sundharesan' },
                        { name: 'role', type: 'string', title: 'Role', initialValue: 'FOUNDER / CEO' },
                        { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
                        { name: 'description', type: 'text', title: 'Description', rows: 6 },
                        { name: 'linkedin', type: 'url', title: 'LinkedIn Profile URL', initialValue: '#' }
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
