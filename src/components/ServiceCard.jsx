import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ServiceCard = ({ title, description, icon: Icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative bg-surface border border-border hover:border-accent p-8 transition-colors duration-500 flex flex-col h-full hover:bg-surface-highlight"
    >
      <div className="mb-6 w-14 h-14 border border-border bg-background flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-primary group-hover:border-accent transition-all duration-300 shadow-2xl">
        <Icon size={28} strokeWidth={1.5} />
      </div>

      <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors duration-300">
        {title}
      </h3>
      <p className="text-secondary mb-8 flex-grow leading-relaxed transition-colors">
        {description}
      </p>

      <Link
        to="/services"
        className="inline-flex items-center text-sm font-semibold text-accent transition-colors tracking-widest uppercase"
      >
        Explore{" "}
        <ArrowRight
          size={16}
          className="ml-2 group-hover:translate-x-1 transition-transform"
        />
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
