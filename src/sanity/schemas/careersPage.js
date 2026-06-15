import { iconsList } from './icons';

export const careersPage = {
    name: 'careersPage',
    title: 'Careers Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Careers Page',
            description: 'Internal title for this page'
        },
        // --- SEO ---
        {
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                { name: 'metaTitle', type: 'string', title: 'Meta Title', initialValue: 'Careers | Drone Tech & AI Engineering' },
                { name: 'metaDescription', type: 'text', title: 'Meta Description', initialValue: "Join CopterCode's innovative team. Explore careers in drone technology, AI/ML engineering, software development, and industrial automation with growth opportunities." },
                { name: 'keywords', type: 'string', title: 'Keywords', initialValue: 'drone technology jobs, AI engineer, software engineering careers, industrial automation, machine learning, CopterCode careers, tech jobs' }
            ]
        },
        // --- HERO SLIDE CAROUSEL ---
        {
            name: 'heroSlides',
            title: 'Hero Slide Carousel',
            description: 'Slides for the main top hero carousel.',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Hero Slide',
                    fields: [
                        { name: 'title', type: 'string', title: 'Title' },
                        { name: 'quote', type: 'text', title: 'Quote', rows: 2 },
                        { name: 'category', type: 'string', title: 'Category/Tag', initialValue: 'Featured Story' },
                        { name: 'image', type: 'image', title: 'Slide Image', options: { hotspot: true } },
                        { name: 'linkText', type: 'string', title: 'Button Text', initialValue: 'Explore Roles' },
                        { name: 'link', type: 'string', title: 'Button Link', initialValue: '#all-roles' }
                    ]
                }
            ]
        },
        // --- BENEFITS ---
        {
            name: 'benefits',
            title: 'Benefits Section (Why Work With Us)',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Why Work With Us?' },
                { name: 'description', type: 'text', title: 'Description', rows: 3, initialValue: 'We believe our people are our most valuable asset. At CopterCode, employees work in a progressive, inclusive, and empowering environment.' },
                {
                    name: 'list',
                    title: 'Benefits List',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            title: 'Benefit',
                            fields: [
                                {
                                    name: 'icon',
                                    title: 'Icon',
                                    type: 'string',
                                    options: {
                                        list: iconsList.map(icon => ({
                                            title: icon.title,
                                            value: icon.value
                                        }))
                                    },
                                    initialValue: 'star'
                                },
                                { name: 'title', type: 'string', title: 'Title' },
                                { name: 'description', type: 'text', title: 'Description' }
                            ]
                        }
                    ]
                }
            ]
        },
        // --- TRUSTED BY ---
        {
            name: 'trusted',
            title: 'Trusted By Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Trusted by Leading Innovators' },
                {
                    name: 'logos',
                    title: 'Partner Logos',
                    type: 'array',
                    of: [{ type: 'image', options: { hotspot: true } }]
                }
            ]
        },
        // --- INTERNS SECTION ---
        {
            name: 'internsSection',
            title: 'Interns & Freshers Section',
            type: 'object',
            fields: [
                { name: 'tag', type: 'string', title: 'Section Tag/Badge', initialValue: 'For Interns & Freshers' },
                {
                    name: 'list',
                    title: 'Featured Interns List',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            title: 'Featured Intern',
                            fields: [
                                { name: 'name', type: 'string', title: 'Intern Name' },
                                { name: 'role', type: 'string', title: 'Role/Elective' },
                                { name: 'college', type: 'string', title: 'College/University' },
                                { name: 'image', type: 'image', title: 'Profile Image', options: { hotspot: true } }
                            ]
                        }
                    ]
                }
            ]
        },
        // --- OPENINGS SECTION ---
        {
            name: 'openingsSection',
            title: 'Openings Overview Section (At CopterCode Header)',
            type: 'object',
            fields: [
                { name: 'tag', type: 'string', title: 'Section Tag/Badge', initialValue: 'Working With Us' },
                { name: 'heading', type: 'string', title: 'Section Heading', initialValue: 'Openings at CopterCode' },
                { name: 'description', type: 'text', title: 'Section Description', rows: 3, initialValue: 'We design and build next-generation drone technologies, autonomous flight systems, and digital ecosystems. We are always looking for passionate engineers, designers, and innovators to join our team. Even if you don\'t see a matching position below, feel free to send us your resume.' },
                {
                    name: 'featuredRoles',
                    title: 'Featured Roles (Top Left Card)',
                    description: 'Specify roles to be shown in the dark card next to the Interns panel. If empty, the page will fall back to using the first 2 roles from the main open roles list.',
                    type: 'array',
                    of: [
                        { type: 'reference', to: [{ type: 'jobOpenRole' }] },
                        {
                            type: 'object',
                            title: 'Featured Job Role',
                            fields: [
                                { name: 'title', type: 'string', title: 'Job Title' },
                                { name: 'company', type: 'string', title: 'Company Name', initialValue: 'CopterCode' },
                                { name: 'location', type: 'string', title: 'Location', initialValue: 'Remote/Hybrid' },
                                {
                                    name: 'badges',
                                    title: 'Badges (Type, Location, etc.)',
                                    type: 'array',
                                    of: [{ type: 'string' }],
                                    description: 'e.g. "Remote", "Full-Time", "Engineering"'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        // --- POSITIONS ---
        {
            name: 'positions',
            title: 'Open Positions',
            type: 'object',
            fields: [
                { name: 'label', type: 'string', title: 'Label', initialValue: 'Opportunities' },
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Open Roles' },
                { name: 'description', type: 'text', title: 'Description', initialValue: 'Find your next challenge.' },
                { name: 'hiringNote', type: 'text', title: 'Hiring Note / Sub-text', rows: 2, initialValue: 'We are hiring talented engineers, designers, and specialists across multiple locations and remote positions. Check out our company culture to see if you would be a great fit.' },
                { name: 'aboutTitle', type: 'string', title: 'About Positions Card Title', initialValue: 'About Our Positions' },
                { name: 'aboutText', type: 'text', title: 'About Positions Card Content', rows: 3, initialValue: 'We offer competitive salaries, flexible work arrangements, professional development opportunities, and a collaborative environment where innovation thrives. Learn more about our technology stack and technical focus areas.' },
                {
                    name: 'list',
                    title: 'Job List',
                    type: 'array',
                    of: [
                        { type: 'reference', to: [{ type: 'jobOpenRole' }] },
                        {
                            type: 'object',
                            title: 'Job Position',
                            fields: [
                                { name: 'title', type: 'string', title: 'Job Title' },
                                { name: 'company', type: 'string', title: 'Company Name', initialValue: 'CopterCode' },
                                { name: 'location', type: 'string', title: 'Location', initialValue: 'Remote/Hybrid' },
                                { name: 'postedDate', type: 'string', title: 'Posted Date', initialValue: 'Recent' },
                                { name: 'description', type: 'text', title: 'Job Description', rows: 3 },
                                {
                                    name: 'badges',
                                    title: 'Badges (Type, Location, etc.)',
                                    type: 'array',
                                    of: [{ type: 'string' }],
                                    description: 'e.g. "Remote", "Full-Time", "Engineering"'
                                },
                                { name: 'applyLink', type: 'string', title: 'Apply Link (mailto: or http)', initialValue: 'mailto:hr@coptercode.co.in' }
                            ]
                        }
                    ]
                }
            ]
        },
        // --- COMMUNITY STORIES ---
        {
            name: 'communityStories',
            title: 'Community Stories Section (Life & Culture)',
            type: 'object',
            fields: [
                { name: 'tag', type: 'string', title: 'Section Tag/Badge', initialValue: 'Our Community' },
                { name: 'heading', type: 'string', title: 'Section Heading', initialValue: 'Life and Culture at CopterCode' },
                {
                    name: 'stories',
                    title: 'Stories List',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            title: 'Community Story Card',
                            fields: [
                                { name: 'title', type: 'string', title: 'Story Title' },
                                { name: 'company', type: 'string', title: 'Company/Division', initialValue: 'CopterCode' },
                                { name: 'category', type: 'string', title: 'Category/Tag', initialValue: 'Tech & Culture' },
                                { name: 'description', type: 'text', title: 'Story Description', rows: 3 },
                                { name: 'image', type: 'image', title: 'Story Image', options: { hotspot: true } },
                                { name: 'link', type: 'string', title: 'Link (mailto: or page link)', initialValue: 'mailto:hr@coptercode.co.in' }
                            ]
                        }
                    ]
                }
            ]
        },
        // --- CTA ---
        {
            name: 'cta',
            title: 'CTA Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Ready to Join Our Team?' },
                { name: 'description', type: 'text', title: 'Description', rows: 2, initialValue: 'Explore opportunities to work on cutting-edge drone technology, AI, and digital solutions.' },
                {
                    name: 'images',
                    title: 'CTA Carousel Images',
                    description: 'Upload custom images here for the CTA section carousel. If empty, the page will fall back to using community story images.',
                    type: 'array',
                    of: [{ type: 'image', options: { hotspot: true } }]
                },
                { name: 'buttonText', type: 'string', title: 'Primary Button Text', initialValue: 'Send Your Resume' },
                { name: 'buttonLink', type: 'string', title: 'Primary Button Link', initialValue: 'mailto:hr@coptercode.co.in' },
                { name: 'secondaryButtonText', type: 'string', title: 'Secondary Button Text', initialValue: 'Explore Internships' },
                { name: 'secondaryButtonLink', type: 'string', title: 'Secondary Button Link', initialValue: '/internship' },
                { name: 'footerNote', type: 'text', title: 'Footer Helper Note', rows: 2, initialValue: 'Cannot find the right role? Contact our HR team to discuss potential opportunities in drone technology, AI, industrial automation, and enterprise software.' }
            ]
        }
    ]
};
