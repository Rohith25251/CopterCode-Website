import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from '../../components/OptimizedImage';

// Mock Data
const FALLBACK_ANNOUNCEMENTS = [
    {
        title: "CopterCode Secures Series A Funding",
        summary: "Leading tech investors back our vision for autonomous aerial logistics.",
        type: "Corporate",
        date: "Oct 2025",
        img: "/mediafiles/logo.jpeg"
    },
    {
        title: "New Research Partnership with IIT Madras",
        summary: "Collaborating on advanced swarm drone algorithms.",
        type: "R&D",
        date: "Sep 2025",
        img: "/mediafiles/logo.jpeg"
    },
    {
        title: "Launched 'SkyGuard' Surveillance Drone",
        summary: "Our most advanced security drone is now available for enterprise clients.",
        type: "Product",
        date: "Aug 2025",
        img: "/mediafiles/logo.jpeg"
    }
];

const Announcements = ({ data }) => {
    const items = data?.length > 0 ? data : FALLBACK_ANNOUNCEMENTS;

    return (
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
                    {items.map((item, i) => {
                        // Normalize data
                        const title = item.title;
                        const type = item.type || "News";
                        const date = item.date || item.eventDate || item.publishDate;
                        const image = item.announcementImages?.[0] || item.img || item.mainImage || "/mediafiles/logo.jpeg";

                        return (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="group cursor-pointer bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 border border-border"
                            >
                                <div className="aspect-video bg-surface mb-6 overflow-hidden relative rounded-xl">
                                    <OptimizedImage
                                        src={image}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        alt={title}
                                    />
                                </div>
                                <div className="border-l-2 border-accent pl-6 py-1 mb-6">
                                    <h3 className="text-xl font-bold leading-snug text-primary group-hover:text-accent transition-colors">
                                        {title}
                                    </h3>
                                </div>
                                <div className="flex items-center text-xs font-bold tracking-widest text-secondary uppercase space-x-3">
                                    <span className="bg-surface px-3 py-1 rounded-sm">{type}</span>
                                    <span className="text-border">|</span>
                                    <span className="text-secondary/70">{date ? new Date(date).toLocaleDateString() : 'N/A'}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.section>
    );
};

export default Announcements;
