import React, { useState, useEffect } from "react";
import { client, urlFor } from "../lib/sanity";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "../components/ui/BackButton";

import { ASSETS } from "../constants/assets";
import { useScrollToTop } from "../hooks/useScrollToTop";

const IndustrialDrones = () => {
  useScrollToTop(); // Force scroll to top on mount
  const fallbackData = {
    heroTitle: "Industrial Drones & UAV",
    heroSubtitle: "Redefining Industries with Advanced UAV Solutions. Empowering industries, farmers, and institutions to achieve more with less.",
    heroVideo: ASSETS.VIDEOS.DRONES,

    introTitle: "Why Drones Matter",
    introText: "The rise of drones marks a paradigm shift in how industries operate. At CopterCode, we believe that drones are not just machines — they are enablers of transformation. Since 2019, we have been at the forefront of industrial and agricultural drone technology.",
    introPoints: [
      "Faster, safer, and more accurate operations",
      "Cost-effective compared to traditional methods",
      "Access to data and insights in real-time",
      "Minimizes human risk in hazardous environments",
      "Environment-friendly by reducing waste and emissions",
    ],
    introMedia: ASSETS.VIDEOS.DRONES,
    introMediaIsImage: false,

    portfolioTitle: "Our Industrial Drone Portfolio",
    portfolioItems: [
      {
        title: "Inspection & Surveillance",
        desc: "High-precision aerial monitoring for critical infrastructure.",
        features: [
          "Infrastructure inspection for bridges, towers, and pipelines",
          "Power line and wind turbine monitoring",
          "Security and perimeter surveillance",
          "Emergency response and disaster management",
          "High-resolution cameras & thermal sensors"
        ]
      },
      {
        title: "Mapping & Surveying",
        desc: "Accurate topographical data capture in a fraction of the time.",
        features: [
          "Topographical mapping with centimeter-level accuracy",
          "Construction site progress monitoring",
          "Mining and quarry volumetric calculations",
          "Urban planning and land assessment",
          "Fast data capture, reducing survey time by 70%"
        ]
      },
      {
        title: "Logistics & Delivery",
        desc: "Autonomous delivery systems for rapid transport.",
        features: [
          "Last-mile delivery of packages and supplies",
          "Medical and emergency deliveries to remote areas",
          "Payloads designed to suit requirements",
          "Autonomous or remote-controlled options",
          "Reduces congestion and ensures faster delivery"
        ]
      },
      {
        title: "Agricultural Drones",
        desc: "Smart farming solutions for modern agriculture.",
        features: [
          "Precision spraying for fertilizers and pesticides",
          "Crop health monitoring using NDVI cameras",
          "Soil and water analysis",
          "Yield estimation and field mapping",
          "Increases productivity and improves sustainability"
        ]
      },
      {
        title: "Educational Drone Labs",
        desc: "Empowering the next generation of engineers.",
        features: [
          "Drone Labs for schools and colleges",
          "Free setup of training environments",
          "Hands-on learning about UAV technology",
          "Inspiring the next generation of innovators",
          "Knowledge sharing"
        ]
      },
    ],

    featuresTitle: "Key Features of CopterCode Drones",
    featuresList: [
      { title: "Rugged & Reliable", desc: "Built to perform in extreme conditions" },
      { title: "AI-Driven", desc: "Intelligent automation and real-time analytics" },
      { title: "Customizable", desc: "Tailored to specific use cases and industries" },
      { title: "Compliance Ready", desc: "DGCA and global aviation standards met" },
      { title: "Long Endurance", desc: "Extended flight time with efficient batteries" },
      { title: "Support & Training", desc: "Comprehensive maintenance and user education" },
    ],

    impactTitle: "Impact Across Industries",
    impactItems: [
      { area: "Energy & Utilities", desc: "Safer and faster inspections of power plants, wind farms, and pipelines." },
      { area: "Construction", desc: "Precise surveys and monitoring that save time and costs." },
      { area: "Agriculture", desc: "Healthier crops and better yields for farmers." },
      { area: "Logistics", desc: "Efficient and timely deliveries in challenging environments." },
      { area: "Education", desc: "Enabling hands-on learning and skill development." },
      { area: "Public Safety", desc: "Supporting rescue operations and emergency response." },
    ],
    testimonialQuote: "\"Thanks to CopterCode’s drones, we reduced our site inspection time by 80% while improving safety.\"",
    testimonialAuthor: "Infrastructure Client",

    rdTitle: "R&D & Innovation",
    rdText: "At CopterCode, our dedicated R&D team focuses on:",
    rdList: [
      "Improving flight endurance and payload capacity",
      "Integrating AI and machine learning for smarter operations",
      "Developing eco-friendly power sources",
      "Innovating modular designs for multi-purpose use",
      "Enhancing data analytics and visualization tools"
    ],

    complianceTitle: "Certifications & Compliance",
    complianceText: "We ensure all our UAVs comply with:",
    complianceList: [
      "DGCA regulations in India",
      "FAA guidelines for operations in the USA",
      "CE and ISO quality standards",
      "Environmental and safety norms"
    ],
    complianceFooter: "You can operate confidently, knowing our drones meet all legal and safety requirements.",

    ctaTitle: "Ready to take your operations to the next level?",
    ctaText: "Let CopterCode help you fly higher, faster, and smarter. Contact us today for a consultation or demo.",
    ctaButtonText: "Contact Us Today"
  };

  const [sanityData, setSanityData] = useState(null);

  useEffect(() => {
    const query = `*[_type == "businessVerticalsPage"][0].verticals[id == "industrial-drones"][0]{
      ...,
      heroVideo {
        type,
        url,
        file { asset->{ url } }
      },
      introMedia {
        mediaType,
        sourceType,
        url,
        file { asset->{ url } },
        image { asset->{ url, metadata { lqip } } }
      }
    }`;

    client.fetch(query).then((data) => {
      if (data) {
        // Normalize data to match fallback structure
        const normalized = {
          ...data,
          heroVideo: data.heroVideo?.type === 'file' ? data.heroVideo.file?.asset?.url : data.heroVideo?.url,
          introMedia: data.introMedia?.sourceType === 'file'
            ? data.introMedia.file?.asset?.url
            : (data.introMedia?.mediaType === 'image'
              ? (data.introMedia.image?.asset?.url)
              : data.introMedia?.url),
          introMediaIsImage: data.introMedia?.mediaType === 'image',
          // Ensure arrays are not null
          introPoints: data.introPoints || [],
          portfolioItems: data.portfolioItems || [],
          featuresList: data.featuresList || [],
          impactItems: data.impactItems || [],
          rdList: data.rdList || [],
          complianceList: data.complianceList || []
        };
        setSanityData(normalized);
      }
    }).catch(console.error);
  }, []);

  const data = sanityData || fallbackData;

  const seoTitle = data.seo?.metaTitle || data.heroTitle || "Industrial Drones & UAV";
  const seoDesc = data.seo?.metaDescription || "Redefining Industries with Advanced UAV Solutions from CopterCode.";

  return (
    <div className="bg-background min-h-screen text-primary selection:bg-accent selection:text-primary pt-20">
      <SEO title={seoTitle} description={seoDesc} />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            src={data.heroVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="fixed top-24 left-6 md:left-12 z-50">
          <BackButton to="/business" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl bg-background/80 backdrop-blur-sm border border-border rounded-3xl px-8 py-10 shadow-xl"
          >
            <h1 className="text-5xl md:text-7xl font-display font-medium mb-6 text-primary">
              {data.heroTitle}
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
              {data.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-6">
              {data.introTitle}
            </h2>
            <p className="text-secondary text-lg leading-relaxed mb-6">
              {data.introText}
            </p>
            {data.introPoints && (
              <ul className="space-y-4">
                {data.introPoints.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span className="text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl min-h-[400px] bg-surface flex items-center justify-center">
            {data.introMedia ? (
              data.introMediaIsImage ? (
                <img src={data.introMedia} alt="Intro" className="w-full h-full object-cover opacity-90" />
              ) : (
                <video src={data.introMedia} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80" />
              )
            ) : (
              <div className="text-center p-8">
                <div className="w-24 h-24 bg-accent/20 rounded-full mx-auto flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-primary">Innovating for the Future</h3>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24 bg-surface relative">
        <div className="container mx-auto px-6">
          {data.portfolioTitle && (
            <h2 className="text-4xl font-display font-medium mb-16 text-center">
              {data.portfolioTitle}
            </h2>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.portfolioItems?.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-background border border-border p-8 rounded-2xl shadow-sm hover:shadow-lg hover:border-accent/40 transition-all duration-300 flex flex-col"
              >
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                {item.desc && <p className="text-sm text-secondary mb-6">{item.desc}</p>}
                <ul className="space-y-3 mt-auto">
                  {item.features?.map((feature, fIdx) => (
                    <li key={fIdx} className="text-sm text-secondary flex items-start">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      {data.featuresList && data.featuresList.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {data.featuresTitle && (
                <h2 className="text-3xl font-display font-medium text-center mb-12">
                  {data.featuresTitle}
                </h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.featuresList.map((feat, i) => (
                  <div key={i} className="flex items-start p-4 hover:bg-surface rounded-xl transition-colors">
                    <CheckCircle2 className="text-accent mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-primary">{feat.title || "Feature"}</h4>
                      <p className="text-secondary text-sm">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Impact & Testimonials */}
      <section className="py-24 bg-surface border-y border-border">
        <div className="container mx-auto px-6">
          {data.impactTitle && (
            <h2 className="text-3xl font-display font-medium text-center mb-12">
              {data.impactTitle}
            </h2>
          )}

          {data.impactItems && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {data.impactItems.map((impact, i) => (
                <div key={i} className="bg-background p-6 rounded-xl border border-border">
                  <h4 className="text-accent font-bold mb-2">{impact.area}</h4>
                  <p className="text-secondary text-sm">{impact.desc}</p>
                </div>
              ))}
            </div>
          )}

          {(data.testimonialQuote || data.testimonialAuthor) && (
            <div className="bg-accent/10 p-8 rounded-2xl border border-accent/20 max-w-4xl mx-auto text-center">
              {data.testimonialQuote && (
                <cite className="text-xl md:text-2xl text-primary font-display italic mb-4 block">
                  {data.testimonialQuote}
                </cite>
              )}
              {data.testimonialAuthor && (
                <span className="text-accent font-bold tracking-widest text-xs uppercase">
                  — {data.testimonialAuthor}
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* R&D and Certifications */}
      {(data.rdTitle || data.complianceTitle || (data.rdList && data.rdList.length > 0) || (data.complianceList && data.complianceList.length > 0)) && (
        <section className="py-24 bg-background">
          <div className={`container mx-auto px-6 ${(data.rdTitle || data.rdList) && (data.complianceTitle || data.complianceList)
            ? "grid grid-cols-1 lg:grid-cols-2 gap-16"
            : "max-w-3xl mx-auto"
            }`}>
            {/* R&D Section */}
            {(data.rdTitle || data.rdList) && (
              <div>
                {data.rdTitle && <h3 className="text-2xl font-bold mb-6 text-primary">{data.rdTitle}</h3>}
                {data.rdText && <p className="text-secondary mb-6">{data.rdText}</p>}
                {data.rdList && (
                  <ul className="space-y-3 mb-8">
                    {data.rdList.map((item, i) => (
                      <li key={i} className="flex items-center text-secondary">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Compliance Section */}
            {(data.complianceTitle || data.complianceList) && (
              <div>
                {data.complianceTitle && <h3 className="text-2xl font-bold mb-6 text-primary">{data.complianceTitle}</h3>}
                {data.complianceText && <p className="text-secondary mb-6">{data.complianceText}</p>}
                {data.complianceList && (
                  <ul className="space-y-3">
                    {data.complianceList.map((item, i) => (
                      <li key={i} className="flex items-center text-secondary">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {data.complianceFooter && (
                  <p className="mt-6 text-secondary italic">
                    {data.complianceFooter}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-accent text-black text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-display font-bold mb-6">
            {data.ctaTitle}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto font-medium">
            {data.ctaText}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-background hover:text-primary transition-colors border border-primary/20"
          >
            {data.ctaButtonText || "Contact Us Today"} <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default IndustrialDrones;
