import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { client } from "../lib/sanity";

const defaultContent = {
    image: "/mediafiles/IIT.jpg",
    logo: "/mediafiles/Preloder logo.png",
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
                    videoOnlyMode,
                    titlePrefix,
                    highlightedTitle,
                    tagline,
                    "logo": logo.asset->url,
                    background {
                        type,
                        image { asset->{ url } },
                        video {
                            source,
                            videoUrl,
                            "uploadedVideoUrl": uploadedVideo.asset->url,
                            posterImage { asset->{ url } }
                        }
                    }
                }`;

                const data = await client.fetch(query);

                if (data) {
                    // Determine background type
                    let bgType = data.background?.type || 'image';
                    if (data.videoOnlyMode) {
                        bgType = 'video'; // Force video type when video-only mode is enabled
                    }

                    setContent({
                        image: bgType === 'image' && data.background?.image?.asset?.url 
                            ? data.background.image.asset.url 
                            : defaultContent.image,
                        logo: data.logo || defaultContent.logo,
                        titlePrefix: data.titlePrefix || defaultContent.titlePrefix,
                        highlightedTitle: data.highlightedTitle || defaultContent.highlightedTitle,
                        tagline: data.tagline || defaultContent.tagline,
                        background: data.background || null,
                        videoOnlyMode: data.videoOnlyMode || false
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
        }, 3000); // Slightly longer for "professional" feel

        return () => clearTimeout(timer);
    }, [setLoading]);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
            initial={{ opacity: 1 }}
            exit={{
                y: "-100%",
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
        >
            {/* Background Image/Video with Overlay */}
            <div className="absolute inset-0 z-0">
                {content.background?.type === 'video' ? (
                    // Video Background
                    <div className="relative w-full h-full">
                        {content.background.video?.source === 'upload' && content.background.video?.uploadedVideoUrl ? (
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover opacity-100"
                                poster={content.background.video?.posterImage?.asset?.url}
                            >
                                <source src={content.background.video.uploadedVideoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : content.background.video?.source === 'url' && content.background.video?.videoUrl ? (
                            // Embed video URL (e.g., YouTube)
                            /youtube.com|youtu.be/.test(content.background.video.videoUrl) ? (
                                <iframe
                                    className="w-full h-full"
                                    src={content.background.video.videoUrl.replace(/youtube.com\/watch\?v=|youtu.be\//, 'youtube.com/embed/')}
                                    frameBorder="0"
                                    allow="autoplay; muted"
                                    allowFullScreen
                                />
                            ) : (
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover opacity-100"
                                    poster={content.background.video?.posterImage?.asset?.url}
                                >
                                    <source src={content.background.video.videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )
                        ) : null}
                    </div>
                ) : (
                    // Image Background
                    <img
                        src={content.image}
                        alt="Loading Background"
                        className="w-full h-full object-cover opacity-100 scale-105 animate-pulse-slow"
                        loading="eager"
                        decoding="async"
                    />
                )}
                {!content.videoOnlyMode && <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />}
            </div>

            {/* Center Content - Only show when NOT in video-only mode */}
            {!content.videoOnlyMode && (
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
                {/* Logo Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8 w-32 md:w-40 relative"
                >
                    <img
                        src={content.logo}
                        alt="CopterCode Logo"
                        className="w-full h-auto object-contain drop-shadow-2xl"
                        loading="eager"
                        decoding="async"
                    />
                </motion.div>

                {/* Text Section */}
                <div className="overflow-hidden mb-2">
                    <motion.h2
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
                        className="text-sm md:text-base tracking-[0.4em] font-light text-white/80 uppercase mb-2"
                    >
                        {content.titlePrefix}
                    </motion.h2>
                </div>

                <div className="overflow-hidden mb-8">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
                        className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight"
                    >
                        <span className="text-white">{content.highlightedTitle}</span>
                    </motion.h1>
                </div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="text-white/60 text-xs md:text-sm tracking-[0.2em] font-light uppercase mb-12"
                >
                    {content.tagline}
                </motion.p>

                {/* Elegant Progress Line */}
                <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden rounded-full">
                    <motion.div
                        className="absolute inset-0 bg-white"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>
            </div>
            )}
        </motion.div>
    );
};

export default Preloader;
