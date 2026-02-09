import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";




const Hero = ({ data }) => {
  // Static defaults
  const defaultImages = [
    "/mediafiles/news and media/IMG_3330.jpg",
    "/mediafiles/news and media/IMG_1699.jpg",
    "/mediafiles/news and media/IMG_3322.jpg",
    "/mediafiles/news and media/IMG_3979.jpg",
    "/mediafiles/news and media/IMG_3570.jpg",
  ];

  // Map new schema fields to component variables
  // Schema: { tagline, title, subtitle, heroImages, primaryCTA, secondaryCTA }
  const images = data?.heroImages?.length > 0 ? data.heroImages : defaultImages;

  const headline = data?.title || "Future Ready Systems.";
  const subheadline = data?.subtitle || "We don't just build software. We engineer intelligent ecosystems where Drone Tech meets Enterprise AI.";
  const label = data?.tagline || "Engineering The Unknown";

  const ctaText = data?.primaryCTA?.text || "View Our Work";
  const ctaLink = data?.primaryCTA?.link || "/projects";

  const secondaryCtaText = data?.secondaryCTA?.text || "Start a Project";
  const secondaryCtaLink = data?.secondaryCTA?.link || "/contact";

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [images]);

  // Staggered Text Variants
  const letterContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const letterChild = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 12, stiffness: 200 },
    },
  };



  return (
    <section className="relative bg-background text-primary overflow-hidden flex items-start justify-center min-h-[100svh] pt-32 md:pt-40 group">
      {/* Premium Background Layers */}
      <div className="absolute inset-0 bg-background z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black/5 via-transparent to-transparent opacity-30 pointer-events-none z-0" />

      {/* Floating Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-accent/30 rounded-full blur-sm z-0 pointer-events-none"
          style={{
            width: Math.random() * 4 + 2 + "px",
            height: Math.random() * 4 + 2 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Ambient Animated Blobs - Intensified */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-blue-900/15 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen"
      />

      {/* Left Corner Grey Glows - Enhanced */}
      <div className="absolute top-[-20%] left-[-15%] w-[800px] h-[800px] bg-white/20 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen opacity-60" />
      <div className="absolute bottom-[-20%] left-[-15%] w-[900px] h-[900px] bg-gray-400/20 rounded-full blur-[180px] pointer-events-none z-0 mix-blend-screen opacity-60" />

      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Content (Text) */}
          <motion.div
            className="lg:col-span-6 flex flex-col justify-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {/* Gold Border Pill Badge - Enhanced */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              className="inline-block border border-accent/40 rounded-full px-5 py-2 mb-8 w-fit bg-primary/5 backdrop-blur-sm shadow-[0_0_15px_rgba(160,174,192,0.15)] group-hover:shadow-[0_0_25px_rgba(160,174,192,0.3)] transition-shadow duration-500"
            >
              <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-secondary drop-shadow-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                {label}
              </span>
            </motion.div>

            {/* Main Headline - Animated Letters */}
            <h1 className="font-display font-black tracking-tighter text-primary mb-8 leading-[0.9] text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] drop-shadow-2xl">
              {(() => {
                // Split headline into words for animation
                const words = headline.split(" ");
                const firstWord = words[0] || "";
                const secondWord = words[1] || "";
                const restWords = words.slice(2).join(" ");

                return (
                  <>
                    <div className="flex flex-wrap gap-x-3 gap-y-0 mb-2">
                      <motion.div
                        variants={letterContainer}
                        className="whitespace-nowrap inline-block"
                      >
                        {firstWord.split("").map((char, index) => (
                          <motion.span
                            key={`w1-${index}`}
                            variants={letterChild}
                            className="inline-block"
                          >
                            {char}
                          </motion.span>
                        ))}
                      </motion.div>

                      {secondWord && (
                        <motion.div
                          variants={letterContainer}
                          className="whitespace-nowrap inline-block"
                        >
                          {secondWord.split("").map((char, index) => (
                            <motion.span
                              key={`w2-${index}`}
                              variants={letterChild}
                              className="inline-block"
                            >
                              {char}
                            </motion.span>
                          ))}
                        </motion.div>
                      )}
                    </div>

                    {restWords && (
                      <motion.span
                        initial={{ opacity: 0, x: -50 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          backgroundPosition: ["0% center", "300% center"],
                        }}
                        className="block text-transparent bg-clip-text pb-2 filter drop-shadow-[0_0_15px_rgba(160,174,192,0.3)]"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, #2D3748, #4A5568, #718096, #2D3748)",
                          backgroundSize: "300% auto",
                        }}
                        transition={{
                          opacity: { duration: 1, delay: 0.5 },
                          x: { duration: 1, delay: 0.5 },
                          backgroundPosition: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear",
                          },
                        }}
                      >
                        {restWords}
                      </motion.span>
                    )}
                  </>
                );
              })()}
            </h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-lg md:text-xl text-secondary/80 mb-10 max-w-lg leading-relaxed font-light tracking-wide border-l-2 border-accent/20 pl-6"
            >
              {subheadline}
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex flex-col sm:flex-row gap-5 items-start sm:items-center"
            >
              <Link to={ctaLink}>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(0,0,0,0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-primary text-white rounded font-bold w-full sm:w-auto text-center shadow-[0_0_20px_rgba(0,0,0,0.1)] transition-all duration-300 relative overflow-hidden group/btn"
                >
                  <span className="relative z-10">{ctaText}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500" />
                </motion.div>
              </Link>

              <Link to={secondaryCtaLink}>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    borderColor: "rgba(160,174,192,0.8)",
                    backgroundColor: "rgba(160,174,192,0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 text-primary font-medium flex items-center justify-center space-x-2 border border-accent/40 rounded bg-transparent w-full sm:w-auto group shadow-[0_0_15px_rgba(160,174,192,0.05)] transition-all duration-300"
                >
                  <span>{secondaryCtaText}</span>
                  <ArrowRight
                    size={18}
                    className="text-accent group-hover:translate-x-1 transition-transform"
                  />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Single Large Image Slideshow with 3D Tilt */}
          <motion.div
            className="lg:col-span-6 relative mt-16 lg:mt-0 h-[500px] sm:h-[600px] lg:h-[700px] flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Premium Backlight Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/20 blur-[100px] rounded-full pointer-events-none z-0" />

            <motion.div className="relative w-full max-w-4xl h-full z-10">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt="CopterCode Highlight"
                  initial={{ opacity: 0, scale: 1.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
                />
              </AnimatePresence>

              {/* Cinematic Vignette - Removed as it creates a box effect on contain */}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
