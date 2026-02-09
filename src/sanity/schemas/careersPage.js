export const careersPage = {
    name: 'careersPage',
    title: 'Careers Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Careers Page',
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
        // --- HERO ---
        {
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Title', initialValue: 'Careers' },
                { name: 'subtitle', type: 'string', title: 'Subtitle', initialValue: 'Join us to build the future together.' }
            ]
        },
        // --- BENEFITS ---
        {
            name: 'benefits',
            title: 'Benefits Section (Why Work With Us)',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Why Work With Us?' },
                { name: 'description', type: 'text', title: 'Description', rows: 3, initialValue: 'We believe our people are our most valuable asset. At CopterCode, employees work in a progressive, inclusive, and empowering environment.' },
                {
                    name: 'list',
                    title: 'Benefits List',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            title: 'Benefit',
                            fields: [
                                {
                                    name: 'icon',
                                    title: 'Icon',
                                    type: 'string',
                                    options: {
                                        list: [
                                            { title: 'Zap', value: 'zap' },
                                            { title: 'Award', value: 'award' },
                                            { title: 'Globe', value: 'globe' },
                                            { title: 'Heart', value: 'heart' },
                                            { title: 'Briefcase', value: 'briefcase' },
                                            { title: 'Shield', value: 'shield' },
                                            { title: 'Users', value: 'users' },
                                            { title: 'Target', value: 'target' },
                                            { title: 'Lightbulb', value: 'lightbulb' },
                                            { title: 'Star', value: 'star' }
                                        ]
                                    },
                                    initialValue: 'star'
                                },
                                { name: 'title', type: 'string', title: 'Title' },
                                { name: 'description', type: 'text', title: 'Description' }
                            ]
                        }
                    ]
                }
            ]
        },
        // --- TRUSTED BY ---
        {
            name: 'trusted',
            title: 'Trusted By Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Trusted by Leading Innovators' },
                {
                    name: 'logos',
                    title: 'Partner Logos',
                    type: 'array',
                    of: [{ type: 'image', options: { hotspot: true } }]
                }
            ]
        },
        // --- POSITIONS ---
        {
            name: 'positions',
            title: 'Open Positions',
            type: 'object',
            fields: [
                { name: 'label', type: 'string', title: 'Label', initialValue: 'Opportunities' },
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Open Roles' },
                { name: 'description', type: 'text', title: 'Description', initialValue: 'Find your next challenge.' },
                {
                    name: 'list',
                    title: 'Job List',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            title: 'Job Position',
                            fields: [
                                { name: 'title', type: 'string', title: 'Job Title' },
                                {
                                    name: 'badges',
                                    title: 'Badges (Type, Location, etc.)',
                                    type: 'array',
                                    of: [{ type: 'string' }],
                                    description: 'e.g. "Remote", "Full-Time", "Engineering"'
                                },
                                { name: 'applyLink', type: 'string', title: 'Apply Link (mailto: or http)', initialValue: 'mailto:hr@coptercode.co.in' }
                            ]
                        }
                    ]
                }
            ]
        },
        // --- CTA ---
        {
            name: 'cta',
            title: 'CTA Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Ready to make an impact?' },
                { name: 'description', type: 'text', title: 'Description', rows: 2, initialValue: 'Explore opportunities to work on cutting-edge drone technology, AI, and digital solutions.' },
                { name: 'buttonText', type: 'string', title: 'Button Text', initialValue: 'Send Your Resume' },
                { name: 'buttonLink', type: 'string', title: 'Button Link', initialValue: 'mailto:hr@coptercode.co.in' }
            ]
        }
    ]
};
