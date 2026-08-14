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
        title: "Murgdur",
        category: "Luxury E-Commerce",
        description: "A premium bespoke e-commerce platform offering luxury royal fashion, heritage clothing, and custom accessories for modern royalty.",
        iconName: "globe",
        companyLogo: "/mediafiles/project_logos/Murgdur.png",
        link: "https://murgdur.com",
      },
      {
        title: "Conexio",
        category: "Enterprise Communication",
        description: "A real-time unified communication and collaborative chat application designed for teams and client interactions.",
        iconName: "messageSquare",
        companyLogo: "/mediafiles/project_logos/Conexio.png",
        link: "https://chat.coptercode.co.in",
      },
      {
        title: "Pupil Space",
        category: "EdTech & LMS",
        description: "An advanced learning management system for course creation, student enrollment, tracking, and interactive learning.",
        iconName: "graduationCap",
        companyLogo: "/mediafiles/project_logos/Pupil_Space.png",
        link: "https://lms.coptercode.co.in",
      },
      {
        title: "Campus ERP",
        category: "Enterprise Resource Planning",
        description: "A comprehensive university administration platform managing admissions, fees, scheduling, grading, and resources.",
        iconName: "building",
        companyLogo: "/mediafiles/project_logos/erp.png",
        link: "https://erp.coptercode.co.in",
      },
      {
        title: "NoteAI",
        category: "Artificial Intelligence",
        description: "An intelligent note-taking application powered by generative AI to summarize, organize, and query notes.",
        iconName: "lightbulb",
        companyLogo: "/mediafiles/project_logos/notes.png",
        link: "https://notes.coptercode.co.in",
      },
      {
        title: "Vistream",
        category: "Media & Streaming",
        description: "A high-performance live video streaming and content delivery platform with low latency and real-time interactive widgets.",
        iconName: "radio",
        companyLogo: "/mediafiles/project_logos/Vistream_local.png",
        link: "https://vistream.coptercode.co.in",
      },
      {
        title: "MeetMind AI",
        category: "Artificial Intelligence",
        description: "An automated meeting assistant that records, transcribes, and extracts key action items using AI.",
        iconName: "users",
        companyLogo: "/mediafiles/project_logos/ai-meeting.png",
        link: "https://meet.coptercode.co.in",
      },
      {
        title: "Internship Management",
        category: "Human Resources",
        description: "A centralized portal for student onboarding, daily progress tracking, task assignment, and completion certification.",
        iconName: "shieldCheck",
        companyLogo: "/mediafiles/project_logos/Internship_Management.png",
        link: "https://intern.coptercode.co.in",
      },
      {
        title: "Accordify",
        category: "Legal & Fintech",
        description: "A smart digital agreement platform allowing electronic signatures, automated contract verification, and secure storage.",
        iconName: "handshake",
        companyLogo: "/mediafiles/project_logos/accordify.png",
        link: "https://accordify.coptercode.co.in",
      },
      {
        title: "THE BILL BOOK",
        category: "Fintech & Invoicing",
        description: "An intuitive invoicing software for micro, small, and medium businesses to manage invoices, payments, and expenses.",
        iconName: "chart",
        companyLogo: "/mediafiles/project_logos/THE_BILL_BOOK.png",
        link: "https://invoice.coptercode.co.in",
      },
      {
        title: "PhotoToolkit",
        category: "Utility Tools",
        description: "A comprehensive web-based image manipulation toolkit for bulk resizing, cropping, compression, and file-format conversion.",
        iconName: "layout",
        companyLogo: "/mediafiles/project_logos/PhotoToolkit.jpg",
        link: "https://photo-toolkit.coptercode.co.in",
      },
      {
        title: "ResumeCraft",
        category: "Career Tools",
        description: "An interactive, ATS-optimized resume builder that helps candidates craft professional resumes using guided templates.",
        iconName: "fileText",
        companyLogo: "/mediafiles/project_logos/resume craft.png",
        link: "https://resumecraft.coptercode.co.in",
      },
      {
        title: "DeckFlow",
        category: "SaaS & Productivity",
        description: "A collaborative presentation deck builder designed for rapid creation of pitch decks and technical slides.",
        iconName: "layers",
        companyLogo: "/mediafiles/project_logos/deckflow.png",
        link: "https://deckflow.coptercode.co.in",
      },
      {
        title: "FileToolKit",
        category: "Utility Tools",
        description: "An all-in-one file utility tool for combining PDFs, extracting archives, compressing documents, and secure sharing.",
        iconName: "download",
        companyLogo: "/mediafiles/project_logos/file toolkit.png",
        link: "https://filetoolkit.coptercode.co.in",
      },
      {
        title: "Scripta",
        category: "Social Media Automation",
        description: "A social media scheduling and analytical dashboard that simplifies multi-channel publishing and campaign monitoring.",
        iconName: "zap",
        companyLogo: "/mediafiles/project_logos/Scripta.png",
        link: "https://sm.coptercode.co.in",
      },
    ],
    clientsTitle: "Trusted by Industry Leaders",
    clientLogos: [
      "/_optimized/mediafiles/logos/Gemini_Generated_Image_1898qy1898qy1898.webp",
      "/_optimized/mediafiles/logos/Gemini_Generated_Image_clfbv4clfbv4clfb.webp",
      "/_optimized/mediafiles/logos/Gemini_Generated_Image_l2e7mvl2e7mvl2e7.webp",
      "/_optimized/mediafiles/logos/Gemini_Generated_Image_l4utmml4utmml4ut.webp",
      "/_optimized/mediafiles/logos/Gemini_Generated_Image_z3rzx8z3rzx8z3rz.webp",
      "/_optimized/mediafiles/logos/KarVenSen-logo-9ePXpcco (1).webp",
      "/_optimized/mediafiles/logos/MurgDur-logo-CNKz8pTh.webp",
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
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px]" />
      </div>

      <PageHeader
        title={heroTitle}
        subtitle={heroSubtitle}
        bgClass="bg-background"
        titleColorClass="text-primary"
        subtitleColorClass="text-secondary"
        overlayOpacityClass="bg-background/80"
      />

      <section className="pt-10 pb-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projectsList.map((project, index) => {
              const IconComponent = iconComponentMap[project.iconName?.toLowerCase()] || iconComponentMap.cpu;
              const gradient = gradients[index % gradients.length];
              const fallbackProj = fallbackData.projects.find(p => p.title.toLowerCase() === project.title?.toLowerCase());
              const companyLogo = project.companyLogo || fallbackProj?.companyLogo;

              return (
                <motion.a
                  key={index}
                  href={project.link || "#"}
                  target={project.link ? "_blank" : undefined}
                  rel={project.link ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`group relative rounded-3xl block ${project.link ? "cursor-pointer" : "cursor-default"}`}
                >
                  {/* Gradient Border & Glow Container */}
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 rounded-3xl group-hover:from-blue-500 group-hover:to-cyan-400 transition-all duration-500 blur-[1px] group-hover:blur-[2px] opacity-70 group-hover:opacity-100" />

                  {/* Card Content */}
                  <div className="relative h-full bg-[#0b1329] rounded-[23px] p-8 lg:p-10 flex flex-col items-start overflow-hidden border border-slate-900/50 group-hover:border-transparent transition-colors shadow-lg hover:shadow-xl">
                    {/* Abstract Background Gradient */}
                    <div
                      className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${gradient} blur-[80px] rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-700`}
                    />

                    {/* Large Icon or Company Logo Background */}
                    {companyLogo ? (
                      <img
                        src={companyLogo}
                        alt=""
                        className="absolute -bottom-8 -right-8 w-48 h-48 object-contain opacity-5 group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12 pointer-events-none filter grayscale brightness-200"
                      />
                    ) : (
                      <IconComponent
                        strokeWidth={1}
                        className="absolute -bottom-8 -right-8 w-48 h-48 text-white/5 group-hover:text-blue-500/10 transition-colors duration-500 transform group-hover:scale-110 group-hover:rotate-12"
                      />
                    )}

                    {/* External Link Icon */}
                    <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-[#070b19] flex items-center justify-center border border-slate-800 text-slate-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-transparent transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1 cursor-pointer">
                      <ArrowUpRight size={20} />
                    </div>

                    {/* Category Pill */}
                    <div className="mb-6 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-bold tracking-widest text-blue-400 uppercase backdrop-blur-sm">
                      {project.category}
                    </div>

                    {/* Title & Description */}
                    <div className="flex items-center gap-3.5 mb-4 w-full">
                      {companyLogo && (
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm flex-shrink-0 overflow-hidden">
                          <img
                            src={companyLogo}
                            alt={`${project.title} logo`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <h3 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-slate-400 leading-relaxed mb-8 text-lg relative z-10 transition-colors">
                      {project.description}
                    </p>

                    {/* Action Link (Implicit) */}
                    <div className="mt-auto flex items-center space-x-2 text-sm font-semibold text-blue-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span>{project.link ? "View Project" : "View Case Study"}</span>
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </motion.a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Trusted by Industry Leaders */}
      <section className="py-32 relative border-t border-slate-900 bg-[#050814] backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-display font-medium text-white mb-16 inline-flex flex-col items-center">
              <span className="mb-4">{clientsTitle}</span>
              <span className="w-12 h-1 bg-blue-500 rounded-full" />
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
                  <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src={logo}
                    alt={`Client ${index + 1}`}
                    className="relative w-full h-full object-contain transition-all duration-500 transform group-hover:scale-110"
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
