
import { useState, useEffect } from "react";
import { client } from "../lib/sanity";
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { Calendar, MapPin, ArrowRight, Target, Package, Scale, ScrollText, Trophy, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import OptimizedImage from '../components/OptimizedImage';
import { Link } from 'react-router-dom';


const Hackathon = () => {
    const [sanityData, setSanityData] = useState(null);

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
            hackathonsList[] {
                ...,
                image { asset->{ url } }
            }
        }`;
        client.fetch(query).then(data => {
            if (data) {
                setSanityData({
                    seo: data.seo,
                    heroTitle: data.hero?.title,
                    heroSubtitle: data.hero?.subtitle,
                    hackathonsList: (data.hackathonsList || []).map(hackathon => {
                        // Check if Sanity returned a valid image URL
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
            }
        }).catch(console.error);
    }, []);

    const seoTitle = sanityData?.seo?.metaTitle || "Hackathons";
    const seoDesc = sanityData?.seo?.metaDescription || "Join CopterCode hackathons, innovation challenges, and coding competitions.";

    const heroTitle = sanityData?.heroTitle || "Hackathons";
    const heroSubtitle = sanityData?.heroSubtitle || "Code the future with CopterCode. Join our innovation challenges and competitions.";

    const hackathonsList = sanityData?.hackathonsList || [
        {
            title: "Code the Skies: National Hackathon",
            date: "April 15-17, 2026",
            location: "Chennai, India",
            category: "Competition",
            description: "A thrilling 48-hour hackathon to develop innovative drone solutions and autonomous systems. Open to students and professionals.",
            fullDescription: "Participants will work in teams of 3-5 to design, prototype, and present cutting-edge drone technology solutions. The event includes mentorship sessions, workshops on embedded systems, and networking opportunities with industry leaders from CopterCode and partner organizations.",
            image: "/_optimized/mediafiles/hackathons/hackathon_drones.webp",
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
            'registration-open': 'bg-emerald-50 text-emerald-700 border-emerald-200',
            'upcoming': 'bg-blue-50 text-blue-700 border-blue-200',
            'ongoing': 'bg-purple-50 text-purple-700 border-purple-200',
            'finished': 'bg-gray-100 text-gray-600 border-gray-200',
            'winners-announced': 'bg-amber-50 text-amber-700 border-amber-200'
        };
        return colors[status] || 'bg-surface text-accent border-border';
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
        <div className="bg-background min-h-screen text-primary overflow-x-hidden">
            <SEO title={seoTitle} description={seoDesc} />
            <PageHeader
                title={heroTitle}
                subtitle={heroSubtitle}
            />

            {/* Featured Hackathons Section */}
            {featuredHackathons.length > 0 && (
                <section className="relative py-16 lg:py-24">
                    {/* Subtle background accent */}
                    <div className="absolute top-20 left-0 w-[600px] h-[600px] bg-surface rounded-full blur-[120px] pointer-events-none opacity-60" />

                    <div className="container mx-auto px-6 relative z-10 space-y-12">
                        {featuredHackathons.map((featuredHackathon, fIdx) => (
                            <motion.div
                                key={fIdx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 40, damping: 12 }}
                                viewport={{ once: true, margin: "-50px" }}
                                className="group relative bg-white rounded-3xl overflow-hidden border border-border/60 transition-all duration-500 shadow-lg hover:shadow-2xl"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                    {/* Featured Image */}
                                    <div className="relative h-80 lg:h-full min-h-[400px] overflow-hidden order-2 lg:order-1">
                                        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500" />
                                        {featuredHackathon.image && (
                                            featuredHackathon.image.includes('_optimized') ? (
                                                <img
                                                    src={featuredHackathon.image}
                                                    alt={featuredHackathon.title}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                                />
                                            ) : (
                                                <OptimizedImage
                                                    src={featuredHackathon.image}
                                                    alt={featuredHackathon.title}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                                    sizes="(min-width:1024px) 50vw, 100vw"
                                                />
                                            )
                                        )}
                                    </div>

                                    {/* Featured Content */}
                                    <div className="p-8 lg:p-14 flex flex-col justify-center order-1 lg:order-2 relative z-20 bg-white">
                                        <div>
                                            {/* Status & Category Badges */}
                                            <div className="flex flex-wrap gap-3 mb-8">
                                                <span className={`text-xs font-bold tracking-widest uppercase border px-4 py-2 rounded-full transition-all duration-300 ${getStatusBadgeColor(featuredHackathon.status || 'upcoming')}`}>
                                                    {getStatusLabel(featuredHackathon.status || 'Upcoming')}
                                                </span>
                                                <span className="text-secondary text-xs font-bold tracking-widest uppercase border border-border px-4 py-2 rounded-full bg-surface hover:bg-surface-highlight transition-all">
                                                    {featuredHackathon.category}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-primary mb-6 group-hover:text-accent transition-colors duration-300 leading-tight">
                                                {featuredHackathon.title}
                                            </h2>

                                            {/* Tags */}
                                            {featuredHackathon.tags && featuredHackathon.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-8">
                                                    {featuredHackathon.tags.map((tag, idx) => (
                                                        <span key={idx} className="text-xs text-secondary bg-surface border border-border px-4 py-2 rounded-full hover:bg-surface-highlight transition-colors font-medium">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Description */}
                                            <p className="text-secondary text-lg mb-4 leading-relaxed">
                                                {featuredHackathon.description}
                                            </p>

                                            {/* Full Description */}
                                            {featuredHackathon.fullDescription && featuredHackathon.fullDescription !== featuredHackathon.description && (
                                                <p className="text-secondary/80 text-base mb-8 leading-relaxed">
                                                    {featuredHackathon.fullDescription}
                                                </p>
                                            )}

                                            {/* Date & Location */}
                                            <div className="grid grid-cols-2 gap-8 mb-8">
                                                <div className="flex items-start">
                                                    <Calendar size={20} className="text-accent mr-3 mt-1 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-xs text-secondary/70 uppercase tracking-widest mb-1 font-semibold">Date</p>
                                                        <p className="text-primary font-bold text-base">{featuredHackathon.date}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start">
                                                    <MapPin size={20} className="text-accent mr-3 mt-1 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-xs text-secondary/70 uppercase tracking-widest mb-1 font-semibold">Location</p>
                                                        <p className="text-primary font-bold text-base">{featuredHackathon.location}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Participant Count */}
                                            {featuredHackathon.participantCount > 0 && (
                                                <div className="flex items-center gap-2 mb-8 text-secondary">
                                                    <Users size={18} className="text-accent" />
                                                    <span className="text-sm font-semibold">{featuredHackathon.participantCount.toLocaleString()} Participants</span>
                                                </div>
                                            )}

                                            {/* Goals */}
                                            {featuredHackathon.goals && featuredHackathon.goals.length > 0 && (
                                                <div className="mb-6">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <Target size={18} className="text-accent" />
                                                        <h4 className="text-primary font-bold text-sm uppercase tracking-wider">Goals</h4>
                                                    </div>
                                                    <ul className="space-y-2 pl-7">
                                                        {featuredHackathon.goals.map((goal, gIdx) => (
                                                            <li key={gIdx} className="text-secondary text-sm leading-relaxed list-disc">{goal}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Deliverables */}
                                            {featuredHackathon.deliverables && featuredHackathon.deliverables.length > 0 && (
                                                <div className="mb-6">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <Package size={18} className="text-accent" />
                                                        <h4 className="text-primary font-bold text-sm uppercase tracking-wider">Expected Deliverables</h4>
                                                    </div>
                                                    <ul className="space-y-2 pl-7">
                                                        {featuredHackathon.deliverables.map((item, dIdx) => (
                                                            <li key={dIdx} className="text-secondary text-sm leading-relaxed list-disc">{item}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Judging Criteria */}
                                            {featuredHackathon.judgingCriteria && featuredHackathon.judgingCriteria.length > 0 && (
                                                <div className="mb-6">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <Scale size={18} className="text-accent" />
                                                        <h4 className="text-primary font-bold text-sm uppercase tracking-wider">Judging Criteria</h4>
                                                    </div>
                                                    <ul className="space-y-2 pl-7">
                                                        {featuredHackathon.judgingCriteria.map((criteria, cIdx) => (
                                                            <li key={cIdx} className="text-secondary text-sm leading-relaxed list-disc">{criteria}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Rules */}
                                            {featuredHackathon.rules && featuredHackathon.rules.length > 0 && (
                                                <div className="mb-8">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <ScrollText size={18} className="text-accent" />
                                                        <h4 className="text-primary font-bold text-sm uppercase tracking-wider">Rules & Guidelines</h4>
                                                    </div>
                                                    <ul className="space-y-2 pl-7">
                                                        {featuredHackathon.rules.map((rule, rIdx) => (
                                                            <li key={rIdx} className="text-secondary text-sm leading-relaxed list-disc">{rule}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Prize Info */}
                                            {featuredHackathon.prizePool && (featuredHackathon.prizePool.totalPool || featuredHackathon.prizePool.firstPlace) && (
                                                <div className="bg-surface border border-border rounded-xl p-6 mb-8">
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <Trophy size={20} className="text-accent" />
                                                        <h4 className="text-primary font-bold text-sm uppercase tracking-wider">Prize Information</h4>
                                                    </div>
                                                    {featuredHackathon.prizePool.totalPool && (
                                                        <p className="text-primary font-bold text-xl mb-3">💰 {featuredHackathon.prizePool.totalPool}</p>
                                                    )}
                                                    <div className="space-y-2">
                                                        {featuredHackathon.prizePool.firstPlace && (
                                                            <p className="text-secondary text-sm">🥇 <span className="font-semibold">1st Place:</span> {featuredHackathon.prizePool.firstPlace}</p>
                                                        )}
                                                        {featuredHackathon.prizePool.honorableMention && (
                                                            <p className="text-secondary text-sm">🏅 <span className="font-semibold">Honorable Mention:</span> {featuredHackathon.prizePool.honorableMention}</p>
                                                        )}
                                                        {featuredHackathon.prizePool.careerOpportunity && (
                                                            <p className="text-secondary text-sm mt-3 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">🚀 {featuredHackathon.prizePool.careerOpportunity}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* CTA Button */}
                                        <Link
                                            to={featuredHackathon.registerLink || "/contact"}
                                            className="flex items-center text-white font-bold text-sm tracking-wide uppercase group/btn cursor-pointer w-fit inline-flex transition-all duration-300 bg-accent border border-accent px-8 py-4 rounded-lg hover:bg-accent-dark hover:border-accent-dark hover:shadow-xl transform hover:scale-105"
                                        >
                                            <span>Register Now</span>
                                            <ArrowRight size={16} className="ml-2 text-white group-hover/btn:translate-x-1 transition-transform duration-300" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}
            {/* Regular Hackathons Section */}
            <section className="relative py-16 lg:py-24 bg-surface/40">
                {/* Subtle background decor */}
                <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-surface rounded-full blur-[120px] pointer-events-none opacity-50" />

                <div className="container mx-auto px-6 relative z-10">
                    {regularHackathons.length > 0 && (
                        <>
                            <div className="mb-16">
                                <h3 className="text-4xl lg:text-5xl font-display font-bold text-primary mb-4">More Hackathons</h3>
                                <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent/30 rounded-full"></div>
                            </div>
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0 },
                                    show: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.12
                                        }
                                    }
                                }}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: "-50px" }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {regularHackathons.map((hackathon, idx) => {
                                    return (
                                        <motion.div
                                            key={idx}
                                            variants={{
                                                hidden: { opacity: 0, y: 50 },
                                                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
                                            }}
                                            whileHover={{ y: -8 }}
                                            className="group relative bg-white rounded-2xl overflow-hidden border border-border/60 transition-all duration-500 shadow-md hover:shadow-xl flex flex-col h-full"
                                        >
                                            {/* Image Section */}
                                            <div className="relative h-52 overflow-hidden">
                                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500" />
                                                {hackathon.image && (
                                                    hackathon.image.includes('_optimized') ? (
                                                        <img
                                                            src={hackathon.image}
                                                            alt={hackathon.title}
                                                            loading="lazy"
                                                            decoding="async"
                                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                                        />
                                                    ) : (
                                                        <OptimizedImage
                                                            src={hackathon.image}
                                                            alt={hackathon.title}
                                                            loading="lazy"
                                                            decoding="async"
                                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                                            sizes="(min-width:1024px) 33vw, 100vw"
                                                        />
                                                    )
                                                )}
                                                {/* Status Badge */}
                                                <div className="absolute top-4 left-4 z-20">
                                                    <span className={`text-xs font-bold tracking-widest uppercase border px-3 py-2 rounded-full backdrop-blur-md transition-all duration-300 ${getStatusBadgeColor(hackathon.status || 'upcoming')}`}>
                                                        {getStatusLabel(hackathon.status || 'Upcoming')}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="p-7 flex flex-col flex-grow">
                                                {/* Category */}
                                                <span className="text-accent text-xs font-bold tracking-widest uppercase border border-border px-4 py-2 rounded-full w-fit mb-5 bg-surface hover:bg-surface-highlight transition-all">
                                                    {hackathon.category}
                                                </span>

                                                {/* Title */}
                                                <h3 className="text-xl lg:text-2xl font-display font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                                                    {hackathon.title}
                                                </h3>

                                                {/* Tags */}
                                                {hackathon.tags && hackathon.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {hackathon.tags.slice(0, 3).map((tag, tidx) => (
                                                            <span key={tidx} className="text-xs text-secondary bg-surface border border-border/80 px-3 py-1 rounded-full font-medium hover:bg-surface-highlight transition-all">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {hackathon.tags.length > 3 && (
                                                            <span className="text-xs text-secondary/60 font-semibold self-center">+{hackathon.tags.length - 3}</span>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Description */}
                                                <p className="text-secondary text-sm mb-4 leading-relaxed line-clamp-3 flex-grow">
                                                    {hackathon.description}
                                                </p>

                                                {/* Goals / Deliverables / Judging / Rules summary */}
                                                {(hackathon.goals?.length > 0 || hackathon.deliverables?.length > 0 || hackathon.judgingCriteria?.length > 0 || hackathon.rules?.length > 0) && (
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {hackathon.goals?.length > 0 && (
                                                            <span className="inline-flex items-center gap-1.5 text-xs text-secondary bg-surface border border-border/80 px-3 py-1.5 rounded-full font-medium">
                                                                <Target size={12} className="text-accent" />
                                                                {hackathon.goals.length} Goals
                                                            </span>
                                                        )}
                                                        {hackathon.deliverables?.length > 0 && (
                                                            <span className="inline-flex items-center gap-1.5 text-xs text-secondary bg-surface border border-border/80 px-3 py-1.5 rounded-full font-medium">
                                                                <Package size={12} className="text-accent" />
                                                                {hackathon.deliverables.length} Deliverables
                                                            </span>
                                                        )}
                                                        {hackathon.judgingCriteria?.length > 0 && (
                                                            <span className="inline-flex items-center gap-1.5 text-xs text-secondary bg-surface border border-border/80 px-3 py-1.5 rounded-full font-medium">
                                                                <Scale size={12} className="text-accent" />
                                                                {hackathon.judgingCriteria.length} Criteria
                                                            </span>
                                                        )}
                                                        {hackathon.rules?.length > 0 && (
                                                            <span className="inline-flex items-center gap-1.5 text-xs text-secondary bg-surface border border-border/80 px-3 py-1.5 rounded-full font-medium">
                                                                <ScrollText size={12} className="text-accent" />
                                                                {hackathon.rules.length} Rules
                                                            </span>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Date & Location */}
                                                <div className="space-y-3 mb-5 border-t border-border/60 pt-5">
                                                    <div className="flex items-center text-primary text-sm font-medium">
                                                        <Calendar size={15} className="mr-3 text-accent" />
                                                        {hackathon.date}
                                                    </div>
                                                    <div className="flex items-center text-primary text-sm font-medium">
                                                        <MapPin size={15} className="mr-3 text-accent" />
                                                        {hackathon.location}
                                                    </div>
                                                    {hackathon.participantCount > 0 && (
                                                        <div className="flex items-center text-secondary text-sm font-medium">
                                                            <Users size={15} className="mr-3 text-accent" />
                                                            {hackathon.participantCount.toLocaleString()} Participants
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Prize Info */}
                                                {hackathon.prizePool && (hackathon.prizePool.totalPool || hackathon.prizePool.firstPlace) && (
                                                    <div className="mb-5 bg-surface border border-border rounded-lg px-4 py-3">
                                                        {hackathon.prizePool.totalPool && (
                                                            <p className="text-primary font-bold text-sm">💰 {hackathon.prizePool.totalPool}</p>
                                                        )}
                                                        {hackathon.prizePool.firstPlace && (
                                                            <p className="text-secondary text-xs mt-1">🥇 1st: {hackathon.prizePool.firstPlace}</p>
                                                        )}
                                                        {hackathon.prizePool.honorableMention && (
                                                            <p className="text-secondary text-xs mt-1">🏅 Mention: {hackathon.prizePool.honorableMention}</p>
                                                        )}
                                                        {hackathon.prizePool.careerOpportunity && (
                                                            <p className="text-secondary text-xs mt-1.5 pt-1.5 border-t border-border/60">🚀 {hackathon.prizePool.careerOpportunity}</p>
                                                        )}
                                                    </div>
                                                )}

                                                {/* CTA Button */}
                                                <Link
                                                    to={hackathon.registerLink || "/contact"}
                                                    className="flex items-center text-white font-bold text-xs tracking-wide uppercase group/btn cursor-pointer w-full justify-center px-5 py-3.5 rounded-lg transition-all duration-300 bg-accent hover:bg-accent-dark hover:shadow-lg transform hover:scale-[1.02]"
                                                >
                                                    <span>Register Now</span>
                                                    <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Hackathon;
