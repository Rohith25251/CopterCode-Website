import React, { useState, useEffect } from "react";
import { client, urlFor } from "../lib/sanity";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "../components/ui/BackButton";

import { ASSETS } from "../constants/assets";
import { useScrollToTop } from "../hooks/useScrollToTop";

const InfraSecurity = () => {
    useScrollToTop(); // Force scroll to top on mount


    const fallbackData = {
        heroTitle: "Infra Security",
        heroSubtitle: "Securing Your Digital & Physical Infrastructure. We build robust, resilient, and secure IT liability that protects data, systems, and people.",
        heroVideo: ASSETS.VIDEOS.SECURITY,

        introTitle: "Why Infra Security Matters",
        introText: "Security is mission-critical. Rising cyber-attacks, regulatory compliance, and the need for data privacy demand a strong defense. CopterCode ensures your IT backbone—from firewalls to physical servers—is strong enough to support your growth without compromise.",
        introPoints: null,
        introMedia: ASSETS.VIDEOS.SECURITY,
        introMediaIsImage: false,

        portfolioTitle: "Services",
        portfolioItems: [
            {
                title: "Network Security & Firewall",
                desc: "Multi-layered defense systems to protect your networks.",
                features: ["Next-gen firewall installation", "IDS/IPS & VPN", "Network segmentation"]
            },
            {
                title: "Server Setup & Hardening",
                desc: "Making your servers impenetrable.",
                features: ["Linux & Windows Secure Deployment", "Patch Management & Encryption", "Disaster Recovery Planning"]
            },
            {
                title: "Endpoint & User Security",
                desc: "Securing the weakest link: people and devices.",
                features: ["Endpoint Detection (EDR)", "Multi-Factor Authentication (MFA)", "Anti-virus & Anti-malware"]
            },
            {
                title: "Audit & Consulting",
                desc: "Identifying gaps and recommending improvements.",
                features: ["Security Audits & Risk Assess.", "Compliance (GDPR, ISO, HIPAA)", "Improvement Roadmaps"]
            },
        ],

        featuresTitle: "Key Features",
        featuresList: [
            { title: "End-to-end protection", desc: "Physical to Application security" },
            { title: "Customized solutions", desc: "For Education & Corporate" },
            { title: "Enterprise hardware", desc: "Reliable and robust" },
            { title: "Real-time monitoring", desc: "Instant threat detection" },
            { title: "24/7 Support", desc: "Incident Response included" }
        ],

        impactTitle: "Industries We Serve",
        impactItems: [
            { area: "Schools & Colleges", desc: "Protecting student data" },
            { area: "Corporates", desc: "Securing IP" },
            { area: "Healthcare", desc: "Patient privacy" },
            { area: "Manufacturing", desc: "Industrial systems" },
            { area: "Government", desc: "Sensitive records" }
        ],

        testimonialQuote: null,
        testimonialAuthor: null,

        rdTitle: null,
        rdText: null,

        complianceTitle: null,
        complianceText: null,
        complianceList: null,

        ctaTitle: "Don't wait for a breach.",
        ctaText: "Secure your IT infrastructure with confidence. Contact us today.",
        ctaButtonText: "Secure Your Future"
    };

    const [sanityData, setSanityData] = useState(null);

    useEffect(() => {
        const query = `*[_type == "businessVerticalsPage"][0].verticals[id == "infra-security"][0]{
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

    const seoTitle = data.seo?.metaTitle || data.heroTitle || "Infra Security";
    const seoDesc = data.seo?.metaDescription || "Securing Your Digital & Physical Infrastructure with CopterCode.";

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
                        {data.ctaButtonText || "Secure Your Future"} <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default InfraSecurity;
