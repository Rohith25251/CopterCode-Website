import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import {
    Code2, Database, Globe, Server, Cloud, Cpu, Layers, Terminal, Smartphone
} from 'lucide-react';

// Fallback Data
const fallbackTechStack = [
    {
        category: "Frontend Experience",
        icon: Globe,
        description: "Crafting responsive, high-performance user interfaces.",
        items: ["React", "Next.js", "Vue.js", "Tailwind CSS", "TypeScript", "Redux", "Framer Motion", "Three.js"]
    },
    {
        category: "Backend Architecture",
        icon: Server,
        description: "Building robust, scalable server-side solutions.",
        items: ["Node.js", "Python", "Go", "Java", "Express", "Django", "FastAPI", "GraphQL"]
    },
    {
        category: "Database Solutions",
        icon: Database,
        description: "Secure and efficient data management systems.",
        items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "DynamoDB", "Firebase", "Supabase"]
    },
    {
        category: "Cloud & DevOps",
        icon: Cloud,
        description: "Automated deployment and scalable infrastructure.",
        items: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform", "CI/CD", "Vercel"]
    },
    {
        category: "AI & Machine Learning",
        icon: Cpu,
        description: "Intelligent algorithms driving automation and insights.",
        items: ["Python", "TensorFlow", "PyTorch", "OpenCV", "LangChain", "OpenAI API", "Hugging Face", "Keras"]
    },
    {
        category: "Mobile & Embedded",
        icon: Smartphone,
        description: "Cross-platform apps and hardware integration.",
        items: ["React Native", "Flutter", "Arduino", "Raspberry Pi", "ROS", "PX4"]
    }
];

const Technologies = () => {
    const [sanityData, setSanityData] = useState(null);

    useEffect(() => {
        const query = `*[_type == "technologiesPage"][0]`;
        client.fetch(query).then((data) => {
            if (data) {
                setSanityData({
                    seo: data.seo,
                    heroTitle: data.hero?.title,
                    heroSubtitle: data.hero?.subtitle,
                    techStack: data.techStack
                });
            }
        }).catch(console.error);
    }, []);

    const seoTitle = sanityData?.seo?.metaTitle || "Technologies & Stack";
    const seoDesc = sanityData?.seo?.metaDescription || "Our tech stack includes React, Node.js, AI, and Cloud.";
    const heroTitle = sanityData?.heroTitle || "Technologies";
    const heroSubtitle = sanityData?.heroSubtitle || "Leveraging cutting-edge tools and frameworks to build future-proof, scalable software solutions.";
    const activeTechStack = (sanityData?.techStack?.length > 0) ? sanityData.techStack : fallbackTechStack;

    const iconMap = {
        globe: Globe,
        server: Server,
        database: Database,
        cloud: Cloud,
        cpu: Cpu,
        smartphone: Smartphone,
        layers: Layers
    };

    return (
        <div className="bg-background min-h-screen">
            <SEO title={seoTitle} description={seoDesc} />
            <PageHeader
                title={heroTitle}
                subtitle={heroSubtitle}
            />

            <section className="py-24 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -z-10" />

                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 gap-12">
                        {activeTechStack.map((group, index) => {
                            // Handle both Sanity string icons and Fallback component icons
                            let IconComponent = Layers;
                            if (typeof group.icon === 'string') {
                                IconComponent = iconMap[group.icon.toLowerCase()] || Layers;
                            } else if (group.icon) {
                                IconComponent = group.icon;
                            }

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="bg-surface border border-border rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group"
                                >
                                    <div className="p-8 md:p-12 border-b border-border bg-gradient-to-r from-surface to-background relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-12 opacity-5 transform group-hover:scale-110 transition-transform duration-700">
                                            <IconComponent size={200} />
                                        </div>

                                        <div className="relative z-10 flex items-start gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg group-hover:bg-accent transition-colors duration-300">
                                                <IconComponent size={32} />
                                            </div>
                                            <div>
                                                <h2 className="text-3xl font-display font-bold text-primary mb-2">
                                                    {group.category}
                                                </h2>
                                                <p className="text-secondary text-lg max-w-2xl">
                                                    {group.description || "Advanced solutions for modern challenges."}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 md:p-12 bg-white/50 backdrop-blur-sm">
                                        <div className="flex flex-wrap gap-4">
                                            {group.items.map((item, i) => (
                                                <motion.div
                                                    key={i}
                                                    whileHover={{ scale: 1.05, y: -2 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="px-6 py-3 bg-white border border-border rounded-xl font-semibold text-primary shadow-sm hover:shadow-md hover:border-accent hover:text-accent transition-all duration-300 cursor-default flex items-center gap-2"
                                                >
                                                    <div className="w-2 h-2 rounded-full bg-accent/50" />
                                                    {item}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Technologies;
