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

    return (
        <div className="bg-background min-h-screen text-primary selection:bg-accent selection:text-primary pt-20">
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
            {(data.introTitle || data.introText) && (
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
                                    <OptimizedImage src={data.introMedia} alt="Intro" className="w-full h-full object-cover opacity-90" />
                                ) : (
                                    <LazyVideo eager={true} src={data.introMedia} className="w-full h-full object-cover opacity-80" />
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
                <section className="py-24 bg-surface relative">
                    <div className="container mx-auto px-6">
                        {data.portfolioTitle && (
                            <h2 className="text-4xl font-display font-medium mb-16 text-center">
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
                                    className="bg-background border border-border p-8 rounded-2xl shadow-sm hover:shadow-lg hover:border-accent/40 transition-all duration-300 flex flex-col"
                                >
                                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                    {item.desc && <p className="text-sm text-secondary mb-6">{item.desc}</p>}
                                    {item.features && (
                                        <ul className="space-y-3 mt-auto">
                                            {item.features.map((feature, fIdx) => (
                                                <li key={fIdx} className="text-sm text-secondary flex items-start">
                                                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 mr-2 flex-shrink-0" />
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
            {((data.impactItems && data.impactItems.length > 0) || data.impactTitle || data.testimonialQuote) && (
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
            )}

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
                        {data.ctaTitle || "Ready to get started?"}
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto font-medium">
                        {data.ctaText || "Contact us today to learn more."}
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-background hover:text-primary transition-colors border border-primary/20"
                    >
                        {data.ctaButtonText || "Contact Us"} <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default BusinessTemplate;
