export const termsAndConditionsPage = {
    name: 'termsAndConditionsPage',
    title: 'Terms & Conditions Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Terms & Conditions Page',
            description: 'Internal title for this page'
        },
        // --- SEO ---
        {
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                { name: 'metaTitle', type: 'string', title: 'Meta Title', initialValue: 'Terms and Conditions' },
                { name: 'metaDescription', type: 'text', title: 'Meta Description', initialValue: 'Terms and Conditions for CopterCode.' }
            ]
        },
        // --- HERO ---
        {
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Title', initialValue: 'Terms & Conditions' },
                { name: 'subtitle', type: 'text', title: 'Subtitle', initialValue: 'Please read these terms carefully before using our services.' }
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
        // --- COMPANY INFO ---
        {
            name: 'companyInfo',
            title: 'Company Information Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Company Information' },
                { name: 'legalEntity', type: 'string', title: 'Legal Entity', initialValue: 'CopterCode Industries Limited' },
                { name: 'registeredAddress', type: 'text', title: 'Registered Address', initialValue: 'No: 22, 2nd Cross Street,\nKirupananda Variar Nagar,\nMangadu, Chennai - 600056' },
                { name: 'email', type: 'string', title: 'Email', initialValue: 'hr@coptercode.co.in' },
                { name: 'phone', type: 'string', title: 'Phone', initialValue: '+91 80721 93600' }
            ]
        },
        // --- SERVICES ---
        {
            name: 'services',
            title: 'Services Provided Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Services Provided' },
                { name: 'description', type: 'text', title: 'Description', initialValue: 'CopterCode offers a comprehensive range of technology and educational services. All services are subject to continuous improvement.' },
                {
                    name: 'servicesList',
                    title: 'Services List',
                    type: 'array',
                    of: [{ type: 'string' }],
                    initialValue: ['Industrial Drone Sales & Services', 'ERP Software Solutions', 'Cybersecurity & Ethical Hacking', 'Embedded Systems & IoT', 'Cloud Architecture', 'Student Internships']
                }
            ]
        },
        // --- RESPONSIBILITIES ---
        {
            name: 'responsibilities',
            title: 'User Responsibilities Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'User Responsibilities' },
                {
                    name: 'points',
                    title: 'Responsibility Points',
                    type: 'array',
                    of: [{ type: 'string' }],
                    initialValue: [
                        'Ensure all provided information is accurate and up-to-date.',
                        'Do not use our services for unlawful, fraudulent, or harmful purposes.',
                        'Protect the confidentiality of your credentials.'
                    ]
                }
            ]
        },
        // --- INTELLECTUAL PROPERTY ---
        {
            name: 'intellectualProperty',
            title: 'Intellectual Property Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Intellectual Property Rights' },
                { name: 'content', type: 'text', title: 'Content', initialValue: 'All content on this website—including text, logos, graphics, videos, and software—is the exclusive property of CopterCode or its licensors. Unauthorized reproduction, modification, or commercial exploitation is strictly prohibited without written permission.' }
            ]
        },
        // --- INTERNSHIP POLICY ---
        {
            name: 'internshipPolicy',
            title: 'Internship Policy Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Internship & Training Policy' },
                {
                    name: 'cards',
                    title: 'Policy Cards',
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
                        { title: 'Certification', content: 'Certificates are issued only upon successful completion. Attendance and project submission are mandatory.' },
                        { title: 'Slot Availability', content: 'Seats are subject to confirmation. CopterCode reserves the right to modify schedules or mentors.' }
                    ]
                }
            ]
        },
        // --- PAYMENTS ---
        {
            name: 'payments',
            title: 'Payment & Refunds Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Payments & Refunds' },
                { name: 'paymentTermsHeading', type: 'string', title: 'Payment Terms Heading', initialValue: 'Payment Terms' },
                { name: 'paymentTermsContent', type: 'text', title: 'Payment Terms Content', initialValue: 'Processed via authorized gateways (Razorpay, Paytm). By transacting, you authorize CopterCode to process payment using your provided details.' },
                { name: 'refundPolicyHeading', type: 'string', title: 'Refund Policy Heading', initialValue: 'Refund Policy' },
                {
                    name: 'refundPoints',
                    title: 'Refund Points',
                    type: 'array',
                    of: [{ type: 'string' }],
                    initialValue: [
                        'No refunds unless approved by management.',
                        'Requests must be raised within 24 hours of payment.',
                        'If CopterCode cancels a service, a full refund triggers within 7-10 business days.'
                    ]
                }
            ]
        },
        // --- LIABILITY ---
        {
            name: 'liability',
            title: 'Liability & Disclaimer Section',
            type: 'object',
            fields: [
                { name: 'liabilityHeading', type: 'string', title: 'Liability Heading', initialValue: 'Limitation of Liability' },
                { name: 'liabilityContent', type: 'text', title: 'Liability Content', initialValue: 'CopterCode is not liable for indirect, incidental, or consequential damages arising from service interruptions, data loss, or third-party links.' },
                { name: 'governingLawHeading', type: 'string', title: 'Governing Law Heading', initialValue: 'Governing Law' },
                { name: 'governingLawContent', type: 'text', title: 'Governing Law Content', initialValue: 'These terms are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of the courts of Chennai, Tamil Nadu.' }
            ]
        },
        // --- DATA PROTECTION ---
        {
            name: 'dataProtection',
            title: 'Data Protection Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Data Protection' },
                { name: 'description', type: 'text', title: 'Description', initialValue: 'We handle your data with care. Read our full policy to understand your rights regarding your personal information.' },
                { name: 'buttonText', type: 'string', title: 'Button Text', initialValue: 'View Privacy Policy' },
                { name: 'buttonLink', type: 'string', title: 'Button Link', initialValue: '/privacy' }
            ]
        }
    ]
};
