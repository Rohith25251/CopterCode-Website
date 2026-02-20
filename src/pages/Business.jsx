import { useRef, useEffect, useState } from "react";
import YouTube from 'react-youtube';
import PageHeader from "../components/PageHeader";
import SEO from "../components/SEO";
import { iconComponentMap } from "../sanity/schemas/icons";
import {
  Plane,
  Code,
  Sun,
  Database,
  Coffee,
  Shield,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import BackButton from "../components/ui/BackButton";

import { ASSETS } from "../constants/assets";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { client } from "../lib/sanity";

// Helper for video IDs
const getVideoId = (url) => {
  if (!url) return '';
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : url;
};

// Video eager loading hook - loads all videos immediately on page load
const useVideoVisibility = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(true); // Load immediately on page load

  return { ref, isVisible };
};

// Fallback Data
const fallbackBusinesses = [
  {
    id: "drones",
    title: "Industrial Drones & UAV",
    iconName: "plane",
    desc: "We design, manufacture, and deploy advanced unmanned aerial vehicle solutions tailored for agriculture, surveillance, mapping, and industrial inspections.",
    services: ["Inspection", "Mapping", "Surveillance", "Delivery"],
    features: [
      "High payload capacity",
      "Long flight endurance",
      "AI-powered analytics",
    ],
    video: ASSETS.VIDEOS.DRONES,
    link: "/industrial-drones",
  },
  {
    id: "digital",
    title: "Digital Services",
    iconName: "code",
    desc: "Accelerate your digital transformation with our comprehensive suite of services, from cloud architecture to custom software development.",
    services: [
      "Cybersecurity",
      "Software development",
      "Managed IT services",
      "Digital marketing",
    ],
    features: ["Data-driven strategies", "24/7 support", "Compliance-ready"],
    video: ASSETS.VIDEOS.DIGITAL,
    link: "/digital-services",
  },
  {
    id: "energy",
    title: "New Energy & Materials",
    iconName: "sun",
    desc: "Pioneering sustainable power solutions and advanced materials to drive the next generation of eco-friendly technology.",
    services: [
      "Solar panel installation",
      "Improving solar efficiency",
      "Sustainable textiles",
    ],
    features: ["Green energy initiatives", "Cutting-edge technology"],
    video: ASSETS.VIDEOS.ENERGY,
    link: "/new-energy",
  },
  {
    id: "erp",
    title: "ERP Software Solutions",
    iconName: "database",
    desc: "Streamline your enterprise operations with our robust, scalable, and intelligent ERP systems designed for modern businesses.",
    services: ["Finance & HR", "Inventory", "Manufacturing", "Supply Chain"],
    features: [
      "Streamlined operations",
      "User-friendly interfaces",
      "Scalable systems",
    ],
    video: ASSETS.VIDEOS.ERP,
    link: "/erp-solutions",
  },
  {
    id: "retail",
    title: "Retail & Food Collaborations",
    iconName: "Coffee",
    desc: "Revolutionizing supply chains and customer experiences in the retail and food sectors through automation and smart logistics.",
    services: [
      "Premium confectionery",
      "Hygienic kitchens",
      "Authentic cuisine",
      "Export-ready products",
    ],
    features: [
      "Sustainable packaging",
      "Strict quality control",
      "Fast logistics",
    ],
    video: ASSETS.VIDEOS.RETAIL,
    link: "/retail-food",
  },
  {
    id: "security",
    title: "Infra Security",
    iconName: "shield",
    desc: "Protecting critical infrastructure with state-of-the-art surveillance, AI-driven threat detection, and secure communication networks.",
    services: [
      "Firewall setup",
      "Network monitoring",
      "CCTV surveillance",
      "Disaster recovery",
    ],
    features: ["360-degree security", "Threat detection", "Minimal downtime"],
    video: ASSETS.VIDEOS.SECURITY,
    link: "/infra-security",
  },
  {
    id: "retail",
    title: "Retail & Food Collaborations",
    iconName: "coffee",
    desc: "Revolutionizing supply chains and customer experiences in the retail and food sectors through automation and smart logistics.",
    services: ["Premium confectionery", "Hygienic kitchens", "Authentic cuisine", "Export-ready products"], // Fixed data
    features: ["Sustainable packaging", "Strict quality control", "Fast logistics"],
    video: ASSETS.VIDEOS.RETAIL,
    link: "/retail-food"
  }
];

// Deduplicating retry logic in a sane way
const uniqueFallbackBusinesses = fallbackBusinesses.filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i);

const BusinessCard = ({ biz, index }) => {
  const { ref, isVisible } = useVideoVisibility();
  const isEven = index % 2 === 0;
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const IconComponent = iconComponentMap[biz.iconName?.toLowerCase()] || iconComponentMap.plane;

  return (
    <section
      ref={scrollRef}
      className="min-h-[85vh] flex items-center py-24 relative overflow-hidden group"
    >
      {/* Background Parallax Video/Image Container */}
      <div
        className={`absolute inset-0 w-full h-full z-0 overflow-hidden ${isEven ? "lg:right-[50%]" : "lg:left-[50%]"}`}
      >
        {/* Desktop: Split BG. Mobile: Full BG */}
        <div className="absolute inset-0 bg-background lg:hidden" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div
          className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${isEven ? "" : "lg:flex-row-reverse"}`}
        >
          {/* Visual Side */}
          <motion.div
            ref={ref}
            style={{ y, opacity }}
            className="w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto lg:h-[600px] relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/15 border border-border"
          >
            <div className="absolute inset-0 bg-black/20 z-10 mix-blend-overlay" />

            {biz.video && (
              (() => {
                const potentialId = getVideoId(biz.video);
                const isYoutube = /^[a-zA-Z0-9_-]{11}$/.test(potentialId) && !biz.video.match(/\.(mp4|webm|ogg)$/i);

                if (isYoutube) {
                  return (
                    <div className="w-full h-full absolute inset-0 pointer-events-none">
                      <YouTube
                        videoId={potentialId}
                        opts={{
                          height: '100%',
                          width: '100%',
                          playerVars: {
                            autoplay: 1,
                            mute: 1,
                            controls: 0,
                            loop: 1,
                            playlist: potentialId,
                            modestbranding: 1,
                            rel: 0
                          }
                        }}
                        className="w-full h-full"
                        iframeClassName="w-full h-full object-cover scale-110"
                      />
                    </div>
                  );
                } else {
                  return (
                    <video
                      autoPlay={true}
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover scale-110"
                      preload="auto"
                    >
                      <source src={biz.video} type="video/mp4" />
                    </video>
                  );
                }
              })()
            )}

            {!biz.video && (
              <div className="w-full h-full bg-surface-highlight flex items-center justify-center text-secondary">
                No Video
              </div>
            )}


            {/* Floating Icon Badge */}
            <div className="absolute top-8 left-8 z-20 w-20 h-20 bg-background/70 backdrop-blur-md rounded-2xl flex items-center justify-center border border-border shadow-lg">
              <IconComponent size={40} className="text-primary" />
            </div>
          </motion.div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 text-primary">
            <motion.div
              initial={{ opacity: 0, x: isEven ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight">
                {biz.title}
              </h2>
              <p className="text-lg text-secondary leading-relaxed mb-12 max-w-xl">
                {biz.desc || biz.description // handling both naming conventions
                }
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                <div>
                  <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-6 border-b border-border pb-2">
                    Core Services
                  </h3>
                  <ul className="space-y-3">
                    {biz.services?.map((s, i) => (
                      <li
                        key={i}
                        className="flex items-start text-sm text-secondary group-hover:text-primary transition-colors"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-accent mt-0.5 mr-3 flex-shrink-0"
                        />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-6 border-b border-border pb-2">
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {biz.features?.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start text-sm text-secondary group-hover:text-primary transition-colors"
                      >
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  to={biz.link || "#"}
                  className="inline-flex items-center text-accent font-bold uppercase text-sm tracking-widest border-b border-accent/20 pb-1 hover:text-primary hover:border-primary transition-all duration-300 group-hover:pl-2"
                >
                  Know More
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl ${isEven ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"}`}
        />
      </div>
    </section>
  );
};

const Business = () => {
  useScrollToTop(); // Force scroll to top on mount
  const [sanityData, setSanityData] = useState(null);

  useEffect(() => {
    const query = `*[_type == "businessPage"][0]{
      ...,
      businesses[]{
        ...,
        videoFile {
          ...,
          "url": asset->url
        },
        "videoFileUrl": videoFile.asset->url
      }
    }`;
    client.fetch(query)
      .then(data => {
        if (data) setSanityData(data);
      })
      .catch(console.error);
  }, []);

  const seoTitle = sanityData?.seo?.metaTitle || "Our Businesses";
  const seoDesc = sanityData?.seo?.metaDescription || "CopterCode's diverse business portfolio.";

  const heroTitle = sanityData?.heroTitle || "Our Businesses";
  const heroSubtitle = sanityData?.heroSubtitle || "A diversified portfolio driving innovation across immersive technology, sustainable energy, and enterprise solutions.";

  // Use Sanity list if populated, else use fallback
  const businesses = sanityData?.businesses?.length > 0
    ? sanityData.businesses.map(b => ({
      id: b._key,
      title: b.title,
      iconName: b.iconName,
      desc: b.description,
      services: b.services, // Array of strings
      features: b.features, // Array of strings
      video: b.videoFileUrl || b.videoFile?.url || b.videoUrl, // Prioritize file upload
      link: b.link
    }))
    : uniqueFallbackBusinesses; // Use the corrected unique fallback list

  return (
    <div className="bg-background min-h-screen text-primary selection:bg-accent selection:text-background">
      <SEO
        title={sanityData?.seo?.metaTitle || "Business Solutions | CopterCode - Future Ready Systems"}
        description={sanityData?.seo?.metaDescription || "Discover CopterCode's advanced business solutions. We deliver cutting-edge drone technology, enterprise AI, and custom software to drive growth and operational excellence."}
        ogTitle="Transform Your Business with CopterCode"
        ogDescription="Explore our comprehensive suite of services including Industrial Drones, Digital Services, New Energy, and ERP Solutions designed for modern enterprises."
        twitterTitle="CopterCode Business Solutions"
        twitterDescription="Elevate your operations with our premium engineering and AI solutions. innovative technology for forward-thinking businesses."
      />
      {/* Parallax Hero Header */}
      <div className="relative pt-28 pb-12 lg:pt-36 lg:pb-20 overflow-hidden">
        {/* Back Button */}
        <div className="fixed top-24 left-6 md:left-12 z-50">
          <BackButton />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6"
          >
            {heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-secondary max-w-2xl mx-auto"
          >
            {heroSubtitle}
          </motion.p>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50" />
      </div>

      <div className="relative pb-24">
        {/* Connecting Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden lg:block" />

        {businesses.map((biz, idx) => (
          <BusinessCard key={idx} biz={biz} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default Business;
