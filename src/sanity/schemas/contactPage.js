export const contactPage = {
    name: 'contactPage',
    title: 'Contact Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Contact Page',
            description: 'Internal title for this page'
        },
        // --- SEO ---
        {
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                { name: 'metaTitle', type: 'string', title: 'Meta Title', initialValue: 'Contact Us | CopterCode' },
                { name: 'metaDescription', type: 'text', title: 'Meta Description', initialValue: "Contact CopterCode for inquiries, partnerships, and support. We're here to help with drone technology, enterprise software, and industrial automation solutions." },
                { name: 'keywords', type: 'string', title: 'Keywords', initialValue: 'contact, inquiries, partnerships, drone technology support, enterprise software, support services' }
            ]
        },
        // --- HERO ---
        {
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Title', initialValue: 'Contact Us' },
                { name: 'subtitle', type: 'string', title: 'Subtitle', initialValue: "We'd love to hear from you. Let's start a conversation." }
            ]
        },
        // --- HEADQUARTERS (INDIA) ---
        {
            name: 'hq',
            title: 'Headquarters (India)',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Section Title', initialValue: 'Headquarters (India)' },
                { name: 'name', type: 'string', title: 'Company Name', initialValue: 'CopterCode Technologies' },
                { name: 'address', type: 'text', title: 'Address', initialValue: 'Bangalore & Chennai, India' },
                { name: 'phone1', type: 'string', title: 'Phone 1', initialValue: '+91 8072 193 600' },
                { name: 'phone2', type: 'string', title: 'Phone 2', initialValue: '+91 96554 51382' },
                { name: 'landline', type: 'string', title: 'Landline', initialValue: '044 6132 9380' },
                { name: 'email', type: 'string', title: 'Email', initialValue: 'coptercode@gmail.com' }
            ]
        },
        // --- USA OFFICE ---
        {
            name: 'usa',
            title: 'USA Office',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Section Title', initialValue: 'USA Office' },
                { name: 'name', type: 'string', title: 'Company Name', initialValue: 'CopterCode Inc' },
                { name: 'address', type: 'text', title: 'Address', initialValue: 'San Francisco & Ann Arbor, USA' },
                { name: 'phone', type: 'string', title: 'Phone', initialValue: '+1 (734) 763 9721' },
                { name: 'email', type: 'string', title: 'Email', initialValue: 'hr@coptercode.co.in' }
            ]
        },
        // --- HOURS ---
        {
            name: 'hours',
            title: 'Business Hours',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Section Title', initialValue: 'Business Hours' },
                { name: 'weekdaysLabel', type: 'string', title: 'Weekdays Label', initialValue: 'Monday – Friday' },
                { name: 'weekdaysTime', type: 'string', title: 'Weekdays Time', initialValue: '9:00 AM – 6:00 PM' },
                { name: 'weekendLabel', type: 'string', title: 'Weekend Label', initialValue: 'Saturday & Sunday' },
                { name: 'weekendStatus', type: 'string', title: 'Weekend Status', initialValue: 'Closed' }
            ]
        },
        // --- FORM ---
        {
            name: 'form',
            title: 'Contact Form',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Form Title', initialValue: 'Send us a Message' }
            ]
        }
    ]
};
