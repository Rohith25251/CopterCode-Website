import { useState, useEffect } from "react";
import { client } from "../lib/sanity";
import SEO from '../components/SEO';
import { Calendar, MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from '../components/OptimizedImage';
import { Link } from 'react-router-dom';
import BackButton from '../components/ui/BackButton';


const HERO_SLIDES = [
    {
        image: "/mediafiles/news and media/IMG_1699.jpg",
        category: "Global Summits",
        title: "Connecting Global Innovators",
        quote: "Join CopterCode's international conferences, summits, and technical showcases. We bring industry experts and visionaries together to shape the future of flight.",
        tag: "Global Events",
        linkText: "Explore Events",
        link: "#all-events"
    },
    {
        image: "/mediafiles/news and media/IMG_3330.jpg",
        category: "Hackathons & Workshops",
        title: "Fostering Next-Gen Talent",
        quote: "Participate in hands-on workshops, hackathons, and research events. Compete with top engineers to build solutions for real-world drone intelligence.",
        tag: "Hackathons",
        linkText: "Join a Challenge",
        link: "/hackathon"
    },
    {
        image: "/mediafiles/news and media/IMG_3322.jpg",
        category: "Industry Dialogues",
        title: "Collaborative Aerospace R&D",
        quote: "Engage in dialogues and seminars with researchers, partners, and defense sector leaders to push the envelope on safe, autonomous systems.",
        tag: "Seminars",
        linkText: "View Schedule",
        link: "#all-events"
    },
    {
        image: "/mediafiles/news and media/IMG_3979.jpg",
        category: "Corporate Events",
        title: "Sharing Our Milestones",
        quote: "Stay connected through our corporate meetups, press releases, and shareholder presentations. Discover CopterCode's journey in global markets.",
        tag: "Corporate",
        linkText: "Stay Updated",
        link: "#all-events"
    }
];

const Events = () => {
    const [sanityData, setSanityData] = useState(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    // Resolved dynamic variables with fallbacks
    const heroSlides = sanityData?.heroSlides || HERO_SLIDES;

    useEffect(() => {
        const query = `*[_type == "eventsPage"][0]{
            ...,
            heroSlides[] {
                ...,
                image { asset->{ url } }
            },
            eventsList[] {
                ...,
                image { asset->{ url } }
            }
        }`;
        client.fetch(query).then(data => {
            if (data) {
                console.log('✅ Events page data loaded from Sanity');
                setSanityData({
                    seo: data.seo,
                    heroTitle: data.hero?.title,
                    heroSubtitle: data.hero?.subtitle,
                    heroSlides: data.heroSlides?.map(slide => ({
                        ...slide,
                        image: slide.image?.asset?.url
                    })),
                    eventsList: data.eventsList?.map(event => ({
                        ...event,
                        image: event.image?.asset?.url
                    })),
                    categoriesConfig: data.categoriesConfig
                });
            } else {
                console.warn('⚠️ No events page data from Sanity - using fallbacks');
            }
        }).catch(err => {
            console.error('❌ Error fetching events page:', err.message || err);
        });
    }, []);

    // Sliding Carousel Autoplay
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [heroSlides]);

    const handlePrevSlide = () => {
        setCurrentSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    const handleNextSlide = () => {
        setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    };

    const seoTitle = sanityData?.seo?.metaTitle || "Events | Conferences & Networking";
    const seoDesc = sanityData?.seo?.metaDescription || "Join CopterCode's global events, conferences, and hackathons. Network with industry leaders in drone technology, AI, and enterprise solutions.";

    const heroTitle = sanityData?.heroTitle || "Events";
    const heroSubtitle = sanityData?.heroSubtitle || "Connect with us at our upcoming global summits, workshops, and exclusive meets.";

    const eventsList = sanityData?.eventsList || [
        {
            title: "Global Autonomous Systems Expo 2026",
            date: "February 28, 2026",
            location: "Marina Bay Sands, Singapore",
            category: "Exhibition",
            description: "Experience the worldwide debut of our spectacular 'Nimbus-X' heavy-lift drone. Join 500+ industry leaders for keynotes on the future of urban air mobility.",
            image: "/mediafiles/news and media/IMG_1699.jpg"
        },
        {
            title: "Code the Skies: National Hackathon",
            date: "April 15-17, 2026",
            location: "IIT Madras Research Park, Chennai",
            category: "Hackathon",
            description: "A 48-hour challenge for developers and engineers to build next-gen swarm intelligence algorithms. $50k in prizes and direct recruitment opportunities.",
            image: "/mediafiles/news and media/IMG_3330.jpg"
        },
        {
            title: "Aerospace Defense Summit",
            date: "May 12, 2026",
            location: "Pragati Maidan, New Delhi",
            category: "Conference",
            description: "Strategic dialogue with defense sector stakeholders on integrating AI-driven surveillance drones for border security and disaster management.",
            image: "/mediafiles/news and media/IMG_3322.jpg"
        },
        {
            title: "Annual Shareholder Meeting 2026",
            date: "June 25, 2026",
            location: "Virtual / CopterCode HQ",
            category: "Corporate",
            description: "Reviewing our FY26 Q1 performance and voting on key strategic initiatives for global expansion.",
            image: "/mediafiles/news and media/IMG_3979.jpg"
        },
        {
            title: "National Drone Tech Symposium",
            date: "October 18, 2026",
            location: "NIMHANS Convention Centre, Bangalore",
            category: "Symposium",
            description: "Deep-dive technical sessions on composite structural designs, advanced carbon-fiber manufacturing, and brushless motor optimizations for commercial UAV weight reductions.",
            image: "/mediafiles/news and media/IMG_3356.jpg"
        },
        {
            title: "Autonomous Swarm AI Challenge",
            date: "August 22-24, 2026",
            location: "CopterCode Flight AI Lab, Hyderabad",
            category: "Challenge",
            description: "An intensive developer challenge targeting indoor autonomous navigation under zero-GPS environments. Top performing models get verified for live fleet deployments.",
            image: "/mediafiles/news and media/IMG_3334.jpg"
        },
        {
            title: "AI Flight Control Workshop",
            date: "November 05, 2026",
            location: "Science City, Kolkata",
            category: "Workshop",
            description: "Hands-on instruction on hardware-in-the-loop (HIL) simulators, custom PX4 autopilot configurations, and real-time telemetry dashboard building.",
            image: "/mediafiles/news and media/IMG_3360.jpg"
        },
        {
            title: "Partner Advisory Board Meeting",
            date: "December 10, 2026",
            location: "Taj Club House, Chennai",
            category: "Partner",
            description: "Annual roundtable summit with our academic research partners and industry collaborators mapping out our 2027 technical roadmap and grant initiatives.",
            image: "/mediafiles/news and media/IMG_3430.jpg"
        }
    ];

    // Helper to safely parse date for the badge
    const getDateParts = (dateString = "") => {
        // Try simple split first if it matches "Month Day, Year"
        const parts = dateString.split(' ');
        if (parts.length >= 2) {
            const dayPart = parts[1].replace(',', '');
            const monthPart = parts[0];
            // Simple validation
            if (!isNaN(parseInt(dayPart))) {
                return { day: dayPart, month: monthPart };
            }
        }
        // Fallback or arbitrary text (e.g. "April 15-17")
        // Just return first two words or so
        return { day: parts[0] ? parts[0].substring(0, 3) : "TBD", month: "" };
    };

    const resolvedCategoriesConfig = sanityData?.categoriesConfig || [
        {
            id: "summits",
            title: "Major Summits & Conferences",
            description: "Leading strategic dialogues and showcasing the next frontier of autonomous aviation worldwide.",
            matchCategories: ["Exhibition", "Conference", "Summit", "Symposium"]
        },
        {
            id: "challenges",
            title: "Developer Hackathons & Workshops",
            description: "Empowering developers and engineers to build next-generation algorithms and control systems.",
            matchCategories: ["Hackathon", "Workshop", "Challenge"]
        },
        {
            id: "corporate",
            title: "Corporate & Partner Meets",
            description: "Engaging stakeholders, sharing financial milestones, and forging key institutional partnerships.",
            matchCategories: ["Corporate", "Shareholder", "Meeting", "Partner"]
        }
    ];

    const matchedEvents = new Set();
    const sections = resolvedCategoriesConfig.map(sec => {
        const events = eventsList.filter(e => {
            const isMatch = sec.matchCategories?.some(cat => e.category?.toLowerCase() === cat.toLowerCase());
            if (isMatch) matchedEvents.add(e);
            return isMatch;
        });
        return { ...sec, events };
    }).filter(sec => sec.events && sec.events.length > 0);

    const otherEvents = eventsList.filter(e => !matchedEvents.has(e));
    if (otherEvents.length > 0) {
        sections.push({
            id: "other",
            title: "Special Events & Meets",
            description: "Specialized workshops, roundtables, and regional networking meets.",
            events: otherEvents
        });
    }

    return (
        <div className="bg-background min-h-screen text-primary overflow-x-hidden">
            <SEO title={seoTitle} description={seoDesc} keywords={sanityData?.seo?.keywords || "events, conferences, hackathons, tech summit, innovation, networking, drone technology"} canonicalUrl="https://coptercode.com/events" />
            
            {/* Back Button Fixed */}
            <div className="fixed top-24 left-6 md:left-12 z-50">
                <BackButton />
            </div>

            {/* Full Size Sliding Hero Banner */}
            <section className="relative h-[85vh] md:h-[90vh] min-h-[600px] w-full overflow-hidden bg-slate-950">
                <AnimatePresence>
                    <motion.div
                        key={currentSlideIndex}
                        initial={{ opacity: 0, scale: 1.03 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 1.0, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <img
                            src={heroSlides[currentSlideIndex]?.image}
                            alt={heroSlides[currentSlideIndex]?.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Soft, premium dark gradient overlay for quote legibility */}
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/20 z-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
                    </motion.div>
                </AnimatePresence>

                {/* Carousel Content */}
                <div className="absolute inset-0 z-20 flex items-center">
                    <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl w-full">
                        <div className="max-w-3xl text-left">
                            <span className="px-3.5 py-1.5 bg-blue-500/10 text-blue-400 text-[10px] font-extrabold tracking-[0.2em] uppercase rounded border border-blue-500/20 inline-block mb-6 backdrop-blur-sm">
                                {heroSlides[currentSlideIndex]?.category}
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-black tracking-tight text-white mb-6 leading-[1.1]">
                                {heroSlides[currentSlideIndex]?.title}
                            </h1>
                            <p className="text-lg sm:text-xl text-slate-300 font-medium italic mb-8 border-l-4 border-blue-500 pl-4 leading-relaxed max-w-2xl">
                                "{heroSlides[currentSlideIndex]?.quote}"
                            </p>
                            <div className="flex items-center space-x-4">
                                {heroSlides[currentSlideIndex]?.link?.startsWith("#") ? (
                                    <a
                                        href={heroSlides[currentSlideIndex]?.link}
                                        className="inline-flex items-center bg-white hover:bg-slate-100 text-black font-extrabold uppercase tracking-widest text-[10px] py-4 px-8 rounded-full shadow-lg hover:shadow-white/20 transition-all duration-300 group"
                                    >
                                        {heroSlides[currentSlideIndex]?.linkText}
                                        <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                ) : (
                                    <Link
                                        to={heroSlides[currentSlideIndex]?.link || "/"}
                                        className="inline-flex items-center bg-white hover:bg-slate-100 text-black font-extrabold uppercase tracking-widest text-[10px] py-4 px-8 rounded-full shadow-lg hover:shadow-white/20 transition-all duration-300 group"
                                    >
                                        {heroSlides[currentSlideIndex]?.linkText}
                                        <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
                    {heroSlides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlideIndex(idx)}
                            className={`h-1.5 transition-all duration-500 rounded-full ${currentSlideIndex === idx ? "w-8 bg-blue-500" : "w-2 bg-slate-500/50 hover:bg-slate-500"}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* Carousel Arrow Controls */}
                <button
                    onClick={handlePrevSlide}
                    className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-950/40 hover:bg-slate-950/70 border border-white/5 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 hidden md:flex"
                    aria-label="Previous Slide"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={handleNextSlide}
                    className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-950/40 hover:bg-slate-950/70 border border-white/5 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 hidden md:flex"
                    aria-label="Next Slide"
                >
                    <ChevronRight size={20} />
                </button>
            </section>

            <section id="all-events" className="relative py-24">
                {/* Background Decor */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, -90, 0],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    className="absolute top-20 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"
                />

                <div className="container mx-auto px-6 relative z-10 max-w-6xl">
                    {sections.map((section) => (
                        <div key={section.id} className="mb-24">
                            {/* Section Header */}
                            <div className="border-b border-border/60 pb-6 mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                                <div className="max-w-2xl">
                                    <h2 className="text-3xl font-display font-black text-primary tracking-tight">
                                        {section.title}
                                    </h2>
                                    <p className="text-secondary text-sm md:text-base mt-2 font-medium">
                                        {section.description}
                                    </p>
                                </div>
                                <span className="text-xs font-bold text-accent tracking-widest uppercase bg-accent/5 border border-accent/10 px-3.5 py-1.5 rounded-full w-fit">
                                    {section.events.length} {section.events.length === 1 ? "Event" : "Events"}
                                </span>
                            </div>

                            {/* Events List for this Section (Customized by Category Type) */}
                            {section.id === "summits" && (
                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0 },
                                        show: {
                                            opacity: 1,
                                            transition: { staggerChildren: 0.1 }
                                        }
                                    }}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, margin: "-50px" }}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                >
                                    {section.events.map((event, idx) => (
                                        <motion.div
                                            key={idx}
                                            variants={{
                                                hidden: { opacity: 0, y: 30 },
                                                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
                                            }}
                                            whileHover={{ y: -6 }}
                                            className="group relative bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-full hover:border-blue-500/50 transition-all duration-500"
                                        >
                                            {/* Image Section */}
                                            <div className="relative h-56 w-full overflow-hidden shrink-0">
                                                {event.image && (
                                                    <OptimizedImage
                                                        src={event.image}
                                                        alt={event.title}
                                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                )}
                                                <span className="absolute top-4 left-4 z-20 px-3.5 py-1.5 bg-blue-500/10 text-blue-400 text-[10px] font-extrabold tracking-[0.2em] uppercase rounded border border-blue-500/20 backdrop-blur-sm">
                                                    {event.category}
                                                </span>
                                            </div>

                                            {/* Content Section */}
                                            <div className="p-8 flex flex-col justify-between flex-grow bg-slate-950 text-white">
                                                <div>
                                                    <h3 className="text-xl sm:text-2xl font-display font-black text-white mb-2 leading-tight">
                                                        {event.title}
                                                    </h3>
                                                    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400 font-semibold mb-4">
                                                        <span>CopterCode</span>
                                                        <span className="text-blue-500 font-bold">•</span>
                                                        <span>{event.location}</span>
                                                        <span className="text-blue-500 font-bold">•</span>
                                                        <span>{event.date}</span>
                                                    </div>
                                                    <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                                                        {event.description}
                                                    </p>
                                                </div>
                                                <Link
                                                    to={event.registerLink || "/contact"}
                                                    className="text-slate-400 hover:text-white transition-colors flex items-center font-bold text-xs uppercase tracking-widest gap-2 group cursor-pointer w-fit inline-flex mt-auto"
                                                >
                                                    <span>Register Interest</span>
                                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}

                            {section.id === "challenges" && (
                                <div className="relative pl-6 sm:pl-8 border-l border-border/80 ml-4 py-4 space-y-16">
                                    {section.events.map((event, idx) => (
                                        <motion.div
                                            key={idx}
                                            variants={{
                                                hidden: { opacity: 0, x: -30 },
                                                show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
                                            }}
                                            initial="hidden"
                                            whileInView="show"
                                            viewport={{ once: true, margin: "-50px" }}
                                            className="relative group"
                                        >
                                            {/* Timeline Bullet Indicator */}
                                            <div className="absolute -left-[31px] sm:-left-[39px] top-4 w-4 h-4 rounded-full bg-accent border-4 border-background group-hover:scale-125 transition-transform duration-300 shadow-md shadow-accent/20 z-10" />
                                            
                                            {/* Timeline Card */}
                                            <div className="bg-surface border border-border group-hover:border-accent/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 shadow-lg hover:shadow-xl transition-all duration-500">
                                                {/* Thumbnail Image */}
                                                {event.image && (
                                                    <div className="md:w-1/4 h-40 md:h-auto rounded-2xl overflow-hidden shrink-0 relative">
                                                        <OptimizedImage
                                                            src={event.image}
                                                            alt={event.title}
                                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    </div>
                                                )}
                                                
                                                {/* Card Content */}
                                                <div className="flex-grow flex flex-col justify-center">
                                                    <div className="flex flex-wrap items-center gap-3 text-xs text-secondary font-bold mb-3">
                                                        <span className="text-accent tracking-widest uppercase border border-accent/20 px-2.5 py-0.5 rounded-md">
                                                            {event.category}
                                                        </span>
                                                        <span className="flex items-center gap-1.5">
                                                            <Calendar size={13} className="text-accent" />
                                                            {event.date}
                                                        </span>
                                                        <span className="text-border">•</span>
                                                        <span className="flex items-center gap-1.5">
                                                            <MapPin size={13} className="text-accent" />
                                                            {event.location}
                                                        </span>
                                                    </div>
                                                    
                                                    <h3 className="text-2xl font-display font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                                                        {event.title}
                                                    </h3>
                                                    <p className="text-secondary text-base mb-6 leading-relaxed">
                                                        {event.description}
                                                    </p>
                                                    
                                                    <Link
                                                        to={event.registerLink || "/contact"}
                                                        className="flex items-center text-primary font-bold text-xs tracking-widest uppercase group/btn w-fit hover:text-accent transition-colors duration-300"
                                                    >
                                                        <span>Register & Join</span>
                                                        <ArrowRight size={14} className="ml-2 text-accent transition-transform duration-300 group-hover/btn:translate-x-1" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {section.id === "corporate" && (
                                <div className="space-y-6">
                                    {section.events.map((event, idx) => (
                                        <motion.div
                                            key={idx}
                                            variants={{
                                                hidden: { opacity: 0, y: 20 },
                                                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
                                            }}
                                            className="group relative bg-surface hover:bg-surface-highlight border-y sm:border border-border/85 sm:rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-500 shadow-lg hover:shadow-2xl border-l-4 border-l-accent/40 hover:border-l-accent"
                                        >
                                            <div className="flex flex-col sm:flex-row gap-6 sm:items-center flex-grow">
                                                {/* Date Display (Premium Calendar Badge) */}
                                                <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl py-3 px-4 flex flex-col items-center justify-center shrink-0 w-24 h-24 text-center shadow-md group-hover:scale-105 transition-transform duration-300 border border-slate-800">
                                                    <span className="text-3xl font-black leading-none text-white">
                                                        {getDateParts(event.date).day}
                                                    </span>
                                                    <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mt-1.5">
                                                        {getDateParts(event.date).month || "MEET"}
                                                    </span>
                                                </div>

                                                {/* Event Photo Thumbnail with Zoom & Shadow */}
                                                {event.image && (
                                                    <div className="w-full sm:w-40 h-44 sm:h-24 rounded-2xl overflow-hidden shrink-0 relative shadow-md border border-border/60">
                                                        <OptimizedImage
                                                            src={event.image}
                                                            alt={event.title}
                                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                    </div>
                                                )}

                                                {/* Text details */}
                                                <div>
                                                    <span className="px-3 py-1 bg-accent/10 text-accent text-[9px] font-extrabold tracking-widest uppercase rounded-md mb-2.5 inline-block">
                                                        {event.category}
                                                    </span>
                                                    <h3 className="text-xl sm:text-2xl font-display font-bold text-primary group-hover:text-accent transition-colors duration-300 leading-tight">
                                                        {event.title}
                                                    </h3>
                                                    <p className="text-secondary text-sm sm:text-base mt-2 max-w-2xl leading-relaxed font-semibold">
                                                        {event.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Location & Action */}
                                            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-6 shrink-0 border-t border-border/40 md:border-t-0 pt-4 md:pt-0">
                                                <span className="flex items-center text-secondary text-xs sm:text-sm font-bold gap-2">
                                                    <MapPin size={14} className="text-accent" />
                                                    {event.location}
                                                </span>
                                                <Link
                                                    to={event.registerLink || "/contact"}
                                                    className="inline-flex items-center bg-slate-950 hover:bg-accent hover:text-black text-white font-extrabold uppercase tracking-widest text-[9px] sm:text-[10px] py-3.5 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg group-hover:shadow-accent/15 group/btn border border-slate-900"
                                                >
                                                    <span>Register Interest</span>
                                                    <ArrowRight size={12} className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {section.id === "other" && (
                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0 },
                                        show: {
                                            opacity: 1,
                                            transition: { staggerChildren: 0.1 }
                                        }
                                    }}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, margin: "-50px" }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                                >
                                    {section.events.map((event, idx) => (
                                        <motion.div
                                            key={idx}
                                            variants={{
                                                hidden: { opacity: 0, y: 20 },
                                                show: { opacity: 1, y: 0 }
                                            }}
                                            whileHover={{ y: -4 }}
                                            className="group p-6 rounded-3xl border border-border bg-surface hover:bg-surface-highlight transition-all duration-300"
                                        >
                                            <span className="text-accent text-[10px] font-extrabold tracking-widest uppercase border border-accent/20 px-2.5 py-1 rounded-md inline-block mb-3">
                                                {event.category}
                                            </span>
                                            <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                                                {event.title}
                                            </h3>
                                            <p className="text-secondary text-sm mb-4 leading-relaxed">{event.description}</p>
                                            <div className="flex items-center justify-between text-xs text-secondary font-semibold">
                                                <span>{event.date}</span>
                                                <span>{event.location}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Events;
