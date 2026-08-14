import SEO from "../components/SEO";
import InternsCarousel from "../components/InternsCarousel";
import PartnerLogos from "../components/PartnerLogos";
import { ArrowRight, Star, Play, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedImage from "../components/OptimizedImage";
import { Link } from "react-router-dom";
import BackButton from "../components/ui/BackButton";

import { useScrollToTop } from "../hooks/useScrollToTop";

import { useState, useEffect } from "react";
import { client, urlFor } from "../lib/sanity";

const HEADER_IMAGES = [
  "/mediafiles/Home/3442832E-21FB-4BF3-8CF2-7A91FBCA0302.jpg",
  "/mediafiles/Home/B6181B19-4FA3-4BDE-866B-F02911B76EAC.jpg",
  "/mediafiles/Home/IMG_1851.jpg",
  "/mediafiles/Home/IMG_3322.jpg",
  "/mediafiles/Home/IMG_3854.jpg"
];

const Internship = () => {
  useScrollToTop(); // Force scroll to top on mount
  const [sanityData, setSanityData] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const query = `*[_type == "internshipPage"][0] {
      ...,
      heroSlides[] {
        ...,
        image { asset->{ url } }
      }
    }`;
    client.fetch(query).then((data) => {
      if (data) {
        setSanityData({
          seo: data.seo,
          heroScrollButtonText: data.heroScrollButtonText,
          heroSlides: data.heroSlides?.map(slide => ({
            ...slide,
            image: slide.image?.asset?.url
          })),
          introText1: data.introduction?.text1,
          introText2: data.introduction?.text2,
          purposeTitle: data.purpose?.title,
          purposeText: data.purpose?.text,
          purposeList: data.purpose?.list,
          eligibilityTitle: data.eligibility?.title,
          eligibilityList: data.eligibility?.list,
          durationTitle: data.duration?.title,
          durationText: data.duration?.text,
          slots: data.duration?.slots,
          processTitle: data.process?.title,
          processSteps: data.process?.steps,
          ctaHeading: data.cta?.heading,
          ctaSubheading: data.cta?.subheading,
          ctaButtonText: data.cta?.buttonText,
          ctaLink: data.cta?.link,
          ctaBackgroundImage: data.cta?.backgroundImage,
          internsSection: data.internsSection,
          partnersSection: data.partnersSection,
        });
      }
    }).catch((err) => {
      console.error("❌ Error fetching internship page data from Sanity:", err.message || err);
    });
  }, []);

  const seoTitle = sanityData?.seo?.metaTitle || "Internship Programme | Real-World Tech Experience";
  const seoDesc = sanityData?.seo?.metaDescription || "CopterCode internship program provides real-world exposure to drone technology, AI, cybersecurity, software development, IoT, and renewable energy for college students.";

  const DEFAULT_HERO_SLIDES = [
    {
      image: "/mediafiles/Home/3442832E-21FB-4BF3-8CF2-7A91FBCA0302.jpg",
      category: "Internship Programme",
      title: "Internship Programme",
      quote: "Empowering the next generation of innovators with real-world exposure to emerging technologies."
    },
    {
      image: "/mediafiles/Home/B6181B19-4FA3-4BDE-866B-F02911B76EAC.jpg",
      category: "Hands-On Experience",
      title: "Build the Future",
      quote: "Work closely with experienced mentors on live projects shaping the next horizon of aerospace and AI technology."
    },
    {
      image: "/mediafiles/Home/IMG_1851.jpg",
      category: "Career Preparation",
      title: "Industry Readiness",
      quote: "Bridge the gap between academic theory and actual industry application, preparing you for the global tech workforce."
    }
  ];

  const heroSlides = (sanityData?.heroSlides && sanityData.heroSlides.length > 0)
    ? sanityData.heroSlides
    : DEFAULT_HERO_SLIDES;

  const ctaBgImage = sanityData?.ctaBackgroundImage ? urlFor(sanityData.ctaBackgroundImage).url() : heroSlides[0]?.image;

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const introText1 = sanityData?.introText1 || "At CopterCode, we believe in empowering the next generation of innovators. Our Internship Programme is designed to provide college students with real-world exposure to emerging technologies across multiple domains, including Drone Technology, Cybersecurity, Software Development, Artificial Intelligence (AI), Internet of Things (IoT), and Renewable Energy Systems.";

  const introText2 = sanityData?.introText2 || "Interns work closely with experienced mentors and industry professionals on live projects that shape the future of technology. Beyond technical learning, students gain hands-on industry experience, leadership skills, and the opportunity to contribute to meaningful innovations.";

  const purposeTitle = sanityData?.purposeTitle || "Purpose";
  const purposeText = sanityData?.purposeText || "The purpose of the CopterCode Internship Programme is to bridge the gap between academic learning and real-world industry application. We aim to:";

  const purposeList = (sanityData?.purposeList?.length > 0) ? sanityData.purposeList : [
    "Provide practical experience through real-world project execution",
    "Encourage creative problem-solving and innovation",
    "Build industry-ready engineers, designers, and technology professionals",
    "Offer a collaborative platform to explore emerging technologies",
  ];

  const eligibilityTitle = sanityData?.eligibilityTitle || "Eligibility Criteria";
  const eligibilityList = (sanityData?.eligibilityList?.length > 0) ? sanityData.eligibilityList : [
    "Must be a current-year student enrolled in an Engineering or Arts & Science college",
    "Students from all technology-related branches (ECE, EEE, CSE, IT, Mech, Aero, etc.)",
    "Strong interest in technology, research, and innovation",
    "Ability to work collaboratively in a team environment",
    "Willingness to learn new tools, skills, and technologies",
  ];

  const durationTitle = sanityData?.durationTitle || "Internship Duration & Slots";
  const durationText = sanityData?.durationText || "CopterCode offers two internship batches every year. Each slot runs for 3 months with in-person and hybrid learning opportunities.";

  const slots = (sanityData?.slots?.length > 0) ? sanityData.slots : [
    { title: "Slot 1", months: "May, June & July" },
    { title: "Slot 2", months: "December, January & February" },
  ];

  const processTitle = sanityData?.processTitle || "Application Process";
  const processSteps = (sanityData?.processSteps?.length > 0) ? sanityData.processSteps : [
    {
      stepNumber: "01",
      title: "Show Us Your Spark!",
      description: "Fill out the quick form, and let your brilliance shine. No stress, just the basics!",
    },
    {
      stepNumber: "02",
      title: "Let’s Connect & Chat!",
      description: "Think of this as a relaxed coffee chat. We can't wait to hear your story and learn about your unique talents.",
    },
    {
      stepNumber: "03",
      title: "Welcome to the Team!",
      description: "Hooray! Grab your offer letter and get ready to kickstart an amazing internship journey with us.",
    },
  ];

  const ctaHeading = sanityData?.ctaHeading || "Join CopterCode";
  const ctaSubheading = sanityData?.ctaSubheading || "Where innovation meets opportunity. Apply now and start building the future with us.";
  const ctaButtonText = sanityData?.ctaButtonText || "Apply for Internship";
  const ctaLink = (sanityData?.ctaLink && !sanityData.ctaLink.includes("forms.gle"))
    ? sanityData.ctaLink
    : "/internship-registration";


  return (
    <div className="bg-background min-h-screen text-primary overflow-x-hidden">
      <SEO
        title={seoTitle || "Internship | Real-World Tech Experience"}
        description={seoDesc || "CopterCode internship program offers real-world experience in drone technology, AI, cybersecurity, software development, and renewable energy for students."}
        keywords={sanityData?.seo?.keywords || "internship program, drone technology, AI internship, cybersecurity training, software development, student internship, tech training"}
        canonicalUrl="https://coptercode.com/internship"
        ogTitle="CopterCode Internship Program"
        ogDescription="Gain real-world experience in drone tech, AI, and software development at CopterCode."
        twitterTitle="Intern at CopterCode"
        twitterDescription="Join the CopterCode internship program and gain invaluable industry experience."
      />
      {/* Full Size Sliding Hero Banner */}
      <section className="relative h-[85vh] md:h-[90vh] min-h-[600px] w-full overflow-hidden bg-slate-950">
        <AnimatePresence>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={heroSlides[currentImageIndex]?.image}
              alt={heroSlides[currentImageIndex]?.title}
              className="w-full h-full object-cover"
            />
            {/* Soft, premium dark gradient overlay for quote legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/20 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
          </motion.div>
        </AnimatePresence>

        {/* Floating Back Button (Top Left) */}
        <div className="fixed top-24 left-6 md:left-12 z-50">
          <BackButton />
        </div>

        {/* Floating Apply Now Button (Top Right) */}
        <div className="absolute top-24 right-6 md:right-12 z-30">
          <Link to="/internship-registration">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex bg-white hover:bg-slate-100 text-black font-extrabold uppercase tracking-widest text-[10px] md:text-xs py-4 px-8 rounded-full shadow-lg items-center gap-3 transition-all duration-300 transform hover:scale-105 group"
            >
              <span>{sanityData?.heroScrollButtonText || "Ready to Launch? Apply Now"}</span>
              <ArrowRight size={16} className="text-black group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </div>

        {/* Carousel Content */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl w-full">
            <div className="max-w-3xl text-left">
              <span className="px-3.5 py-1.5 bg-blue-500/10 text-blue-400 text-[10px] font-extrabold tracking-[0.2em] uppercase rounded border border-blue-500/20 inline-block mb-6 backdrop-blur-sm">
                {heroSlides[currentImageIndex]?.category}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-black tracking-tight text-white mb-6 leading-[1.1]">
                {heroSlides[currentImageIndex]?.title}
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 font-medium italic mb-2 border-l-4 border-blue-500 pl-4 leading-relaxed max-w-2xl">
                "{heroSlides[currentImageIndex]?.quote}"
              </p>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        {heroSlides.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`h-1.5 transition-all duration-500 rounded-full ${currentImageIndex === idx ? "w-8 bg-blue-500" : "w-2 bg-slate-500/50 hover:bg-slate-500"}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Carousel Arrow Controls */}
        {heroSlides.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-950/40 hover:bg-slate-950/70 border border-white/5 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 hidden md:flex"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-950/40 hover:bg-slate-950/70 border border-white/5 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 hidden md:flex"
              aria-label="Next Slide"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </section>

      {/* Introduction Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Decor */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg text-secondary leading-relaxed mb-16"
          >
            <p className="text-xl text-primary font-medium mb-6">
              {introText1}
            </p>
            <p>
              {introText2}
            </p>
          </motion.div>

          {/* Purpose Section - Dark & Premium Theme */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 50 }}
            className="bg-slate-950 rounded-3xl p-10 md:p-12 border border-slate-800 mb-20 relative overflow-hidden shadow-2xl"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              className="absolute top-[-50px] right-[-50px] p-10 opacity-[0.08]"
            >
              <Star size={150} className="text-white" />
            </motion.div>

            <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[9px] font-extrabold tracking-[0.2em] uppercase rounded border border-blue-500/20 inline-block mb-6 backdrop-blur-sm">
              Core Objective
            </span>

            <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6">
              {purposeTitle}
            </h2>
            <p className="text-slate-400 mb-8 text-base md:text-lg leading-relaxed max-w-3xl">
              {purposeText}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
              {purposeList.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 6 }}
                  className="border-l-2 border-slate-800 pl-4 py-2 hover:border-blue-500 transition-all duration-300 group flex items-start gap-3.5"
                >
                  <CheckCircle
                    className="text-blue-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    size={18}
                  />
                  <span className="text-white font-bold text-sm md:text-base leading-relaxed">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Eligibility & Slots Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            {/* Eligibility */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-display font-bold text-primary mb-6">
                {eligibilityTitle}
              </h3>
              <ul className="space-y-4">
                {eligibilityList.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3 text-secondary"
                  >
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2.5 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Duration & Slots */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-display font-bold text-primary mb-6">
                {durationTitle}
              </h3>
              <p className="text-secondary mb-6">
                {durationText}
              </p>

              <div className="space-y-4">
                {slots.map((slot, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 10, scale: 1.02 }}
                    className={`bg-slate-950 border-l-4 ${i % 2 === 0 ? 'border-blue-500' : 'border-indigo-500'} p-6 rounded-r-lg shadow-sm border border-slate-800 hover:border-slate-700 hover:shadow-lg transition-all cursor-pointer`}
                  >
                    <h4 className="font-bold text-white text-lg">{slot.title}</h4>
                    <p className="text-slate-400 font-bold">{slot.months}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Application Process */}
          <div className="mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-display font-bold text-center mb-12 text-primary"
            >
              {processTitle}
            </motion.h2>
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
            >
              {/* Connector Line - Positioned to pass through the circles */}
              <div className="hidden md:block absolute top-[60px] left-[16%] right-[16%] h-[2px] bg-slate-800 z-0"></div>

              {processSteps.map((item, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { type: "spring", stiffness: 50 },
                    },
                  }}
                  whileHover={{ y: -10 }}
                  className="bg-slate-950 p-10 rounded-2xl border border-slate-800 hover:border-blue-500 relative z-10 text-center hover:shadow-2xl hover:shadow-blue-500/5 transition-all group"
                >
                  <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-8 shadow-sm relative z-10 group-hover:scale-110 transition-transform duration-300 group-hover:border-blue-500 group-hover:text-blue-400">
                    {item.stepNumber || String(i + 1).padStart(2, '0')}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4">
                    {item.title}
                  </h4>
                  <p className="text-slate-400 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet Our Interns Section */}
      <section className="py-24 bg-background border-y border-border">
        <div className="container mx-auto px-6">
          <div className="mb-24">
            <InternsCarousel data={sanityData?.internsSection} />
          </div>
        </div>
      </section>

      {/* Hiring Partners / Logo Marquee */}
      <PartnerLogos data={sanityData?.partnersSection} />

      {/* CTA Section */}
      <section id="apply-section" className="py-24 relative overflow-hidden text-center border-t border-border group text-white">
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src={ctaBgImage}
            alt="Apply CTA Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        </div>
        <div className="absolute inset-0 bg-background/30 opacity-50 pointer-events-none" />
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-overlay"
        />
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
            {ctaHeading}
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            {ctaSubheading}
          </p>

          {ctaLink.startsWith("/") ? (
            <Link to={ctaLink}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-10 py-5 bg-white text-primary font-bold rounded-full text-lg hover:bg-accent hover:text-primary transition-all shadow-xl hover:shadow-2xl hover:shadow-accent/20"
              >
                {ctaButtonText} <ArrowRight className="ml-2" />
              </motion.button>
            </Link>
          ) : (
            <motion.a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-10 py-5 bg-white text-primary font-bold rounded-full text-lg hover:bg-accent hover:text-primary transition-all shadow-xl hover:shadow-2xl hover:shadow-accent/20"
            >
              {ctaButtonText} <ArrowRight className="ml-2" />
            </motion.a>
          )}
        </div>
      </section>
    </div>
  );
};

export default Internship;
