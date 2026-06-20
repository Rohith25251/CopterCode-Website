import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { client } from "../lib/sanity";
import BackButton from "../components/ui/BackButton";
import SEO from "../components/SEO";
import { iconComponentMap } from '../sanity/schemas/icons';
import { ArrowRight, FileText, TrendingUp, PieChart, ShieldCheck, BarChart, Briefcase, Star, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";


// Investor logos from mediafiles/logos (fallback)
const INVESTOR_LOGOS = [
    {
        name: "MurgDur",
        logo: "/_optimized/mediafiles/logos/MurgDur-logo-CNKz8pTh.webp",
        url: "https://murgdur.com/",
        description: "A leading venture capital firm focused on early-stage technology startups with high growth potential, supporting our vision since inception."
    },
    {
        name: "Karvensen",
        logo: "/_optimized/mediafiles/logos/KarVenSen-logo-9ePXpcco (1).webp",
        url: "https://karvensen.com/",
        description: "A global investment group specializing in sustainable infrastructure and innovative industrial solutions, partnering for long-term strategic growth."
    }
];

const Investors = () => {
    const [sanityData, setSanityData] = useState(null);

    useEffect(() => {
        const query = `*[_type == "investorsPage"][0]{
            ...,
            hero {
                ...,
                image { asset->{ url } }
            },
            investors[] {
                ...,
                logo { asset->{ url } }
            }
        }`;
        client.fetch(query)
            .then(data => {
                if (data) {
                    console.log('✅ Investors page data loaded from Sanity');
                    console.log('   - Investors:', data.investors?.length || 0);
                    setSanityData({
                        seo: data.seo,
                        heroTitle: data.hero?.title,
                        heroSubtitle: data.hero?.subtitle,
                        heroImage: data.hero?.image?.asset?.url,
                        heroTag: data.hero?.tag,
                        introText: data.hero?.introText,
                        aboutHeading: data.about?.heading,
                        aboutParagraph1: data.about?.paragraph1,
                        aboutParagraph2: data.about?.paragraph2,
                        partnersHeading: data.partners?.heading,
                        partnersDescription: data.partners?.description,
                        highlights: data.highlights,
                        investors: data.investors?.map(inv => ({
                            name: inv.name,
                            logo: inv.logo?.asset?.url,
                            url: inv.url,
                            description: inv.description
                        })) || [],
                        inquiryHeading: data.inquiries?.heading,
                        inquiryDescription: data.inquiries?.description,
                        inquiryButtonText: data.inquiries?.buttonText,
                        inquiryButtonLink: data.inquiries?.buttonLink
                    });
                } else {
                    console.warn('⚠️ No investors page data from Sanity - using fallbacks');
                }
            })
            .catch(err => {
                console.error('❌ Error fetching investors page:', err.message || err);
            });
    }, []);

    const seoTitle = sanityData?.seo?.metaTitle || "Investor Relations & Financial Reporting | CopterCode";
    const seoDesc = sanityData?.seo?.metaDescription || "Explore CopterCode's investor relations, financial reports, shareholder information, and corporate governance. Transparent financial performance and investor resources.";

    const heroTitle = sanityData?.heroTitle || "Our Investors";
    const heroSubtitle = sanityData?.heroSubtitle || "Transparent governance and sustainable value creation.";
    const heroImage = sanityData?.heroImage || "/mediafiles/news and media/IMG_3327.jpg";
    const heroTag = sanityData?.heroTag || "Investor Relations";

    const introText = sanityData?.introText || "CopterCode is committed to delivering long-term value to our stakeholders through innovation, responsible governance, and strategic growth.";

    const aboutHeading = sanityData?.aboutHeading || "About Our Investor Relations Program";
    const aboutParagraph1 = sanityData?.aboutParagraph1 || "At CopterCode, we believe in maintaining transparent communication with our investors and stakeholders. Our investor relations program provides comprehensive access to financial information, corporate governance details, and strategic insights into our diversified business operations.";
    const aboutParagraph2 = sanityData?.aboutParagraph2 || "Whether you're researching our drone technology solutions, our digital services and ERP offerings, or our sustainable initiatives, our investor resources offer detailed insights into CopterCode's growth trajectory and market position.";

    const partnersHeading = sanityData?.partnersHeading || "Our Strategic Investment Partners";
    const partnersDescription = sanityData?.partnersDescription || "Our investors are carefully selected partners who share our vision of innovation, sustainability, and long-term value creation in industrial automation and enterprise technology.";

    const inquiryHeading = sanityData?.inquiryHeading || "Have Investor Inquiries?";
    const inquiryDescription = sanityData?.inquiryDescription || "For more information about investor relations, financial reports, or to discuss investment opportunities, please reach out to us.";
    const inquiryButtonText = sanityData?.inquiryButtonText || "Contact Investor Relations";
    const inquiryButtonLink = sanityData?.inquiryButtonLink || "/contact";

    const rawHighlights = sanityData?.highlights || [
        { icon: "trendingUp", title: "Financial Highlights", description: "Quarterly and annual financial performance reports." },
        { icon: "fileText", title: "Annual Reports", description: "Comprehensive innovative and financial reviews of our fiscal years." },
        { icon: "pieChart", title: "Shareholder Info", description: "Stock information, dividend history, and shareholder services." },
        { icon: "shieldCheck", title: "Governance", description: "Board of directors, committees, and corporate policies." },
    ];

    const highlights = rawHighlights.map(item => ({
        ...item,
        IconComponent: iconComponentMap[item.icon?.toLowerCase()] || Star
    }));

    const investors = sanityData?.investors && sanityData.investors.length > 0 ? sanityData.investors : INVESTOR_LOGOS;

    return (
        <div className="bg-background min-h-screen text-primary selection:bg-accent selection:text-white overflow-hidden relative">
            <SEO title={seoTitle} description={seoDesc} keywords="investor relations, financial reporting, shareholder information, corporate governance, CopterCode, annual reports, financial performance" />
            
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

            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <p className="text-xl text-secondary leading-relaxed">{introText}</p>
                    </div>

                    {/* About Investor Relations Section */}
                    <div className="max-w-4xl mx-auto mb-20">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">{aboutHeading}</h2>
                            {sanityData?.aboutParagraph1 ? (
                                <p className="text-lg text-secondary leading-relaxed mb-4">{aboutParagraph1}</p>
                            ) : (
                                <p className="text-lg text-secondary leading-relaxed mb-4">
                                    At CopterCode, we believe in maintaining transparent communication with our investors and stakeholders. Our investor relations program provides comprehensive access to financial information, corporate governance details, and strategic insights into our diversified business operations.
                                </p>
                            )}
                            {sanityData?.aboutParagraph2 ? (
                                <p className="text-lg text-secondary leading-relaxed mb-4">{aboutParagraph2}</p>
                            ) : (
                                <p className="text-lg text-secondary leading-relaxed mb-4">
                                    Whether you're researching our <Link to="/business" className="text-accent hover:text-accent/80 font-semibold">drone technology solutions</Link>, our <Link to="/digital-services" className="text-accent hover:text-accent/80 font-semibold">digital services and ERP offerings</Link>, or our sustainable initiatives, our investor resources offer detailed insights into CopterCode's growth trajectory and market position.
                                </p>
                            )}
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                        {highlights.map((item, idx) => (
                            <motion.div key={idx} whileHover={{ y: -5 }} className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-slate-700 shadow-lg hover:shadow-blue-950/20 hover:shadow-2xl transition-all duration-300 flex flex-col">
                                <div className="w-14 h-14 bg-slate-900 border border-slate-800/80 rounded-xl flex items-center justify-center text-blue-400 mb-6 shadow-inner">
                                    <item.IconComponent size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed flex-grow">{item.description}</p>
                                <a href={item.linkUrl || "#"} className="inline-flex items-center mt-6 text-blue-400 font-semibold hover:text-blue-300 transition-colors">
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
                        <h2 className="text-4xl font-bold text-primary mb-4">{partnersHeading}</h2>
                        <p className="text-lg text-secondary max-w-3xl mx-auto">
                            {partnersDescription}
                        </p>
                        <div className="w-16 h-1 bg-accent/30 mx-auto rounded-full mt-6"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                        {investors.map((investor, idx) => (
                            <motion.a key={idx} href={investor.url || "#"} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }} className="bg-white rounded-3xl p-12 text-center border border-border hover:border-accent/40 shadow-lg transition-all duration-300 cursor-pointer block">
                                <motion.div whileHover={{ scale: 1.1 }} className="w-24 h-24 mx-auto mb-8 bg-gray-900 rounded-lg flex items-center justify-center">
                                    <img src={investor.logo} alt={investor.name} className="w-20 h-20 object-contain" loading="lazy" decoding="async" />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-primary mb-4">{investor.name}</h3>
                                <p className="text-secondary leading-relaxed mb-6">{investor.description}</p>
                                <div className="flex items-center justify-center text-accent font-semibold hover:tracking-wide transition-all">
                                    {investor.name && `Visit ${investor.name}`} <ExternalLink size={16} className="ml-2" />
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Additional Resources Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Why Invest in CopterCode?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-slate-700 hover:shadow-blue-950/20 hover:shadow-2xl transition-all duration-300">
                                <h3 className="text-xl font-bold text-white mb-3">Diversified Portfolio</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Our operations span industrial drones, enterprise AI, digital services, manufacturing, and infrastructure. This diversification reduces risk and provides multiple revenue streams.
                                </p>
                            </div>
                            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-slate-700 hover:shadow-blue-950/20 hover:shadow-2xl transition-all duration-300">
                                <h3 className="text-xl font-bold text-white mb-3">Innovation Leadership</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    We're pioneers in <Link to="/industrial-drones" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">UAV technology</Link> and <Link to="/erp-solutions" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">enterprise software solutions</Link>, positioning us at the forefront of technological advancement.
                                </p>
                            </div>
                            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-slate-700 hover:shadow-blue-950/20 hover:shadow-2xl transition-all duration-300">
                                <h3 className="text-xl font-bold text-white mb-3">Sustainability Commitment</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Through our <Link to="/new-energy" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">sustainable energy initiatives</Link> and responsible business practices, we're building a future-proof enterprise.
                                </p>
                            </div>
                            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-slate-700 hover:shadow-blue-950/20 hover:shadow-2xl transition-all duration-300">
                                <h3 className="text-xl font-bold text-white mb-3">Global Expansion</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    With operations in multiple continents and strategic partnerships worldwide, CopterCode is positioned for continued international growth.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Contact CTA Section */}
            <section className="py-20 bg-surface/50">
                <div className="container mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">{inquiryHeading}</h2>
                        <p className="text-lg text-secondary mb-8">
                            {inquiryDescription}
                        </p>
                        {inquiryButtonLink.startsWith("mailto:") || inquiryButtonLink.startsWith("http") ? (
                            <a href={inquiryButtonLink} className="inline-flex items-center justify-center bg-accent text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent/90 transition-colors">
                                {inquiryButtonText} <ArrowRight size={20} className="ml-2" />
                            </a>
                        ) : (
                            <Link to={inquiryButtonLink} className="inline-flex items-center justify-center bg-accent text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent/90 transition-colors">
                                {inquiryButtonText} <ArrowRight size={20} className="ml-2" />
                            </Link>
                        )}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Investors;
