import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BusinessesSection = ({ businessData }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(0);
    const videoRef = useRef(null);
    // Track direction for potentially more complex transitions, though vertical stack is requested
    const direction = activeIndex > prevIndex ? 1 : -1;

    const handleCategoryClick = (index) => {
        if (index === activeIndex) return;
        setPrevIndex(activeIndex);
        setActiveIndex(index);
    };

    const currentBusiness = businessData[activeIndex];

    // Ensure video plays on load and when business changes
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log('Autoplay prevented or playback failed:', error);
            });
        }
    }, [activeIndex]);

    // Animation Variants
    const textReveal = {
        hidden: { opacity: 0, y: 18 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for "quiet luxury"
                delay: 0.1
            }
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: { duration: 0.4 }
        }
    };

    const bodyReveal = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                delay: 0.2, // 80-120ms delay requested
                ease: "easeOut"
            }
        },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    };

    // Parallax Background Transition
    // "Old background subtly slides downward and fades"
    // "New background enters from below with soft opacity reveal"
    const bgImageVariants = {
        enter: {
            y: "15%", // Enters from below
            opacity: 0,
            scale: 1.1 // Slight scale for depth
        },
        center: {
            y: "0%",
            opacity: 0.6, // Muted opacity as per design
            scale: 1,
            transition: {
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1]
            }
        },
        exit: {
            y: "5%", // Slides downward
            opacity: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <section className="relative w-full min-h-[90vh] lg:min-h-screen bg-background flex flex-col lg:flex-row overflow-hidden">

            {/* LEFT PANEL: Content Area (Dark, Minimal, Editorial) */}
            <div className="w-full lg:w-1/2 bg-background flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 lg:py-0 relative z-10 order-2 lg:order-1 border-r border-primary/10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        className="max-w-xl"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center space-x-3 mb-8"
                        >
                            <span className="h-px w-8 bg-accent"></span>
                            <span className="text-accent font-bold tracking-[0.25em] text-xs uppercase">
                                Our Businesses
                            </span>
                        </motion.div>

                        <motion.h2
                            variants={textReveal}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-primary leading-[1.1] mb-8"
                        >
                            {currentBusiness.title.split('&').map((part, i, arr) => (
                                <span key={i} className="block">
                                    {part.trim()} {i < arr.length - 1 && <span className="text-secondary font-light">&</span>}
                                </span>
                            ))}
                        </motion.h2>

                        <motion.p
                            variants={bodyReveal}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="text-lg text-secondary leading-relaxed mb-12 font-light"
                        >
                            {currentBusiness.description}
                        </motion.p>

                        <motion.div
                            variants={bodyReveal}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <Link
                                to={currentBusiness.link || "/business"}
                                className="group inline-flex items-center space-x-3 text-accent font-semibold tracking-wide text-sm uppercase py-2 border-b border-accent/20 hover:border-accent transition-colors duration-300"
                            >
                                <span>Discover More</span>
                                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* RIGHT PANEL: Interactive Navigation + Visuals */}
            <div className="w-full lg:w-1/2 relative min-h-[50vh] lg:h-auto order-1 lg:order-2 bg-background overflow-hidden">

                {/* Visual Canvas (Background) */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-background z-0" /> {/* Base dark color */}
                    <AnimatePresence mode="popLayout" custom={direction}>
                        <motion.div
                            key={activeIndex}
                            custom={direction}
                            variants={bgImageVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="absolute inset-0 w-full h-full"
                        >
                            {/* Overlay for readability - Dark Matte */}
                            <div className="absolute inset-0 bg-black/40 z-10" />

                            <video
                                ref={videoRef}
                                src={currentBusiness.video}
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                                webkit-playsinline="true"
                                preload="metadata"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Vertical Divider Overlay */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 hidden lg:block z-20" />

                {/* Content Switcher / Navigation List */}
                <div className="relative z-30 h-full flex flex-col justify-center px-8 lg:px-16 py-12">
                    <nav className="flex flex-col space-y-0 relative">
                        {/* Interactive sliding indicator line tracks active item */}

                        {businessData.map((item, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleCategoryClick(index)}
                                    className={`group flex items-center py-5 lg:py-6 px-6 lg:px-8 text-left transition-all duration-500 relative outline-none focus:outline-none rounded-lg ${isActive ? 'opacity-100 bg-black/60 backdrop-blur-sm border border-accent/40' : 'opacity-40 hover:opacity-70 bg-black/30 backdrop-blur-xs border border-transparent hover:border-accent/20'
                                        }`}
                                >
                                    {/* Vertical Indicator Line */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 bg-accent h-12"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}

                                    <span className={`text-sm lg:text-base font-bold tracking-[0.15em] uppercase transition-all duration-500 ${isActive ? 'text-white translate-x-2' : 'text-white/90'
                                        }`}>
                                        {item.title}
                                    </span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

            </div>
        </section>
    );
};

export default BusinessesSection;
