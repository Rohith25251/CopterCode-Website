import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import YouTube from 'react-youtube';

const SuccessVoices = ({ data }) => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const items = data || []; // Should be passed by Home.jsx or empty. Home.jsx handles fallback logic typically, or we do here.

    // Fallback if no data provided
    if (!items || items.length === 0) {
        // We could return null or a default set. For now, let's assume Home passes data or empty array.
        // But to prevent crash if data is missing, we'll use a placeholder.
        return null;
    }

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % items.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + items.length) % items.length);
    };

    // Helper to get video ID
    const getVideoId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };


    return (
        <section className="py-24 bg-background border-t border-border">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-display font-medium mb-12 text-center text-primary">Voice of Success</h2>

                <div className="max-w-5xl mx-auto relative group">
                    {/* Video Container */}
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
                                    const currentItem = items[currentTestimonial];
                                    // Handle new schema 'videoTestimonial' or old 'videoUrl'/'youtubeId'
                                    const rawUrl = currentItem.videoTestimonial || currentItem.videoUrl || currentItem.youtubeId;

                                    // If rawUrl is just an ID (old schema sometimes only had ID), construct URL or use ID directly.
                                    // The helper handles full URL. If it's just ID, the regex fails.
                                    // Let's broaden the check.
                                    const isYoutubeIdDirectly = /^[a-zA-Z0-9_-]{11}$/.test(rawUrl);
                                    const potentialId = isYoutubeIdDirectly ? rawUrl : getVideoId(rawUrl);

                                    if (potentialId) {
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
                                    } else if (rawUrl) {
                                        // Assume direct file URL
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
                                    } else {
                                        // Fallback if no video
                                        return (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100 p-8 text-center">
                                                <div>
                                                    <p className="text-xl italic mb-4">"{currentItem.testimonialText || currentItem.quote || "Excellent service!"}"</p>
                                                    <h4 className="font-bold">{currentItem.clientName || currentItem.name}</h4>
                                                    <p className="text-sm text-gray-600">{currentItem.clientDesignation || currentItem.role}, {currentItem.companyName || currentItem.company}</p>
                                                </div>
                                            </div>
                                        );
                                    }
                                })()}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Controls */}
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

                    {/* Dots Navigation */}
                    <div className="flex justify-center space-x-2 mt-8">
                        {items.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentTestimonial(idx)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentTestimonial ? 'w-8 bg-accent' : 'bg-black/20 hover:bg-black/40'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SuccessVoices;
