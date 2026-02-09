import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Calendar, User, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// 1. CopterCode in Action (Showcase)
export const CinematicShowcase = ({ items }) => {
    const scrollRef = useRef(null);

    // Fallback if no items
    const defaultItems = [
        { label: "Industrial Drones & UAV", imageUrl: "/mediafiles/drone-action.jpg", videoUrl: "" },
        { label: "Digital Services", imageUrl: "/mediafiles/digital-action.jpg", videoUrl: "" },
        { label: "New Energy", imageUrl: "/mediafiles/solar-action.jpg", videoUrl: "" },
        { label: "ERP Solutions", imageUrl: "/mediafiles/erp-action.jpg", videoUrl: "" },
    ];

    const displayItems = items || defaultItems;

    return (
        <section className="py-24 bg-background border-t border-border overflow-hidden">
            <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl md:text-4xl font-display font-medium text-primary mb-2">CopterCode in Action</h2>
                    <div className="w-20 h-1 bg-accent rounded-full" />
                </div>
                <div className="flex space-x-2">
                    {/* Navigation Buttons could go here */}
                </div>
            </div>

            <div className="pl-6 md:pl-0 container mx-auto overflow-x-auto pb-8 hide-scrollbar flex space-x-6 md:grid md:grid-cols-4 md:space-x-4">
                {displayItems.map((item, idx) => (
                    <motion.div
                        key={idx}
                        className="relative min-w-[300px] md:min-w-0 h-[200px] md:h-[250px] rounded-2xl overflow-hidden group cursor-pointer border border-border"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Media */}
                        {item.videoUrl || item.videoFile ? (
                            <video src={item.videoUrl || item.videoFile} className="w-full h-full object-cover" muted loop autoPlay playsInline />
                        ) : (
                            <img src={item.imageUrl || ""} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.label} />
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                        <div className="absolute bottom-4 left-4 right-4">
                            <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg inline-block border border-white/10">
                                <h3 className="text-white text-xs font-bold uppercase tracking-widest">{item.label}</h3>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};


// 2. Announcements
export const AnnouncementsSection = ({ items }) => {
    const defaultItems = [
        { title: "Launching the Future: Global Autonomous Expo", type: "Exhibition", publishedAt: "2026-02-28", description: "Join us in Singapore to witness the debut of our 'Nimbus X' heavy-lift drone." },
        { title: "Building the Intelligence: National Hackathon", type: "Hackathon", publishedAt: "2026-04-15", description: "Help us build the next generation of swarm intelligence algorithms in Chennai." },
        { title: "Securing the Nation: Aerospace Defense Summit", type: "Conference", publishedAt: "2026-05-12", description: "Discussing AI-driven surveillance strategies with defense leaders in New Delhi." }
    ];
    const displayItems = items || defaultItems;

    return (
        <section className="py-24 bg-surface">
            <div className="container mx-auto px-6">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-display font-medium text-primary mb-2">Announcements</h2>
                    <div className="w-20 h-1 bg-accent rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {displayItems.map((item, idx) => (
                        <div key={idx} className="bg-background border border-border rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                            <div className="h-48 overflow-hidden relative bg-surface-highlight">
                                {item.mainImage ? (
                                    <img src={item.mainImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-secondary text-xs uppercase font-bold">No Image</div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <span className="bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                                        {item.type}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2">
                                    {item.title}
                                </h3>
                                <p className="text-secondary text-sm mb-6 line-clamp-3 flex-1">{item.description}</p>

                                <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                                    <div className="flex items-center text-xs text-secondary font-medium">
                                        <Calendar size={14} className="mr-2" />
                                        {item.publishedAt}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// 3. Advanced Technology (Split Section)
export const AdvancedTechSection = ({ data }) => {
    // Data Structure from query: { heading, statValue, statUnit, statLabel, videoUrl, videoFile }
    const videoSrc = data?.videoUrl || data?.videoFile;

    return (
        <section className="py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-secondary text-xs font-bold tracking-[0.2em] uppercase mb-4 block flex items-center">
                            <div className="w-8 h-px bg-accent mr-3" />
                            Advanced Technology
                        </span>
                        <h2 className="text-4xl md:text-5xl font-display font-medium text-primary mb-8 leading-tight">
                            {data?.heading || "Revolutionizing Logistics & Surveillance with AI-Powered Autonomous Drone Systems"}
                        </h2>

                        <div className="mb-8">
                            <div className="flex items-baseline text-accent font-display font-bold">
                                <span className="text-8xl">{data?.statValue || "98"}</span>
                                <span className="text-4xl ml-1">{data?.statUnit || "%"}</span>
                            </div>
                            <p className="text-secondary text-lg mt-2 font-medium">{data?.statLabel || "Operational Efficiency"}</p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-xl rotate-3 opacity-50" />
                        <div className="relative rounded-2xl overflow-hidden aspect-video border border-border shadow-2xl">
                            {videoSrc ? (
                                <video src={videoSrc} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                            ) : (
                                <div className="w-full h-full bg-surface-highlight flex items-center justify-center">
                                    <p className="text-secondary font-bold">Video Preview</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


// 4. Voice of Success (Testimonials)
export const TestimonialsSection = ({ items }) => {
    // Simple single video or carousel of videos. Assuming items is array.
    // Screenshot shows a video player card with navigation arrows.

    // Fallback
    const defaultItem = {
        name: "Testimonial",
        role: "Client",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Place holder
    };

    // For now, if array, pick first or map.
    const item = items?.[0] || defaultItem;
    const videoSrc = item.videoFile || item.genericVideoUrl || item.videoUrl;

    return (
        <section className="py-24 bg-surface text-center">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-display font-medium text-primary mb-12">Voice of Success</h2>

                <div className="max-w-4xl mx-auto relative group">
                    <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-border relative">
                        {videoSrc ? (
                            videoSrc.includes('youtube') || videoSrc.includes('vimeo') ? (
                                <iframe src={videoSrc} className="w-full h-full" frameBorder="0" allowFullScreen title="Testimonial" />
                            ) : (
                                <video src={videoSrc} className="w-full h-full object-cover" controls playsInline />
                            )
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                                <Play className="text-white w-20 h-20 opacity-50" />
                            </div>
                        )}
                    </div>

                    {/* Decoration - Navigation Arrows styling only - non functional for single item */}
                    <div className="absolute top-1/2 -left-12 -translate-y-1/2 hidden md:flex w-10 h-10 rounded-full bg-white shadow-lg items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                        <ArrowRight className="rotate-180 w-4 h-4 text-primary" />
                    </div>
                    <div className="absolute top-1/2 -right-12 -translate-y-1/2 hidden md:flex w-10 h-10 rounded-full bg-white shadow-lg items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                        <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    <div className="w-8 h-1.5 bg-accent rounded-full" />
                    <div className="w-1.5 h-1.5 bg-border rounded-full" />
                    <div className="w-1.5 h-1.5 bg-border rounded-full" />
                </div>
            </div>
        </section>
    );
}


// 5. Global Footprint
export const FootprintSection = ({ imageUrl }) => {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-display font-medium text-primary mb-16">Global Footprint of Our Talent</h2>

                <div className="bg-white p-8 md:p-16 rounded-3xl shadow-sm border border-border mx-auto max-w-5xl">
                    {imageUrl ? (
                        <img src={imageUrl} alt="Global Footprint - Clients" className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity" />
                    ) : (
                        <div className="p-20 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                            Client Logos / Footprint Image Map
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
