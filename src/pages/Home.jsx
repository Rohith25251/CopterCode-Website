import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import Hero from '../components/Hero';
import ImpactTabs from '../components/ImpactTabs';
import { ArrowRight, ChevronLeft, ChevronRight, Calendar, MapPin, Clock, Users, Zap, Globe, Heart, GraduationCap, Briefcase, Leaf, Shield, Code, Sun, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { ASSETS } from '../constants/assets';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { client, urlFor } from '../lib/sanity';
import ScrollingAnnouncementBar from '../components/ScrollingAnnouncementBar';

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
    { url: "/mediafiles/videos/industrial-drones-uav.mp4", label: "Industrial Drones" },
    { url: "/mediafiles/videos/digital-services.mp4", label: "Digital Services" },
    { url: "/mediafiles/videos/new-energy-materials.mp4", label: "New Energy" },
    { url: "/mediafiles/videos/erp-software-solutions.mp4", label: "ERP Solutions" },
    { url: "/mediafiles/videos/retail-food-collaborations.mp4", label: "Retail & Food" },
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
        { text: "📢 LATEST ACHIEVEMENTS, PARTNERSHIPS & INNOVATIONS", isHighlight: true, link: "/events" }, // Assuming industries page or similar, defaulting to business if not
        { text: "🎓 JOIN OUR INTERNSHIP PROGRAM 2026", link: "/internship", isHighlight: false },
        { text: "🤝 GET IN TOUCH FOR CUSTOM ENTERPRISE SOLUTIONS", link: "/get-in-touch", isHighlight: false }
    ],
    scrollSpeed: 60, // Slower for premium feel
    direction: 'left',
    backgroundColor: '#050505',
    textColor: '#ffffff'
};

const Home = () => {
    useScrollToTop(); // Force scroll to top on mount

    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [activeBusiness, setActiveBusiness] = useState(0);
    const [homeData, setHomeData] = useState(null);
    const actionScrollRef = useRef(null);

    // Fetch Sanity Data
    useEffect(() => {
        // Expand videoFile references and Image assets to get the actual URL
        const query = `*[_type == "homePage"][0]{
            ...,
            heroSection {
                ...,
                "heroImages": heroImages[].asset->url
            },
            businessesSection[]{
                ...,
                "videoFileUrl": videoFile.asset->url
            },
            cinematicShowcase[]{
                ...,
                "videoFileUrl": videoFile.asset->url
            },
            advancedTechSection{
                ...,
                "videoFileUrl": videoFile.asset->url
            },
            testimonialsSection[]{
                ...,
                "videoFileUrl": videoFile.asset->url
            },
            upcomingEventsSection {
                ...,
                events[]{
                    ...,
                    "image": image.asset->url
                }
            },
            careersSection,
            internshipSection {
                ...,
                "image": image.asset->url
            },
            sustainabilitySection {
                ...,
                "bannerImage": bannerImage.asset->url
            }
        }`;

        client.fetch(query)
            .then((data) => {
                if (data) setHomeData(data);
            })
            .catch(console.error);
    }, []);

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
            video: item.videoFileUrl || item.videoUrl,
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
            url: item.videoFileUrl || item.videoUrl,
            label: item.label
        }))
        : FALLBACK_CINEMATIC;

    // TESTIMONIALS
    const testimonials = homeData?.testimonialsSection?.length > 0
        ? homeData.testimonialsSection.map(item => ({
            url: item.videoFileUrl || item.videoUrlOrId,
            title: item.title
        }))
        : FALLBACK_TESTIMONIALS.map(t => ({
            url: t.file,
            title: t.title
        }));

    // Dynamic Advanced Tech
    const advTechStat = homeData?.advancedTechSection?.statsValue || "99";
    const advTechUnit = homeData?.advancedTechSection?.statsUnit || "";
    const advTechLabel = homeData?.advancedTechSection?.statsLabel || "Operational Efficiency";
    const advTechHeading = homeData?.advancedTechSection?.heading || "Revolutionizing Logistics & Surveillance with AI-Powered Autonomous Drone Systems";
    const advTechVideo = homeData?.advancedTechSection?.videoFileUrl || homeData?.advancedTechSection?.videoUrl || "/mediafiles/videos/Home Advanced Technology.mp4";

    // Global Footprint Image
    const globalFootprintSrc = homeData?.globalFootprintImage
        ? urlFor(homeData.globalFootprintImage).url()
        : "/mediafiles/Where Do Our Interns Reached/placements-reach.png";

    // --- NEW SECTIONS DATA ---
    const iconMap = {
        users: Users, globe: Globe, leaf: Leaf, code: Code,
        zap: Zap, heart: Heart, sun: Sun, shield: Shield, star: Star
    };

    const upcomingEvents = homeData?.upcomingEventsSection?.events || PREVIEW_EVENTS;

    const careerBenefits = homeData?.careersSection?.benefits?.map(b => ({
        ...b,
        icon: iconMap[b.icon?.toLowerCase()] || Zap
    })) || PREVIEW_BENEFITS;

    const internshipStats = homeData?.internshipSection?.stats || INTERNSHIP_STATS;

    const sustainabilityImpact = homeData?.sustainabilitySection?.impactItems?.map(i => ({
        ...i,
        icon: iconMap[i.icon?.toLowerCase()] || Leaf
    })) || SUSTAINABILITY_IMPACT;

    // Section Text Content
    const upcomingEventsHeading = homeData?.upcomingEventsSection?.heading || "Upcoming Events";

    const careerTagline = homeData?.careersSection?.tagline || "Join Our Elite Team";
    const careerHeading = homeData?.careersSection?.heading || "Build The Future With Us";
    const careerDesc = homeData?.careersSection?.description || "We are looking for passionate innovators to join our world-class team. Explore opportunities in Drone Tech, AI, and Engineering.";

    const internshipHeading = homeData?.internshipSection?.heading || "Internship Programme";
    const internshipDesc = homeData?.internshipSection?.description || "Empowering the next generation of innovators. Gain hands-on experience in Drone Tech, AI, and IoT with our intensive 3-month training program.";
    const internshipLink = homeData?.internshipSection?.applyLink || "https://forms.gle/bPkBxkdAHwDDrFJm6";
    const internshipImage = homeData?.internshipSection?.image ? urlFor(homeData.internshipSection.image).url() : "/mediafiles/news and media/IMG_1851.jpg";

    const sustainabilityHeading = homeData?.sustainabilitySection?.heading || "Sustainability & CSR";
    const sustainabilityDesc = homeData?.sustainabilitySection?.description || "We are committed to building societal and business value together. Driving sustainable growth across all operations while empowering communities through innovation and care.";
    const sustainabilityBanner = homeData?.sustainabilitySection?.bannerImage ? urlFor(homeData.sustainabilitySection.bannerImage).url() : "/mediafiles/news and media/IMG_3979.jpg";


    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };



    return (
        <div className="bg-background text-primary selection:bg-accent selection:text-white">
            <SEO title={"Home"} description={"CopterCode - Premium Engineering & AI Solutions"} />

            {/* Note: Hero will use its internal default if data prop fields are missing */}
            <Hero data={homeData?.heroSection || null} />

            {/* Scrolling Announcement Bar */}
            <ScrollingAnnouncementBar data={homeData?.scrollingAnnouncementBar || FALLBACK_SCROLLING_BAR} />

            {/* Our Businesses Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="py-0 relative"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[800px]">
                    <div className="bg-white border-r border-border p-12 lg:p-24 flex flex-col justify-center relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeBusiness}
                                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                transition={{ duration: 1.2, ease: "circOut" }}
                                className="relative z-10 flex flex-col items-start"
                            >
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                                    className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-6 block flex items-center"
                                >
                                    <span className="w-2 h-2 bg-accent mr-2 rotate-45"></span>
                                    {businessHeading}
                                </motion.span>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                                    className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8 text-primary"
                                >
                                    {currentBusiness.title.split('&')[0]} <br />
                                    <span className="text-primary/70">
                                        {currentBusiness.title.includes('&') ? '& ' + currentBusiness.title.split('&')[1] : ''}
                                    </span>
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                                    className="text-lg text-secondary leading-relaxed mb-12 max-w-xl"
                                >
                                    {currentBusiness.description}
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
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
                                            <motion.video
                                                key={videoSrc}
                                                src={videoSrc}
                                                initial={{ opacity: 0, scale: 1.1 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 1.2, ease: "circOut" }}
                                                className="w-full h-full object-cover"
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
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
                                        onClick={() => setActiveBusiness(index)}
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
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
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
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
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
                        <h2 className="text-3xl font-display font-medium mb-2 text-primary">CopterCode in Action</h2>
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
                                className="min-w-[350px] md:min-w-[450px] aspect-[16/9] bg-surface-highlight rounded-3xl overflow-hidden relative group snap-center border border-border shadow-md hover:shadow-xl transition-all duration-300"
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
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <div>
                            <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                                Stay Updated
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-medium text-primary">Latest Insights</h2>
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
                                    <img src={item.img} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" alt={item.title} />
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
                                <span className="text-6xl font-bold text-primary">{advTechStat}</span>
                                <span className="text-3xl font-bold text-primary mb-2">{advTechUnit}</span>
                            </div>
                            <h4 className="text-2xl text-secondary font-medium mb-1">{advTechLabel}</h4>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-border relative shadow-2xl bg-surface">
                            {(() => {
                                const potentialId = getVideoId(advTechVideo);
                                const isYoutube = /^[a-zA-Z0-9_-]{11}$/.test(potentialId);

                                if (isYoutube && !advTechVideo?.includes('pexels')) { // Pexels URLs might look like IDs so be careful, but mainly check for youtube domains in regex if needed. Our regex handles youtube domains. The simple ID check might flag some file names as IDs. But let's stick to the regex which checks for youtube patterns if URL is full.
                                    // Actually the regex `getVideoId` handles full URLs correctly.

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
                                                    playlist: potentialId, // Loop needs playlist for single video
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
                                        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                                            <source src={advTechVideo} type="video/mp4" />
                                        </video>
                                    );
                                }
                            })()}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </div>
                </div>
            </section>

            {/* INTERNSHIP SECTION (New) */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={internshipImage}
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

                            <div className="grid grid-cols-3 gap-6 mb-10 border-y border-border py-8">
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

                        <div className="relative">
                            <div className="aspect-square rounded-3xl overflow-hidden border border-border relative bg-surface shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                                <img
                                    src="/mediafiles/news and media/IMG_1851.jpg"
                                    alt="Internship at CopterCode"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8 text-white">
                                    <h4 className="text-2xl font-bold mb-2">Real-World Projects</h4>
                                    <p className="text-white/80 text-sm">Join students from top universities working on cutting-edge aerospace challenges.</p>
                                </div>
                            </div>
                            {/* Decorative element */}
                            <div className="absolute -z-10 top-10 -right-10 w-full h-full rounded-3xl border-2 border-accent/20 bg-transparent rotate-6 hidden lg:block" />
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
                        <img
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
            <section className="py-24 bg-background border-t border-border">
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
                                                            autoplay: 1,
                                                            mute: 1,
                                                            controls: 1,
                                                            rel: 0,
                                                            modestbranding: 1
                                                        },
                                                    }}
                                                    className="w-full h-full"
                                                    iframeClassName="w-full h-full object-cover"
                                                    onEnd={nextTestimonial}
                                                />
                                            );
                                        } else {
                                            return (
                                                <video
                                                    src={rawUrl}
                                                    className="w-full h-full object-cover"
                                                    autoPlay
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
                        <img
                            src={globalFootprintSrc}
                            alt={"Global Footprint"}
                            className="w-full h-auto mix-blend-normal"
                        />
                    </div>
                </div>
            </section>

            <ImpactTabs data={homeData?.ourPhilosophySection || null} />
        </div>
    );
};

export default Home;
