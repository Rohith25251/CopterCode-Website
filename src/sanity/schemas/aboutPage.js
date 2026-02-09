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
                { name: 'subtitle', type: 'text', title: 'Hero Subtitle', initialValue: 'Revolutionizing industries with drones, technology, and sustainable innovation.' }
            ]
        },
        // --- ORIGIN SECTION ---
        {
            name: 'origin',
            title: 'Origin Section',
            type: 'object',
            fields: [
                { name: 'label', type: 'string', title: 'Label', initialValue: 'Our Origin' },
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'From Vision to Reality' },
                { name: 'description', type: 'text', title: 'Description', rows: 4, initialValue: 'A journey of relentless innovation, guided by a legacy of excellence and a commitment to transforming the future.' },
                { name: 'quote', type: 'text', title: 'Quote', rows: 2, initialValue: 'Driven by sustainability, impacting People, Planet, and Prosperity.' }
            ]
        },
        // --- STORY SECTION ---
        {
            name: 'story',
            title: 'Our Story',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Story Block',
                    fields: [
                        { name: 'year', type: 'string', title: 'Year / Title' },
                        { name: 'heading', type: 'string', title: 'Heading' },
                        { name: 'description', type: 'text', title: 'Description' },
                        {
                            name: 'icon',
                            title: 'Icon',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Lightbulb', value: 'lightbulb' },
                                    { title: 'Shield', value: 'shield' },
                                    { title: 'Globe', value: 'globe' },
                                    { title: 'Target', value: 'target' },
                                    { title: 'Users', value: 'users' },
                                    { title: 'Briefcase', value: 'briefcase' },
                                    { title: 'Zap', value: 'zap' },
                                    { title: 'Award', value: 'award' }
                                ]
                            },
                            initialValue: 'lightbulb'
                        }
                    ]
                }
            ]
        },
        // --- LEADERSHIP SECTION ---
        {
            name: 'leadership',
            title: 'Leadership & Vision',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Section Heading', initialValue: 'Administration & Vision' },
                { name: 'chairmanName', type: 'string', title: 'Chairman Name', initialValue: 'Mr. Karthikeyan Sundharesan' },
                { name: 'chairmanRole', type: 'string', title: 'Chairman Role', initialValue: 'Chairman & Managing Director' },
                {
                    name: 'boardMembers',
                    title: 'Board Members',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            title: 'Board Member',
                            fields: [
                                { name: 'name', type: 'string', title: 'Name' },
                                { name: 'role', type: 'string', title: 'Role' }
                            ]
                        }
                    ]
                }
            ]
        },
        // --- MILESTONES SECTION ---
        {
            name: 'milestones',
            title: 'Milestones',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Milestone',
                    fields: [
                        { name: 'year', type: 'string', title: 'Year' },
                        { name: 'title', type: 'string', title: 'Title' },
                        { name: 'description', type: 'text', title: 'Description' }
                    ]
                }
            ]
        }
    ]
};
