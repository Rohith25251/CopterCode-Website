export const getInTouchPage = {
    name: 'getInTouchPage',
    title: 'Get In Touch Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Get In Touch Page',
            description: 'Internal title for this page'
        },
        // --- SEO ---
        {
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                { name: 'metaTitle', type: 'string', title: 'Meta Title', initialValue: 'Get In Touch' },
                { name: 'metaDescription', type: 'text', title: 'Meta Description', initialValue: 'Connect with CopterCode instantly via WhatsApp or Email.' }
            ]
        },
        // --- HERO ---
        {
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Title', initialValue: 'Get In Touch' },
                { name: 'subtitle', type: 'string', title: 'Subtitle', initialValue: 'We are just a click away. Connect with us instantly.' }
            ]
        },
        // --- WHATSAPP ---
        {
            name: 'whatsapp',
            title: 'WhatsApp Section',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Title', initialValue: 'WhatsApp' },
                { name: 'text', type: 'text', title: 'Text', initialValue: 'Chat with our team instantly for quick queries and support.' },
                { name: 'link', type: 'string', title: 'WhatsApp Link', initialValue: 'https://wa.me/918072193600' }
            ]
        },
        // --- EMAIL ---
        {
            name: 'email',
            title: 'Email Section',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Title', initialValue: 'Email Us' },
                { name: 'text', type: 'text', title: 'Text', initialValue: "Send us a detailed message and we'll get back to you shortly." },
                { name: 'link', type: 'string', title: 'Email link', initialValue: 'mailto:coptercode@gmail.com' }
            ]
        },
        // --- FOOTER ---
        {
            name: 'footerText',
            title: 'Footer Text',
            type: 'string',
            initialValue: 'Prefer a detailed inquiry? Fill out our contact form.'
        }
    ]
};
