import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import OptimizedImage from '../components/OptimizedImage';
import { client } from "../lib/sanity";
import PageHeader from "../components/PageHeader";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { iconComponentMap } from '../sanity/schemas/icons';
import {
  Rocket,
  TrendingUp,
  Globe,
  Users,
  Award,
  Building2,
  CheckCircle2,
  Lightbulb,
  Shield,
  Zap,
} from "lucide-react";
import { useScrollToTop } from "../hooks/useScrollToTop";

const About = () => {
  useScrollToTop(); // Force scroll to top on mount
  const location = useLocation();
  const [sanityData, setSanityData] = useState(null);

  useEffect(() => {
    // Updated query to match new schema structure
    const query = `*[_type == "aboutPage"][0]{
      ...,
      journey[]{
        ...,
        "imageUrl": image.asset->url
      },
      milestones[]
    }`;
    client.fetch(query).then((data) => {
      if (data) {
        setSanityData(data);
      }
    }).catch(console.error);
  }, []);

  // Handle hash-based scroll navigation
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.substring(1); // Remove # from hash
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.hash]);

  const hero = sanityData?.hero;
  const origin = sanityData?.origin;
  const leadership = sanityData?.leadership;
  const seo = sanityData?.seo;
  const milestones = sanityData?.milestones;

  // Fallback Journey Data (Expanded Year-by-Year)
  const FALLBACK_JOURNEY = [
    {
      year: "2019",
      title: "The Inception",
      description: "Founded in 2019 by the visionary Late Sundharesan Duraiswamy, CopterCode began with a bold dream to revolutionize industries using drones and cutting-edge technology. Starting with the sales and service of industrial drones, the company quickly gained traction and grew rapidly under his intelligent strategies, innovative mindset, and tireless work ethic. This year laid the foundation for what would become a diversified technology conglomerate.",
      imageUrl: "/mediafiles/news and media/IMG_1851.jpg",
      icon: "rocket",
    },
    {
      year: "2020",
      title: "Cybersecurity Expansion",
      description: "Building on initial success, CopterCode expanded beyond drones to venture into cybersecurity for IT firms in 2020. This strategic diversification marked our entry into the IT services sector, enabling us to serve corporate clients with comprehensive security solutions. The team grew significantly, attracting talented professionals to deliver enterprise-grade cybersecurity services to a growing client base across India.",
      imageUrl: "/mediafiles/news and media/IMG_3327.jpg",
      icon: "shield",
    },
    {
      year: "2021",
      title: "Education & Innovation",
      description: "In 2021, CopterCode pioneered a revolutionary concept by establishing Drone Labs and Science Space Labs in premier educational institutions. This initiative was designed to nurture the next generation of young innovators and tech enthusiasts. By bringing cutting-edge drone technology and scientific experimentation directly to schools and colleges, we created unique learning environments that sparked curiosity and fostered technological innovation in students.",
      imageUrl: "/mediafiles/news and media/IMG_3356.jpg",
      icon: "lightbulb",
    },
    {
      year: "2022",
      title: "Sustainability & Manufacturing",
      description: "Driven by a strong commitment to environmental sustainability, 2022 was a pivotal year as CopterCode established textile manufacturing units and launched solar panel solutions tailored for corporate clients. These ventures aligned with our vision to create businesses that are not just profitable but also environmentally responsible. We partnered with various industries to integrate sustainable practices into their operations while maintaining competitive pricing and quality standards.",
      imageUrl: "/mediafiles/news and media/IMG_3327.jpg",
      icon: "zap",
    },
    {
      year: "2023",
      title: "Infrastructure & Construction",
      description: "In 2023, CopterCode made a strategic entry into the construction and infrastructure sector, expanding our portfolio beyond technology and manufacturing. This venture allowed us to leverage our drone technology and project management expertise in the construction industry. We took on various infrastructure projects while maintaining our commitment to quality, safety, and timely delivery, establishing ourselves as a reliable partner in India's growing infrastructure development.",
      imageUrl: "/mediafiles/news and media/IMG_3327.jpg",
      icon: "building",
    },
    {
      year: "2024",
      title: "Strategic Partnerships",
      description: "2024 marked a year of significant collaborations and partnerships. CopterCode forged strategic alliances with renowned entities like Shree Murugappa Food Corp, enabling us to extend our reach into the food and beverage sector. These partnerships allowed us to apply our technological expertise to solve industry-specific challenges while creating synergies that benefited all stakeholders. Our reputation as a trusted, innovative partner continued to grow.",
      imageUrl: "/mediafiles/news and media/IMG_1851.jpg",
      icon: "users",
    },
    {
      year: "2025",
      title: "Digital Transformation",
      description: "In 2025, CopterCode launched its advanced ERP (Enterprise Resource Planning) and LMS (Learning Management System) software solutions alongside comprehensive infra-security services. These offerings solidified our position as a technology-driven conglomerate capable of providing end-to-end digital solutions. Our software solutions have been adopted by various enterprises, positioning CopterCode as a serious player in the enterprise software and cybersecurity space.",
      imageUrl: "/mediafiles/news and media/IMG_3356.jpg",
      icon: "chart",
    },
    {
      year: "2026-Present",
      title: "Global Footprint",
      description: "From collaborating with international food chains like Shree Archana Sweets to expanding our global presence, CopterCode has diversified vastly and become a truly global conglomerate. Our operations now span multiple continents, serving clients in various sectors including technology, manufacturing, agriculture, and infrastructure. With a vision to continue innovation and expand our global footprint, we remain committed to creating sustainable value for all stakeholders while driving technological advancement across industries.",
      imageUrl: "/mediafiles/news and media/IMG_3356.jpg",
      icon: "globe",
    },
  ];

  const journeyData = sanityData?.journey || FALLBACK_JOURNEY;

  // Fallback Milestones Data
  const FALLBACK_MILESTONES = [
    { year: "2019", title: "Foundation", description: "Established by Late Sundharesan Duraiswamy." },
    { year: "2020", title: "Cybersecurity", description: "Expansion into IT security services." },
    { year: "2021", title: "Education", description: "Launch of Drone Labs & Science Space." },
    { year: "2022", title: "Sustainability", description: "Textile Mfg & Solar Solutions." },
    { year: "2023", title: "Infrastructure", description: "Construction & Real Estate Ventures." },
    { year: "2024", title: "Strategic Partnerships", description: "Collab with Shree Murugappa Food Corp." },
    { year: "2025", title: "Digital Transformation", description: "ERP, LMS & Infra Security Launch." },
    { year: "Future", title: "Global 2.0", description: "Continued innovation & global expansion." },
  ];

  const milestonesData = milestones || FALLBACK_MILESTONES;

  return (
    <div className="bg-[#FAF9F5] min-h-screen text-primary selection:bg-accent selection:text-white">
      <SEO
        title={seo?.metaTitle || "About CopterCode | Innovation in Drones, AI & Industrial Automation"}
        description={seo?.metaDescription || "Discover CopterCode's journey from drone technology to enterprise AI, digital transformation, and sustainable solutions. Leading innovators in industrial automation and enterprise software."}
        keywords="CopterCode, drone technology, industrial automation, enterprise AI, digital transformation, sustainable innovation, IoT solutions"
      />

      {/* Header */}
      <div className="pt-32 pb-12 text-center bg-[#FAF9F5]">
        <h1 className="text-5xl md:text-7xl font-display font-bold text-primary mb-6 tracking-tight">
          {hero?.title || "About Us"}
        </h1>
        <p className="text-xl md:text-2xl text-secondary max-w-2xl mx-auto font-light leading-relaxed">
          {hero?.subtitle || "Revolutionizing industries with drones, technology, and sustainable innovation."}
        </p>
      </div>

      {/* Origin Section (Premium) */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2">
              <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block flex items-center">
                <span className="w-8 h-[2px] bg-accent mr-3"></span> Our Origin
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6 leading-tight">
                {origin?.heading || "From Vision to Reality"}
              </h2>
              <div className="prose prose-lg text-secondary">
                <p className="leading-relaxed">
                  {origin?.description || "A journey of relentless innovation, guided by a legacy of excellence and a commitment to transforming the future."}
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="bg-[#FAF9F5] p-10 rounded-3xl border border-gray-100 relative">
                <div className="absolute -top-4 -left-4 text-accent text-6xl opacity-20 font-serif">"</div>
                <p className="italic text-xl text-primary font-medium relative z-10">
                  {origin?.quote || "Driven by sustainability, impacting People, Planet, and Prosperity."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24 relative overflow-hidden bg-[#FAF9F5]">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="relative">
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent border-l border-dashed border-accent/30" />

            <div className="space-y-24 md:space-y-0">
              {journeyData.map((item, index) => {
                const isEven = index % 2 === 0;
                const Icon = iconComponentMap[item.icon?.toLowerCase()] || iconComponentMap.lightbulb;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className={`flex flex-col md:flex-row items-center justify-between md:mb-32 relative ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                  >
                    {/* Content */}
                    <div className={`w-full md:w-5/12 ${isEven ? "md:text-left md:pr-16" : "md:text-left md:pl-16"} mb-12 md:mb-0`}>
                      <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold text-white mb-6 uppercase tracking-wider ${['bg-accent', 'bg-blue-600', 'bg-emerald-600'][index % 3]
                        }`}>
                        {item.year}
                      </span>
                      <h3 className="text-3xl font-display font-bold text-primary mb-4">
                        {item.title}
                      </h3>
                      <p className="text-lg text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Desktop Center Icon */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center w-20 h-20 bg-white rounded-full border-4 border-[#FAF9F5] shadow-xl z-20">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-accent bg-accent/5">
                        <Icon size={24} className="stroke-[2px]" />
                      </div>
                    </div>

                    {/* Image */}
                    <div className="w-full md:w-5/12">
                      <div className="relative group rounded-3xl overflow-hidden shadow-2xl border-[4px] border-white transform transition-transform duration-500 hover:scale-[1.01]">
                        <div className="aspect-[16/10] bg-gray-200 relative overflow-hidden">
                          {item.imageUrl && (
                            <OptimizedImage
                              src={item.imageUrl}
                              alt={item.title}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="(min-width:1024px) 40vw, 100vw"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
              {leadership?.heading || "Administration & Vision"}
            </h2>
            <div className="w-20 h-1.5 bg-accent mx-auto rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto bg-[#EFF6FF] rounded-[2.5rem] p-12 lg:p-16 text-center shadow-sm border border-blue-50">
            <p className="text-secondary text-lg mb-8">Currently, CopterCode is led by its Chairman & Managing Director:</p>
            <h3 className="text-4xl font-bold text-primary mb-2">
              {leadership?.chairmanName || "Mr. Karthikeyan Sundharesan"}
            </h3>
            <p className="text-accent font-bold tracking-widest uppercase text-sm mb-12">
              {leadership?.chairmanRole || "Chairman & Managing Director"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-blue-100">
              {leadership?.boardMembers?.length > 0 ? (
                leadership.boardMembers.map((member, idx) => (
                  <div key={idx}>
                    <h4 className="text-primary font-bold text-lg">{member.name}</h4>
                    <p className="text-xs text-secondary uppercase tracking-widest mt-1">{member.role}</p>
                  </div>
                ))
              ) : (
                ['Mrs. Shanthi Sundharesan', 'Ms. Karthika Sundharesan', 'Mr. Venkatesh Janakiraman'].map((name, idx) => (
                  <div key={idx}>
                    <h4 className="text-primary font-bold text-lg">{name}</h4>
                    <p className="text-xs text-secondary uppercase tracking-widest mt-1">Board Member</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Grid */}
      <section id="milestones-at-a-glance" className="py-24 bg-[#FAF9F5]">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-primary mb-12 border-l-8 border-accent pl-6">
            Milestones at a Glance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestonesData.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <span className="text-5xl font-black text-gray-100 mb-4 block">
                  {item.year.replace(/[^0-9]/g, '').substring(0, 4)}
                </span>
                <h4 className="text-primary font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-sm text-secondary leading-snug">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
