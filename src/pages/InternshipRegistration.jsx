import { useState, useEffect, useRef } from "react";
import PageHeader from "../components/PageHeader";
import SEO from "../components/SEO";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedImage from "../components/OptimizedImage";
import * as Lucide from "lucide-react";
import { client, urlFor } from "../lib/sanity";
import {
  User,
  Phone,
  Mail,
  Building,
  BookOpen,
  Calendar,
  MapPin,
  Clock,
  Award,
  CheckCircle,
  ArrowRight,
  Globe,
  Linkedin,
  Instagram,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  HelpCircle,
  FileCheck,
  ChevronDown,
  Check
} from "lucide-react";

const HEADER_IMAGES = [
  "/mediafiles/Home/3442832E-21FB-4BF3-8CF2-7A91FBCA0302.jpg",
  "/mediafiles/Home/B6181B19-4FA3-4BDE-866B-F02911B76EAC.jpg",
  "/mediafiles/Home/IMG_1851.jpg",
  "/mediafiles/Home/IMG_3322.jpg",
  "/mediafiles/Home/IMG_3854.jpg"
];

const BRANCH_OPTIONS = [
  "AERONAUTICAL AEROSPACE ENGINEERING",
  "IT ENGINEERING",
  "AUTOMOBILE ENGINEERING",
  "CIVIL ENGINEERING",
  "COMPUTER SCIENCE AND ENGINEERING",
  "EEE",
  "ECE",
  "MECHANICAL ENGINEERING",
  "COMPUTER COMMUNICATIONS",
  "ARTIFICIAL INTELLIGENCE & DATA SCIENCE / ML",
  "R & A",
  "BCA",
  "MCA",
  "B.Com (ALL)",
  "B.Sc",
  "M.Sc",
  "COMPUTER SCIENCE AND DESIGN",
  "Other"
];

const REGISTERED_INTERNS = [
  { src: "/mediafiles/registeration intern/intern_1.jpg", name: "A Devendhiran" },
  { src: "/mediafiles/registeration intern/intern_2.jpg", name: "A Senthurapandi" },
  { src: "/mediafiles/registeration intern/intern_3.jpg", name: "A Kathir" },
  { src: "/mediafiles/registeration intern/intern_4.jpg", name: "Aathi Lakshmi" },
  { src: "/mediafiles/registeration intern/intern_5.jpg", name: "Abinaya K" },
  { src: "/mediafiles/registeration intern/intern_6.jpg", name: "Abinesh M" },
  { src: "/mediafiles/registeration intern/intern_7.jpg", name: "Adit Ram S G" },
  { src: "/mediafiles/registeration intern/intern_8.jpg", name: "Amirtha Shree S" },
  { src: "/mediafiles/registeration intern/intern_9.jpg", name: "Anagha P P" }
];

const IMAGES_LEFT = [
  REGISTERED_INTERNS[0],
  REGISTERED_INTERNS[3],
  REGISTERED_INTERNS[5],
  REGISTERED_INTERNS[8]
];

const IMAGES_RIGHT = [
  REGISTERED_INTERNS[1],
  REGISTERED_INTERNS[4],
  REGISTERED_INTERNS[7]
];

const ScrollFadeCard = ({ item }) => {
  return (
    <div
      className="w-48 h-60 sm:w-64 sm:h-80 rounded-2xl overflow-hidden border border-white/60 shadow-lg bg-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/20 relative shrink-0 group"
    >
      <OptimizedImage
        src={item.src}
        alt={item.name}
        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 ease-out"
        loading="lazy"
        decoding="async"
        sizes="256px"
      />
      {/* Always visible premium dark gradient overlay covering the baked-in 'VERIFIED INTERN' watermark */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent pt-8 pb-3 px-3 flex items-end transition-all duration-300">
        <span className="text-[10px] text-white font-extrabold tracking-wider uppercase drop-shadow-sm leading-tight transition-transform duration-300 group-hover:scale-105 origin-left">
          {item.name}
        </span>
      </div>
    </div>
  );
};

const InternshipRegistration = () => {
  useScrollToTop(); // Force scroll to top on mount

  // 1. Initialize all React states first to prevent TDZ errors
  const [sanityData, setSanityData] = useState(null);
  const [preloaderData, setPreloaderData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [validationError, setValidationError] = useState("");
  const [isXl, setIsXl] = useState(false);
  const [currentHomeImageIndex, setCurrentHomeImageIndex] = useState(0);

  const [formData, setFormData] = useState({
    studentName: "",
    contactNumber: "",
    email: "",
    collegeName: "",
    elective: "Full Stack Developer & Software Developer With AI ML Intern - Venue : IIT Madras Rp",
    batch: "June - July",
    branch: "",
    customBranch: "",
    year: "",
    dob: "",
    address: "",
    period1Month: false,
    period3Month: false,
    placementInterest: "yes",
    agreePayFee: false,
    agreeHybridMode: false,
    agreeNonRefundable: false,
    agreeExtension: false,
    confirmTerms: false
  });

  // Derived data references
  const sanityInterns = sanityData?.registeredInterns?.length > 0
    ? sanityData.registeredInterns.map(intern => ({
      src: intern.image ? urlFor(intern.image).width(256).height(320).quality(85).format('webp').url() : "",
      name: intern.name
    })).filter(item => item.src)
    : [];

  const internsPool = sanityInterns.length > 0 ? sanityInterns : REGISTERED_INTERNS;

  // Split internsPool into left and right columns
  const leftPool = [];
  const rightPool = [];
  internsPool.forEach((item, idx) => {
    if (idx % 2 === 0) {
      leftPool.push(item);
    } else {
      rightPool.push(item);
    }
  });

  // Helper to repeat items to ensure seamless infinite vertical scrolling
  const getMarqueeItems = (pool) => {
    if (!pool || pool.length === 0) return [];
    let items = [...pool];
    while (items.length < 8) {
      items = [...items, ...pool];
    }
    return [...items, ...items];
  };

  const leftMarqueeItems = getMarqueeItems(leftPool);
  const rightMarqueeItems = getMarqueeItems(rightPool);
  const horizontalMarqueeItems = getMarqueeItems(internsPool);


  useEffect(() => {
    // 1. Viewport match listener for responsive loading
    const mediaQuery = window.matchMedia("(min-width: 1280px)");
    setIsXl(mediaQuery.matches);
    const handleResize = (e) => setIsXl(e.matches);
    mediaQuery.addEventListener("change", handleResize);

    // 2. Combined GROQ query to fetch all static page and preloader content in a single round-trip
    const combinedQuery = `{
      "preloader": *[_type == "preloaderPage"][0]{
        "logo": logo.asset->url,
        background {
          image { asset->{ url } }
        },
        titlePrefix,
        highlightedTitle,
        tagline
      },
      "registration": *[_type == "internshipRegistrationPage"][0]
    }`;

    client.fetch(combinedQuery).then((data) => {
      if (data?.preloader) {
        setPreloaderData({
          logo: data.preloader.logo || "/mediafiles/Preloder logo.png",
          image: data.preloader.background?.image?.asset?.url || "/_optimized/mediafiles/preloader_bg.webp",
          titlePrefix: typeof data.preloader.titlePrefix === 'object' ? data.preloader.titlePrefix?.text : (data.preloader.titlePrefix || "WELCOME TO"),
          highlightedTitle: typeof data.preloader.highlightedTitle === 'object' ? data.preloader.highlightedTitle?.text : (data.preloader.highlightedTitle || "COPTERCODE"),
          tagline: typeof data.preloader.tagline === 'object' ? data.preloader.tagline?.text : (data.preloader.tagline || "Engineering The Unknown")
        });
      } else {
        setPreloaderData({
          logo: "/mediafiles/Preloder logo.png",
          image: "/_optimized/mediafiles/preloader_bg.webp",
          titlePrefix: "WELCOME TO",
          highlightedTitle: "COPTERCODE",
          tagline: "Engineering The Unknown"
        });
      }

      if (data?.registration) {
        const reg = data.registration;
        setSanityData({
          seo: reg.seo,
          heroTitle: reg.hero?.title,
          heroSubtitle: reg.hero?.subtitle,
          heroBackgroundImages: reg.hero?.backgroundImages,
          overviewTag: reg.overview?.tag,
          overviewTitle: reg.overview?.title,
          overviewGreeting: reg.overview?.greeting,
          overviewParagraphs: reg.overview?.descriptionParagraphs,
          overviewSupportNote: reg.overview?.supportNote,
          outcomesTitle: reg.outcomes?.title,
          outcomesList: reg.outcomes?.list,
          supportTitle: reg.support?.title,
          supportChannels: reg.support?.channels,
          formHeading: reg.registrationForm?.heading,
          formEndpoint: reg.registrationForm?.endpoint,
          formFields: reg.registrationForm?.fieldsConfig,
          formElectives: reg.registrationForm?.electivesSection,
          formBatches: reg.registrationForm?.batchesSection,
          formDropdowns: reg.registrationForm?.dropdownsSection,
          formPeriod: reg.registrationForm?.periodSection,
          formPlacement: reg.registrationForm?.placementSection,
          formTerms: reg.registrationForm?.termsSection,
          formSubmitText: reg.registrationForm?.submitActionText,
          formSubmittingText: reg.registrationForm?.submittingText,
          formSuccess: reg.registrationForm?.successSection,
          registeredInterns: reg.registeredInterns
        });
      }
    }).catch((err) => {
      console.error("Failed to fetch Sanity data for internship registration page:", err);
      setPreloaderData({
        logo: "/mediafiles/Preloder logo.png",
        image: "/_optimized/mediafiles/preloader_bg.webp",
        titlePrefix: "WELCOME TO",
        highlightedTitle: "COPTERCODE",
        tagline: "Engineering The Unknown"
      });
    });

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const seoTitle = sanityData?.seo?.metaTitle || "Internship Registration | IIT Madras RP Venue - CopterCode";
  const seoDesc = sanityData?.seo?.metaDescription || "Register for the CopterCode Winter Internship & Industry Orientation Program at IIT Madras Research Park. Work on international live projects from Netherlands & Texas (USA).";
  const seoKeywords = sanityData?.seo?.keywords || "coptercode, internship registration, IIT Madras RP, winter internship, full stack developer, drone design, UAV intern, Chennai internship";

  const sanityCarouselImages = sanityData?.heroBackgroundImages?.length > 0
    ? sanityData.heroBackgroundImages.map(img => urlFor(img).url())
    : [];

  const headerImages = sanityCarouselImages.length > 0
    ? sanityCarouselImages
    : HEADER_IMAGES;

  useEffect(() => {
    if (headerImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentHomeImageIndex((prev) => (prev + 1) % headerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [headerImages]);

  const heroTitle = sanityData?.heroTitle || "Launch Your Career with Real-World Experience";
  const heroSubtitle = sanityData?.heroSubtitle || "IIT Madras Research Park Venue";

  const overviewTag = sanityData?.overviewTag || "CopterCode Orientation Program";
  const overviewTitle = sanityData?.overviewTitle || "IIT Madras RP Venue - CopterCode - Winter Internship & Industry Orientation Program";
  const overviewGreeting = sanityData?.overviewGreeting || "Warm Greetings from CopterCode.";
  const overviewParagraphs = sanityData?.overviewParagraphs?.length > 0
    ? sanityData.overviewParagraphs
    : [
      "We are delighted to invite students from your esteemed institution to be part of the CopterCode Winter Internship & Industry Orientation Program, scheduled during June and July 2026, conducted offline at the prestigious IIT Madras Research Park, Chennai Venue.",
      "It serves as a professional industry induction platform, where students will experience how global companies function, understand real job responsibilities, and work like industry interns inside a professional corporate environment.",
      "Through this internship, students will be onboarded into real international engineering and technology environments, working on Live Projects for companies in the Netherlands and Texas (USA). They will gain hands-on exposure to corporate workflows, problem-solving practices, team collaboration methods, and global project execution standards, helping them transition confidently from campus to corporate with true industry readiness."
    ];
  const overviewSupportNote = sanityData?.overviewSupportNote || "We kindly request your valuable support in circulating this opportunity among your students and encouraging deserving candidates to participate.";

  const outcomesTitle = sanityData?.outcomesTitle || "Internship Deliverables & Outcomes";
  const outcomesList = (sanityData?.outcomesList?.length > 0) ? sanityData.outcomesList : [
    { title: "Working On Live Project", description: "Execute projects following international standard guidelines." },
    { title: "Internship Certificate", description: "Gain a certified Live Project completion credential." },
    { title: "Experience Letter", description: "Acquire professional Live Project experience credentials." },
    { title: "Letter of Recommendation (LOR)", description: "Earn a personalized evaluation based on project performance." }
  ];

  const supportTitle = sanityData?.supportTitle || "For More Details & Support";
  const supportChannels = (sanityData?.supportChannels?.length > 0) ? sanityData.supportChannels : [
    { label: "Email Support", value: "hr@coptercode.co.in", href: "mailto:hr@coptercode.co.in", icon: "Mail" },
    { label: "WhatsApp Inquiry", value: "+91 8072193600", href: "https://wa.me/918072193600", icon: "Phone" },
    { label: "Call Landline", value: "044 61329380", href: "tel:04461329380", icon: "Phone" },
    { label: "LinkedIn", value: "CopterCode LinkedIn", href: "https://www.linkedin.com/company/coptercode/", icon: "Linkedin" },
    { label: "Instagram", value: "CopterCode Instagram", href: "https://www.instagram.com/coptercode?igsh=MW9oNWc2eGY3ejRmOQ%3D%3D", icon: "Instagram" },
    { label: "Official Website", value: "coptercode.co.in", href: "https://coptercode.co.in", icon: "Globe" }
  ];

  const formHeading = sanityData?.formHeading || "Internship Registration Form";
  const formEndpoint = sanityData?.formEndpoint || "https://submitbox.app/api/f/ce6d8a87-b339-4e8b-82c8-1816d60fe69c";

  const nameLabel = sanityData?.formFields?.nameLabel || "Student Name (Full Name)";
  const namePlaceholder = sanityData?.formFields?.namePlaceholder || "Rohith Kumar";

  const whatsappLabel = sanityData?.formFields?.whatsappLabel || "WhatsApp Contact";
  const whatsappPlaceholder = sanityData?.formFields?.whatsappPlaceholder || "8072193600";

  const emailLabel = sanityData?.formFields?.emailLabel || "Email Address";
  const emailPlaceholder = sanityData?.formFields?.emailPlaceholder || "student@college.edu";

  const collegeLabel = sanityData?.formFields?.collegeLabel || "College Name";
  const collegePlaceholder = sanityData?.formFields?.collegePlaceholder || "IIT Madras";

  const dobLabel = sanityData?.formFields?.dobLabel || "Date of Birth";

  const addressLabel = sanityData?.formFields?.addressLabel || "Address";
  const addressPlaceholder = sanityData?.formFields?.addressPlaceholder || "Please enter your full communication address";

  const electivesLabel = sanityData?.formElectives?.label || "Intern Preferable Elective";
  const electivesOptions = (sanityData?.formElectives?.options?.length > 0) ? sanityData.formElectives.options : [
    {
      value: "Full Stack Developer & Software Developer With AI ML Intern - Venue : IIT Madras Rp",
      title: "Full Stack Developer & Software Developer With AI/ML",
      description: "Build modern web applications and AI models. Conducted offline at IIT Madras RP.",
      venueBadge: "Venue: IIT Madras RP"
    },
    {
      value: "Drone Design and R&D Intern (UAVs) - Venue : IIT Madras Rp",
      title: "Drone Design and R&D Intern (UAVs)",
      description: "Work on structural engineering, physics modeling, and UAV design. Conducted offline at IIT Madras RP.",
      venueBadge: "Venue: IIT Madras RP"
    }
  ];

  const batchesLabel = sanityData?.formBatches?.label || "Select Preferred Batch";
  const batchesNote = sanityData?.formBatches?.note || "Note: After The Semester Examination Batch Will Start";
  const batchesOptions = (sanityData?.formBatches?.options?.length > 0) ? sanityData.formBatches.options : [
    { value: "November - December", label: "November - December" },
    { value: "January - February", label: "January - February" },
    { value: "June - July", label: "June - July" }
  ];

  const branchLabel = sanityData?.formDropdowns?.branchLabel || "Branch / Department";
  const branchPlaceholder = sanityData?.formDropdowns?.branchPlaceholder || "-- Choose Branch --";
  const customBranchLabel = sanityData?.formDropdowns?.customBranchLabel || "Specify Other Branch / Department";
  const customBranchPlaceholder = sanityData?.formDropdowns?.customBranchPlaceholder || "Enter your department name";
  const yearLabel = sanityData?.formDropdowns?.yearLabel || "Year of Study";
  const yearPlaceholder = sanityData?.formDropdowns?.yearPlaceholder || "-- Choose Study --";

  const branchOptions = sanityData?.formDropdowns?.branchOptions?.length > 0
    ? sanityData.formDropdowns.branchOptions
    : BRANCH_OPTIONS;

  const yearOptions = sanityData?.formDropdowns?.yearOptions?.length > 0
    ? sanityData.formDropdowns.yearOptions
    : ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year - Intergrated Courses"];

  const periodLabel = sanityData?.formPeriod?.label || "Internship & Project Period";
  const periodOptions = (sanityData?.formPeriod?.options?.length > 0) ? sanityData.formPeriod.options : [
    { name: "period1Month", label: "1 Month - Offline & Hybrid" },
    { name: "period3Month", label: "3 Month - Offline & Hybrid" }
  ];

  const placementLabel = sanityData?.formPlacement?.label || "Interested in Placement Support?";
  const placementOptionYes = sanityData?.formPlacement?.optionYesLabel || "YES";
  const placementOptionNo = sanityData?.formPlacement?.optionNoLabel || "NO";

  const termsLabel = sanityData?.formTerms?.label || "Mandatory Disclosures & Terms";
  const termsDisclosures = (sanityData?.formTerms?.disclosuresList?.length > 0) ? sanityData.formTerms.disclosuresList : [
    "I understand and agree to pay INR ₹6,990 + 18% applicable taxes towards the CopterCode International Live Project Internship & Training, which includes credentials and participation in the program.",
    "I acknowledge that the internship will be conducted in hybrid mode (online and offline) under CopterCode at the venue IIT Madras Research Park (RP).",
    "I agree that the fee is non-refundable under any circumstances.",
    "For the 3-Month Hybrid Internship: Based on performance, attendance, and project evaluation during the initial one-month internship phase, candidates may be considered for extension to the 3-month hybrid internship program."
  ];
  const termsAgreement = sanityData?.formTerms?.agreementText || "I confirm that I have read and agree to all the above terms and conditions. (YES)";

  const submitText = sanityData?.formSubmitText || "Submit Registration";
  const submittingText = sanityData?.formSubmittingText || "Validating & Registering...";
  const successTitle = sanityData?.formSuccess?.title || "Registration Completed!";
  const successMessage = sanityData?.formSuccess?.message || "Thank you for submitting your internship application, {name}. Your registration has been successfully logged inside the CopterCode verification desk.";
  const successSummaryTitle = sanityData?.formSuccess?.summaryTitle || "Application Summary:";
  const successWhatsappLabel = sanityData?.formSuccess?.whatsappLabel || "WhatsApp Number";
  const successEmailLabel = sanityData?.formSuccess?.emailLabel || "Email Address";
  const successBranchLabel = sanityData?.formSuccess?.branchLabel || "Department/Branch";
  const successElectiveLabel = sanityData?.formSuccess?.electiveLabel || "Selected Elective";
  const successBatchLabel = sanityData?.formSuccess?.batchLabel || "Preferred Batch";
  const successNote = sanityData?.formSuccess?.note || "Our HR team will reach out to you shortly through WhatsApp or email with further instructions regarding the onboarding process.";
  const successResetText = sanityData?.formSuccess?.resetButtonText || "Submit Another Registration";

  // Calculate proper limits for DOB (min: 45 years ago, max: 18 years ago relative to today)
  const maxDob = (() => {
    const d = new Date();
    const year = d.getFullYear() - 18;
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  })();

  const minDob = (() => {
    const d = new Date();
    const year = d.getFullYear() - 45;
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  })();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleCheckboxGroup = (name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");
    setSubmitStatus(null);

    // Validate Checkbox Group (At least one duration selected)
    if (!formData.period1Month && !formData.period3Month) {
      setValidationError("Please select at least one Internship & Project Period option.");
      window.scrollTo({ top: document.getElementById("form-section").offsetTop - 100, behavior: "smooth" });
      return;
    }

    // Validate Branch
    if (!formData.branch) {
      setValidationError("Please select your Branch / Department.");
      return;
    }

    // Validate Custom Branch if "Other" is selected
    if (formData.branch === "Other" && !formData.customBranch.trim()) {
      setValidationError("Please specify your Branch / Department in the custom field.");
      return;
    }

    // Validate Year of Study
    if (!formData.year) {
      setValidationError("Please select your Year of Study.");
      return;
    }

    // Validate DOB limits
    if (formData.dob) {
      if (formData.dob > maxDob || formData.dob < minDob) {
        setValidationError(`Date of Birth must be between ${minDob} and ${maxDob}.`);
        return;
      }
    }

    // Validate Terms & Conditions confirmation
    if (!formData.confirmTerms) {
      setValidationError("You must confirm that you agree to all terms and conditions to proceed.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Assemble structured data payload
      const payload = {
        name: formData.studentName.trim(),
        email: formData.email.trim(),
        "Form Type": "Internship Registration",
        "Student Name": formData.studentName.trim(),
        "WhatsApp Contact": formData.contactNumber.trim(),
        "Email Address": formData.email.trim(),
        "College Name": formData.collegeName.trim(),
        "Preferable Elective": formData.elective,
        "Preferred Batch": formData.batch,
        "Department/Branch": formData.branch === "Other" ? `Other: ${formData.customBranch.trim()}` : formData.branch,
        "Year of Study": formData.year,
        "Date of Birth": formData.dob,
        "Residential Address": formData.address.trim(),
        "Internship Period": [
          formData.period1Month ? "1 Month - Offline & Hybrid" : "",
          formData.period3Month ? "3 Month - Offline & Hybrid" : ""
        ].filter(Boolean).join(", "),
        "Placement Support Interest": formData.placementInterest === "yes" ? "Yes" : "No",
        "Outcomes Acknowledged": "Live Project, Internship Certificate, Experience Letter, LOR",
        "Registration Date": new Date().toLocaleString()
      };

      const response = await fetch(
        formEndpoint,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit registration. Please try again.");
      }

      setSubmitStatus("success");
      window.scrollTo({ top: document.getElementById("registration-container").offsetTop - 80, behavior: "smooth" });
    } catch (err) {
      console.error("Registration submission error:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-blue-600 selection:text-white overflow-hidden relative">
      <SEO
        title={seoTitle}
        description={seoDesc}
        keywords={seoKeywords}
        canonicalUrl="https://coptercode.com/internship-registration"
        ogTitle={seoTitle}
        ogDescription={seoDesc}
      />

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marqueeUp {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(0, -50%, 0);
          }
        }
        @keyframes marqueeDown {
          0% {
            transform: translate3d(0, -50%, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        .marquee-up {
          animation: marqueeUp 50s linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }
        .marquee-down {
          animation: marqueeDown 50s linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }
        @keyframes marqueeLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .marquee-left {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: marqueeLeft 30s linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }
      `}} />

      {/* Background Glowing Mesh Gradient Spheres for Premium Glassmorphism */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-20 right-[-10%] w-[550px] h-[550px] rounded-full bg-blue-600/10 blur-[130px]" />
        <div className="absolute bottom-40 left-[-10%] w-[650px] h-[650px] rounded-full bg-indigo-600/10 blur-[140px]" />
        <div className="absolute top-[40%] left-[25%] w-[400px] h-[400px] rounded-full bg-violet-600/5 blur-[110px]" />
      </div>

      {/* 1:2 Ratio Split Hero Section */}
      <section className="w-full flex flex-col h-auto md:h-[95vh] md:min-h-[900px] relative z-20">
        {/* Upper Section (Ratio 1) */}
        <div
          className="pt-24 pb-12 md:pt-28 md:pb-8 md:h-[35%] md:min-h-[350px] lg:min-h-[380px] w-full relative flex items-center bg-cover bg-center overflow-hidden border-b border-slate-800"
          style={{ backgroundImage: `url('/mediafiles/Intern bg.png')` }}
        >
          {/* Dark overlay to soften background and ensure contrast */}
          <div className="absolute inset-0 bg-slate-950/45 z-0" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 w-full py-4">
            {/* Title & Subtitle left-aligned */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl md:max-w-2xl text-center md:text-left my-auto"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white leading-tight">
                {heroTitle}
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-white/90 font-semibold mt-3">
                {heroSubtitle}
              </p>
            </motion.div>

            {/* Welcome Card right-aligned */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-shrink-0 my-auto"
            >
              {preloaderData && (
                <div className="flex flex-col items-center justify-center text-center p-5 md:p-6 min-w-[200px] md:min-w-[240px] bg-white/70 hover:bg-white/80 transition-all duration-300 backdrop-blur-md rounded-2xl border border-white/60 shadow-md select-none">
                  {/* Logo */}
                  {preloaderData.logo && (
                    <img
                      src={preloaderData.logo}
                      alt="CopterCode Logo"
                      className="w-14 md:w-16 h-auto object-contain mb-3 drop-shadow-sm filter brightness-95"
                    />
                  )}

                  {/* Title Prefix */}
                  {preloaderData.titlePrefix && (
                    <h2 className="uppercase text-[8px] md:text-[9px] font-medium tracking-[0.25em] text-slate-500 mb-1 pl-[0.25em]">
                      {preloaderData.titlePrefix}
                    </h2>
                  )}

                  {/* Highlighted Title */}
                  {preloaderData.highlightedTitle && (
                    <h3 className="font-display text-sm md:text-base font-black tracking-wider text-slate-900 leading-tight mb-1 uppercase">
                      {preloaderData.highlightedTitle}
                    </h3>
                  )}

                  {/* Tagline */}
                  {preloaderData.tagline && (
                    <p className="uppercase text-[7px] md:text-[8px] font-bold tracking-[0.15em] text-slate-400 pl-[0.15em]">
                      {preloaderData.tagline}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Lower Section (Ratio 2) */}
        <div className="h-[50vh] md:h-[65%] md:min-h-[550px] w-full relative overflow-hidden bg-slate-950">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHomeImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <OptimizedImage
                src={headerImages[currentHomeImageIndex]}
                alt="CopterCode Facilities & Internships"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
          {/* Premium Gradient Overlay to fade the bottom of the slideshow */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950 z-10 pointer-events-none" />
        </div>
      </section>

      <main className="py-24 relative z-10" id="registration-container">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative">
          {/* Left Side Column */}
          {isXl && (
            <div className="hidden xl:flex absolute left-[-190px] top-0 bottom-0 w-72 overflow-hidden select-none pointer-events-none marquee-container justify-center">
              <div className="flex flex-col gap-y-8 marquee-up pointer-events-auto py-4">
                {leftMarqueeItems.map((item, idx) => (
                  <ScrollFadeCard key={idx} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* Right Side Column */}
          {isXl && (
            <div className="hidden xl:flex absolute right-[-190px] top-0 bottom-0 w-72 overflow-hidden select-none pointer-events-none marquee-container justify-center">
              <div className="flex flex-col gap-y-8 marquee-down pointer-events-auto py-4">
                {rightMarqueeItems.map((item, idx) => (
                  <ScrollFadeCard key={idx} item={item} />
                ))}
              </div>
            </div>
          )}

          <div className="max-w-3xl mx-auto space-y-16">

            {/* Description & Overview Card */}
            <motion.section
              initial={{ opacity: 0, y: 50, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/90 border border-white/40 shadow-xl backdrop-blur-md p-8 md:p-12 rounded-3xl space-y-8 text-slate-800"
            >
              <div className="space-y-4">
                <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 font-bold text-xs tracking-wider uppercase inline-block border border-blue-500/20 backdrop-blur-sm">
                  {overviewTag}
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 leading-tight">
                  {overviewTitle}
                </h2>
                <p className="text-xl font-bold text-slate-700">
                  {overviewGreeting}
                </p>
              </div>

              <div className="prose prose-slate max-w-none text-slate-600 space-y-6 leading-relaxed text-base md:text-lg font-medium">
                {sanityData?.overviewParagraphs ? (
                  sanityData.overviewParagraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))
                ) : (
                  <>
                    <p>
                      We are delighted to invite students from your esteemed institution to be part of the <strong className="text-blue-600 font-bold">CopterCode Winter Internship & Industry Orientation Program</strong>, scheduled during June and July 2026, conducted offline at the prestigious <strong className="text-blue-600 font-bold">IIT Madras Research Park, Chennai Venue</strong>.
                    </p>
                    <p>
                      It serves as a professional industry induction platform, where students will experience how global companies function, understand real job responsibilities, and work like industry interns inside a professional corporate environment.
                    </p>
                    <p>
                      Through this internship, students will be onboarded into real international engineering and technology environments, working on <strong className="text-blue-600 font-bold">Live Projects</strong> for companies in the <strong className="text-blue-600 font-bold">Netherlands</strong> and <strong className="text-blue-600 font-bold">Texas (USA)</strong>. They will gain hands-on exposure to corporate workflows, problem-solving practices, team collaboration methods, and global project execution standards, helping them transition confidently from campus to corporate with true industry readiness.
                    </p>
                  </>
                )}
              </div>

              <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-100 backdrop-blur-sm flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-blue-100 flex items-center justify-center text-blue-500 shadow-sm shrink-0">
                  <Sparkles size={20} className="animate-pulse" />
                </div>
                <p className="text-sm md:text-base text-slate-700 font-semibold italic leading-relaxed">
                  {overviewSupportNote}
                </p>
              </div>
            </motion.section>

            {/* Outcomes Visual Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-8 bg-blue-500 rounded-full" />
                <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white">
                  {outcomesTitle}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {outcomesList.map((outcome, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.02, translateY: -2 }}
                    className="p-6 rounded-2xl bg-white/90 border border-white/40 shadow-md hover:shadow-lg transition-all duration-300 flex items-start space-x-4 backdrop-blur-sm hover:border-blue-500/20"
                  >
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center shrink-0">
                      <CheckCircle size={22} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base md:text-lg">{outcome.title}</h4>
                      <p className="text-xs md:text-sm text-slate-500 font-semibold mt-1 leading-relaxed">{outcome.description || outcome.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Details & Channels */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-8 bg-blue-500 rounded-full" />
                <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white">
                  {supportTitle}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {supportChannels.map((contact, idx) => {
                  const IconComponent = typeof contact.icon === 'string'
                    ? (Lucide[contact.icon] || Lucide.Globe)
                    : (contact.icon || Lucide.Globe);

                  return (
                    <motion.a
                      key={idx}
                      href={contact.href}
                      target={contact.href.startsWith("http") ? "_blank" : undefined}
                      rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      initial={{ opacity: 0, y: 30, scale: 0.97 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ scale: 1.03, translateY: -3 }}
                      className="p-5 rounded-2xl bg-white/90 border border-white/40 shadow-md hover:shadow-xl transition-all duration-300 flex items-center space-x-4 backdrop-blur-sm hover:bg-white hover:border-blue-500/20 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-700 flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm">
                        <IconComponent size={20} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 group-hover:text-blue-600 transition-colors">{contact.label}</p>
                        <p className="text-sm font-bold text-slate-700 mt-1 truncate group-hover:underline">{contact.value}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Horizontal Carousel (visible below xl, when vertical carousels disappear) */}
            {!isXl && (
              <div className="xl:hidden w-full overflow-hidden select-none py-4 relative marquee-container mb-12">
                {/* Premium fading gradient overlays on the sides */}
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
                
                <div className="flex marquee-left">
                  {horizontalMarqueeItems.map((item, idx) => (
                    <ScrollFadeCard key={idx} item={item} />
                  ))}
                </div>
              </div>
            )}

            {/* Registration Form container */}
            <div className="max-w-4xl mx-auto relative" id="form-section">
              <AnimatePresence mode="wait">
                {submitStatus === "success" ? (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="p-8 md:p-12 rounded-3xl bg-white/90 border border-white/40 shadow-2xl backdrop-blur-xl text-center space-y-6"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-500 shadow-inner">
                      <FileCheck size={40} className="animate-bounce" />
                    </div>

                    <h3 className="text-3xl font-display font-extrabold text-slate-900">{successTitle}</h3>
                    <p className="text-slate-600 leading-relaxed font-semibold">
                      {successMessage.split("{name}").reduce((acc, part, idx, arr) => {
                        if (idx === arr.length - 1) return [...acc, part];
                        return [...acc, part, <strong key={idx}>{formData.studentName}</strong>];
                      }, [])}
                    </p>

                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-4 text-sm font-semibold text-slate-700">
                      <p className="font-extrabold text-slate-900 border-b border-slate-200 pb-2.5">{successSummaryTitle}</p>
                      <p><span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block mb-0.5">{successWhatsappLabel}</span> {formData.contactNumber}</p>
                      <p><span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block mb-0.5">{successEmailLabel}</span> {formData.email}</p>
                      <p><span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block mb-0.5">{successBranchLabel}</span> {formData.branch === "Other" ? formData.customBranch : formData.branch}</p>
                      <p><span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block mb-0.5">{successElectiveLabel}</span> {formData.elective.split(" - Venue")[0]}</p>
                      <p><span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block mb-0.5">{successBatchLabel}</span> {formData.batch}</p>
                    </div>

                    <p className="text-xs text-slate-500 font-semibold">
                      {successNote}
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSubmitStatus(null);
                        setFormData({
                          studentName: "",
                          contactNumber: "",
                          email: "",
                          collegeName: "",
                          elective: "Full Stack Developer & Software Developer With AI ML Intern - Venue : IIT Madras Rp",
                          batch: "June - July",
                          branch: "",
                          customBranch: "",
                          year: "3rd Year",
                          dob: "",
                          address: "",
                          period1Month: false,
                          period3Month: false,
                          placementInterest: "yes",
                          agreePayFee: false,
                          agreeHybridMode: false,
                          agreeNonRefundable: false,
                          agreeExtension: false,
                          confirmTerms: false
                        });
                      }}
                      className="w-full py-4 bg-blue-600 text-white font-extrabold rounded-2xl uppercase tracking-widest text-xs hover:bg-blue-500 transition-all shadow-md"
                    >
                      {successResetText}
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="registration-form"
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white/90 border border-white/40 shadow-2xl backdrop-blur-xl p-8 md:p-12 rounded-3xl relative space-y-8"
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-1.5 h-8 bg-blue-500 rounded-full" />
                      <h3 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900">
                        {formHeading}
                      </h3>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">

                      {/* Name input */}
                      <div className="group/field relative space-y-2.5">
                        <label htmlFor="studentName" className="block text-xs font-bold uppercase tracking-widest text-slate-700 transition-colors duration-300 group-focus-within/field:text-blue-600">
                          {nameLabel} <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within/field:text-blue-600 transition-colors duration-300">
                            <User size={18} />
                          </div>
                          <input
                            type="text"
                            id="studentName"
                            name="studentName"
                            required
                            disabled={isSubmitting}
                            placeholder={namePlaceholder}
                            className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 pl-12 pr-4 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all duration-300 rounded-2xl shadow-sm text-sm font-semibold"
                            value={formData.studentName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Contact & Email Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group/field relative space-y-2.5">
                          <label htmlFor="contactNumber" className="block text-xs font-bold uppercase tracking-widest text-slate-700 transition-colors duration-300 group-focus-within/field:text-blue-600">
                            {whatsappLabel} <span className="text-red-500 ml-0.5">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within/field:text-blue-600 transition-colors duration-300">
                              <Phone size={18} />
                            </div>
                            <input
                              type="tel"
                              id="contactNumber"
                              name="contactNumber"
                              required
                              disabled={isSubmitting}
                              placeholder={whatsappPlaceholder}
                              className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 pl-12 pr-4 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all duration-300 rounded-2xl shadow-sm text-sm font-semibold"
                              value={formData.contactNumber}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="group/field relative space-y-2.5">
                          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-slate-700 transition-colors duration-300 group-focus-within/field:text-blue-600">
                            {emailLabel} <span className="text-red-500 ml-0.5">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within/field:text-blue-600 transition-colors duration-300">
                              <Mail size={18} />
                            </div>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              disabled={isSubmitting}
                              placeholder={emailPlaceholder}
                              className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 pl-12 pr-4 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all duration-300 rounded-2xl shadow-sm text-sm font-semibold"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      {/* College Name */}
                      <div className="group/field relative space-y-2.5">
                        <label htmlFor="collegeName" className="block text-xs font-bold uppercase tracking-widest text-slate-700 transition-colors duration-300 group-focus-within/field:text-blue-600">
                          {collegeLabel} <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within/field:text-blue-600 transition-colors duration-300">
                            <Building size={18} />
                          </div>
                          <input
                            type="text"
                            id="collegeName"
                            name="collegeName"
                            required
                            disabled={isSubmitting}
                            placeholder={collegePlaceholder}
                            className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 pl-12 pr-4 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all duration-300 rounded-2xl shadow-sm text-sm font-semibold"
                            value={formData.collegeName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Internship Preferable Elective */}
                      <div className="space-y-4">
                        <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 flex items-center">
                          <BookOpen size={15} className="mr-2 text-slate-400" /> {electivesLabel} <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {electivesOptions.map((opt, idx) => {
                            const isSelected = formData.elective === opt.value;
                            return (
                              <label
                                key={idx}
                                className={`flex flex-col p-6 rounded-3xl border transition-all duration-300 cursor-pointer shadow-sm relative overflow-hidden group ${isSelected ? "bg-white border-blue-500 ring-4 ring-blue-500/5 shadow-md scale-[1.01]" : "bg-slate-50 border-slate-200 hover:bg-slate-100/50 hover:border-slate-300"}`}
                              >
                                <div className="flex items-start justify-between w-full z-10">
                                  <h4 className={`text-sm font-extrabold leading-tight ${isSelected ? "text-blue-600" : "text-slate-700 group-hover:text-slate-900"} transition-colors`}>{opt.title}</h4>
                                  <input
                                    type="radio"
                                    name="elective"
                                    disabled={isSubmitting}
                                    className="sr-only"
                                    value={opt.value}
                                    checked={isSelected}
                                    onChange={handleChange}
                                  />
                                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${isSelected ? "border-blue-600 bg-blue-600" : "border-slate-300 bg-slate-50"}`}>
                                    <AnimatePresence>
                                      {isSelected && (
                                        <motion.div
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          exit={{ scale: 0 }}
                                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                          className="w-2 h-2 rounded-full bg-white"
                                        />
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </div>
                                <p className="text-xs text-slate-500 mt-2.5 font-semibold leading-relaxed z-10">{opt.description || opt.desc}</p>
                                <div className="flex items-center space-x-1.5 mt-4 max-w-max z-10">
                                  <span className={`text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full transition-colors ${isSelected ? "bg-blue-500/10 text-blue-600" : "bg-slate-100 text-slate-500"}`}>{opt.venueBadge || "Venue: IIT Madras RP"}</span>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Preferred Batch selection */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 flex items-center">
                            <Clock size={15} className="mr-2 text-slate-400" /> {batchesLabel} <span className="text-red-500 ml-0.5">*</span>
                          </label>
                          <span className="text-[10px] text-slate-500 font-bold italic block mt-1">
                            {batchesNote}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {batchesOptions.map((opt, idx) => {
                            const isSelected = formData.batch === opt.value;
                            return (
                              <label
                                key={idx}
                                className={`flex items-center justify-between p-4 px-5 rounded-2xl border transition-all duration-300 cursor-pointer text-xs font-bold relative group ${isSelected ? "bg-white border-blue-500 shadow-sm text-slate-900 ring-4 ring-blue-500/5" : "bg-slate-50 border-slate-200 hover:bg-slate-100/50 hover:border-slate-300 text-slate-600 hover:text-slate-800"}`}
                              >
                                <span>{opt.label}</span>
                                <input
                                  type="radio"
                                  name="batch"
                                  disabled={isSubmitting}
                                  className="sr-only"
                                  value={opt.value}
                                  checked={isSelected}
                                  onChange={handleChange}
                                />
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${isSelected ? "border-blue-600 bg-blue-600" : "border-slate-300 bg-slate-50"}`}>
                                  <AnimatePresence>
                                    {isSelected && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        className="w-1.5 h-1.5 rounded-full bg-white"
                                      />
                                    )}
                                  </AnimatePresence>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Branch & Year Selection */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="group/field relative space-y-2.5">
                            <label htmlFor="branch" className="block text-xs font-bold uppercase tracking-widest text-slate-700 transition-colors duration-300 group-focus-within/field:text-blue-600">
                              {branchLabel} <span className="text-red-500 ml-0.5">*</span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within/field:text-blue-600 transition-colors duration-300">
                                <Building size={18} />
                              </div>
                              <select
                                id="branch"
                                name="branch"
                                required
                                disabled={isSubmitting}
                                className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 pl-12 pr-10 py-4 text-slate-900 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all duration-300 rounded-2xl shadow-sm text-sm font-semibold appearance-none cursor-pointer"
                                value={formData.branch}
                                onChange={handleChange}
                              >
                                <option className="bg-white text-slate-900" value="">{branchPlaceholder}</option>
                                {branchOptions.map((branch) => (
                                  <option className="bg-white text-slate-900" key={branch} value={branch}>
                                    {branch}
                                  </option>
                                ))}
                              </select>
                              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 group-focus-within/field:text-blue-600 transition-colors duration-300">
                                <ChevronDown size={18} />
                              </div>
                            </div>
                          </div>

                          {/* Dynamic Custom Branch input */}
                          <AnimatePresence>
                            {formData.branch === "Other" && (
                              <motion.div
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="group/field relative space-y-2.5 pt-2 overflow-hidden"
                              >
                                <label htmlFor="customBranch" className="block text-xs font-bold uppercase tracking-widest text-slate-700">
                                  {customBranchLabel} <span className="text-red-500 ml-0.5">*</span>
                                </label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within/field:text-blue-600 transition-colors duration-300">
                                    <Building size={18} />
                                  </div>
                                  <input
                                    type="text"
                                    id="customBranch"
                                    name="customBranch"
                                    required
                                    disabled={isSubmitting}
                                    placeholder={customBranchPlaceholder}
                                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 pl-12 pr-4 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all duration-300 rounded-2xl shadow-sm text-sm font-semibold"
                                    value={formData.customBranch}
                                    onChange={handleChange}
                                  />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <div className="group/field relative space-y-2.5">
                          <label htmlFor="year" className="block text-xs font-bold uppercase tracking-widest text-slate-700 transition-colors duration-300 group-focus-within/field:text-blue-600">
                            {yearLabel} <span className="text-red-500 ml-0.5">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within/field:text-blue-600 transition-colors duration-300">
                              <Calendar size={18} />
                            </div>
                            <select
                              id="year"
                              name="year"
                              required
                              disabled={isSubmitting}
                              className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 pl-12 pr-10 py-4 text-slate-900 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all duration-300 rounded-2xl shadow-sm text-sm font-semibold appearance-none cursor-pointer"
                              value={formData.year}
                              onChange={handleChange}
                            >
                              <option className="bg-white text-slate-900" value="">{yearPlaceholder}</option>
                              {yearOptions.map((yr) => (
                                <option className="bg-white text-slate-900" key={yr} value={yr}>
                                  {yr}
                                </option>
                              ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 group-focus-within/field:text-blue-600 transition-colors duration-300">
                              <ChevronDown size={18} />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Date of Birth */}
                      <div className="group/field relative space-y-2.5">
                        <label htmlFor="dob" className="block text-xs font-bold uppercase tracking-widest text-slate-700 transition-colors duration-300 group-focus-within/field:text-blue-600">
                          {dobLabel} <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within/field:text-blue-600 transition-colors duration-300">
                            <Calendar size={18} />
                          </div>
                          <input
                            type="date"
                            id="dob"
                            name="dob"
                            required
                            disabled={isSubmitting}
                            max={maxDob}
                            min={minDob}
                            className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 pl-12 pr-4 py-4 text-slate-900 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all duration-300 rounded-2xl shadow-sm text-sm font-semibold"
                            value={formData.dob}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Address */}
                      <div className="group/field relative space-y-2.5">
                        <label htmlFor="address" className="block text-xs font-bold uppercase tracking-widest text-slate-700 transition-colors duration-300 group-focus-within/field:text-blue-600">
                          {addressLabel} <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none text-slate-400 group-focus-within/field:text-blue-600 transition-colors duration-300">
                            <MapPin size={18} />
                          </div>
                          <textarea
                            id="address"
                            name="address"
                            rows="3"
                            required
                            disabled={isSubmitting}
                            placeholder={addressPlaceholder}
                            className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 pl-12 pr-4 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all duration-300 resize-none rounded-2xl shadow-sm text-sm font-semibold"
                            value={formData.address}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Internship & Project Period */}
                      <div className="space-y-4">
                        <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 flex items-center">
                          <Clock size={15} className="mr-2 text-slate-400" /> {periodLabel} <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {periodOptions.map((opt, idx) => {
                            const isChecked = formData[opt.name];
                            return (
                              <label
                                key={idx}
                                className={`flex items-center p-4 px-5 rounded-2xl border transition-all duration-300 cursor-pointer text-xs font-bold relative group ${isChecked ? "bg-white border-blue-500 shadow-sm text-slate-900 ring-4 ring-blue-500/5" : "bg-slate-50 border-slate-200 hover:bg-slate-100/50 hover:border-slate-300 text-slate-600 hover:text-slate-800"}`}
                              >
                                <input
                                  type="checkbox"
                                  name={opt.name}
                                  disabled={isSubmitting}
                                  className="sr-only"
                                  checked={isChecked}
                                  onChange={() => handleCheckboxGroup(opt.name)}
                                />
                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-300 shrink-0 mr-3 ${isChecked ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-slate-50 text-transparent"}`}>
                                  <AnimatePresence>
                                    {isChecked && (
                                      <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                      >
                                        <Check size={12} strokeWidth={3} />
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                                <span>{opt.label}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Placement Support Interest */}
                      <div className="space-y-4">
                        <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 flex items-center">
                          <HelpCircle size={15} className="mr-2 text-slate-400" /> {placementLabel} <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { value: "yes", label: placementOptionYes },
                            { value: "no", label: placementOptionNo }
                          ].map((opt, idx) => {
                            const isSelected = formData.placementInterest === opt.value;
                            return (
                              <label
                                key={idx}
                                className={`flex items-center justify-between p-4 px-5 rounded-2xl border transition-all duration-300 cursor-pointer text-xs font-bold relative group ${isSelected ? "bg-white border-blue-500 shadow-sm text-slate-900 ring-4 ring-blue-500/5" : "bg-slate-50 border-slate-200 hover:bg-slate-100/50 hover:border-slate-300 text-slate-600 hover:text-slate-800"}`}
                              >
                                <span>{opt.label}</span>
                                <input
                                  type="radio"
                                  name="placementInterest"
                                  disabled={isSubmitting}
                                  className="sr-only"
                                  value={opt.value}
                                  checked={isSelected}
                                  onChange={handleChange}
                                />
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${isSelected ? "border-blue-600 bg-blue-600" : "border-slate-300 bg-slate-50"}`}>
                                  <AnimatePresence>
                                    {isSelected && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        className="w-1.5 h-1.5 rounded-full bg-white"
                                      />
                                    )}
                                  </AnimatePresence>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Disclosures & Terms Checkboxes */}
                      <div className="space-y-5 pt-6 border-t border-slate-200/50">
                        <span className="block text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center">
                          <ShieldAlert size={16} className="mr-2 text-red-500 shrink-0" /> {termsLabel}
                        </span>

                        <div className="space-y-3.5 text-sm leading-relaxed text-slate-600 font-medium">
                          {sanityData?.formTerms?.disclosuresList ? (
                            termsDisclosures.map((text, idx) => (
                              <div key={idx} className="flex items-start p-4 bg-slate-50 border border-slate-200/60 rounded-2xl shadow-sm">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/20 mr-3 shrink-0" />
                                <span>{text}</span>
                              </div>
                            ))
                          ) : (
                            <>
                              <div className="flex items-start p-4 bg-slate-50 border border-slate-200/60 rounded-2xl shadow-sm">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/20 mr-3 shrink-0" />
                                <span>I understand and agree to pay <strong className="text-slate-900 font-bold">INR ₹6,990 + 18% applicable taxes</strong> towards the CopterCode International Live Project Internship & Training, which includes credentials and participation in the program.</span>
                              </div>
                              <div className="flex items-start p-4 bg-slate-50 border border-slate-200/60 rounded-2xl shadow-sm">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/20 mr-3 shrink-0" />
                                <span>I acknowledge that the internship will be conducted in hybrid mode (online and offline) under CopterCode at the venue <strong className="text-slate-900 font-extrabold">IIT Madras Research Park (RP)</strong>.</span>
                              </div>
                              <div className="flex items-start p-4 bg-slate-50 border border-slate-200/60 rounded-2xl shadow-sm">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/20 mr-3 shrink-0" />
                                <span>I agree that the fee is non-refundable under any circumstances.</span>
                              </div>
                              <div className="flex items-start p-4 bg-slate-50 border border-slate-200/60 rounded-2xl shadow-sm">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/20 mr-3 shrink-0" />
                                <span><strong>For the 3-Month Hybrid Internship:</strong> Based on performance, attendance, and project evaluation during the initial one-month internship phase, candidates may be considered for extension to the 3-month hybrid internship program.</span>
                              </div>
                            </>
                          )}

                          {/* Master Agreement Checkbox */}
                          <label className="flex items-start cursor-pointer transition-all duration-300 p-5 bg-emerald-50/80 hover:bg-emerald-50 border border-emerald-200/80 rounded-2xl mt-5 text-emerald-950 shadow-sm group">
                            <input
                              type="checkbox"
                              name="confirmTerms"
                              required
                              disabled={isSubmitting}
                              className="sr-only"
                              checked={formData.confirmTerms}
                              onChange={handleChange}
                            />
                            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300 mr-4 mt-0.5 shrink-0 group-hover:scale-105 ${formData.confirmTerms ? "bg-emerald-600 border-emerald-600 text-white" : "border-emerald-400 bg-white/50 text-transparent"}`}>
                              <AnimatePresence>
                                {formData.confirmTerms && (
                                  <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                  >
                                    <Check size={14} strokeWidth={3.5} />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                            <span className="font-extrabold leading-normal select-none">
                              {termsAgreement} <span className="text-red-500">*</span>
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Display validation error */}
                      <AnimatePresence>
                        {validationError && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-600 text-xs font-bold flex items-center">
                              <ShieldAlert size={18} className="mr-2.5 shrink-0" />
                              <span>{validationError}</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Display submit error status */}
                      <AnimatePresence>
                        {submitStatus === "error" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-600 text-xs font-bold flex items-center">
                              <ShieldAlert size={18} className="mr-2.5 shrink-0" />
                              <span>Failed to submit. Please check your network connection and try again.</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Action Button */}
                      <motion.button
                        id="submit-registration"
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.99 } : {}}
                        className="w-full py-4 bg-blue-600 text-white font-extrabold hover:bg-blue-500 transition-all duration-300 flex items-center justify-center rounded-2xl uppercase tracking-widest text-xs shadow-lg hover:shadow-xl disabled:opacity-75 disabled:cursor-not-allowed group text-center"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <span className="inline-block mr-2.5 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            {submittingText}
                          </span>
                        ) : (
                          <>
                            {submitText}
                            <ArrowRight
                              size={16}
                              className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                            />
                          </>
                        )}
                      </motion.button>

                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default InternshipRegistration;
