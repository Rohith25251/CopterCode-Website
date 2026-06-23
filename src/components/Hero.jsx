import { useState, useEffect, useMemo } from "react";
import OptimizedImage from './OptimizedImage';
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";

const Hero = ({ data }) => {
  const headline = data?.title || "Industrial Automation & Enterprise AI";
  const subheadline = data?.subtitle;
  const label = data?.tagline || "Engineering The Unknown";

  const ctaText = data?.primaryCTA?.text || "Get started";
  const ctaLink = data?.primaryCTA?.link || "/projects";

  const secondaryCtaText = data?.secondaryCTA?.text || "Start a Project";
  const secondaryCtaLink = data?.secondaryCTA?.link || "/contact";

  // Sourced slide images from public/mediafiles/Home directory (ratio 4032 x 2268)
  const homeImages = useMemo(() => {
    return [
      "/mediafiles/Home/IMG_1851.jpg",
      "/mediafiles/Home/IMG_3322.jpg",
      "/mediafiles/Home/IMG_3854.jpg",
      "/mediafiles/Home/B6181B19-4FA3-4BDE-866B-F02911B76EAC.jpg",
      "/mediafiles/Home/3442832E-21FB-4BF3-8CF2-7A91FBCA0302.jpg"
    ];
  }, []);

  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Slideshow transition interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % homeImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [homeImages.length]);

  // Premium, lightweight fade-up variants using easeOutExpo
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  };

  return (
    <section className="relative bg-background text-primary overflow-hidden flex items-start justify-center pt-6 sm:pt-8 lg:pt-12 pb-16 sm:pb-20 md:pb-24 lg:pb-32">
      {/* Decorative premium radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent opacity-60 pointer-events-none z-0" />
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-50/20 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center max-w-[88rem] mx-auto">
          
          {/* Left Column: Pill, Title, Subtitle, CTAs (Compact 4-column span for wider image display) */}
          <motion.div
            className="flex flex-col justify-center lg:col-span-5 relative z-20"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Outline Pill Badge */}
            <motion.div
              id="hero-tagline-badge"
              variants={fadeInUp}
              className="inline-flex items-center gap-2.5 border border-blue-500/20 bg-blue-500/5 rounded-full px-4 py-2 mb-6 sm:mb-8 w-fit backdrop-blur-sm shadow-sm select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-blue-700 uppercase">
                {label}
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="font-display font-bold tracking-tight text-[#0F172A] mb-5 sm:mb-6 leading-[1.1] text-4xl sm:text-5xl md:text-6xl lg:text-6xl flex flex-col">
              {(() => {
                const words = headline.split(" ");
                const firstPart = words.slice(0, 2).join(" ");
                const secondPart = words.slice(2).join(" ");

                return (
                  <>
                    <motion.span variants={fadeInUp} className="block">
                      {firstPart}
                    </motion.span>
                    {secondPart && (
                      <motion.span
                        variants={fadeInUp}
                        className="block text-transparent bg-clip-text pb-1"
                        style={{
                          backgroundImage: "linear-gradient(to right, #0F172A, #1D4ED8, #3B82F6)",
                        }}
                      >
                        {secondPart}
                      </motion.span>
                    )}
                  </>
                );
              })()}
            </h1>

            {/* Description Subheadline */}
            <motion.div
              variants={fadeInUp}
              className="text-sm sm:text-base md:text-lg text-secondary/80 mb-8 sm:mb-10 max-w-xl leading-relaxed font-normal tracking-wide"
            >
              {subheadline ? (
                Array.isArray(subheadline) ? (
                  <PortableText
                    value={subheadline}
                    components={{
                      marks: {
                        link: ({ value, children }) => {
                          const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
                          return (
                            <a
                              href={value?.href}
                              target={target}
                              rel={target === '_blank' ? 'noindex nofollow' : undefined}
                              className="text-primary font-medium hover:text-accent transition-colors underline decoration-accent/20 hover:decoration-accent"
                            >
                              {children}
                            </a>
                          )
                        },
                        internalLink: ({ value, children }) => {
                          return <span className="text-primary font-medium">{children}</span>
                        },
                        strong: ({ children }) => <strong className="font-bold text-[#0F172A]">{children}</strong>,
                        em: ({ children }) => <em className="italic text-accent">{children}</em>
                      }
                    }}
                  />
                ) : (
                  <p>{subheadline}</p>
                )
              ) : (
                <p>
                  We don't just build software. We engineer intelligent ecosystems where <Link to="/industrial-drones" className="text-primary font-semibold hover:text-accent transition-colors underline decoration-accent/20 hover:decoration-accent">Drone Tech</Link> meets <Link to="/business" className="text-primary font-semibold hover:text-accent transition-colors underline decoration-accent/20 hover:decoration-accent">Enterprise AI</Link>.
                </p>
              )}
            </motion.div>

            {/* Action CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <Link to={ctaLink} id="hero-primary-cta" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "#1E293B",
                    boxShadow: "0 10px 30px -5px rgba(15, 23, 42, 0.25)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3.5 bg-[#0F172A] text-white rounded-full font-semibold text-center text-sm sm:text-base transition-all duration-300 relative overflow-hidden shadow-lg shadow-slate-900/10 select-none cursor-pointer"
                >
                  <span>{ctaText}</span>
                </motion.div>
              </Link>

              <Link to={secondaryCtaLink} id="hero-secondary-cta" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    borderColor: "#0F172A",
                    backgroundColor: "rgba(15, 23, 42, 0.03)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3.5 text-[#0F172A] font-semibold flex items-center justify-center space-x-2 border border-[#0F172A]/20 hover:border-[#0F172A] rounded-full bg-transparent text-sm sm:text-base transition-all duration-300 select-none cursor-pointer group"
                >
                  <span>{secondaryCtaText}</span>
                  <ArrowRight
                    size={16}
                    className="text-[#0F172A]/70 group-hover:translate-x-1 group-hover:text-[#0F172A] transition-all"
                  />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Single Enlarged Image Slideshow Frame (Ratio 4032 x 2268, Centered Vertically, Made Still Larger) */}
          <div className="lg:col-span-7 relative w-full aspect-[4032/2268] max-w-[880px] mx-auto select-none mt-4 lg:mt-0 flex items-center justify-center">
            {/* Soft premium blue-indigo glow behind the slideshow card */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/5 rounded-[2.5rem] blur-2xl pointer-events-none z-0" />
            
            {/* CARD: Premium Image Slideshow Frame */}
            <motion.div
              id="hero-image-slideshow"
              whileHover={{ 
                y: -12, 
                scale: 1.02,
                boxShadow: "0 40px 80px -15px rgba(15, 23, 42, 0.3)"
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="w-full h-full rounded-[2.2rem] shadow-2xl overflow-hidden relative bg-slate-100 z-10"
            >
              {/* Slideshow images */}
              <AnimatePresence>
                <motion.img
                  key={currentImgIndex}
                  src={homeImages[currentImgIndex]}
                  alt="CopterCode Feature Showcase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              {/* Subtle top/bottom vignette overlay for premium frame appeal */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10 z-10 pointer-events-none" />
            </motion.div>

          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
