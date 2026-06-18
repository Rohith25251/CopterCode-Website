import { useEffect } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import OptimizedImage from './OptimizedImage';
import { GraduationCap, Briefcase } from "lucide-react";
import { client, urlFor } from "../lib/sanity";

// Fallback hardcoded data to ensure the slider is never empty while populating CMS
const fallbackInterns = [
  {
    name: "A Devendhiran",
    college: "Shree Sathyam College of Engineering And Technology",
    role: "Full Stack Developer",
    image: "/mediafiles/Intern/A Devendhiran   -   Shree Sathyam College of Engineering And Technology   -  Fresher  -   Full Stack Developer.jpg",
  },
  {
    name: "A Senthurapandi",
    college: "Shree Sathyam college of Engineering And Technology",
    role: "IOT Data Analysts",
    image: "/mediafiles/Intern/A Senthurapandi  -    Shree Sathyam college of Engineering And Technology    -   Fresher   -   IOT Data Analysts.jpg",
  },
  {
    name: "A kathir",
    college: "Shree Sathyam college of Engineering And Technology",
    role: "Cybersecurity Analyst",
    image: "/mediafiles/Intern/A kathir   -  Shree Sathyam college of Engineering And Technology   -  Fresher  -   Cybersecurity Analyst.jpg",
  },
  {
    name: "Aathi Lakshmi",
    college: "Mepco Schlenk Engineering College",
    role: "Drone Development Designer",
    image: "/mediafiles/Intern/Aathi Lakshmi -  Mepco Schlenk Engineering College  -   Fresher  -   Drone Development Designer.jpg",
  },
  {
    name: "Abinaya K",
    college: "KPR Institute of Engineering and Technology",
    role: "Fresher Cloud Architect",
    image: "/mediafiles/Intern/Abinaya K  - KPR Institute of Engineering and Technology  -  Fresher Cloud Architect.jpg",
  },
  {
    name: "Abinesh M",
    college: "Shree Sathyam college of Engineering And Technology",
    role: "Full Stack Web Developer",
    image: "/mediafiles/Intern/Abinesh M  -  Shree Sathyam college of Engineering And Technology  -  Fresher  -   Full Stack Web Developer.jpg",
  },
  {
    name: "Abishek kandan K S",
    college: "SSN College of Engineering",
    role: "Cloud Architect",
    image: "/mediafiles/Intern/Abishek kandan K S   -  SSN College of Engineering  -   Fresher  -   Cloud Architect.jpg",
  }
];

const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const InternsCarousel = ({ data }) => {
  const x = useMotionValue(0);

  const heading = data?.heading || "Journey of Our Interns";
  const subheading = data?.subheading || "Empowering the next generation of tech leaders.";

  // Transform Sanity interns if they exist
  const sanityInterns = data?.interns?.map(intern => ({
    name: intern.name,
    college: intern.college,
    role: intern.role,
    image: intern.image ? urlFor(intern.image).url() : null
  })) || [];

  const interns = sanityInterns.length > 0 ? sanityInterns : fallbackInterns;

  const cardWidth = 400;
  const gap = 32;
  const totalItemWidth = cardWidth + gap;

  // Create a seamless loop array. 
  const seamlessInterns = interns.length < 5
    ? [...interns, ...interns, ...interns, ...interns, ...interns]
    : [...interns, ...interns];

  const totalWidth = interns.length * totalItemWidth;

  useAnimationFrame((time, delta) => {
    if (interns.length > 0) {
      const safeDelta = Math.min(delta, 100);
      const speed = 50;
      const moveBy = (speed * safeDelta) / 1000;
      let newX = x.get() - moveBy;

      if (newX <= -totalWidth) {
        newX = 0;
      }
      x.set(newX);
    }
  });

  return (
    <div
      className="relative group overflow-hidden py-12"
    >
      <div className="px-6 mb-12 text-center">
        <h3 className="text-4xl font-display font-medium mb-4 text-primary">
          {heading}
        </h3>
        <p className="text-secondary text-lg">
          {subheading}
        </p>
      </div>

      <div className="flex overflow-hidden relative w-full items-center">
        <motion.div className="flex gap-8 pl-6" style={{ x, width: "max-content" }}>
          {seamlessInterns.map((intern, index) => (
            <div
              key={index}
              className="w-[400px] bg-surface rounded-3xl overflow-hidden shadow-xl border border-border flex-shrink-0 flex flex-col group/card hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="aspect-[4/5] overflow-hidden relative h-[500px]">
                {intern.image ? (
                  <>
                    <OptimizedImage
                      src={intern.image}
                      alt={intern.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                      loading="lazy"
                      decoding="async"
                      sizes="300px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/25 to-transparent opacity-90 z-10" />
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-4 group-hover/card:scale-105 transition-transform duration-500">
                      <span className="text-4xl font-display font-black text-white/80">
                        {getInitials(intern.name)}
                      </span>
                    </div>
                    <span className="text-[10px] font-extrabold text-white/40 tracking-[0.2em] uppercase">CopterCode Intern</span>
                  </div>
                )}

                <div className="absolute bottom-6 left-6 right-6 text-white z-20">
                  <div className="bg-primary/40 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 inline-block mb-3 rounded-full">
                    Fresher
                  </div>
                  <h4 className="text-2xl font-bold leading-tight">
                    {intern.name}
                  </h4>
                </div>
              </div>

              <div className="p-8 space-y-5 flex-1 flex flex-col justify-center bg-surface">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-background rounded-lg shrink-0 border border-border">
                    <GraduationCap className="text-accent" size={20} />
                  </div>
                  <p className="text-sm font-medium text-secondary leading-snug line-clamp-2 pt-1">
                    {intern.college}
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-background rounded-lg shrink-0 border border-border">
                    <Briefcase className="text-accent" size={20} />
                  </div>
                  <p className="text-base font-bold text-primary pt-1">
                    {intern.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InternsCarousel;
