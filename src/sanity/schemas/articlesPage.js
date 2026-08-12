export const articlesPage = {
    name: 'articlesPage',
    title: 'Research Articles Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Articles Page',
            description: 'Internal title for this page'
        },
        // --- SEO ---
        {
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                { name: 'metaTitle', type: 'string', title: 'Meta Title', initialValue: 'Research Articles & Publications' },
                { name: 'metaDescription', type: 'text', title: 'Meta Description', initialValue: 'Explore scientific publications, research papers, and technical journals authored by the CopterCode team and founder in AI, drone tech, and aerospace.' },
                { name: 'keywords', type: 'string', title: 'Keywords', initialValue: 'articles, publications, research papers, google scholar, drone technology, swarm AI, karthikeyan sundaresan, coptercode R&D', description: 'Comma separated list of search keywords' }
            ]
        },
        // --- HERO CAROUSEL SLIDES ---
        {
            name: 'heroSlides',
            title: 'Hero Slides',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Hero Slide',
                    fields: [
                        { name: 'image', type: 'image', title: 'Background Image', options: { hotspot: true } },
                        { name: 'category', type: 'string', title: 'Category', initialValue: 'Aerospace Research' },
                        { name: 'title', type: 'string', title: 'Slide Title', initialValue: 'Advancing Swarm UAV Autonomy' },
                        { name: 'quote', type: 'text', title: 'Quote/Summary', rows: 2, initialValue: 'Exploring decentralized collision-avoidance and cooperative swarm pathfinding in zero-GPS tactical environments.' },
                        { name: 'tag', type: 'string', title: 'Tag', initialValue: 'Aerospace Publications' },
                        { name: 'linkText', type: 'string', title: 'Link Button Text', initialValue: 'Read Publications' },
                        { name: 'link', type: 'string', title: 'Link Target', initialValue: '#all-articles' }
                    ]
                }
            ],
            initialValue: [
                {
                    category: "Aerospace Research",
                    title: "Advancing Swarm UAV Autonomy",
                    quote: "Exploring decentralized collision-avoidance and cooperative swarm pathfinding in zero-GPS tactical environments.",
                    tag: "Aerospace Publications",
                    linkText: "Read Publications",
                    link: "#all-articles"
                },
                {
                    category: "Edge AI & Vision",
                    title: "Embedded Intelligence at the Edge",
                    quote: "Real-time computer vision algorithms deployed directly on micro-controller units for crop health classification.",
                    tag: "AI Research",
                    linkText: "Explore Papers",
                    link: "#all-articles"
                }
            ]
        },
        // --- TOPICS & PAPERS NESTED SCHEMA ---
        {
            name: 'topics',
            title: 'Research Topics (Groups)',
            description: 'Define research topics/sections. Each topic contains its own list of papers.',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'topicSection',
                    title: 'Research Topic',
                    fields: [
                        { name: 'id', type: 'string', title: 'Topic ID (e.g. aerospace-ai, hardware, security)' },
                        { name: 'title', type: 'string', title: 'Topic Title (e.g. Swarm & Aerospace AI Research)' },
                        { name: 'description', type: 'text', title: 'Topic Description/Scope', rows: 2 },
                        {
                            name: 'papers',
                            title: 'Topic Publications (Papers)',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    name: 'paperItem',
                                    title: 'Research Paper',
                                    fields: [
                                        { name: 'title', type: 'string', title: 'Paper Title' },
                                        { name: 'authors', type: 'string', title: 'Authors (e.g. Karthikeyan Sundaresan, R. Srinivasan)' },
                                        { name: 'journal', type: 'string', title: 'Journal/Conference Name' },
                                        { name: 'date', type: 'string', title: 'Publication Date (e.g. March 2024)' },
                                        { name: 'category', type: 'string', title: 'Category/Tag (e.g. SWARM INTELLIGENCE)' },
                                        { name: 'description', type: 'text', title: 'Paper Abstract', rows: 3 },
                                        { name: 'image', type: 'image', title: 'Paper Visual Cover Image', options: { hotspot: true } },
                                        { name: 'citationLink', type: 'url', title: 'Google Scholar / Citation URL' }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            initialValue: [
                {
                    id: "aerospace-ai",
                    title: "Swarm & Aerospace AI Research",
                    description: "Deep-dives into multi-UAV coordination, edge-AI image recognition, and autopilot path optimization.",
                    papers: [
                        {
                            title: "Decentralized Swarm Collision Avoidance Algorithms for Multi-UAV Systems in GPS-Denied Environments",
                            authors: "Karthikeyan Sundaresan, R. Srinivasan",
                            journal: "Journal of Aerospace Computing",
                            date: "March 2024",
                            category: "Swarm Intelligence",
                            description: "A decentralized navigation framework utilizing optical flow and UWB distance telemetry for high-accuracy obstacle avoidance inside warehouses and under tree canopies.",
                            citationLink: "https://scholar.google.com/scholar?q=Karthikeyan+Sundaresan"
                        },
                        {
                            title: "Real-Time Embedded Computer Vision for Crop Health Analysis via Low-Altitude Commercial Drones",
                            authors: "Karthikeyan Sundaresan, M. Lakshmi",
                            journal: "IEEE Transactions on Geoscience",
                            date: "September 2023",
                            category: "Agricultural UAVs",
                            description: "A model-compression workflow deploying lightweight MobileNet backbones on embedded flight-controllers for dynamic crop classification and yield analysis.",
                            citationLink: "https://scholar.google.com/scholar?q=Karthikeyan+Sundaresan"
                        }
                    ]
                },
                {
                    id: "hardware",
                    title: "Drone Hardware & Structures",
                    description: "Material optimizations, carbon-fiber composites, and physical structural performance studies.",
                    papers: [
                        {
                            title: "Design Optimizations in Carbon-Fiber Reinforcements for Heavy-Payload Electric Multirotors",
                            authors: "Karthikeyan Sundaresan, G. van der Berg",
                            journal: "Composite Structures & Materials",
                            date: "June 2024",
                            category: "Drone Hardware",
                            description: "Stress testing customized weave structures and analyzing tensile performance to reduce structural weight while maintaining peak stress boundaries.",
                            citationLink: "https://scholar.google.com/scholar?q=Karthikeyan+Sundaresan"
                        }
                    ]
                }
            ]
        }
    ]
};
