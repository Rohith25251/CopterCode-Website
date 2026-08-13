import { useState, useEffect } from "react";
import SEO from '../components/SEO';
import { Calendar, BookOpen, Users, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from '../components/OptimizedImage';
import { Link } from 'react-router-dom';
import BackButton from '../components/ui/BackButton';
import { client } from '../lib/sanity';

const HERO_SLIDES = [
    {
        image: "/mediafiles/news and media/IMG_1699.jpg",
        category: "Aerospace Research",
        title: "Advancing Swarm UAV Autonomy",
        quote: "Exploring decentralized collision-avoidance and cooperative swarm pathfinding in zero-GPS tactical environments.",
        tag: "Aerospace Publications",
        linkText: "Read Publications",
        link: "#all-articles"
    },
    {
        image: "/mediafiles/news and media/IMG_3330.jpg",
        category: "Edge AI & Vision",
        title: "Embedded Intelligence at the Edge",
        quote: "Real-time computer vision algorithms deployed directly on micro-controller units for crop health classification.",
        tag: "AI Research",
        linkText: "Explore Papers",
        link: "#all-articles"
    },
    {
        image: "/mediafiles/news and media/IMG_3322.jpg",
        category: "Aerospace Control",
        title: "Aerodynamic Path Planning Solutions",
        quote: "Integrating real-time sensor fusion with neural networks to dynamically plan stable trajectories under gusty wind profiles.",
        tag: "Aerodynamic Studies",
        linkText: "View Publications",
        link: "#all-articles"
    }
];

const DEFAULT_TOPICS = [
    {
        id: "aerospace-ai",
        title: "Swarm & Aerospace AI Research",
        description: "Deep-dives into multi-UAV coordination, edge-AI image recognition, and autopilot path optimization.",
        papers: [
            {
                title: "Decentralized Swarm Collision Avoidance Algorithms for Multi-UAV Systems in GPS-Denied Environments",
                authors: "Karthikeyan Sundaresan, R. Srinivasan",
                journal: "Journal of Aerospace Computing",
                date: "March 2024",
                category: "Swarm Intelligence",
                description: "A decentralized navigation framework utilizing optical flow and UWB distance telemetry for high-accuracy obstacle avoidance inside warehouses and under tree canopies.",
                image: "/mediafiles/news and media/IMG_1699.jpg",
                citationLink: "#all-articles"
            },
            {
                title: "Real-Time Embedded Computer Vision for Crop Health Analysis via Low-Altitude Commercial Drones",
                authors: "Karthikeyan Sundaresan, M. Lakshmi",
                journal: "IEEE Transactions on Geoscience",
                date: "September 2023",
                category: "Agricultural UAVs",
                description: "A model-compression workflow deploying lightweight MobileNet backbones on embedded flight-controllers for dynamic crop classification and yield analysis.",
                image: "/mediafiles/news and media/IMG_3330.jpg",
                citationLink: "#all-articles"
            }
        ]
    },
    {
        id: "hardware",
        title: "Drone Hardware & Structures",
        description: "Material optimizations, carbon-fiber composites, and physical structural performance studies.",
        papers: [
            {
                title: "Design Optimizations in Carbon-Fiber Reinforcements for Heavy-Payload Electric Multirotors",
                authors: "Karthikeyan Sundaresan, G. van der Berg",
                journal: "Composite Structures & Materials",
                date: "June 2024",
                category: "Drone Hardware",
                description: "Stress testing customized weave structures and analyzing tensile performance to reduce structural weight while maintaining peak stress boundaries.",
                image: "/mediafiles/Home/3442832E-21FB-4BF3-8CF2-7A91FBCA0302.jpg",
                citationLink: "#all-articles"
            }
        ]
    },
    {
        id: "security",
        title: "Cybersecurity & Fleet Control",
        description: "Securing flight logging telemetry, command link cryptography, and multi-channel communication systems.",
        papers: [
            {
                title: "A Blockchain-Secure Telemetry Log and Control Protocol for Commercial UAV Fleets",
                authors: "Karthikeyan Sundaresan, A. K. Verma",
                journal: "International Journal of Information Security",
                date: "January 2025",
                category: "Cybersecurity",
                description: "Securing control-link signals and flight logger boxes against replay and spoofing attacks through smart contracts and cryptographic ledgers.",
                image: "/mediafiles/news and media/IMG_3322.jpg",
                citationLink: "#all-articles"
            },
            {
                title: "Dynamic Aerodynamic Path Planning for Quadrotors under Variable Wind Disturbances",
                authors: "Karthikeyan Sundaresan, J. Dupont",
                journal: "International Journal of Robotics Research",
                date: "November 2024",
                category: "Aerospace Control",
                description: "Employing predictive reinforcement learning algorithms trained in virtual wind tunnels to optimize quadrotor attitude responses during strong gusts.",
                image: "/mediafiles/news and media/IMG_3979.jpg",
                citationLink: "#all-articles"
            }
        ]
    }
];

const Articles = () => {
    const [sanityData, setSanityData] = useState(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    // Resolved dynamic variables with fallbacks
    const heroSlides = sanityData?.heroSlides || HERO_SLIDES;
    const sections = sanityData?.topics || DEFAULT_TOPICS;

    useEffect(() => {
        const query = `*[_type == "articlesPage"][0]{
            ...,
            heroSlides[] {
                ...,
                image { asset->{ url } }
            },
            topics[] {
                ...,
                papers[] {
                    ...,
                    image { asset->{ url } }
                }
            }
        }`;
        client.fetch(query).then(data => {
            if (data) {
                console.log('✅ Articles page data loaded from Sanity');
                setSanityData({
                    seo: data.seo,
                    heroSlides: data.heroSlides?.map(slide => ({
                        ...slide,
                        image: slide.image?.asset?.url || slide.image
                    })),
                    topics: data.topics?.map(topic => ({
                        ...topic,
                        papers: topic.papers?.map(paper => ({
                            ...paper,
                            image: paper.image?.asset?.url || paper.image
                        }))
                    }))
                });
            } else {
                console.warn('⚠️ No articles page data from Sanity - using fallbacks');
            }
        }).catch(err => {
            console.error('❌ Error fetching articles page:', err.message || err);
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

    const seoTitle = sanityData?.seo?.metaTitle || "Research Articles & Publications | CopterCode";
    const seoDesc = sanityData?.seo?.metaDescription || "Explore scientific publications, research papers, and technical journals authored by the CopterCode team and founder in AI, drone tech, and aerospace.";
    const seoKeywords = sanityData?.seo?.keywords || "articles, publications, research papers, google scholar, drone technology, swarm AI, karthikeyan sundaresan, coptercode R&D";

    return (
        <div className="bg-background min-h-screen text-primary overflow-x-hidden">
            <SEO title={seoTitle} description={seoDesc} keywords={seoKeywords} canonicalUrl="https://www.coptercode.co.in/articles" />
            
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
                                <a
                                    href={heroSlides[currentSlideIndex]?.link}
                                    className="inline-flex items-center bg-white hover:bg-slate-100 text-black font-extrabold uppercase tracking-widest text-[10px] py-4 px-8 rounded-full shadow-lg hover:shadow-white/20 transition-all duration-300 group"
                                >
                                    {heroSlides[currentSlideIndex]?.linkText}
                                    <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </a>
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
                            className="h-1.5 transition-all duration-500 rounded-full bg-slate-500/50 hover:bg-slate-500"
                            style={{ width: currentSlideIndex === idx ? "32px" : "8px", backgroundColor: currentSlideIndex === idx ? "#3b82f6" : "" }}
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

            <section id="all-articles" className="relative py-24">
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
                            {/* Section Header with Badge & Horizontal Separator */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                                <div className="max-w-2xl">
                                    <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-950 tracking-tight">
                                        {section.title}
                                    </h2>
                                    <p className="text-slate-500 text-sm md:text-base mt-2 font-medium">
                                        {section.description}
                                    </p>
                                </div>
                                <span className="text-[10px] font-black text-slate-600 tracking-wider uppercase bg-slate-100 border border-slate-200/80 px-3.5 py-1.5 rounded-full w-fit">
                                    {(section.papers || []).length} {((section.papers || []).length) === 1 ? "PAPER" : "PAPERS"}
                                </span>
                            </div>
                            <hr className="border-slate-200/80 mb-12" />

                            {/* Timeline style rendering for ALL articles pages */}
                            <div className="relative pl-6 sm:pl-8 border-l border-slate-200 ml-4 py-4 space-y-16">
                                {(section.papers || []).map((article, idx) => (
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
                                        <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-3 h-3 rounded-full bg-slate-400 border-2 border-white group-hover:scale-125 transition-transform duration-300 shadow-sm z-10" />
                                        
                                        {/* Timeline Card */}
                                        <div className="bg-[#050c1e] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 shadow-xl border border-slate-900/40 hover:border-slate-800 transition-all duration-500">
                                            {/* Thumbnail Image */}
                                            {article.image && (
                                                <div className="w-full md:w-1/3 aspect-[4/3] max-w-[320px] rounded-2xl overflow-hidden shrink-0 relative shadow-md">
                                                    <OptimizedImage
                                                        src={article.image}
                                                        alt={article.title}
                                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                            )}
                                            
                                            {/* Card Content */}
                                            <div className="flex-grow flex flex-col justify-center text-white">
                                                <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-400 font-bold mb-4">
                                                    <span className="text-blue-400 tracking-wider uppercase bg-blue-900/30 border border-blue-500/20 px-2.5 py-1 rounded">
                                                        {article.category}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Calendar size={13} className="text-blue-400" />
                                                        {article.date}
                                                    </span>
                                                    <span className="text-slate-600">•</span>
                                                    <span className="flex items-center gap-1.5">
                                                        <BookOpen size={13} className="text-blue-400" />
                                                        {article.journal}
                                                    </span>
                                                </div>
                                                
                                                <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 leading-snug">
                                                    {article.title}
                                                </h3>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold mb-5">
                                                    <Users size={13} className="text-blue-400" />
                                                    <span>{article.authors}</span>
                                                </div>
                                                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                                                    {article.description}
                                                </p>
                                                
                                                <a
                                                    href={article.citationLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center text-blue-400 font-bold text-[10px] tracking-widest uppercase group/btn w-fit hover:text-white transition-colors duration-300"
                                                >
                                                    <span>VIEW ARTICLE</span>
                                                    <ArrowRight size={14} className="ml-2 text-blue-400 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Articles;
