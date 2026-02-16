import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import SEO from "../components/SEO";
import { Calendar, Clock, User } from "lucide-react";
import { motion } from "framer-motion";
import { client, urlFor } from "../lib/sanity";
import OptimizedImage from "../components/OptimizedImage";


// --- FALLBACK DATA (RESTORED) ---
const newsData = [
  // 2025
  {
    year: "2025",
    title: "CopterCode Summer Internship 2025 at IIT Madras Research Park",
    category: "Internship",
    date: "May 5, 2025",
    readTime: "3 min read",
    excerpt: "Students from 40+ institutions joined hands-on UAV projects.",
    author: "Internship Division",
  },
  {
    year: "2025",
    title: "AI in Drones Workshop 2025",
    category: "Workshop",
    date: "July 12, 2025",
    readTime: "3 min read",
    excerpt: "Machine learning applied to flight path optimization.",
    author: "AI Research Team",
  },
  {
    year: "2025",
    title:
      "Autonomous Fleet Management System Presented at Global Drone Meet 2025",
    category: "Conference",
    date: "August 22, 2025",
    readTime: "4 min read",
    excerpt: "Automated multi-drone coordination and predictive maintenance.",
    author: "R&D Division",
  },
  {
    year: "2025",
    title: "CopterCode Partners with Siemens for Smart Drone Fabrication",
    category: "Collaboration",
    date: "September 25, 2025",
    readTime: "3 min read",
    excerpt: "Automation integrated into UAV assembly and diagnostics.",
    author: "Industrial Collaboration Unit",
  },
  {
    year: "2025",
    title: "CopterCode Team Outing 2025 – Ooty Hills",
    category: "Team Outing",
    date: "October 15, 2025",
    readTime: "2 min read",
    excerpt: "Team-building and strategic innovation sessions.",
    author: "HR & Culture Team",
  },
  {
    year: "2025",
    title: "Cybersecurity in Drone Systems Seminar at IIT Madras",
    category: "Seminar",
    date: "November 5, 2025",
    readTime: "3 min read",
    excerpt: "Focused on secure drone networks and data protection.",
    author: "Security & Research Division",
  },
  {
    year: "2025",
    title: "CopterCode Expands Global Operations via US Delegation",
    category: "Business Trip",
    date: "December 3, 2025",
    readTime: "3 min read",
    excerpt: "Collaborations with aerospace labs in California.",
    author: "International Operations Team",
  },
  {
    year: "2025",
    title: "CopterCode Year-End Celebration 2025",
    category: "Celebration",
    date: "December 30, 2025",
    readTime: "2 min read",
    excerpt: "Celebrated another year of global innovation and growth.",
    author: "Corporate Communications",
  },
  // 2024
  {
    year: "2024",
    title: "CopterCode Internship 2024 Welcomes 150 Students Nationwide",
    category: "Internship",
    date: "July 2, 2024",
    readTime: "3 min read",
    excerpt: "Advanced training on UAV automation and field operations.",
    author: "HR & Training Division",
  },
  {
    year: "2024",
    title: "Drone Navigation and GPS Integration Workshop",
    category: "Workshop",
    date: "April 14, 2024",
    readTime: "3 min read",
    excerpt: "Hands-on lessons in autonomous routing and obstacle avoidance.",
    author: "Innovation Department",
  },
  {
    year: "2024",
    title: "International Drone Tech Summit, Singapore 2024",
    category: "Conference",
    date: "May 19, 2024",
    readTime: "4 min read",
    excerpt: "Unveiled multi-sensor drone systems for infrastructure scanning.",
    author: "Global R&D Team",
  },
  {
    year: "2024",
    title: "CopterCode and Infosys Partner for AI Drone Solutions",
    category: "Collaboration",
    date: "June 28, 2024",
    readTime: "3 min read",
    excerpt: "AI-driven analytics integrated into industrial UAV platforms.",
    author: "Business Development Unit",
  },
  {
    year: "2024",
    title: "Team CopterCode Adventure Retreat – Kodaikanal",
    category: "Team Outing",
    date: "August 16, 2024",
    readTime: "2 min read",
    excerpt: "Strengthened teamwork and innovation culture.",
    author: "HR Culture Unit",
  },
  {
    year: "2024",
    title: "Seminar on Future of Robotics and Drone Synergy at IIT Hyderabad",
    category: "Seminar",
    date: "October 10, 2024",
    readTime: "3 min read",
    excerpt: "Explored UAV-robotic arm integration for industrial automation.",
    author: "Technical Relations Team",
  },
  {
    year: "2024",
    title: "CopterCode Expands Market Reach via UK Tech Delegation",
    category: "Business Trip",
    date: "December 18, 2024",
    readTime: "3 min read",
    excerpt: "Discussions with UK aerospace startups and innovation centers.",
    author: "Global Affairs Team",
  },
  // 2023
  {
    year: "2023",
    title: "CopterCode Internship 2023 Empowers Students with Drone R&D Skills",
    category: "Internship Program",
    date: "July 8, 2023",
    readTime: "3 min read",
    excerpt:
      "Hands-on sessions on UAV mechanics and flight control guided over 90 interns across India.",
    author: "HR & Training Team",
  },
  {
    year: "2023",
    title: "CopterCode Hosts IoT Drone Integration Workshop",
    category: "Workshop",
    date: "June 22, 2023",
    readTime: "3 min read",
    excerpt:
      "Students explored how IoT and drones work together for real-time data transmission.",
    author: "Technical Education Unit",
  },
  {
    year: "2023",
    title: "CopterCode Presents at Asia Tech Conference 2023, Malaysia",
    category: "Conference",
    date: "September 10, 2023",
    readTime: "4 min read",
    excerpt:
      "CopterCode engineers showcased AI-powered drone analytics for logistics.",
    author: "R&D Department",
  },
  {
    year: "2023",
    title:
      "CopterCode and TCS Forge Collaboration for Industrial Drone Analytics",
    category: "Collaboration",
    date: "October 12, 2023",
    readTime: "3 min read",
    excerpt:
      "This partnership accelerated UAV adoption for predictive infrastructure monitoring.",
    author: "Business Development Division",
  },
  {
    year: "2023",
    title:
      "CopterCode Adventure Day 2023 – Team Bonding through Outdoor Innovation",
    category: "Team Outing",
    date: "February 5, 2023",
    readTime: "2 min read",
    excerpt:
      "A leadership-focused outdoor event encouraging creativity and collaboration.",
    author: "HR Culture Division",
  },
  {
    year: "2023",
    title: "Cyber Awareness Seminar Conducted for College Students",
    category: "Seminar",
    date: "April 4, 2023",
    readTime: "3 min read",
    excerpt:
      "Experts shared insights on ethical hacking, data protection, and secure coding.",
    author: "Security Division",
  },
  {
    year: "2023",
    title: "CopterCode Visits Dubai for Drone Industry Market Expansion",
    category: "Business Trip",
    date: "May 12, 2023",
    readTime: "3 min read",
    excerpt:
      "Strategic discussions with UAV manufacturers and aerospace R&D partners.",
    author: "International Trade Division",
  },
  {
    year: "2023",
    title: "CopterCode Joins National Engineering Job Fair 2023 in Chennai",
    category: "Job Fair",
    date: "August 28, 2023",
    readTime: "3 min read",
    excerpt:
      "Students from 25 colleges explored careers in drone tech and cybersecurity.",
    author: "Recruitment Department",
  },
  {
    year: "2023",
    title: "AI-Powered Drones Workshop at Hindustan Institute of Technology",
    category: "Workshop",
    date: "July 14, 2023",
    readTime: "3 min read",
    excerpt:
      "Introduced students to autonomous navigation and smart flight control systems.",
    author: "Innovation & Training Team",
  },
  {
    year: "2023",
    title: "MoU Signed Between CopterCode Research Division for UAV Testing",
    category: "Collaboration",
    date: "September 25, 2023",
    readTime: "3 min read",
    excerpt:
      "Focused on improving defense-grade UAV testing and precision systems.",
    author: "Research Collaboration Unit",
  },
  {
    year: "2023",
    title:
      "CopterCode Showcases Drone Fleet Control System at Global UAV Summit, Japan",
    category: "Conference",
    date: "November 10, 2023",
    readTime: "4 min read",
    excerpt: "Launched an AI-based multi-drone operations dashboard.",
    author: "Product Innovation Team",
  },
  {
    year: "2023",
    title: "Winter Internship 2023 Concludes with Smart Drone Showcase",
    category: "Internship",
    date: "December 15, 2023",
    readTime: "3 min read",
    excerpt:
      "Interns demonstrated live projects to academic and industry leaders.",
    author: "HR & Academic Relations",
  },
  {
    year: "2023",
    title: "Drone Hardware Assembly Workshop at SRM Institute",
    category: "Workshop",
    date: "March 20, 2023",
    readTime: "2 min read",
    excerpt:
      "Participants built mini quadcopters from scratch with expert guidance.",
    author: "Skill Development Division",
  },
  {
    year: "2023",
    title: "Drone Ethics and Safety Seminar at CopterCode HQ",
    category: "Seminar",
    date: "May 30, 2023",
    readTime: "3 min read",
    excerpt: "Focused on responsible and safe UAV deployment.",
    author: "Corporate Relations Team",
  },
  {
    year: "2023",
    title:
      "CopterCode Collaborates with AUMM on Renewable Energy Drone Mapping",
    category: "Collaboration",
    date: "June 18, 2023",
    readTime: "3 min read",
    excerpt:
      "Drone solutions for solar farm inspection and maintenance automation.",
    author: "Sustainability Division",
  },
  {
    year: "2023",
    title: "CopterCode Attends France Robotics Week 2023",
    category: "Business Trip",
    date: "October 20, 2023",
    readTime: "3 min read",
    excerpt: "Expanded European R&D partnerships in robotics and UAV research.",
    author: "Global Strategy Department",
  },
  {
    year: "2023",
    title: "CopterCode Year-End Gala 2023 – Celebrating Innovation",
    category: "Team Celebration",
    date: "December 28, 2023",
    readTime: "2 min read",
    excerpt:
      "Recognized outstanding contributions in leadership and technology.",
    author: "HR & Communications Team",
  },
  {
    year: "2023",
    title: "CopterCode Participates in India Tech Expo 2023",
    category: "Conference",
    date: "January 25, 2023",
    readTime: "4 min read",
    excerpt: "Demonstrated AI-driven drones for precision agriculture.",
    author: "Product Development Team",
  },
  // 2022
  {
    year: "2022",
    title: "CopterCode Drone Internship Program 2022",
    category: "Internship",
    date: "June 18, 2022",
    readTime: "3 min read",
    excerpt:
      "First internship batch trained 50 students in UAV design and coding.",
    author: "Training Division",
  },
  {
    year: "2022",
    title: "IoT and UAV Integration Workshop at VIT University",
    category: "Workshop",
    date: "August 10, 2022",
    readTime: "3 min read",
    excerpt: "Introduced IoT-based drone automation systems.",
    author: "Technical Education Team",
  },
  {
    year: "2022",
    title: "CopterCode Debuts at India Tech Conference 2022",
    category: "Conference",
    date: "September 5, 2022",
    readTime: "4 min read",
    excerpt: "Presented research on hybrid propulsion and sustainable drones.",
    author: "Research Division",
  },
  {
    year: "2022",
    title: "CopterCode Signs MoU for Drone Curriculum Development",
    category: "Collaboration",
    date: "November 2, 2022",
    readTime: "3 min read",
    excerpt: "Joint initiative to advance drone education and research.",
    author: "Academic Partnership Office",
  },
  {
    year: "2022",
    title: "Seminar on Drone Safety and Regulations",
    category: "Seminar",
    date: "December 12, 2022",
    readTime: "2 min read",
    excerpt: "Focused on compliance with Indian aviation regulations.",
    author: "Corporate Affairs Team",
  },
];

const newsImages = [
  "051FA395-AB6C-4EA8-955E-C2EBED74116F.jpg",
  "206E6062-E760-4CD3-9019-4FE4D7731371.jpg",
  "3442832E-21FB-4BF3-8CF2-7A91FBCA0302.jpg",
  "9342C8DE-3E4C-4347-B135-633C96634858.jpg",
  "B6181B19-4FA3-4BDE-866B-F02911B76EAC.jpg",
  "CFBD62AA-62AA-43F4-AE6E-B3E6DA8D8BCC.jpg",
  "E2C5CAA8-BE1C-4439-BC7D-0A2B4C6AB2C7.jpg",
  "IMG_1699.jpg",
  "IMG_1851.jpg",
  "IMG_3322.jpg",
  "IMG_3327.jpg",
  "IMG_3330.jpg",
  "IMG_3334.jpg",
  "IMG_3356.jpg",
  "IMG_3358.jpg",
  "IMG_3360.jpg",
  "IMG_3365.jpg",
  "IMG_3430.jpg",
  "IMG_3440.jpg",
  "IMG_3452.jpg",
  "IMG_3570.jpg",
  "IMG_3578.jpg",
  "IMG_3854.jpg",
  "IMG_3979.jpg",
];

const News = () => {
  const [sanityData, setSanityData] = useState(null);

  useEffect(() => {
    const query = `*[_type == "insightsPage"][0]`;
    client
      .fetch(query)
      .then((data) => {
        if (data) {
          setSanityData({
            seo: data.seo,
            heroTitle: data.hero?.title,
            heroSubtitle: data.hero?.subtitle,
            years: data.years?.map((y) => ({
              year: y.year,
              events: y.events || [],
              gallery: y.gallery?.map((img) => urlFor(img).url()) || [],
            })),
          });
        }
      })
      .catch(console.error);
  }, []);

  const seoTitle = sanityData?.seo?.metaTitle || "Insights";
  const seoDesc = sanityData?.seo?.metaDescription || "Latest updates and announcements from CopterCode (2022-2025)";

  const heroTitle = sanityData?.heroTitle || "Insights";
  const heroSubtitle = sanityData?.heroSubtitle || "A chronological journey of our milestones, events, and innovations.";

  // --- FALLBACK LOGIC ---
  let yearsData = [];

  if (sanityData?.years && sanityData.years.length > 0) {
    yearsData = sanityData.years;
  } else {
    // Transform the hardcoded flat data into the new structure
    const years = ["2025", "2024", "2023", "2022"];
    yearsData = years.map(year => {
      const yearEvents = newsData.filter(item => item.year === year);
      if (yearEvents.length === 0) return null;

      // Image logic from old component
      const yearInt = parseInt(year);
      const start = yearInt % newsImages.length;
      const gallery = [...newsImages.slice(start), ...newsImages.slice(0, start)].map(
        img => `/mediafiles/news and media/${img}`
      );

      return {
        year,
        events: yearEvents,
        gallery
      };
    }).filter(Boolean); // Remove nulls
  }

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    if (dateStr.includes(",")) return dateStr; // Already formatted
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) { return dateStr; }
  };

  return (
    <div className="bg-background min-h-screen text-primary">
      <SEO title={seoTitle} description={seoDesc} />
      <PageHeader title={heroTitle} subtitle={heroSubtitle} />

      <div className="container mx-auto px-6 py-12">

        {yearsData.length === 0 && (
          <div className="text-center py-20">
            <p className="text-secondary text-lg">No insights available yet.</p>
          </div>
        )}

        {yearsData.map((yearItem, yrIdx) => {
          const year = yearItem.year;
          const yearEvents = yearItem.events || [];
          const yearImages = yearItem.gallery || [];

          if (yearEvents.length === 0 && yearImages.length === 0) return null;

          return (
            <section key={yrIdx} className="mb-32 relative">
              {/* Year Marker */}
              <div className="flex items-center mb-12">
                <h2 className="text-6xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/20 opacity-50">
                  {year}
                </h2>
                <div className="h-px bg-border flex-grow ml-8"></div>
              </div>

              {/* Events List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {yearEvents.map((news, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx}
                    className="bg-surface border border-border p-8 rounded-xl hover:border-accent/40 transition-all duration-300 group flex flex-col shadow-lg"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <span className="px-3 py-1 bg-accent/10 rounded text-xs font-bold uppercase tracking-widest text-accent border border-accent/20">
                        {news.category}
                      </span>
                      <span className="text-secondary text-xs font-mono flex items-center">
                        <Calendar size={12} className="mr-2" /> {formatDate(news.date)}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-primary/80 transition-colors leading-tight">
                      {news.title}
                    </h3>

                    <p className="text-secondary text-sm leading-relaxed mb-6 flex-grow">
                      {news.excerpt}
                    </p>

                    <div className="pt-6 border-t border-border flex items-center justify-between text-xs text-secondary">
                      <div className="flex items-center">
                        <User size={12} className="mr-2" /> {news.author}
                      </div>
                      <div className="flex items-center">
                        <Clock size={12} className="mr-2" /> {news.readTime}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Gallery Carousel */}
              {yearImages.length > 0 && (
                <div className="relative overflow-hidden group/gallery">
                  <div className="flex items-center justify-between mb-8 px-2">
                    <h3 className="text-2xl font-display font-bold text-primary flex items-center">
                      <span className="w-2 h-8 bg-accent mr-4 rounded-full"></span>
                      Gallery {year}
                    </h3>
                  </div>

                  <div className="relative w-full mask-linear-fade">
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                    <motion.div
                      className="flex gap-6"
                      animate={{ x: ["0%", "-50%"] }}
                      transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity,
                      }}
                    >
                      {/* Duplicate for loop */}
                      {[...yearImages, ...yearImages].map((imgUrl, i) => (
                        <div
                          key={i}
                          className="min-w-[300px] md:min-w-[400px] aspect-[4/3] rounded-2xl overflow-hidden relative border border-border bg-surface shadow-lg transition-all duration-500"
                        >
                          <OptimizedImage
                            src={imgUrl}
                            alt={`Gallery ${year} ${i}`}
                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                            sizes="(min-width:1024px) 33vw, 300px"
                          />
                          <div className="absolute inset-0 bg-primary/10 hover:bg-transparent transition-colors duration-300" />
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default News;
