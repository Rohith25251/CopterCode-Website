export const hackathonPage = {
    name: 'hackathonPage',
    title: 'Hackathon Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Hackathon Page',
            description: 'Internal title for this page'
        },
        // --- SEO ---
        {
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                { name: 'metaTitle', type: 'string', title: 'Meta Title', initialValue: 'Hackathons | Innovation Challenges & Competitions' },
                { name: 'metaDescription', type: 'text', title: 'Meta Description', initialValue: 'Join CopterCode hackathons and innovation challenges. Compete in drone technology, AI/ML, blockchain, and autonomous systems with prize pools and industry mentorship.' },
                { name: 'keywords', type: 'string', title: 'Keywords', initialValue: 'hackathon, innovation challenge, coding competition, drone technology, AI/ML, blockchain, autonomous systems, tech competition' }
            ]
        },
        // --- HERO SLIDE CAROUSEL ---
        {
            name: 'heroSlides',
            title: 'Hero Slide Carousel',
            description: 'Slides for the main top hero carousel, each with its own background image, text, and CTA button.',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Hero Slide',
                    fields: [
                        { name: 'title', type: 'string', title: 'Title' },
                        { name: 'quote', type: 'text', title: 'Quote / Subtitle', rows: 2 },
                        { name: 'category', type: 'string', title: 'Category/Tag', initialValue: 'Hackathons' },
                        { name: 'image', type: 'image', title: 'Slide Image', options: { hotspot: true } },
                        { name: 'ctaLabel', type: 'string', title: 'CTA Button Label', initialValue: 'Register Now' },
                        { name: 'ctaLink', type: 'string', title: 'CTA Button Link', initialValue: '/contact' }
                    ]
                }
            ]
        },
        // --- HACKATHONS LIST ---
        {
            name: 'hackathonsList',
            title: 'Hackathons List',
            type: 'array',
            description: 'Add and manage hackathons. The first hackathon marked as "Featured" will be displayed prominently at the top.',
            of: [
                {
                    type: 'object',
                    title: 'Hackathon',
                    preview: {
                        select: {
                            title: 'title',
                            subtitle: 'status',
                            media: 'image',
                            featured: 'featured'
                        },
                        prepare({ title, subtitle, media, featured }) {
                            const statusLabels = {
                                'registration-open': '🟢 Registration Open',
                                'upcoming': '🔵 Upcoming',
                                'ongoing': '🟣 Ongoing',
                                'finished': '⚫ Finished',
                                'winners-announced': '🟡 Winners Announced'
                            };
                            return {
                                title: `${featured ? '⭐ ' : ''}${title || 'Untitled Hackathon'}`,
                                subtitle: statusLabels[subtitle] || subtitle || 'No status',
                                media
                            };
                        }
                    },
                    fields: [
                        // --- Basic Info ---
                        { name: 'title', type: 'string', title: 'Hackathon Title', validation: Rule => Rule.required() },
                        {
                            name: 'status',
                            type: 'string',
                            title: 'Status',
                            description: 'Current status of the hackathon — controls the badge color on the card',
                            options: {
                                list: [
                                    { title: 'Registration Open', value: 'registration-open' },
                                    { title: 'Upcoming', value: 'upcoming' },
                                    { title: 'Ongoing', value: 'ongoing' },
                                    { title: 'Finished', value: 'finished' },
                                    { title: 'Winners Announced', value: 'winners-announced' }
                                ]
                            },
                            initialValue: 'upcoming'
                        },
                        { name: 'featured', type: 'boolean', title: 'Featured Hackathon', initialValue: false, description: 'Mark as featured to display prominently at the top of the page' },
                        { name: 'image', type: 'image', title: 'Hackathon Image/Poster', options: { hotspot: true }, description: 'Primary image displayed on the hackathon card' },
                        {
                            name: 'secondImage',
                            type: 'image',
                            title: 'Secondary Image',
                            options: { hotspot: true },
                            description: 'Optional secondary image (e.g. for hover effects or gallery)'
                        },

                        // --- Date & Location ---
                        { name: 'date', type: 'string', title: 'Display Date', description: 'Formatted date shown on the card (e.g. "April 15-17, 2026")' },
                        { name: 'startDate', type: 'date', title: 'Start Date', description: 'Actual start date for sorting/filtering' },
                        { name: 'endDate', type: 'date', title: 'End Date', description: 'Actual end date for sorting/filtering' },
                        { name: 'location', type: 'string', title: 'Location', description: 'e.g. "Chennai, India" or "Online" or "Virtual"' },

                        // --- Category & Tags ---
                        { name: 'category', type: 'string', title: 'Primary Category', description: 'Shown as a badge (e.g. "Competition", "Engineering Challenge", "AI & Blockchain")' },
                        {
                            name: 'tags',
                            type: 'array',
                            title: 'Tags/Topics',
                            description: 'Topic tags displayed on the card (up to 3 shown, rest collapsed)',
                            of: [{ type: 'string' }],
                            options: {
                                layout: 'tags'
                            }
                        },

                        // --- Descriptions ---
                        { name: 'description', type: 'text', title: 'Short Description', description: 'Brief summary shown on the card (2-3 sentences)' },
                        {
                            name: 'fullDescription',
                            type: 'text',
                            title: 'Full Description',
                            description: 'Detailed description (used for featured hackathon or detail pages)'
                        },

                        // --- Detailed Info (for future detail pages) ---
                        {
                            name: 'goals',
                            type: 'array',
                            title: 'Goals',
                            of: [{ type: 'string' }],
                            description: 'List of main goals for the hackathon'
                        },
                        {
                            name: 'deliverables',
                            type: 'array',
                            title: 'Expected Deliverables',
                            of: [{ type: 'string' }],
                            description: 'What participants need to deliver'
                        },
                        {
                            name: 'judgingCriteria',
                            type: 'array',
                            title: 'Judging Criteria',
                            of: [{ type: 'string' }],
                            description: 'How projects will be judged'
                        },
                        {
                            name: 'rules',
                            type: 'array',
                            title: 'Hackathon Rules',
                            of: [{ type: 'string' }],
                            description: 'Important rules and guidelines'
                        },

                        // --- Prizes ---
                        {
                            name: 'prizePool',
                            type: 'object',
                            title: 'Prize Information',
                            description: 'Prize details displayed on the card (if provided)',
                            fields: [
                                { name: 'totalPool', type: 'string', title: 'Total Prize Pool', description: 'e.g. "$15,000 USDG"' },
                                { name: 'firstPlace', type: 'string', title: '1st Place Prize' },
                                { name: 'honorableMention', type: 'string', title: 'Honorable Mention Prize' },
                                { name: 'careerOpportunity', type: 'string', title: 'Career Opportunity Description' }
                            ]
                        },

                        // --- Stats & Links ---
                        { name: 'participantCount', type: 'number', title: 'Participant Count', description: 'Number of participants (for completed hackathons)' },
                        { name: 'registerLink', type: 'string', title: 'Register Link', initialValue: '/contact', description: 'URL or internal path for registration (e.g. "/contact" or "https://...")' }
                    ]
                }
            ]
        }
    ]
};
