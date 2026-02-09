export const technologiesPage = {
    name: 'technologiesPage',
    title: 'Technologies Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Technologies Page',
            description: 'Internal title for this page'
        },
        // --- SEO ---
        {
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                { name: 'metaTitle', type: 'string', title: 'Meta Title', initialValue: 'Technologies' },
                { name: 'metaDescription', type: 'text', title: 'Meta Description', initialValue: 'Our tech stack includes React, Node.js, AI, and Cloud.' }
            ]
        },
        // --- HERO ---
        {
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Title', initialValue: 'Technologies' },
                { name: 'subtitle', type: 'text', title: 'Subtitle', initialValue: 'We use the latest tools and frameworks to build future-proof software.' }
            ]
        },
        // --- TECH STACK ---
        {
            name: 'techStack',
            title: 'Technology Stack',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'category', type: 'string', title: 'Category' },
                        {
                            name: 'items',
                            title: 'Items',
                            type: 'array',
                            of: [{ type: 'string' }]
                        }
                    ]
                }
            ],
            initialValue: [
                {
                    category: "Frontend",
                    items: ["React", "Next.js", "Vue.js", "Tailwind CSS", "TypeScript", "Redux"]
                },
                {
                    category: "Backend",
                    items: ["Node.js", "Python", "Go", "Java", "Express", "Django"]
                },
                {
                    category: "Database",
                    items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "DynamoDB"]
                },
                {
                    category: "Cloud & DevOps",
                    items: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform", "CI/CD"]
                },
                {
                    category: "AI & ML",
                    items: ["Python", "TensorFlow", "PyTorch", "OpenCV", "LangChain", "OpenAI API"]
                }
            ]
        }
    ]
};
