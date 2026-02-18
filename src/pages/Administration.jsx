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
      cmdImage { asset->{ url } },
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
          cmdImage: data.cmdImage?.asset?.url,
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

  const cmdName = sanityData?.cmdName || "Mr. Karthikeyan Sundharesan";
  const cmdRole = sanityData?.cmdRole || "Chairman & Managing Director";
  const cmdDesc = sanityData?.cmdDescription || "Leading CopterCode with a focus on sustainable growth and diversified innovation. Mr. Karthikeyan continues the legacy of our founder by steering the organization towards new heights in technology, manufacturing, and services.";
  const cmdImage = sanityData?.cmdImage;

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
        title={sanityData?.seo?.metaTitle || "Administration & Leadership | CopterCode"}
        description={sanityData?.seo?.metaDescription || "Meet the leadership team behind CopterCode. Committed to operational excellence, stronger governance, and driving technological innovation across all sectors."}
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

      {/* Detailed Leadership (CMD & Board & Others) */}
      <section id="executive-leadership" className="py-32 bg-[#FAF9F5]">
        <div className="container mx-auto px-6 max-w-7xl">

          {/* CMD Highlight - Executive Leadership */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-gray-100 flex flex-col md:flex-row items-center gap-12 mb-32 hover:shadow-xl transition-shadow duration-500">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl transform translate-x-4 translate-y-4 opacity-70 group-hover:opacity-100 transition-opacity"></div>
                {(cmdImage || sanityData?.cmdImage?.asset?.url) ? (
                  <OptimizedImage
                    src={cmdImage}
                    alt={cmdName}
                    className="w-72 h-72 object-cover rounded-full border-8 border-white shadow-2xl relative z-10"
                    sizes="288px"
                  />
                ) : (
                  <div className="w-72 h-72 rounded-full bg-[#FAF9F5] border-8 border-white shadow-2xl flex items-center justify-center relative z-10">
                    <User size={80} className="text-accent/30" />
                  </div>
                )}
              </div>
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left">
              <span className="text-accent font-bold tracking-[0.25em] uppercase text-xs mb-4 block inline-block border-b-2 border-accent pb-1">
                {sanityData?.cmdHeading || "Executive Leadership"}
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-3">
                {cmdName}
              </h2>
              <p className="text-xl text-secondary/80 font-medium tracking-wide mb-8">
                {cmdRole}
              </p>
              <div className="prose prose-lg text-secondary/90 max-w-none">
                <p className="leading-relaxed">{cmdDesc}</p>
              </div>
            </div>
          </div>

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
