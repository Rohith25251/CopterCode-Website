import React, { useState, useEffect } from "react";
import { client, urlFor } from "../lib/sanity";
import PageHeader from "../components/PageHeader";
import { iconComponentMap } from '../sanity/schemas/icons';
import {
  ExternalLink,
  Cpu,
  Cloud,
  Database,
  Layout as LayoutIcon,
  ArrowUpRight,
  Globe,
  Shield,
  Zap,
  Code
} from "lucide-react";
import SEO from "../components/SEO";
import { motion } from "framer-motion";


// Colors for gradients mapped by index or random not needed as original used manual strings.
// We can auto-assign a gradient based on index.
const gradients = [
  "from-blue-500/20 to-purple-500/20",
  "from-emerald-500/20 to-cyan-500/20",
  "from-orange-500/20 to-red-500/20",
  "from-pink-500/20 to-rose-500/20",
  "from-violet-500/20 to-fuchsia-500/20",
  "from-amber-500/20 to-yellow-500/20",
];

const Projects = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const query = `*[_type == "projectsPage"][0]{
      ...,
      clientLogos[]{ asset->{ url } }
    }`;

    client.fetch(query)
      .then((sanityResult) => {
        if (sanityResult) {
          console.log('✅ Projects page data loaded from Sanity');
          console.log('   - Projects:', sanityResult.projects?.length || 0);
          console.log('   - Client Logos:', sanityResult.clientLogos?.length || 0);
          setData({
            ...sanityResult,
            clientLogos: sanityResult.clientLogos?.map(logo => logo.asset.url) || []
          });
        } else {
          console.warn('⚠️ No projects page data from Sanity - using fallbacks');
        }
      })
      .catch(err => {
        console.error('❌ Error fetching projects page:', err.message || err);
      });
  }, []);

  const fallbackData = {
    heroTitle: "Our Projects",
    heroSubtitle: "A showcase of our technical prowess and the results we deliver for our clients.",
    projects: [
      {
        title: "Autonomous Drone Surveillance",
        category: "AI & Embedded Systems",
        description: "A real-time monitoring system for agricultural drones using computer vision to detect crop health issues.",
        iconName: "Cpu",
      },
      {
        title: "FinTech Trading Platform",
        category: "Web & Cloud",
        description: "High-frequency trading dashboard with real-time data visualization and sub-millisecond latency execution.",
        iconName: "Cloud",
      },
      {
        title: "Smart City Traffic Management",
        category: "IoT & Big Data",
        description: "Centralized control system for traffic lights optimized by AI algorithms reducing congestion by 30%.",
        iconName: "Database",
      },
      {
        title: "Telehealth Portal",
        category: "SaaS",
        description: "HIPAA-compliant telemedicine platform connecting patients with specialists via secure video calls.",
        iconName: "Layout",
      },
    ],
    clientsTitle: "Trusted by Industry Leaders",
    clientLogos: [
      "/_optimized/mediafiles/logos/Gemini_Generated_Image_1898qy1898qy1898.webp",
      "/_optimized/mediafiles/logos/Gemini_Generated_Image_clfbv4clfbv4clfb.webp",
      "/_optimized/mediafiles/logos/Gemini_Generated_Image_l2e7mvl2e7mvl2e7.webp",
      "/_optimized/mediafiles/logos/Gemini_Generated_Image_l4utmml4utmml4ut.webp",
      "/_optimized/mediafiles/logos/Gemini_Generated_Image_z3rzx8z3rzx8z3rz.webp",
      "/_optimized/mediafiles/logos/Untitled design.webp",
      "/_optimized/mediafiles/logos/Untitled design (1).webp",
      "/_optimized/mediafiles/logos/Untitled design (2).webp",
      "/_optimized/mediafiles/logos/Untitled design (3).webp",
      "/_optimized/mediafiles/logos/Untitled design (4).webp",
      "/_optimized/mediafiles/logos/Untitled design (5).webp",
      "/_optimized/mediafiles/logos/Untitled design (6).webp",
      "/_optimized/mediafiles/logos/Untitled design (7).webp"
    ]
  };

  const finalData = data || fallbackData;

  const seoTitle = finalData.seo?.metaTitle || "Projects";
  const seoDesc = finalData.seo?.metaDescription || "Showcase of CopterCode's successful projects and case studies.";

  const heroTitle = finalData.heroTitle || fallbackData.heroTitle;
  const heroSubtitle = finalData.heroSubtitle || fallbackData.heroSubtitle;

  const projectsList = finalData.projects || fallbackData.projects;

  const clientsTitle = finalData.clientsTitle || fallbackData.clientsTitle;

  const clientLogos = finalData.clientLogos && finalData.clientLogos.length > 0 ? finalData.clientLogos : fallbackData.clientLogos;


  return (
    <div className="bg-background min-h-screen relative overflow-hidden">
      <SEO
        title={seoTitle}
        description={seoDesc}
      />

      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <PageHeader
        title={heroTitle}
        subtitle={heroSubtitle}
      />

      <section className="pt-10 pb-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projectsList.map((project, index) => {
              const IconComponent = iconComponentMap[project.iconName?.toLowerCase()] || iconComponentMap.cpu;
              const gradient = gradients[index % gradients.length];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative rounded-3xl"
                >
                  {/* Gradient Border & Glow Container */}
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl group-hover:from-accent group-hover:to-accent/40 transition-all duration-500 blur-[1px] group-hover:blur-[2px] opacity-70 group-hover:opacity-100" />

                  {/* Card Content */}
                  <div className="relative h-full bg-surface rounded-[23px] p-8 lg:p-10 flex flex-col items-start overflow-hidden border border-border group-hover:border-transparent transition-colors">
                    {/* Abstract Background Gradient */}
                    <div
                      className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${gradient} blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                    />

                    {/* Large Icon Background */}
                    <IconComponent
                      strokeWidth={1}
                      className="absolute -bottom-8 -right-8 w-48 h-48 text-primary/5 group-hover:text-primary/10 transition-colors duration-500 transform group-hover:scale-110 group-hover:rotate-12"
                    />

                    {/* External Link Icon */}
                    <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-background flex items-center justify-center border border-border group-hover:bg-accent group-hover:text-primary transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1 cursor-pointer">
                      <ArrowUpRight size={20} />
                    </div>

                    {/* Category Pill */}
                    <div className="mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-xs font-bold tracking-widest text-accent uppercase backdrop-blur-sm">
                      {project.category}
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-3xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-secondary leading-relaxed mb-8 text-lg relative z-10 transition-colors">
                      {project.description}
                    </p>

                    {/* Action Link (Implicit) */}
                    <div className="mt-auto flex items-center space-x-2 text-sm font-semibold text-accent opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span>{project.link ? "View Details" : "View Case Study"}</span>
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Trusted by Industry Leaders */}
      <section className="py-32 relative border-t border-border bg-surface backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-display font-medium text-primary mb-16 inline-flex flex-col items-center">
              <span className="mb-4">{clientsTitle}</span>
              <span className="w-12 h-1 bg-accent rounded-full" />
            </h2>

            <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12">
              {clientLogos.map((logo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="w-32 h-16 relative group"
                >
                  <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src={logo}
                    alt={`Client ${index + 1}`}
                    className="relative w-full h-full object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
