import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import BackButton from './ui/BackButton';
import OptimizedImage from './OptimizedImage';

const PageHeader = ({ title, subtitle, image, images, children }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const backgroundImages = images && images.length > 0 ? images : (image ? [image] : []);

    useEffect(() => {
        if (backgroundImages.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [backgroundImages.length]);

    return (
        <section className="relative pt-48 pb-24 bg-surface overflow-hidden">
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode='wait'>
                    {backgroundImages.length > 0 && (
                        <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <OptimizedImage
                                src={backgroundImages[currentImageIndex]}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-surface/75 z-10" />
            </div>

            {/* Back Button Fixed */}
            <div className="fixed top-24 left-6 md:left-12 z-50">
                <BackButton />
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl"
                >
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-primary mb-6">{title}</h1>
                    <p className="text-xl text-secondary max-w-2xl">{subtitle}</p>
                </motion.div>

                {children && (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex-shrink-0"
                    >
                        {children}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default PageHeader;
