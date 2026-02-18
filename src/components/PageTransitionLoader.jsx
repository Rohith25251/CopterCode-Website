import { motion } from "framer-motion";

const PageTransitionLoader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Minimal Elegant Loader */}
      <div className="flex flex-col items-center gap-6">
        {/* Animated Dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </div>
        
        {/* Loading Text */}
        <motion.p
          className="text-sm text-primary/60 font-medium tracking-wide"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading
        </motion.p>
      </div>
    </motion.div>
  );
};

export default PageTransitionLoader;
