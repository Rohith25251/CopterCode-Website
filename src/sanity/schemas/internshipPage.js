export const internshipPage = {
    name: 'internshipPage',
    title: 'Internship Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Internship Page',
            description: 'Internal title for this page'
        },
        // --- SEO ---
        {
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                { name: 'metaTitle', type: 'string', title: 'Meta Title', initialValue: 'Internship Programme' },
                { name: 'metaDescription', type: 'text', title: 'Meta Description', initialValue: 'CopterCode Internship Programme - Empowering Future Innovators.' }
            ]
        },
        // --- HERO ---
        {
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Title', initialValue: 'Internship Programme' },
                { name: 'subtitle', type: 'text', title: 'Subtitle', initialValue: 'Empowering the next generation of innovators with real-world exposure to emerging technologies.' }
            ]
        },
        // --- INTRODUCTION ---
        {
            name: 'introduction',
            title: 'Introduction Section',
            type: 'object',
            fields: [
                { name: 'text1', type: 'text', title: 'Intro Text 1', initialValue: 'At CopterCode, we believe in empowering the next generation of innovators. Our Internship Programme is designed to provide college students with real-world exposure to emerging technologies across multiple domains, including Drone Technology, Cybersecurity, Software Development, Artificial Intelligence (AI), Internet of Things (IoT), and Renewable Energy Systems.' },
                { name: 'text2', type: 'text', title: 'Intro Text 2', initialValue: 'Interns work closely with experienced mentors and industry professionals on live projects that shape the future of technology. Beyond technical learning, students gain hands-on industry experience, leadership skills, and the opportunity to contribute to meaningful innovations.' }
            ]
        },
        // --- PURPOSE ---
        {
            name: 'purpose',
            title: 'Purpose Section',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Section Title', initialValue: 'Purpose' },
                { name: 'text', type: 'text', title: 'Section Text', initialValue: 'The purpose of the CopterCode Internship Programme is to bridge the gap between academic learning and real-world industry application. We aim to:' },
                {
                    name: 'list',
                    title: 'Purpose List',
                    type: 'array',
                    of: [{ type: 'string' }],
                    initialValue: [
                        'Provide practical experience through real-world project execution',
                        'Encourage creative problem-solving and innovation',
                        'Build industry-ready engineers, designers, and technology professionals',
                        'Offer a collaborative platform to explore emerging technologies'
                    ]
                }
            ]
        },
        // --- ELIGIBILITY ---
        {
            name: 'eligibility',
            title: 'Eligibility Criteria',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Section Title', initialValue: 'Eligibility Criteria' },
                {
                    name: 'list',
                    title: 'Eligibility List',
                    type: 'array',
                    of: [{ type: 'string' }],
                    initialValue: [
                        'Must be a current-year student enrolled in an Engineering or Arts & Science college',
                        'Students from all technology-related branches (ECE, EEE, CSE, IT, Mech, Aero, etc.)',
                        'Strong interest in technology, research, and innovation',
                        'Ability to work collaboratively in a team environment',
                        'Willingness to learn new tools, skills, and technologies'
                    ]
                }
            ]
        },
        // --- DURATION & SLOTS ---
        {
            name: 'duration',
            title: 'Duration & Slots',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Section Title', initialValue: 'Internship Duration & Slots' },
                { name: 'text', type: 'text', title: 'Section Text', initialValue: 'CopterCode offers two internship batches every year. Each slot runs for 3 months with in-person and hybrid learning opportunities.' },
                {
                    name: 'slots',
                    title: 'Slots',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'title', type: 'string', title: 'Slot Title' },
                                { name: 'months', type: 'string', title: 'Months' }
                            ]
                        }
                    ],
                    initialValue: [
                        { title: 'Slot 1', months: 'May, June & July' },
                        { title: 'Slot 2', months: 'December, January & February' }
                    ]
                }
            ]
        },
        // --- APPLICATION PROCESS ---
        {
            name: 'process',
            title: 'Application Process',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Section Title', initialValue: 'Application Process' },
                {
                    name: 'steps',
                    title: 'Steps',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'stepNumber', type: 'string', title: 'Step Number' },
                                { name: 'title', type: 'string', title: 'Title' },
                                { name: 'description', type: 'text', title: 'Description' }
                            ]
                        }
                    ],
                    initialValue: [
                        { stepNumber: '01', title: 'Online Application', description: 'Submit your details and resume through the official CopterCode Internship Application Form.' },
                        { stepNumber: '02', title: 'Screening & Selection', description: 'Shortlisted candidates will be contacted for a brief interview or assessment.' },
                        { stepNumber: '03', title: 'Confirmation', description: 'Selected candidates receive an Offer Letter with instructions to begin.' }
                    ]
                }
            ]
        },
        // --- INTERNS ---
        {
            name: 'internsSection',
            title: 'Meet Our Interns Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Journey of Our Interns' },
                { name: 'subheading', type: 'string', title: 'Subheading', initialValue: 'Empowering the next generation of tech leaders.' },
                {
                    name: 'interns',
                    title: 'Interns',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'name', type: 'string', title: 'Name' },
                                { name: 'college', type: 'string', title: 'College' },
                                { name: 'role', type: 'string', title: 'Role' },
                                { name: 'image', type: 'image', title: 'Image' }
                            ]
                        }
                    ]
                }
            ]
        },
        // --- PARTNERS ---
        {
            name: 'partnersSection',
            title: 'Partners Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Companies They Work With' },
                {
                    name: 'logos',
                    title: 'Partner Logos',
                    type: 'array',
                    of: [{ type: 'image' }]
                }
            ]
        },
        // --- CTA ---
        {
            name: 'cta',
            title: 'CTA Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Join CopterCode' },
                { name: 'subheading', type: 'text', title: 'Subheading', initialValue: 'Where innovation meets opportunity. Apply now and start building the future with us.' },
                { name: 'buttonText', type: 'string', title: 'Button Text', initialValue: 'Apply for Internship' },
                { name: 'link', type: 'string', title: 'Link', initialValue: 'https://forms.gle/bPkBxkdAHwDDrFJm6' }
            ]
        }
    ]
};
