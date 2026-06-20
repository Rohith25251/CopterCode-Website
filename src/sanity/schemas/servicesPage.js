import { iconsList } from './icons';

export const servicesPage = {
    name: 'servicesPage',
    title: 'Services Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Services'
        },
        {
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                {
                    name: 'metaTitle',
                    title: 'Meta Title',
                    type: 'string'
                },
                {
                    name: 'metaDescription',
                    title: 'Meta Description',
                    type: 'text'
                },
                {
                    name: 'keywords',
                    title: 'Meta Keywords',
                    type: 'string',
                    initialValue: 'web development, full-stack development, AI automation, SaaS, cloud solutions, cybersecurity, API development, mobile apps'
                }
            ]
        },
        {
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                {
                    name: 'title',
                    title: 'Hero Title',
                    type: 'string',
                    initialValue: 'Our Services'
                },
                {
                    name: 'subtitle',
                    title: 'Hero Subtitle',
                    type: 'string',
                    initialValue: 'Comprehensive software solutions tailored to your business needs.'
                }
            ]
        },
        {
            name: 'services',
            title: 'Service Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'icon',
                            title: 'Icon Name',
                            type: 'string',
                            description: 'Icon from lucide-react',
                            options: {
                                list: iconsList.map(icon => ({
                                    title: icon.title,
                                    value: icon.value
                                }))
                            }
                        },
                        {
                            name: 'title',
                            title: 'Service Title',
                            type: 'string'
                        },
                        {
                            name: 'description',
                            title: 'Service Description',
                            type: 'text'
                        }
                    ]
                }
            ],
            initialValue: [
                {
                    icon: 'globe',
                    title: 'Web Development',
                    description: 'Responsive, accessible, and high-performance websites. We build digital experiences that represent your brand with precision.'
                },
                {
                    icon: 'layers',
                    title: 'Full Stack Development',
                    description: 'End-to-end application development using modern stacks (MERN, PERN, Python). We handle everything from the database to the UI.'
                },
                {
                    icon: 'cpu',
                    title: 'AI & Automation',
                    description: 'Leverage the power of Artificial Intelligence to automate workflows, analyze data, and build smart applications.'
                },
                {
                    icon: 'code',
                    title: 'SaaS Development',
                    description: 'We help startups and enterprises build scalable Software as a Service products with multi-tenancy and subscription billing.'
                },
                {
                    icon: 'database',
                    title: 'API Development',
                    description: 'Robust, secure, and documented REST and GraphQL APIs to power your mobile and web applications.'
                },
                {
                    icon: 'cloud',
                    title: 'Cloud Solutions',
                    description: 'Cloud-native architectures on AWS, Azure, or GCP. We ensure your infrastructure is scalable, secure, and cost-effective.'
                },
                {
                    icon: 'smartphone',
                    title: 'Mobile App Development',
                    description: 'Cross-platform mobile applications using React Native, delivering native performance with a single codebase.'
                },
                {
                    icon: 'shieldCheck',
                    title: 'Cybersecurity & DevOps',
                    description: 'Implementing DevSecOps pipelines and security best practices to protect your intellectual property and user data.'
                }
            ]
        },
        {
            name: 'createdAt',
            title: 'Created',
            type: 'datetime',
            hidden: true
        },
        {
            name: 'updatedAt',
            title: 'Updated',
            type: 'datetime',
            hidden: true
        }
    ],
    preview: {
        select: {
            title: 'title'
        }
    }
};
