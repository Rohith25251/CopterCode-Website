import React from 'react';
import { Link } from 'react-router-dom';

const ScrollingAnnouncementBar = ({ data }) => {
    // 1. Safety Checks
    if (!data?.isEnabled) return null;

    const {
        announcements = [],
        scrollSpeed = 50,
        direction = 'left',
        backgroundColor = '#020202',
        textColor = '#ffffff'
    } = data;

    if (!announcements.length) return null;

    // Define a custom high-contrast accent color for the dark bar
    // Since the main project accent is dark (#334155), we need a lighter counterpart for dark backgrounds.
    // Using a bright sky/slate tone that complements the dark steel.
    const DARK_THEME_ACCENT = "text-sky-300";
    const DARK_THEME_ACCENT_BG = "bg-sky-400";

    // 2. Define Content Renderer
    const renderAnnouncements = (passIndex) => announcements.map((item, idx) => {
        const uniqueKey = `${passIndex}-${idx}`;
        const isLink = !!item.link;

        return (
            <div key={uniqueKey} className="flex items-center px-8 md:px-16 shrink-0 relative group/item">

                {/* Text / Link */}
                {isLink ? (
                    <Link
                        to={item.link}
                        className={`text-sm md:text-base font-bold tracking-[0.2em] uppercase text-white hover:text-sky-300 transition-all duration-300 flex items-center gap-3 relative py-2`}
                    >
                        {/* Highlight Dot */}
                        {item.isHighlight && (
                            <span className="relative flex h-2 w-2">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${DARK_THEME_ACCENT_BG} opacity-75`}></span>
                                <span className={`relative inline-flex rounded-full h-2 w-2 ${DARK_THEME_ACCENT_BG}`}></span>
                            </span>
                        )}

                        <span className="relative z-10 transition-transform duration-300 group-hover/item:scale-105">
                            {item.text}
                        </span>

                        {/* Hover Underline Animation */}
                        <span className={`absolute -bottom-1 left-0 w-0 h-[1px] ${DARK_THEME_ACCENT_BG} transition-all duration-500 ease-out group-hover/item:w-full shadow-[0_0_10px_rgba(56,189,248,0.5)]`}></span>
                    </Link>
                ) : (
                    <div className="flex items-center gap-3 py-2 cursor-default select-none">
                        {item.isHighlight && (
                            <span className="relative flex h-2 w-2">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${DARK_THEME_ACCENT_BG} opacity-75`}></span>
                                <span className={`relative inline-flex rounded-full h-2 w-2 ${DARK_THEME_ACCENT_BG}`}></span>
                            </span>
                        )}
                        <span className={`text-sm md:text-base tracking-[0.2em] uppercase transition-colors duration-300 ${item.isHighlight ? 'font-black text-white' : 'font-semibold text-gray-400 group-hover/item:text-gray-200'}`}>
                            {item.text}
                        </span>
                    </div>
                )}

                {/* Separator - Diamond */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-1.5 h-1.5 bg-gray-600 rotate-45 border border-black group-hover/item:bg-sky-400 group-hover/item:border-sky-400 transition-colors duration-500"></div>
            </div>
        );
    });

    // Dynamic styles for the keyframes
    const animationName = `marquee-${direction}`;
    const keyframes = `
        @keyframes ${animationName} {
            0% { transform: translateX(0); }
            100% { transform: translateX(-25%); } 
        }
    `;

    return (
        <div
            className="w-full relative z-40 overflow-hidden border-y border-white/5 bg-black shadow-2xl"
            style={{
                backgroundColor: backgroundColor,
                color: textColor,
                height: '70px' // Slightly taller for premium feel
            }}
        >
            <style>{keyframes}</style>

            {/* Cinematic Gradient Vignettes */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/90 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/90 to-transparent z-20 pointer-events-none" />

            {/* Top/Bottom Subtle Borders with Glow */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-50"></div>

            {/* Scrolling Container */}
            <div
                className="flex items-center h-full w-max hover:cursor-grab active:cursor-grabbing"
                style={{
                    animation: `${animationName} ${scrollSpeed}s linear infinite`,
                    animationDirection: direction === 'right' ? 'reverse' : 'normal',
                    willChange: 'transform'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = 'paused'; }}
                onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = 'running'; }}
            >
                {/* Render 4 blocks to ensure infinity loop logic (0% to -25%) works perfectly */}
                {[0, 1, 2, 3].map((passIndex) => (
                    <div key={passIndex} className="flex items-center shrink-0 h-full">
                        {renderAnnouncements(passIndex)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScrollingAnnouncementBar;
