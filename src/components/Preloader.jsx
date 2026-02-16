import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import OptimizedImage from "./OptimizedImage";
import { client } from "../lib/sanity";

const defaultContent = {
    images: [
        "/mediafiles/Home/3442832E-21FB-4BF3-8CF2-7A91FBCA0302.jpg", // Left
        "/mediafiles/Home/B6181B19-4FA3-4BDE-866B-F02911B76EAC.jpg", // Center
        "/mediafiles/Home/IMG_1851.jpg", // Right
    ],
    logo: "/mediafiles/Coptercode_Logo.svg",
    titlePrefix: "WELCOME TO",
    highlightedTitle: "COPTERCODE",
    tagline: "Engineering The Unknown"
};

const Preloader = ({ setLoading }) => {
    const [content, setContent] = useState(defaultContent);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const query = `*[_type == "preloaderPage"][0]{
                    titlePrefix,
                    highlightedTitle,
                    tagline,
                    "logo": logo.asset->url,
                    "backgroundImages": backgroundImages[].asset->url
                }`;

                const data = await client.fetch(query);

                if (data) {
                    setContent({
                        images: data.backgroundImages && data.backgroundImages.length === 3
                            ? data.backgroundImages
                            : defaultContent.images,
                        logo: data.logo || defaultContent.logo,
                        titlePrefix: data.titlePrefix || defaultContent.titlePrefix,
                        highlightedTitle: data.highlightedTitle || defaultContent.highlightedTitle,
                        tagline: data.tagline || defaultContent.tagline
                    });
                }
            } catch (error) {
                console.error("Failed to fetch preloader content:", error);
            }
        };

        fetchContent();

        // Total duration before triggering exit
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, [setLoading]);

    const panelVariants = {
        initial: { height: "100%" },
        exit: {
            height: 0,
            transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] }
        },
    };

    const textVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.8 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
    };

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 1.2, duration: 1.0 } }} /* Fades out slightly before panels are fully gone to smooth edges */
        >
            {/* Three Columns Background */}
            <div className="absolute inset-0 flex w-full h-full pointer-events-none z-10">
                {content.images.map((img, index) => (
                    <motion.div
                        key={index}
                        className="relative w-1/3 h-full border-r border-white/10 last:border-r-0 bg-zinc-900"
                        variants={panelVariants}
                        initial="initial"
                        exit="exit"
                    >
                        <div className="absolute inset-0 bg-black/60 z-10" />
                        <OptimizedImage
                            src={img}
                            alt={`Loading ${index}`}
                            className="w-full h-full object-cover opacity-50 grayscale"
                        />
                    </motion.div>
                ))}
            </div>

            {/* Center Content Overlay */}
            <motion.div
                className="relative z-20 flex flex-col items-center justify-center text-center px-4"
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <motion.div
                    className="mb-8 w-32 md:w-48 h-32 md:h-48 relative"
                    variants={{
                        initial: { scale: 0.8, opacity: 0 },
                        animate: {
                            scale: 1,
                            opacity: 1,
                            transition: { duration: 1, ease: "easeOut" }
                        },
                        exit: { scale: 1.5, opacity: 0, transition: { duration: 0.5 } }
                    }}
                >
                    {/* Logo Container with Glow */}
                    <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
                    <OptimizedImage
                        src={content.logo}
                        alt="CopterCode Logo"
                        className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                    />
                </motion.div>

                <motion.h1
                    className="text-4xl md:text-6xl font-display font-bold text-white mb-2 tracking-tighter"
                    variants={textVariants}
                >
                    {content.titlePrefix} <br className="md:hidden" /> <span className="text-accent">{content.highlightedTitle}</span>
                </motion.h1>

                <motion.div
                    className="w-24 h-1 bg-accent mb-4 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: 96, transition: { delay: 1, duration: 0.8 } }}
                    exit={{ width: 0, transition: { duration: 0.3 } }}
                />

                <motion.p
                    className="text-white/70 text-sm md:text-base tracking-[0.3em] font-light uppercase"
                    variants={textVariants}
                >
                    {content.tagline}
                </motion.p>
            </motion.div>
        </motion.div>
    );
};

export default Preloader;
