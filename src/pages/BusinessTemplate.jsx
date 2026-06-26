import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { client } from "../lib/sanity";
import SEO from "../components/SEO";
import OptimizedImage from "../components/OptimizedImage";
import LazyVideo from "../components/LazyVideo";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import BackButton from "../components/ui/BackButton";
import { useScrollToTop } from "../hooks/useScrollToTop";

const BusinessTemplate = () => {
    useScrollToTop();
    const { slug } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        setLoading(true);
        setNotFound(false);

        // Fetch vertical by slug
        const query = `*[_type == "businessVerticalsPage"][0].verticals[slug.current == $slug][0]{
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

        client.fetch(query, { slug }).then((result) => {
            if (result) {
                // Normalize data
                const normalized = {
                    ...result,
                    heroVideo: result.heroVideo?.type === 'file' ? result.heroVideo.file?.asset?.url : result.heroVideo?.url,
                    introMedia: result.introMedia?.sourceType === 'file'
                        ? result.introMedia.file?.asset?.url
                        : (result.introMedia?.mediaType === 'image'
                            ? (result.introMedia.image?.asset?.url)
                            : result.introMedia?.url),
                    introMediaIsImage: result.introMedia?.mediaType === 'image',
                    // Ensure arrays
                    introPoints: result.introPoints || [],
                    portfolioItems: result.portfolioItems || [],
                    featuresList: result.featuresList || [],
                    impactItems: result.impactItems || [],
                    rdList: result.rdList || [],
                    complianceList: result.complianceList || []
                };
                setData(normalized);
            } else {
                setNotFound(true);
            }
        })
            .catch((err) => {
                console.error(err);
                setNotFound(true);
            })
            .finally(() => setLoading(false));

    }, [slug]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-10 h-10 animate-spin text-accent" />
            </div>
        );
    }

    if (notFound || !data) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-background text-center px-6">
                <h1 className="text-4xl font-display font-medium mb-4 text-primary">Page Not Found</h1>
                <p className="text-secondary mb-8">The business vertical you are looking for does not exist.</p>
                <Link to="/business" className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-accent hover:text-black transition-colors">
                    Back to Businesses
                </Link>
            </div>
        );
    }

    const seoTitle = data.seo?.metaTitle || data.heroTitle || data.title;
    const seoDesc = data.seo?.metaDescription || data.heroSubtitle;

    // Theme values (with defaults matching original preferences)
    const isHeroDark = data.heroTheme === 'dark' || (!data.heroTheme && true); // default dark
    const isIntroDark = data.introTheme === 'dark'; // default light
    const isPortfolioDark = data.portfolioTheme === 'dark' || (!data.portfolioTheme && true); // default dark
    const isFeaturesDark = data.featuresTheme === 'dark'; // default light
    const isImpactDark = data.impactTheme === 'dark'; // default light
    const isRdComplianceDark = data.rdComplianceTheme === 'dark'; // default light
    const isCtaDark = data.ctaTheme === 'dark'; // default light

    return (
        <div className="bg-background min-h-screen text-primary selection:bg-accent selection:text-primary">
            <SEO title={seoTitle} description={seoDesc} />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {data.heroVideo && (
                        <video
                            src={data.heroVideo}
                            autoPlay
                            loop
                            muted
                            playsInline
                            crossOrigin="anonymous"
                            className="w-full h-full object-cover opacity-50"
                            preload="metadata"
                        />
                    )}
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
                        className={`mx-auto max-w-3xl border rounded-3xl px-8 py-10 shadow-2xl backdrop-blur-sm ${
                            isHeroDark ? "bg-[#030712]/95 border-slate-800/80" : "bg-background/80 border-border shadow-xl"
                        }`}
                    >
                        <h1 className={`text-5xl md:text-7xl font-display font-medium mb-6 ${
                            isHeroDark ? "text-white" : "text-primary"
                        }`}>
                            {data.heroTitle}
                        </h1>
                        <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${
                            isHeroDark ? "text-slate-400" : "text-secondary"
                        }`}>
                            {data.heroSubtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Introduction */}
            {(data.introTitle || data.introText) && (
                <section className={`py-24 ${isIntroDark ? "bg-[#080c15] text-white border-y border-slate-800/50" : "bg-background text-primary"}`}>
                    <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className={`text-3xl md:text-4xl font-display font-medium mb-6 ${isIntroDark ? "text-white" : "text-primary"}`}>
                                {data.introTitle}
                            </h2>
                            <p className={`text-lg leading-relaxed mb-6 ${isIntroDark ? "text-slate-400" : "text-secondary"}`}>
                                {data.introText}
                            </p>
                            {data.introPoints && (
                                <ul className="space-y-4">
                                    {data.introPoints.map((item, i) => (
                                        <li key={i} className="flex items-start">
                                            <CheckCircle2 className={`w-5 h-5 mr-3 mt-1 flex-shrink-0 ${isIntroDark ? "text-blue-400" : "text-accent"}`} />
                                            <span className={isIntroDark ? "text-slate-300" : "text-secondary"}>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className={`relative rounded-3xl overflow-hidden border shadow-2xl min-h-[400px] flex items-center justify-center ${
                            isIntroDark ? "border-slate-800/80 bg-[#030712]" : "border-border bg-surface"
                        }`}>
                            {data.introMedia ? (
                                data.introMediaIsImage ? (
                                    <OptimizedImage src={data.introMedia} alt="Intro" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                                ) : (
                                    <LazyVideo eager={true} src={data.introMedia} className="absolute inset-0 w-full h-full object-cover opacity-80" />
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
            )}

            {/* Portfolio Grid */}
            {data.portfolioItems && data.portfolioItems.length > 0 && (
                <section className={`py-24 relative ${isPortfolioDark ? "bg-[#080c15] text-white border-y border-slate-800/50" : "bg-surface text-primary border-y border-border"}`}>
                    <div className="container mx-auto px-6">
                        {data.portfolioTitle && (
                            <h2 className={`text-4xl font-display font-medium mb-16 text-center ${isPortfolioDark ? "text-white" : "text-primary"}`}>
                                {data.portfolioTitle}
                            </h2>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {data.portfolioItems.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col border ${
                                        isPortfolioDark 
                                            ? "bg-[#030712] border-slate-800/80 hover:border-blue-500/40" 
                                            : "bg-background border-border hover:border-accent/40"
                                    }`}
                                >
                                    <h3 className={`text-xl font-bold mb-4 transition-colors ${
                                        isPortfolioDark ? "text-white hover:text-blue-400" : "text-primary hover:text-accent"
                                    }`}>{item.title}</h3>
                                    {item.desc && <p className={`text-sm mb-6 ${isPortfolioDark ? "text-slate-400" : "text-secondary"}`}>{item.desc}</p>}
                                    <div className={`border-t my-4 ${isPortfolioDark ? "border-slate-800/80" : "border-border"}`} />
                                    {item.features && (
                                        <ul className="space-y-3 mt-auto">
                                            {item.features.map((feature, fIdx) => (
                                                <li key={fIdx} className={`text-sm flex items-start ${isPortfolioDark ? "text-slate-300" : "text-secondary"}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 mr-2 flex-shrink-0 ${isPortfolioDark ? "bg-blue-400" : "bg-accent"}`} />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Key Features */}
            {data.featuresList && data.featuresList.length > 0 && (
                <section className={`py-24 ${isFeaturesDark ? "bg-[#080c15] text-white border-y border-slate-800/50" : "bg-background text-primary"}`}>
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto">
                            {data.featuresTitle && (
                                <h2 className={`text-3xl font-display font-medium text-center mb-12 ${isFeaturesDark ? "text-white" : "text-primary"}`}>
                                    {data.featuresTitle}
                                </h2>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {data.featuresList.map((feat, i) => (
                                    <div key={i} className={`flex items-start p-4 rounded-xl transition-colors ${isFeaturesDark ? "hover:bg-[#030712]" : "hover:bg-surface"}`}>
                                        <CheckCircle2 className={`mr-4 mt-1 flex-shrink-0 ${isFeaturesDark ? "text-blue-400" : "text-accent"}`} />
                                        <div>
                                            <h4 className={`font-bold ${isFeaturesDark ? "text-white" : "text-primary"}`}>{feat.title || "Feature"}</h4>
                                            <p className={`text-sm ${isFeaturesDark ? "text-slate-400" : "text-secondary"}`}>{feat.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Impact & Testimonials */}
            {((data.impactItems && data.impactItems.length > 0) || data.impactTitle || data.testimonialQuote) && (
                <section className={`py-24 border-y ${
                    isImpactDark ? "bg-[#080c15] text-white border-slate-800/50" : "bg-surface border-border text-primary"
                }`}>
                    <div className="container mx-auto px-6">
                        {data.impactTitle && (
                            <h2 className={`text-3xl font-display font-medium text-center mb-12 ${isImpactDark ? "text-white" : "text-primary"}`}>
                                {data.impactTitle}
                            </h2>
                        )}

                        {data.impactItems && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                                {data.impactItems.map((impact, i) => (
                                    <div key={i} className="bg-[#030712] border border-slate-800/80 hover:border-blue-500/40 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                                        <h4 className="text-white font-bold mb-2 hover:text-blue-400 transition-colors">{impact.area}</h4>
                                        <p className="text-slate-400 text-sm">{impact.desc}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {(data.testimonialQuote || data.testimonialAuthor) && (
                            <div className={`p-8 rounded-2xl max-w-4xl mx-auto text-center border ${
                                isImpactDark ? "bg-[#0a0f1d] border-slate-800/80 text-white" : "bg-accent/10 border-accent/20"
                            }`}>
                                {data.testimonialQuote && (
                                    <cite className={`text-xl md:text-2xl font-display italic mb-4 block ${isImpactDark ? "text-slate-100" : "text-primary"}`}>
                                        {data.testimonialQuote}
                                    </cite>
                                )}
                                {data.testimonialAuthor && (
                                    <span className={`font-bold tracking-widest text-xs uppercase ${isImpactDark ? "text-blue-400" : "text-accent"}`}>
                                        — {data.testimonialAuthor}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* R&D and Certifications */}
            {(data.rdTitle || data.complianceTitle || (data.rdList && data.rdList.length > 0) || (data.complianceList && data.complianceList.length > 0)) && (
                <section className={`py-24 ${isRdComplianceDark ? "bg-[#080c15] text-white border-y border-slate-800/50" : "bg-background text-primary"}`}>
                    <div className={`container mx-auto px-6 ${(data.rdTitle || data.rdList) && (data.complianceTitle || data.complianceList)
                        ? "grid grid-cols-1 lg:grid-cols-2 gap-16"
                        : "max-w-3xl mx-auto"
                        }`}>
                        {/* R&D Section */}
                        {(data.rdTitle || data.rdList) && (
                            <div>
                                {data.rdTitle && <h3 className={`text-2xl font-bold mb-6 ${isRdComplianceDark ? "text-white" : "text-primary"}`}>{data.rdTitle}</h3>}
                                {data.rdText && <p className={isRdComplianceDark ? "text-slate-400 mb-6" : "text-secondary mb-6"}>{data.rdText}</p>}
                                {data.rdList && (
                                    <ul className="space-y-3 mb-8">
                                        {data.rdList.map((item, i) => (
                                            <li key={i} className={`flex items-center ${isRdComplianceDark ? "text-slate-300" : "text-secondary"}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full mr-3 ${isRdComplianceDark ? "bg-blue-400" : "bg-accent"}`} />
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
                                {data.complianceTitle && <h3 className={`text-2xl font-bold mb-6 ${isRdComplianceDark ? "text-white" : "text-primary"}`}>{data.complianceTitle}</h3>}
                                {data.complianceText && <p className={isRdComplianceDark ? "text-slate-400 mb-6" : "text-secondary mb-6"}>{data.complianceText}</p>}
                                {data.complianceList && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                        {data.complianceList.map((item, i) => (
                                            <div
                                                key={i}
                                                className="bg-[#030712] border border-slate-800/80 p-5 rounded-xl shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all duration-300 flex items-center space-x-3"
                                            >
                                                <span className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                                                <span className="text-slate-300 text-sm font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {data.complianceFooter && (
                                    <p className={`mt-6 italic ${isRdComplianceDark ? "text-slate-400" : "text-secondary"}`}>
                                        {data.complianceFooter}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className={`py-24 text-center ${isCtaDark ? "bg-[#030712] text-white border-t border-slate-800/80" : "bg-accent text-black"}`}>
                <div className="container mx-auto px-6">
                    <h2 className={`text-4xl font-display font-bold mb-6 ${isCtaDark ? "text-white" : ""}`}>
                        {data.ctaTitle || "Ready to get started?"}
                    </h2>
                    <p className={`text-xl mb-8 max-w-2xl mx-auto font-medium ${isCtaDark ? "text-slate-400" : ""}`}>
                        {data.ctaText || "Contact us today to learn more."}
                    </p>
                    <Link
                        to="/contact"
                        className={`inline-flex items-center px-8 py-4 rounded-full font-bold transition-colors border ${
                            isCtaDark 
                                ? "bg-blue-600 text-white hover:bg-blue-700 border-blue-600" 
                                : "bg-primary text-white hover:bg-background hover:text-primary border-primary/20"
                        }`}
                    >
                        {data.ctaButtonText || "Contact Us"} <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default BusinessTemplate;
