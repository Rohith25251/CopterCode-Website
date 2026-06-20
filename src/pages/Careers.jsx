import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { client } from "../lib/sanity";
import PageHeader from "../components/PageHeader";
import OptimizedImage from "../components/OptimizedImage";
import SEO from "../components/SEO";
import { iconComponentMap } from '../sanity/schemas/icons';
import {
  Briefcase,
  Heart,
  Globe,
  Award,
  Zap,
  ArrowRight,
  Shield,
  Users,
  Target,
  Lightbulb,
  Star,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "@portabletext/react";
import BackButton from "../components/ui/BackButton";

const careersPortableTextComponents = {
  marks: {
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noindex nofollow' : undefined}
          className="text-blue-700 hover:underline font-bold transition-colors inline"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
    em: ({ children }) => <em className="italic text-slate-800">{children}</em>
  }
};

const HERO_SLIDES = [
  {
    image: "/_optimized/mediafiles/career/IMG_1851.webp",
    category: "Featured Story",
    title: "Gearing Up For Success",
    quote: "Meet the engineers behind CopterCode's advanced commercial UAV systems, designing the future of autonomous logistics.",
    tag: "UAV Systems",
    linkText: "Explore UAV Roles",
    link: "#all-roles"
  },
  {
    image: "/_optimized/mediafiles/career/IMG_3322.webp",
    category: "Innovation & AI",
    title: "Where AI Meets Flight Control",
    quote: "Empowering skies with advanced intelligence. We are developing the machine learning systems that power next-gen collision avoidance.",
    tag: "Flight AI Lab",
    linkText: "View AI Positions",
    link: "#all-roles"
  },
  {
    image: "/_optimized/mediafiles/career/IMG_3327.webp",
    category: "Global Collaboration",
    title: "Connecting Texas to Chennai",
    quote: "Work with global teams from USA & India on international live projects. Innovation is boundaryless at CopterCode.",
    tag: "Global Engineering",
    linkText: "Learn About Us",
    link: "/about"
  },
  {
    image: "/_optimized/mediafiles/career/IMG_3330.webp",
    category: "Culture & Diversity",
    title: "Pioneering the Future Together",
    quote: "An inclusive and merit-based ecosystem where bold ideas are celebrated and nurtured. Shape the next flight path with us.",
    tag: "Working With Us",
    linkText: "Meet the Team",
    link: "/contact"
  }
];

const STORY_CARDS = [
  {
    image: "/_optimized/mediafiles/career/IMG_1851.webp",
    company: "COPTERCODE UAV",
    title: "Ravi Kumar: Built For The Skies",
    description: "CopterCode UAV Division's Ravi Kumar led the first autonomous drone survey mission across the Western Ghats, pushing the limits of CopterCode's ruggedized field UAV systems.",
    category: "Adventure & Field Testing",
    link: "mailto:hr@coptercode.co.in?subject=Application for Senior Drone Engineer"
  },
  {
    image: "/_optimized/mediafiles/career/IMG_3322.webp",
    company: "COPTERCODE AI",
    title: "Notes From The Assembly Line",
    description: "A day in the lives of the engineers on CopterCode's drone hardware assembly floor — building precision-grade industrial UAVs that power real-world automation.",
    category: "Tech & Manufacturing",
    link: "mailto:hr@coptercode.co.in?subject=Application for Senior Drone Engineer"
  },
  {
    image: "/_optimized/mediafiles/career/IMG_3327.webp",
    company: "COPTERCODE LABS",
    title: "Under Her Watch: Lead R&D",
    description: "In conversation with Priya Venkatesh, Lead Researcher at CopterCode Robotics and Automation Division, on pioneering AI-driven flight control systems and thermal vision sensing.",
    category: "Leadership & R&D",
    link: "mailto:hr@coptercode.co.in?subject=Application for AI/ML Researcher"
  },
  {
    image: "/_optimized/mediafiles/career/IMG_3330.webp",
    company: "COPTERCODE SOFTWARE",
    title: "Arjun Nair: Code That Flies",
    description: "Arjun Nair, VP of Software Systems, shares his experience architecting the real-time telemetry dashboard that powers CopterCode's international UAV monitoring programs.",
    category: "Software Engineering",
    link: "mailto:hr@coptercode.co.in?subject=Application for Full Stack Developer"
  }
];

const INTERN_IMAGES = [
  {
    src: "/_optimized/mediafiles/Intern/A Devendhiran   -   Shree Sathyam College of Engineering And Technology   -  Fresher  -   Full Stack\u00a0Developer-800.webp",
    name: "A Devendhiran",
    role: "Full Stack Developer",
    college: "Shree Sathyam College of Eng & Tech"
  },
  {
    src: "/_optimized/mediafiles/Intern/A Senthurapandi  -    Shree Sathyam college of Engineering And Technology    -   Fresher   -   IOT Data\u00a0Analysts-800.webp",
    name: "A Senthurapandi",
    role: "IoT Data Analyst",
    college: "Shree Sathyam College of Eng & Tech"
  },
  {
    src: "/_optimized/mediafiles/Intern/A kathir   -  Shree Sathyam college of Engineering And Technology   -  Fresher  -   Cybersecurity Analyst-800.webp",
    name: "A Kathir",
    role: "Cybersecurity Analyst",
    college: "Shree Sathyam College of Eng & Tech"
  },
  {
    src: "/_optimized/mediafiles/Intern/Aathi Lakshmi -  Mepco Schlenk Engineering College  -   Fresher  -   Drone Development\u00a0Designer-800.webp",
    name: "Aathi Lakshmi",
    role: "Drone Development Designer",
    college: "Mepco Schlenk Engineering College"
  },
  {
    src: "/_optimized/mediafiles/Intern/Abinaya K  - KPR Institute of Engineering and Technology  -  Fresher Cloud Architect-800.webp",
    name: "Abinaya K",
    role: "Cloud Architect",
    college: "KPR Institute of Eng & Tech"
  }
];

const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const Careers = () => {
  const [sanityData, setSanityData] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentInternIndex, setCurrentInternIndex] = useState(0);
  const [currentCtaImageIndex, setCurrentCtaImageIndex] = useState(0);

  // Resolved dynamic variables with fallbacks
  const heroSlides = sanityData?.heroSlides || HERO_SLIDES;
  const storyCards = sanityData?.communityStories || STORY_CARDS;
  const internsPool = sanityData?.internsList || INTERN_IMAGES;
  const ctaImagesPool = (sanityData?.ctaImages?.length > 0)
    ? sanityData.ctaImages
    : (sanityData?.communityStories?.map(s => s.image).filter(Boolean) || STORY_CARDS.map(s => s.image).filter(Boolean));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCtaImageIndex((prev) => (prev + 1) % ctaImagesPool.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [ctaImagesPool]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentInternIndex((prev) => (prev + 1) % internsPool.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [internsPool]);

  useEffect(() => {
    const query = `*[_type == "careersPage"][0]{
      ...,
      trusted {
        heading,
        logos[] { asset->{ url } }
      },
      heroSlides[]{
        ...,
        image { asset->{ url } }
      },
      internsSection {
        tag,
        list[]{
          ...,
          image { asset->{ url } }
        }
      },
      openingsSection {
        ...,
        featuredRoles[]{
          ...,
          _type == "reference" => @->
        }
      },
      positions {
        ...,
        list[]{
          ...,
          _type == "reference" => @->
        }
      },
      communityStories {
        tag,
        heading,
        stories[]{
          ...,
          image { asset->{ url } }
        }
      },
      cta {
        ...,
        images[] { asset->{ url } }
      }
    }`;

    client.fetch(query).then((data) => {
      if (data) {
        console.log('✅ Careers page data loaded from Sanity');
        setSanityData({
          seo: data.seo,
          heroSlides: data.heroSlides?.map(slide => ({
            ...slide,
            image: slide.image?.asset?.url
          })),
          benefitsHeading: data.benefits?.heading,
          benefitsDescription: data.benefits?.description,
          benefitsList: data.benefits?.list,
          trustedHeading: data.trusted?.heading,
          trustedLogos: data.trusted?.logos?.map(l => l.asset.url),
          openingsTag: data.openingsSection?.tag,
          openingsHeading: data.openingsSection?.heading,
          openingsDescription: data.openingsSection?.description,
          featuredRoles: data.openingsSection?.featuredRoles,
          internsTag: data.internsSection?.tag,
          internsList: data.internsSection?.list?.map(intern => ({
            src: intern.image?.asset?.url,
            name: intern.name,
            role: intern.role,
            college: intern.college
          })),
          rolesLabel: data.positions?.label,
          rolesHeading: data.positions?.heading,
          rolesDescription: data.positions?.description,
          rolesHiringNote: data.positions?.hiringNote,
          rolesAboutTitle: data.positions?.aboutTitle,
          rolesAboutText: data.positions?.aboutText,
          openRoles: data.positions?.list,
          communityTag: data.communityStories?.tag,
          communityHeading: data.communityStories?.heading,
          communityStories: data.communityStories?.stories?.map(story => ({
            ...story,
            image: story.image?.asset?.url
          })),
          ctaHeading: data.cta?.heading,
          ctaDescription: data.cta?.description,
          ctaImages: data.cta?.images?.map(img => img.asset?.url).filter(Boolean),
          ctaButtonText: data.cta?.buttonText,
          ctaButtonLink: data.cta?.buttonLink,
          ctaSecondaryButtonText: data.cta?.secondaryButtonText,
          ctaSecondaryButtonLink: data.cta?.secondaryButtonLink,
          ctaFooterNote: data.cta?.footerNote
        });
      }
    }).catch(err => {
      console.error('❌ Error fetching careers page:', err.message || err);
    });
  }, []);

  // Sliding Carousel Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides]);

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
  };

  // Fallbacks
  const seoTitle = sanityData?.seo?.metaTitle || "Careers | Drone Tech & AI Engineering Jobs";
  const seoDesc = sanityData?.seo?.metaDescription || "Join CopterCode's innovative team. Explore careers in drone technology, AI/ML engineering, software development, and automation. Growth, global exposure, and benefits.";

  const benefitsHeading = sanityData?.benefitsHeading || "Why Work With Us?";
  const benefitsDescription = sanityData?.benefitsDescription || "We believe our people are our most valuable asset. At CopterCode, employees work in a progressive, inclusive, and empowering environment.";

  const rawBenefits = sanityData?.benefitsList || [
    {
      icon: "zap",
      title: "Culture of Learning",
      description: "Continuous innovation and learning opportunities.",
    },
    {
      icon: "award",
      title: "Merit-based Growth",
      description: "Recognizing and rewarding talent and hard work.",
    },
    {
      icon: "globe",
      title: "Global Exposure",
      description: "Work on international projects across India and USA.",
    },
    {
      icon: "heart",
      title: "Inclusive Workplace",
      description: "Diverse and inclusive environment for all.",
    },
    {
      icon: "briefcase",
      title: "Employee Well-being",
      description: "Focus on health, balance, and prosperity.",
    },
  ];

  const benefits = rawBenefits.map(b => ({
    ...b,
    IconComponent: iconComponentMap[b.icon?.toLowerCase()] || Star
  }));

  const trustedHeading = sanityData?.trustedHeading || "Trusted by Leading Innovators";
  const trustedLogos = sanityData?.trustedLogos || [];
  const hasSanityLogos = trustedLogos.length > 0;

  const rolesLabel = sanityData?.rolesLabel || "Opportunities";
  const rolesHeading = sanityData?.rolesHeading || "Open Roles";
  const rolesDescription = sanityData?.rolesDescription || "Find your next challenge.";

  const openRoles = sanityData?.openRoles || [
    {
      title: "Senior Drone Engineer",
      company: "CopterCode UAV",
      location: "Chennai, India",
      postedDate: "Jun 15, 2026",
      description: "Lead hardware engineering for autonomous UAV systems. Work on flight control systems, sensor integration, and drone architecture.",
      badges: ["Hardware", "Full-Time"],
      applyLink: "mailto:hr@coptercode.co.in?subject=Application for Senior Drone Engineer"
    },
    {
      title: "Full Stack Developer",
      company: "CopterCode Software",
      location: "Remote/Hybrid",
      postedDate: "Jun 12, 2026",
      description: "Build scalable web applications for drone telemetry and fleet management. Work with React, Node.js, and cloud technologies.",
      badges: ["Software", "Full-Time"],
      applyLink: "mailto:hr@coptercode.co.in?subject=Application for Full Stack Developer"
    },
    {
      title: "AI/ML Researcher",
      company: "CopterCode Labs",
      location: "Bangalore, India",
      postedDate: "Jun 10, 2026",
      description: "Develop machine learning models for collision avoidance and autonomous flight planning. Focus on computer vision and predictive algorithms.",
      badges: ["R&D", "Contract"],
      applyLink: "mailto:hr@coptercode.co.in?subject=Application for AI/ML Researcher"
    },
    {
      title: "Sales Executive",
      company: "CopterCode Business",
      location: "Mumbai, India",
      postedDate: "Jun 08, 2026",
      description: "Drive revenue growth by selling industrial UAV solutions to enterprise clients. Build relationships and expand market presence.",
      badges: ["Sales", "Full-Time"],
      applyLink: "mailto:hr@coptercode.co.in?subject=Application for Sales Executive"
    },
    {
      title: "Cybersecurity Analyst",
      company: "CopterCode Security",
      location: "Delhi, India",
      postedDate: "Jun 05, 2026",
      description: "Secure our drone systems and cloud infrastructure. Conduct security audits, implement best practices, and manage risk.",
      badges: ["Security", "Full-Time"],
      applyLink: "mailto:hr@coptercode.co.in?subject=Application for Cybersecurity Analyst"
    },
    {
      title: "Product Designer",
      company: "CopterCode Design",
      location: "Remote",
      postedDate: "Jun 01, 2026",
      description: "Design intuitive UX/UI for drone control applications and web platforms. Create user-centric experiences for complex systems.",
      badges: ["Design", "Full-Time"],
      applyLink: "mailto:hr@coptercode.co.in?subject=Application for Product Designer"
    },
  ];

  const featuredRolesPool = (sanityData?.featuredRoles?.length > 0)
    ? sanityData.featuredRoles
    : openRoles.slice(0, 2);

  const ctaDescription = sanityData?.ctaDescription || "Explore opportunities to work on cutting-edge drone technology, AI, and digital solutions.";
  const ctaButtonText = sanityData?.ctaButtonText || "Send Your Resume";
  const ctaButtonLink = sanityData?.ctaButtonLink || "mailto:hr@coptercode.co.in";

  return (
    <div className="bg-background min-h-screen text-primary selection:bg-primary selection:text-background overflow-x-hidden">
      <SEO
        title={seoTitle}
        description={seoDesc}
        keywords={sanityData?.seo?.keywords || "drone technology jobs, AI engineer, software engineering careers, CopterCode careers"}
        canonicalUrl="https://coptercode.com/careers"
        ogTitle="Careers at CopterCode"
        ogDescription="Build the future with CopterCode. Explore exciting job opportunities in drone tech, AI, and enterprise software."
      />

      {/* Floating fixed Back Button */}
      <div className="fixed top-24 left-6 md:left-12 z-50">
        <BackButton />
      </div>

      {/* Full Size Sliding Hero Banner */}
      <section className="relative h-[85vh] md:h-[90vh] min-h-[600px] w-full overflow-hidden bg-slate-950">
        <AnimatePresence>
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={heroSlides[currentSlideIndex]?.image}
              alt={heroSlides[currentSlideIndex]?.title}
              className="w-full h-full object-cover"
            />
            {/* Soft, premium dark gradient overlay for quote legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/20 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
          </motion.div>
        </AnimatePresence>

        {/* Carousel Content */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl w-full">
            <div className="max-w-3xl text-left">
              <span className="px-3.5 py-1.5 bg-blue-500/10 text-blue-400 text-[10px] font-extrabold tracking-[0.2em] uppercase rounded border border-blue-500/20 inline-block mb-6 backdrop-blur-sm">
                {heroSlides[currentSlideIndex]?.category}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-black tracking-tight text-white mb-6 leading-[1.1]">
                {heroSlides[currentSlideIndex]?.title}
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 font-medium italic mb-8 border-l-4 border-blue-500 pl-4 leading-relaxed max-w-2xl">
                "{heroSlides[currentSlideIndex]?.quote}"
              </p>
              <div className="flex items-center space-x-4">
                {heroSlides[currentSlideIndex]?.link?.startsWith("#") ? (
                  <a
                    href={heroSlides[currentSlideIndex]?.link}
                    className="inline-flex items-center bg-white hover:bg-slate-100 text-black font-extrabold uppercase tracking-widest text-[10px] py-4 px-8 rounded-full shadow-lg hover:shadow-white/20 transition-all duration-300 group"
                  >
                    {heroSlides[currentSlideIndex]?.linkText}
                    <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <Link
                    to={heroSlides[currentSlideIndex]?.link || "/"}
                    className="inline-flex items-center bg-white hover:bg-slate-100 text-black font-extrabold uppercase tracking-widest text-[10px] py-4 px-8 rounded-full shadow-lg hover:shadow-white/20 transition-all duration-300 group"
                  >
                    {heroSlides[currentSlideIndex]?.linkText}
                    <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full ${currentSlideIndex === idx ? "w-8 bg-blue-500" : "w-2 bg-slate-500/50 hover:bg-slate-500"}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Carousel Arrow Controls */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-950/40 hover:bg-slate-950/70 border border-white/5 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 hidden md:flex"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-950/40 hover:bg-slate-950/70 border border-white/5 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 hidden md:flex"
          aria-label="Next Slide"
        >
          <ChevronRight size={20} />
        </button>
      </section>

      {/* Main Job Openings Section - Dark & Elegant */}
      <section className="py-24 bg-white relative overflow-hidden" id="openings">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Left Side - Jobs Grid */}
            <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl">
              
              {/* Header */}
              <div className="mb-10">
                <span className="px-3.5 py-1.5 bg-blue-500/10 text-blue-400 text-[10px] font-extrabold tracking-[0.2em] uppercase rounded border border-blue-500/20 inline-block mb-6 backdrop-blur-sm">
                  {sanityData?.openingsTag || "Working With Us"}
                </span>
                {sanityData?.openingsHeading ? (
                  <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-white mb-6">
                    {sanityData.openingsHeading}
                  </h2>
                ) : (
                  <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-white mb-6">
                    Openings at <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">CopterCode</span>
                  </h2>
                )}
                <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mb-8">
                  {sanityData?.openingsDescription || "We design and build next-generation drone technologies, autonomous flight systems, and digital ecosystems. We are always looking for passionate engineers, designers, and innovators to join our team. Even if you don't see a matching position below, feel free to send us your resume."}
                </p>
              </div>

              {/* 2 Jobs Grid - 2 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {featuredRolesPool.map((job, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="border-l-2 border-slate-800 pl-4 group transition-colors duration-300"
                  >
                    <h3 className="text-lg md:text-xl font-display font-black text-white mb-2 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex items-center flex-wrap gap-2 text-sm text-slate-400 font-semibold">
                      <span>{job.company || "CopterCode"}</span>
                      {job.location && (
                        <>
                          <span className="text-blue-400">•</span>
                          <span>{job.location}</span>
                        </>
                      )}
                      {job.badges?.map((badge, bIdx) => (
                        <span key={bIdx} className="flex items-center">
                          <span className="text-blue-400 mr-2">•</span>
                          {badge}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="flex justify-end pt-6 border-t border-slate-800">
                <a href="#all-roles" className="text-slate-400 hover:text-white transition-colors flex items-center font-bold text-xs uppercase tracking-widest gap-2 group">
                  View All Openings
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Side - Intern Panel */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between h-full min-h-[550px] lg:min-h-full">
              
              {/* Image Section (3/4 of the card height) */}
              <div className="relative h-[72%] overflow-hidden bg-slate-200">
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3.5 py-1.5 bg-blue-500/10 text-blue-600 text-[10px] font-extrabold tracking-[0.2em] uppercase rounded border border-blue-500/20 inline-block backdrop-blur-sm">
                    {sanityData?.internsTag || "For Interns & Freshers"}
                  </span>
                </div>

                <AnimatePresence>
                  <motion.div
                    key={currentInternIndex}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {internsPool[currentInternIndex]?.src ? (
                      <img 
                        src={internsPool[currentInternIndex].src} 
                        alt={internsPool[currentInternIndex].name}
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-3">
                          <span className="text-3xl font-display font-black text-white/80">
                            {getInitials(internsPool[currentInternIndex]?.name)}
                          </span>
                        </div>
                        <span className="text-[9px] font-extrabold text-white/40 tracking-[0.2em] uppercase">CopterCode Intern</span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* CTA Section - Intern Card + Button (1/4 of the card height) */}
              <div className="p-6 md:p-8 flex items-center justify-between gap-4 h-[28%] bg-white border-t border-slate-100">
                <div className="text-left flex-grow max-w-[calc(100%-4rem)]">
                  <span className="text-[9px] font-extrabold text-blue-600 tracking-[0.2em] uppercase mb-1 block">
                    Featured Intern
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentInternIndex}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="text-lg md:text-xl font-display font-black text-slate-900 leading-tight uppercase truncate">
                        {internsPool[currentInternIndex]?.name}
                      </h4>
                      <p className="text-xs font-bold text-slate-600 mt-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        {internsPool[currentInternIndex]?.role}
                      </p>
                      <p className="text-[10px] font-semibold text-slate-500 mt-0.5 truncate">
                        {internsPool[currentInternIndex]?.college}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* CTA Button */}
                <a 
                  href="/internship-registration" 
                  className="w-12 h-12 rounded-full bg-slate-900 text-white hover:bg-slate-800 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg shrink-0 group/btn"
                  aria-label="Start Your Career"
                >
                  <ArrowRight size={20} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Benefits / Why Work With Us Section */}
      <section className="py-24 bg-background relative overflow-hidden border-t border-border/50">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-display font-black text-primary mb-6">
              {benefitsHeading}
            </h2>
            <div className="w-24 h-1 bg-primary/10 mx-auto mb-8 rounded-full"></div>
            <p className="text-lg text-secondary max-w-3xl mx-auto leading-relaxed font-semibold">
              {benefitsDescription}
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 justify-center"
          >
            {benefits.map((item, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 50, damping: 20 },
                  },
                }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group p-8 rounded-3xl border border-border bg-surface hover:bg-surface-highlight transition-all duration-500 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-background flex items-center justify-center mb-6 border border-border group-hover:scale-105 group-hover:border-primary/20 transition-transform duration-500">
                  <item.IconComponent size={28} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-secondary leading-relaxed font-semibold">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Logo Marquee Section */}
          <div className="mb-24 overflow-hidden border-t border-border pt-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h3 className="text-xs font-extrabold text-secondary uppercase tracking-[0.25em] mb-4">
                {trustedHeading}
              </h3>
              <div className="w-16 h-0.5 bg-primary/10 mx-auto rounded-full"></div>
            </motion.div>

            <div className="relative flex w-full overflow-hidden mask-image-gradient">
              <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10"></div>
              <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10"></div>

              <motion.div
                className="flex gap-8 items-center whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 40,
                }}
              >
                {[...Array(2)].map((_, sectionIdx) => (
                  <div key={sectionIdx} className="flex gap-8 items-center">
                    {hasSanityLogos ? (
                      trustedLogos.map((url, idx) => (
                        <div
                          key={`sanity-logo-${sectionIdx}-${idx}`}
                          className="w-32 h-24 sm:w-48 sm:h-32 flex-shrink-0 flex items-center justify-center transition-all duration-300 opacity-100 hover:scale-105"
                        >
                          <OptimizedImage
                            src={url}
                            alt={`Partner Logo ${idx}`}
                            className="max-w-full max-h-full object-contain"
                            sizes="128px"
                          />
                        </div>
                      ))
                    ) : (
                      [
                        "Gemini_Generated_Image_1898qy1898qy1898.webp",
                        "Gemini_Generated_Image_clfbv4clfbv4clfb.webp",
                        "Gemini_Generated_Image_l2e7mvl2e7mvl2e7.webp",
                        "Gemini_Generated_Image_l4utmml4utmml4ut.webp",
                        "Gemini_Generated_Image_z3rzx8z3rzx8z3rz.webp",
                        "Untitled design (1).webp",
                        "Untitled design (2).webp",
                        "Untitled design (3).webp",
                        "Untitled design (4).webp",
                        "Untitled design (5).webp",
                        "Untitled design (6).webp",
                        "Untitled design (7).webp",
                        "Untitled design.webp"
                      ].map((logoName) => (
                        <div
                          key={`logo-${sectionIdx}-${logoName}`}
                          className="w-32 h-24 sm:w-48 sm:h-32 flex-shrink-0 flex items-center justify-center transition-all duration-300 opacity-100 hover:scale-105"
                        >
                          <img
                            src={`/_optimized/mediafiles/logos/${logoName}`}
                            alt={`Partner Logo ${logoName}`}
                            className="max-w-full max-h-full object-contain filter brightness-95"
                          />
                        </div>
                      ))
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Stories Grid - TATA layout matching screenshot 2 */}
      <section className="py-24 bg-background border-t border-border/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-left mb-16">
            <span className="px-3.5 py-1.5 bg-surface-highlight text-primary text-[10px] font-extrabold tracking-widest uppercase rounded border border-border inline-block mb-4">
              {sanityData?.communityTag || "Our Community"}
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-primary leading-tight">
              {sanityData?.communityHeading || "Life and Culture at CopterCode"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {storyCards.map((story, idx) => {
              const isLarge = idx % 4 === 3;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  className={`${isLarge ? "lg:col-span-2 flex-col md:flex-row" : "flex-col"} bg-surface border border-border rounded-[2rem] overflow-hidden flex shadow-lg group hover:bg-surface-highlight transition-all duration-300`}
                >
                  <div className={`relative ${isLarge ? "md:w-1/2 h-64 md:h-auto" : "h-64"} overflow-hidden shrink-0`}>
                    {story.image && (
                      <img 
                        src={story.image} 
                        alt={story.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                      />
                    )}
                    <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-sm text-slate-300 px-3 py-1 rounded-md text-[9px] font-extrabold tracking-wider uppercase border border-white/5">
                      {story.category}
                    </div>
                  </div>
                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-secondary text-[10px] font-extrabold tracking-widest uppercase mb-3 block">{story.company}</span>
                      <h3 className="text-xl font-display font-black text-primary mb-4 leading-snug">{story.title}</h3>
                      <p className="text-xs text-secondary font-semibold leading-relaxed border-l border-border pl-3">{story.description}</p>
                    </div>
                    <div className="mt-8 flex justify-end">
                      <img src="/mediafiles/Preloder logo.png" alt="CopterCode" className="h-6 w-6 object-contain" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-slate-100 border-t border-slate-200/50">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left mb-16"
            id="all-roles"
          >
            <span className="px-3.5 py-1.5 bg-blue-500/10 text-blue-600 text-[10px] font-extrabold tracking-[0.2em] uppercase rounded border border-blue-400/30 inline-block mb-4 backdrop-blur-sm">
              {rolesLabel}
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 mb-4">
              {rolesHeading}
            </h2>
            <p className="text-slate-700 text-lg font-semibold max-w-3xl">
              {rolesDescription}
            </p>
            {sanityData?.rolesHiringNote ? (
              <div className="text-slate-600 text-sm mt-4 font-semibold">
                {Array.isArray(sanityData.rolesHiringNote) ? (
                  <PortableText value={sanityData.rolesHiringNote} components={careersPortableTextComponents} />
                ) : (
                  sanityData.rolesHiringNote
                )}
              </div>
            ) : (
              <p className="text-slate-600 text-sm mt-4 font-semibold">
                We are hiring talented engineers, designers, and specialists across <a href="/locations" className="text-blue-700 hover:underline font-bold">multiple locations</a> and remote positions. Check out our <a href="/about" className="text-blue-700 hover:underline font-bold">company culture</a> to see if you would be a great fit.
              </p>
            )}
          </motion.div>

          {/* Info Box */}
          <div className="mb-16 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-2">
              {sanityData?.rolesAboutTitle || "About Our Positions"}
            </h3>
            {sanityData?.rolesAboutText ? (
              <div className="text-xs text-slate-600 leading-relaxed font-semibold">
                {Array.isArray(sanityData.rolesAboutText) ? (
                  <PortableText value={sanityData.rolesAboutText} components={careersPortableTextComponents} />
                ) : (
                  sanityData.rolesAboutText
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                We offer competitive salaries, <a href="/contact" className="text-blue-700 hover:underline font-bold">flexible work arrangements</a>, professional development opportunities, and a collaborative environment where innovation thrives. Learn more about our <a href="/technologies" className="text-blue-700 hover:underline font-bold">technology stack</a> and technical focus areas.
              </p>
            )}
          </div>

          {/* Job Cards Grid - Enhanced Layout */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-4 mb-24"
          >
            {openRoles.map((job, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: {
                    opacity: 1,
                    x: 0,
                    transition: { type: "spring", stiffness: 50, damping: 20 },
                  },
                }}
                whileHover={{ y: -4 }}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="p-6 md:p-10">
                  <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                    
                    {/* Left: Company Logo Placeholder & Info */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200 flex items-center justify-center shadow-sm">
                        <div className="text-2xl md:text-3xl font-display font-black text-blue-700">
                          {job.company.charAt(0)}
                        </div>
                      </div>
                    </div>

                    {/* Middle: Job Details */}
                    <div className="flex-grow">
                      {/* Company Name */}
                      <span className="text-xs font-bold text-blue-700 tracking-widest uppercase mb-2 block opacity-90">
                        {job.company}
                      </span>
                      
                      {/* Job Title */}
                      <h3 className="text-2xl md:text-3xl font-display font-black text-slate-900 mb-3 transition-colors">
                        {job.title}
                      </h3>

                      {/* Location & Date */}
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mb-4 text-sm text-slate-600 font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500/60"></div>
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500/60"></div>
                          <span>Posted {job.postedDate}</span>
                        </div>
                      </div>

                      {/* Job Description */}
                      <p className="text-sm text-slate-700 leading-relaxed font-medium mb-4 border-l-2 border-blue-300 pl-4 text-justify">
                        {job.description}
                      </p>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2">
                        {job.badges.map((badge, bIdx) => (
                          <span
                            key={bIdx}
                            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-widest transition-colors"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: CTA Button */}
                    <div className="flex-shrink-0 flex items-center justify-end">
                      <a
                        href={job.applyLink}
                        className="px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold uppercase tracking-wider text-xs rounded-full transition-all duration-300 flex items-center justify-center whitespace-nowrap shadow-md hover:shadow-lg hover:scale-105 group/btn"
                      >
                        Apply Now
                        <ArrowRight size={16} className="ml-2.5 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Resume submission Section with Image Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-b from-slate-50 to-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl relative"
          >
            {/* Image Carousel */}
            <div className="relative h-56 md:h-80 overflow-hidden bg-slate-900">
              <AnimatePresence>
                <motion.div
                  key={currentCtaImageIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  {ctaImagesPool[currentCtaImageIndex] && (
                    <img
                      src={ctaImagesPool[currentCtaImageIndex]}
                      alt={sanityData?.ctaHeading || "Ready to Join Our Team?"}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                {ctaImagesPool.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentCtaImageIndex(idx)}
                    className={`h-2 transition-all duration-500 rounded-full ${currentCtaImageIndex === idx ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"}`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Content Section */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16 text-center">
              <h2 className="text-3xl md:text-5xl font-display font-black mb-6 tracking-tight text-slate-900">
                {sanityData?.ctaHeading || "Ready to Join Our Team?"}
              </h2>
              <div className="text-base md:text-lg text-slate-700 mb-10 leading-relaxed font-semibold max-w-3xl mx-auto">
                {Array.isArray(ctaDescription) ? (
                  <PortableText value={ctaDescription} components={careersPortableTextComponents} />
                ) : (
                  ctaDescription
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  href={ctaButtonLink}
                  className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-extrabold uppercase tracking-widest text-xs shadow-lg transition-all duration-300"
                >
                  {ctaButtonText} <ArrowRight className="ml-2" size={16} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  href={sanityData?.ctaSecondaryButtonLink || "/internship"}
                  className="inline-flex items-center justify-center border-2 border-slate-300 text-slate-900 px-8 py-4 rounded-full font-extrabold uppercase tracking-widest text-xs hover:bg-slate-100 transition-all duration-300"
                >
                  {sanityData?.ctaSecondaryButtonText || "Explore Internships"} <ArrowRight className="ml-2" size={16} />
                </motion.a>
              </div>
              <p className="text-sm text-slate-600 max-w-2xl mx-auto font-semibold">
                {sanityData?.ctaFooterNote || (
                  <>
                    Cannot find the right role? <a href="/contact" className="text-blue-700 hover:underline font-bold">Contact our HR team</a> to discuss potential opportunities in drone technology, AI, industrial automation, and enterprise software.
                  </>
                )}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
