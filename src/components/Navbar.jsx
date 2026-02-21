import { useState, useEffect } from "react";
import { client, urlFor } from "../lib/sanity";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedImage from "./OptimizedImage";

import { ASSETS } from "../constants/assets";

const Navbar = () => {
  const [sanityNavData, setSanityNavData] = useState(null);
  const navData = sanityNavData;

  useEffect(() => {
    const query = `*[_type == "navigation"][0]{
            ...,
            logo {
                asset->{
                    url
                }
            }
        }`;

    client.fetch(query).then((data) => {
      if (data) {
        setSanityNavData({
          ...data,
          logo: data.logo?.asset?.url
        });
      }
    }).catch(console.error);
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Full list for Side Menu
  // Separate Defaults
  const defaultTopNav = [
    { name: "About", path: "/about" },
    { name: "Business", path: "/business" },
    { name: "Administration", path: "/administration" },
    { name: "Careers", path: "/careers" },
    { name: "Events", path: "/events" },
    { name: "Insights", path: "/news" },
    { name: "Contact", path: "/contact" },
  ];

  const defaultSideNav = [
    { name: "About", path: "/about" },
    { name: "Business", path: "/business" },
    { name: "Sustainability", path: "/sustainability" },
    { name: "Administration", path: "/administration" },
    { name: "Careers", path: "/careers" },
    { name: "Events", path: "/events" },
    { name: "Insights", path: "/news" },
    { name: "Investors", path: "/investors" },
    { name: "Contact", path: "/contact" },
  ];

  // Specific Lists from Sanity
  const topNavLinks = navData?.topMenuItems || defaultTopNav;
  const navLinks = navData?.sideMenuItems || defaultSideNav;

  const logoSrc = navData?.logo || ASSETS.LOGO;
  const companyTitle = navData?.companyName || "CopterCode";

  const primaryCTA = navData?.ctaButton || { label: "Get in Touch", link: "/get-in-touch" };
  const secondaryCTA = navData?.secondaryButton || { label: "Internship", link: "/internship" };
  const tertiaryCTA = navData?.tertiaryButton || { label: "Hackathon", link: "/hackathon" };


  const handleSamePageClick = (path) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-[1000] transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm" : "bg-transparent"}`}
      style={{ height: "var(--nav-height)" }}
    >
      <div className="container mx-auto px-6 h-full flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center space-x-3 group min-w-fit"
          onClick={() => handleSamePageClick("/")}
        >
          <motion.div
            className="relative h-16 w-16 overflow-hidden rounded-2xl bg-black shadow-2xl flex items-center justify-center z-20 border-none outline-none"
            whileHover={{}}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <OptimizedImage
              src={logoSrc}
              alt={companyTitle}
              className="h-full w-full object-cover border-none outline-none"
              sizes="64px"
            />
          </motion.div>
          <span className="text-xl font-display font-bold tracking-wide text-primary group-hover:text-accent transition-colors block">
            {companyTitle}
          </span>
        </Link>

        {/* Top Bar Nav - Desktop Subset */}
        <div className="hidden xl:flex items-center space-x-8 flex-1 justify-end mr-8">
          {topNavLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-bold transition-all duration-300 ${location.pathname === link.path ? "text-primary" : "text-gray-500 hover:text-primary"}`}
              onClick={() => handleSamePageClick(link.path)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden xl:flex items-center space-x-4 min-w-fit">
          {/* Tertiary CTA (Hackathon) - New */}
          <Link
            to={tertiaryCTA.link}
            className="px-6 py-2.5 rounded-full bg-[#2A3140] text-white font-bold text-xs hover:bg-primary transition-all duration-300 shadow-lg"
          >
            {tertiaryCTA.label}
          </Link>

          {/* Secondary CTA (Internship) */}
          <Link
            to={secondaryCTA.link}
            className="px-6 py-2.5 rounded-full bg-[#2A3140] text-white font-bold text-xs hover:bg-primary transition-all duration-300 shadow-lg"
          >
            {secondaryCTA.label}
          </Link>

          {/* Primary CTA (Get In Touch) - Swapped to Outline with Dot */}
          <Link
            to={primaryCTA.link}
            className="flex items-center px-4 py-2 text-xs font-bold text-gray-400 border border-gray-200 rounded-full hover:border-gray-400 hover:text-primary transition-all duration-300"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></span>
            {primaryCTA.label}
          </Link>
        </div>

        {/* Hamburger - Always Visible or as needed (User image shows it next to buttons) */}
        <div className="flex items-center pl-4 ml-2">
          <button
            className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-all text-primary"
            onClick={() => setIsOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Side Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1001]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-[100dvh] w-full sm:w-[400px] bg-[#F4F6F8] z-[1002] shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-6 flex justify-between items-center border-b border-gray-200/50">
                <span className="text-xl font-display font-bold text-primary">
                  Menu
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-all"
                  aria-label="Close Menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Links */}
              <motion.div
                className="flex-1 overflow-y-auto py-8 px-8"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.05 },
                  },
                }}
              >
                <div className="flex flex-col space-y-6">
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.name}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link
                        to={link.path}
                        className={`text-lg font-medium transition-colors block ${location.pathname === link.path ? "text-primary font-bold" : "text-gray-600 hover:text-primary"}`}
                        onClick={() => handleSamePageClick(link.path)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Integrated CTAs */}
                  <motion.div
                    className="pt-8 mt-4 border-t border-gray-200/50 space-y-4"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Link
                      to={tertiaryCTA.link}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between w-full px-6 py-4 rounded-2xl bg-[#2A3140] text-white font-bold text-lg hover:bg-primary transition-all shadow-xl group"
                    >
                      {tertiaryCTA.label}
                      <ArrowRight size={20} className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </Link>

                    <Link
                      to={secondaryCTA.link}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between w-full px-6 py-4 rounded-2xl bg-[#2A3140] text-white font-bold text-lg hover:bg-primary transition-all shadow-xl group"
                    >
                      {secondaryCTA.label}
                      <ArrowRight size={20} className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </Link>

                    <Link
                      to={primaryCTA.link}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center text-lg font-medium text-gray-500 hover:text-primary transition-colors group pl-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-3 group-hover:scale-150 transition-transform"></span>
                      {primaryCTA.label}
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
