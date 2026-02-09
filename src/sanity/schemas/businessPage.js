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
                { name: 'metaTitle', type: 'string', title: 'Meta Title' },
                { name: 'metaDescription', type: 'text', title: 'Meta Description' }
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
                                list: [
                                    { title: 'Plane (Drones)', value: 'Plane' },
                                    { title: 'Code (Digital)', value: 'Code' },
                                    { title: 'Sun (Energy)', value: 'Sun' },
                                    { title: 'Database (ERP)', value: 'Database' },
                                    { title: 'Coffee (Retail/Food)', value: 'Coffee' },
                                    { title: 'Shield (Security)', value: 'Shield' }
                                ]
                            },
                            initialValue: 'Plane'
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
