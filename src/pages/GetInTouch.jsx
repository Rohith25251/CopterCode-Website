import SEO from '../components/SEO';
import { Mail, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from "react";
import { client } from "../lib/sanity";
import BackButton from '../components/ui/BackButton';

const GetInTouch = () => {
    const [sanityData, setSanityData] = useState(null);

    useEffect(() => {
        const query = `*[_type == "getInTouchPage"][0] {
            ...,
            hero {
                ...,
                image { asset->{ url } }
            }
        }`;
        client.fetch(query).then((data) => {
            if (data) {
                setSanityData({
                    seo: data.seo,
                    heroTitle: data.hero?.title,
                    heroSubtitle: data.hero?.subtitle,
                    heroImage: data.hero?.image?.asset?.url,
                    whatsappTitle: data.whatsapp?.title,
                    whatsappText: data.whatsapp?.text,
                    whatsappLink: data.whatsapp?.link,
                    emailTitle: data.email?.title,
                    emailText: data.email?.text,
                    emailLink: data.email?.link,
                    footerText: data.footerText,
                });
            }
        }).catch(console.error);
    }, []);

    const seoTitle = sanityData?.seo?.metaTitle || "Get In Touch";
    const seoDesc = sanityData?.seo?.metaDescription || "Connect with CopterCode instantly via WhatsApp or Email.";

    const heroTitle = sanityData?.heroTitle || "Get In Touch";
    const heroSubtitle = sanityData?.heroSubtitle || "We are just a click away. Connect with us instantly.";
    const heroImage = sanityData?.heroImage || "/mediafiles/news and media/IMG_3327.jpg";

    const whatsappLink = sanityData?.whatsappLink || "https://wa.me/918072193600";
    const whatsappTitle = sanityData?.whatsappTitle || "WhatsApp";
    const whatsappText = sanityData?.whatsappText || "Chat with our team instantly for quick queries and support.";

    const emailLink = sanityData?.emailLink || "mailto:coptercode@gmail.com";
    const emailTitle = sanityData?.emailTitle || "Email Us";
    const emailText = sanityData?.emailText || "Send us a detailed message and we'll get back to you shortly.";

    const footerText = sanityData?.footerText || "Prefer a detailed inquiry? Fill out our contact form.";

    return (
        <div className="bg-background min-h-screen text-primary selection:bg-accent selection:text-white overflow-hidden relative">
            <SEO title={seoTitle} description={seoDesc} />
            
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
                                Instant Connect
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
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* WhatsApp Section */}
                        <motion.a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-10 rounded-3xl shadow-xl flex flex-col items-center text-center group hover:scale-[1.02] transition-transform duration-300 border border-green-100 ring-1 ring-green-500/10"
                        >
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-100 transition-colors">
                                <MessageSquare size={40} className="text-green-600 fill-current" />
                            </div>
                            <h3 className="text-2xl font-bold text-primary mb-2">{whatsappTitle}</h3>
                            <p className="text-secondary-foreground font-medium text-lg mb-8 leading-relaxed max-w-xs">
                                {whatsappText}
                            </p>
                            <span className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-full font-bold text-base tracking-wide uppercase hover:bg-green-700 transition-colors shadow-lg hover:shadow-green-500/30">
                                Chat Now <ArrowRight size={18} className="ml-2" />
                            </span>
                        </motion.a>

                        {/* Email Section */}
                        <motion.a
                            href={emailLink}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-12 rounded-[2rem] shadow-xl flex flex-col items-center text-center group hover:scale-[1.02] transition-transform duration-300 border border-blue-200 ring-1 ring-blue-500/20"
                        >
                            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-8 group-hover:bg-blue-100 transition-colors shadow-inner">
                                <Mail size={48} className="text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-primary mb-2">{emailTitle}</h3>
                            <p className="text-secondary-foreground font-medium text-lg mb-8 leading-relaxed max-w-xs">
                                {emailText}
                            </p>
                            <span className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-base tracking-wide uppercase hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/30">
                                Send Email <ArrowRight size={18} className="ml-2" />
                            </span>
                        </motion.a>
                    </div>

                    <div className="mt-20 text-center">
                        <p className="text-primary font-medium text-xl">
                            {footerText} <a href="/contact" className="text-accent hover:text-accent-dark underline font-bold transition-colors ml-1">Click here</a>.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GetInTouch;
