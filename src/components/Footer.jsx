import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { client } from "../lib/sanity";
import {
  Linkedin,
  Instagram,
  Youtube,
  MapPin,
  Globe,
  Phone,
  PhoneCall,
  Mail,
} from "lucide-react";


const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [subscriptionEmail, setSubscriptionEmail] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState(null); // 'success', 'error', or null
  const [isSubscribing, setIsSubscribing] = useState(false);
  const location = useLocation();

  // Handle link clicks with scroll behavior
  const handleLinkClick = (url) => {
    const [pathname, hash] = url.split('#');
    const currentPath = location.pathname;

    // If it's the same page
    if (pathname === currentPath || pathname === '') {
      // If there's an anchor, scroll to it after a brief delay
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        // Scroll to top for same-page links without anchor
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    // If it's a different page, React Router will handle navigation
    // and the destination page's useLocation hook will handle scrolling
  };

  // Handle subscription
  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!subscriptionEmail.trim() || !emailRegex.test(subscriptionEmail)) {
      setSubscriptionStatus('error');
      setTimeout(() => setSubscriptionStatus(null), 5000);
      return;
    }

    setIsSubscribing(true);
    setSubscriptionStatus(null);

    try {
      const response = await fetch(
        "https://submitbox.app/api/f/f2babe72-c161-4d4d-9e81-b2b70953c0c0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "Newsletter Subscriber",
            email: subscriptionEmail.trim(),
            message: "Subscribed to newsletter",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to subscribe. Please try again.");
      }

      // Success
      setSubscriptionStatus('success');
      setSubscriptionEmail("");

      // Auto clear success message after 5 seconds
      setTimeout(() => setSubscriptionStatus(null), 5000);

    } catch (error) {
      console.error("Subscription error:", error);
      setSubscriptionStatus('error');
      // Auto clear error message after 5 seconds
      setTimeout(() => setSubscriptionStatus(null), 5000);
    } finally {
      setIsSubscribing(false);
    }
  };

  useEffect(() => {
    const query = `*[_type == "footer"][0]`;
    client.fetch(query).then(data => {
      if (data) {
        // Map Sanity data to expected structure
        setFooterData({
          subscriptionTitle: data.subscriptionTitle,
          col1Title: data.column1?.title,
          col1Links: data.column1?.links,
          col2Title: data.column2?.title,
          col2Links: data.column2?.links, // Now capable of being dynamic
          col3Title: data.column3?.title,
          col3Links: data.column3?.links,
          locations: data.contact?.locations,
          copyrightText: data.copyrightText,
          contactTitle: "Contact Us", // Default or add to schema if needed, strictly not asked but good to have
          socialLinks: data.socialLinks
        });
      }
    }).catch(console.error);
  }, []);

  const settings = footerData ? { socialLinks: footerData.socialLinks, companyName: "CopterCode" } : null;
  // const footerData is now state

  const socialLinks = settings?.socialLinks || {};

  // Default Column Data (Fallback)
  const defaultCol1 = {
    title: "About CopterCode",
    links: [
      { label: "About Us", url: "/about" },
      { label: "Administration", url: "/administration" },
      { label: "Founder", url: "/administration#executive-leadership" },
      { label: "Vision & Mission", url: "/about" },
      { label: "Innovation & R&D", url: "/technologies" },
      { label: "Certifications & Awards", url: "/about#milestones-at-a-glance" },
      { label: "Sustainability", url: "/sustainability" },
      { label: "CSR Initiatives", url: "/sustainability" },
      { label: "Operating Locations", url: "/locations" },
    ]
  };

  const defaultCol2 = {
    title: "Businesses",
    links: [
      { label: "Industrial Drones & UAV", url: "/industrial-drones" },
      { label: "Digital Services", url: "/digital-services" },
      { label: "New Energy & Materials", url: "/new-energy" },
      { label: "ERP Software Solutions", url: "/erp-solutions" },
      { label: "Retail & Food Collaborations", url: "/retail-food" },
      { label: "Infrastructure Security", url: "/infra-security" },
    ]
  };

  const defaultCol3 = {
    title: "Company",
    links: [
      { label: "News & Updates", url: "/news" },
      { label: "Events", url: "/events" },
      { label: "Hackathon", url: "/hackathon" },
      { label: "Careers", url: "/careers" },
      { label: "Partner With Us", url: "/investors" },
      { label: "Contact Coptercode", url: "/contact" },
      { label: "Apply for Internship →", url: "/internship" },
    ]
  };

  const col1 = { title: footerData?.col1Title || defaultCol1.title, links: footerData?.col1Links || defaultCol1.links };
  const col2 = { title: footerData?.col2Title || defaultCol2.title, links: footerData?.col2Links || defaultCol2.links };
  const col3 = { title: footerData?.col3Title || defaultCol3.title, links: footerData?.col3Links || defaultCol3.links };

  const defaultLocations = [
    {
      title: "Headquarters (India)",
      companyName: settings?.companyName || "CopterCode",
      address: "Chennai, Tamil Nadu, India",
      phones: ["+91 8072 193 600", "+91 96554 51382"],
      email: "coptercode@gmail.com"
    },
    {
      title: "USA Office",
      companyName: settings?.companyName ? `${settings.companyName} Inc` : "CopterCode",
      address: "Ann Arbor, MI, USA",
      phones: ["+1 (734) 678 6093"],
      email: "hr@coptercode.co.in"
    }
  ];

  const locations = (footerData?.locations && footerData.locations.length > 0) ? footerData.locations : defaultLocations;

  const copyrightText = footerData?.copyrightText
    ? footerData.copyrightText.replace('{year}', new Date().getFullYear())
    : `© ${new Date().getFullYear()} ${settings?.companyName || "CopterCode"}. All rights reserved.`;


  const renderSocialIcon = (platform, url) => {
    const icons = {
      linkedin: <Linkedin size={18} />,
      instagram: <Instagram size={18} />,
      youtube: <Youtube size={18} />
    };

    const colors = {
      linkedin: "hover:bg-[#0077b5] hover:border-[#0077b5]",
      instagram: "hover:bg-[#E1306C] hover:border-[#E1306C]",
      youtube: "hover:bg-[#FF0000] hover:border-[#FF0000]",
    };

    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-10 h-10 rounded-full border border-border flex items-center justify-center text-secondary hover:text-white transition-all duration-300 ${colors[platform]}`}
      >
        {icons[platform]}
      </a>
    );
  };

  return (
    <footer className="bg-background text-primary pt-20 pb-10 border-t border-border font-sans">
      <div className="container mx-auto px-6">
        {/* Stay Updated Section */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex space-x-4 mb-8">
            {socialLinks.linkedin && renderSocialIcon('linkedin', socialLinks.linkedin)}
            {socialLinks.instagram && renderSocialIcon('instagram', socialLinks.instagram)}
            {socialLinks.youtube && renderSocialIcon('youtube', socialLinks.youtube)}

            {!settings && (
              <>
                {renderSocialIcon('linkedin', "https://www.linkedin.com/company/coptercode/")}
                {renderSocialIcon('instagram', "https://www.instagram.com/coptercode?igsh=MW9oNWc2eGY3ejRmOQ==")}
                {renderSocialIcon('youtube', "http://www.youtube.com/@coptercode")}
              </>
            )}
          </div>

          <h2 className="text-3xl md:text-4xl font-display font-medium text-primary mb-2">
            {footerData?.subscriptionTitle || `Stay Updated with ${settings?.companyName || "CopterCode"}`}
          </h2>
          <div className="w-12 h-1 bg-accent mb-8 mx-auto"></div>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-3 w-full max-w-xl">
            <div className="flex flex-col sm:flex-row shadow-lg rounded-2xl sm:rounded-full overflow-hidden p-2 sm:p-1 border border-border bg-surface gap-3 sm:gap-0">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full sm:w-auto flex-grow px-4 sm:px-6 py-3 outline-none text-secondary placeholder:text-secondary/60 text-center sm:text-left bg-transparent disabled:opacity-60 disabled:cursor-not-allowed"
                value={subscriptionEmail}
                onChange={(e) => setSubscriptionEmail(e.target.value)}
                disabled={isSubscribing}
                required
              />
              <button 
                type="submit"
                disabled={isSubscribing}
                className="w-full sm:w-auto bg-accent text-white px-8 py-3 rounded-xl sm:rounded-full font-medium hover:bg-accent/90 transition-colors shadow-md sm:shadow-none disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </button>
            </div>

            {subscriptionStatus === 'success' && (
              <div className="text-center text-green-600 text-sm font-medium">
                ✓ Thank you for subscribing! Check your email for confirmation.
              </div>
            )}

            {subscriptionStatus === 'error' && (
              <div className="text-center text-red-600 text-sm font-medium">
                ✕ Please enter a valid email address.
              </div>
            )}
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-border pt-16 text-sm">

          {/* Column 1 */}
          <div>
            <h4 className="text-accent font-bold mb-6 text-base tracking-wide uppercase">
              {col1.title}
            </h4>
            <ul className="space-y-3 text-secondary font-medium">
              {col1.links?.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.url} onClick={() => handleLinkClick(link.url)} className="hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-accent font-bold mb-6 text-base tracking-wide uppercase">
              {col2.title}
            </h4>
            <ul className="space-y-3 text-secondary font-medium">
              {col2.links?.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.url} onClick={() => handleLinkClick(link.url)} className="hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-accent font-bold mb-6 text-base tracking-wide uppercase">
              {col3.title}
            </h4>
            <ul className="space-y-3 text-secondary font-medium">
              {col3.links?.map((link, idx) => (
                <li key={idx} className={link.label.includes('Internship') ? "pt-4" : ""}>
                  <Link to={link.url} onClick={() => handleLinkClick(link.url)} className={link.label.includes('Internship') ? "inline-flex items-center text-accent font-bold hover:underline" : "hover:text-accent transition-colors"}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h4 className="text-accent font-bold mb-6 text-base tracking-wide uppercase">
              {footerData?.contactTitle || "Contact Us"}
            </h4>
            <ul className="space-y-6 text-secondary font-medium">
              {locations.map((location, index) => (
                <li key={index} className={`space-y-3 ${index > 0 ? "border-t border-border pt-4" : ""}`}>
                  <div className="flex items-center gap-2 text-accent">
                    {index === 0 ? <MapPin size={16} /> : <Globe size={16} />}
                    <span className="text-xs font-bold uppercase tracking-widest">
                      {location.title}
                    </span>
                  </div>
                  <div className="pl-6 space-y-2">
                    <div>
                      <p className="font-bold text-primary">
                        {location.companyName}
                      </p>
                      <p className="text-xs text-secondary/70">
                        {location.address}
                      </p>
                    </div>
                    <div className="space-y-1">
                      {location.phones?.map((phone, i) => (
                        <a key={i} href={`tel:${phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 hover:text-primary transition-colors text-xs">
                          <Phone size={14} className="text-accent" /> {phone}
                        </a>
                      ))}
                    </div>
                    <div className="space-y-1 pt-1">
                      <a
                        href={`mailto:${location.email}`}
                        className="flex items-center gap-2 hover:text-accent transition-colors text-xs break-all"
                      >
                        <Mail size={14} className="text-accent" />{" "}
                        {location.email}
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-secondary/70">
        <p>
          {copyrightText}
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link to="/privacy" onClick={() => handleLinkClick('/privacy')} className="hover:text-accent transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" onClick={() => handleLinkClick('/terms')} className="hover:text-accent transition-colors">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
