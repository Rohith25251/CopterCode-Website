import { useState, useEffect } from "react";
import { client, urlFor } from "../lib/sanity";
import PageHeader from "../components/PageHeader";
import SEO from "../components/SEO";
import { Users, User, ArrowRight, Building2, Target, Award, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import OptimizedImage from "../components/OptimizedImage";

// Icon Map helper
const iconMap = {
  users: Users,
  building: Building2,
  target: Target,
  badge: Award, // using Award as a proxy for Management badge
};

const Administration = () => {
  const [sanityData, setSanityData] = useState(null);

  useEffect(() => {
    const query = `*[_type == "administrationPage"][0]{
      ...,
      cmdImage { asset->{ url } },
      boardMembers[]{
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
          }))
        });
      }
    }).catch(console.error);
  }, []);

  const heroTitle = sanityData?.heroTitle || "Administration";
  const heroSubtitle = sanityData?.heroSubtitle || "Guided by vision, integrity, and a commitment to excellence.";

  // Fallback Governance Cards
  const FALLBACK_GOVERNANCE_CARDS = [
    {
      title: "Leadership Team",
      subtitle: "EXECUTIVE LEADERSHIP",
      description: "Our experienced leadership team drives innovation and strategic growth across all verticals.",
      icon: "users"
    },
    {
      title: "Board of Directors",
      subtitle: "GOVERNANCE",
      description: "Providing strategic oversight and guidance to ensure sustainable growth and corporate excellence.",
      icon: "building"
    },
    {
      title: "Advisory Board",
      subtitle: "STRATEGIC ADVISORS",
      description: "Industry experts and thought leaders guiding our technological and business direction.",
      icon: "target"
    },
    {
      title: "Management Team",
      subtitle: "OPERATIONS",
      description: "Dedicated professionals ensuring operational excellence and delivering value to stakeholders.",
      icon: "badge"
    }
  ];

  const governanceCards = sanityData?.governanceCards || FALLBACK_GOVERNANCE_CARDS;

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

  const quote = sanityData?.quote || '"The organization continues to pursue self-reliant, sustainable growth while honoring the legacy of its founder."';

  return (
    <div className="bg-[#FAF9F5] min-h-screen text-primary selection:bg-accent selection:text-white">
      <SEO
        title={sanityData?.seo?.metaTitle || "Administration & Leadership | CopterCode"}
        description={sanityData?.seo?.metaDescription || "Meet the leadership team behind CopterCode. Committed to operational excellence, stronger governance, and driving technological innovation across all sectors."}
        ogTitle="CopterCode Administration - Leading with Vision"
        ogDescription="Our administration is dedicated to integrity and sustainable growth. Learn about our governance structure and the team steering CopterCode towards the future."
      />

      {/* Header */}
      <div className="pt-32 pb-16 text-center bg-[#FAF9F5]">
        <h1 className="text-5xl md:text-7xl font-display font-bold text-primary mb-6 tracking-tight">
          {heroTitle}
        </h1>
        <p className="text-xl md:text-2xl text-secondary max-w-2xl mx-auto font-light leading-relaxed">
          {heroSubtitle}
        </p>
      </div>

      {/* Governance Cards Section */}
      <section className="py-20 relative overflow-hidden bg-[#FAF9F5]">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {governanceCards.map((card, idx) => {
              const Icon = iconMap[card.icon] || Users;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-accent/20 transition-all duration-300 group text-center flex flex-col items-center h-full"
                >
                  <div className="mb-6 p-4 rounded-full bg-accent/5 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    <Icon size={32} className="stroke-[1.5px]" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2 min-h-[3.5rem] flex items-center justify-center">{card.title}</h3>
                  <p className="text-xs font-bold text-accent tracking-widest uppercase mb-4">{card.subtitle}</p>
                  <p className="text-sm text-secondary leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-8">
            {philosophy.heading}
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-secondary leading-relaxed font-light">
            {philosophy.description}
          </p>
        </div>
      </section>

      {/* Detailed Leadership (CMD & Board) */}
      <section className="py-24 bg-[#FAF9F5] border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">

          {/* CMD Highlight */}
          <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/10 rounded-full blur-2xl transform translate-x-2 translate-y-2"></div>
                {cmdImage ? (
                  <OptimizedImage
                    src={cmdImage}
                    alt={cmdName}
                    className="w-64 h-64 object-cover rounded-full border-4 border-white shadow-xl relative z-10"
                    sizes="256px"
                  />
                ) : (
                  <div className="w-64 h-64 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center relative z-10">
                    <User size={64} className="text-accent/40" />
                  </div>
                )}
              </div>
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left">
              <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-2 block">Executive Leadership</span>
              <h2 className="text-4xl font-display font-bold text-primary mb-2">
                {cmdName}
              </h2>
              <p className="text-lg text-secondary font-medium tracking-wide mb-6">
                {cmdRole}
              </p>
              <div className="prose prose-lg text-secondary">
                <p>{cmdDesc}</p>
              </div>
            </div>
          </div>

          {/* Board Members Grid */}
          <div>
            <div className="text-center mb-16">
              <h3 className="text-3xl font-display font-bold text-primary mb-4">{boardHeading}</h3>
              <div className="w-12 h-1 bg-accent/30 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {boardMembers.map((member, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-2xl text-center border border-gray-100 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-accent/30 transition-colors">
                    {member.image ? (
                      <OptimizedImage
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        sizes="96px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                        <Users className="text-gray-300 group-hover:text-accent" size={32} />
                      </div>
                    )}
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-1 group-hover:text-accent transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-sm text-secondary uppercase tracking-widest font-medium">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24 text-center max-w-3xl mx-auto">
            <div className="text-accent text-4xl font-serif opacity-30 mb-4">"</div>
            <p className="text-2xl text-secondary font-light italic leading-relaxed">
              {quote}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Administration;
