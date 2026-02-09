
// Helper for safely encoding URL paths with special chars like & and spaces
// Now simpler since files are renamed, but keeping encode for safe measure if needed for other external URLs
const encode = (path) => path.replace(/ /g, "%20").replace(/&/g, "%26");

export const MOCK_DATA = {
    homePage: {
        pageTitle: "Home Page",
        seo: {
            metaTitle: "CopterCode | Autonomous Drone Solutions",
            metaDescription: "Leading the future of autonomous aerial logistics and surveillance.",
            ogImage: null
        },
        sectionVisibilityControls: {
            showHero: true,
            showBusinesses: true,
            showShowcase: true,
            showAnnouncements: true,
            showTechnology: true,
            showTestimonials: true,
            showPartners: true,
            showFootprint: true,
            showSustainability: true
        },
        sectionOrder: [
            'heroSection',
            'businessCategories', // Our Businesses
            'serviceShowcase',    // CopterCode in Action
            'announcements',
            'technologyHighlights',
            'successVoices',
            'globalPartners',
            'footprintSection',
            'sustainabilityContent'
        ],
        heroSection: {
            isActive: true,
            tagline: "Engineering The Unknown",
            title: "Future Ready Systems.",
            subtitle: "We don't just build software. We engineer intelligent ecosystems where Drone Tech meets Enterprise AI.",
            primaryCTA: { text: "View Our Work", link: "/projects" },
            secondaryCTA: { text: "Start a Project", link: "/contact" },
            heroImages: [
                encode("/mediafiles/news and media/IMG_3330.jpg"),
                encode("/mediafiles/news and media/IMG_1699.jpg"),
                encode("/mediafiles/news and media/IMG_3322.jpg"),
                encode("/mediafiles/news and media/IMG_3979.jpg"),
                encode("/mediafiles/news and media/IMG_3570.jpg")
            ]
        },
        businessCategories: [
            {
                title: "Industrial Drones & UAV",
                shortDescription: "We design and deploy advanced unmanned aerial vehicle solutions tailored for agriculture, surveillance, mapping, and industrial inspections.",
                slug: "drones",
                videoBackground: "/mediafiles/videos/industrial-drones-uav.mp4",
                CTA: { text: "read more", link: "/business" },
                isHighlighted: true
            },
            {
                title: "Digital Services",
                shortDescription: "Accelerate your digital transformation with our comprehensive suite of services, from cloud architecture to custom software development.",
                slug: "digital",
                videoBackground: "/mediafiles/videos/digital-services.mp4",
                CTA: { text: "read more", link: "/business" }
            },
            {
                title: "New Energy & Materials",
                shortDescription: "Pioneering sustainable power solutions and advanced materials to drive the next generation of eco-friendly technology.",
                slug: "energy",
                videoBackground: "/mediafiles/videos/new-energy-materials.mp4",
                CTA: { text: "read more", link: "/business" }
            },
            {
                title: "ERP Software Solutions",
                shortDescription: "Streamline your enterprise operations with our robust, scalable, and intelligent ERP systems designed for modern businesses.",
                slug: "erp",
                videoBackground: "/mediafiles/videos/erp-software-solutions.mp4",
                CTA: { text: "read more", link: "/business" }
            },
            {
                title: "Retail & Food Collaborations",
                shortDescription: "Revolutionizing supply chains and customer experiences in the retail and food sectors through automation and smart logistics.",
                slug: "retail",
                videoBackground: "/mediafiles/videos/retail-food-collaborations.mp4",
                CTA: { text: "read more", link: "/business" }
            },
            {
                title: "Infrastructure Security",
                shortDescription: "Protecting critical infrastructure with state-of-the-art surveillance, AI-driven threat detection, and secure communication networks.",
                slug: "security",
                videoBackground: "/mediafiles/videos/infra-security.mp4",
                CTA: { text: "read more", link: "/business" }
            }
        ],
        // CopterCode in Action - Matches the Businesses list now
        serviceShowcase: [
            {
                serviceTitle: "Industrial Drones & UAV",
                serviceCategory: "Core Technology",
                serviceLink: "/services/drones",
                hoverVideo: "/mediafiles/videos/industrial-drones-uav.mp4",
                previewImage: null,
                isFeatured: true
            },
            {
                serviceTitle: "Digital Services",
                serviceCategory: "Software Solutions",
                serviceLink: "/services/digital",
                hoverVideo: "/mediafiles/videos/digital-services.mp4",
                previewImage: null,
                isFeatured: true
            },
            {
                serviceTitle: "New Energy & Materials",
                serviceCategory: "Sustainable Tech",
                serviceLink: "/services/energy",
                hoverVideo: "/mediafiles/videos/new-energy-materials.mp4",
                previewImage: null,
                isFeatured: true
            },
            {
                serviceTitle: "ERP Software Solutions",
                serviceCategory: "Enterprise Systems",
                serviceLink: "/services/erp",
                hoverVideo: "/mediafiles/videos/erp-software-solutions.mp4",
                previewImage: null,
                isFeatured: true
            },
            {
                serviceTitle: "Retail & Food Collaborations",
                serviceCategory: "Commerce Tech",
                serviceLink: "/services/retail",
                hoverVideo: "/mediafiles/videos/retail-food-collaborations.mp4",
                previewImage: null,
                isFeatured: true
            },
            {
                serviceTitle: "Infrastructure Security",
                serviceCategory: "Security",
                serviceLink: "/services/security",
                hoverVideo: "/mediafiles/videos/infra-security.mp4",
                previewImage: null,
                isFeatured: true
            }
        ],
        announcements: [
            {
                title: "CopterCode Deploys Autonomous Fleet for Agricultural Monitoring",
                summary: "Our latest drone swarm technology is helping farmers across the region optimize crop yields through precision agriculture.",
                publishDate: "2025-10-15T12:00:00Z",
                announcementImages: [encode("/mediafiles/news and media/IMG_3570.jpg")],
                CTALink: "/news/agri-tech",
                isFeatured: true
            },
            {
                title: "Strategic Partnership with National Logistics Corp",
                summary: "We are proud to announce a major collaboration to revolutionize last-mile delivery using our proprietary heavy-lift UAVs.",
                publishDate: "2025-09-10T10:00:00Z",
                announcementImages: [encode("/mediafiles/news and media/IMG_3330.jpg")],
                CTALink: "/news/logistics-partner",
                isFeatured: false
            },
            {
                title: "Next-Gen 'HawkEye' Surveillance System Unveiled",
                summary: "Setting a new standard in security, our AI-powered HawkEye system offers real-time threat detection and autonomous patrolling.",
                publishDate: "2025-08-05T09:00:00Z",
                announcementImages: [encode("/mediafiles/news and media/IMG_3979.jpg")],
                CTALink: "/news/hawkeye-launch",
                isFeatured: false
            }
        ],
        technologyHighlights: {
            isActive: true,
            sectionLabel: "Advanced Technology",
            title: "Revolutionizing Logistics & Surveillance with AI-Powered Autonomous Drone Systems",
            description: "Leveraging cutting-edge AI and robotics to redefine aerial operations.",
            performanceStats: [
                { label: "Missions Completed Successfully", value: "500+" }
            ],
            backgroundMedia: "https://www.pexels.com/download/video/35033957/"
        },
        successVoices: [
            {
                clientName: "Transforming Agriculture",
                companyName: "AgroTech Solutions",
                clientDesignation: "Strategic Partner",
                testimonialText: "Revolutionizing crop monitoring with precision drone technology.",
                videoTestimonial: "https://www.youtube.com/watch?v=sL9hIwhoIzs",
                clientImage: null
            },
            {
                clientName: "Empowering Logistics",
                companyName: "Global Freight",
                clientDesignation: "Logistics Head",
                testimonialText: "Automated aerial delivery systems have reduced our transit times by 40%.",
                videoTestimonial: "https://www.youtube.com/watch?v=VOFC_DNWuE8",
                clientImage: null
            },
            {
                clientName: "Future of Surveillance",
                companyName: "SecureCity Initiatives",
                clientDesignation: "Director",
                testimonialText: "AI-driven surveillance drones provide unmatched security coverage.",
                videoTestimonial: "https://www.youtube.com/watch?v=_SR4QEwEGOU",
                clientImage: null
            },
            {
                clientName: "Smart City Solutions",
                companyName: "Urban Planning Dept",
                clientDesignation: "Lead Architect",
                testimonialText: "Integrating drone data for smarter urban infrastructure planning.",
                videoTestimonial: "https://www.youtube.com/watch?v=01LJCJJA4HA",
                clientImage: null
            },
            {
                clientName: "Next-Gen Robotics",
                companyName: "RoboCorp",
                clientDesignation: "CTO",
                testimonialText: "Pushing the boundaries of autonomous flight capabilities.",
                videoTestimonial: "https://www.youtube.com/watch?v=yocM9dfk7Qo",
                clientImage: null
            },
            {
                clientName: "AI in Production",
                companyName: "Industrial Manufacturing",
                clientDesignation: "Plant Manager",
                testimonialText: "Streamlining production lines with aerial inspection and monitoring.",
                videoTestimonial: "https://www.youtube.com/watch?v=sb-F_VOUXiQ",
                clientImage: null
            },
            {
                clientName: "Sustainable Tech",
                companyName: "GreenEnergy Co",
                clientDesignation: "Sustainability Officer",
                testimonialText: "Reducing carbon footprint through efficient electric drone operations.",
                videoTestimonial: "https://www.youtube.com/watch?v=HiNVgwZ0jS0",
                clientImage: null
            },
            {
                clientName: "Machine Learning Ops",
                companyName: "DataTech Systems",
                clientDesignation: "AI Lead",
                testimonialText: "Advanced ML algorithms powering the next generation of autonomy.",
                videoTestimonial: "https://www.youtube.com/watch?v=BUr0TvQ2iGM",
                clientImage: null
            },
            {
                clientName: "Cloud Architecture",
                companyName: "SkyCloud Infra",
                clientDesignation: "Solutions Architect",
                testimonialText: "Seamless cloud integration for real-time drone fleet management.",
                videoTestimonial: "https://www.youtube.com/watch?v=z2xubbbmArY",
                clientImage: null
            },
            {
                clientName: "Cyber Security",
                companyName: "NetDefense",
                clientDesignation: "CISO",
                testimonialText: "Ensuring secure and encrypted communications for critical drone missions.",
                videoTestimonial: "https://www.youtube.com/watch?v=e1imF7AmE4A",
                clientImage: null
            }
        ],
        globalPartners: [
            { companyName: "InfoSys", companyLogo: "/mediafiles/logos/logo_1-CKk92lM3.png" },
            { companyName: "Wipro", companyLogo: "/mediafiles/logos/logo_2-Db0E8Mh8.png" },
            { companyName: "TCS", companyLogo: "/mediafiles/logos/logo_3-B1S6d1vX.png" },
            { companyName: "HCL", companyLogo: "/mediafiles/logos/logo_4-C-D8kLz9.png" },
            { companyName: "TechMahindra", companyLogo: "/mediafiles/logos/logo_5-D_82jKm4.png" },
            { companyName: "Oracle", companyLogo: "/mediafiles/logos/logo_6-DTXf5yJ2.png" },
            { companyName: "Microsoft", companyLogo: "/mediafiles/logos/logo_7-B7i9lKz1.png" },
            { companyName: "Google", companyLogo: "/mediafiles/logos/logo_8-C5j8kLz3.png" }
        ],
        footprintSection: {
            isActive: true,
            title: "Global Footprint of Our Talent",
            footprintImage: encode("/mediafiles/Where Do Our Interns Reached/placements-reach.png")
        },
        sustainabilityContent: [
            {
                tabTitle: "Sustainability",
                sectionTitle: "Sustainability & Responsibility",
                description: "At CopterCode, sustainability is embedded in every stage of how we design, deploy, and scale technology across industries.",
                metrics: [
                    { metricValue: "2035", metricLabel: "Net-Zero Vision" },
                    { metricValue: "30%", metricLabel: "Energy Efficiency" },
                    { metricValue: "100%", metricLabel: "Digital-First Ops" }
                ],
                supportingIcon: "Leaf"
            },
            {
                tabTitle: "Innovation",
                sectionTitle: "Technology & Innovation",
                description: "Innovation is at the core of CopterCode’s technology-driven approach. From advanced drone platforms and intelligent automation to AI-powered analytics.",
                metrics: [
                    { metricValue: "6+", metricLabel: "Tech Verticals" },
                    { metricValue: "50+", metricLabel: "Initiatives" },
                    { metricValue: "2019", metricLabel: "Innovating Since" }
                ],
                supportingIcon: "Lightbulb"
            },
            {
                tabTitle: "Our Impact",
                sectionTitle: "Impact in Numbers",
                description: "CopterCode delivers measurable impact by enabling smarter, safer, and more efficient operations across multiple industries.",
                metrics: [
                    { metricValue: "6+", metricLabel: "Verticals" },
                    { metricValue: "500+", metricLabel: "Projects" },
                    { metricValue: "Global", metricLabel: "Presence" }
                ],
                supportingIcon: "TrendingUp"
            }
        ]
    }
};
