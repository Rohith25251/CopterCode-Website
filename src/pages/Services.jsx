import { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { Layers, Globe, Cpu, Database, Cloud, Code2, ShieldCheck, Smartphone } from 'lucide-react';
import SEO from '../components/SEO';
import { client } from '../lib/sanity';
import { useScrollToTop } from '../hooks/useScrollToTop';

const ICON_MAP = {
    Globe, Layers, Cpu, Database, Cloud, Code2, ShieldCheck, Smartphone
};

const FALLBACK_SERVICES = [
    {
        icon: "Globe",
        title: "Web Development",
        description: "Responsive, accessible, and high-performance websites. We build digital experiences that represent your brand with precision."
    },
    {
        icon: "Layers",
        title: "Full Stack Development",
        description: "End-to-end application development using modern stacks (MERN, PERN, Python). We handle everything from the database to the UI."
    },
    {
        icon: "Cpu",
        title: "AI & Automation",
        description: "Leverage the power of Artificial Intelligence to automate workflows, analyze data, and build smart applications."
    },
    {
        icon: "Code2",
        title: "SaaS Development",
        description: "We help startups and enterprises build scalable Software as a Service products with multi-tenancy and subscription billing."
    },
    {
        icon: "Database",
        title: "API Development",
        description: "Robust, secure, and documented REST and GraphQL APIs to power your mobile and web applications."
    },
    {
        icon: "Cloud",
        title: "Cloud Solutions",
        description: "Cloud-native architectures on AWS, Azure, or GCP. We ensure your infrastructure is scalable, secure, and cost-effective."
    },
    {
        icon: "Smartphone",
        title: "Mobile App Development",
        description: "Cross-platform mobile applications using React Native, delivering native performance with a single codebase."
    },
    {
        icon: "ShieldCheck",
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
                metaDescription
            },
            hero {
                title,
                subtitle
            },
            services[]
        }`;

        client.fetch(query)
            .then((data) => {
                if (data) setSanityData(data);
            })
            .catch((error) => {
                console.error('Error fetching services data from Sanity:', error);
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
            <SEO title={seoTitle} description={seoDesc} keywords="web development, full-stack development, AI automation, SaaS, cloud solutions, cybersecurity, API development, mobile apps" />
            <PageHeader
                title={heroTitle}
                subtitle={heroSubtitle}
            />

            <section className="py-24">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesList.map((service, index) => {
                        const IconComponent = ICON_MAP[service.icon] || Globe;
                        return (
                            <div key={index} className="bg-surface p-10 border border-border hover:border-accent/50 transition-all duration-300 group">
                                <div className="mb-6 text-accent group-hover:scale-110 transition-transform duration-300 origin-left">
                                    <IconComponent size={40} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-primary mb-4">{service.title}</h3>
                                <p className="text-secondary leading-relaxed">{service.description}</p>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default Services;
