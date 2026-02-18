import { iconsList } from './icons';

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
                            name: 'icon',
                            type: 'string',
                            title: 'Icon (Lucide)',
                            options: {
                                list: iconsList.map(icon => ({
                                    title: icon.title,
                                    value: icon.value
                                }))
                            }
                        },
                        { name: 'description', type: 'text', title: 'Description' },
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
                    category: "Frontend Experience",
                    icon: "globe",
                    description: "Crafting responsive, high-performance user interfaces.",
                    items: ["React", "Next.js", "Vue.js", "Tailwind CSS", "TypeScript", "Redux", "Framer Motion", "Three.js"]
                },
                {
                    category: "Backend Architecture",
                    icon: "server",
                    description: "Building robust, scalable server-side solutions.",
                    items: ["Node.js", "Python", "Go", "Java", "Express", "Django", "FastAPI", "GraphQL"]
                },
                {
                    category: "Database Solutions",
                    icon: "database",
                    description: "Secure and efficient data management systems.",
                    items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "DynamoDB", "Firebase", "Supabase"]
                },
                {
                    category: "Cloud & DevOps",
                    icon: "cloud",
                    description: "Automated deployment and scalable infrastructure.",
                    items: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform", "CI/CD", "Vercel"]
                },
                {
                    category: "AI & Machine Learning",
                    icon: "cpu",
                    description: "Intelligent algorithms driving automation and insights.",
                    items: ["Python", "TensorFlow", "PyTorch", "OpenCV", "LangChain", "OpenAI API", "Hugging Face", "Keras"]
                },
                {
                    category: "Mobile & Embedded",
                    icon: "smartphone",
                    description: "Cross-platform apps and hardware integration.",
                    items: ["React Native", "Flutter", "Arduino", "Raspberry Pi", "ROS", "PX4"]
                }
            ]
        }
    ]
};
