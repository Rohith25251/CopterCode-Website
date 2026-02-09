import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import Hero from '../components/Hero';
import ImpactTabs from '../components/ImpactTabs';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { ASSETS } from '../constants/assets';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { client, urlFor } from '../lib/sanity';

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
    const advTechVideo = homeData?.advancedTechSection?.videoFileUrl || homeData?.advancedTechSection?.videoUrl || "https://www.pexels.com/download/video/35033957/";

    // Global Footprint Image
    const globalFootprintSrc = homeData?.globalFootprintImage
        ? urlFor(homeData.globalFootprintImage).url()
        : "/mediafiles/Where Do Our Interns Reached/placements-reach.png";


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

            {/* Announcements Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="py-24 bg-background text-primary relative"
            >
                <div className="container mx-auto px-6">
                    <h2 className="text-5xl font-display font-medium text-primary mb-2">Announcements</h2>
                    <div className="w-20 h-1 bg-accent mb-16"></div>

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
