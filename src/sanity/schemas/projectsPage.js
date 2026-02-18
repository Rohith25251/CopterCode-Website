import { iconsList } from './icons';

export const projectsPage = {
    name: 'projectsPage',
    title: 'Projects Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Projects Page',
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
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            initialValue: 'Our Projects'
        },
        {
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
            rows: 3,
            initialValue: 'A showcase of our technical prowess and the results we deliver for our clients.'
        },
        // --- PROJECTS LIST ---
        {
            name: 'projects',
            title: 'Projects List',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Project',
                    fields: [
                        { name: 'title', type: 'string', title: 'Project Title' },
                        { name: 'category', type: 'string', title: 'Category' },
                        { name: 'description', type: 'text', title: 'Description' },
                        {
                            name: 'iconName',
                            title: 'Icon Type',
                            type: 'string',
                            options: {
                                list: iconsList.map(icon => ({
                                    title: icon.title,
                                    value: icon.value
                                }))
                            },
                            initialValue: 'cpu'
                        },
                        { name: 'link', type: 'url', title: 'Project Link (Optional)' }
                    ]
                }
            ]
        },
        // --- CLIENTS SECTION ---
        {
            name: 'clientsTitle',
            title: 'Clients Section Title',
            type: 'string',
            initialValue: 'Trusted by Industry Leaders'
        },
        {
            name: 'clientLogos',
            title: 'Client Logos',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }]
        }
    ]
};
