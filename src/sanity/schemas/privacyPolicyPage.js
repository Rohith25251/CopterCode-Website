export const privacyPolicyPage = {
    name: 'privacyPolicyPage',
    title: 'Privacy Policy Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Privacy Policy Page',
            description: 'Internal title for this page'
        },
        // --- SEO ---
        {
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                { name: 'metaTitle', type: 'string', title: 'Meta Title', initialValue: 'Privacy Policy' },
                { name: 'metaDescription', type: 'text', title: 'Meta Description', initialValue: 'Privacy Policy for CopterCode.' }
            ]
        },
        // --- HERO ---
        {
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Title', initialValue: 'Privacy Policy' },
                { name: 'subtitle', type: 'text', title: 'Subtitle', initialValue: 'We value your trust and are committed to protecting your personal data.' }
            ]
        },
        // --- DATES ---
        {
            name: 'dates',
            title: 'Policy Dates',
            type: 'object',
            fields: [
                { name: 'effectiveDate', type: 'string', title: 'Effective Date', initialValue: '07/11/2025' },
                { name: 'lastUpdated', type: 'string', title: 'Last Updated', initialValue: '07/11/2025' }
            ]
        },
        // --- DATA COLLECTION ---
        {
            name: 'dataCollection',
            title: 'Data Collection Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Information We Collect' },
                { name: 'description', type: 'text', title: 'Description', initialValue: 'We collect personal data necessary to provide our services and improve your experience. This includes:' },
                {
                    name: 'cards',
                    title: 'Data Cards',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'title', type: 'string', title: 'Card Title' },
                                { name: 'content', type: 'text', title: 'Card Content' }
                            ]
                        }
                    ],
                    initialValue: [
                        { title: 'Personal Identity', content: 'Full name, Email address, Phone number, College/School name.' },
                        { title: 'Transaction Data', content: 'Course details, Payment & billing info (processed securely).' },
                        { title: 'Technical Data', content: 'IP address, browser type, and device identifiers.' }
                    ]
                }
            ]
        },
        // --- USAGE ---
        {
            name: 'usage',
            title: 'How We Use It Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'How We Use Your Information' },
                {
                    name: 'points',
                    title: 'Usage Points',
                    type: 'array',
                    of: [{ type: 'string' }],
                    initialValue: [
                        "Processing registrations and facilitating payments",
                        "Issuing certificates and providing student support",
                        "Sending important updates, newsletters, and course materials",
                        "Optimizing website performance and user experience",
                        "Managing analytics to improve our service offerings"
                    ]
                }
            ]
        },
        // --- THIRD PARTY ---
        {
            name: 'thirdParty',
            title: 'Third-Party Services Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Third-Party Services' },
                { name: 'description', type: 'text', title: 'Description', initialValue: 'We partner with trusted third-party providers to deliver our services. We may share limited data with:' },
                {
                    name: 'services',
                    title: 'Services',
                    type: 'array',
                    of: [{ type: 'string' }],
                    initialValue: ['Google Analytics', 'Razorpay', 'Paytm', 'AWS', 'Google Cloud', 'Zoho Mail', 'Mailchimp']
                },
                { name: 'footerNote', type: 'string', title: 'Footer Note', initialValue: '*Each partner operates under their own privacy policy.' }
            ]
        },
        // --- SECURITY ---
        {
            name: 'security',
            title: 'Data Security Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Data Security & Retention' },
                {
                    name: 'stats',
                    title: 'Security Stats',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'label', type: 'string', title: 'Label' },
                                { name: 'description', type: 'string', title: 'Description' }
                            ]
                        }
                    ],
                    initialValue: [
                        { label: 'Encrypted', description: 'SSL/HTTPS Standard' },
                        { label: 'Protected', description: 'Secure Storage' },
                        { label: 'Limited', description: 'Retention Period' }
                    ]
                }
            ]
        },
        // --- RIGHTS ---
        {
            name: 'rights',
            title: 'Your Rights Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Your Rights' },
                { name: 'description', type: 'text', title: 'Description', initialValue: 'You have full control over your personal data. You have the right to:' },
                {
                    name: 'points',
                    title: 'Rights Points',
                    type: 'array',
                    of: [{ type: 'string' }],
                    initialValue: [
                        "Access, correct, or update your personal information.",
                        "Request deletion of your data from our systems.",
                        "Opt-out of marketing communications at any time."
                    ]
                },
                { name: 'contactNote', type: 'text', title: 'Contact Note', initialValue: 'To exercise these rights, please contact our Data Protection Officer at hr@coptercode.co.in' },
                { name: 'contactEmail', type: 'string', title: 'Contact Email', initialValue: 'hr@coptercode.co.in' }
            ]
        },
        // --- COOKIES ---
        {
            name: 'cookies',
            title: 'Cookies Policy Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Cookies Policy' },
                { name: 'content', type: 'text', title: 'Content', initialValue: 'We use cookies to improve performance, analyze usage patterns, and manage sessions. You can choose to disable cookies through your browser settings, though this may affect some website functionality.' }
            ]
        },
        // --- CONTACT ---
        {
            name: 'contact',
            title: 'Contact Us Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Contact Us' },
                { name: 'boxTitle', type: 'string', title: 'Box Title', initialValue: 'Privacy Concerns?' },
                { name: 'boxDescription', type: 'text', title: 'Box Description', initialValue: 'If you have any questions about this policy or our data practices, please reach out.' },
                { name: 'companyName', type: 'string', title: 'Company Name', initialValue: 'CopterCode Industries Limited' },
                { name: 'email', type: 'string', title: 'Email', initialValue: 'hr@coptercode.co.in' },
                { name: 'phone', type: 'string', title: 'Phone', initialValue: '+91 80721 93600' },
                { name: 'address', type: 'string', title: 'Address', initialValue: 'Chennai, Tamil Nadu – 600056' },
                { name: 'footerText', type: 'text', title: 'Footer Text', initialValue: 'This policy is governed by Indian law, including the IT Act, 2000 and the DPDP Act, 2023.' }
            ]
        }
    ]
};
