import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const BackButton = ({ className = "", to }) => {
  const navigate = useNavigate();

  const location = useLocation();

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
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02, x: -5 }}
      whileTap={{ scale: 0.95 }}
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
