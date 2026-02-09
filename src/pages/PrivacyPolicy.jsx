import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { Lock, Eye, Server, Shield, Database, Cookie, UserCheck } from 'lucide-react';

const PrivacyPolicy = () => {
    const [activeSection, setActiveSection] = useState('data-collection');
    const [sanityData, setSanityData] = useState(null);

    useEffect(() => {
        const query = `*[_type == "privacyPolicyPage"][0]`;
        client.fetch(query).then((data) => {
            if (data) {
                setSanityData(data);
            }
        }).catch(console.error);
    }, []);

    // Scroll spy
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section[id]');
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            if (current) setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    };

    const sectionsNav = [
        { id: 'data-collection', title: 'Data We Collect' },
        { id: 'usage', title: 'How We Use It' },
        { id: 'third-party', title: 'Third-Party Services' },
        { id: 'security', title: 'Data Security & Retention' },
        { id: 'rights', title: 'Your Rights' },
        { id: 'cookies', title: 'Cookies Policy' },
        { id: 'contact', title: 'Contact Privacy Team' }
    ];

    const seoTitle = sanityData?.seo?.metaTitle || "Privacy Policy";
    const seoDesc = sanityData?.seo?.metaDescription || "Privacy Policy for CopterCode.";
    const heroTitle = sanityData?.hero?.title || "Privacy Policy";
    const heroSubtitle = sanityData?.hero?.subtitle || "We value your trust and are committed to protecting your personal data.";
    const effectiveDate = sanityData?.dates?.effectiveDate || "07/11/2025";
    const lastUpdated = sanityData?.dates?.lastUpdated || "07/11/2025";

    return (
        <div className="bg-background min-h-screen">
            <SEO title={seoTitle} description={seoDesc} />
            <PageHeader
                title={heroTitle}
                subtitle={heroSubtitle}
            />

            <div className="container mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Sidebar */}
                    <div className="lg:w-1/4">
                        <div className="sticky top-24 bg-surface-highlight/50 p-6 rounded-xl border border-border backdrop-blur-sm shadow-sm">
                            <h3 className="text-accent font-bold mb-6 flex items-center">
                                <Lock className="mr-2" size={18} /> Privacy Guidelines
                            </h3>
                            <nav className="space-y-1">
                                {sectionsNav.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollTo(item.id)}
                                        className={`w-full text-left px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 border-l-2 ${activeSection === item.id
                                            ? 'bg-primary/5 border-accent text-primary pl-6'
                                            : 'border-transparent text-secondary hover:text-primary hover:bg-primary/5'
                                            }`}
                                    >
                                        {item.title}
                                    </button>
                                ))}
                            </nav>
                            <div className="mt-8 pt-6 border-t border-border text-xs text-secondary">
                                <p><strong>Effective Date:</strong> {effectiveDate}</p>
                                <p><strong>Last Updated:</strong> {lastUpdated}</p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:w-3/4 space-y-16">

                        <section id="data-collection" className="scroll-mt-32">
                            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
                                <Database className="text-accent mr-3" /> {sanityData?.dataCollection?.heading || "Information We Collect"}
                            </h2>
                            <p className="text-secondary mb-6">{sanityData?.dataCollection?.description || "We collect personal data necessary to provide our services and improve your experience. This includes:"}</p>
                            <div className="grid md:grid-cols-2 gap-4">
                                {(sanityData?.dataCollection?.cards || [
                                    { title: 'Personal Identity', content: 'Full name, Email address, Phone number, College/School name.' },
                                    { title: 'Transaction Data', content: 'Course details, Payment & billing info (processed securely).' },
                                    { title: 'Technical Data', content: 'IP address, browser type, and device identifiers.' }
                                ]).map((card, idx) => (
                                    <div key={idx} className="bg-surface p-6 rounded-xl border border-border shadow-sm">
                                        <h4 className="text-primary font-bold mb-2">{card.title}</h4>
                                        <p className="text-sm text-secondary font-medium">{card.content}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section id="usage" className="scroll-mt-32">
                            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
                                <Eye className="text-accent mr-3" /> {sanityData?.usage?.heading || "How We Use Your Information"}
                            </h2>
                            <ul className="space-y-4">
                                {(sanityData?.usage?.points || [
                                    "Processing registrations and facilitating payments",
                                    "Issuing certificates and providing student support",
                                    "Sending important updates, newsletters, and course materials",
                                    "Optimizing website performance and user experience",
                                    "Managing analytics to improve our service offerings"
                                ]).map((item, i) => (
                                    <li key={i} className="flex items-start text-secondary font-medium">
                                        <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2.5 mr-3 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section id="third-party" className="scroll-mt-32">
                            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
                                <Server className="text-accent mr-3" /> {sanityData?.thirdParty?.heading || "Third-Party Services"}
                            </h2>
                            <p className="text-secondary mb-6">{sanityData?.thirdParty?.description || "We partner with trusted third-party providers to deliver our services. We may share limited data with:"}</p>
                            <div className="flex flex-wrap gap-3">
                                {(sanityData?.thirdParty?.services || ['Google Analytics', 'Razorpay', 'Paytm', 'AWS', 'Google Cloud', 'Zoho Mail', 'Mailchimp']).map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-surface-highlight border border-border rounded-full text-sm font-semibold text-primary">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <p className="text-secondary text-sm mt-4 italic">{sanityData?.thirdParty?.footerNote || "*Each partner operates under their own privacy policy."}</p>
                        </section>

                        <section id="security" className="scroll-mt-32">
                            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
                                <Shield className="text-accent mr-3" /> {sanityData?.security?.heading || "Data Security & Retention"}
                            </h2>
                            <div className="bg-surface-highlight p-8 rounded-2xl border border-border shadow-sm">
                                <div className="grid md:grid-cols-3 gap-6 text-center">
                                    {(sanityData?.security?.stats || [
                                        { label: 'Encrypted', description: 'SSL/HTTPS Standard' },
                                        { label: 'Protected', description: 'Secure Storage' },
                                        { label: 'Limited', description: 'Retention Period' }
                                    ]).map((stat, idx) => (
                                        <div key={idx}>
                                            <h4 className="text-accent font-bold text-xl mb-1">{stat.label}</h4>
                                            <p className="text-xs text-secondary font-bold uppercase tracking-wider">{stat.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section id="rights" className="scroll-mt-32">
                            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
                                <UserCheck className="text-accent mr-3" /> {sanityData?.rights?.heading || "Your Rights"}
                            </h2>
                            <p className="text-secondary mb-4 font-medium">{sanityData?.rights?.description || "You have full control over your personal data. You have the right to:"}</p>
                            <ul className="list-disc pl-5 space-y-2 text-secondary font-medium mb-6">
                                {(sanityData?.rights?.points || [
                                    "Access, correct, or update your personal information.",
                                    "Request deletion of your data from our systems.",
                                    "Opt-out of marketing communications at any time."
                                ]).map((point, idx) => (
                                    <li key={idx}>{point}</li>
                                ))}
                            </ul>
                            <div className="p-4 bg-accent/10 border-l-4 border-accent rounded-r-lg">
                                <p className="text-sm text-primary font-semibold">
                                    {sanityData?.rights?.contactNote?.split(sanityData?.rights?.contactEmail || 'hr@coptercode.co.in')[0]}
                                    <a href={`mailto:${sanityData?.rights?.contactEmail || 'hr@coptercode.co.in'}`} className="font-bold underline text-accent">
                                        {sanityData?.rights?.contactEmail || 'hr@coptercode.co.in'}
                                    </a>
                                    {sanityData?.rights?.contactNote?.split(sanityData?.rights?.contactEmail || 'hr@coptercode.co.in')[1]}
                                </p>
                            </div>
                        </section>

                        <section id="cookies" className="scroll-mt-32">
                            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
                                <Cookie className="text-accent mr-3" /> {sanityData?.cookies?.heading || "Cookies Policy"}
                            </h2>
                            <p className="text-secondary font-medium leading-relaxed">{sanityData?.cookies?.content || "We use cookies to improve performance, analyze usage patterns, and manage sessions. You can choose to disable cookies through your browser settings, though this may affect some website functionality."}</p>
                        </section>

                        <section id="contact" className="scroll-mt-32">
                            <h2 className="text-2xl font-bold text-primary mb-6">{sanityData?.contact?.heading || "Contact Us"}</h2>
                            <div className="bg-surface-highlight p-10 rounded-3xl border border-border shadow-md">
                                <h3 className="font-bold text-2xl mb-4 text-primary">{sanityData?.contact?.boxTitle || "Privacy Concerns?"}</h3>
                                <p className="mb-8 text-secondary font-medium">{sanityData?.contact?.boxDescription || "If you have any questions about this policy or our data practices, please reach out."}</p>
                                <div className="flex flex-col space-y-3 font-semibold text-primary">
                                    <span className="text-xl">{sanityData?.contact?.companyName || "CopterCode Industries Limited"}</span>
                                    <a href={`mailto:${sanityData?.contact?.email || 'hr@coptercode.co.in'}`} className="text-accent hover:underline flex items-center">
                                        {sanityData?.contact?.email || 'hr@coptercode.co.in'}
                                    </a>
                                    <span className="flex items-center">{sanityData?.contact?.phone || "+91 80721 93600"}</span>
                                    <span className="text-sm text-secondary mt-2 opacity-80">{sanityData?.contact?.address || "Chennai, Tamil Nadu – 600056"}</span>
                                </div>
                            </div>
                            <p className="mt-8 text-xs text-secondary opacity-60 font-medium">
                                {sanityData?.contact?.footerText || "This policy is governed by Indian law, including the IT Act, 2000 and the DPDP Act, 2023."}
                            </p>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
