import React from "react";
import { motion } from "framer-motion";

const PlacementSection = ({ data }) => {
    const title = data?.title || "Global Footprint of Our Talent";
    const image = data?.footprintImage || "/mediafiles/Where%20Do%20Our%20Interns%20Reached/placements-reach.png";
    const isActive = data?.isActive !== false; // Default true

    if (!isActive) return null;

    return (
        <section className="py-24 bg-surface relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="mb-24 text-center">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-display font-medium mb-12 text-primary"
                    >
                        {title}
                    </motion.h3>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl border border-border mx-auto max-w-5xl group"
                    >
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PlacementSection;
