import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';
import SEO from '../components/SEO';
import LegalLayout from '../components/LegalLayout';
import { ShieldCheck, FileText, Mail, Phone, AlertCircle, Scale, DollarSign, Lock, CheckSquare } from 'lucide-react';

const TermsAndConditions = () => {
    const [sanityData, setSanityData] = useState(null);

    useEffect(() => {
        const query = `*[_type == "termsAndConditionsPage"][0]`;
        client.fetch(query).then((data) => {
            if (data) {
                setSanityData(data);
            }
        }).catch(console.error);
    }, []);

    const effectiveDate = sanityData?.dates?.effectiveDate || "January 15, 2025";
    const lastUpdated = sanityData?.dates?.lastUpdated || "January 15, 2025";

    const sections = [
        { id: 'introduction', title: 'Introduction', icon: ShieldCheck },
        { id: 'services', title: 'Services Provided', icon: FileText },
        { id: 'user-responsibilities', title: 'User Responsibilities', icon: CheckSquare },
        { id: 'intellectual-property', title: 'Intellectual Property', icon: Lock },
        { id: 'internship-policy', title: 'Internship Policy', icon: FileText },
        { id: 'payment-refunds', title: 'Payment & Refunds', icon: DollarSign },
        { id: 'liability', title: 'Liability & Disclaimer', icon: AlertCircle },
        { id: 'governing-law', title: 'Governing Law', icon: Scale },
        { id: 'contact', title: 'Contact Information', icon: Mail }
    ];

    const seoTitle = sanityData?.seo?.metaTitle || "Terms and Conditions - CopterCode";
    const seoDesc = sanityData?.seo?.metaDescription || "Legal terms and conditions for using CopterCode services, products, and internship programs.";

    return (
        <div className="bg-gray-50 min-h-screen">
            <SEO title={seoTitle} description={seoDesc} />
            <LegalLayout
                pageTitle="Terms & Conditions"
                pageDescription="Please read these terms carefully before using our services and products."
                effectiveDate={effectiveDate}
                lastUpdated={lastUpdated}
                sections={sections}
            >
                {/* Introduction */}
                <section id="introduction" className="scroll-mt-24">
                    <div className="mb-12">
                        <p className="text-gray-700 text-lg leading-relaxed mb-6">
                            {sanityData?.introduction?.content || "These Terms & Conditions govern your use of CopterCode's website, services, products, and internship programs. By accessing or using our services, you agree to be bound by these terms. If you do not agree, please do not use our services."}
                        </p>
                        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                            <p className="text-gray-800 font-semibold text-sm">
                                <span className="text-blue-600 font-bold">Note:</span> CopterCode reserves the right to update these terms at any time. Continued use constitutes acceptance of changes.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Services Provided */}
                <section id="services" className="scroll-mt-24">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Provided</h2>
                    <p className="text-gray-700 mb-8 leading-relaxed">
                        {sanityData?.services?.description || "CopterCode offers a comprehensive range of technology and educational services designed to drive innovation and professional development."}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(sanityData?.services?.list || [
                            'Industrial Drone Sales & Services',
                            'ERP Software Solutions',
                            'Cybersecurity & Ethical Hacking',
                            'Embedded Systems & IoT',
                            'Cloud Architecture & Consulting',
                            'Student Internship Programs'
                        ]).map((service, idx) => (
                            <div key={idx} className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0" />
                                <p className="text-gray-800 font-medium">{service}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* User Responsibilities */}
                <section id="user-responsibilities" className="scroll-mt-24">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">User Responsibilities</h2>
                    <div className="space-y-4">
                        {(sanityData?.responsibilities?.points || [
                            'Provide accurate and complete information when registering or purchasing services.',
                            'Do not use our services for any unlawful, fraudulent, or harmful purposes.',
                            'Protect the confidentiality of your login credentials and account information.',
                            'Do not attempt to hack, reverse engineer, or exploit our systems or intellectual property.',
                            'Respect all copyright, trademark, and intellectual property notices.'
                        ]).map((point, idx) => (
                            <div key={idx} className="flex items-start p-4 bg-white border border-gray-200 rounded-lg">
                                <AlertCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                                <p className="text-gray-800 text-sm">{point}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Intellectual Property */}
                <section id="intellectual-property" className="scroll-mt-24">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Intellectual Property Rights</h2>
                    <div className="bg-white border border-gray-200 p-8 rounded-lg">
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            {sanityData?.ip?.content || "All content, materials, designs, logos, graphics, videos, software, and documentation available on this website and through our services are the exclusive property of CopterCode Industries Limited or our licensors."}
                        </p>
                        <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded-r-lg">
                            <p className="text-gray-800 text-sm">
                                <span className="font-bold">⚠️ Unauthorized Reproduction:</span> You may not reproduce, modify, distribute, or exploit any materials without written permission.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Internship Policy */}
                <section id="internship-policy" className="scroll-mt-24">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Internship & Training Policy</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white border border-gray-200 p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                                <CheckSquare className="w-5 h-5 text-blue-600 mr-2" />
                                Certification Requirements
                            </h3>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                {sanityData?.internship?.certification || "Certificates are issued only upon successful completion of all modules and project requirements. Attendance and mandatory project submissions are required."}
                            </p>
                        </div>
                        <div className="bg-white border border-gray-200 p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                                <AlertCircle className="w-5 h-5 text-blue-600 mr-2" />
                                Seat Availability
                            </h3>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                {sanityData?.internship?.availability || "Internship seats are subject to availability and confirmation. CopterCode reserves the right to modify schedules, mentors, or program structure as needed."}
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg">
                        <p className="text-gray-800 text-sm">
                            <span className="font-bold">✓ Placement Support:</span> CopterCode provides career guidance and internship opportunities, but placement is not guaranteed.
                        </p>
                    </div>
                </section>

                {/* Payment & Refunds */}
                <section id="payment-refunds" className="scroll-mt-24">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment & Refunds</h2>
                    <div className="space-y-6">
                        <div className="bg-white border border-gray-200 p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Terms</h3>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                {sanityData?.payment?.terms || "All payments are processed through secure, authorized payment gateways including Razorpay and Paytm. By providing payment information, you authorize CopterCode to process charges."}
                            </p>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-center">
                                    <span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full mr-2" />
                                    Payments are securely encrypted and PCI-DSS compliant.
                                </li>
                                <li className="flex items-center">
                                    <span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full mr-2" />
                                    Invoice receipts are generated and emailed upon successful payment.
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white border border-gray-200 p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Refund Policy</h3>
                            <ul className="space-y-3 text-gray-700 text-sm">
                                {(sanityData?.payment?.refundPolicy || [
                                    'No refunds unless explicitly approved by management.',
                                    'Refund requests must be raised within 24 hours of payment.',
                                    'If CopterCode cancels a service or program, a full refund will be issued within 7-10 business days.',
                                    'Partial refunds are not available. Refunds are issued on an all-or-nothing basis.'
                                ]).map((policy, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 mt-1.5 flex-shrink-0" />
                                        {policy}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Liability & Disclaimer */}
                <section id="liability" className="scroll-mt-24">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Liability & Disclaimer</h2>
                    <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg mb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Limitation of Liability</h3>
                        <p className="text-gray-800 text-sm leading-relaxed">
                            {sanityData?.liability?.limitation || "CopterCode is not liable for any indirect, incidental, consequential, or punitive damages arising from service interruptions, data loss, system failures, or third-party links. Our total liability is limited to the amount paid by you."}
                        </p>
                    </div>
                    <div className="bg-white border border-gray-200 p-6 rounded-lg">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Disclaimer of Warranties</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            {sanityData?.liability?.disclaimer || "Services are provided 'as-is' without warranties of any kind. We do not guarantee uninterrupted or error-free service. You assume all risks associated with using our services."}
                        </p>
                    </div>
                </section>

                {/* Governing Law */}
                <section id="governing-law" className="scroll-mt-24">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Governing Law & Jurisdiction</h2>
                    <div className="bg-white border border-gray-200 p-6 rounded-lg space-y-4">
                        <div>
                            <h3 className="text-gray-900 font-bold mb-2">Applicable Law</h3>
                            <p className="text-gray-700 text-sm">
                                {sanityData?.legal?.law || "These Terms & Conditions are governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions."}
                            </p>
                        </div>
                        <div className="border-t border-gray-200 pt-4">
                            <h3 className="text-gray-900 font-bold mb-2">Jurisdiction & Dispute Resolution</h3>
                            <p className="text-gray-700 text-sm mb-3">
                                {sanityData?.legal?.jurisdiction || "All disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts located in Chennai, Tamil Nadu, India."}
                            </p>
                            <div className="bg-blue-50 border-l-4 border-blue-600 p-3 rounded-r-lg">
                                <p className="text-gray-800 text-xs">
                                    <span className="font-bold">Dispute Resolution:</span> Parties agree to attempt amicable resolution before initiating legal proceedings.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Information */}
                <section id="contact" className="scroll-mt-24">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white border border-gray-200 p-6 rounded-lg">
                            <h3 className="text-gray-900 font-bold mb-4">CopterCode</h3>
                            <div className="space-y-3 text-sm text-gray-700">
                                <p>
                                    <span className="font-semibold text-gray-900">Address:</span><br />
                                    {sanityData?.contact?.address || "No: 22, 2nd Cross Street,\nKirupananda Variar Nagar,\nMangadu, Chennai - 600056, India"}
                                </p>
                            </div>
                        </div>
                        <div className="bg-white border border-gray-200 p-6 rounded-lg space-y-4">
                            <a href={`mailto:${sanityData?.contact?.email || "hr@coptercode.co.in"}`} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                                <Mail className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-600">Email</p>
                                    <p className="text-sm font-semibold text-gray-900">{sanityData?.contact?.email || "hr@coptercode.co.in"}</p>
                                </div>
                            </a>
                            <a href={`tel:${sanityData?.contact?.phone || "+918072193600"}`} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                                <Phone className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-600">Phone</p>
                                    <p className="text-sm font-semibold text-gray-900">{sanityData?.contact?.phone || "+91 80721 93600"}</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                        <p className="text-gray-800 text-sm">
                            <span className="font-bold">For Inquiries:</span> If you have questions about these Terms & Conditions, please contact our legal team. We aim to respond within 5 business days.
                        </p>
                    </div>
                </section>

            </LegalLayout>
        </div>
    );
};

export default TermsAndConditions;
