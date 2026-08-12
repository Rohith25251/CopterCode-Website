export const navigation = {
    name: 'navigation',
    title: 'Navigation Menu',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Menu Title',
            type: 'string',
            initialValue: 'Main Navigation',
            description: 'Internal title for this menu configuration'
        },
        {
            name: 'companyName',
            title: 'Company Name',
            type: 'string',
            initialValue: 'CopterCode'
        },
        {
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: { hotspot: true }
        },
        {
            name: 'logoVideo',
            title: 'Logo Video (Optional)',
            type: 'file',
            options: {
                accept: 'video/*'
            },
            description: 'Optional video for the logo. If uploaded, this will play in the header instead of the static logo image.'
        },
        // --- TOP MENU ---
        {
            name: 'topMenuItems',
            title: 'Top Menu Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Menu Item',
                    fields: [
                        { name: 'name', type: 'string', title: 'Display Name' },
                        { name: 'path', type: 'string', title: 'URL Path', description: 'e.g. /about, /hackathon' }
                    ]
                }
            ]
        },
        // --- SIDE MENU ---
        {
            name: 'sideMenuItems',
            title: 'Side Menu Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Menu Item',
                    fields: [
                        { name: 'name', type: 'string', title: 'Display Name' },
                        { name: 'path', type: 'string', title: 'URL Path', description: 'e.g. /about, /hackathon' }
                    ]
                }
            ]
        },
        // --- BUTTONS ---
        {
            name: 'ctaButton',
            title: 'Primary Button (e.g. Get in Touch)',
            type: 'object',
            fields: [
                { name: 'label', type: 'string', title: 'Label' },
                { name: 'link', type: 'string', title: 'Link' }
            ]
        },
        {
            name: 'tertiaryButton',
            title: 'Tertiary Button (e.g. Articles)',
            type: 'object',
            fields: [
                { name: 'label', type: 'string', title: 'Label' },
                { name: 'link', type: 'string', title: 'Link' }
            ]
        },
        {
            name: 'secondaryButton',
            title: 'Secondary Button (e.g. Internship)',
            type: 'object',
            fields: [
                { name: 'label', type: 'string', title: 'Label' },
                { name: 'link', type: 'string', title: 'Link' }
            ]
        }
    ]
};
