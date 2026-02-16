import React from "react";
import OptimizedImage from './OptimizedImage';
import { motion } from "framer-motion";
import { urlFor } from "../lib/sanity";

// Logos from /public/mediafiles/logos/
const LOGOS = [
    "/mediafiles/logos/logo_10-B1ui9v8s.png",
    "/mediafiles/logos/logo_11-BY520sZB.png",
    "/mediafiles/logos/logo_14-Cbz0hTK_.png",
    "/mediafiles/logos/logo_15-Mg_xjVLq.png",
    "/mediafiles/logos/logo_16-DoJBwjRa.png",
    "/mediafiles/logos/logo_17-DETRtLQJ.png",
    "/mediafiles/logos/logo_18-Df0xAPZI.png",
    "/mediafiles/logos/logo_20-CLRY9cVi.png",
    "/mediafiles/logos/logo_21-DrKx_bUL.png",
    "/mediafiles/logos/logo_3-BmbGohv9.png",
    "/mediafiles/logos/logo_4-_cYceE0U.png",
    "/mediafiles/logos/logo_5-Dtr7gMTv.png",
    "/mediafiles/logos/logo_7-DYBwtAG0.png",
    "/mediafiles/logos/logo_9-c4jamjnV.png",
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
                                <div key={index} className="mx-12 w-80 h-48 flex items-center justify-center grayscale-0 opacity-100 hover:scale-110 transition-transform duration-300">
                                    <OptimizedImage
                                        src={logo}
                                        alt={`Partner Logo ${index}`}
                                        loading="lazy"
                                        decoding="async"
                                        className="max-w-full max-h-full object-contain"
                                        sizes="(min-width: 1024px) 320px, 200px"
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
