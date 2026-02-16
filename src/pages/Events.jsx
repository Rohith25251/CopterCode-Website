
import { useState, useEffect } from "react";
import { client } from "../lib/sanity";
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import OptimizedImage from '../components/OptimizedImage';
import { Link } from 'react-router-dom';


const Events = () => {
    const [sanityData, setSanityData] = useState(null);

    useEffect(() => {
        const query = `*[_type == "eventsPage"][0]{
            ...,
            eventsList[] {
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
                    eventsList: data.eventsList?.map(event => ({
                        ...event,
                        image: event.image?.asset?.url
                    }))
                });
            }
        }).catch(console.error);
    }, []);

    const seoTitle = sanityData?.seo?.metaTitle || "Events";
    const seoDesc = sanityData?.seo?.metaDescription || "Upcoming events, workshops, and conferences by CopterCode.";

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

    return (
        <div className="bg-background min-h-screen text-primary overflow-x-hidden">
            <SEO title={seoTitle} description={seoDesc} />
            <PageHeader
                title={heroTitle}
                subtitle={heroSubtitle}
            />

            <section className="relative py-24">
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

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.2
                                }
                            }
                        }}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid gap-12"
                    >
                        {eventsList.map((event, idx) => {
                            const dateParts = getDateParts(event.date);
                            return (
                                <motion.div
                                    key={idx}
                                    variants={{
                                        hidden: { opacity: 0, y: 50 },
                                        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
                                    }}
                                    whileHover={{ y: -5 }}
                                    // Changed bg to surface, border to border, shadow to lg
                                    className="group relative bg-surface rounded-3xl overflow-hidden border border-border hover:border-accent/30 transition-all duration-500 shadow-xl hover:shadow-2xl"
                                >
                                    <div className="flex flex-col lg:flex-row">
                                        {/* Date Badge (Mobile) */}
                                        <div className="lg:hidden p-6 pb-0 flex items-center justify-between">
                                            <span className="text-accent text-sm font-bold tracking-widest uppercase border border-accent/20 px-3 py-1 rounded-full">
                                                {event.category}
                                            </span>
                                            <div className="flex items-center text-secondary text-sm">
                                                <Calendar size={14} className="mr-2 text-accent" />
                                                {event.date}
                                            </div>
                                        </div>

                                        {/* Image Section */}
                                        <div className="lg:w-2/5 relative h-64 lg:h-auto overflow-hidden">
                                            <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-20 transition-opacity z-10 duration-500" />
                                            {event.image && (
                                                <OptimizedImage
                                                    src={event.image}
                                                    alt={event.title}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                                                    sizes="(min-width:1024px) 40vw, 100vw"
                                                />
                                            )}
                                            {/* Date Badge (Desktop) */}
                                            <div className="absolute top-6 left-6 hidden lg:flex flex-col items-center bg-background/90 backdrop-blur-md rounded-xl p-4 border border-border shadow-lg group-hover:scale-105 transition-transform duration-300">
                                                {/* Changed text-white to text-primary */}
                                                <span className="text-3xl font-bold text-primary">{dateParts.day}</span>
                                                <span className="text-xs text-accent font-bold uppercase tracking-wider">{dateParts.month}</span>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                                            <div className="hidden lg:flex items-center space-x-4 mb-6">
                                                <span className="text-accent text-xs font-bold tracking-widest uppercase border border-accent/20 px-3 py-1 rounded-full">
                                                    {event.category}
                                                </span>
                                                <div className="flex items-center text-secondary text-sm">
                                                    <MapPin size={14} className="mr-2 text-accent" />
                                                    {event.location}
                                                </div>
                                            </div>

                                            {/* Changed text-white to text-primary */}
                                            <h2 className="text-3xl font-display font-bold text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                                                {event.title}
                                            </h2>

                                            {/* Changed border-white/5 to border-border */}
                                            <p className="text-secondary text-lg mb-8 leading-relaxed border-l-2 border-border pl-4 group-hover:border-accent/40 transition-colors duration-300">
                                                {event.description}
                                            </p>

                                            <Link
                                                to={event.registerLink || "/contact"}
                                                className="flex items-center text-primary font-bold text-sm tracking-wide uppercase group/btn cursor-pointer w-fit inline-flex hover:text-accent transition-colors duration-300"
                                            >
                                                <span>Register Interest</span>
                                                <ArrowRight size={16} className="ml-2 text-accent" />
                                            </Link>

                                            {/* Mobile Location */}
                                            <div className="lg:hidden mt-6 pt-6 border-t border-border flex items-center text-secondary text-sm">
                                                <MapPin size={14} className="mr-2 text-accent" />
                                                {event.location}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Events;
