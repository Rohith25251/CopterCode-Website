import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS } from '../../constants/assets';

// Fallback Data corresponding to new schema
const FALLBACK_BUSINESSES = [
    {
        title: "Industrial Drones & UAV",
        shortDescription: "We design and deploy advanced unmanned aerial vehicle solutions tailored for agriculture, surveillance, mapping, and industrial inspections.",
        slug: "drones",
        videoBackground: ASSETS.VIDEOS.DRONES,
        CTA: { text: "read more", link: "/business" }
    },
    {
        title: "Digital Services",
        shortDescription: "Accelerate your digital transformation with our comprehensive suite of services, from cloud architecture to custom software development.",
        slug: "digital",
        videoBackground: ASSETS.VIDEOS.DIGITAL,
        CTA: { text: "read more", link: "/business" }
    },
    {
        title: "New Energy & Materials",
        shortDescription: "Pioneering sustainable power solutions and advanced materials to drive the next generation of eco-friendly technology.",
        slug: "energy",
        videoBackground: ASSETS.VIDEOS.ENERGY,
        CTA: { text: "read more", link: "/business" }
    },
    {
        title: "ERP Software Solutions",
        shortDescription: "Streamline your enterprise operations with our robust, scalable, and intelligent ERP systems designed for modern businesses.",
        slug: "erp",
        videoBackground: ASSETS.VIDEOS.ERP,
        CTA: { text: "read more", link: "/business" }
    },
    {
        title: "Retail & Food Collaborations",
        shortDescription: "Revolutionizing supply chains and customer experiences in the retail and food sectors through automation and smart logistics.",
        slug: "retail",
        videoBackground: ASSETS.VIDEOS.RETAIL,
        CTA: { text: "read more", link: "/business" }
    },
    {
        title: "Infra Security",
        shortDescription: "Protecting critical infrastructure with state-of-the-art surveillance, AI-driven threat detection, and secure communication networks.",
        slug: "security",
        videoBackground: ASSETS.VIDEOS.SECURITY,
        CTA: { text: "read more", link: "/business" }
    }
];

const BusinessCategories = ({ data }) => {
    const [activeBusiness, setActiveBusiness] = useState(0);

    // Use passed data or fallback
    const businesses = data?.length > 0 ? data : FALLBACK_BUSINESSES;
    const currentBusiness = businesses[activeBusiness] || businesses[0];

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-0 relative"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[800px]">
                <div className="bg-white border-r border-border p-12 lg:p-24 flex flex-col justify-center relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeBusiness}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -30, scale: 0.95 }}
                            transition={{ 
                                duration: 0.35,
                                ease: [0.23, 1, 0.320, 1] // cubic-bezier for smooth premium feel
                            }}
                            className="relative z-10"
                        >
                            <motion.span 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.05 }}
                                className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-6 block flex items-center"
                            >
                                <motion.span 
                                    animate={{ rotate: 45 }}
                                    className="w-2 h-2 bg-accent mr-2"
                                ></motion.span>
                                OUR BUSINESSES
                            </motion.span>
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8 text-primary"
                            >
                                {currentBusiness.title.split('&')[0]} <br />
                                <motion.span 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4, delay: 0.15 }}
                                    className="text-primary/70"
                                >
                                    {currentBusiness.title.includes('&') ? '& ' + currentBusiness.title.split('&')[1] : ''}
                                </motion.span>
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.15 }}
                                className="text-lg text-secondary leading-relaxed mb-12 max-w-xl"
                            >
                                {currentBusiness.shortDescription || currentBusiness.description}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                            >
                                <Link
                                    to={currentBusiness.CTA?.link || currentBusiness.link || "/business"}
                                    className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-300 font-semibold tracking-wide shadow-xl hover:-translate-y-1"
                                >
                                    {currentBusiness.CTA?.text || "read more"} <ArrowRight className="ml-2" />
                                </Link>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="bg-surface relative flex flex-col justify-center border-l border-border">
                    <div className="absolute inset-0 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.video
                                key={currentBusiness.videoBackground || currentBusiness.video}
                                src={currentBusiness.videoBackground || currentBusiness.video}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        </AnimatePresence>
                        {/* Reduced overlay as requested previously */}
                        <div className="absolute inset-0 bg-gradient-to-l from-surface to-transparent opacity-80" />
                    </div>
                    <div className="relative z-10 pl-12 pr-6">
                        <div className="space-y-0">
                            {businesses.map((item, index) => (
                                <motion.div
                                    key={index}
                                    onClick={() => setActiveBusiness(index)}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group border-b border-primary/10 py-8 pl-8 transition-all duration-200 hover:bg-white/50 cursor-pointer relative overflow-hidden"
                                >
                                    <motion.div 
                                        animate={{ 
                                            scaleY: index === activeBusiness ? 1 : 0,
                                        }}
                                        transition={{ duration: 0.25, ease: "easeOut" }}
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-accent origin-top"
                                    />
                                    <motion.h3 
                                        animate={{ 
                                            scale: index === activeBusiness ? 1.08 : 1,
                                            color: index === activeBusiness ? '#000000' : '#00000066'
                                        }}
                                        transition={{ duration: 0.25, ease: "easeOut" }}
                                        className="text-xl font-bold tracking-wide uppercase origin-left"
                                    >
                                        {item.title}
                                    </motion.h3>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default BusinessCategories;
