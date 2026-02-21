import { iconsList } from './icons';

export const businessPage = {
    name: 'businessPage',
    title: 'Business Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            description: 'Internal title for this page (e.g. "Business Page")',
        },
        // --- SEO ---
        {
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                { name: 'metaTitle', type: 'string', title: 'Meta Title', initialValue: 'Business | Solutions & Services' },
                { name: 'metaDescription', type: 'text', title: 'Meta Description', initialValue: "Explore CopterCode's business verticals: industrial drones, digital transformation, ERP systems, sustainable energy, and infrastructure security solutions." },
                { name: 'keywords', type: 'string', title: 'Keywords', initialValue: 'business solutions, industrial drones, digital transformation, ERP systems, enterprise software, sustainable energy' }
            ]
        },
        // --- HERO SECTION ---
        {
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            initialValue: 'Our Businesses'
        },
        {
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
            rows: 3,
            initialValue: 'A diversified portfolio driving innovation across immersive technology, sustainable energy, and enterprise solutions.'
        },
        // --- BUSINESS LIST ---
        {
            name: 'businesses',
            title: 'Business Sections',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Business Section',
                    fields: [
                        { name: 'title', type: 'string', title: 'Title' },
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
                            initialValue: 'briefcase'
                        },
                        { name: 'description', type: 'text', title: 'Description' },

                        // Video Support (URL or File)
                        {
                            name: 'videoType',
                            title: 'Video Source Type',
                            type: 'string',
                            options: { list: [{ title: 'External URL (YouTube/MP4)', value: 'url' }, { title: 'Upload File', value: 'file' }] },
                            initialValue: 'url'
                        },
                        { name: 'videoUrl', type: 'url', title: 'Video URL', hidden: ({ parent }) => parent?.videoType === 'file' },
                        { name: 'videoFile', type: 'file', title: 'Upload Video', hidden: ({ parent }) => parent?.videoType === 'url' },

                        {
                            name: 'services',
                            title: 'Core Services List',
                            type: 'array',
                            of: [{ type: 'string' }]
                        },
                        {
                            name: 'features',
                            title: 'Key Features List',
                            type: 'array',
                            of: [{ type: 'string' }]
                        },
                        {
                            name: 'link',
                            title: 'Link URL',
                            type: 'string',
                            initialValue: '#'
                        }
                    ]
                }
            ]
        }
    ]
};
