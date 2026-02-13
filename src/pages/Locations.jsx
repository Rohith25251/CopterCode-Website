import PageHeader from "../components/PageHeader";
import SEO from "../components/SEO";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  ArrowUpRight,
  Clock,
  Navigation,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { client, urlFor } from "../lib/sanity";
import locationIndia from "../assets/location_india.png";
import locationUsa from "../assets/location_usa.png";

const LocationCard = ({ loc, index }) => {
  // Current time logic for each location
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: loc.timezone || "UTC",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      setTime(now.toLocaleTimeString("en-US", options));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [loc.timezone]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="group relative flex flex-col h-full"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-br from-white/10 to-white/5 rounded-[2rem] blur-[1px] group-hover:from-accent group-hover:to-accent/20 transition-all duration-500 opacity-50 group-hover:opacity-100" />

      <div className="relative flex flex-col h-full bg-surface border border-border rounded-[1.9rem] overflow-hidden">
        {/* Visual Header */}
        <div className="relative h-64 overflow-hidden">
          {/* Background Image & Overlays */}
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
            <img
              src={loc.image}
              alt={loc.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/15 transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-70" />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${loc.gradient} opacity-20 mix-blend-overlay transition-opacity duration-500`}
            />
          </div>

          {/* Abstract Grid Overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Floating Icon */}


          {/* Country Badge */}
          <div className="absolute top-6 left-6">
            <span className="px-4 py-1.5 rounded-full bg-background/70 backdrop-blur-md border border-border text-xs font-bold uppercase tracking-widest text-primary shadow-lg">
              {loc.country}
            </span>
          </div>

          {/* Time Badge */}
          <div className="absolute top-6 right-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/70 backdrop-blur-md border border-border text-xs font-medium text-primary/90 shadow-lg">
            <Clock size={12} className="text-accent" />
            {time}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 flex-grow flex flex-col">
          <div className="mb-6">
            <h3 className="text-3xl font-display font-bold text-primary mb-2 group-hover:text-accent transition-colors">
              {loc.title}
            </h3>
            <div className="h-1 w-12 bg-accent rounded-full mb-4 transform origin-left group-hover:scale-x-150 transition-transform duration-300" />
            <p className="text-secondary leading-relaxed">{loc.description}</p>
          </div>

          <div className="space-y-5 mt-auto">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border hover:bg-surface-highlight transition-colors group/item">
              <MapPin
                className="text-accent mt-1 group-hover/item:scale-110 transition-transform"
                size={20}
              />
              <div>
                <span className="text-xs font-bold text-secondary uppercase tracking-widest block mb-1">
                  Address
                </span>
                <p className="text-primary/90 text-sm leading-snug">
                  {loc.address}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:${loc.phone}`}
                className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border hover:bg-accent hover:text-primary transition-all group/item"
              >
                <Phone
                  size={18}
                  className="text-accent group-hover/item:text-primary transition-colors"
                />
                <span className="text-sm font-semibold">
                  {loc.phoneDisplay}
                </span>
              </a>
              <a
                href={`mailto:${loc.email}`}
                className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border hover:bg-accent hover:text-primary transition-all group/item"
              >
                <Mail
                  size={18}
                  className="text-accent group-hover/item:text-primary transition-colors"
                />
                <span className="text-sm font-semibold truncate">Email Us</span>
              </a>
            </div>

            <a
              href={loc.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-4 mt-4 rounded-xl border border-accent/30 text-accent font-bold text-sm uppercase tracking-widest hover:bg-accent hover:text-primary transition-all duration-300 group/btn"
            >
              <Navigation
                size={16}
                className="mr-2 group-hover/btn:-translate-y-0.5 transition-transform"
              />
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Locations = () => {
  const [sanityData, setSanityData] = useState(null);

  useEffect(() => {
    const query = `*[_type == "locationsPage"][0]`;
    client
      .fetch(query)
      .then((data) => {
        if (data) {
          setSanityData({
            seo: data.seo,
            heroTitle: data.hero?.title,
            heroSubtitle: data.hero?.subtitle,
            footprintTitle: data.footprint?.title,
            footprintDescription: data.footprint?.description,
            locations: data.locations?.map((loc) => ({
              ...loc,
              image: loc.image ? urlFor(loc.image).url() : null,
            })),
          });
        }
      })
      .catch(console.error);
  }, []);

  const seoTitle = sanityData?.seo?.metaTitle || "Operating Locations";
  const seoDesc =
    sanityData?.seo?.metaDescription ||
    "CopterCode's global footprint and operating locations.";

  const heroTitle = sanityData?.heroTitle || "Operating Locations";
  const heroSubtitle =
    sanityData?.heroSubtitle ||
    "Connecting the world through innovative aerial technology.";

  const footprintTitle = sanityData?.footprintTitle || "Global Footprint";
  const footprintDescription =
    sanityData?.footprintDescription ||
    "Strategic hubs positioned to deliver excellence, globally connected and locally focused.";

  const fallbackLocations = [
    {
      country: "India",
      title: "Headquarters",
      description:
        "Our central command center driving global strategy, extensive R&D facilities, and core manufacturing operations.",
      address: "CopterCode, Chennai, Tamil Nadu, India",
      phone: "+91 80721 93600",
      phoneDisplay: "+91 8072 193 600",
      email: "coptercode@gmail.com",
      gradient: "from-orange-500 to-amber-600",
      timezone: "Asia/Kolkata",
      image: locationIndia,
      mapsLink:
        "https://www.google.com/maps/place/Chennai,+Tamil+Nadu/@13.0474733,80.0438597,11z/data=!3m1!4b1!4m6!3m5!1s0x3a5265ea4f7d3361:0x6e61a70b6863d433!8m2!3d13.0843007!4d80.2704622!16zL20vMGM4dGs?entry=ttu&g_ep=EgoyMDI2MDIwOS4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      country: "USA",
      title: "USA Office",
      description:
        "Spearheading our North American partnerships, focusing on advanced AI software integration and client relations.",
      address: "CopterCode, Ann Arbor, MI, USA",
      phone: "+17346786093",
      phoneDisplay: "+1 (734) 678 6093",
      email: "hr@coptercode.co.in",
      gradient: "from-blue-600 to-indigo-600",
      timezone: "America/Detroit",
      image: locationUsa,
      mapsLink:
        "https://www.google.com/maps/place/Ann+Arbor,+MI,+USA/@42.2732178,-83.8935777,12z/data=!3m1!4b1!4m6!3m5!1s0x883cb00dd4431f33:0xdb09f94686c8b5e2!8m2!3d42.2808256!4d-83.7430378!16zL20vMHdoMw?entry=ttu&g_ep=EgoyMDI2MDIwOS4wIKXMDSoASAFQAw%3D%3D",
    },
  ];

  const locations =
    sanityData?.locations?.length > 0
      ? sanityData.locations.map((loc) => ({
        ...loc,
        image: loc.image || (loc.country === "India" ? locationIndia : locationUsa),
      }))
      : fallbackLocations;


  return (
    <div className="bg-background min-h-screen text-primary selection:bg-accent selection:text-background">
      <SEO
        title={seoTitle}
        description={seoDesc}
      />

      {/* Background Map Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:24px_24px] mask-gradient-radial" />
      </div>

      <PageHeader
        title={heroTitle}
        subtitle={heroSubtitle}
      />

      <section className="pt-10 pb-24 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6">
              {footprintTitle}
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
              {footprintDescription}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-w-6xl mx-auto">
            {locations.map((loc, index) => (
              <LocationCard key={index} loc={loc} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Locations;
