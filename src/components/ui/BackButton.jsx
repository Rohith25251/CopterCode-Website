import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const BackButton = ({ className = "", to }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let isSettled = false;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      
      // On initial layout, document height is calculated as small.
      // We assume the page is scrollable on mount to prevent flashing the back button at 0 scroll position.
      // After settling (e.g. 700ms), if scrollHeight is still within clientHeight limits, we force visibility.
      const isShortPage = isSettled && scrollHeight > 0 && scrollHeight <= clientHeight * 1.25;
      
      if (isShortPage) {
        setVisible(true);
        return;
      }

      const threshold = clientHeight * 0.4;
      setVisible(window.scrollY > threshold);
    };

    // Run initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    
    // Check multiple times to handle async page loading and layout adjustments
    const timer1 = setTimeout(handleScroll, 100);
    const timer2 = setTimeout(handleScroll, 350);
    const timer3 = setTimeout(() => {
      isSettled = true;
      handleScroll();
    }, 700);
    const timer4 = setTimeout(() => {
      isSettled = true;
      handleScroll();
    }, 1500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [location.pathname]);

  const handleBack = () => {
    // Explicit override override
    if (to) {
      navigate(to);
      return;
    }

    // Path-based navigation: Go up one level in the URL hierarchy
    const pathSegments = location.pathname.split("/").filter(Boolean);
    if (pathSegments.length > 0) {
      pathSegments.pop();
      const parentPath = "/" + pathSegments.join("/");
      navigate(parentPath);
    } else {
      navigate("/");
    }
  };

  return (
    <motion.button
      onClick={handleBack}
      initial={{ opacity: 0, x: -20 }}
      animate={{ 
        opacity: visible ? 1 : 0, 
        x: visible ? 0 : -20,
        pointerEvents: visible ? "auto" : "none" 
      }}
      whileHover={visible ? { scale: 1.02, x: -5 } : {}}
      whileTap={visible ? { scale: 0.95 } : {}}
      transition={{ duration: 0.3 }}
      className={`group flex items-center gap-3 px-6 py-3 rounded-full bg-surface/80 backdrop-blur-md border border-border hover:border-accent hover:bg-surface-highlight transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(160,174,192,0.3)] z-50 ${className}`}
    >
      <ArrowLeft
        size={20}
        className="text-primary group-hover:text-accent transition-colors duration-300"
      />
      <span className="text-sm font-bold tracking-widest uppercase text-primary group-hover:text-accent transition-colors duration-300">
        Back
      </span>
    </motion.button>
  );
};

export default BackButton;
