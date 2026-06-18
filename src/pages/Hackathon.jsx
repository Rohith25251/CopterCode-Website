
import { useState, useEffect } from "react";
import { client, urlFor } from "../lib/sanity";
import SEO from '../components/SEO';
import { Calendar, MapPin, ArrowRight, Target, Package, Scale, ScrollText, Trophy, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from '../components/OptimizedImage';
import { Link } from 'react-router-dom';
import BackButton from '../components/ui/BackButton';


const Hackathon = () => {
    const [sanityData, setSanityData] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const getFallbackImage = (category, title) => {
        const text = ((category || '') + " " + (title || '')).toLowerCase();
        if (text.includes("blockchain") || text.includes("crypto") || text.includes("forge")) return "/_optimized/mediafiles/hackathons/hackathon_blockchain.webp";
        if (text.includes("ai") || text.includes("amadeus")) return "/_optimized/mediafiles/hackathons/hackathon_ai.webp";
        if (text.includes("quantum")) return "/_optimized/mediafiles/hackathons/hackathon_quantum.webp";
        if (text.includes("space") || text.includes("water") || text.includes("cassini")) return "/_optimized/mediafiles/hackathons/hackathon_space_water.webp";
        if (text.includes("creative") || text.includes("web") || text.includes("vibe")) return "/_optimized/mediafiles/hackathons/hackathon_creative.webp";
        return "/_optimized/mediafiles/hackathons/hackathon_drones.webp";
    };

    useEffect(() => {
        const query = `*[_type == "hackathonPage"][0]{
            ...,
            heroSlides[] {
                ...,
                image { asset->{ url } }
            },
            hackathonsList[] {
                ...,
                image { asset->{ url } },
                secondImage { asset->{ url } }
            }
        }`;
        client.fetch(query)
            .then(data => {
                if (data) {
                    console.log('✅ Hackathon page data loaded from Sanity');
                    console.log('   - Hackathons:', data.hackathonsList?.length || 0);
                    
                    setSanityData({
                        seo: data.seo,
                        heroSlides: data.heroSlides?.map(slide => ({
                            ...slide,
                            image: slide.image?.asset?.url
                        })),
                        hackathonsList: (data.hackathonsList || []).map(hackathon => {
                            let imgUrl = hackathon.image?.asset?.url;

                            // If no valid HTTP URL exists, use the mapped optimized image
                            if (!imgUrl || !imgUrl.startsWith('http')) {
                                imgUrl = getFallbackImage(hackathon.category, hackathon.title);
                            }

                            return {
                                ...hackathon,
                                image: imgUrl
                            };
                        })
                    });
                } else {
                    console.warn('⚠️ No hackathon page data from Sanity - using fallbacks');
                }
            })
            .catch(err => {
                console.error('❌ Error fetching hackathon page:', err.message || err);
            });
    }, []);

    const seoTitle = sanityData?.seo?.metaTitle || "Hackathons | Innovation Challenges & Competitions";
    const seoDesc = sanityData?.seo?.metaDescription || "Join CopterCode hackathons and innovation challenges. Compete in drone technology, AI/ML, blockchain, and autonomous systems with prize pools and industry mentorship.";

    const DEFAULT_HERO_SLIDES = [
        {
            image: "/mediafiles/Home/IMG_1851.jpg",
            category: "AI & Blockchain",
            title: "Where AI Meets Flight Control",
            quote: "Empowering skies with advanced intelligence. We are developing the machine learning systems that power next-gen collision avoidance.",
            ctaLabel: "Explore AI Challenges",
            ctaLink: "/contact"
        },
        {
            image: "/mediafiles/Home/IMG_3322.jpg",
            category: "Sustainability",
            title: "Space Tech for Sustainability",
            quote: "A thrilling 48-hour challenge to develop innovative autonomous flight systems and pathfinding algorithms.",
            ctaLabel: "Explore Sustainability",
            ctaLink: "/contact"
        },
        {
            image: "/mediafiles/Home/IMG_3854.jpg",
            category: "Web Development",
            title: "Vibe Coding for Creatives",
            quote: "Collaborate with top developers and industry experts to shape next-generation unmanned aerial vehicle architectures.",
            ctaLabel: "Explore Web Challenges",
            ctaLink: "/contact"
        }
    ];

    const heroSlides = (sanityData?.heroSlides && sanityData.heroSlides.length > 0) ? sanityData.heroSlides : DEFAULT_HERO_SLIDES;

    useEffect(() => {
        if (heroSlides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroSlides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [heroSlides]);

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % heroSlides.length);
    };

    const handleHeroCTAClick = (category) => {
        if (!category) return;
        
        // Find categories from the regular hackathons list
        const categories = ["All", ...new Set(regularHackathons.map(h => h.category).filter(Boolean))];
        
        // Find if there is a matching category in the filter list (case-insensitive & trimmed)
        const trimmedCategory = category.trim().toLowerCase();
        const matchedCategory = categories.find(c => {
            const trimmedC = c.trim().toLowerCase();
            return trimmedC === trimmedCategory || 
                   trimmedCategory.includes(trimmedC) || 
                   trimmedC.includes(trimmedCategory);
        });
        
        if (matchedCategory) {
            setSelectedCategory(matchedCategory);
        } else {
            // Set to category directly if it is not in the list but represents a valid filter category
            setSelectedCategory(category);
        }

        // Scroll down smoothly to the category filter section
        const element = document.getElementById("more-hackathons-section");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const hackathonsList = sanityData?.hackathonsList || [
        {
            title: "Code the Skies: National Hackathon",
            date: "April 15-17, 2026",
            location: "Chennai, India",
            category: "Competition",
            description: "A thrilling 48-hour hackathon to develop innovative drone solutions and autonomous systems. Open to students and professionals.",
            fullDescription: "Participants will work in teams of 3-5 to design, prototype, and present cutting-edge drone technology solutions. The event includes mentorship sessions, workshops on embedded systems, and networking opportunities with industry leaders from CopterCode and partner organizations.",
            image: "/_optimized/mediafiles/hackathons/hackathon_drones.webp",
            secondImage: "/_optimized/mediafiles/hackathons/hackathon_ai.webp",
            registerLink: "/contact",
            status: "upcoming",
            tags: ["Innovation", "Drones", "Automation"],
            featured: true,
            goals: [
                "Develop innovative drone-based solutions for real-world challenges",
                "Foster collaboration between students and industry professionals",
                "Advance autonomous systems and embedded software development"
            ],
            deliverables: [
                "Working prototype or proof-of-concept demo",
                "Technical documentation and architecture overview",
                "5-minute pitch presentation to the judging panel"
            ],
            judgingCriteria: [
                "Innovation and creativity of the solution",
                "Technical complexity and implementation quality",
                "Real-world feasibility and impact potential",
                "Quality of presentation and documentation"
            ],
            rules: [
                "Teams of 3-5 members required",
                "All code must be written during the hackathon",
                "Open-source libraries and frameworks are allowed",
                "Projects must align with the drone/autonomous systems theme"
            ],
            prizePool: {
                totalPool: "₹5,00,000",
                firstPlace: "₹2,50,000 + Internship at CopterCode",
                honorableMention: "₹50,000 per team",
                careerOpportunity: "Top performers will receive priority consideration for full-time roles and internships at CopterCode"
            },
            participantCount: 500
        },
        {
            title: "Kraken Forge - Build the tools beneath the surface",
            date: "December 8-24, 2025",
            location: "Online",
            category: "Engineering Challenge",
            description: "A global engineering hackathon to build high-performance tools and SDKs. Open for engineers, developers, and system designers passionate about crypto.",
            image: "/_optimized/mediafiles/hackathons/hackathon_blockchain.webp",
            registerLink: "/contact",
            status: "finished",
            tags: ["Blockchain", "Fintech", "Cryptocurrency"],
            featured: false,
            goals: [
                "Build high-performance developer tools for blockchain",
                "Create SDKs that simplify crypto integration"
            ],
            deliverables: [
                "Working SDK or developer tool",
                "Documentation and usage guide"
            ],
            judgingCriteria: [
                "Performance and reliability",
                "Developer experience and ease of use",
                "Code quality and documentation"
            ],
            prizePool: {
                totalPool: "$15,000 USDG",
                firstPlace: "$8,000",
                honorableMention: "$2,000"
            },
            participantCount: 1200
        },
        {
            title: "Quantum-Safe Hackathon",
            date: "March 1-15, 2026",
            location: "San Francisco, USA",
            category: "Tech Innovation",
            description: "Building the post-quantum solutions on Cellframe. Join us to develop quantum-safe cryptography and infrastructure.",
            image: "/_optimized/mediafiles/hackathons/hackathon_quantum.webp",
            registerLink: "/contact",
            status: "registration-open",
            tags: ["Blockchain", "Cryptography", "Web3"],
            featured: false,
            rules: [
                "Individual or team participation (up to 4 members)",
                "Must use Cellframe SDK",
                "All submissions must be quantum-safe"
            ],
            prizePool: {
                totalPool: "$20,000",
                firstPlace: "$10,000",
                honorableMention: "$3,000",
                careerOpportunity: "Winners may receive offers for research positions"
            }
        },
        {
            title: "Amadeus Genesis Hack",
            date: "February 15 - March 10, 2026",
            location: "Virtual",
            category: "AI & Blockchain",
            description: "Join the Amadeus Genesis Hack to build autonomous agents and benchmark AI solutions. Open to developers passionate about AI infrastructure.",
            image: "/_optimized/mediafiles/hackathons/hackathon_ai.webp",
            registerLink: "/contact",
            status: "ongoing",
            tags: ["Artificial Intelligence", "Cryptocurrency", "Zero-Knowledge"],
            featured: false,
            deliverables: [
                "Autonomous agent implementation",
                "Benchmark results and analysis"
            ],
            judgingCriteria: [
                "Agent autonomy and reliability",
                "Innovation in AI approach"
            ]
        },
        {
            title: "CASSINI Hackathon - Space for Water",
            date: "April 1-30, 2026",
            location: "Remote",
            category: "Sustainability",
            description: "Create innovative consumer experiences using EU space technologies. Build solutions for water sustainability and environmental impact.",
            image: "/_optimized/mediafiles/hackathons/hackathon_space_water.webp",
            registerLink: "/contact",
            status: "upcoming",
            tags: ["Agriculture", "Water", "Sustainability", "Space Tech"],
            featured: false,
            goals: [
                "Leverage satellite data for water conservation",
                "Build consumer-facing sustainability tools"
            ]
        },
        {
            title: "Vibe Coding for Creatives",
            date: "May 1-15, 2026",
            location: "Porto, Portugal",
            category: "Web Development",
            description: "An empowering app building experience for non-coders. Turn your ideas into reality with mentors and no-code tools.",
            image: "/_optimized/mediafiles/hackathons/hackathon_creative.webp",
            registerLink: "/contact",
            status: "upcoming",
            tags: ["Web3", "No-Code", "Social Good"],
            featured: false
        }
    ];

    const getStatusBadgeColor = (status) => {
        const colors = {
            'registration-open': 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 backdrop-blur-md',
            'upcoming': 'bg-blue-500/10 text-blue-600 border-blue-500/20 backdrop-blur-md',
            'ongoing': 'bg-purple-500/10 text-purple-600 border-purple-500/20 backdrop-blur-md',
            'finished': 'bg-slate-500/10 text-slate-600 border-slate-500/20 backdrop-blur-md',
            'winners-announced': 'bg-amber-500/10 text-amber-600 border-amber-500/20 backdrop-blur-md'
        };
        return colors[status] || 'bg-white/90 text-slate-800 border-slate-200/50 backdrop-blur-md';
    };

    const getStatusLabel = (status) => {
        const labels = {
            'registration-open': 'Registration Open',
            'upcoming': 'Upcoming',
            'ongoing': 'Ongoing',
            'finished': 'Finished',
            'winners-announced': 'Winners Announced'
        };
        return labels[status] || status;
    };

    const getFeaturedStatusBadgeColor = (status) => {
        const colors = {
            'registration-open': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            'upcoming': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            'ongoing': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
            'finished': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
            'winners-announced': 'bg-amber-500/10 text-amber-400 border-amber-500/20'
        };
        return colors[status] || 'bg-slate-900 text-accent border-slate-800';
    };

    const renderFeaturedTitle = (title) => {
        if (title.includes(":")) {
            const parts = title.split(":");
            return (
                <>
                    {parts[0]}: <span className="text-blue-600">{parts.slice(1).join(":")}</span>
                </>
            );
        }
        const words = title.split(" ");
        if (words.length > 2) {
            const lastWords = words.slice(-2).join(" ");
            const firstWords = words.slice(0, -2).join(" ");
            return (
                <>
                    {firstWords} <span className="text-blue-600">{lastWords}</span>
                </>
            );
        }
        return title;
    };

    const getDateParts = (dateString = "") => {
        const parts = dateString.split(' ');
        if (parts.length >= 2) {
            const dayPart = parts[1].replace(',', '');
            const monthPart = parts[0];
            if (!isNaN(parseInt(dayPart))) {
                return { day: dayPart, month: monthPart };
            }
        }
        return { day: parts[0] ? parts[0].substring(0, 3) : "TBD", month: "" };
    };

    // Separate featured and regular hackathons
    const featuredHackathons = hackathonsList.filter(h => h.featured);
    const regularHackathons = hackathonsList.filter(h => !h.featured);

    return (
        <div className="bg-background min-h-screen text-primary overflow-x-clip relative">
            <SEO title={seoTitle} description={seoDesc} keywords={sanityData?.seo?.keywords || "hackathon, innovation challenge, coding competition, drone technology, AI/ML, blockchain, autonomous systems, tech competition"} />
            
            {/* Floating Back Button */}
            <div className="fixed top-24 left-6 md:left-12 z-50">
                <BackButton />
            </div>

            {/* Full Size Sliding Hero Banner */}
            <section className="relative h-[85vh] md:h-[90vh] min-h-[600px] w-full overflow-hidden bg-slate-950">
                <AnimatePresence>
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1.03 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 1.0, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <img
                            src={heroSlides[currentImageIndex]?.image}
                            alt={heroSlides[currentImageIndex]?.title}
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
                                {heroSlides[currentImageIndex]?.category}
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-black tracking-tight text-white mb-6 leading-[1.1]">
                                {heroSlides[currentImageIndex]?.title}
                            </h1>
                            <p className="text-lg sm:text-xl text-slate-300 font-medium italic mb-2 border-l-4 border-blue-500 pl-4 leading-relaxed max-w-2xl">
                                "{heroSlides[currentImageIndex]?.quote}"
                            </p>

                            {/* CTA Button */}
                            {heroSlides[currentImageIndex]?.ctaLabel && (
                                <button
                                    onClick={() => handleHeroCTAClick(heroSlides[currentImageIndex]?.category)}
                                    className="mt-8 inline-flex items-center px-7 py-3.5 bg-white text-black font-extrabold text-xs tracking-wider uppercase rounded-full hover:bg-slate-100 transition-all duration-300 shadow-lg group transform hover:scale-105"
                                >
                                    <span>{heroSlides[currentImageIndex]?.ctaLabel}</span>
                                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Slide Indicators */}
                {heroSlides.length > 1 && (
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
                        {heroSlides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`h-1.5 transition-all duration-500 rounded-full ${currentImageIndex === idx ? "w-8 bg-blue-500" : "w-2 bg-slate-500/50 hover:bg-slate-500"}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}

                {/* Carousel Arrow Controls */}
                {heroSlides.length > 1 && (
                    <>
                        <button
                            onClick={handlePrevImage}
                            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-950/40 hover:bg-slate-950/70 border border-white/5 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 hidden md:flex"
                            aria-label="Previous Slide"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={handleNextImage}
                            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-950/40 hover:bg-slate-950/70 border border-white/5 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 hidden md:flex"
                            aria-label="Next Slide"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </>
                )}
            </section>

            {/* Featured Hackathons Section */}
            {featuredHackathons.length > 0 && (
                <section className="relative py-16 lg:py-24 bg-background overflow-visible">
                    {/* Subtle background accent */}
                    <div className="absolute top-20 left-0 w-[600px] h-[600px] bg-slate-900 rounded-full blur-[120px] pointer-events-none opacity-40" />

                    <div className="container mx-auto px-6 relative z-10 space-y-12">
                        {featuredHackathons.map((featuredHackathon, fIdx) => (
                            <motion.div
                                key={fIdx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 40, damping: 12 }}
                                viewport={{ once: true, margin: "-50px" }}
                                className="group relative bg-white rounded-3xl overflow-clip border border-slate-100/80 transition-all duration-500 shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
                            >
                                <div className="flex flex-col lg:flex-row gap-0 items-start">
                                    {/* Featured Image */}
                                    <div className="w-full lg:w-[45%] h-72 lg:h-screen lg:sticky lg:top-0 order-2 lg:order-1 relative flex-shrink-0">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 z-10" />
                                        {/* Bottom fade for depth */}
                                        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/30 to-transparent z-20 pointer-events-none hidden lg:block" />

                                        {/* Pinned Featured label */}
                                        <div className="absolute top-6 left-6 z-30 hidden lg:block">
                                            <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase bg-white/10 border border-white/20 text-white px-3 py-1.5 rounded backdrop-blur-md">
                                                Featured
                                            </span>
                                        </div>
                                        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity z-15 duration-500" />
                                        {featuredHackathon.image && (
                                            featuredHackathon.image.includes('_optimized') ? (
                                                <img
                                                    src={featuredHackathon.image}
                                                    alt={featuredHackathon.title}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                                />
                                            ) : (
                                                <OptimizedImage
                                                    src={featuredHackathon.image}
                                                    alt={featuredHackathon.title}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                                    sizes="(min-width:1024px) 45vw, 100vw"
                                                />
                                            )
                                        )}
                                    </div>

                                    {/* Featured Content */}
                                    <div className="pt-12 px-8 pb-16 lg:pt-16 lg:px-14 lg:pb-24 flex flex-col justify-start order-1 lg:order-2 relative z-20 bg-white text-slate-800 w-full lg:w-[55%]">
                                        <div>
                                            {/* Status & Category Badges */}
                                            <div className="flex flex-wrap gap-3 mb-8">
                                                <span className={`text-xs font-bold tracking-widest uppercase border px-4 py-2 rounded-full transition-all duration-300 ${getStatusBadgeColor(featuredHackathon.status || 'upcoming')}`}>
                                                    {getStatusLabel(featuredHackathon.status || 'Upcoming')}
                                                </span>
                                                <span className="text-blue-600 text-xs font-bold tracking-widest uppercase border border-blue-500/20 px-4 py-2 rounded-full bg-blue-50/60 backdrop-blur-sm">
                                                    {featuredHackathon.category}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-display font-black text-slate-900 mb-6 leading-tight">
                                                {renderFeaturedTitle(featuredHackathon.title)}
                                            </h2>

                                            {/* Tags */}
                                            {featuredHackathon.tags && featuredHackathon.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-8">
                                                    {featuredHackathon.tags.map((tag, idx) => (
                                                        <span key={idx} className="text-xs text-slate-650 bg-slate-50 border border-slate-200/60 px-4 py-2 rounded-full hover:bg-slate-100 transition-colors font-semibold">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Description */}
                                            <p className="text-slate-600 text-lg mb-4 leading-relaxed font-medium">
                                                {featuredHackathon.description}
                                            </p>

                                            {/* Full Description */}
                                            {featuredHackathon.fullDescription && featuredHackathon.fullDescription !== featuredHackathon.description && (
                                                <p className="text-slate-500 text-base mb-8 leading-relaxed">
                                                    {featuredHackathon.fullDescription}
                                                </p>
                                            )}

                                            {/* Date & Location */}
                                            <div className="grid grid-cols-2 gap-8 mb-8 border-t border-slate-100 pt-6">
                                                <div className="flex items-start">
                                                    <Calendar size={20} className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-xs text-slate-400 uppercase tracking-widest mb-1 font-bold">Date</p>
                                                        <p className="text-slate-800 font-extrabold text-base">{featuredHackathon.date}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start">
                                                    <MapPin size={20} className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-xs text-slate-400 uppercase tracking-widest mb-1 font-bold">Location</p>
                                                        <p className="text-slate-800 font-extrabold text-base">{featuredHackathon.location}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Participant Count */}
                                            {featuredHackathon.participantCount > 0 && (
                                                <div className="flex items-center gap-2 mb-8 text-slate-600 font-semibold">
                                                    <Users size={18} className="text-blue-600" />
                                                    <span className="text-sm">{featuredHackathon.participantCount.toLocaleString()} Participants</span>
                                                </div>
                                            )}

                                            {/* Goals */}
                                            {featuredHackathon.goals && featuredHackathon.goals.length > 0 && (
                                                <div className="mb-6">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <Target size={18} className="text-blue-600" />
                                                        <h4 className="text-slate-800 font-bold text-sm uppercase tracking-wider">Goals</h4>
                                                    </div>
                                                    <ul className="space-y-2 pl-7">
                                                        {featuredHackathon.goals.map((goal, gIdx) => (
                                                            <li key={gIdx} className="text-slate-600 text-sm leading-relaxed list-disc font-medium">{goal}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Deliverables */}
                                            {featuredHackathon.deliverables && featuredHackathon.deliverables.length > 0 && (
                                                <div className="mb-6">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <Package size={18} className="text-blue-600" />
                                                        <h4 className="text-slate-800 font-bold text-sm uppercase tracking-wider">Expected Deliverables</h4>
                                                    </div>
                                                    <ul className="space-y-2 pl-7">
                                                        {featuredHackathon.deliverables.map((item, dIdx) => (
                                                            <li key={dIdx} className="text-slate-600 text-sm leading-relaxed list-disc font-medium">{item}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Judging Criteria */}
                                            {featuredHackathon.judgingCriteria && featuredHackathon.judgingCriteria.length > 0 && (
                                                <div className="mb-6">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <Scale size={18} className="text-blue-600" />
                                                        <h4 className="text-slate-800 font-bold text-sm uppercase tracking-wider">Judging Criteria</h4>
                                                    </div>
                                                    <ul className="space-y-2 pl-7">
                                                        {featuredHackathon.judgingCriteria.map((criteria, cIdx) => (
                                                            <li key={cIdx} className="text-slate-600 text-sm leading-relaxed list-disc font-medium">{criteria}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Rules */}
                                            {featuredHackathon.rules && featuredHackathon.rules.length > 0 && (
                                                <div className="mb-8">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <ScrollText size={18} className="text-blue-600" />
                                                        <h4 className="text-slate-800 font-bold text-sm uppercase tracking-wider">Rules & Guidelines</h4>
                                                    </div>
                                                    <ul className="space-y-2 pl-7">
                                                        {featuredHackathon.rules.map((rule, rIdx) => (
                                                            <li key={rIdx} className="text-slate-600 text-sm leading-relaxed list-disc font-medium">{rule}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Prize Info */}
                                            {featuredHackathon.prizePool && (featuredHackathon.prizePool.totalPool || featuredHackathon.prizePool.firstPlace) && (
                                                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-6 mb-8">
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <Trophy size={20} className="text-blue-600" />
                                                        <h4 className="text-slate-800 font-bold text-sm uppercase tracking-wider">Prize Information</h4>
                                                    </div>
                                                    {featuredHackathon.prizePool.totalPool && (
                                                        <p className="text-slate-900 font-black text-xl mb-3">💰 {featuredHackathon.prizePool.totalPool}</p>
                                                    )}
                                                    <div className="space-y-2">
                                                        {featuredHackathon.prizePool.firstPlace && (
                                                            <p className="text-slate-655 text-sm font-medium">🥇 <span className="font-bold text-slate-800">1st Place:</span> {featuredHackathon.prizePool.firstPlace}</p>
                                                        )}
                                                        {featuredHackathon.prizePool.honorableMention && (
                                                            <p className="text-slate-655 text-sm font-medium">🏅 <span className="font-bold text-slate-800">Honorable Mention:</span> {featuredHackathon.prizePool.honorableMention}</p>
                                                        )}
                                                        {featuredHackathon.prizePool.careerOpportunity && (
                                                            <p className="text-blue-800 text-sm mt-3 bg-blue-50/60 border border-blue-200/50 rounded-lg px-4 py-3 font-semibold">🚀 {featuredHackathon.prizePool.careerOpportunity}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* CTA Button */}
                                         {featuredHackathon.registerLink && (featuredHackathon.registerLink.startsWith("http://") || featuredHackathon.registerLink.startsWith("https://")) ? (
                                             <a
                                                 href={featuredHackathon.registerLink}
                                                 target="_blank"
                                                 rel="noopener noreferrer"
                                                 className="flex items-center text-white font-bold text-sm tracking-wide uppercase group/btn cursor-pointer w-fit inline-flex transition-all duration-300 bg-[#2E3A4E] border border-[#2E3A4E] px-8 py-4 rounded-lg hover:bg-[#1E293B] hover:shadow-xl transform hover:scale-105"
                                             >
                                                 <span>Register Now</span>
                                                 <ArrowRight size={16} className="ml-2 text-white group-hover/btn:translate-x-1 transition-transform duration-300" />
                                             </a>
                                         ) : (
                                             <Link
                                                 to={featuredHackathon.registerLink || "/contact"}
                                                 className="flex items-center text-white font-bold text-sm tracking-wide uppercase group/btn cursor-pointer w-fit inline-flex transition-all duration-300 bg-[#2E3A4E] border border-[#2E3A4E] px-8 py-4 rounded-lg hover:bg-[#1E293B] hover:shadow-xl transform hover:scale-105"
                                             >
                                                 <span>Register Now</span>
                                                 <ArrowRight size={16} className="ml-2 text-white group-hover/btn:translate-x-1 transition-transform duration-300" />
                                             </Link>
                                         )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}
            {/* Regular Hackathons Section */}
            <section id="more-hackathons-section" className="relative py-16 lg:py-24 bg-surface/40">
                {/* Subtle background decor */}
                <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-surface rounded-full blur-[120px] pointer-events-none opacity-50" />

                <div className="container mx-auto px-6 relative z-10">
                    {regularHackathons.length > 0 && (
                        <>
                            <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                                <div>
                                    <h3 className="text-4xl lg:text-5xl font-display font-bold text-primary mb-4">More Hackathons</h3>
                                    <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent/30 rounded-full"></div>
                                </div>
                            </div>

                            {/* Category filter tabs */}
                            {(() => {
                                const categories = ["All", ...new Set(regularHackathons.map(h => h.category).filter(Boolean))];
                                return (
                                    <div className="flex flex-wrap gap-2.5 mb-10 pb-4 border-b border-border/40 overflow-x-auto scrollbar-none">
                                        {categories.map((cat, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedCategory(cat)}
                                                className={`px-6 py-3 rounded-full text-xs font-extrabold tracking-widest uppercase transition-all duration-300 select-none whitespace-nowrap ${
                                                    selectedCategory === cat
                                                        ? "bg-accent text-white shadow-lg shadow-accent/20"
                                                        : "bg-white text-secondary border border-border/60 hover:bg-surface-highlight hover:text-primary"
                                                }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                );
                            })()}

                            {(() => {
                                const filteredHackathons = selectedCategory === "All"
                                    ? regularHackathons
                                    : regularHackathons.filter(h => h.category === selectedCategory);

                                return (
                                    <motion.div
                                        key={selectedCategory}
                                        variants={{
                                            hidden: { opacity: 0 },
                                            show: {
                                                opacity: 1,
                                                transition: {
                                                    staggerChildren: 0.08
                                                }
                                            }
                                        }}
                                        initial="hidden"
                                        animate="show"
                                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                    >
                                        {filteredHackathons.map((hackathon, idx) => {
                                             return (
                                                 <motion.div
                                                     key={idx}
                                                     variants={{
                                                         hidden: { opacity: 0, y: 30 },
                                                         show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 18 } }
                                                     }}
                                                     whileHover={{ y: -8 }}
                                                     className="group relative h-[520px] w-full [perspective:1000px]"
                                                 >
                                                     <motion.div
                                                         className="relative w-full h-full duration-700"
                                                         style={{ transformStyle: "preserve-3d" }}
                                                         whileHover={{ rotateY: 180 }}
                                                         transition={{ duration: 0.6, ease: "easeInOut" }}
                                                     >
                                                         {/* Front Face */}
                                                         <div
                                                             className="absolute inset-0 w-full h-full flex flex-col bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl"
                                                             style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                                                         >
                                                             {/* Image Section */}
                                                             <div className="relative h-56 w-full overflow-hidden shrink-0">
                                                                 {hackathon.image && (
                                                                     hackathon.image.includes('_optimized') ? (
                                                                         <img
                                                                             src={hackathon.image}
                                                                             alt={hackathon.title}
                                                                             loading="lazy"
                                                                             decoding="async"
                                                                             className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                                                         />
                                                                     ) : (
                                                                         <OptimizedImage
                                                                             src={hackathon.image}
                                                                             alt={hackathon.title}
                                                                             loading="lazy"
                                                                             decoding="async"
                                                                             className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                                                             sizes="(min-width:1024px) 33vw, 100vw"
                                                                         />
                                                                     )
                                                                 )}
                                                                 <span className="absolute top-4 left-4 z-20 px-3.5 py-1.5 bg-blue-500/10 text-blue-400 text-[10px] font-extrabold tracking-[0.2em] uppercase rounded border border-blue-500/20 backdrop-blur-sm">
                                                                     {hackathon.category}
                                                                 </span>
                                                             </div>

                                                             {/* Content Section */}
                                                             <div className="p-8 flex flex-col justify-between flex-grow bg-slate-950 text-white">
                                                                 <div>
                                                                     <h3 className="text-xl sm:text-2xl font-display font-black text-white mb-2 leading-tight">
                                                                         {hackathon.title}
                                                                     </h3>
                                                                     <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400 font-semibold mb-4">
                                                                         <span>CopterCode</span>
                                                                         <span className="text-blue-500 font-bold">•</span>
                                                                         <span>{hackathon.location}</span>
                                                                         <span className="text-blue-500 font-bold">•</span>
                                                                         <span>{hackathon.date}</span>
                                                                     </div>
                                                                     <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                                                                         {hackathon.description}
                                                                     </p>
                                                                 </div>
                                                                 
                                                                 {/* CTA Button */}
                                                                 <div className="mt-auto pt-6">
                                                                     {hackathon.registerLink && (hackathon.registerLink.startsWith("http://") || hackathon.registerLink.startsWith("https://")) ? (
                                                                         <a
                                                                             href={hackathon.registerLink}
                                                                             target="_blank"
                                                                             rel="noopener noreferrer"
                                                                             className="text-slate-400 hover:text-white transition-colors flex items-center font-bold text-xs uppercase tracking-widest gap-2 group cursor-pointer w-fit inline-flex"
                                                                         >
                                                                             <span>REGISTER INTEREST</span>
                                                                             <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                                                                         </a>
                                                                     ) : (
                                                                         <Link
                                                                             to={hackathon.registerLink || "/contact"}
                                                                             className="text-slate-400 hover:text-white transition-colors flex items-center font-bold text-xs uppercase tracking-widest gap-2 group cursor-pointer w-fit inline-flex"
                                                                         >
                                                                             <span>REGISTER INTEREST</span>
                                                                             <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                                                                         </Link>
                                                                     )}
                                                                 </div>
                                                             </div>
                                                         </div>

                                                         {/* Back Face */}
                                                         <div
                                                             className="absolute inset-0 w-full h-full flex flex-col justify-between p-8 bg-slate-900 border border-blue-500/30 rounded-3xl overflow-y-auto shadow-2xl scrollbar-none"
                                                             style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                                                         >
                                                             <div>
                                                                 {/* Header / Title on back */}
                                                                 <span className="text-[9px] font-extrabold tracking-[0.2em] text-blue-400 uppercase mb-2 block">
                                                                     {hackathon.category}
                                                                 </span>
                                                                 <h4 className="text-lg font-display font-black text-white mb-6 leading-tight">
                                                                     {hackathon.title}
                                                                 </h4>

                                                                 {/* Tags */}
                                                                 {hackathon.tags && hackathon.tags.length > 0 && (
                                                                     <div className="mb-6">
                                                                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Key Areas</p>
                                                                         <div className="flex flex-wrap gap-1.5">
                                                                             {hackathon.tags.map((tag, tidx) => (
                                                                                 <span key={tidx} className="text-[9px] text-slate-300 bg-slate-800/80 border border-slate-700/60 px-2.5 py-1 rounded font-semibold uppercase tracking-wider">
                                                                                     {tag}
                                                                                 </span>
                                                                             ))}
                                                                         </div>
                                                                     </div>
                                                                 )}

                                                                 {/* Goals */}
                                                                 {hackathon.goals && hackathon.goals.length > 0 && (
                                                                     <div className="mb-6">
                                                                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Objectives</p>
                                                                         <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-300 leading-relaxed font-semibold">
                                                                             {hackathon.goals.map((goal, gidx) => (
                                                                                 <li key={gidx}>{goal}</li>
                                                                             ))}
                                                                         </ul>
                                                                     </div>
                                                                 )}

                                                                 {/* Rules */}
                                                                 {hackathon.rules && hackathon.rules.length > 0 && (
                                                                     <div className="mb-6">
                                                                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Rules</p>
                                                                         <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-300 leading-relaxed font-semibold">
                                                                             {hackathon.rules.map((rule, ridx) => (
                                                                                 <li key={ridx}>{rule}</li>
                                                                             ))}
                                                                         </ul>
                                                                     </div>
                                                                 )}

                                                                 {/* Prize Pool */}
                                                                 {hackathon.prizePool && (hackathon.prizePool.totalPool || hackathon.prizePool.firstPlace) && (
                                                                     <div className="mb-6 bg-blue-500/5 border border-blue-500/10 rounded-xl p-4">
                                                                         <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2.5">Prize Pool</p>
                                                                         {hackathon.prizePool.totalPool && (
                                                                             <p className="text-white font-extrabold text-base">💰 {hackathon.prizePool.totalPool}</p>
                                                                         )}
                                                                         {hackathon.prizePool.firstPlace && (
                                                                             <p className="text-slate-300 text-xs mt-1.5 font-semibold">🥇 1st: {hackathon.prizePool.firstPlace}</p>
                                                                         )}
                                                                     </div>
                                                                 )}
                                                             </div>

                                                             {/* Footer Link */}
                                                             <div className="pt-4 border-t border-slate-800 shrink-0">
                                                                 {hackathon.registerLink && (hackathon.registerLink.startsWith("http://") || hackathon.registerLink.startsWith("https://")) ? (
                                                                     <a
                                                                         href={hackathon.registerLink}
                                                                         target="_blank"
                                                                         rel="noopener noreferrer"
                                                                         className="text-slate-400 hover:text-white transition-colors flex items-center font-bold text-xs uppercase tracking-widest gap-2 group cursor-pointer w-fit inline-flex"
                                                                     >
                                                                         <span>REGISTER INTEREST</span>
                                                                         <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                                                                     </a>
                                                                 ) : (
                                                                     <Link
                                                                         to={hackathon.registerLink || "/contact"}
                                                                         className="text-slate-400 hover:text-white transition-colors flex items-center font-bold text-xs uppercase tracking-widest gap-2 group cursor-pointer w-fit inline-flex"
                                                                     >
                                                                         <span>REGISTER INTEREST</span>
                                                                         <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                                                                     </Link>
                                                                 )}
                                                             </div>
                                                         </div>
                                                     </motion.div>
                                                 </motion.div>
                                             );
                                         })}
                                    </motion.div>
                                );
                            })()}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Hackathon;
