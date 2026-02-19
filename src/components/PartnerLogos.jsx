import React from "react";
import { motion } from "framer-motion";
import { urlFor } from "../lib/sanity";

// Logos from /public/_optimized/mediafiles/logos/ (excluding MurgDur and KarVenSen)
const LOGOS = [
    "/_optimized/mediafiles/logos/Gemini_Generated_Image_1898qy1898qy1898.webp",
    "/_optimized/mediafiles/logos/Gemini_Generated_Image_clfbv4clfbv4clfb.webp",
    "/_optimized/mediafiles/logos/Gemini_Generated_Image_l2e7mvl2e7mvl2e7.webp",
    "/_optimized/mediafiles/logos/Gemini_Generated_Image_l4utmml4utmml4ut.webp",
    "/_optimized/mediafiles/logos/Gemini_Generated_Image_z3rzx8z3rzx8z3rz.webp",
    "/_optimized/mediafiles/logos/Untitled design.webp",
    "/_optimized/mediafiles/logos/Untitled design (1).webp",
    "/_optimized/mediafiles/logos/Untitled design (2).webp",
    "/_optimized/mediafiles/logos/Untitled design (3).webp",
    "/_optimized/mediafiles/logos/Untitled design (4).webp",
    "/_optimized/mediafiles/logos/Untitled design (5).webp",
    "/_optimized/mediafiles/logos/Untitled design (6).webp",
    "/_optimized/mediafiles/logos/Untitled design (7).webp",
];

const PartnerLogos = ({ data }) => {
    // Process data from CMS if available
    const heading = data?.heading || "Companies They Work With";
    const cmsLogos = data?.logos?.map(img => urlFor(img).url()).filter(Boolean);
    const logos = cmsLogos?.length > 0 ? cmsLogos : LOGOS;

    // Use 4 sets of logos to ensure smooth infinite scroll even on wide screens
    const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

    return (
        <section className="py-24 bg-surface relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center">
                    <motion.h4
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl font-bold mb-12 text-secondary uppercase tracking-widest"
                    >
                        {heading}
                    </motion.h4>

                    {/* Logo Marquee */}
                    <div className="relative flex overflow-hidden w-full">
                        <div className="flex animate-marquee w-max py-8">
                            {marqueeLogos.map((logo, index) => (
                                <div key={index} className="mx-1.5 sm:mx-2 md:mx-3 w-32 h-24 sm:w-48 sm:h-32 md:w-64 md:h-40 lg:w-80 lg:h-48 flex items-center justify-center grayscale-0 opacity-100 hover:scale-110 transition-transform duration-300">
                                    <img
                                        src={logo}
                                        alt={`Partner Logo ${index}`}
                                        loading="lazy"
                                        decoding="async"
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                        {/* Fade masks for edges */}
                        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
                        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartnerLogos;
