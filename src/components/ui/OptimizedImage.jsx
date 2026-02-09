import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OptimizedImage = ({ src, alt, className, ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <AnimatePresence>
                {!isLoaded && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gray-200 animate-pulse"
                    />
                )}
            </AnimatePresence>
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                {...props}
            />
        </div>
    );
};

export default OptimizedImage;
