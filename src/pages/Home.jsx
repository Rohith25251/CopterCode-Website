import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import Hero from '../components/Hero';
import ImpactTabs from '../components/ImpactTabs';
import { ArrowRight, ChevronLeft, ChevronRight, Calendar, MapPin, Clock, Users, Zap, Globe, Heart, GraduationCap, Briefcase, Leaf, Shield, Code, Sun, Star, BarChart, FileText, PieChart, CheckCircle, Cpu, Server, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';
import LazyVideo from '../components/LazyVideo';
import { ASSETS } from '../constants/assets';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { client, urlFor } from '../lib/sanity';
import ScrollingAnnouncementBar from '../components/ScrollingAnnouncementBar';
import { iconComponentMap } from '../sanity/schemas/icons';

/* --- FALLBACK DATA --- */
const getVideoId = (url) => {
    if (!url) return '';
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
};

const businessData = [
    {
        id: 'drones',
        title: "Industrial Drones & UAV",
        description: "We design and deploy advanced unmanned aerial vehicle solutions tailored for agriculture, surveillance, mapping, and industrial inspections.",
        video: ASSETS.VIDEOS.DRONES,
        link: "/business"
    },
    {
        id: 'digital',
        title: "Digital Services",
        description: "Accelerate your digital transformation with our comprehensive suite of services, from cloud architecture to custom software development.",
        video: ASSETS.VIDEOS.DIGITAL,
        link: "/business"
    },
    {
        id: 'energy',
        title: "New Energy & Materials",
        description: "Pioneering sustainable power solutions and advanced materials to drive the next generation of eco-friendly technology.",
        video: ASSETS.VIDEOS.ENERGY,
        link: "/business"
    },
    {
        id: 'erp',
        title: "ERP Software Solutions",
        description: "Streamline your enterprise operations with our robust, scalable, and intelligent ERP systems designed for modern businesses.",
        video: ASSETS.VIDEOS.ERP,
        link: "/business"
    },
    {
        id: 'retail',
        title: "Retail & Food Collaborations",
        description: "Revolutionizing supply chains and customer experiences in the retail and food sectors through automation and smart logistics.",
        video: ASSETS.VIDEOS.RETAIL,
        link: "/business"
    },
    {
        id: 'security',
        title: "Infra Security",
        description: "Protecting critical infrastructure with state-of-the-art surveillance, AI-driven threat detection, and secure communication networks.",
        video: ASSETS.VIDEOS.SECURITY,
        link: "/business"
    },
];

const FALLBACK_ANNOUNCEMENTS = [
    {
        title: "CopterCode Launches AI-Powered Drone Platform for Industrial Inspection",
        date: "15 AUG, 2025",
        type: "COPTERCODE UPDATE",
        img: "/mediafiles/news and media/IMG_3570.jpg"
    },
    {
        title: "Strategic Enterprise Partnership for Digital Transformation",
        date: "03 AUG, 2025",
        type: "COPTERCODE UPDATE",
        img: "/mediafiles/news and media/IMG_3327.jpg"
    },
    {
        title: "500+ Project Deliveries Milestone Across Global Markets",
        date: "12 JUL, 2025",
        type: "COPTERCODE UPDATE",
        img: "/mediafiles/news and media/IMG_3330.jpg"
    }
];

const FALLBACK_TESTIMONIALS = [
    { file: "sL9hIwhoIzs", title: "Transforming Agriculture" },
    { file: "VOFC_DNWuE8", title: "Empowering Logistics" },
    { file: "_SR4QEwEGOU", title: "Future of Surveillance" },
    { file: "01LJCJJA4HA", title: "Smart City Solutions" },
    { file: "yocM9dfk7Qo", title: "Next-Gen Robotics" },
    { file: "sb-F_VOUXiQ", title: "AI in Production" },
    { file: "HiNVgwZ0jS0", title: "Sustainable Tech" },
    { file: "BUr0TvQ2iGM", title: "Machine Learning Ops" },
    { file: "z2xubbbmArY", title: "Cloud Architecture" },
    { file: "e1imF7AmE4A", title: "Cyber Security" }
];

const FALLBACK_CINEMATIC = [
    { url: "/mediafiles/videos/industrial-drones-uav.mp4", label: "Industrial Drones & UAV" },
    { url: "/mediafiles/videos/digital-services.mp4", label: "Digital Services" },
    { url: "/mediafiles/videos/new-energy-materials.mp4", label: "New Energy & Materials" },
    { url: "/mediafiles/videos/erp-software-solutions.mp4", label: "ERP Software Solutions" },
    { url: "/mediafiles/videos/retail-food-collaborations.mp4", label: "Retail & Food Collaborations" },
    { url: "/mediafiles/videos/infra-security.mp4", label: "Infra Security" },
];

const PREVIEW_EVENTS = [
    {
        title: "Global Autonomous Systems Expo 2026",
        date: "Feb 28, 2026",
        location: "Singapore",
        category: "Exhibition",
        image: "/mediafiles/news and media/IMG_3570.jpg"
    },
    {
        title: "Code the Skies: National Hackathon",
        date: "Apr 15-17, 2026",
        location: "Chennai",
        category: "Hackathon",
        image: "/mediafiles/news and media/IMG_3365.jpg"
    },
    {
        title: "Aerospace Defense Summit",
        date: "May 12, 2026",
        location: "New Delhi",
        category: "Conference",
        image: "/mediafiles/news and media/IMG_3356.jpg"
    }
];

const PREVIEW_BENEFITS = [
    {
        icon: Zap,
        title: "Culture of Learning",
        description: "Continuous innovation and learning opportunities."
    },
    {
        icon: Globe,
        title: "Global Exposure",
        description: "Work on international projects across India and USA."
    },
    {
        icon: Heart,
        title: "Inclusive Workplace",
        description: "Diverse and inclusive environment for all."
    }
];

const SUSTAINABILITY_IMPACT = [
    { icon: Users, text: "Empowering people with inclusiveness" },
    { icon: Globe, text: "Collaborating globally for innovation" },
    { icon: Leaf, text: "Promoting sustainability & clean energy" },
    { icon: Code, text: "Building digital assets for the future" }
];

const INTERNSHIP_STATS = [
    { label: "Partner Colleges", value: "40+" },
    { label: "Students Trained", value: "500+" },
    { label: "Live Projects", value: "25+" }
];

const FALLBACK_SCROLLING_BAR = {
    isEnabled: true,
    announcements: [
        { text: "🚁 ENGINEERING THE FUTURE OF DRONE TECHNOLOGY", isHighlight: true, link: "/industrial-drones" },
        { text: "💼 NOW HIRING: SENIOR AI ENGINEERS", link: "/careers", isHighlight: false },
        { text: "🏭 EXPLORE OUR NEW INDUSTRIAL SOLUTIONS", link: "/business", isHighlight: false },
        { text: "📢 LATEST ACHIEVEMENTS, PARTNERSHIPS & INNOVATIONS", isHighlight: true, link: "/events" },
        { text: "🎓 JOIN OUR INTERNSHIP PROGRAM 2026", link: "/internship", isHighlight: false },
        { text: "🤝 GET IN TOUCH FOR CUSTOM ENTERPRISE SOLUTIONS", link: "/get-in-touch", isHighlight: false }
    ],
    scrollSpeed: 60,
    direction: 'left',
    backgroundColor: '#050505',
    textColor: '#ffffff'
};

const Home = () => {
    useScrollToTop(); // Force scroll to top on mount

    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [currentInternshipSlide, setCurrentInternshipSlide] = useState(0);
    const [activeBusiness, setActiveBusiness] = useState(0);
    const [homeData, setHomeData] = useState(null);
    const [voiceOfSuccessVisible, setVoiceOfSuccessVisible] = useState(false);
    const actionScrollRef = useRef(null);
    const businessContentRef = useRef(null); // Ref for business details
    const voiceOfSuccessRef = useRef(null); // Ref for Voice of Success section
    const youtubePlayerRef = useRef(null); // Ref for YouTube player instance

    // Mobile Business Click Handler
    const handleBusinessClick = (index) => {
        setActiveBusiness(index);
        if (window.innerWidth < 1024 && businessContentRef.current) {
            // Slight offset for sticky nav
            const navHeight = 80;
            const elementPosition = businessContentRef.current.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    // Fetch Sanity Data

    useEffect(() => {
        // Expand videoFile references and Image assets to get the actual URL
        const query = `*[_type == "homePage"][0]{
            ...,
            seo {
                ...,
                "metaImage": metaImage.asset->url
            },
            heroSection {
                ...,
                "heroImages": heroImages[].asset->url
            },
            aboutSummarySection {
                ...,
                "image": image.asset->url
            },
            investorSummarySection {
                ...,
                investors[]{
                    ...,
                    "logo": logo.asset->url
                }
            },
            businessesSection[]{
                ...,
                videoFile {
                    ...,
                    "url": asset->url
                },
                "videoFileUrl": videoFile.asset->url
            },
            cinematicShowcase[]{
                ...,
                videoFile {
                    ...,
                    "url": asset->url
                },
                "videoFileUrl": videoFile.asset->url
            },
            advancedTechSection{
                ...,
                videoFile {
                    ...,
                    "url": asset->url
                },
                "videoFileUrl": videoFile.asset->url
            },
            testimonialsSection[]{
                ...,
                videoFile {
                    ...,
                    "url": asset->url
                },
                "videoFileUrl": videoFile.asset->url
            },
            upcomingEventsSection {
                ...,
                events[]{
                    ...,
                    "image": image.asset->url
                }
            },
            careersSection {
                ...,
                benefits[]{
                    ...
                }
            },
            internshipSection {
                ...,
                "image": image.asset->url,
                "images": images[].asset->url
            },
            sustainabilitySection {
                ...,
                "bannerImage": bannerImage.asset->url
            },
            ourPhilosophySection {
                ...,
                tabs[]{
                    ...
                }
            },
            scrollingAnnouncementBar {
                ...,
                announcements[]{
                    ...
                }
            },
            engineeringCommandCenterSection {
                ...,
                focusAreas[]{
                    ...
                },
                coreCapabilities[]{
                    ...
                }
            },
            whyChooseSection {
                ...,
                features[]{
                    ...
                },
                caseStudies[]{
                    ...,
                    stats[]{
                        ...
                    }
                }
            }
        }`;

        client.fetch(query)
            .then((data) => {
                if (data) setHomeData(data);
            })
            .catch(console.error);
    }, []);

    // Intersection Observer for Voice of Success Section - Auto play videos when scrolling to section
    useEffect(() => {
        const element = voiceOfSuccessRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVoiceOfSuccessVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    // Trigger video play when Voice of Success section becomes visible
    useEffect(() => {
        if (voiceOfSuccessVisible) {
            // Handle YouTube videos
            if (youtubePlayerRef.current && typeof youtubePlayerRef.current.playVideo === 'function') {
                setTimeout(() => {
                    youtubePlayerRef.current.playVideo();
                }, 200);
            }
            
            // Handle HTML5 videos
            if (voiceOfSuccessRef.current) {
                const videoElement = voiceOfSuccessRef.current.querySelector('video');
                if (videoElement) {
                    setTimeout(() => {
                        videoElement.play().catch(() => {
                            // Autoplay might be prevented by browser
                        });
                    }, 200);
                }
            }
        }
    }, [voiceOfSuccessVisible, currentTestimonial]);

    const scrollAction = (direction) => {
        if (actionScrollRef.current) {
            const { current } = actionScrollRef;
            const scrollAmount = 400; // Approx card width
            current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    // Prepare Data with Fallbacks
    // BUSINESSES
    const businesses = homeData?.businessesSection?.length > 0
        ? homeData.businessesSection.map((item, index) => ({
            id: item._key || `biz-${index}`,
            title: item.title,
            description: item.description,
            // Prefer uploaded file URL, then external URL
            video: item.videoFileUrl || item.videoFile?.url || item.videoUrl,
            link: item.link
        }))
        : businessData;

    const currentBusiness = businesses[activeBusiness] || businesses[0];
    const businessHeading = "Our Businesses";

    // ANNOUNCEMENTS
    const announcements = homeData?.announcementsSection?.length > 0
        ? homeData.announcementsSection.map(item => ({
            title: item.title,
            date: item.date, // Assuming direct string usage or formatting required
            type: item.type,
            img: item.image ? urlFor(item.image).url() : ''
        }))
        : FALLBACK_ANNOUNCEMENTS;

    // CINEMATIC VIDEO SHOWCASE
    const cinematicVideos = homeData?.cinematicShowcase?.length > 0
        ? homeData.cinematicShowcase.map(item => ({
            url: item.videoFileUrl || item.videoFile?.url || item.videoUrl,
            label: item.label
        }))
        : FALLBACK_CINEMATIC;

    // TESTIMONIALS
    const testimonials = homeData?.testimonialsSection?.length > 0
        ? homeData.testimonialsSection.map(item => ({
            url: item.videoFileUrl || item.videoFile?.url || item.videoUrlOrId,
            title: item.title
        }))
        : FALLBACK_TESTIMONIALS.map(t => ({
            url: t.file,
            title: t.title
        }));

    // Dynamic Advanced Tech
    const advTechStat = homeData?.advancedTechSection?.statsValue || "99";
    const advTechUnit = homeData?.advancedTechSection?.statsUnit || "%";
    const advTechLabel = homeData?.advancedTechSection?.statsLabel || "Operational Efficiency";
    const advTechHeading = homeData?.advancedTechSection?.heading || "Revolutionizing Logistics & Surveillance with AI-Powered Autonomous Drone Systems";
    const advTechVideo = homeData?.advancedTechSection?.videoFileUrl || homeData?.advancedTechSection?.videoFile?.url || homeData?.advancedTechSection?.videoUrl || "/mediafiles/videos/Home Advanced Technology.mp4";
    
    // Debug: Log the video data
    useEffect(() => {
        if (homeData?.advancedTechSection) {
            console.log('Advanced Tech Section:', {
                videoFileUrl: homeData.advancedTechSection.videoFileUrl,
                videoFile: homeData.advancedTechSection.videoFile,
                videoUrl: homeData.advancedTechSection.videoUrl,
                finalVideo: advTechVideo
            });
        }
    }, [homeData, advTechVideo]);

    // Global Footprint Image
    const globalFootprintSrc = homeData?.globalFootprintImage
        ? urlFor(homeData.globalFootprintImage).url()
        : "/mediafiles/Where Do Our Interns Reached/placements-reach.png";

    // --- NEW SECTIONS DATA ---
    // Using centralized iconComponentMap from icons.js for consistency across the website

    // About Summary Fallback
    const aboutSummary = homeData?.aboutSummarySection || {
        heading: "Who We Are",
        subheading: "Pioneering the Future of Aerial Tech",
        description: "From humble generic beginnings to industry leadership, CopterCode has been at the forefront of drone innovation. We combine legacy excellence with futuristic vision.",
        image: "/mediafiles/news and media/IMG_1851.jpg",
        stats: [
            { value: "500+", label: "Projects Delivered" },
            { value: "50+", label: "Team Members" },
            { value: "3", label: "Global Offices" }
        ]
    };
    const aboutImage = homeData?.aboutSummarySection?.image ? urlFor(homeData.aboutSummarySection.image).url() : aboutSummary.image;

    // Investor Summary Fallback
    const investorSummary = homeData?.investorSummarySection || {
        heading: "Investor Relations",
        description: "Our commitment to sustainable growth and transparent governance ensures long-term value for our stakeholders. Join us on our journey of innovation.",
        highlights: [
            { title: "Financial Growth", description: "Consistent year-over-year revenue growth.", icon: "chart" },
            { title: "Governance", description: "Strong leadership and ethical practices.", icon: "shield" },
            { title: "Shareholder Info", description: "Stock information, dividend history, and shareholder services.", icon: "piechart" }
        ],
        investors: [
            {
                name: "MurgDur",
                logo: "/_optimized/mediafiles/logos/MurgDur-logo-CNKz8pTh.webp",
                description: "A leading venture capital firm focused on early-stage technology startups with high growth potential, supporting our vision since inception."
            },
            {
                name: "Karvensen",
                logo: "/_optimized/mediafiles/logos/KarVenSen-logo-9ePXpcco (1).webp",
                description: "A global investment group specializing in sustainable infrastructure and innovative industrial solutions, partnering for long-term strategic growth."
            }
        ]
    };

    const upcomingEvents = homeData?.upcomingEventsSection?.events || PREVIEW_EVENTS;

    const careerBenefits = homeData?.careersSection?.benefits?.map(b => ({
        ...b,
        icon: iconComponentMap[b.icon?.toLowerCase()] || Zap
    })) || PREVIEW_BENEFITS;

    const internshipStats = homeData?.internshipSection?.stats || INTERNSHIP_STATS;

    const sustainabilityImpact = homeData?.sustainabilitySection?.impactItems?.map(i => ({
        ...i,
        icon: iconComponentMap[i.icon?.toLowerCase()] || Leaf
    })) || SUSTAINABILITY_IMPACT;

    // Section Text Content
    const upcomingEventsHeading = homeData?.upcomingEventsSection?.heading || "Upcoming Events";

    const careerTagline = homeData?.careersSection?.tagline || "Join Our Elite Team";
    const careerHeading = homeData?.careersSection?.heading || "Build The Future With Us";
    const careerDesc = homeData?.careersSection?.description || "We are looking for passionate innovators to join our world-class team. Explore opportunities in Drone Tech, AI, and Engineering.";

    const internshipHeading = homeData?.internshipSection?.heading || "Internship Programme";
    const internshipDesc = homeData?.internshipSection?.description || "Empowering the next generation of innovators. Gain hands-on experience in Drone Tech, AI, and IoT with our intensive 3-month training program.";
    const internshipLink = homeData?.internshipSection?.applyLink || "https://forms.gle/bPkBxkdAHwDDrFJm6";
    const internshipMainImage = homeData?.internshipSection?.image ? urlFor(homeData.internshipSection.image).url() : "/mediafiles/news and media/IMG_1851.jpg";
    const FALLBACK_INTERNSHIP_IMAGES = [
        "/mediafiles/Intern/A Devendhiran   -   Shree Sathyam College of Engineering And Technology   -  Fresher  -   Full Stack Developer.jpg",
        "/mediafiles/Intern/Aathi Lakshmi -  Mepco Schlenk Engineering College  -   Fresher  -   Drone Development Designer.jpg",
        "/mediafiles/Intern/Abinaya K  - KPR Institute of Engineering and Technology  -  Fresher Cloud Architect.jpg",
        "/mediafiles/Intern/Abinesh M  -  Shree Sathyam college of Engineering And Technology  -  Fresher  -   Full Stack Web Developer.jpg"
    ];
    const internshipImages = homeData?.internshipSection?.images?.length > 0
        ? homeData.internshipSection.images
        : FALLBACK_INTERNSHIP_IMAGES;

    // Auto-slide internship images
    useEffect(() => {
        if (internshipImages.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentInternshipSlide(prev => (prev + 1) % internshipImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [internshipImages]);

    const sustainabilityHeading = homeData?.sustainabilitySection?.heading || "Sustainability & CSR";
    const sustainabilityDesc = homeData?.sustainabilitySection?.description || "We are committed to building societal and business value together. Driving sustainable growth across all operations while empowering communities through innovation and care.";
    const sustainabilityBanner = homeData?.sustainabilitySection?.bannerImage ? urlFor(homeData.sustainabilitySection.bannerImage).url() : "/mediafiles/news and media/IMG_3979.jpg";

    // --- NEW SECTIONS DATA (Manual / Static Fallback) ---
    const WHY_CHOOSE_DATA = homeData?.whyChooseSection || {
        heading: "Why Choose CopterCode?",
        description: "At CopterCode, we specialize in Deep-Tech Innovation. We bridge the gap between hardware and software by integrating Autonomous Industrial Drones with Defense-Grade Cybersecurity. From custom ERP Software Solutions to cutting-edge Digital Services, our ecosystem is built for high-stakes precision and scalability.",
        features: [
            { title: "Industrial Aerial Intelligence", description: "Autonomous UAV systems designed for heavy-duty surveillance and logistics." },
            { title: "Defense-Grade Cybersecurity", description: "Next-gen threat detection and digital asset protection standards." },
            { title: "Integrated ERP Ecosystems", description: "Seamless business process management for enterprise efficiency." },
            { title: "Infrastructure & Physical Security", description: "Convergence of physical and digital security for critical infrastructure." },
            { title: "Sustainable Energy Innovation", description: "Net-zero vision driving energy-efficient and material innovations." },
            { title: "Strategic R&D Partnerships", description: "Collaborations with top research hubs (IIT Madras Research Park) for rapid prototyping." }
        ],
        caseStudies: [
            {
                title: "Smart Agriculture Deployment",
                subtitle: "Autonomous UAVs for precision farming and large-scale surveys.",
                stats: [
                    { value: "500+", label: "Farms Covered" },
                    { value: "30%", label: "Yield Efficiency" },
                    { value: "100%", label: "Auto-Piloted" }
                ]
            },
            {
                title: "Leonix Industrial IoT Transformation",
                subtitle: "Digital overhaul for a leading industrial automation provider.",
                stats: [
                    { value: "47%", label: "Organic Traffic Growth" },
                    { value: "45%", label: "Higher Engagement" },
                    { value: "Real-time", label: "Data Sync" }
                ]
            }
        ]
    };

    const COMMAND_CENTER_DATA = homeData?.engineeringCommandCenterSection || {
        heading: "ENGINEERING COMMAND CENTER.",
        subtext: "Where industrial automation meets enterprise software intelligence. We architect scalable drone ecosystems, enterprise-grade ERP platforms, and intelligent digital infrastructures engineered for real-world impact.",
        focusAreas: [
            { title: "Industrial Drone Systems", description: "Autonomous UAV solutions for surveillance, mapping, inspection & defense applications." },
            { title: "Enterprise Software Engineering", description: "Custom ERP platforms, business automation systems & scalable SaaS architectures." },
            { title: "AI & Intelligent Automation", description: "Predictive analytics, machine learning integration & process intelligence." },
            { title: "Infrastructure & Security Systems", description: "Smart monitoring, industrial safety frameworks & secured digital environments." }
        ],
        coreCapabilities: [
            { title: "Autonomous Systems Engineering", description: "UAV architecture, flight intelligence & real-time control systems." },
            { title: "Enterprise ERP Development", description: "Scalable, secure & modular ERP ecosystems for industrial operations." },
            { title: "AI & Data Intelligence", description: "Predictive modeling, operational analytics & intelligent automation." },
            { title: "Digital Infrastructure Engineering", description: "Secure cloud deployments, performance optimization & resilient architectures." }
        ],
        infoCard: {
            engineersCount: "50+",
            status: "INNOVATION LAB ACTIVE"
        }
    };


    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };



    return (
        <div className="bg-background text-primary selection:bg-accent selection:text-white">
            <SEO
                title={homeData?.seo?.metaTitle}
                description={homeData?.seo?.metaDescription}
                keywords={homeData?.seo?.keywords}
                ogImage={homeData?.seo?.metaImage || homeData?.heroSection?.heroImages?.[0] || "/mediafiles/Home/IMG_1851.jpg"}
            />

            {/* Note: Hero will use its internal default if data prop fields are missing */}
            <Hero data={homeData?.heroSection || null} />

            {/* Scrolling Announcement Bar */}
            <ScrollingAnnouncementBar data={homeData?.scrollingAnnouncementBar || FALLBACK_SCROLLING_BAR} />

            {/* --- WHO WE ARE (Redesigned) --- */}
            <section className="py-24 lg:py-32 bg-surface text-primary relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 transform origin-top-right z-0 pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        {/* Text Content */}
                        <div className="w-full lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                {/* Badge/Label */}
                                <div className="inline-flex items-center space-x-3 mb-8">
                                    <span className="w-12 h-[2px] bg-accent"></span>
                                    <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs">
                                        {aboutSummary.heading}
                                    </span>
                                </div>

                                <h2 className="text-4xl md:text-6xl font-display font-medium text-primary mb-8 leading-[1.1]">
                                    {aboutSummary.subheading}
                                </h2>

                                <p className="text-xl text-secondary leading-relaxed font-light mb-12 border-l-4 border-accent pl-6">
                                    {aboutSummary.description}
                                </p>

                                {/* Modern Stats Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
                                    {aboutSummary.stats && aboutSummary.stats.map((stat, idx) => (
                                        <div key={idx} className="group cursor-default">
                                            <h4 className="text-4xl md:text-5xl font-display font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                                                {stat.value}
                                            </h4>
                                            <p className="text-xs uppercase tracking-wider text-secondary font-semibold group-hover:tracking-widest transition-all duration-300">
                                                {stat.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <Link to="/about" className="group inline-flex items-center px-10 py-5 bg-primary text-white rounded-full hover:bg-accent transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                                    <span className="font-bold tracking-wide">Read Our Story</span>
                                    <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
                                </Link>
                            </motion.div>
                        </div>

                        {/* Image Content */}
                        <div className="w-full lg:w-1/2 relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative z-10"
                            >
                                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] relative">
                                    {aboutImage ? (
                                        <OptimizedImage src={aboutImage} alt="About CopterCode" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">Image not available</div>
                                    )}

                                    {/* Glassmorphic Overlay Card */}
                                    <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/40 hidden md:flex items-center justify-between">
                                        <div>
                                            <p className="text-primary font-bold text-lg mb-1">Innovation First</p>
                                            <p className="text-xs text-secondary font-medium uppercase tracking-wider">Leading the drone revolution since 2018</p>
                                        </div>
                                        <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center shadow-md">
                                            <Zap size={24} fill="currentColor" />
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative Elements behind image */}
                                <div className="absolute top-8 -right-8 w-full h-full bg-accent/5 rounded-[2.5rem] -z-10 rotate-3 border border-accent/10"></div>
                                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Businesses Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.0 }}
                className="py-0 relative"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[800px]">
                    <div ref={businessContentRef} className="bg-white border-r border-border p-6 lg:p-12 xl:p-24 flex flex-col justify-center relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeBusiness}
                                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                transition={{ duration: 0.0, ease: "circOut" }}
                                className="relative z-10 flex flex-col items-start"
                            >
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0, duration: 0.4, ease: "easeOut" }}
                                    className="text-secondary bg-white font-bold tracking-[0.2em] uppercase text-xs mb-6 block flex items-center"
                                >
                                    <span className="w-2 h-2 bg-accent mr-2 rotate-45"></span>
                                    {businessHeading}
                                </motion.span>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
                                    className="text-4xl md:text-5xl lg:text-7xl font-display font-bold leading-tight mb-8 text-primary"
                                >
                                    {currentBusiness.title.split('&')[0]} <br />
                                    <span className="text-primary/70">
                                        {currentBusiness.title.includes('&') ? '& ' + currentBusiness.title.split('&')[1] : ''}
                                    </span>
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                                    className="text-base md:text-lg text-secondary leading-relaxed mb-12 w-full md:max-w-xl"
                                >
                                    {currentBusiness.description}
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                                >
                                    <Link to={currentBusiness.link || "/business"} className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-300 font-semibold tracking-wide shadow-xl hover:-translate-y-1">
                                        read more <ArrowRight className="ml-2" />
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="bg-surface relative flex flex-col justify-center border-l border-border">
                        <div className="absolute inset-0 overflow-hidden">
                            <AnimatePresence mode="wait">
                                {(() => {
                                    const videoSrc = currentBusiness.video;
                                    const potentialId = getVideoId(videoSrc);
                                    // Check if it's likely a YouTube ID/URL and NOT a direct file URL
                                    const isYoutube = /^[a-zA-Z0-9_-]{11}$/.test(potentialId) && !videoSrc?.match(/\.(mp4|webm|ogg)$/i);

                                    if (isYoutube) {
                                        return (
                                            <motion.div
                                                key={videoSrc}
                                                initial={{ opacity: 0, scale: 1.1 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 1.2, ease: "circOut" }}
                                                className="w-full h-full absolute inset-0"
                                            >
                                                <YouTube
                                                    videoId={potentialId}
                                                    opts={{
                                                        height: '100%',
                                                        width: '100%',
                                                        playerVars: {
                                                            autoplay: 1,
                                                            mute: 1,
                                                            controls: 0,
                                                            loop: 1,
                                                            playlist: potentialId,
                                                            modestbranding: 1,
                                                            rel: 0
                                                        }
                                                    }}
                                                    className="w-full h-full pointer-events-none"
                                                    iframeClassName="w-full h-full object-cover"
                                                />
                                            </motion.div>
                                        );
                                    } else {
                                        return (
                                            <LazyVideo
                                                key={videoSrc}
                                                src={videoSrc}
                                                className="w-full h-full object-cover"
                                                autoPlay={true}
                                                loop={true}
                                                muted={true}
                                                playsInline={true}
                                            />
                                        );
                                    }
                                })()}
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-gradient-to-l from-surface via-surface/30 to-transparent" />
                        </div>
                        <div className="relative z-10 pl-12 pr-6">
                            <div className="space-y-0">
                                {businesses.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleBusinessClick(index)}
                                        className="group border-b border-primary/10 py-8 pl-8 transition-all duration-300 hover:bg-white/50 cursor-pointer relative overflow-hidden"
                                    >
                                        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-accent transition-transform duration-300 ${index === activeBusiness ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'}`} />
                                        <h3 className={`text-xl font-bold tracking-wide uppercase transition-colors ${index === activeBusiness ? 'text-primary scale-105 origin-left' : 'text-primary/40 group-hover:text-primary'}`}>
                                            {item.title}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* UPCOMING EVENTS SECTION (New) */}
            <section className="py-24 bg-background border-t border-border relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
                        <div>
                            <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                                Connect With Us
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-medium text-primary">
                                {upcomingEventsHeading}
                            </h2>
                        </div>
                        <Link to="/events" className="hidden md:flex items-center text-primary font-bold hover:text-accent transition-colors mt-6 md:mt-0">
                            View All Events <ArrowRight className="ml-2" size={20} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {upcomingEvents.map((event, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                                whileHover={{ y: -10 }}
                                className="group relative bg-surface rounded-2xl overflow-hidden border border-border hover:border-accent/40 shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10" />
                                    <OptimizedImage
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        sizes="(min-width:1024px) 33vw, 100vw"
                                    />
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="bg-background/90 backdrop-blur text-primary text-xs font-bold px-3 py-1 rounded-full border border-border">
                                            {event.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center text-accent text-xs font-bold uppercase tracking-widest mb-3">
                                        <Calendar size={14} className="mr-2" />
                                        {event.date}
                                    </div>
                                    <h3 className="text-xl font-bold text-primary mb-3 leading-snug group-hover:text-accent transition-colors">
                                        {event.title}
                                    </h3>
                                    <div className="flex items-center text-secondary text-sm">
                                        <MapPin size={14} className="mr-2" />
                                        {event.location}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-10 md:hidden flex justify-center">
                        <Link to="/events" className="flex items-center text-primary font-bold hover:text-accent transition-colors">
                            View All Events <ArrowRight className="ml-2" size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Essentials Video Showcase (Service Showcase) */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="py-24 bg-surface border-y border-border"
            >
                <div className="container mx-auto px-6 mb-8 flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-display font-medium mb-2 text-primary">CopterCode In Action</h2>
                        <div className="w-12 h-1 bg-accent rounded-full"></div>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => scrollAction('left')}
                            className="p-3 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all text-primary"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => scrollAction('right')}
                            className="p-3 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all text-primary"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div
                    ref={actionScrollRef}
                    className="flex overflow-x-auto gap-6 px-6 pb-12 snap-x snap-mandatory scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {cinematicVideos.map((video, idx) => {
                        const potentialId = getVideoId(video.url);
                        const isYoutube = /^[a-zA-Z0-9_-]{11}$/.test(potentialId) && !video.url?.match(/\.(mp4|webm|ogg)$/i);

                        return (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                onMouseEnter={(e) => !isYoutube && e.currentTarget.querySelector('video')?.play()}
                                onMouseLeave={(e) => !isYoutube && e.currentTarget.querySelector('video')?.pause()}
                                className="min-w-[85vw] md:min-w-[450px] aspect-[16/9] bg-surface-highlight rounded-3xl overflow-hidden relative group snap-center border border-border shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                {isYoutube ? (
                                    <div className="w-full h-full pointer-events-none">
                                        <YouTube
                                            videoId={potentialId}
                                            opts={{
                                                height: '100%',
                                                width: '100%',
                                                playerVars: {
                                                    autoplay: 1,
                                                    mute: 1,
                                                    controls: 0,
                                                    loop: 1,
                                                    playlist: potentialId,
                                                    modestbranding: 1,
                                                    rel: 0
                                                }
                                            }}
                                            className="w-full h-full absolute inset-0"
                                            iframeClassName="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <video
                                        src={video.url}
                                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 scale-100 group-hover:scale-105 transition-transform"
                                        loop
                                        muted
                                        playsInline
                                        webkit-playsinline="true"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                                <div className="absolute bottom-6 left-6 z-20">
                                    <span className="bg-black/40 backdrop-blur-md text-white border border-white/20 px-4 py-2 rounded-lg text-xs font-extrabold uppercase tracking-widest shadow-lg">
                                        {video.label}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.section>

            {/* CAREERS SECTION (Enhanced) */}
            <section className="py-24 bg-surface text-primary relative overflow-hidden">
                {/* Abstract Background Elements */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                            {careerTagline}
                        </span>
                        <h2 className="text-5xl md:text-6xl font-display font-medium text-primary mb-6">
                            {careerHeading}
                        </h2>
                        <p className="text-xl text-secondary leading-relaxed font-light">
                            {careerDesc}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {careerBenefits.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-8 rounded-3xl border border-border bg-white shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                            >
                                <div className="w-16 h-16 mb-6 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-500">
                                    <item.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-primary mb-3">{item.title}</h3>
                                <p className="text-secondary leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link to="/careers" className="relative inline-flex group">
                            <div className="absolute transition-all duration-1000 opacity-30 -inset-px bg-gradient-to-r from-accent to-blue-500 rounded-full blur-lg group-hover:opacity-60 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                            <span className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-primary rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 shadow-xl">
                                Explore Careers <Briefcase className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Announcements / Insights Section (Renamed) */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="py-24 bg-background text-primary relative border-t border-border"
            >
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
                        <div>
                            <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                                Stay Updated
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-medium text-primary">Automation & Bio-Medical Insights</h2>
                        </div>
                        <Link to="/news" className="hidden md:flex items-center text-primary font-bold hover:text-accent transition-colors mt-6 md:mt-0">
                            Read More News <ArrowRight className="ml-2" size={20} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {announcements.map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="group cursor-pointer bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 border border-border"
                            >
                                <div className="aspect-video bg-surface mb-6 overflow-hidden relative rounded-xl">
                                    <OptimizedImage src={item.img} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" alt={item.title} sizes="(min-width:1024px) 33vw, 100vw" />
                                </div>
                                <div className="border-l-2 border-accent pl-6 py-1 mb-6">
                                    <h3 className="text-xl font-bold leading-snug text-primary group-hover:text-accent transition-colors">
                                        {item.title}
                                    </h3>
                                </div>
                                <div className="flex items-center text-xs font-bold tracking-widest text-secondary uppercase space-x-3">
                                    <span className="bg-surface px-3 py-1 rounded-sm">{item.type}</span>
                                    <span className="text-border">|</span>
                                    <span className="text-secondary/70">{item.date}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* --- INVESTOR SUMMARY (New) --- */}
            <section className="py-24 bg-[#FAF9F5] relative overflow-hidden border-t border-border">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                            Corporate Governance
                        </span>
                        <h2 className="text-4xl md:text-5xl font-display font-medium text-primary mb-6">
                            {investorSummary.heading}
                        </h2>
                        <p className="text-xl text-secondary leading-relaxed font-light">
                            {investorSummary.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {investorSummary.highlights && investorSummary.highlights.map((item, idx) => {
                            const Icon = iconComponentMap[item.icon?.toLowerCase()] || BarChart;
                            return (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -5 }}
                                    className="bg-white p-8 rounded-2xl shadow-sm border border-border hover:shadow-xl hover:border-accent/30 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 bg-accent/5 rounded-full flex items-center justify-center text-accent mb-6">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                                    <p className="text-secondary text-sm leading-relaxed">{item.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Our Investors Subsection */}
                    {investorSummary.investors && investorSummary.investors.length > 0 && (
                        <div className="mb-16">
                            <div className="text-center mb-10">
                                <h3 className="text-3xl font-display font-medium text-primary inline-block relative pb-4">
                                    Our Investors
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full"></span>
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                {investorSummary.investors.map((investor, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -5 }}
                                        className="bg-white p-8 rounded-3xl shadow-sm border border-border hover:shadow-xl hover:border-accent/30 transition-all duration-300 text-center flex flex-col items-center h-full"
                                    >
                                        <div className="w-24 h-24 bg-[#1a1a1a] rounded-2xl flex items-center justify-center mb-6 shadow-md overflow-hidden p-4">
                                            <img src={investor.logo} alt={investor.name} className="w-full h-full object-contain" />
                                        </div>
                                        <h4 className="text-xl font-bold text-primary mb-4">{investor.name}</h4>
                                        <p className="text-secondary text-sm leading-relaxed max-w-sm">{investor.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="text-center">
                        <Link to="/investors" className="inline-flex items-center text-primary font-bold border-b-2 border-accent pb-1 hover:text-accent transition-colors">
                            Visit Investor Relations <ArrowRight className="ml-2" size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Advanced Technology Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-6 block flex items-center">
                            <div className="w-8 h-px bg-secondary mr-3"></div>
                            {"Advanced Technology"}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-display font-normal text-primary mb-8 leading-tight">
                            {advTechHeading}
                        </h2>

                        <div className="mb-12">
                            <div className="flex items-end mb-2">
                                <span className="text-4xl md:text-6xl font-bold text-primary">{advTechStat}</span>
                                <span className="text-2xl md:text-3xl font-bold text-primary mb-2">{advTechUnit}</span>
                            </div>
                            <h4 className="text-2xl text-secondary font-medium mb-1">{advTechLabel}</h4>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-border relative shadow-2xl bg-surface">
                            {(() => {
                                // Debug logging
                                console.log('Video Source:', advTechVideo);
                                
                                if (!advTechVideo) {
                                    return <div className="w-full h-full bg-surface flex items-center justify-center text-secondary">Video not available</div>;
                                }
                                
                                const potentialId = getVideoId(advTechVideo);
                                const isYoutube = /^[a-zA-Z0-9_-]{11}$/.test(potentialId);

                                if (isYoutube && !advTechVideo?.includes('pexels')) {
                                    return (
                                        <YouTube
                                            videoId={potentialId}
                                            opts={{
                                                height: '100%',
                                                width: '100%',
                                                playerVars: {
                                                    autoplay: 1,
                                                    mute: 1,
                                                    controls: 0,
                                                    loop: 1,
                                                    playlist: potentialId,
                                                    modestbranding: 1,
                                                    rel: 0
                                                },
                                            }}
                                            className="w-full h-full absolute inset-0 pointer-events-none"
                                            iframeClassName="w-full h-full object-cover"
                                        />
                                    );
                                } else {
                                    return (
                                        <video 
                                            autoPlay 
                                            loop 
                                            muted 
                                            playsInline 
                                            className="w-full h-full object-cover"
                                            onError={(e) => console.error('Video load error:', e)}
                                        >
                                            <source src={advTechVideo} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    );
                                }
                            })()}
                                    );
                                }
                            })()}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ENGINEERING COMMAND CENTER (New) */}
            {/* ENGINEERING COMMAND CENTER (Refined) */}
            <section className="py-24 bg-primary text-white relative overflow-hidden">
                {/* Clean Dark Background - No Grids */}
                <div className="absolute inset-0 bg-primary" />

                {/* Subtle Ambient Glow (Optional, very faint) */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16 mb-20">
                        <div className="lg:w-2/3">
                            <div className="w-16 h-1 bg-white mb-6" />
                            <span className="text-gray-400 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
                                PRODUCT
                            </span>
                            <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-8 leading-none tracking-tight">
                                {COMMAND_CENTER_DATA.heading}
                            </h2>
                            <p className="text-xl text-gray-400 leading-relaxed font-light max-w-2xl">
                                {COMMAND_CENTER_DATA.subtext}
                            </p>
                        </div>
                        <div className="lg:w-1/3 flex justify-end">
                            {/* Right Side Info Card - Glassmorphism */}
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl relative overflow-hidden max-w-sm w-full shadow-2xl">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Cpu size={80} className="text-white" />
                                </div>
                                <h3 className="text-6xl font-bold text-white mb-2">{COMMAND_CENTER_DATA.infoCard?.engineersCount || "50+"}</h3>
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">Core Engineers</p>

                                <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-emerald-400 border-t border-white/10 pt-6">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    <span>{COMMAND_CENTER_DATA.infoCard?.status || "Status: Innovation Lab Active"}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {COMMAND_CENTER_DATA.focusAreas?.map((item, idx) => (
                            <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors group">
                                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-gray-200 transition-colors">{item.title}</h4>
                                <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-white/10 pt-16">
                        <h3 className="text-2xl font-bold text-white mb-8">Core Capabilities</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {COMMAND_CENTER_DATA.coreCapabilities?.map((item, idx) => (
                                <div key={idx} className="flex items-start space-x-4">
                                    <div className="w-1.5 h-1.5 bg-white rounded-full mt-2.5 flex-shrink-0" />
                                    <div>
                                        <h4 className="text-base font-bold text-white mb-1 uppercase tracking-wide">{item.title}</h4>
                                        <p className="text-sm text-gray-400">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-16">
                        <Link to="/technologies" className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-primary font-bold rounded-full transition-all shadow-lg hover:shadow-xl">
                            Explore Solutions <ArrowRight className="ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* INTERNSHIP SECTION (New) */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0">
                    <OptimizedImage
                        src={internshipImages[0]}
                        alt="Internship Background"
                        className="w-full h-full object-cover opacity-20 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="text-left">
                            <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                                Launch Your Career
                            </span>
                            <h2 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6">
                                {internshipHeading}
                            </h2>
                            <p className="text-xl text-secondary mb-8 leading-relaxed">
                                {internshipDesc}
                            </p>

                            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 mb-10 border-y border-border py-8">
                                {internshipStats.map((stat, idx) => (
                                    <div key={idx}>
                                        <div className="text-3xl font-bold text-primary mb-1">{stat.value || stat.metricValue}</div>
                                        <div className="text-xs text-secondary font-bold uppercase tracking-wider">{stat.label || stat.metricLabel}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to={internshipLink} target="_blank" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-all shadow-lg font-bold">
                                    Apply Now <GraduationCap className="ml-2" size={20} />
                                </Link>
                                <Link to="/internship" className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary border border-border rounded-full hover:bg-gray-50 transition-all font-bold">
                                    Learn More
                                </Link>
                            </div>
                        </div>

                        <div className="relative flex items-center justify-center">
                            <div className="w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden border border-border relative bg-surface shadow-xl hover:shadow-2xl transition-shadow duration-500">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentInternshipSlide}
                                        src={internshipImages[currentInternshipSlide]}
                                        alt={`Internship ${currentInternshipSlide + 1}`}
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1 }}
                                        className="w-full h-full object-cover absolute inset-0"
                                    />
                                </AnimatePresence>
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <h4 className="text-xl font-bold mb-2">Real-World Projects</h4>
                                    <p className="text-white/90 text-xs leading-relaxed">Join students from top universities working on cutting-edge aerospace challenges.</p>
                                </div>
                            </div>
                            {/* Decorative accent bar */}
                            <div className="absolute -left-4 top-1/2 w-1.5 h-24 bg-gradient-to-b from-accent to-accent/30 rounded-full hidden lg:block transform -translate-y-1/2" />
                        </div>
                    </div>
                </div>
            </section>

            {/* SUSTAINABILITY SECTION (New) */}
            <section className="py-24 bg-background border-t border-border">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
                        <div className="md:w-1/2">
                            <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                                Our Impact
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-medium text-primary mb-6">
                                {sustainabilityHeading}
                            </h2>
                            <p className="text-lg text-secondary leading-relaxed">
                                {sustainabilityDesc}
                            </p>
                        </div>
                        <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {sustainabilityImpact.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-start space-x-4 p-4 rounded-xl hover:bg-surface transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                                        <item.icon size={20} />
                                    </div>
                                    <p className="font-medium text-primary text-sm">{item.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="relative rounded-3xl overflow-hidden h-[400px] group">
                        <OptimizedImage
                            src={sustainabilityBanner}
                            alt="Sustainability Initiative"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent flex flex-col justify-center p-12">
                            <div className="max-w-xl">
                                <h3 className="text-3xl font-bold text-white mb-4">Driving Change Through Technology</h3>
                                <p className="text-white/90 text-lg mb-8">
                                    From clean energy solutions to digital transformation for rural sectors, our initiatives are designed to create lasting positive impact.
                                </p>
                                <Link to="/sustainability" className="inline-flex items-center text-white font-bold hover:text-accent transition-colors">
                                    Explore Our Initiatives <ArrowRight className="ml-2" size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Video Section */}
            <section ref={voiceOfSuccessRef} className="py-24 bg-background border-t border-border">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-display font-medium mb-12 text-center text-primary">Voice of Success</h2>

                    <div className="max-w-5xl mx-auto relative group">
                        <div className="aspect-video bg-surface rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border border-border relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentTestimonial}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full"
                                >
                                    {(() => {
                                        const rawUrl = testimonials[currentTestimonial]?.url;
                                        if (!rawUrl) return null;

                                        const potentialId = getVideoId(rawUrl);
                                        const isYoutube = /^[a-zA-Z0-9_-]{11}$/.test(potentialId);

                                        if (isYoutube) {
                                            return (
                                                <YouTube
                                                    videoId={potentialId}
                                                    opts={{
                                                        height: '100%',
                                                        width: '100%',
                                                        playerVars: {
                                                            autoplay: 0,
                                                            mute: 1,
                                                            controls: 1,
                                                            rel: 0,
                                                            modestbranding: 1
                                                        },
                                                    }}
                                                    className="w-full h-full"
                                                    iframeClassName="w-full h-full object-cover"
                                                    onReady={(event) => {
                                                        youtubePlayerRef.current = event.target;
                                                        if (voiceOfSuccessVisible) {
                                                            setTimeout(() => event.target.playVideo(), 100);
                                                        }
                                                    }}
                                                    onEnd={nextTestimonial}
                                                />
                                            );
                                        } else {
                                            return (
                                                <video
                                                    src={rawUrl}
                                                    className="w-full h-full object-cover"
                                                    loop={false}
                                                    muted
                                                    playsInline
                                                    controls
                                                    onEnded={nextTestimonial}
                                                />
                                            );
                                        }
                                    })()}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <button
                            onClick={prevTestimonial}
                            className="absolute top-1/2 -left-4 md:-left-16 transform -translate-y-1/2 p-4 rounded-full bg-surface hover:bg-surface-highlight border border-white/10 text-primary shadow-xl transition-all hover:scale-110 z-30"
                        >
                            <ChevronLeft size={32} />
                        </button>
                        <button
                            onClick={nextTestimonial}
                            className="absolute top-1/2 -right-4 md:-right-16 transform -translate-y-1/2 p-4 rounded-full bg-surface hover:bg-surface-highlight border border-white/10 text-primary shadow-xl transition-all hover:scale-110 z-30"
                        >
                            <ChevronRight size={32} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Global Footprint */}
            <section className="py-24 bg-surface text-primary text-center border-t border-border">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-display font-bold mb-12 text-primary">{"Global Footprint of Our Talent"}</h2>
                    <div className="max-w-5xl mx-auto border border-border shadow-2xl rounded-3xl overflow-hidden p-6 bg-white">
                        <OptimizedImage
                            src={globalFootprintSrc}
                            alt={"Global Footprint"}
                            className="w-full h-auto mix-blend-normal"
                        />
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE SECTION (Refreshed - Light Mode) */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Left Column: Intro & Features */}
                        <div>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-8 leading-tight">
                                Why Enterprises Choose <br />
                                <span className="text-accent">CopterCode</span>
                            </h2>
                            <p className="text-lg text-secondary leading-relaxed mb-12 border-l-4 border-accent pl-6">
                                {WHY_CHOOSE_DATA.heading === "Why Choose CopterCode?" ? WHY_CHOOSE_DATA.description : WHY_CHOOSE_DATA.description}
                            </p>

                            <div className="space-y-6">
                                {WHY_CHOOSE_DATA.features?.map((feature, idx) => (
                                    <div key={idx} className="flex items-start group">
                                        <div className="mt-1 mr-4 flex-shrink-0 w-6 h-6 rounded-full bg-surface-highlight flex items-center justify-center text-primary border border-border group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <CheckCircle size={14} strokeWidth={3} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-primary mb-1">{feature.title}</h4>
                                            <p className="text-sm text-secondary">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Case Studies */}
                        <div>
                            <h3 className="text-2xl font-bold text-primary mb-8 flex items-center">
                                Case Study Snapshots
                                <Activity className="ml-3 text-accent" size={24} />
                            </h3>
                            <div className="space-y-6">
                                {WHY_CHOOSE_DATA.caseStudies?.map((study, idx) => (
                                    <div key={idx} className="bg-surface border border-border rounded-3xl p-8 hover:shadow-lg hover:border-accent/20 transition-all duration-300 group">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h4 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">{study.title}</h4>
                                                <p className="text-xs font-bold uppercase tracking-wider text-secondary/70">{study.subtitle}</p>
                                            </div>
                                            <div className="bg-white p-2 rounded-lg text-primary shadow-sm">
                                                <BarChart size={20} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 border-t border-border pt-6">
                                            {study.stats?.map((stat, sIdx) => (
                                                <div key={sIdx} className="text-center">
                                                    <div className="text-2xl md:text-3xl font-black text-primary mb-1">{stat.value}</div>
                                                    <div className="text-[10px] uppercase font-bold text-secondary tracking-wider">{stat.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Decorative Quote-like Box - Dark Contrast */}
                            <div className="mt-8 bg-primary rounded-3xl p-8 text-center relative overflow-hidden shadow-2xl">
                                <div className="relative z-10">
                                    <h4 className="text-2xl font-black text-white italic mb-2">"Zero Latency."</h4>
                                    <p className="text-gray-400 text-sm font-medium">Our commitment to real-time performance in both drone telemetry and digital infrastructure.</p>
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ImpactTabs data={homeData?.ourPhilosophySection || null} />
        </div>
    );
};

export default Home;
