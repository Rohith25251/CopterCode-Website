export const locationsPage = {
    name: 'locationsPage',
    title: 'Operating Locations Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Operating Locations Page',
            description: 'Internal title for this page'
        },
        // --- SEO ---
        {
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                { name: 'metaTitle', type: 'string', title: 'Meta Title', initialValue: 'Operating Locations' },
                { name: 'metaDescription', type: 'text', title: 'Meta Description', initialValue: "CopterCode's global footprint and operating locations." }
            ]
        },
        // --- HERO ---
        {
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Title', initialValue: 'Operating Locations' },
                { name: 'subtitle', type: 'text', title: 'Subtitle', initialValue: 'Connecting the world through innovative aerial technology.' }
            ]
        },
        // --- GLOBAL FOOTPRINT ---
        {
            name: 'footprint',
            title: 'Global Footprint Section',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Section Title', initialValue: 'Global Footprint' },
                { name: 'description', type: 'text', title: 'Section Description', initialValue: 'Strategic hubs positioned to deliver excellence, globally connected and locally focused.' }
            ]
        },
        // --- LOCATIONS ---
        {
            name: 'locations',
            title: 'Locations List',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'country', type: 'string', title: 'Country' },
                        { name: 'title', type: 'string', title: 'Office Title' },
                        { name: 'description', type: 'text', title: 'Description' },
                        { name: 'address', type: 'text', title: 'Address' },
                        { name: 'phone', type: 'string', title: 'Phone' },
                        { name: 'phoneDisplay', type: 'string', title: 'Phone Display' },
                        { name: 'email', type: 'string', title: 'Email' },
                        {
                            name: 'gradient',
                            type: 'string',
                            title: 'Gradient Classes',
                            description: 'Tailwind gradient classes (e.g., from-orange-500 to-amber-600)',
                            initialValue: 'from-orange-500 to-amber-600'
                        },
                        { name: 'timezone', type: 'string', title: 'Timezone', description: 'e.g., Asia/Kolkata or America/Detroit' },
                        { name: 'image', type: 'image', title: 'Location Image' },
                        { name: 'mapsLink', type: 'url', title: 'Google Maps Link' }
                    ]
                }
            ],
            initialValue: [
                {
                    country: "India",
                    title: "Headquarters",
                    description: "Our central command center driving global strategy, extensive R&D facilities, and core manufacturing operations.",
                    address: "CopterCode Technologies, Bangalore & Chennai, India",
                    phone: "+91 80721 93600",
                    phoneDisplay: "+91 8072 193 600",
                    email: "coptercode@gmail.com",
                    gradient: "from-orange-500 to-amber-600",
                    timezone: "Asia/Kolkata",
                    mapsLink: "https://www.google.com/maps/search/?api=1&query=CopterCode+Technologies+Chennai",
                },
                {
                    country: "USA",
                    title: "USA Office",
                    description: "Spearheading our North American partnerships, focusing on advanced AI software integration and client relations.",
                    address: "CopterCode Inc, San Francisco & Ann Arbor, MI, USA",
                    phone: "+17347639721",
                    phoneDisplay: "+1 (734) 763 9721",
                    email: "hr@coptercode.co.in",
                    gradient: "from-blue-600 to-indigo-600",
                    timezone: "America/Detroit",
                    mapsLink: "https://www.google.com/maps/search/?api=1&query=Ann+Arbor+Michigan",
                }
            ]
        }
    ]
};
