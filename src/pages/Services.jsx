import { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { Globe } from 'lucide-react';
import SEO from '../components/SEO';
import { client } from '../lib/sanity';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { iconComponentMap } from '../sanity/schemas/icons';

const FALLBACK_SERVICES = [
    {
        icon: "globe",
        title: "Web Development",
        description: "Responsive, accessible, and high-performance websites. We build digital experiences that represent your brand with precision."
    },
    {
        icon: "layers",
        title: "Full Stack Development",
        description: "End-to-end application development using modern stacks (MERN, PERN, Python). We handle everything from the database to the UI."
    },
    {
        icon: "cpu",
        title: "AI & Automation",
        description: "Leverage the power of Artificial Intelligence to automate workflows, analyze data, and build smart applications."
    },
    {
        icon: "code",
        title: "SaaS Development",
        description: "We help startups and enterprises build scalable Software as a Service products with multi-tenancy and subscription billing."
    },
    {
        icon: "database",
        title: "API Development",
        description: "Robust, secure, and documented REST and GraphQL APIs to power your mobile and web applications."
    },
    {
        icon: "cloud",
        title: "Cloud Solutions",
        description: "Cloud-native architectures on AWS, Azure, or GCP. We ensure your infrastructure is scalable, secure, and cost-effective."
    },
    {
        icon: "smartphone",
        title: "Mobile App Development",
        description: "Cross-platform mobile applications using React Native, delivering native performance with a single codebase."
    },
    {
        icon: "shieldCheck",
        title: "Cybersecurity & DevOps",
        description: "Implementing DevSecOps pipelines and security best practices to protect your intellectual property and user data."
    }
];

const Services = () => {
    useScrollToTop(); // Force scroll to top on mount
    const [sanityData, setSanityData] = useState(null);

    useEffect(() => {
        const query = `*[_type == "servicesPage"][0]{
            seo {
                metaTitle,
                metaDescription,
                keywords
            },
            hero {
                title,
                subtitle
            },
            services[]
        }`;

        client.fetch(query)
            .then((data) => {
                if (data) {
                    console.log('✅ Services page data loaded from Sanity');
                    console.log('   - Services:', data.services?.length || 0);
                    setSanityData(data);
                } else {
                    console.warn('⚠️ No services page data from Sanity - using fallbacks');
                }
            })
            .catch((error) => {
                console.error('❌ Error fetching services data from Sanity:', error.message || error);
            });
    }, []);

    // Services List
    const seoTitle = sanityData?.seo?.metaTitle || 'Web Development, Cloud & AI Services | CopterCode';
    const seoDesc = sanityData?.seo?.metaDescription || 'Comprehensive software solutions: web development, full-stack applications, AI automation, SaaS platforms, cloud infrastructure, mobile apps, and enterprise cybersecurity services.';
    const heroTitle = sanityData?.hero?.title || 'Our Services';
    const heroSubtitle = sanityData?.hero?.subtitle || 'Comprehensive software solutions tailored to your business needs.';
    const servicesList = sanityData?.services?.length > 0 ? sanityData.services : FALLBACK_SERVICES;

    return (
        <div className="bg-background min-h-screen">
            <SEO 
                title={seoTitle} 
                description={seoDesc} 
                keywords={sanityData?.seo?.keywords || "web development, full-stack development, AI automation, SaaS, cloud solutions, cybersecurity, API development, mobile apps"} 
            />
            <PageHeader
                title={heroTitle}
                subtitle={heroSubtitle}
            />

            <section className="py-24">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesList.map((service, index) => {
                        const IconComponent = iconComponentMap[service.icon?.toLowerCase()] || Globe;
                        return (
                            <div key={index} className="bg-slate-950 p-10 border border-slate-800 rounded-2xl hover:border-slate-700 hover:shadow-blue-950/20 hover:shadow-2xl transition-all duration-300 group flex flex-col">
                                <div className="mb-8 w-14 h-14 bg-slate-900 border border-slate-800/80 rounded-xl flex items-center justify-center text-blue-400 group-hover:scale-105 transition-all duration-300 shadow-inner">
                                    <IconComponent size={28} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors leading-tight">{service.title}</h3>
                                <p className="text-slate-400 leading-relaxed flex-grow">{service.description}</p>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default Services;
