import { useState, useEffect } from "react";
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
  Star
} from "lucide-react";
import { motion } from "framer-motion";

const Careers = () => {
  const [sanityData, setSanityData] = useState(null);

  useEffect(() => {
    const query = `*[_type == "careersPage"][0]{
      ...,
      trusted {
        heading,
        logos[] { asset->{ url } }
      }
    }`;

    client.fetch(query).then((data) => {
      if (data) {
        // Flatten the structure to match what the component expects
        setSanityData({
          seo: data.seo,
          heroTitle: data.hero?.title,
          heroSubtitle: data.hero?.subtitle,
          benefitsHeading: data.benefits?.heading,
          benefitsDescription: data.benefits?.description,
          benefitsList: data.benefits?.list, // The icon string matches our map keys
          trustedHeading: data.trusted?.heading,
          trustedLogos: data.trusted?.logos?.map(l => l.asset.url), // Extract URLs
          rolesLabel: data.positions?.label,
          rolesHeading: data.positions?.heading,
          rolesDescription: data.positions?.description,
          openRoles: data.positions?.list,
          ctaHeading: data.cta?.heading,
          ctaDescription: data.cta?.description,
          ctaButtonText: data.cta?.buttonText,
          ctaButtonLink: data.cta?.buttonLink
        });
      }
    }).catch(console.error);
  }, []);

  // Fallbacks
  const seoTitle = sanityData?.seo?.metaTitle || "Careers | Drone Tech & AI Engineering Jobs";
  const seoDesc = sanityData?.seo?.metaDescription || "Join CopterCode's innovative team. Explore careers in drone technology, AI/ML engineering, software development, and automation. Growth, global exposure, and benefits.";
  const heroTitle = sanityData?.heroTitle || "Careers";
  const heroSubtitle = sanityData?.heroSubtitle || "Join us to build the future together.";

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

  // Map string icons to components using centralized iconComponentMap
  const benefits = rawBenefits.map(b => ({
    ...b,
    IconComponent: iconComponentMap[b.icon?.toLowerCase()] || Star // Default to Star if not found
  }));


  const trustedHeading = sanityData?.trustedHeading || "Trusted by Leading Innovators";
  const trustedLogos = sanityData?.trustedLogos || [];
  // If sanity logos exist, use them. Else fallback to hardcoded loop (which relies on local files). 
  // Actually, simpler to just use sanity if available, else nothing or fallback. 
  // To keep existing look, let's keep the fallback generated array IF sanity is empty.
  const hasSanityLogos = trustedLogos.length > 0;


  const rolesLabel = sanityData?.rolesLabel || "Opportunities";
  const rolesHeading = sanityData?.rolesHeading || "Open Roles";
  const rolesDescription = sanityData?.rolesDescription || "Find your next challenge.";

  const openRoles = sanityData?.openRoles || [
    {
      title: "Senior Drone Engineer",
      badges: ["Hardware", "Chennai", "Full-Time"],
      applyLink: "mailto:hr@coptercode.co.in"
    },
    {
      title: "Full Stack Developer",
      badges: ["Software", "Remote/Hybrid", "Full-Time"],
      applyLink: "mailto:hr@coptercode.co.in"
    },
    {
      title: "AI/ML Researcher",
      badges: ["R&D", "Bangalore", "Contract"],
      applyLink: "mailto:hr@coptercode.co.in"
    },
    {
      title: "Sales Executive",
      badges: ["Sales", "Mumbai", "Full-Time"],
      applyLink: "mailto:hr@coptercode.co.in"
    },
    {
      title: "Cybersecurity Analyst",
      badges: ["Security", "Delhi", "Full-Time"],
      applyLink: "mailto:hr@coptercode.co.in"
    },
    {
      title: "Product Designer",
      badges: ["Design", "Remote", "Full-Time"],
      applyLink: "mailto:hr@coptercode.co.in"
    },
  ];


  const ctaHeading = sanityData?.ctaHeading || "Ready to make an impact?";
  const ctaDescription = sanityData?.ctaDescription || "Explore opportunities to work on cutting-edge drone technology, AI, and digital solutions.";
  const ctaButtonText = sanityData?.ctaButtonText || "Send Your Resume";
  const ctaButtonLink = sanityData?.ctaButtonLink || "mailto:hr@coptercode.co.in";


  return (
    <div className="bg-background min-h-screen text-primary selection:bg-primary selection:text-background overflow-x-hidden">
      <SEO
        title={sanityData?.seo?.metaTitle || "Careers | Drone Tech & AI Engineering"}
        description={sanityData?.seo?.metaDescription || "Join CopterCode's innovative team. Explore careers in drone technology, AI/ML engineering, software development, and industrial automation with growth opportunities."}
        keywords={sanityData?.seo?.keywords || "drone technology jobs, AI engineer, software engineering careers, industrial automation, machine learning, CopterCode careers, tech jobs"}
        canonicalUrl="https://coptercode.com/careers"
        ogTitle="Careers at CopterCode | Drone Tech & AI Engineering"
        ogDescription="Build the future with CopterCode. Explore exciting job opportunities in drone tech, AI, and enterprise software."
        twitterTitle="CopterCode Is Hiring"
        twitterDescription="Explore career opportunities in drone technology, AI/ML, and enterprise software at CopterCode."
      />
      <PageHeader
        title={heroTitle === "Careers" ? "Careers in Drone Technology & AI Engineering" : heroTitle}
        subtitle={heroSubtitle}
      />

      <section className="pt-10 pb-24 relative overflow-hidden">
        {/* Background Decor - Animated */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"
        />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-display font-bold text-primary mb-6">
              {benefitsHeading}
            </h2>
            <p className="text-sm text-secondary mb-6">What makes CopterCode a great place to build your career</p>
            <div className="w-24 h-1.5 bg-primary/20 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
              {benefitsDescription}
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
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
                  hidden: { opacity: 0, y: 50 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 50, damping: 20 },
                  },
                }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`group p-10 rounded-3xl border border-border bg-surface hover:bg-surface-highlight hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 text-center flex flex-col items-center ${idx >= 3 ? "lg:col-span-1 lg:last:col-start-auto" : ""}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-background flex items-center justify-center mb-8 border border-border group-hover:scale-110 group-hover:border-accent/40 transition-transform duration-500">
                  <item.IconComponent size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">
                  {item.title}
                </h3>
                <p className="text-secondary leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Logo Marquee Section */}
          <div className="mb-24 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl font-bold text-primary mb-6">Our Network & Trusted Partners</h2>
              <h3 className="text-xl font-bold text-secondary uppercase tracking-widest mb-4">
                {trustedHeading}
              </h3>
              <div className="w-16 h-1 bg-accent/30 mx-auto rounded-full"></div>
            </motion.div>

            <div className="relative flex w-full overflow-hidden mask-image-gradient">
              {/* Gradient Masks for smooth fade at edges */}
              <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10"></div>
              <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10"></div>

              <motion.div
                className="flex gap-4 items-center whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 30, // Adjust speed as needed
                }}
              >
                {/* We duplicate the logos to create a seamless loop */}
                {[...Array(2)].map((_, sectionIdx) => (
                  <div key={sectionIdx} className="flex gap-4 items-center">
                    {hasSanityLogos ? (
                      trustedLogos.map((url, idx) => (
                        <div
                          key={`sanity-logo-${sectionIdx}-${idx}`}
                          className="w-32 h-24 sm:w-48 sm:h-32 md:w-64 md:h-40 lg:w-80 lg:h-48 flex-shrink-0 flex items-center justify-center transition-all duration-300 hover:scale-110"
                        >
                          <OptimizedImage
                            src={url}
                            alt={`Partner Logo ${idx}`}
                            className="max-w-full max-h-full object-contain"
                            sizes="(min-width: 1024px) 320px, (min-width: 768px) 256px, (min-width: 640px) 192px, 128px"
                          />
                        </div>
                      ))
                    ) : (
                      // Fallback to local logos
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
                          className="w-32 h-24 sm:w-48 sm:h-32 md:w-64 md:h-40 lg:w-80 lg:h-48 flex-shrink-0 flex items-center justify-center transition-all duration-300 hover:scale-110"
                        >
                          <img
                            src={`/_optimized/mediafiles/logos/${logoName}`}
                            alt={`Partner Logo ${logoName}`}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      ))
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Open Roles Section */}
          <div className="mb-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-left mb-12"
            >
              <span className="text-sm font-bold tracking-widest text-accent uppercase mb-2 block">
                {rolesLabel}
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
                {rolesHeading}
              </h2>
              <p className="text-secondary text-lg">
                {rolesDescription}
              </p>
              <p className="text-secondary text-base mt-4">
                We are hiring talented engineers, designers, and specialists across <a href="/locations" className="text-accent hover:underline font-semibold">multiple locations</a> and remote positions. Check out our <a href="/about" className="text-accent hover:underline font-semibold">company culture</a> to see if you would be a great fit.
              </p>
            </motion.div>

            <div className="mb-12 p-6 bg-surface/50 rounded-xl border border-border">
              <h3 className="text-lg font-bold text-primary mb-2">About Our Positions</h3>
              <p className="text-secondary">We offer competitive salaries, <a href="/contact" className="text-accent hover:underline font-semibold">flexible work arrangements</a>, professional development opportunities, and a collaborative environment where innovation thrives. Learn more about our <a href="/technologies" className="text-accent hover:underline font-semibold">technology stack</a> and technical focus areas.</p>
            </div>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-6"
            >
              {openRoles.map((job, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    show: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        type: "spring",
                        stiffness: 50,
                        damping: 20,
                      },
                    },
                  }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="bg-surface p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-lg transition-all duration-300 group border border-border border-l-4 border-l-transparent hover:border-accent/40"
                >
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {job.badges.map((badge, bIdx) => (
                        <span
                          key={bIdx}
                          className={`px-3 py-1 rounded-md text-sm font-medium ${bIdx === 0
                            ? "bg-gray-100 text-gray-700"
                            : bIdx === 1
                              ? "bg-blue-50 text-blue-600"
                              : "bg-green-50 text-green-600"
                            }`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={`mailto:hr@coptercode.co.in?subject=Application for ${job.title}`}
                    className="w-full md:w-auto px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-accent hover:text-primary transition-all duration-300 flex items-center justify-center whitespace-nowrap shadow-md"
                  >
                    Apply Now <ArrowRight size={18} className="ml-2" />
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* CTA Section - Updates to Glassy as per request */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="bg-surface/80 backdrop-blur-md border border-border text-primary rounded-[2.5rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden group"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-[80px] -mr-40 -mt-40 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 tracking-tight text-primary">
                Ready to Join Our Team?
              </h2>
              <p className="text-lg md:text-xl text-secondary mb-10 leading-relaxed font-medium">
                {ctaDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={ctaButtonLink}
                  className="inline-flex items-center bg-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-accent hover:text-primary transition-all duration-300 shadow-xl hover:shadow-accent/20"
                >
                  {ctaButtonText} <ArrowRight className="ml-3" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/internship"
                  className="inline-flex items-center border-2 border-primary text-primary px-10 py-5 rounded-full font-bold text-lg hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Explore Internships <ArrowRight className="ml-3" />
                </motion.a>
              </div>
              <p className="text-sm text-secondary mt-6 max-w-2xl mx-auto">Cannot find the right role? <a href="/contact" className="text-accent hover:underline font-semibold">Contact our HR team</a> to discuss potential opportunities in drone technology, AI, industrial automation, and enterprise software.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
