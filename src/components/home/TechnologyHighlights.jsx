import React from 'react';
import { ASSETS } from '../../constants/assets';

const TechnologyHighlights = ({ data }) => {
    // Determine content from data or fallback
    const title = data?.title || (
        <>
            Revolutionizing Logistics & Surveillance with AI-Powered <span className="font-bold">Autonomous Drone Systems</span>
        </>
    );
    const video = data?.backgroundMedia || ASSETS.VIDEOS.MAIN_HERO_BG; // Fallback to hero bg or specific tech video

    // Handle stats: New schema uses 'performanceStats' array. Old one used single fields.
    // We will try to use the first item of the array if available.
    const firstStat = data?.performanceStats?.[0] || {};
    const statValue = firstStat.value || data?.statValue || "500+";
    const statLabel = firstStat.label || data?.statLabel || "Missions Completed Successfully";
    const statUnit = ""; // New schema combines value and unit in 'value' string usually, or we just omit unit if not separate.

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div>
                    <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-6 block flex items-center">
                        <div className="w-8 h-px bg-secondary mr-3"></div>
                        Advanced Technology
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-normal text-primary mb-8 leading-tight">
                        {title}
                    </h2>

                    <div className="mb-12">
                        <div className="flex items-end mb-2">
                            <span className="text-6xl font-bold text-primary">{statValue}</span>
                            <span className="text-3xl font-bold text-primary mb-2">{statUnit}</span>
                        </div>
                        <h4 className="text-2xl text-secondary font-medium mb-1">{statLabel}</h4>
                    </div>
                </div>

                <div className="relative">
                    <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-border relative shadow-2xl bg-surface">
                        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                            <source src={video} type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechnologyHighlights;
