import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Leaf, Lightbulb, TrendingUp } from "lucide-react";

const DEFAULT_TABS = [
  {
    id: "sustainability",
    label: "Sustainability",
    title: "Sustainability & Responsibility",
    content:
      "At CopterCode, sustainability is embedded in every stage of how we design, deploy, and scale technology across industries. We prioritize responsible engineering, energy-efficient systems, and digital-first operations that reduce environmental impact while enabling long-term growth, operational resilience, and measurable value creation for businesses, communities, and future generations.",
    stats: [
      { value: "2035", label: "Net-Zero Vision" },
      { value: "30%", label: "Energy Efficiency" },
      { value: "100%", label: "Digital-First Ops" },
    ],
    icon: Leaf,
  },
  {
    id: "innovation",
    label: "Innovation",
    title: "Technology & Innovation",
    content:
      "Innovation is at the core of CopterCode’s technology-driven approach. From advanced drone platforms and intelligent automation to AI-powered analytics and cloud-native systems, we continuously evolve our technology stack to solve complex, real-world challenges, improve decision-making, and deliver scalable solutions across diverse business verticals.",
    stats: [
      { value: "6+", label: "Tech Verticals" },
      { value: "50+", label: "Initiatives" },
      { value: "2019", label: "Innovating Since" },
    ],
    icon: Lightbulb,
  },
  {
    id: "impact",
    label: "Our Impact",
    title: "Impact in Numbers",
    subtitle: "Corporate Excellence",
    content:
      "CopterCode delivers measurable impact by enabling smarter, safer, and more efficient operations across multiple industries. Through precision technology, data-driven insights, and scalable digital platforms, we help organizations enhance productivity, reduce risk, and achieve sustained operational excellence while expanding their reach across regional and global markets.",
    stats: [
      { value: "6+", label: "Verticals" },
      { value: "500+", label: "Projects" },
      { value: "Global", label: "Presence" },
    ],
    icon: TrendingUp,
  },
];

const ImpactTabs = ({ data }) => {
  // Map icons based on ID if coming from Sanity
  const getIcon = (id) => {
    if (id?.includes("sustainability")) return Leaf;
    if (id?.includes("innovation")) return Lightbulb;
    return TrendingUp;
  };

  const tabs =
    data?.tabs?.length > 0
      ? data.tabs.map((t, index) => ({
        id: t._key || `tab-${index}`, // Use Sanity key or index
        label: t.tabTitle || "Tab",
        title: t.sectionTitle || t.tabTitle,
        subtitle: "Sustainability", // optional
        content: t.description,
        stats: t.metrics?.map((m) => ({
          value: m.metricValue,
          label: m.metricLabel,
        })) || [],
        icon: getIcon(t.supportingIcon || t.tabTitle?.toLowerCase()),
      }))
      : DEFAULT_TABS;

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <section className="py-32 bg-surface relative overflow-hidden text-primary">
      {/* Background Texture */}

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
            Our Philosophy
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
            {data?.heading || "Driven by Purpose"}
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-20 bg-primary/5 p-2 rounded-full inline-flex mx-auto w-fit border border-primary/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === tab.id
                ? "bg-accent text-white shadow-[0_0_20px_rgba(160,174,192,0.4)] scale-105"
                : "text-primary/60 hover:text-primary hover:bg-primary/5"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            {tabs.map(
              (tab) =>
                activeTab === tab.id && (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
                  >
                    {/* Text Content */}
                    <div className="order-2 lg:order-1">
                      <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {tab.subtitle && (
                          <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-4 block flex items-center">
                            <div className="w-6 h-px bg-accent mr-3"></div>
                            {tab.subtitle}
                          </span>
                        )}
                        <h2 className="text-4xl lg:text-5xl font-display font-bold text-primary mb-8 leading-tight">
                          {tab.title}
                        </h2>
                        <p className="text-lg text-secondary leading-relaxed mb-10 border-l-2 border-accent/20 pl-6">
                          {tab.content}
                        </p>

                        <div className="grid grid-cols-3 gap-8 mb-10">
                          {tab.stats.map((stat, idx) => (
                            <div key={idx} className="relative group">
                              <div className="text-3xl lg:text-4xl font-bold text-primary mb-1 group-hover:text-accent transition-colors">
                                {stat.value}
                              </div>
                              <div className="text-[10px] lg:text-xs text-secondary uppercase tracking-widest font-bold">
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Visual Content (Light Card Style) */}
                    <div className="order-1 lg:order-2 h-[400px] lg:h-[600px] relative perspective-1000 group">
                      {/* Card Container */}
                      <div className="relative w-full h-full transform transition-transform duration-700 hover:rotate-y-12 preserve-3d">
                        {/* Main Image Base */}
                        <div className="absolute inset-0 bg-white rounded-3xl border border-primary/5 overflow-hidden shadow-2xl shadow-primary/5">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-10" />

                          {/* Dynamic Pattern / Visual */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="w-full h-full bg-accent" />
                          </div>

                          {/* Floating Icon Context */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                            <div className="w-32 h-32 rounded-full bg-primary/5 backdrop-blur-sm border border-primary/10 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500">
                              <tab.icon
                                size={56}
                                className="text-accent drop-shadow-sm"
                              />
                            </div>
                            <div className="text-center px-8">
                              <h3 className="text-3xl font-bold text-primary mb-3">
                                {tab.label}
                              </h3>
                              <p className="text-xs text-secondary uppercase tracking-[0.25em] font-bold">
                                Core Pillar
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ImpactTabs;
