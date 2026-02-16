import { useState, useEffect } from "react";
import { client } from "../lib/sanity";
import PageHeader from "../components/PageHeader";
import OptimizedImage from "../components/OptimizedImage";
import SEO from "../components/SEO";
import { ArrowRight, FileText, TrendingUp, PieChart, ShieldCheck, BarChart, Briefcase, Star } from "lucide-react";
import { motion } from "framer-motion";


// Investor logos from mediafiles/logos (fallback)
const INVESTOR_LOGOS = [
    {
        name: "MurgDur",
        logo: "/mediafiles/logos/MurgDur-logo-CNKz8pTh.jpg",
        description: "A leading venture capital firm focused on early-stage technology startups with high growth potential, supporting our vision since inception."
    },
    {
        name: "Karvensen",
        logo: "/mediafiles/logos/KarVenSen-logo-9ePXpcco.jpg",
        description: "A global investment group specializing in sustainable infrastructure and innovative industrial solutions, partnering for long-term strategic growth."
    }
];

const Investors = () => {
    const [sanityData, setSanityData] = useState(null);

    useEffect(() => {
        const query = `*[_type == "investorsPage"][0]{..., investors[] { ..., logo { asset->{ url } } } }`;
        client.fetch(query).then(data => {
            if (data) {
                setSanityData({
                    seo: data.seo,
                    heroTitle: data.hero?.title,
                    heroSubtitle: data.hero?.subtitle,
                    introText: data.hero?.introText,
                    highlights: data.highlights,
                    investors: data.investors?.map(inv => ({
                        name: inv.name,
                        logo: inv.logo?.asset?.url,
                        description: inv.description
                    })) || [],
                    inquiryButtonLink: data.inquiries?.buttonLink
                });
            }
        }).catch(console.error);
    }, []);

    const seoTitle = sanityData?.seo?.metaTitle || "Investor Relations";
    const seoDesc = sanityData?.seo?.metaDescription || "Financial information and investor resources for CopterCode.";

    const heroTitle = sanityData?.heroTitle || "Our Investors";
    const heroSubtitle = sanityData?.heroSubtitle || "Transparent governance and sustainable value creation.";

    const introText = sanityData?.introText || "CopterCode is committed to delivering long-term value to our stakeholders through innovation, responsible governance, and strategic growth.";

    const rawHighlights = sanityData?.highlights || [
        { icon: "trendingUp", title: "Financial Highlights", description: "Quarterly and annual financial performance reports." },
        { icon: "fileText", title: "Annual Reports", description: "Comprehensive innovative and financial reviews of our fiscal years." },
        { icon: "pieChart", title: "Shareholder Info", description: "Stock information, dividend history, and shareholder services." },
        { icon: "shieldCheck", title: "Governance", description: "Board of directors, committees, and corporate policies." },
    ];

    const iconMap = {
        trendingUp: TrendingUp,
        fileText: FileText,
        pieChart: PieChart,
        shieldCheck: ShieldCheck,
        barChart: BarChart,
        briefcase: Briefcase,
    };

    const highlights = rawHighlights.map(item => ({
        ...item,
        IconComponent: iconMap[item.icon] || Star
    }));

    const investors = sanityData?.investors && sanityData.investors.length > 0 ? sanityData.investors : INVESTOR_LOGOS;

    return (
        <div className="bg-background min-h-screen text-primary">
            <SEO title={seoTitle} description={seoDesc} />
            <PageHeader title={heroTitle} subtitle={heroSubtitle} />

            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <p className="text-xl text-secondary leading-relaxed">{introText}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {highlights.map((item, idx) => (
                            <motion.div key={idx} whileHover={{ y: -5 }} className="bg-surface p-8 rounded-2xl border border-border hover:border-accent/40 shadow-lg transition-all duration-300">
                                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6">
                                    <item.IconComponent size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                                <p className="text-secondary">{item.description}</p>
                                <a href={item.linkUrl || "#"} className="inline-flex items-center mt-6 text-accent font-semibold hover:tracking-wide transition-all">
                                    {item.linkText || "View Details"} <ArrowRight size={16} className="ml-2" />
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-surface/50">
                <div className="container mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-primary mb-4">Our Investors</h2>
                        <div className="w-16 h-1 bg-accent/30 mx-auto rounded-full"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                        {investors.map((investor, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }} className="bg-white rounded-3xl p-12 text-center border border-border hover:border-accent/40 shadow-lg transition-all duration-300">
                                <motion.div whileHover={{ scale: 1.1 }} className="w-24 h-24 mx-auto mb-8 bg-gray-900 rounded-lg flex items-center justify-center">
                                    <OptimizedImage src={investor.logo} alt={investor.name} className="w-20 h-20 object-contain" sizes="120px" />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-primary mb-4">{investor.name}</h3>
                                <p className="text-secondary leading-relaxed">{investor.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Investors;
