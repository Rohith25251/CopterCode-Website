import PageHeader from "../components/PageHeader";
import SEO from "../components/SEO";
import InternsCarousel from "../components/InternsCarousel";
import PartnerLogos from "../components/PartnerLogos";
import { ArrowRight, Star, Play, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

import { useScrollToTop } from "../hooks/useScrollToTop";

import { useState, useEffect } from "react";
import { client } from "../lib/sanity";

const Internship = () => {
  useScrollToTop(); // Force scroll to top on mount
  const [sanityData, setSanityData] = useState(null);

  useEffect(() => {
    const query = `*[_type == "internshipPage"][0]`;
    client.fetch(query).then((data) => {
      if (data) {
        setSanityData({
          seo: data.seo,
          heroTitle: data.hero?.title,
          heroSubtitle: data.hero?.subtitle,
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
          internsSection: data.internsSection,
          partnersSection: data.partnersSection,
        });
      }
    }).catch(console.error);
  }, []);

  const seoTitle = sanityData?.seo?.metaTitle || "Internship Programme";
  const seoDesc = sanityData?.seo?.metaDescription || "CopterCode Internship Programme - Empowering Future Innovators.";

  const heroTitle = sanityData?.heroTitle || "Internship Programme";
  const heroSubtitle = sanityData?.heroSubtitle || "Empowering the next generation of innovators with real-world exposure to emerging technologies.";

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
      title: "Online Application",
      description: "Submit your details and resume through the official CopterCode Internship Application Form.",
    },
    {
      stepNumber: "02",
      title: "Screening & Selection",
      description: "Shortlisted candidates will be contacted for a brief interview or assessment.",
    },
    {
      stepNumber: "03",
      title: "Confirmation",
      description: "Selected candidates receive an Offer Letter with instructions to begin.",
    },
  ];

  const ctaHeading = sanityData?.ctaHeading || "Join CopterCode";
  const ctaSubheading = sanityData?.ctaSubheading || "Where innovation meets opportunity. Apply now and start building the future with us.";
  const ctaButtonText = sanityData?.ctaButtonText || "Apply for Internship";
  const ctaLink = sanityData?.ctaLink || "https://forms.gle/bPkBxkdAHwDDrFJm6";


  return (
    <div className="bg-background min-h-screen text-primary overflow-x-hidden">
      <SEO
        title={seoTitle}
        description={seoDesc}
      />
      <PageHeader
        title={heroTitle}
        subtitle={heroSubtitle}
      />

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

          {/* Purpose Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 50 }}
            className="bg-surface rounded-2xl p-10 border border-border mb-20 relative overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              className="absolute top-[-50px] right-[-50px] p-10 opacity-5"
            >
              <Star size={150} className="text-secondary" />
            </motion.div>
            <h2 className="text-3xl font-display font-bold text-primary mb-6">
              {purposeTitle}
            </h2>
            <p className="text-secondary mb-6 text-lg">
              {purposeText}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {purposeList.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle
                    className="text-secondary mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span className="text-secondary font-medium">{item}</span>
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
                    className={`bg-surface border-l-4 ${i % 2 === 0 ? 'border-accent' : 'border-secondary'} p-6 rounded-r-lg shadow-sm border border-border hover:shadow-lg transition-all cursor-pointer`}
                  >
                    <h4 className="font-bold text-primary text-lg">{slot.title}</h4>
                    <p className="text-secondary font-bold">{slot.months}</p>
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
              {/* Connector Line */}
              <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 z-0"></div>

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
                  className="bg-surface p-8 rounded-xl border border-border relative z-10 text-center hover:shadow-xl transition-all group"
                >
                  <div className="w-16 h-16 rounded-full bg-background border-2 border-border flex items-center justify-center text-primary text-xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:border-accent/40">
                    {item.stepNumber || i + 1}
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-3">
                    {item.title}
                  </h4>
                  <p className="text-sm text-secondary">{item.description}</p>
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
      <section className="py-24 bg-surface backdrop-blur-md relative overflow-hidden text-center border-t border-border group">
        <div className="absolute inset-0 bg-background/30 opacity-50" />
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-overlay"
        />
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-primary">
            {ctaHeading}
          </h2>
          <p className="text-xl text-secondary mb-10 max-w-2xl mx-auto">
            {ctaSubheading}
          </p>

          <motion.a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-10 py-5 bg-primary text-white font-bold rounded-full text-lg hover:bg-accent hover:text-primary transition-all shadow-xl hover:shadow-2xl hover:shadow-accent/20"
          >
            {ctaButtonText} <ArrowRight className="ml-2" />
          </motion.a>
        </div>
      </section>
    </div>
  );
};

export default Internship;
