export const internshipRegistrationPage = {
    name: 'internshipRegistrationPage',
    title: 'Internship Registration Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Internship Registration Page',
            description: 'Internal title for this page'
        },
        // --- SEO ---
        {
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                { name: 'metaTitle', type: 'string', title: 'Meta Title', initialValue: 'Internship Registration | IIT Madras RP Venue - CopterCode' },
                { name: 'metaDescription', type: 'text', title: 'Meta Description', initialValue: 'Register for the CopterCode Winter Internship & Industry Orientation Program at IIT Madras Research Park. Work on international live projects from Netherlands & Texas (USA).' },
                { name: 'keywords', type: 'string', title: 'Keywords', initialValue: 'coptercode, internship registration, IIT Madras RP, winter internship, full stack developer, drone design, UAV intern, Chennai internship' }
            ]
        },
        // --- HERO ---
        {
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Title', initialValue: 'Launch Your Career with Real-World Experience' },
                { name: 'subtitle', type: 'string', title: 'Subtitle', initialValue: 'IIT Madras Research Park Venue' },
                {
                    name: 'backgroundImages',
                    title: 'Background Images (Carousel)',
                    type: 'array',
                    of: [{ type: 'image', options: { hotspot: true } }]
                }
            ]
        },
        // --- OVERVIEW / DESCRIPTION ---
        {
            name: 'overview',
            title: 'Program Overview Section',
            type: 'object',
            fields: [
                { name: 'tag', type: 'string', title: 'Tagline / Label', initialValue: 'CopterCode Orientation Program' },
                { name: 'title', type: 'string', title: 'Section Title', initialValue: 'IIT Madras RP Venue - CopterCode - Winter Internship & Industry Orientation Program' },
                { name: 'greeting', type: 'string', title: 'Greeting Message', initialValue: 'Warm Greetings from CopterCode.' },
                {
                    name: 'descriptionParagraphs',
                    title: 'Description Paragraphs',
                    type: 'array',
                    of: [{ type: 'text' }],
                    initialValue: [
                        'We are delighted to invite students from your esteemed institution to be part of the CopterCode Winter Internship & Industry Orientation Program, scheduled during June and July 2026, conducted offline at the prestigious IIT Madras Research Park, Chennai Venue.',
                        'It serves as a professional industry induction platform, where students will experience how global companies function, understand real job responsibilities, and work like industry interns inside a professional corporate environment.',
                        'Through this internship, students will be onboarded into real international engineering and technology environments, working on Live Projects for companies in the Netherlands and Texas (USA). They will gain hands-on exposure to corporate workflows, problem-solving practices, team collaboration methods, and global project execution standards, helping them transition confidently from campus to corporate with true industry readiness.'
                    ]
                },
                { name: 'supportNote', type: 'text', title: 'Support Circulation Note', initialValue: 'We kindly request your valuable support in circulating this opportunity among your students and encouraging deserving candidates to participate.' }
            ]
        },
        // --- OUTCOMES ---
        {
            name: 'outcomes',
            title: 'Internship Deliverables & Outcomes',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Section Title', initialValue: 'Internship Deliverables & Outcomes' },
                {
                    name: 'list',
                    title: 'Outcomes List',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'title', type: 'string', title: 'Outcome Title' },
                                { name: 'description', type: 'text', title: 'Outcome Description' }
                            ]
                        }
                    ],
                    initialValue: [
                        { title: 'Working On Live Project', description: 'Execute projects following international standard guidelines.' },
                        { title: 'Internship Certificate', description: 'Gain a certified Live Project completion credential.' },
                        { title: 'Experience Letter', description: 'Acquire professional Live Project experience credentials.' },
                        { title: 'Letter of Recommendation (LOR)', description: 'Earn a personalized evaluation based on project performance.' }
                    ]
                }
            ]
        },
        // --- CONTACT / SUPPORT ---
        {
            name: 'support',
            title: 'For More Details & Support',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Section Title', initialValue: 'For More Details & Support' },
                {
                    name: 'channels',
                    title: 'Contact Channels',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'label', type: 'string', title: 'Label' },
                                { name: 'value', type: 'string', title: 'Value' },
                                { name: 'href', type: 'string', title: 'Link / Action Href' },
                                {
                                    name: 'icon',
                                    type: 'string',
                                    title: 'Icon Selection',
                                    options: {
                                        list: [
                                            { title: 'Mail / Email', value: 'Mail' },
                                            { title: 'Phone / Call', value: 'Phone' },
                                            { title: 'LinkedIn', value: 'Linkedin' },
                                            { title: 'Instagram', value: 'Instagram' },
                                            { title: 'Globe / Website', value: 'Globe' },
                                            { title: 'YouTube', value: 'Youtube' },
                                            { title: 'Facebook', value: 'Facebook' },
                                            { title: 'Twitter / X', value: 'Twitter' },
                                            { title: 'Send / WhatsApp', value: 'Send' },
                                            { title: 'GitHub', value: 'Github' },
                                            { title: 'Award / Certificate', value: 'Award' },
                                            { title: 'Map Pin / Address', value: 'MapPin' }
                                        ]
                                    },
                                    initialValue: 'Globe'
                                }
                            ]
                        }
                    ],
                    initialValue: [
                        { label: 'Email Support', value: 'hr@coptercode.co.in', href: 'mailto:hr@coptercode.co.in', icon: 'Mail' },
                        { label: 'WhatsApp Inquiry', value: '+91 8072193600', href: 'https://wa.me/918072193600', icon: 'Phone' },
                        { label: 'Call Landline', value: '044 61329380', href: 'tel:04461329380', icon: 'Phone' },
                        { label: 'LinkedIn', value: 'CopterCode LinkedIn', href: 'https://www.linkedin.com/company/coptercode/', icon: 'Linkedin' },
                        { label: 'Instagram', value: 'CopterCode Instagram', href: 'https://www.instagram.com/coptercode?igsh=MW9oNWc2eGY3ejRmOQ%3D%3D', icon: 'Instagram' },
                        { label: 'Official Website', value: 'coptercode.co.in', href: 'https://coptercode.co.in', icon: 'Globe' }
                    ]
                }
            ]
        },
        // --- REGISTRATION FORM SECTION ---
        {
            name: 'registrationForm',
            title: 'Registration Form Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Form Heading', initialValue: 'Internship Registration Form' },
                // Labels & Placeholders
                {
                    name: 'fieldsConfig',
                    title: 'Form Field Labels & Placeholders',
                    type: 'object',
                    fields: [
                        { name: 'nameLabel', type: 'string', title: 'Name Input Label', initialValue: 'Student Name (Full Name)' },
                        { name: 'namePlaceholder', type: 'string', title: 'Name Placeholder', initialValue: 'Rohith Kumar' },
                        { name: 'whatsappLabel', type: 'string', title: 'WhatsApp Input Label', initialValue: 'WhatsApp Contact' },
                        { name: 'whatsappPlaceholder', type: 'string', title: 'WhatsApp Placeholder', initialValue: '8072193600' },
                        { name: 'emailLabel', type: 'string', title: 'Email Input Label', initialValue: 'Email Address' },
                        { name: 'emailPlaceholder', type: 'string', title: 'Email Placeholder', initialValue: 'student@college.edu' },
                        { name: 'collegeLabel', type: 'string', title: 'College Input Label', initialValue: 'College Name' },
                        { name: 'collegePlaceholder', type: 'string', title: 'College Placeholder', initialValue: 'IIT Madras' },
                        { name: 'dobLabel', type: 'string', title: 'DOB Input Label', initialValue: 'Date of Birth' },
                        { name: 'addressLabel', type: 'string', title: 'Address Input Label', initialValue: 'Address' },
                        { name: 'addressPlaceholder', type: 'string', title: 'Address Placeholder', initialValue: 'Please enter your full communication address' }
                    ]
                },
                // Electives
                {
                    name: 'electivesSection',
                    title: 'Electives Selection Config',
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Section Label', initialValue: 'Intern Preferable Elective' },
                        {
                            name: 'options',
                            title: 'Elective Options',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    fields: [
                                        { name: 'value', type: 'string', title: 'Value (Stored in Database)' },
                                        { name: 'title', type: 'string', title: 'Display Title' },
                                        { name: 'description', type: 'text', title: 'Short Description' },
                                        { name: 'venueBadge', type: 'string', title: 'Venue Badge Text', initialValue: 'Venue: IIT Madras RP' }
                                    ]
                                }
                            ],
                            initialValue: [
                                { 
                                    value: 'Full Stack Developer & Software Developer With AI ML Intern - Venue : IIT Madras Rp', 
                                    title: 'Full Stack Developer & Software Developer With AI/ML',
                                    description: 'Build modern web applications and AI models. Conducted offline at IIT Madras RP.',
                                    venueBadge: 'Venue: IIT Madras RP'
                                },
                                { 
                                    value: 'Drone Design and R&D Intern (UAVs) - Venue : IIT Madras Rp', 
                                    title: 'Drone Design and R&D Intern (UAVs)',
                                    description: 'Work on structural engineering, physics modeling, and UAV design. Conducted offline at IIT Madras RP.',
                                    venueBadge: 'Venue: IIT Madras RP'
                                }
                            ]
                        }
                    ]
                },
                // Batches
                {
                    name: 'batchesSection',
                    title: 'Batches Selection Config',
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Section Label', initialValue: 'Select Preferred Batch' },
                        { name: 'note', type: 'string', title: 'Batch Selection Subtitle Note', initialValue: 'Note: After The Semester Examination Batch Will Start' },
                        {
                            name: 'options',
                            title: 'Batch Options',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    fields: [
                                        { name: 'value', type: 'string', title: 'Value (Stored in Database)' },
                                        { name: 'label', type: 'string', title: 'Display Label' }
                                    ]
                                }
                            ],
                            initialValue: [
                                { value: 'April - May', label: 'April - May' },
                                { value: 'November - December', label: 'November - December' },
                                { value: 'January - February', label: 'January - February' },
                                { value: 'June - July', label: 'June - July' }
                            ]
                        }
                    ]
                },
                // Department & Year
                {
                    name: 'dropdownsSection',
                    title: 'Branch & Year Dropdown Labels & Options',
                    type: 'object',
                    fields: [
                        { name: 'branchLabel', type: 'string', title: 'Branch Label', initialValue: 'Branch / Department' },
                        { name: 'branchPlaceholder', type: 'string', title: 'Branch Placeholder option', initialValue: '-- Choose Branch --' },
                        { name: 'customBranchLabel', type: 'string', title: 'Custom Branch Input Label', initialValue: 'Specify Other Branch / Department' },
                        { name: 'customBranchPlaceholder', type: 'string', title: 'Custom Branch Input Placeholder', initialValue: 'Enter your department name' },
                        {
                            name: 'branchOptions',
                            title: 'Branch Options List',
                            type: 'array',
                            of: [{ type: 'string' }],
                            initialValue: [
                                "AERONAUTICAL AEROSPACE ENGINEERING",
                                "IT ENGINEERING",
                                "AUTOMOBILE ENGINEERING",
                                "CIVIL ENGINEERING",
                                "COMPUTER SCIENCE AND ENGINEERING",
                                "EEE",
                                "ECE",
                                "MECHANICAL ENGINEERING",
                                "COMPUTER COMMUNICATIONS",
                                "ARTIFICIAL INTELLIGENCE & DATA SCIENCE / ML",
                                "R & A",
                                "BCA",
                                "MCA",
                                "B.Com (ALL)",
                                "B.Sc",
                                "M.Sc",
                                "COMPUTER SCIENCE AND DESIGN",
                                "Other"
                            ]
                        },
                        { name: 'yearLabel', type: 'string', title: 'Year of Study Label', initialValue: 'Year of Study' },
                        { name: 'yearPlaceholder', type: 'string', title: 'Year Placeholder option', initialValue: '-- Choose Study --' },
                        {
                            name: 'yearOptions',
                            title: 'Year of Study Options List',
                            type: 'array',
                            of: [{ type: 'string' }],
                            initialValue: [
                                "1st Year",
                                "2nd Year",
                                "3rd Year",
                                "4th Year",
                                "5th Year - Intergrated Courses"
                            ]
                        }
                    ]
                },
                // Period
                {
                    name: 'periodSection',
                    title: 'Internship Duration Period Config',
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Section Label', initialValue: 'Internship & Project Period' },
                        {
                            name: 'options',
                            title: 'Period Options',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    fields: [
                                        { name: 'name', type: 'string', title: 'State Name Identifier (period1Month or period3Month)' },
                                        { name: 'label', type: 'string', title: 'Display Label' }
                                    ]
                                }
                            ],
                            initialValue: [
                                { name: 'period1Month', label: '1 Month - Offline & Hybrid' },
                                { name: 'period3Month', label: '3 Month - Offline & Hybrid' }
                            ]
                        }
                    ]
                },
                // Placement Support
                {
                    name: 'placementSection',
                    title: 'Placement Support Config',
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Section Label', initialValue: 'Interested in Placement Support?' },
                        { name: 'optionYesLabel', type: 'string', title: 'YES Option Label', initialValue: 'YES' },
                        { name: 'optionNoLabel', type: 'string', title: 'NO Option Label', initialValue: 'NO' }
                    ]
                },
                // Disclosures & Terms
                {
                    name: 'termsSection',
                    title: 'Mandatory Disclosures & Terms Config',
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Disclosures Heading Label', initialValue: 'Mandatory Disclosures & Terms' },
                        {
                            name: 'disclosuresList',
                            title: 'Disclosures list text',
                            type: 'array',
                            of: [{ type: 'text' }],
                            initialValue: [
                                'I understand and agree to pay INR ₹6,990 + 18% applicable taxes towards the CopterCode International Live Project Internship & Training, which includes credentials and participation in the program.',
                                'I acknowledge that the internship will be conducted in hybrid mode (online and offline) under CopterCode at the venue IIT Madras Research Park (RP).',
                                'I agree that the fee is non-refundable under any circumstances.',
                                'For the 3-Month Hybrid Internship: Based on performance, attendance, and project evaluation during the initial one-month internship phase, candidates may be considered for extension to the 3-month hybrid internship program.'
                            ]
                        },
                        { name: 'agreementText', type: 'string', title: 'Master Agreement Text', initialValue: 'I confirm that I have read and agree to all the above terms and conditions. (YES)' }
                    ]
                },
                // Button Actions
                {
                    name: 'submitActionText',
                    title: 'Submit Button Label',
                    type: 'string',
                    initialValue: 'Submit Registration'
                },
                {
                    name: 'submittingText',
                    title: 'Validating & Registering Label',
                    type: 'string',
                    initialValue: 'Validating & Registering...'
                },
                // Success Screen Configuration
                {
                    name: 'successSection',
                    title: 'Success Screen Config',
                    type: 'object',
                    fields: [
                        { name: 'title', type: 'string', title: 'Success Title', initialValue: 'Registration Completed!' },
                        { name: 'message', type: 'text', title: 'Success Message Template', initialValue: 'Thank you for submitting your internship application, {name}. Your registration has been successfully logged inside the CopterCode verification desk.' },
                        { name: 'summaryTitle', type: 'string', title: 'Summary Title', initialValue: 'Application Summary:' },
                        { name: 'whatsappLabel', type: 'string', title: 'WhatsApp Summary Label', initialValue: 'WhatsApp Number' },
                        { name: 'emailLabel', type: 'string', title: 'Email Summary Label', initialValue: 'Email Address' },
                        { name: 'branchLabel', type: 'string', title: 'Department/Branch Summary Label', initialValue: 'Department/Branch' },
                        { name: 'electiveLabel', type: 'string', title: 'Selected Elective Summary Label', initialValue: 'Selected Elective' },
                        { name: 'batchLabel', type: 'string', title: 'Preferred Batch Summary Label', initialValue: 'Preferred Batch' },
                        { name: 'note', type: 'text', title: 'Onboarding Instructions Note', initialValue: 'Our HR team will reach out to you shortly through WhatsApp or email with further instructions regarding the onboarding process.' },
                        { name: 'resetButtonText', type: 'string', title: 'Reset Button Text', initialValue: 'Submit Another Registration' }
                    ]
                }
            ]
        },
        // --- REGISTERED INTERNS (SIDE COLUMNS) ---
        {
            name: 'registeredInterns',
            title: 'Registered Interns (Side Columns)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', type: 'string', title: 'Intern Name' },
                        { name: 'image', type: 'image', title: 'Intern Photo', options: { hotspot: true } }
                    ]
                }
            ],
            description: 'List of registered interns to be displayed in the side columns. If there are more than 9, they will dynamically rotate/swap.'
        }
    ]
};
