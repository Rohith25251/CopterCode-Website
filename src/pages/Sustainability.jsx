import React, { useState, useEffect } from "react";
import { client } from "../lib/sanity";
// Removed unused PageHeader import
import SEO from '../../src/components/SEO';
import { iconComponentMap } from '../sanity/schemas/icons';
import { Leaf, Globe, Zap, Users, Shield, Briefcase, Code, Sun, Star } from 'lucide-react';
import BackButton from '../components/ui/BackButton';


const Sustainability = () => {
    const [sanityData, setSanityData] = useState(null);

    useEffect(() => {
        const query = `*[_type == "sustainabilityPage"][0]{
            ...,
            hero {
                ...,
                image { asset->{ url } }
            }
        }`;
        client.fetch(query)
            .then(data => {
                if (data) {
                    console.log('✅ Sustainability page data loaded from Sanity');
                    console.log('   - Impact Grid:', data.impactGrid?.length || 0);
                    setSanityData({
                        seo: data.seo,
                        heroTitle: data.hero?.title,
                        heroSubtitle: data.hero?.subtitle,
                        heroImage: data.hero?.image?.asset?.url,
                        heroTag: data.hero?.tag,
                        introHeading: data.intro?.heading,
                        introDescription: data.intro?.description,
                        impactGrid: data.impactGrid,
                        csrHeading: data.csr?.heading,
                        csrDescription: data.csr?.description
                    });
                } else {
                    console.warn('⚠️ No sustainability page data from Sanity - using fallbacks');
                }
            })
            .catch(err => {
                console.error('❌ Error fetching sustainability page:', err.message || err);
            });
    }, []);

    const seoTitle = sanityData?.seo?.metaTitle || "Sustainability & Impact";
    const seoDesc = sanityData?.seo?.metaDescription || "CopterCode Nexus Impact - People, Planet, Prosperity";
    const seoKeywords = sanityData?.seo?.keywords || "Drone Tech, Enterprise AI, Industrial Automation, UAV, CopterCode, Software Solutions, Sustainability, ESG, Clean Energy, CSR";

    const heroTitle = sanityData?.heroTitle || "Sustainability";
    const heroSubtitle = sanityData?.heroSubtitle || "Impacting People, Planet, and Prosperity through innovation.";
    const heroImage = sanityData?.heroImage || "/mediafiles/news and media/IMG_3327.jpg";
    const heroTag = sanityData?.heroTag || "Our Responsibility";

    const introHeading = sanityData?.introHeading || "CopterCode Nexus Impact";
    const introDesc = sanityData?.introDescription || "We are committed to building societal and business value together, driving sustainable growth across all our operations.";

    const csrHeading = sanityData?.csrHeading || "CSR Initiatives";
    const csrDesc = sanityData?.csrDescription || "Supporting arts, culture, and heritage through CSR. Serving multiple industries across India and the USA (Texas).";

    const rawGrid = sanityData?.impactGrid || [
        { icon: "users", text: "Empowering people with care, empathy, and inclusiveness" },
        { icon: "briefcase", text: "Creating employment and enriching human capital" },
        { icon: "globe", text: "Collaborating globally to bring innovation to India" },
        { icon: "leaf", text: "Promoting sustainability, clean energy, and digital transformation" },
        { icon: "zap", text: "Driving education and innovation among youth" },
        { icon: "shield", text: "Delivering stakeholder-centric growth" },
        { icon: "code", text: "Building manufacturing and digital assets for India" },
        { icon: "sun", text: "Innovating in solar, textiles, and food sectors" }
    ];

    const gridItems = rawGrid.map(item => ({
        ...item,
        IconComponent: iconComponentMap[item.icon?.toLowerCase()] || Star
    }));


    return (
        <div className="bg-background min-h-screen text-primary selection:bg-accent selection:text-white overflow-hidden relative">
            <SEO title={seoTitle} description={seoDesc} keywords={seoKeywords} />
            
            {/* Floating Back Button */}
            <div className="fixed top-24 left-6 md:left-12 z-50">
                <BackButton />
            </div>

            {/* Full Size Hero Banner */}
            <section className="relative h-[85vh] md:h-[90vh] min-h-[600px] w-full overflow-hidden bg-slate-950">
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src={heroImage}
                        alt={heroTitle}
                        className="w-full h-full object-cover"
                    />
                    {/* Soft, premium dark gradient overlay for quote legibility */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/20 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
                </div>

                {/* Hero Content */}
                <div className="absolute inset-0 z-20 flex items-center">
                    <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl w-full">
                        <div className="max-w-3xl text-left">
                            <span className="px-3.5 py-1.5 bg-blue-500/10 text-blue-400 text-[10px] font-extrabold tracking-[0.2em] uppercase rounded border border-blue-500/20 inline-block mb-6 backdrop-blur-sm">
                                {heroTag}
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-black tracking-tight text-white mb-6 leading-[1.1]">
                                {heroTitle}
                            </h1>
                            <p className="text-lg sm:text-xl text-slate-300 font-medium italic mb-8 border-l-4 border-blue-500 pl-4 leading-relaxed max-w-2xl">
                                "{heroSubtitle}"
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-6 max-w-5xl">

                    <div className="text-center mb-20">
                        {/* Changed text-white to text-primary */}
                        <h2 className="text-4xl font-display font-bold text-primary mb-6">{introHeading}</h2>
                        <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
                        <p className="text-xl text-secondary">
                            {introDesc}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {gridItems.map((item, idx) => (
                            <div key={idx} className="bg-slate-950 p-8 border border-slate-800 rounded-2xl flex items-center space-x-6 hover:border-slate-700 hover:shadow-blue-950/20 hover:shadow-2xl transition-all duration-300">
                                <div className="p-4 bg-slate-900 border border-slate-800/80 rounded-xl text-blue-400 shadow-inner">
                                    <item.IconComponent size={28} />
                                </div>
                                <p className="text-lg font-medium text-slate-100">{item.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 bg-accent/5 p-12 rounded-2xl border border-accent/20 text-center">
                        {/* Header text-white -> text-primary */}
                        <h3 className="text-2xl font-bold text-primary mb-4">{csrHeading}</h3>
                        <p className="text-lg text-secondary mb-0">
                            {csrDesc}
                        </p>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Sustainability;
