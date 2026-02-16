import { motion } from 'framer-motion';
import BackButton from './ui/BackButton';
import OptimizedImage from './OptimizedImage';

const PageHeader = ({ title, subtitle, image }) => {
    return (
        <section className="relative pt-28 pb-6 bg-surface overflow-hidden">
            {image && (
                <div className="absolute inset-0 z-0">
                    <OptimizedImage src={image} alt={title} className="w-full h-full object-cover opacity-20" />
                    <div className="absolute inset-0 bg-surface/80" />
                </div>
            )}

            {/* Back Button Fixed */}
            <div className="fixed top-24 left-6 md:left-12 z-50">
                <BackButton />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-primary mb-6">{title}</h1>
                    <p className="text-xl text-secondary max-w-2xl">{subtitle}</p>
                </motion.div>
            </div>
        </section>
    );
};

export default PageHeader;
