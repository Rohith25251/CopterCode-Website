import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';
import SEO from '../components/SEO';
import LegalLayout from '../components/LegalLayout';
import { Shield, Lock, Eye, Server, Database, Cookie, UserCheck, Mail, Phone } from 'lucide-react';

const PrivacyPolicy = () => {
  const [sanityData, setSanityData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "privacyPolicyPage"][0]`;
    client.fetch(query)
      .then(data => {
        setSanityData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching privacy policy:', err);
        setLoading(false);
      });
  }, []);

  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'information-we-collect', title: 'Information We Collect' },
    { id: 'how-we-use', title: 'How We Use Your Data' },
    { id: 'data-sharing', title: 'Data Sharing & Disclosure' },
    { id: 'data-security', title: 'Data Security' },
    { id: 'cookies', title: 'Cookies & Tracking' },
    { id: 'your-rights', title: 'Your Rights' },
    { id: 'contact', title: 'Contact Information' }
  ];

  const seoTitle = sanityData?.seo?.metaTitle || 'Privacy Policy | CopterCode';
  const seoDesc = sanityData?.seo?.metaDescription || 'Our privacy policy outlines how we collect, use, and protect your personal information.';
  const pageTitle = sanityData?.hero?.title || 'Privacy Policy';
  const pageDescription = sanityData?.hero?.subtitle || 'We are committed to protecting your privacy and ensuring transparency in how we handle your personal data.';
  const effectiveDate = sanityData?.dates?.effectiveDate || 'January 1, 2026';
  const lastUpdated = sanityData?.dates?.lastUpdated || 'January 1, 2026';

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <>
      <SEO title={seoTitle} description={seoDesc} />
      <LegalLayout
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        effectiveDate={effectiveDate}
        lastUpdated={lastUpdated}
        sections={sections}
      >
        {/* Introduction */}
        <section id="introduction" className="mb-12 scroll-mt-32">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
            <Shield className="mr-3 text-blue-600" size={28} />
            Introduction
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {sanityData?.introduction?.description || 'CopterCode ("we," "us," "our," or "Company") respects your privacy and is committed to protecting it through our compliance with this policy. This Privacy Policy explains our online information practices and the choices you can make about how your information is used.'}
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg my-6">
            <p className="text-sm text-blue-900">
              <strong>Important:</strong> This policy applies to information we collect on our website, mobile applications, and other digital services. Please read this policy carefully to understand our practices.
            </p>
          </div>
        </section>

        {/* Information We Collect */}
        <section id="information-we-collect" className="mb-12 scroll-mt-32">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
            <Database className="mr-3 text-blue-600" size={28} />
            Information We Collect
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {sanityData?.dataCollection?.description || 'We collect information you provide to us directly, as well as information collected automatically when you interact with our Services.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {(sanityData?.dataCollection?.cards || [
              {
                title: 'Personal Information',
                items: ['Full name', 'Email address', 'Phone number', 'Date of birth']
              },
              {
                title: 'Professional Information',
                items: ['Job title', 'Company', 'Professional history', 'Educational background']
              },
              {
                title: 'Transaction Data',
                items: ['Payment information', 'Billing address', 'Order history', 'Support tickets']
              },
              {
                title: 'Technical Information',
                items: ['IP address', 'Browser type', 'Device information', 'Usage patterns']
              }
            ]).map((card, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">{card.title}</h3>
                <ul className="space-y-2">
                  {(card.items || card.content?.split(',') || []).map((item, i) => (
                    <li key={i} className="flex items-start text-gray-600 text-sm">
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                      {item.trim()}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* How We Use Your Data */}
        <section id="how-we-use" className="mb-12 scroll-mt-32">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
            <Eye className="mr-3 text-blue-600" size={28} />
            How We Use Your Data
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {sanityData?.usage?.description || 'We use the information we collect for various purposes, including:'}
          </p>

          <ul className="space-y-4">
            {(sanityData?.usage?.points || [
              'Providing, maintaining, and improving our services',
              'Processing transactions and sending related information',
              'Sending promotional communications (with your consent)',
              'Responding to your inquiries and providing customer support',
              'Monitoring and analyzing trends, usage, and activities',
              'Detecting, investigating, and preventing fraudulent transactions',
              'Complying with legal obligations'
            ]).map((point, idx) => (
              <li key={idx} className="flex items-start text-gray-600 leading-relaxed">
                <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full mt-2.5 mr-4 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Data Sharing & Disclosure */}
        <section id="data-sharing" className="mb-12 scroll-mt-32">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
            <Server className="mr-3 text-blue-600" size={28} />
            Data Sharing & Disclosure
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {sanityData?.dataSharing?.description || 'We do not sell your personal information. We may share your information with:'}
          </p>

          <div className="space-y-4 mb-6">
            {(sanityData?.dataSharing?.categories || [
              {
                title: 'Service Providers',
                description: 'Third-party vendors who assist us in operating our website and conducting our business'
              },
              {
                title: 'Legal Compliance',
                description: 'When required by law or to protect our rights and the rights of others'
              },
              {
                title: 'Business Transfers',
                description: 'In connection with a merger, acquisition, or sale of assets'
              }
            ]).map((category, idx) => (
              <div key={idx} className="border-l-4 border-blue-200 bg-blue-50 p-4 rounded-r-lg">
                <h3 className="font-semibold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-100 rounded-lg p-6 my-6">
            <p className="text-sm text-gray-700">
              <strong>Third-Party Services:</strong> We partner with {sanityData?.dataSharing?.partnerNote || 'Google Analytics, Stripe, and other trusted providers'} to deliver our services. Each partner operates under their own privacy policy.
            </p>
          </div>
        </section>

        {/* Data Security */}
        <section id="data-security" className="mb-12 scroll-mt-32">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
            <Lock className="mr-3 text-blue-600" size={28} />
            Data Security
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {sanityData?.security?.description || 'We implement appropriate administrative, physical, and electronic safeguards to protect your personal information.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {(sanityData?.security?.measures || [
              { icon: '🔐', title: 'Encryption', description: 'SSL/TLS encryption for data in transit' },
              { icon: '🛡️', title: 'Access Control', description: 'Limited access to personal data' },
              { icon: '🔄', title: 'Data Retention', description: 'Secure deletion of outdated data' }
            ]).map((measure, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl mb-3">{measure.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{measure.title}</h3>
                <p className="text-sm text-gray-600">{measure.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-r-lg">
            <p className="text-sm text-yellow-900">
              <strong>Note:</strong> No method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </div>
        </section>

        {/* Cookies & Tracking */}
        <section id="cookies" className="mb-12 scroll-mt-32">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
            <Cookie className="mr-3 text-blue-600" size={28} />
            Cookies & Tracking
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {sanityData?.cookies?.description || 'We use cookies and similar tracking technologies to enhance your experience on our Services. Cookies are small files stored on your device.'}
          </p>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Types of Cookies We Use:</h3>
            <ul className="space-y-3">
              <li className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">Essential:</span> Required for site functionality
              </li>
              <li className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">Performance:</span> Help us understand user behavior
              </li>
              <li className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">Marketing:</span> Used to deliver relevant advertisements
              </li>
            </ul>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            You can control cookie settings through your browser. Disabling cookies may affect some website functionality.
          </p>
        </section>

        {/* Your Rights */}
        <section id="your-rights" className="mb-12 scroll-mt-32">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
            <UserCheck className="mr-3 text-blue-600" size={28} />
            Your Rights
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {sanityData?.rights?.description || 'Depending on your location, you may have the following rights regarding your personal information:'}
          </p>

          <div className="space-y-4 mb-6">
            {(sanityData?.rights?.rights || [
              { title: 'Right to Access', description: 'You can request a copy of your personal data' },
              { title: 'Right to Correction', description: 'You can request correction of inaccurate information' },
              { title: 'Right to Deletion', description: 'You can request deletion of your data (subject to legal obligations)' },
              { title: 'Right to Opt-Out', description: 'You can opt out of marketing communications' },
              { title: 'Right to Data Portability', description: 'You can request your data in a portable format' }
            ]).map((right, idx) => (
              <div key={idx} className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
                <h3 className="font-semibold text-gray-900 mb-1">{right.title}</h3>
                <p className="text-sm text-gray-600">{right.description}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            To exercise any of these rights, please contact our privacy team using the information provided in the Contact Information section below.
          </p>
        </section>

        {/* Contact Information */}
        <section id="contact" className="scroll-mt-32">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
            <Mail className="mr-3 text-blue-600" size={28} />
            Contact Information
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {sanityData?.contact?.description || 'If you have questions about this Privacy Policy or our privacy practices, please contact us:'}
          </p>

          <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Company</h3>
                <p className="text-gray-600">{sanityData?.contact?.company || 'CopterCode Industries Limited'}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Mail size={18} className="mr-2 text-blue-600" />
                  Email
                </h3>
                <a href={`mailto:${sanityData?.contact?.email || 'privacy@coptercode.com'}`} className="text-blue-600 hover:underline">
                  {sanityData?.contact?.email || 'privacy@coptercode.com'}
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Phone size={18} className="mr-2 text-blue-600" />
                  Phone
                </h3>
                <a href={`tel:${sanityData?.contact?.phone || '+91 8072 193 600'}`} className="text-blue-600 hover:underline">
                  {sanityData?.contact?.phone || '+91 8072 193 600'}
                </a>
              </div>

              {sanityData?.contact?.address && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
                  <p className="text-gray-600">{sanityData?.contact?.address}</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              <strong>Response Time:</strong> We aim to respond to all privacy-related inquiries within 30 days.
            </p>
          </div>
        </section>
      </LegalLayout>
    </>
  );
};

export default PrivacyPolicy;
