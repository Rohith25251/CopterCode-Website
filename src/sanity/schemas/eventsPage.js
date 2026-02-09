export const eventsPage = {
    name: 'eventsPage',
    title: 'Events Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Events Page',
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
                { name: 'title', type: 'string', title: 'Title', initialValue: 'Events' },
                { name: 'subtitle', type: 'text', title: 'Subtitle', initialValue: 'Connect with us at our upcoming global summits, workshops, and exclusive meets.' }
            ]
        },
        // --- EVENTS LIST ---
        {
            name: 'eventsList',
            title: 'Events List',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Event',
                    fields: [
                        { name: 'title', type: 'string', title: 'Event Title' },
                        { name: 'date', type: 'string', title: 'Date (e.g. February 28, 2026)' },
                        { name: 'location', type: 'string', title: 'Location' },
                        { name: 'category', type: 'string', title: 'Category (e.g. Exhibition)' },
                        { name: 'description', type: 'text', title: 'Description' },
                        { name: 'image', type: 'image', title: 'Event Image', options: { hotspot: true } },
                        { name: 'registerLink', type: 'string', title: 'Register Link (URL or Path)', initialValue: '/contact' }
                    ]
                }
            ]
        }
    ]
};
