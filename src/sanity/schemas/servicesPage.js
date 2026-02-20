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
                            description: 'Icon from lucide-react (e.g., Globe, Layers, Cpu, Database, Cloud, Code2, ShieldCheck, Smartphone)'
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
