import React, { useState, useEffect } from "react";
import { client } from "../lib/sanity";
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { iconComponentMap } from '../sanity/schemas/icons';
import { Leaf, Globe, Zap, Users, Shield, Briefcase, Code, Sun, Star } from 'lucide-react';


const Sustainability = () => {
    const [sanityData, setSanityData] = useState(null);

    useEffect(() => {
        const query = `*[_type == "sustainabilityPage"][0]`;
        client.fetch(query)
            .then(data => {
                if (data) {
                    console.log('✅ Sustainability page data loaded from Sanity');
                    console.log('   - Impact Grid:', data.impactGrid?.length || 0);
                    setSanityData({
                        seo: data.seo,
                        heroTitle: data.hero?.title,
                        heroSubtitle: data.hero?.subtitle,
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

    const heroTitle = sanityData?.heroTitle || "Sustainability";
    const heroSubtitle = sanityData?.heroSubtitle || "Impacting People, Planet, and Prosperity through innovation.";

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
        // Changed text-white to text-primary for visibility on light backgrounds
        <div className="bg-background min-h-screen text-primary">
            <SEO title={seoTitle} description={seoDesc} />
            <PageHeader
                title={heroTitle}
                subtitle={heroSubtitle}
            />

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
                            // Wrapper: bg-white -> bg-surface,  text-background -> text-primary
                            // Icon Wrapper: text-background -> text-accent/primary
                            <div key={idx} className="bg-surface p-8 border border-border rounded-xl flex items-center space-x-6 hover:border-accent/50 hover:shadow-lg transition-all duration-300">
                                <div className="p-4 bg-accent/10 rounded-full text-accent">
                                    <item.IconComponent size={28} />
                                </div>
                                <p className="text-lg font-medium text-primary">{item.text}</p>
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
