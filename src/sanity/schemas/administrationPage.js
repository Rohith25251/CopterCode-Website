export const administrationPage = {
    name: 'administrationPage',
    title: 'Administration Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Administration Page',
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
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            initialValue: 'Administration'
        },
        {
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
            rows: 2,
            initialValue: 'Guided by vision, integrity, and a commitment to excellence.'
        },

        // --- GOVERNANCE CARDS (New) ---
        {
            name: 'governanceCards',
            title: 'Governance Cards',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Card',
                    fields: [
                        { name: 'title', type: 'string', title: 'Title' },
                        { name: 'subtitle', type: 'string', title: 'Subtitle (Green Text)' },
                        { name: 'description', type: 'text', title: 'Description' },
                        {
                            name: 'icon',
                            type: 'string',
                            title: 'Icon',
                            options: {
                                list: [
                                    { title: 'Users (Leadership)', value: 'users' },
                                    { title: 'Building (Board)', value: 'building' },
                                    { title: 'Target (Advisory)', value: 'target' },
                                    { title: 'Badge (Management)', value: 'badge' }
                                ]
                            }
                        }
                    ]
                }
            ]
        },

        // --- PHILOSOPHY SECTION (New) ---
        {
            name: 'philosophy',
            title: 'Leadership Philosophy',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Our Leadership Philosophy' },
                { name: 'description', type: 'text', title: 'Description', rows: 4 }
            ]
        },

        // --- CMD SECTION (Existing) ---
        {
            name: 'cmdHeading',
            title: 'CMD Section Heading',
            type: 'string',
            initialValue: 'Executive Leadership'
        },
        {
            name: 'cmdName',
            title: 'CMD Name',
            type: 'string',
            initialValue: 'Mr. Karthikeyan Sundharesan'
        },
        {
            name: 'cmdRole',
            title: 'CMD Role',
            type: 'string',
            initialValue: 'Chairman & Managing Director'
        },
        {
            name: 'cmdDescription',
            title: 'CMD Description',
            type: 'text',
            rows: 4,
            initialValue: 'Leading CopterCode with a focus on sustainable growth and diversified innovation. Mr. Karthikeyan continues the legacy of our founder by steering the organization towards new heights in technology, manufacturing, and services.'
        },
        {
            name: 'cmdImage',
            title: 'CMD Image',
            type: 'image',
            options: { hotspot: true }
        },
        // --- BOARD MEMBERS (Existing) ---
        {
            name: 'boardHeading',
            title: 'Board Section Heading',
            type: 'string',
            initialValue: 'Board of Directors'
        },
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
                        { name: 'role', type: 'string', title: 'Role' },
                        { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }
                    ]
                }
            ]
        },
        // --- QUOTE ---
        {
            name: 'quote',
            title: 'Closing Quote',
            type: 'text',
            rows: 2,
            initialValue: '"The organization continues to pursue self-reliant, sustainable growth while honoring the legacy of its founder."'
        }
    ]
};
