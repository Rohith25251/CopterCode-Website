import React, { useState, useEffect } from "react";
import { client } from "../lib/sanity";
import PageHeader from "../components/PageHeader";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import {
  Target,
  Lightbulb,
  Users,
  Award,
  Shield,
  Briefcase,
  Zap,
  Globe,
} from "lucide-react";


import { useScrollToTop } from "../hooks/useScrollToTop";

// Icon Map helper
const iconMap = {
  lightbulb: Lightbulb,
  shield: Shield,
  globe: Globe,
  target: Target,
  users: Users,
  briefcase: Briefcase,
  zap: Zap,
  award: Award
};

const About = () => {
  useScrollToTop(); // Force scroll to top on mount
  const [sanityData, setSanityData] = useState(null);

  useEffect(() => {
    const query = `*[_type == "aboutPage"][0]`;
    client.fetch(query).then(data => {
      if (data) {
        setSanityData(data);
      }
    }).catch(console.error);
  }, []);

  // Consolidate data access
  const hero = sanityData?.hero;
  // If 'origin' field is missing in Sanity document but 'hero' exists, we should be careful. 
  // However, the schema defines these objects. 
  // We can use optional chaining and logical ORs in the JSX or simplify here.

  const origin = sanityData?.origin;
  const story = sanityData?.story;
  const leadership = sanityData?.leadership;
  const milestones = sanityData?.milestones;
  const seo = sanityData?.seo;

  // Fallback Story Data
  const FALLBACK_STORY = [
    {
      year: "The Inception (2019)",
      heading: "The Inception (2019)",
      description: "Founded in 2019 by the visionary Late Sundharesan Duraiswamy, CopterCode began with a dream to revolutionize industries using drones and technology. Starting with the sales and service of industrial drones, the company quickly grew under his intelligent strategies and tireless work ethic.",
      icon: "lightbulb"
    },
    {
      year: "Diversification & Growth (2020-2022)",
      heading: "Diversification & Growth (2020-2022)",
      description: "Expanding beyond drones, CopterCode ventured into cybersecurity for IT firms in 2020. In 2021, we pioneered Drone Labs and Science Space Labs in educational institutions to nurture young innovators. By 2022, driven by sustainability, we established textile manufacturing and solar panel solutions for corporate clients.",
      icon: "shield"
    },
    {
      year: "Global Footprint (2023-Present)",
      heading: "Global Footprint (2023-Present)",
      description: "From collaborating with global food chains like Shree Archana Sweets to venturing into construction (2023) and partnering with Shree Murugappa Food Corp (2024), we have diversified vastly. In 2025, we launched our advanced ERP, LMS software solutions, and infra-security services, solidifying our status as a diversified conglomerate.",
      icon: "globe"
    }
  ];

  const storyItems = story || FALLBACK_STORY;

  // Fallback Milestones
  const FALLBACK_MILESTONES = [
    { year: "2019", title: "Foundation", desc: "Established by Late Sundharesan Duraiswamy." },
    { year: "2020", title: "Cybersecurity", desc: "Expansion into IT security services." },
    { year: "2021", title: "Education", desc: "Launch of Drone Labs & Science Space." },
    { year: "2022", title: "Sustainability", desc: "Textile Mfg & Solar Solutions." },
    { year: "2023", title: "Infrastructure", desc: "Construction & Real Estate Ventures." },
    { year: "2024", title: "Strategic Partnerships", desc: "Collab with Shree Murugappa Food Corp." },
    { year: "2025", title: "Digital Transformation", desc: "ERP, LMS & Infra Security Launch." },
    { year: "Future", title: "Global 2.0", desc: "Continued innovation & global expansion." },
  ];

  const milestonesList = milestones ? milestones.map(m => ({ year: m.year, title: m.title, desc: m.description })) : FALLBACK_MILESTONES;


  return (
    <div className="bg-background min-h-screen text-primary">
      <SEO
        title={seo?.metaTitle || "About Us"}
        description={seo?.metaDescription || "CopterCode - History, Legacy, and Vision"}
      />
      <PageHeader
        title={hero?.title || "About Us"}
        subtitle={hero?.subtitle || "Revolutionizing industries with drones, technology, and sustainable innovation."}
      />

      <section className="py-24 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          {/* The Story & Legacy Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 items-start">
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block flex items-center">
                  <span className="w-8 h-[2px] bg-accent mr-3"></span> {origin?.label || "Our Origin"}
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6 leading-tight">
                  {origin?.heading || "From Vision to Reality"}
                </h2>
                <p className="text-secondary text-lg leading-relaxed mb-8">
                  {origin?.description || "A journey of relentless innovation, guided by a legacy of excellence and a commitment to transforming the future."}
                </p>
                <div className="p-6 bg-surface border border-border border-l-4 border-l-accent rounded-r-lg">
                  <p className="italic text-secondary font-medium">
                    "{origin?.quote || "Driven by sustainability, impacting People, Planet, and Prosperity."}"
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid gap-12">
                {/* Dynamic Story Blocks */}
                {storyItems.map((item, index) => {
                  const IconComponent = iconMap[item.icon] || Lightbulb;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-surface relative p-10 rounded-2xl border border-border text-primary shadow-lg hover:border-accent/30 transition-colors"
                    >
                      {index === 0 && (
                        <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-transparent rounded-2xl blur opacity-20 pointer-events-none" />
                      )}
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mr-4 border border-border">
                          <IconComponent className="text-secondary" size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-primary">
                          {item.heading || item.year}
                        </h3>
                      </div>
                      <p className="text-secondary leading-relaxed text-lg">
                        {item.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Leadership Section */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6">
                {leadership?.heading || "Administration & Vision"}
              </h2>
              <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
            </div>

            <div className="bg-surface border border-border rounded-3xl p-12 relative overflow-hidden text-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />

              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-secondary mb-8">
                  Currently, CopterCode is led by its Chairman & Managing Director:
                </p>
                <h3 className="text-4xl font-bold text-primary mb-2">
                  {leadership?.chairmanName || "Mr. Karthikeyan Sundharesan"}
                </h3>
                <p className="text-accent font-bold tracking-widest uppercase text-sm mb-12">
                  {leadership?.chairmanRole || "Chairman & Managing Director"}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-border">
                  {leadership?.boardMembers?.length > 0 ? (
                    leadership.boardMembers.map((member, idx) => (
                      <div key={idx}>
                        <h4 className="text-primary font-bold text-lg mb-1">
                          {member.name}
                        </h4>
                        <p className="text-xs text-secondary uppercase tracking-widest">
                          {member.role}
                        </p>
                      </div>
                    ))
                  ) : (
                    <>
                      <div>
                        <h4 className="text-primary font-bold text-lg mb-1">
                          Mrs. Shanthi Sundharesan
                        </h4>
                        <p className="text-xs text-secondary uppercase tracking-widest">
                          Board Member
                        </p>
                      </div>
                      <div>
                        <h4 className="text-primary font-bold text-lg mb-1">
                          Ms. Karthika Sundharesan
                        </h4>
                        <p className="text-xs text-secondary uppercase tracking-widest">
                          Board Member
                        </p>
                      </div>
                      <div>
                        <h4 className="text-primary font-bold text-lg mb-1">
                          Mr. Venkatesh Janakiraman
                        </h4>
                        <p className="text-xs text-secondary uppercase tracking-widest">
                          Board Member
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Grid */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-10 border-l-4 border-accent pl-4">
              Milestones at a Glance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestonesList.map((item, idx) => (
                <div
                  key={idx}
                  className="group bg-surface p-6 rounded-xl border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="text-4xl font-black text-primary/10 group-hover:text-primary/20 transition-colors mb-4 block transform group-hover:scale-110 origin-left duration-500">
                    {item.year}
                  </span>
                  <h4 className="text-primary font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-secondary leading-snug">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
