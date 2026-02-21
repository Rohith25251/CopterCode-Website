import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { client, urlFor } from "../lib/sanity";
import PageHeader from "../components/PageHeader";
import SEO from "../components/SEO";
import { Users, User, ArrowRight, Building2, Target, Award, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import OptimizedImage from "../components/OptimizedImage";

// Icon Map helper


const Administration = () => {
  const [sanityData, setSanityData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const query = `*[_type == "administrationPage"][0]{
      ...,
      executiveLeadership[]{
        ...,
        image { asset->{ url } }
      },
      boardMembers[]{
        ...,
        image { asset->{ url } }
      },
      advisoryBoard[]{
        ...,
        image { asset->{ url } }
      },
      managementTeam[]{
        ...,
        image { asset->{ url } }
      }
    }`;

    client.fetch(query).then((data) => {
      if (data) {
        setSanityData({
          ...data,
          executiveLeadership: data.executiveLeadership?.map(member => ({
            ...member,
            image: member.image?.asset?.url
          })),
          boardMembers: data.boardMembers?.map(member => ({
            ...member,
            image: member.image?.asset?.url
          })),
          advisoryBoard: data.advisoryBoard?.map(member => ({
            ...member,
            image: member.image?.asset?.url
          })),
          managementTeam: data.managementTeam?.map(member => ({
            ...member,
            image: member.image?.asset?.url
          }))
        });
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

  const heroTitle = sanityData?.heroTitle || "Administration";
  const heroSubtitle = sanityData?.heroSubtitle || "Guided by vision, integrity, and a commitment to excellence.";

  // Fallback Philosophy
  const FALLBACK_PHILOSOPHY = {
    heading: "Our Leadership Philosophy",
    description: "At CopterCode, our leadership is built on the principles of innovation, integrity, and impact. We believe in empowering our teams, fostering a culture of excellence, and driving sustainable growth that benefits all."
  };

  const philosophy = sanityData?.philosophy || FALLBACK_PHILOSOPHY;

  // Fallback Executive Leadership
  const FALLBACK_EXECUTIVE_LEADERSHIP = [
    {
      name: "Mr. Karthikeyan Sundharesan",
      role: "Chairman & Managing Director",
      description: "Leading CopterCode with a focus on sustainable growth and diversified innovation. Mr. Karthikeyan continues the legacy of our founder by steering the organization towards new heights in technology, manufacturing, and services."
    }
  ];

  const executiveLeadershipHeading = sanityData?.executiveLeadershipHeading || "Executive Leadership";
  const executiveLeadership = (sanityData?.executiveLeadership?.length > 0) ? sanityData.executiveLeadership : FALLBACK_EXECUTIVE_LEADERSHIP;

  const boardHeading = sanityData?.boardHeading || "Board of Directors";
  const boardMembers = sanityData?.boardMembers || [
    { name: "Mrs. Shanthi Sundharesan", role: "Board Member" },
    { name: "Ms. Karthika Sundharesan", role: "Board Member" },
    { name: "Mr. Venkatesh Janakiraman", role: "Board Member" },
  ];


  // Fallback Advisory Board
  const FALLBACK_ADVISORY_BOARD = [
    { name: "Dr. Robert Chen", role: "Technology Strategy Advisor" },
    { name: "Ms. Sarah Williams", role: "Global Markets Consultant" },
    { name: "Mr. David Thorne", role: "Financial Operations Advisor" },
    { name: "Prof. Emily Zhao", role: "Sustainability Expert" },
  ];

  // Fallback Management Team
  const FALLBACK_MANAGEMENT_TEAM = [
    { name: "Mr. James Anderson", role: "Chief Operating Officer" },
    { name: "Ms. Priya Patel", role: "Head of Innovation" },
    { name: "Mr. Michael Ross", role: "Director of Manufacturing" },
    { name: "Ms. Linda Garan", role: "Chief Financial Officer" },
  ];

  const advisoryHeading = sanityData?.advisoryHeading || "Advisory Board";
  const advisoryBoard = (sanityData?.advisoryBoard?.length > 0) ? sanityData.advisoryBoard : FALLBACK_ADVISORY_BOARD;

  const managementHeading = sanityData?.managementHeading || "Management Team";
  const managementTeam = (sanityData?.managementTeam?.length > 0) ? sanityData.managementTeam : FALLBACK_MANAGEMENT_TEAM;

  const quote = sanityData?.quote || '"The organization continues to pursue self-reliant, sustainable growth while honoring the legacy of its founder."';

  // Helper component for Executive Leadership Grid with Royal Design - Horizontal Layout
  const ExecutiveLeadershipGrid = ({ title, members }) => (
    <div className="mb-32 last:mb-0 relative">
      <div className="text-center mb-16">
        <h3 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">{title}</h3>
        <div className="w-20 h-2 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto rounded-full opacity-90"></div>
      </div>

      <div className="space-y-16 px-4">
        {members.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="group relative"
          >
            {/* Royal Frame Border */}
            <div className="absolute inset-0 rounded-3xl border-2 border-accent/30 group-hover:border-accent/60 transition-all duration-500 pointer-events-none" style={{ top: '-8px', left: '-8px', right: '-8px', bottom: '-8px' }}></div>
            
            {/* Main Card - Horizontal Layout */}
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-primary/20 transition-all duration-500 flex flex-row backdrop-blur-sm">
              {/* Premium Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent/10 transition-all duration-500"></div>

              {/* Image Container - Left Side */}
              <div className="w-full md:w-1/3 aspect-auto md:aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-accent/10 to-transparent flex-shrink-0">
                {member.image ? (
                  <OptimizedImage
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-accent/5">
                    <User size={80} className="text-accent/40" strokeWidth={1} />
                  </div>
                )}
                {/* Premium Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Decorative Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-80"></div>

                {/* Name Overlay INSIDE Image */}
                <div className="absolute bottom-0 left-0 w-full p-8 text-white z-10 md:hidden">
                  <h4 className="text-2xl font-bold leading-tight mb-2 font-display">{member.name}</h4>
                  <div className="h-1.5 w-16 bg-gradient-to-r from-accent to-accent/50 rounded-full"></div>
                </div>
              </div>

              {/* Details Section - Right Side */}
              <div className="flex-1 bg-white pt-32 md:pt-40 px-8 md:px-12 pb-8 md:pb-12 border-t md:border-t-0 md:border-l border-accent/10 flex flex-col justify-start relative z-20">
                {/* Name - Desktop Only */}
                <h4 className="hidden md:block text-3xl font-bold mb-4 font-display text-primary">{member.name}</h4>
                
                {/* Role */}
                <div className="mb-6">
                  <p className="text-sm font-bold text-accent tracking-widest uppercase border-l-4 border-accent pl-4 py-2">
                    {member.role}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-1 w-12 bg-gradient-to-r from-accent to-accent/50 rounded-full mb-6"></div>

                {/* Description - Always Visible */}
                {member.description && (
                  <div className="flex-1">
                    <p className="text-base text-secondary leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 right-0 h-1 w-0 bg-gradient-to-l from-accent/30 via-accent to-accent/30 opacity-80 group-hover:w-full transition-all duration-500"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Helper component for Member Grid with Enhanced Design
  const MemberGrid = ({ title, members }) => (
    <div className="mb-32 last:mb-0 relative">
      <div className="text-center mb-16">
        <h3 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">{title}</h3>
        <div className="w-16 h-1.5 bg-accent mx-auto rounded-full opacity-80"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center px-4">
        {members.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
          >
            {/* Image Container */}
            <div className="w-full aspect-[3/4] relative overflow-hidden bg-gray-100">
              {member.image ? (
                <OptimizedImage
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <User size={64} strokeWidth={1} />
                </div>
              )}
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300" />

              {/* Name Overlay INSIDE Image Container */}
              <div className="absolute bottom-0 left-0 w-full p-6 text-white z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="text-xl md:text-2xl font-bold leading-tight mb-1">{member.name}</h4>
                <div className="h-1 w-12 bg-accent rounded-full mb-3 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            </div>

            {/* Role Below Image */}
            <div className="bg-white p-6 border-t border-gray-100 flex-1 flex flex-col justify-center relative z-20">
              <p className="text-sm font-bold text-secondary tracking-wide uppercase border-l-4 border-accent pl-3">
                {member.role}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-[#FAF9F5] min-h-screen text-primary selection:bg-accent selection:text-white font-sans">
      <SEO
        title={sanityData?.seo?.metaTitle || "Administration | Leadership & Governance"}
        description={sanityData?.seo?.metaDescription || "Meet CopterCode's executive leadership, board of directors, and advisory team. Strong governance and strategic leadership for innovation and growth."}
        keywords={sanityData?.seo?.keywords || "leadership team, executive management, board of directors, company governance, administration, CopterCode leadership"}
        canonicalUrl="https://coptercode.com/administration"
        ogTitle="CopterCode Administration - Leading with Vision"
        ogDescription="Our administration is dedicated to integrity and sustainable growth. Learn about our governance structure and the team steering CopterCode towards the future."
      />

      {/* Header */}
      <div className="pt-32 pb-20 text-center bg-[#FAF9F5] relative overflow-hidden">


        <h1 className="text-5xl md:text-7xl font-display font-bold text-primary mb-8 tracking-tight relative z-10">
          {heroTitle}
        </h1>
        <p className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto font-light leading-relaxed px-6 relative z-10">
          {heroSubtitle}
        </p>
      </div>

      {/* Philosophy Section */}
      <section className="py-24 bg-white relative shadow-sm border-y border-gray-100">
        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <div className="inline-block p-3 rounded-full bg-accent/5 text-accent mb-6">
            <Target size={32} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-8">
            {philosophy.heading}
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-secondary leading-relaxed font-light">
              {philosophy.description}
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Leadership (Executive, Board & Others) */}
      <section id="executive-leadership" className="py-32 bg-[#FAF9F5]">
        <div className="container mx-auto px-6 max-w-7xl">

          {/* Executive Leadership Grid - Royal Design */}
          <ExecutiveLeadershipGrid title={executiveLeadershipHeading} members={executiveLeadership} />

          {/* Board Members Grid */}
          <MemberGrid title={boardHeading} members={boardMembers} icon={Building2} />

          {/* Advisory Board Grid */}
          <MemberGrid title={advisoryHeading} members={advisoryBoard} icon={Target} />

          {/* Management Team Grid */}
          <MemberGrid title={managementHeading} members={managementTeam} icon={Award} />


          <div className="mt-32 text-center max-w-4xl mx-auto relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent/10 pointer-events-none">
              <Award size={120} />
            </div>
            <p className="text-2xl md:text-3xl text-secondary font-light italic leading-relaxed relative z-10">
              {quote}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Administration;
