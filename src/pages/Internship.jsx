import PageHeader from "../components/PageHeader";
import SEO from "../components/SEO";
import InternsCarousel from "../components/InternsCarousel";
import PartnerLogos from "../components/PartnerLogos";
import { ArrowRight, Star, Play, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import OptimizedImage from "../components/OptimizedImage";

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

  useEffect(() => {
    const query = `*[_type == "internshipPage"][0]`;
    client.fetch(query).then((data) => {
      if (data) {
        setSanityData({
          seo: data.seo,
          heroTitle: data.hero?.title,
          heroSubtitle: data.hero?.subtitle,
          heroBackgroundImage: data.hero?.backgroundImage,
          heroBackgroundImages: data.hero?.backgroundImages,
          heroScrollButtonText: data.hero?.scrollButtonText,
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
    }).catch(console.error);
  }, []);

  const seoTitle = sanityData?.seo?.metaTitle || "Internship Programme | Real-World Tech Experience";
  const seoDesc = sanityData?.seo?.metaDescription || "CopterCode internship program provides real-world exposure to drone technology, AI, cybersecurity, software development, IoT, and renewable energy for college students.";

  const sanityHeroImage = sanityData?.heroBackgroundImage ? urlFor(sanityData.heroBackgroundImage).url() : null;
  const sanityCarouselImages = sanityData?.heroBackgroundImages?.length > 0
    ? sanityData.heroBackgroundImages.map(img => urlFor(img).url())
    : [];

  const headerImages = sanityCarouselImages.length > 0
    ? sanityCarouselImages
    : (sanityHeroImage ? [sanityHeroImage] : HEADER_IMAGES);

  const ctaBgImage = sanityData?.ctaBackgroundImage ? urlFor(sanityData.ctaBackgroundImage).url() : headerImages[0];

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
  const ctaLink = sanityData?.ctaLink || "https://forms.gle/bPkBxkdAHwDDrFJm6";


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
      <PageHeader
        title={heroTitle}
        subtitle={heroSubtitle}
        image={sanityHeroImage}
        images={headerImages}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('apply-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="hidden md:flex bg-black hover:bg-accent/90 text-white font-bold py-4 px-8 rounded-full shadow-lg items-center gap-3 text-lg transition-all transform hover:shadow-accent/50 hover:shadow-2xl border-2 border-white/20 backdrop-blur-sm group"
        >
          <span className="drop-shadow-md">{sanityData?.heroScrollButtonText || "Ready to Launch? Apply Now"}</span>
          <span className="text-2xl group-hover:rotate-12 transition-transform">🚀</span>
        </motion.button>
      </PageHeader>

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
              {/* Connector Line - Positioned to pass through the circles */}
              <div className="hidden md:block absolute top-[60px] left-[16%] right-[16%] h-[2px] bg-gray-200 z-0"></div>

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
                  className="bg-[#F3F7FA] p-10 rounded-2xl border border-transparent hover:border-blue-100 relative z-10 text-center hover:shadow-xl transition-all group"
                >
                  <div className="w-20 h-20 rounded-full bg-white border border-gray-100 flex items-center justify-center text-primary text-2xl font-bold mx-auto mb-8 shadow-sm relative z-10 group-hover:scale-110 transition-transform duration-300 group-hover:border-blue-200">
                    {item.stepNumber || String(i + 1).padStart(2, '0')}
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-4">
                    {item.title}
                  </h4>
                  <p className="text-secondary leading-relaxed">{item.description}</p>
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
        </div>
      </section>
    </div>
  );
};

export default Internship;
