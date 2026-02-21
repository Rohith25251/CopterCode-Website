import PageHeader from "../components/PageHeader";
import {
  Mail,
  Phone,
  PhoneCall,
  MapPin,
  Send,
  Clock,
  Globe,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { client } from "../lib/sanity";
import SEO from "../components/SEO";
import { motion } from "framer-motion";


const Contact = () => {
  const [sanityData, setSanityData] = useState(null);

  useEffect(() => {
    const query = `*[_type == "contactPage"][0]`;

    client.fetch(query).then((data) => {
      if (data) {
        setSanityData({
          seo: data.seo,
          heroTitle: data.hero?.title,
          heroSubtitle: data.hero?.subtitle,
          hqTitle: data.hq?.title,
          hqName: data.hq?.name,
          hqAddress: data.hq?.address,
          hqPhone1: data.hq?.phone1,
          hqPhone2: data.hq?.phone2,
          hqLandline: data.hq?.landline,
          hqEmail: data.hq?.email,
          usaTitle: data.usa?.title,
          usaName: data.usa?.name,
          usaAddress: data.usa?.address,
          usaPhone: data.usa?.phone,
          usaEmail: data.usa?.email,
          hoursTitle: data.hours?.title,
          weekdaysLabel: data.hours?.weekdaysLabel,
          weekdaysTime: data.hours?.weekdaysTime,
          weekendLabel: data.hours?.weekendLabel,
          weekendStatus: data.hours?.weekendStatus,
          formTitle: data.form?.title,
        });
      }
    }).catch(console.error);
  }, []);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  // Fallbacks
  const seoTitle = sanityData?.seo?.metaTitle || "Contact Us";
  const seoDesc = sanityData?.seo?.metaDescription || "Get in touch with CopterCode.";

  const heroTitle = sanityData?.heroTitle || "Contact Us";
  const heroSubtitle = sanityData?.heroSubtitle || "We'd love to hear from you. Let's start a conversation.";

  // HQ
  const hqTitle = sanityData?.hqTitle || "Headquarters (India)";
  const hqName = sanityData?.hqName || "CopterCode";
  const hqAddress = sanityData?.hqAddress || "Chennai, Tamil Nadu, India";
  const hqPhone1 = sanityData?.hqPhone1 || "+91 8072 193 600";
  const hqPhone2 = sanityData?.hqPhone2 || "+91 96554 51382";
  const hqLandline = sanityData?.hqLandline || "044 6132 9380";
  const hqEmail = sanityData?.hqEmail || "coptercode@gmail.com";

  // USA
  const usaTitle = sanityData?.usaTitle || "USA Office";
  const usaName = sanityData?.usaName || "CopterCode";
  const usaAddress = sanityData?.usaAddress || "Ann Arbor, MI, USA";
  const usaPhone = sanityData?.usaPhone || "+1 (734) 678 6093";
  const usaEmail = sanityData?.usaEmail || "hr@coptercode.co.in";


  // Hours
  const hoursTitle = sanityData?.hoursTitle || "Business Hours";
  const weekdaysLabel = sanityData?.weekdaysLabel || "Monday – Friday";
  const weekdaysTime = sanityData?.weekdaysTime || "9:00 AM – 6:00 PM";
  const weekendLabel = sanityData?.weekendLabel || "Saturday & Sunday";
  const weekendStatus = sanityData?.weekendStatus || "Closed";

  // Form
  const formTitle = sanityData?.formTitle || "Send us a Message";

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(
        "https://submitbox.app/api/f/f2babe72-c161-4d4d-9e81-b2b70953c0c0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.name.trim(),
            email: formState.email.trim(),
            message: formState.message.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message. Please try again.");
      }

      // Success
      setSubmitStatus('success');
      setFormState({
        name: "",
        email: "",
        message: "",
      });

      // Auto clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);

    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus('error');
      // Auto clear error message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="bg-background min-h-screen text-primary selection:bg-accent selection:text-primary overflow-hidden relative">
      <SEO
        title={sanityData?.seo?.metaTitle || "Contact Us | CopterCode"}
        description={sanityData?.seo?.metaDescription || "Contact CopterCode for inquiries, partnerships, and support. We're here to help with drone technology, enterprise software, and industrial automation solutions."}
        keywords={sanityData?.seo?.keywords || "contact, inquiries, partnerships, drone technology support, enterprise software, support services"}
        canonicalUrl="https://coptercode.com/contact"
        ogTitle="Contact CopterCode"
        ogDescription="Reach our team for inquiries and collaborations. Let's discuss your business needs."
        twitterTitle="Contact CopterCode"
        twitterDescription="Get in touch with us for any questions about our services."
      />

      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
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
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 5,
          }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-surface/10 rounded-full blur-[100px]"
        />
      </div>

      <PageHeader
        title={heroTitle}
        subtitle={heroSubtitle}
      />

      <section className="py-24 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto px-6"
        >
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Get in Touch with Our Team</h2>
            <p className="text-lg text-secondary max-w-3xl">
              Whether you have questions about our industrial drone solutions, enterprise software services, or would like to explore partnership opportunities, we're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column: Contact Info */}
            <div className="space-y-12">
              <motion.div variants={containerVariants} className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-6 flex items-center">
                    <MapPin className="mr-3 text-accent" size={24} />
                    Our Locations
                  </h3>
                </div>
              {/* Headquarters (India) */}
              <motion.div
                variants={itemVariants}
                whileHover={{ x: 10 }}
                className="flex items-start space-x-6 group p-4 rounded-2xl hover:bg-surface transition-colors border border-transparent hover:border-border"
              >
                <div className="w-14 h-14 bg-surface-highlight flex items-center justify-center text-primary shrink-0 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 border border-border group-hover:border-accent/40">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-primary font-bold mb-2 text-xl group-hover:text-accent transition-colors">
                    {hqTitle}
                  </h4>
                  <div className="text-secondary space-y-1.5 text-base">
                    <p className="font-semibold text-primary">
                      {hqName}
                    </p>
                    <p>{hqAddress}</p>
                    {/* Mobile Numbers */}
                    <div className="flex items-start pt-2 gap-4">
                      <Phone size={18} className="text-accent mt-1 shrink-0" />
                      <div className="flex flex-col">
                        <a
                          href={`tel:${hqPhone1.replace(/\s+/g, '')}`}
                          className="hover:text-accent transition-colors font-medium border-b border-transparent hover:border-accent max-w-max"
                        >
                          {hqPhone1}
                        </a>
                        <a
                          href={`tel:${hqPhone2.replace(/\s+/g, '')}`}
                          className="hover:text-accent transition-colors font-medium border-b border-transparent hover:border-accent max-w-max"
                        >
                          {hqPhone2}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <PhoneCall size={18} className="text-accent shrink-0" />
                      <a
                        href={`tel:${hqLandline.replace(/\D/g, '')}`}
                        className="hover:text-accent transition-colors font-medium border-b border-transparent hover:border-accent max-w-max"
                      >
                        {hqLandline}
                      </a>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <Mail size={18} className="text-accent mt-1 shrink-0" />
                      <div className="flex flex-col">
                        <a
                          href={`mailto:${hqEmail}`}
                          className="hover:text-accent transition-colors font-medium border-b border-transparent hover:border-accent max-w-max"
                        >
                          {hqEmail}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* USA Office */}
              <motion.div
                variants={itemVariants}
                whileHover={{ x: 10 }}
                className="flex items-start space-x-6 group p-4 rounded-2xl hover:bg-surface transition-colors border border-transparent hover:border-border"
              >
                <div className="w-14 h-14 bg-surface-highlight flex items-center justify-center text-primary shrink-0 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 border border-border group-hover:border-accent/40">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-primary font-bold mb-2 text-xl group-hover:text-accent transition-colors">
                    {usaTitle}
                  </h4>
                  <div className="text-secondary space-y-1.5 text-base">
                    <p className="font-semibold text-primary">{usaName}</p>
                    <p>{usaAddress}</p>
                    <div className="flex items-start pt-2 gap-3">
                      <Phone size={16} className="text-accent mt-1 shrink-0" />
                      <div className="flex flex-col">
                        <a
                          href={`tel:${usaPhone.replace(/[()\s-]/g, '')}`}
                          className="hover:text-accent transition-colors font-medium border-b border-transparent hover:border-accent"
                        >
                          {usaPhone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Mail size={18} className="text-accent mt-1 shrink-0" />
                      <div className="flex flex-col">
                        <a
                          href={`mailto:${usaEmail}`}
                          className="hover:text-accent transition-colors font-medium border-b border-transparent hover:border-accent max-w-max"
                        >
                          {usaEmail}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Business Hours */}
              <motion.div
                variants={itemVariants}
                whileHover={{ x: 10 }}
                className="flex items-start space-x-6 group p-4 rounded-2xl hover:bg-surface transition-colors border border-transparent hover:border-border"
              >
                <div className="w-14 h-14 bg-surface-highlight flex items-center justify-center text-primary shrink-0 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 border border-border group-hover:border-accent/40">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="text-primary font-bold mb-2 text-xl group-hover:text-accent transition-colors">
                    {hoursTitle}
                  </h4>
                  <div className="text-secondary space-y-2 text-base">
                    <div className="flex justify-between w-full max-w-xs border-b border-border pb-1 border-dashed">
                      <span>{weekdaysLabel}</span>
                      <span className="text-primary font-medium">
                        {weekdaysTime}
                      </span>
                    </div>
                    <div className="flex justify-between w-full max-w-xs">
                      <span>{weekendLabel}</span>
                      <span className="text-accent font-bold bg-accent/10 px-2 rounded text-sm">
                        {weekendStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-surface p-8 md:p-12 border border-border rounded-3xl h-fit shadow-2xl relative overflow-hidden group"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-64 h-64 bg-background/5 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"
            />

            <h3 className="text-2xl font-display font-bold text-primary mb-8 relative z-10">
              {formTitle}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-primary mb-2 ml-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-background border border-border p-4 text-primary placeholder:text-secondary/60 focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all rounded-xl shadow-inner"
                  placeholder="Jane Doe"
                  required
                  disabled={isSubmitting}
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-primary mb-2 ml-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-background border border-border p-4 text-primary placeholder:text-secondary/60 focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all rounded-xl shadow-inner"
                  placeholder="jane@company.com"
                  required
                  disabled={isSubmitting}
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-bold text-primary mb-2 ml-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full bg-background border border-border p-4 text-primary placeholder:text-secondary/60 focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all resize-none rounded-xl shadow-inner"
                  placeholder="Tell us about your project..."
                  required
                  disabled={isSubmitting}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                ></textarea>
              </div>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-600 text-sm font-medium"
                >
                  ✓ Thank you for your message. We'll be in touch shortly!
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 text-sm font-medium"
                >
                  ✕ Failed to send message. Please try again or contact us directly.
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className="w-full py-4 bg-accent text-white font-bold hover:bg-accent/90 transition-all duration-300 flex items-center justify-center rounded-xl uppercase tracking-widest text-sm shadow-lg hover:shadow-xl group transform disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="inline-block mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message{" "}
                    <ArrowRight
                      size={18}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </> 
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
