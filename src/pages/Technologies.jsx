import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

const fallbackTechStack = [
    {
        category: "Frontend",
        items: ["React", "Next.js", "Vue.js", "Tailwind CSS", "TypeScript", "Redux"]
    },
    {
        category: "Backend",
        items: ["Node.js", "Python", "Go", "Java", "Express", "Django"]
    },
    {
        category: "Database",
        items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "DynamoDB"]
    },
    {
        category: "Cloud & DevOps",
        items: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform", "CI/CD"]
    },
    {
        category: "AI & ML",
        items: ["Python", "TensorFlow", "PyTorch", "OpenCV", "LangChain", "OpenAI API"]
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

    const seoTitle = sanityData?.seo?.metaTitle || "Technologies";
    const seoDesc = sanityData?.seo?.metaDescription || "Our tech stack includes React, Node.js, AI, and Cloud.";
    const heroTitle = sanityData?.heroTitle || "Technologies";
    const heroSubtitle = sanityData?.heroSubtitle || "We use the latest tools and frameworks to build future-proof software.";
    const activeTechStack = (sanityData?.techStack?.length > 0) ? sanityData.techStack : fallbackTechStack;

    return (
        <div className="bg-background min-h-screen">
            <SEO title={seoTitle} description={seoDesc} />
            <PageHeader
                title={heroTitle}
                subtitle={heroSubtitle}
            />

            <section className="py-24">
                <div className="container mx-auto px-6 space-y-16">
                    {activeTechStack.map((group, index) => (
                        <div key={index} className="bg-surface border border-border/50 p-10 rounded-2xl shadow-sm">
                            <h2 className="text-2xl font-display font-bold text-primary mb-8 border-b border-border pb-4 inline-block pr-10">
                                {group.category}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                                {group.items.map((item, i) => (
                                    <div key={i} className="flex items-center justify-center p-4 bg-background/50 border border-border text-secondary font-semibold hover:text-accent hover:border-accent/30 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Technologies;
