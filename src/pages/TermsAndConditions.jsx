import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { ShieldCheck, FileText, Mail, Phone, AlertCircle } from 'lucide-react';

const TermsAndConditions = () => {
    const [activeSection, setActiveSection] = useState('company-info');
    const [sanityData, setSanityData] = useState(null);

    useEffect(() => {
        const query = `*[_type == "termsAndConditionsPage"][0]`;
        client.fetch(query).then((data) => {
            if (data) {
                setSanityData(data);
            }
        }).catch(console.error);
    }, []);

    // Scroll spy for active section
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
        { id: 'company-info', title: 'Company Information' },
        { id: 'services', title: 'Services Provided' },
        { id: 'responsibilities', title: 'User Responsibilities' },
        { id: 'intellectual-property', title: 'Intellectual Property' },
        { id: 'internship', title: 'Internship Policy' },
        { id: 'payments', title: 'Payment & Refunds' },
        { id: 'liability', title: 'Liability & Disclaimer' },
        { id: 'privacy', title: 'Data & Privacy' }
    ];

    const seoTitle = sanityData?.seo?.metaTitle || "Terms and Conditions";
    const seoDesc = sanityData?.seo?.metaDescription || "Terms and Conditions for CopterCode.";
    const heroTitle = sanityData?.hero?.title || "Terms & Conditions";
    const heroSubtitle = sanityData?.hero?.subtitle || "Please read these terms carefully before using our services.";
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

                    {/* Sidebar Navigation */}
                    <div className="lg:w-1/4">
                        <div className="sticky top-24 bg-surface-highlight/50 p-6 rounded-xl border border-border backdrop-blur-sm shadow-sm">
                            <h3 className="text-accent font-bold mb-6 flex items-center">
                                <FileText className="mr-2" size={18} /> Table of Contents
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

                    {/* Main Content */}
                    <div className="lg:w-3/4 space-y-16">

                        <section id="company-info" className="scroll-mt-32">
                            <div className="bg-surface-highlight p-10 rounded-3xl border border-border shadow-md">
                                <h2 className="text-2xl font-display font-bold text-primary mb-8 flex items-center">
                                    <ShieldCheck className="text-accent mr-3" /> {sanityData?.companyInfo?.heading || "Company Information"}
                                </h2>
                                <div className="grid md:grid-cols-2 gap-10 text-secondary font-medium">
                                    <div>
                                        <h4 className="text-primary font-bold mb-3">Legal Entity</h4>
                                        <p className="text-lg">{sanityData?.companyInfo?.legalEntity || "CopterCode Industries Limited"}</p>
                                        <p className="mt-8 text-xs text-accent font-bold uppercase tracking-widest mb-2">Registered Address</p>
                                        <p className="leading-relaxed">{sanityData?.companyInfo?.registeredAddress || "No: 22, 2nd Cross Street,\nKirupananda Variar Nagar,\nMangadu, Chennai - 600056"}</p>
                                    </div>
                                    <div className="space-y-6 flex flex-col justify-center">
                                        <div className="flex items-center p-4 bg-background border border-border rounded-xl">
                                            <Mail className="text-accent mr-4" size={20} />
                                            <a href={`mailto:${sanityData?.companyInfo?.email || "hr@coptercode.co.in"}`} className="hover:text-accent transition-colors">
                                                {sanityData?.companyInfo?.email || "hr@coptercode.co.in"}
                                            </a>
                                        </div>
                                        <div className="flex items-center p-4 bg-background border border-border rounded-xl">
                                            <Phone className="text-accent mr-4" size={20} />
                                            <a href={`tel:${sanityData?.companyInfo?.phone || "+918072193600"}`} className="hover:text-accent transition-colors">
                                                {sanityData?.companyInfo?.phone || "+91 80721 93600"}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="services" className="scroll-mt-32">
                            <h2 className="text-2xl font-bold text-primary mb-6">{sanityData?.services?.heading || "Services Provided"}</h2>
                            <p className="text-secondary mb-8 font-medium leading-relaxed">{sanityData?.services?.description || "CopterCode offers a comprehensive range of technology and educational services. All services are subject to continuous improvement."}</p>
                            <ul className="grid md:grid-cols-2 gap-4">
                                {(sanityData?.services?.servicesList || ['Industrial Drone Sales & Services', 'ERP Software Solutions', 'Cybersecurity & Ethical Hacking', 'Embedded Systems & IoT', 'Cloud Architecture', 'Student Internships']).map((s, i) => (
                                    <li key={i} className="bg-surface px-6 py-4 rounded-xl border border-border text-sm font-bold text-primary flex items-center shadow-sm">
                                        <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 shrink-0" /> {s}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section id="responsibilities" className="scroll-mt-32">
                            <h2 className="text-2xl font-bold text-primary mb-6">{sanityData?.responsibilities?.heading || "User Responsibilities"}</h2>
                            <div className="bg-surface-highlight p-8 rounded-2xl border border-border shadow-sm">
                                <ul className="space-y-5 text-secondary font-medium">
                                    {(sanityData?.responsibilities?.points || [
                                        'Ensure all provided information is accurate and up-to-date.',
                                        'Do not use our services for unlawful, fraudulent, or harmful purposes.',
                                        'Protect the confidentiality of your credentials.'
                                    ]).map((point, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <AlertCircle className="mr-3 text-accent shrink-0 mt-1" size={18} />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        <section id="intellectual-property" className="scroll-mt-32">
                            <h2 className="text-2xl font-bold text-primary mb-6">{sanityData?.intellectualProperty?.heading || "Intellectual Property Rights"}</h2>
                            <p className="text-secondary leading-relaxed font-medium text-lg">
                                {sanityData?.intellectualProperty?.content || "All content on this website—including text, logos, graphics, videos, and software—is the exclusive property of CopterCode or its licensors. Unauthorized reproduction, modification, or commercial exploitation is strictly prohibited without written permission."}
                            </p>
                        </section>

                        <section id="internship" className="scroll-mt-32">
                            <h2 className="text-2xl font-bold text-primary mb-6">{sanityData?.internshipPolicy?.heading || "Internship & Training Policy"}</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {(sanityData?.internshipPolicy?.cards || [
                                    { title: 'Certification', content: 'Certificates are issued only upon successful completion. Attendance and project submission are mandatory.' },
                                    { title: 'Slot Availability', content: 'Seats are subject to confirmation. CopterCode reserves the right to modify schedules or mentors.' }
                                ]).map((card, idx) => (
                                    <div key={idx} className="bg-surface-highlight p-8 rounded-2xl border border-border shadow-sm">
                                        <h4 className="text-accent font-bold mb-3 text-xl">{card.title}</h4>
                                        <p className="text-secondary font-medium leading-relaxed">{card.content}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section id="payments" className="scroll-mt-32">
                            <h2 className="text-2xl font-bold text-primary mb-6">{sanityData?.payments?.heading || "Payments & Refunds"}</h2>
                            <div className="space-y-8 text-secondary font-medium">
                                <div className="p-8 bg-surface-highlight rounded-2xl border border-border">
                                    <h4 className="text-primary font-bold mb-3 text-xl">{sanityData?.payments?.paymentTermsHeading || "Payment Terms"}</h4>
                                    <p className="leading-relaxed">{sanityData?.payments?.paymentTermsContent || "Processed via authorized gateways (Razorpay, Paytm). By transacting, you authorize CopterCode to process payment using your provided details."}</p>
                                </div>
                                <div className="p-8 bg-surface-highlight rounded-2xl border border-border">
                                    <h4 className="text-primary font-bold mb-4 text-xl">{sanityData?.payments?.refundPolicyHeading || "Refund Policy"}</h4>
                                    <ul className="list-disc pl-5 space-y-3">
                                        {(sanityData?.payments?.refundPoints || [
                                            'No refunds unless approved by management.',
                                            'Requests must be raised within 24 hours of payment.',
                                            'If CopterCode cancels a service, a full refund triggers within 7-10 business days.'
                                        ]).map((point, idx) => (
                                            <li key={idx} className="leading-relaxed">{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section id="liability" className="scroll-mt-32">
                            <div className="border-l-4 border-accent bg-accent/5 p-8 rounded-r-2xl shadow-sm mb-8">
                                <h3 className="text-xl font-bold text-primary mb-3">{sanityData?.liability?.liabilityHeading || "Limitation of Liability"}</h3>
                                <p className="text-secondary font-medium text-lg leading-relaxed">{sanityData?.liability?.liabilityContent || "CopterCode is not liable for indirect, incidental, or consequential damages arising from service interruptions, data loss, or third-party links."}</p>
                            </div>
                            <div className="p-8 bg-surface-highlight rounded-2xl border border-border">
                                <h3 className="text-xl font-bold text-primary mb-3">{sanityData?.liability?.governingLawHeading || "Governing Law"}</h3>
                                <p className="text-secondary font-medium leading-relaxed">{sanityData?.liability?.governingLawContent || "These terms are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of the courts of Chennai, Tamil Nadu."}</p>
                            </div>
                        </section>

                        <section id="privacy" className="scroll-mt-32">
                            <div className="bg-accent p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10 shadow-xl">
                                <div className="flex-grow">
                                    <h2 className="text-2xl font-bold text-white mb-3">{sanityData?.dataProtection?.heading || "Data Protection"}</h2>
                                    <p className="text-white/90 text-sm max-w-lg font-medium leading-relaxed">
                                        {sanityData?.dataProtection?.description || "We handle your data with care. Read our full policy to understand your rights regarding your personal information."}
                                    </p>
                                </div>
                                <a href={sanityData?.dataProtection?.buttonLink || "/privacy"} className="px-8 py-4 bg-white text-accent rounded-full font-bold text-sm hover:scale-105 hover:bg-white/90 transition-all shadow-lg whitespace-nowrap">
                                    {sanityData?.dataProtection?.buttonText || "View Privacy Policy"}
                                </a>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
