export const footer = {
    name: 'footer',
    title: 'Footer',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            initialValue: 'Footer Configuration',
            description: 'Internal title for this document'
        },
        // --- SUBSCRIPTION ---
        {
            name: 'subscriptionTitle',
            title: 'Subscription Section Title',
            type: 'string',
            initialValue: 'Stay Updated with CopterCode'
        },
        // --- SOCIAL LINKS ---
        {
            name: 'socialLinks',
            title: 'Social Media Links',
            type: 'object',
            fields: [
                { name: 'linkedin', type: 'url', title: 'LinkedIn URL' },
                { name: 'instagram', type: 'url', title: 'Instagram URL' },
                { name: 'youtube', type: 'url', title: 'YouTube URL' },
                { name: 'twitter', type: 'url', title: 'Twitter/X URL' }
            ]
        },
        // --- COLUMN 1 (About) ---
        {
            name: 'column1',
            title: 'Column 1 (e.g. About CopterCode)',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Column Title' },
                {
                    name: 'links',
                    title: 'Links',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'label', type: 'string', title: 'Label' },
                                { name: 'url', type: 'string', title: 'URL' }
                            ]
                        }
                    ]
                }
            ]
        },
        // --- COLUMN 2 (Businesses) ---
        {
            name: 'column2',
            title: 'Column 2 (e.g. Businesses)',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Column Title' },
                {
                    name: 'links',
                    title: 'Links',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'label', type: 'string', title: 'Label' },
                                { name: 'url', type: 'string', title: 'URL' }
                            ]
                        }
                    ]
                }
            ]
        },
        // --- COLUMN 3 (Company) ---
        {
            name: 'column3',
            title: 'Column 3 (e.g. Company)',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Column Title' },
                {
                    name: 'links',
                    title: 'Links',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'label', type: 'string', title: 'Label' },
                                { name: 'url', type: 'string', title: 'URL' }
                            ]
                        }
                    ]
                }
            ]
        },
        // --- CONTACT ---
        {
            name: 'contact',
            title: 'Contact Information',
            type: 'object',
            fields: [
                {
                    name: 'india',
                    title: 'Headquarters (India)',
                    type: 'object',
                    fields: [
                        { name: 'title', type: 'string', title: 'Section Title', initialValue: 'Headquarters (India)' },
                        { name: 'companyName', type: 'string', title: 'Company Name' },
                        { name: 'address', type: 'text', title: 'Address', rows: 2 },
                        { name: 'phones', type: 'array', title: 'Phone Numbers', of: [{ type: 'string' }] },
                        { name: 'email', type: 'string', title: 'Email Address' }
                    ]
                },
                {
                    name: 'usa',
                    title: 'USA Office',
                    type: 'object',
                    fields: [
                        { name: 'title', type: 'string', title: 'Section Title', initialValue: 'USA Office' },
                        { name: 'companyName', type: 'string', title: 'Company Name' },
                        { name: 'address', type: 'text', title: 'Address', rows: 2 },
                        { name: 'phones', type: 'array', title: 'Phone Numbers', of: [{ type: 'string' }] },
                        { name: 'email', type: 'string', title: 'Email Address' }
                    ]
                }
            ]
        },
        // --- COPYRIGHT ---
        {
            name: 'copyrightText',
            title: 'Copyright Text',
            type: 'string',
            description: 'Use {year} to automatically insert current year.'
        }
    ]
};
