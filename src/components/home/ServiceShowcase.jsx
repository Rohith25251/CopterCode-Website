import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ASSETS } from '../../constants/assets';

// Fallback data
const FALLBACK_VIDEOS = [
    {
        serviceTitle: "Precision Agriculture",
        hoverVideo: ASSETS?.VIDEOS?.DRONES || "/mediafiles/videos/drones.mp4",
        serviceCategory: 'Agriculture Solutions',
        label: 'Agriculture',
        url: ASSETS?.VIDEOS?.DRONES || "/mediafiles/videos/drones.mp4"
    },
    {
        serviceTitle: "Industrial Inspection",
        hoverVideo: ASSETS?.VIDEOS?.INSPECTION || "/mediafiles/videos/inspection.mp4",
        serviceCategory: 'Safety & Compliance',
        label: 'Inspection',
        url: ASSETS?.VIDEOS?.INSPECTION || "/mediafiles/videos/inspection.mp4"
    },
    {
        serviceTitle: "Urban Surveillance",
        hoverVideo: ASSETS?.VIDEOS?.SURVEILLANCE || "/mediafiles/videos/surveillance.mp4",
        serviceCategory: 'Security',
        label: 'Security',
        url: ASSETS?.VIDEOS?.SURVEILLANCE || "/mediafiles/videos/surveillance.mp4"
    },
    {
        serviceTitle: "Logistics Delivery",
        hoverVideo: ASSETS?.VIDEOS?.LOGISTICS || "/mediafiles/videos/logistics.mp4",
        serviceCategory: 'Transport',
        label: 'Logistics',
        url: ASSETS?.VIDEOS?.LOGISTICS || "/mediafiles/videos/logistics.mp4"
    }
];

const ServiceShowcase = ({ data }) => {
    const actionScrollRef = useRef(null);
    const scrollAmount = 400;

    const scrollAction = (direction) => {
        if (actionScrollRef.current) {
            actionScrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // Normalize data to standard structure if mixed
    const items = (data?.length > 0 ? data : FALLBACK_VIDEOS).map(item => ({
        ...item,
        title: item.serviceTitle || item.label,
        category: item.serviceCategory || item.label,
        video: item.hoverVideo || item.url || item.videoUrl
    }));

    return (
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
                {/* Navigation Buttons */}
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

            {/* Horizontal Scroll Carousel */}
            <div
                ref={actionScrollRef}
                className="flex overflow-x-auto gap-6 px-6 pb-12 snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {items.map((video, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -5 }}
                        onMouseEnter={(e) => {
                            const video = e.currentTarget.querySelector('video');
                            if (video) {
                                video._playPromise = video.play();
                                if (video._playPromise !== undefined) {
                                    video._playPromise.catch(() => {});
                                }
                            }
                        }}
                        onMouseLeave={(e) => {
                            const video = e.currentTarget.querySelector('video');
                            if (video) {
                                if (video._playPromise !== undefined) {
                                    video._playPromise.then(() => {
                                        video.pause();
                                    }).catch(() => {});
                                } else {
                                    video.pause();
                                }
                            }
                        }}
                        className="min-w-[350px] md:min-w-[450px] aspect-[16/9] bg-surface-highlight rounded-3xl overflow-hidden relative group snap-center border border-border shadow-md hover:shadow-xl transition-all duration-300"
                    >
                        <video
                            src={video.video}
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 scale-100 group-hover:scale-105 transition-transform"
                            loop
                            muted
                            playsInline
                        />

                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />

                        {/* Label at Bottom Left */}
                        <div className="absolute bottom-6 left-6 z-20">
                            <span className="bg-black/40 backdrop-blur-md text-white border border-white/20 px-4 py-2 rounded-lg text-xs font-extrabold uppercase tracking-widest shadow-lg">
                                {video.title}
                            </span>
                        </div>

                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default ServiceShowcase;
