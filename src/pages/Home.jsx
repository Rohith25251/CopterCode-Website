import React, { useState, useEffect, useRef, useMemo } from 'react';
import YouTube from 'react-youtube';
import Hero from '../components/Hero';
import ImpactTabs from '../components/ImpactTabs';
import { ArrowRight, ChevronLeft, ChevronRight, Calendar, MapPin, Clock, Users, Zap, Globe, Heart, GraduationCap, Briefcase, Leaf, Shield, Code, Sun, Star, BarChart, FileText, PieChart, CheckCircle, Cpu, Server, Activity, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';
import LazyVideo from '../components/LazyVideo';
import { ASSETS } from '../constants/assets';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { client, urlFor } from '../lib/sanity';
import ScrollingAnnouncementBar from '../components/ScrollingAnnouncementBar';
import { iconComponentMap } from '../sanity/schemas/icons';

const FOOTPRINT_LOGOS = [
    "/_optimized/mediafiles/logos/Gemini_Generated_Image_1898qy1898qy1898.webp",
    "/_optimized/mediafiles/logos/Untitled design.webp",
    "/_optimized/mediafiles/logos/Untitled design (1).webp",
    "/_optimized/mediafiles/logos/Untitled design (2).webp",
    "/_optimized/mediafiles/logos/Untitled design (3).webp",
    "/_optimized/mediafiles/logos/Untitled design (4).webp",
    "/_optimized/mediafiles/logos/Untitled design (5).webp",
    "/_optimized/mediafiles/logos/Untitled design (6).webp",
    "/_optimized/mediafiles/logos/Untitled design (7).webp",
];

/* --- PERFORMANCE OPTIMIZATION --- */
// Hook for aggressive lazy loading with configurable threshold
const useVideoLazyLoad = (initialDelay = true) => {
    const [isReady, setIsReady] = useState(!initialDelay);
    const ref = useRef(null);

    useEffect(() => {
        if (!initialDelay) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsReady(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.05, rootMargin: '250px' } // Early trigger at 250px before visible
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [initialDelay]);

    return { ref, isReady };
};

/* --- FALLBACK DATA --- */
const getVideoId = (url) => {
    if (!url) return '';
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
};

const businessData = [
    {
        id: 'drones',
        title: "Industrial Drones & UAV",
        description: "We design and deploy advanced unmanned aerial vehicle solutions tailored for agriculture, surveillance, mapping, and industrial inspections.",
        video: ASSETS.VIDEOS.DRONES,
        link: "/business"
    },
    {
        id: 'digital',
        title: "Digital Services",
        description: "Accelerate your digital transformation with our comprehensive suite of services, from cloud architecture to custom software development.",
        video: ASSETS.VIDEOS.DIGITAL,
        link: "/business"
    },
    {
        id: 'energy',
        title: "New Energy & Materials",
        description: "Pioneering sustainable power solutions and advanced materials to drive the next generation of eco-friendly technology.",
        video: ASSETS.VIDEOS.ENERGY,
        link: "/business"
    },
    {
        id: 'erp',
        title: "ERP Software Solutions",
        description: "Streamline your enterprise operations with our robust, scalable, and intelligent ERP systems designed for modern businesses.",
        video: ASSETS.VIDEOS.ERP,
        link: "/business"
    },
    {
        id: 'retail',
        title: "Retail & Food Collaborations",
        description: "Revolutionizing supply chains and customer experiences in the retail and food sectors through automation and smart logistics.",
        video: ASSETS.VIDEOS.RETAIL,
        link: "/business"
    },
    {
        id: 'security',
        title: "Infra Security",
        description: "Protecting critical infrastructure with state-of-the-art surveillance, AI-driven threat detection, and secure communication networks.",
        video: ASSETS.VIDEOS.SECURITY,
        link: "/business"
    },
];

const FALLBACK_ANNOUNCEMENTS = [
    {
        title: "CopterCode Launches AI-Powered Drone Platform for Industrial Inspection",
        date: "15 AUG, 2025",
        type: "COPTERCODE UPDATE",
        img: "/mediafiles/news and media/IMG_3570.jpg"
    },
    {
        title: "Strategic Enterprise Partnership for Digital Transformation",
        date: "03 AUG, 2025",
        type: "COPTERCODE UPDATE",
        img: "/mediafiles/news and media/IMG_3327.jpg"
    },
    {
        title: "500+ Project Deliveries Milestone Across Global Markets",
        date: "12 JUL, 2025",
        type: "COPTERCODE UPDATE",
        img: "/mediafiles/news and media/IMG_3330.jpg"
    }
];

const FALLBACK_TESTIMONIALS = [
    { file: "sL9hIwhoIzs", title: "Transforming Agriculture" },
    { file: "VOFC_DNWuE8", title: "Empowering Logistics" },
    { file: "_SR4QEwEGOU", title: "Future of Surveillance" },
    { file: "01LJCJJA4HA", title: "Smart City Solutions" },
    { file: "yocM9dfk7Qo", title: "Next-Gen Robotics" },
    { file: "sb-F_VOUXiQ", title: "AI in Production" },
    { file: "HiNVgwZ0jS0", title: "Sustainable Tech" },
    { file: "BUr0TvQ2iGM", title: "Machine Learning Ops" },
    { file: "z2xubbbmArY", title: "Cloud Architecture" },
    { file: "e1imF7AmE4A", title: "Cyber Security" }
];

const FALLBACK_CINEMATIC = [
    { url: "/mediafiles/videos/industrial-drones-uav.mp4", label: "Industrial Drones & UAV" },
    { url: "/mediafiles/videos/digital-services.mp4", label: "Digital Services" },
    { url: "/mediafiles/videos/new-energy-materials.mp4", label: "New Energy & Materials" },
    { url: "/mediafiles/videos/erp-software-solutions.mp4", label: "ERP Software Solutions" },
    { url: "/mediafiles/videos/retail-food-collaborations.mp4", label: "Retail & Food Collaborations" },
    { url: "/mediafiles/videos/infra-security.mp4", label: "Infra Security" },
];

const PREVIEW_EVENTS = [
    {
        title: "Global Autonomous Systems Expo 2026",
        date: "Feb 28, 2026",
        location: "Singapore",
        category: "Exhibition",
        image: "/mediafiles/news and media/IMG_3570.jpg"
    },
    {
        title: "Code the Skies: National Hackathon",
        date: "Apr 15-17, 2026",
        location: "Chennai",
        category: "Hackathon",
        image: "/mediafiles/news and media/IMG_3365.jpg"
    },
    {
        title: "Aerospace Defense Summit",
        date: "May 12, 2026",
        location: "New Delhi",
        category: "Conference",
        image: "/mediafiles/news and media/IMG_3356.jpg"
    }
];

const PREVIEW_BENEFITS = [
    {
        icon: Zap,
        title: "Culture of Learning",
        description: "Continuous innovation and learning opportunities."
    },
    {
        icon: Globe,
        title: "Global Exposure",
        description: "Work on international projects across India and USA."
    },
    {
        icon: Heart,
        title: "Inclusive Workplace",
        description: "Diverse and inclusive environment for all."
    }
];

const SUSTAINABILITY_IMPACT = [
    { icon: Users, text: "Empowering people with inclusiveness" },
    { icon: Globe, text: "Collaborating globally for innovation" },
    { icon: Leaf, text: "Promoting sustainability & clean energy" },
    { icon: Code, text: "Building digital assets for the future" }
];

const INTERNSHIP_STATS = [
    { label: "Partner Colleges", value: "40+" },
    { label: "Students Trained", value: "500+" },
    { label: "Live Projects", value: "25+" }
];

const FALLBACK_SCROLLING_BAR = {
    isEnabled: true,
    announcements: [
        { text: "🚁 ENGINEERING THE FUTURE OF DRONE TECHNOLOGY", isHighlight: true, link: "/industrial-drones" },
        { text: "💼 NOW HIRING: SENIOR AI ENGINEERS", link: "/careers", isHighlight: false },
        { text: "🏭 EXPLORE OUR NEW INDUSTRIAL SOLUTIONS", link: "/business", isHighlight: false },
        { text: "📢 LATEST ACHIEVEMENTS, PARTNERSHIPS & INNOVATIONS", isHighlight: true, link: "/events" },
        { text: "🎓 JOIN OUR INTERNSHIP PROGRAM 2026", link: "/internship", isHighlight: false },
        { text: "🤝 GET IN TOUCH FOR CUSTOM ENTERPRISE SOLUTIONS", link: "/get-in-touch", isHighlight: false }
    ],
    scrollSpeed: 60,
    direction: 'left',
    backgroundColor: '#050505',
    textColor: '#ffffff'
};

let hasSeenDisclaimerGlobal = false;

const Home = () => {
    useScrollToTop(); // Force scroll to top on mount

    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [showAnnouncement, setShowAnnouncement] = useState(false);
    const [popupConfig, setPopupConfig] = useState({ isEnabled: true, delay: 2.5, imageUrl: null });

    // Fetch Sanity Popup Config
    useEffect(() => {
        const fetchPopupConfig = async () => {
            try {
                const query = `*[_type == "popupPage"][0]{
                    isEnabled,
                    delay,
                    "imageUrl": image.asset->url
                }`;
                const data = await client.fetch(query);
                if (data) {
                    setPopupConfig({
                        isEnabled: data.isEnabled !== false,
                        delay: typeof data.delay === 'number' ? data.delay : 2.5,
                        imageUrl: data.imageUrl || null
                    });
                }
            } catch (err) {
                console.error("Failed to fetch Sanity popup configuration:", err);
            }
        };
        fetchPopupConfig();
    }, []);

    // Popup Announcement logic: show only on load/reload, do not show on internal route changes
    useEffect(() => {
        if (!hasSeenDisclaimerGlobal && popupConfig.isEnabled) {
            const timer = setTimeout(() => {
                setShowAnnouncement(true);
            }, popupConfig.delay * 1000);
            return () => clearTimeout(timer);
        }
    }, [popupConfig]);

    const closeAnnouncement = () => {
        setShowAnnouncement(false);
        hasSeenDisclaimerGlobal = true;
    };
    const HACKATHON_CAROUSEL_IMAGES = [
        "/_optimized/mediafiles/hackathons/hackathon_drones.webp",
        "/_optimized/mediafiles/hackathons/hackathon_ai.webp",
        "/_optimized/mediafiles/hackathons/hackathon_blockchain.webp",
        "/_optimized/mediafiles/hackathons/hackathon_quantum.webp",
        "/_optimized/mediafiles/hackathons/hackathon_space_water.webp",
        "/_optimized/mediafiles/hackathons/hackathon_creative.webp"
    ];

    const [activeHackathonSlide, setActiveHackathonSlide] = useState(0);
    const [activeBusiness, setActiveBusiness] = useState(0);
    const [currentInternshipSlide, setCurrentInternshipSlide] = useState(0);
    const [homeData, setHomeData] = useState(null);
    const [voiceOfSuccessVisible, setVoiceOfSuccessVisible] = useState(false);
    const actionScrollRef = useRef(null);
    const businessContentRef = useRef(null); // Ref for business details
    const voiceOfSuccessRef = useRef(null); // Ref for Voice of Success section
    const youtubePlayerRef = useRef(null); // Ref for YouTube player instance

    // Mobile Business Click Handler
    const handleBusinessClick = (index) => {
        setActiveBusiness(index);
        if (window.innerWidth < 1024 && businessContentRef.current) {
            // Slight offset for sticky nav
            const navHeight = 80;
            const elementPosition = businessContentRef.current.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    // Fetch Sanity Data

    useEffect(() => {
        // Expand videoFile references and Image assets to get the actual URL
        const query = `*[_type == "homePage"][0]{
            ...,
            seo {
                ...,
                "metaImage": metaImage.asset->url
            },
            heroSection {
                ...,
                "heroImages": coalesce(heroImages[].asset->url, images[].asset->url, [])
            },
            aboutSummarySection {
                ...,
                "image": image.asset->url
            },
            investorSummarySection {
                ...,
                investors[]{
                    ...,
                    "logo": logo.asset->url
                }
            },
            businessesSection[]{
                title,
                description,
                videoType,
                videoUrl,
                _key,
                videoFile{
                  asset->{
                    url
                  }
                },
                link
            },
            cinematicShowcase[]{
                label,
                videoType,
                videoUrl,
                _key,
                videoFile{
                  asset->{
                    url
                  }
                }
            },
            advancedTechSection{
                statsValue,
                statsUnit,
                statsLabel,
                heading,
                videoType,
                videoUrl,
                videoFile{
                  asset->{
                    url
                  }
                }
            },
            testimonialsSection[]{
                title,
                videoType,
                videoUrlOrId,
                _key,
                videoFile{
                  asset->{
                    url
                  }
                }
            },
            upcomingEventsSection {
                ...,
                events[]{
                    ...,
                    "image": image.asset->url
                }
            },
            careersSection {
                ...,
                benefits[]{
                    ...
                }
            },
            internshipSection {
                ...,
                "image": image.asset->url,
                "images": images[].asset->url
            },
            sustainabilitySection {
                ...,
                "bannerImage": bannerImage.asset->url
            },
            articlesSection {
                ...,
                papers[]{
                    ...,
                    "image": image.asset->url
                }
            },
            ourPhilosophySection {
                ...,
                tabs[]{
                    ...
                }
            },
            scrollingAnnouncementBar {
                ...,
                announcements[]{
                    ...
                }
            },
            engineeringCommandCenterSection {
                ...,
                focusAreas[]{
                    ...
                },
                coreCapabilities[]{
                    ...
                }
            },
            whyChooseSection {
                ...,
                "quoteImage": quoteImage.asset->url,
                features[]{
                    ...
                },
                caseStudies[]{
                    ...,
                    stats[]{
                        ...
                    }
                }
            },
            hackathonShowcaseSection {
                ...,
                "featuredImage": featuredImage.asset->url,
                "carouselImages": carouselImages[].asset->url,
                highlights[]{
                    ...
                }
            },
            accreditationsSection {
                ...,
                "logos": logos[].asset->url
            }
        }`;

        client.fetch(query)
            .then((data) => {
                if (data) {
                    console.log('✅ Home page data loaded from Sanity');
                    console.log('   - Businesses:', data.businessesSection?.length || 0);
                    console.log('   - Cinematic videos:', data.cinematicShowcase?.length || 0);
                    console.log('   - Testimonials:', data.testimonialsSection?.length || 0);
                    console.log('   - Events:', data.upcomingEventsSection?.events?.length || 0);
                    console.log('   - Hackathon Carousel:', data.hackathonShowcaseSection?.carouselImages?.length || 0);
                    setHomeData(data);
                } else {
                    console.warn('⚠️ No home page data from Sanity - using fallbacks');
                    setHomeData(null);
                }
            })
            .catch(err => {
                console.error('❌ Error fetching home page:', err.message || err);
                setHomeData(null);
            });
    }, []);

    // Intersection Observer for Voice of Success Section - Auto play videos when scrolling to section
    useEffect(() => {
        const element = voiceOfSuccessRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVoiceOfSuccessVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    // Trigger video play when Voice of Success section becomes visible
    useEffect(() => {
        if (voiceOfSuccessVisible) {
            // Handle YouTube videos
            if (youtubePlayerRef.current && typeof youtubePlayerRef.current.playVideo === 'function') {
                setTimeout(() => {
                    youtubePlayerRef.current.playVideo();
                }, 200);
            }

            // Handle HTML5 videos
            if (voiceOfSuccessRef.current) {
                const videoElement = voiceOfSuccessRef.current.querySelector('video');
                if (videoElement) {
                    setTimeout(() => {
                        videoElement.play().catch(() => {
                            // Autoplay might be prevented by browser
                        });
                    }, 200);
                }
            }
        }
    }, [voiceOfSuccessVisible, currentTestimonial]);

    const scrollAction = (direction) => {
        if (actionScrollRef.current) {
            const { current } = actionScrollRef;
            const scrollAmount = 400; // Approx card width
            current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    // Prepare Data with Fallbacks
    // BUSINESSES
    const businesses = homeData?.businessesSection?.length > 0
        ? homeData.businessesSection.map((item, index) => {
            const videoFileUrl = item.videoFile?.asset?.url;
            const externalUrl = item.videoUrl;
            const video = videoFileUrl || externalUrl;
            console.log(`🏢 Home - Business ${index}: "${item.title}"`);
            console.log(`   📁 File URL: ${videoFileUrl || '(empty)'}`);
            console.log(`   🔗 External URL: ${externalUrl || '(empty)'}`);
            console.log(`   ✅ Using: ${video || '(FALLBACK)'}`);
            return {
                id: item._key || `biz-${index}`,
                title: item.title,
                description: item.description,
                // Prefer uploaded file URL, then external URL
                video: video,
                link: item.link
            };
        })
        : businessData;

    const currentBusiness = businesses[activeBusiness] || businesses[0];
    const businessHeading = "Our Businesses";

    // ANNOUNCEMENTS
    const announcements = homeData?.announcementsSection?.length > 0
        ? homeData.announcementsSection.map(item => ({
            title: item.title,
            date: item.date, // Assuming direct string usage or formatting required
            type: item.type,
            img: item.image ? urlFor(item.image).url() : ''
        }))
        : FALLBACK_ANNOUNCEMENTS;

    // CINEMATIC VIDEO SHOWCASE
    const cinematicVideos = homeData?.cinematicShowcase?.length > 0
        ? homeData.cinematicShowcase
            .map((item, idx) => {
                const videoFileUrl = item.videoFile?.asset?.url;
                const externalUrl = item.videoUrl;
                const url = videoFileUrl || externalUrl;
                console.log(`🎬 Cinematic ${idx}: "${item.label}"`);
                console.log(`   📁 File URL: ${videoFileUrl || '(empty)'}`);
                console.log(`   🔗 External URL: ${externalUrl || '(empty)'}`);
                console.log(`   ✅ Using: ${url || '(filtered out)'}`);
                return {
                    url: url,
                    label: item.label,
                    _key: item._key
                };
            })
            .filter(video => {
                if (!video.url) console.warn(`   ❌ Filtered out - no URL`);
                return video.url;
            }) // Only include items with a video URL
        : FALLBACK_CINEMATIC;

    // TESTIMONIALS
    const testimonials = homeData?.testimonialsSection?.length > 0
        ? homeData.testimonialsSection.map(item => {
            const videoFileUrl = item.videoFile?.asset?.url;
            const externalUrl = item.videoUrlOrId;
            const url = videoFileUrl || externalUrl;
            return {
                url: url,
                title: item.title
            };
        })
        : FALLBACK_TESTIMONIALS.map(t => ({
            url: t.file,
            title: t.title
        }));

    // Testimonial videos load immediately on page load
    const [testimonialVideoReady, setTestimonialVideoReady] = useState(true);

    // Advanced tech video loads immediately on page load
    const [advTechVideoReady, setAdvTechVideoReady] = useState(true);

    // Load cinematic videos on page load (no lazy loading) - play on hover
    const [cinematicVideoReady, setCinematicVideoReady] = useState(true);
    useEffect(() => {
        // Videos are loaded immediately on page load
        // They will play only on hover via onMouseEnter/onMouseLeave
        setCinematicVideoReady(true);
    }, []);

    // Dynamic Advanced Tech Variables
    const advTechStat = homeData?.advancedTechSection?.statsValue || "99";
    const advTechUnit = homeData?.advancedTechSection?.statsUnit || "%";
    const advTechLabel = homeData?.advancedTechSection?.statsLabel || "Operational Efficiency";
    const advTechHeading = homeData?.advancedTechSection?.heading || "Revolutionizing Logistics & Surveillance with AI-Powered Autonomous Drone Systems";
    const advTechVideo = homeData?.advancedTechSection?.videoFile?.asset?.url || homeData?.advancedTechSection?.videoUrl || "/mediafiles/videos/Home%20Advanced%20Technology.mp4";

    // Global Footprint Image
    const globalFootprintSrc = homeData?.globalFootprintImage
        ? urlFor(homeData.globalFootprintImage).url()
        : "/mediafiles/Where Do Our Interns Reached/placements-reach.png";

    // --- NEW SECTIONS DATA ---
    // Using centralized iconComponentMap from icons.js for consistency across the website

    // About Summary Fallback
    const aboutSummary = homeData?.aboutSummarySection || {
        heading: "Who We Are",
        subheading: "Pioneering the Future of Aerial Tech",
        description: "From humble generic beginnings to industry leadership, CopterCode has been at the forefront of drone innovation. We combine legacy excellence with futuristic vision.",
        image: "/mediafiles/news and media/IMG_1851.jpg",
        stats: [
            { value: "500+", label: "Projects Delivered" },
            { value: "50+", label: "Team Members" },
            { value: "3", label: "Global Offices" }
        ]
    };
    const aboutImage = homeData?.aboutSummarySection?.image ? urlFor(homeData.aboutSummarySection.image).url() : aboutSummary.image;

    // Investor Summary Fallback
    const investorSummary = homeData?.investorSummarySection || {
        heading: "Investor Relations",
        description: "Our commitment to sustainable growth and transparent governance ensures long-term value for our stakeholders. Join us on our journey of innovation.",
        highlights: [
            { title: "Financial Growth", description: "Consistent year-over-year revenue growth.", icon: "chart" },
            { title: "Governance", description: "Strong leadership and ethical practices.", icon: "shield" },
            { title: "Shareholder Info", description: "Stock information, dividend history, and shareholder services.", icon: "piechart" }
        ],
        investors: [
            {
                name: "MurgDur",
                logo: "/_optimized/mediafiles/logos/MurgDur-logo-CNKz8pTh.webp",
                description: "A leading venture capital firm focused on early-stage technology startups with high growth potential, supporting our vision since inception."
            },
            {
                name: "Karvensen",
                logo: "/_optimized/mediafiles/logos/KarVenSen-logo-9ePXpcco (1).webp",
                description: "A global investment group specializing in sustainable infrastructure and innovative industrial solutions, partnering for long-term strategic growth."
            }
        ]
    };

    const upcomingEvents = homeData?.upcomingEventsSection?.events || PREVIEW_EVENTS;

    const careerBenefits = homeData?.careersSection?.benefits?.map(b => ({
        ...b,
        icon: iconComponentMap[b.icon?.toLowerCase()] || Zap
    })) || PREVIEW_BENEFITS;

    const internshipStats = homeData?.internshipSection?.stats || INTERNSHIP_STATS;

    const sustainabilityImpact = homeData?.sustainabilitySection?.impactItems?.map(i => ({
        ...i,
        icon: iconComponentMap[i.icon?.toLowerCase()] || Leaf
    })) || SUSTAINABILITY_IMPACT;

    // Section Text Content
    const upcomingEventsHeading = homeData?.upcomingEventsSection?.heading || "Upcoming Events";

    const careerTagline = homeData?.careersSection?.tagline || "Join Our Elite Team";
    const careerHeading = homeData?.careersSection?.heading || "Build The Future With Us";
    const careerDesc = homeData?.careersSection?.description || "We are looking for passionate innovators to join our world-class team. Explore opportunities in Drone Tech, AI, and Engineering.";

    const internshipHeading = homeData?.internshipSection?.heading || "Internship Programme";
    const internshipDesc = homeData?.internshipSection?.description || "Empowering the next generation of innovators. Gain hands-on experience in Drone Tech, AI, and IoT with our intensive 3-month training program.";
    const internshipLink = homeData?.internshipSection?.applyLink || "/internship-registration";
    const internshipMainImage = homeData?.internshipSection?.image ? urlFor(homeData.internshipSection.image).url() : "/mediafiles/news and media/IMG_1851.jpg";
    const FALLBACK_INTERNSHIP_IMAGES = [
        "/mediafiles/Intern/A Devendhiran   -   Shree Sathyam College of Engineering And Technology   -  Fresher  -   Full Stack Developer.jpg",
        "/mediafiles/Intern/Aathi Lakshmi -  Mepco Schlenk Engineering College  -   Fresher  -   Drone Development Designer.jpg",
        "/mediafiles/Intern/Abinaya K  - KPR Institute of Engineering and Technology  -  Fresher Cloud Architect.jpg",
        "/mediafiles/Intern/Abinesh M  -  Shree Sathyam college of Engineering And Technology  -  Fresher  -   Full Stack Web Developer.jpg"
    ];
    const internshipImages = homeData?.internshipSection?.images?.length > 0
        ? homeData.internshipSection.images
        : FALLBACK_INTERNSHIP_IMAGES;

    // Auto-slide internship images
    useEffect(() => {
        if (internshipImages.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentInternshipSlide(prev => (prev + 1) % internshipImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [internshipImages]);

    // Hackathon carousel images (with fallback to default carousel)
    const hackathonCarouselImages = (homeData?.hackathonShowcaseSection?.carouselImages && homeData.hackathonShowcaseSection.carouselImages.length > 0)
        ? homeData.hackathonShowcaseSection.carouselImages
        : HACKATHON_CAROUSEL_IMAGES;

    // Auto-slide hackathon carousel
    useEffect(() => {
        if (hackathonCarouselImages.length <= 1) return;
        const interval = setInterval(() => {
            setActiveHackathonSlide(prev => (prev + 1) % hackathonCarouselImages.length);
        }, 3000); // Change image every 3 seconds
        return () => clearInterval(interval);
    }, [hackathonCarouselImages]);

    const sustainabilityHeading = homeData?.sustainabilitySection?.heading || "Sustainability & CSR";
    const sustainabilityDesc = homeData?.sustainabilitySection?.description || "We are committed to building societal and business value together. Driving sustainable growth across all operations while empowering communities through innovation and care.";
    const sustainabilityBanner = homeData?.sustainabilitySection?.bannerImage ? urlFor(homeData.sustainabilitySection.bannerImage).url() : "/mediafiles/news and media/IMG_3979.jpg";

    const FALLBACK_ARTICLES = [
        {
            category: "Swarm Intelligence",
            title: "Decentralized Swarm Collision Avoidance Algorithms for Multi-UAV Systems",
            authors: "Karthikeyan Sundharesan, R. Srinivasan",
            description: "A decentralized navigation framework utilizing optical flow and UWB distance telemetry for high-accuracy obstacle avoidance inside warehouses and GPS-denied environments.",
            image: "/mediafiles/news and media/IMG_1699.jpg",
            link: "/articles"
        },
        {
            category: "AI & Vision",
            title: "Real-Time Embedded Computer Vision for Crop Health Analysis",
            authors: "Karthikeyan Sundharesan, M. Lakshmi",
            description: "A model-compression workflow deploying lightweight MobileNet backbones on embedded flight-controllers for dynamic crop classification and yield analysis.",
            image: "/mediafiles/news and media/IMG_3330.jpg",
            link: "/articles"
        },
        {
            category: "Cybersecurity",
            title: "A Blockchain-Secure Telemetry Log and Control Protocol for Commercial UAV Fleets",
            authors: "Karthikeyan Sundharesan, A. K. Verma",
            description: "Securing control-link signals and flight logger boxes against replay and spoofing attacks through smart contracts and cryptographic ledgers.",
            image: "/mediafiles/news and media/IMG_3322.jpg",
            link: "/articles"
        }
    ];

    const articlesSection = homeData?.articlesSection;
    const articlesHeading = articlesSection?.heading || "Essence of Research";
    const articlesSubheading = articlesSection?.subheading || "Scientific Publications & Innovations";
    const articlesDescription = articlesSection?.description || "Delve into our peer-reviewed papers, engineering frameworks, and technical breakthroughs driving the future of autonomous systems and edge AI.";
    const articlesPapers = articlesSection?.papers?.length > 0
        ? articlesSection.papers.map(p => ({
            category: p.category || "Research",
            title: p.title || "Research Paper",
            authors: p.authors || "Karthikeyan Sundharesan",
            description: p.description || "",
            image: p.image || "/mediafiles/news and media/IMG_1699.jpg",
            link: p.link || "/articles"
        }))
        : FALLBACK_ARTICLES;

    // --- NEW SECTIONS DATA (Manual / Static Fallback) ---
    const WHY_CHOOSE_DATA = homeData?.whyChooseSection || {
        heading: "Why Choose CopterCode?",
        description: "At CopterCode, we specialize in Deep-Tech Innovation. We bridge the gap between hardware and software by integrating Autonomous Industrial Drones with Defense-Grade Cybersecurity. From custom ERP Software Solutions to cutting-edge Digital Services, our ecosystem is built for high-stakes precision and scalability.",
        features: [
            { title: "Industrial Aerial Intelligence", description: "Autonomous UAV systems designed for heavy-duty surveillance and logistics." },
            { title: "Defense-Grade Cybersecurity", description: "Next-gen threat detection and digital asset protection standards." },
            { title: "Integrated ERP Ecosystems", description: "Seamless business process management for enterprise efficiency." },
            { title: "Infrastructure & Physical Security", description: "Convergence of physical and digital security for critical infrastructure." },
            { title: "Sustainable Energy Innovation", description: "Net-zero vision driving energy-efficient and material innovations." },
            { title: "Strategic R&D Partnerships", description: "Collaborations with top research hubs (IIT Madras Research Park) for rapid prototyping." }
        ],
        caseStudies: [
            {
                title: "Smart Agriculture Deployment",
                subtitle: "Autonomous UAVs for precision farming and large-scale surveys.",
                stats: [
                    { value: "500+", label: "Farms Covered" },
                    { value: "30%", label: "Yield Efficiency" },
                    { value: "100%", label: "Auto-Piloted" }
                ]
            },
            {
                title: "Leonix Industrial IoT Transformation",
                subtitle: "Digital overhaul for a leading industrial automation provider.",
                stats: [
                    { value: "47%", label: "Organic Traffic Growth" },
                    { value: "45%", label: "Higher Engagement" },
                    { value: "Real-time", label: "Data Sync" }
                ]
            }
        ]
    };

    const COMMAND_CENTER_DATA = homeData?.engineeringCommandCenterSection || {
        heading: "ENGINEERING COMMAND CENTER.",
        subtext: "Where industrial automation meets enterprise software intelligence. We architect scalable drone ecosystems, enterprise-grade ERP platforms, and intelligent digital infrastructures engineered for real-world impact.",
        focusAreas: [
            { title: "Industrial Drone Systems", description: "Autonomous UAV solutions for surveillance, mapping, inspection & defense applications." },
            { title: "Enterprise Software Engineering", description: "Custom ERP platforms, business automation systems & scalable SaaS architectures." },
            { title: "AI & Intelligent Automation", description: "Predictive analytics, machine learning integration & process intelligence." },
            { title: "Infrastructure & Security Systems", description: "Smart monitoring, industrial safety frameworks & secured digital environments." }
        ],
        coreCapabilities: [
            { title: "Autonomous Systems Engineering", description: "UAV architecture, flight intelligence & real-time control systems." },
            { title: "Enterprise ERP Development", description: "Scalable, secure & modular ERP ecosystems for industrial operations." },
            { title: "AI & Data Intelligence", description: "Predictive modeling, operational analytics & intelligent automation." },
            { title: "Digital Infrastructure Engineering", description: "Secure cloud deployments, performance optimization & resilient architectures." }
        ],
        infoCard: {
            engineersCount: "50+",
            status: "INNOVATION LAB ACTIVE"
        }
    };


    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };



    return (
        <div className="bg-background text-primary selection:bg-accent selection:text-white">
            <AnimatePresence>
                {showAnnouncement && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeAnnouncement}
                        className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-pointer"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-[90vw] sm:max-w-[480px] md:max-w-[550px] aspect-square rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10"
                            style={{ willChange: "transform, opacity" }}
                        >
                            <button
                                onClick={closeAnnouncement}
                                className="absolute top-4 right-4 bg-black/60 hover:bg-black/95 text-white rounded-full p-2.5 backdrop-blur-md transition-all duration-300 z-50 hover:scale-110 shadow-lg border border-white/10 cursor-pointer"
                                aria-label="Close Announcement"
                            >
                                <X size={18} strokeWidth={2.5} />
                            </button>
                            <img
                                src={popupConfig.imageUrl || "/_optimized/announcement.webp"}
                                alt="Announcement"
                                className="w-full h-full object-cover select-none pointer-events-none"
                                loading="eager"
                                decoding="async"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <SEO
                title={homeData?.seo?.metaTitle || "CopterCode | Drone Tech, AI & Digital Solutions"}
                description={homeData?.seo?.metaDescription || "CopterCode delivers cutting-edge drone technology, AI automation, ERP systems, digital services, cybersecurity, sustainable energy, and innovative tech solutions."}
                keywords={homeData?.seo?.keywords || "drone technology, AI automation, ERP systems, digital services, cybersecurity, industrial drones, enterprise software, innovation"}
                ogImage={homeData?.seo?.metaImage || homeData?.heroSection?.heroImages?.[0] || "/mediafiles/Home/IMG_1851.jpg"}
            />

            {/* Hero & Announcement Bar Viewport wrapper to fit exactly 100vh on load */}
            <div className="flex flex-col min-h-[calc(100vh-var(--nav-height))] min-h-[calc(100dvh-var(--nav-height))]">
                <Hero data={homeData?.heroSection || null} />
                <ScrollingAnnouncementBar data={homeData?.scrollingAnnouncementBar || FALLBACK_SCROLLING_BAR} />
            </div>

            {/* --- WHO WE ARE (Redesigned) --- */}
            <section className="py-24 lg:py-32 bg-surface text-primary relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 transform origin-top-right z-0 pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        {/* Text Content */}
                        <div className="w-full lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                {/* Badge/Label */}
                                <div className="inline-flex items-center space-x-3 mb-8">
                                    <span className="w-12 h-[2px] bg-accent"></span>
                                    <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs">
                                        {aboutSummary.heading}
                                    </span>
                                </div>

                                <h2 className="text-4xl md:text-6xl font-display font-medium text-primary mb-8 leading-[1.1]">
                                    {aboutSummary.subheading}
                                </h2>

                                <p className="text-xl text-secondary leading-relaxed font-light mb-12 border-l-4 border-accent pl-6">
                                    {aboutSummary.description}
                                </p>

                                {/* Modern Stats Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
                                    {aboutSummary.stats && aboutSummary.stats.map((stat, idx) => (
                                        <div key={idx} className="group cursor-default">
                                            <h4 className="text-4xl md:text-5xl font-display font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                                                {stat.value}
                                            </h4>
                                            <p className="text-xs uppercase tracking-wider text-secondary font-semibold group-hover:tracking-widest transition-all duration-300">
                                                {stat.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <Link to="/about" className="group inline-flex items-center px-10 py-5 bg-primary text-white rounded-full hover:bg-accent transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                                    <span className="font-bold tracking-wide">Read Our Story</span>
                                    <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
                                </Link>
                            </motion.div>
                        </div>

                        {/* Image Content */}
                        <div className="w-full lg:w-1/2 relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative z-10"
                            >
                                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] relative">
                                    {aboutImage ? (
                                        <OptimizedImage src={aboutImage} alt="About CopterCode" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">Image not available</div>
                                    )}

                                    {/* Glassmorphic Overlay Card */}
                                    <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/40 hidden md:flex items-center justify-between">
                                        <div>
                                            <p className="text-primary font-bold text-lg mb-1">Innovation First</p>
                                            <p className="text-xs text-secondary font-medium uppercase tracking-wider">Leading the drone revolution since 2018</p>
                                        </div>
                                        <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center shadow-md">
                                            <Zap size={24} fill="currentColor" />
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative Elements behind image */}
                                <div className="absolute top-8 -right-8 w-full h-full bg-accent/5 rounded-[2.5rem] -z-10 rotate-3 border border-accent/10"></div>
                                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Businesses Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.0 }}
                className="py-0 relative"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[800px]">
                    <div ref={businessContentRef} className="bg-white border-r border-border p-6 lg:p-12 xl:p-24 flex flex-col justify-center relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeBusiness}
                                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                transition={{ duration: 0.0, ease: "circOut" }}
                                className="relative z-10 flex flex-col items-start"
                            >
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0, duration: 0.4, ease: "easeOut" }}
                                    className="text-secondary bg-white font-bold tracking-[0.2em] uppercase text-xs mb-6 block flex items-center"
                                >
                                    <span className="w-2 h-2 bg-accent mr-2 rotate-45"></span>
                                    {businessHeading}
                                </motion.span>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
                                    className="text-4xl md:text-5xl lg:text-7xl font-display font-bold leading-tight mb-8 text-primary"
                                >
                                    {currentBusiness.title.split('&')[0]} <br />
                                    <span className="text-primary/70">
                                        {currentBusiness.title.includes('&') ? '& ' + currentBusiness.title.split('&')[1] : ''}
                                    </span>
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                                    className="text-base md:text-lg text-secondary leading-relaxed mb-12 w-full md:max-w-xl"
                                >
                                    {currentBusiness.description}
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                                >
                                    <Link to={currentBusiness.link || "/business"} className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-300 font-semibold tracking-wide shadow-xl hover:-translate-y-1">
                                        read more <ArrowRight className="ml-2" />
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="bg-surface relative flex flex-col justify-center border-l border-border">
                        <div className="absolute inset-0 overflow-hidden">
                            <AnimatePresence mode="wait">
                                {(() => {
                                    const videoSrc = currentBusiness.video;
                                    const potentialId = getVideoId(videoSrc);
                                    // Check if it's likely a YouTube ID/URL and NOT a direct file URL
                                    const isYoutube = /^[a-zA-Z0-9_-]{11}$/.test(potentialId) && !videoSrc?.match(/\.(mp4|webm|ogg)$/i);

                                    if (isYoutube) {
                                        return (
                                            <motion.div
                                                key={videoSrc}
                                                initial={{ opacity: 0, scale: 1.1 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 1.2, ease: "circOut" }}
                                                className="w-full h-full absolute inset-0"
                                            >
                                                <YouTube
                                                    videoId={potentialId}
                                                    opts={{
                                                        height: '100%',
                                                        width: '100%',
                                                        playerVars: {
                                                            autoplay: 1,
                                                            mute: 1,
                                                            controls: 0,
                                                            loop: 1,
                                                            playlist: potentialId,
                                                            modestbranding: 1,
                                                            rel: 0
                                                        }
                                                    }}
                                                    className="w-full h-full pointer-events-none"
                                                    iframeClassName="w-full h-full object-cover"
                                                />
                                            </motion.div>
                                        );
                                    } else {
                                        return (
                                            <LazyVideo
                                                eager={true}
                                                key={videoSrc}
                                                src={videoSrc}
                                                className="w-full h-full object-cover"
                                                autoPlay={true}
                                                loop={true}
                                                muted={true}
                                                playsInline={true}
                                            />
                                        );
                                    }
                                })()}
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-gradient-to-l from-surface via-surface/30 to-transparent" />
                        </div>
                        <div className="relative z-10 pl-12 pr-6">
                            <div className="space-y-0">
                                {businesses.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleBusinessClick(index)}
                                        className="group border-b border-primary/10 py-8 pl-8 transition-all duration-300 hover:bg-white/50 cursor-pointer relative overflow-hidden"
                                    >
                                        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-accent transition-transform duration-300 ${index === activeBusiness ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'}`} />
                                        <h3 className={`text-xl font-bold tracking-wide uppercase transition-colors ${index === activeBusiness ? 'text-primary scale-105 origin-left' : 'text-primary/40 group-hover:text-primary'}`}>
                                            {item.title}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* UPCOMING EVENTS SECTION (New) */}
            <section className="py-24 bg-background border-t-2 border-b-2 border-blue-500/60 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
                        <div>
                            <span className="inline-flex items-center gap-2 border-2 border-blue-500/60 bg-blue-500/5 rounded-full px-4 py-2 mb-4 w-fit backdrop-blur-sm text-[10px] font-bold tracking-[0.18em] text-blue-700 uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                Connect With Us
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary">
                                {upcomingEventsHeading}
                            </h2>
                        </div>
                        <Link to="/events" className="hidden md:flex items-center text-primary font-bold hover:text-accent transition-colors mt-6 md:mt-0">
                            View All Events <ArrowRight className="ml-2" size={20} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {upcomingEvents.map((event, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                                whileHover={{ y: -10 }}
                                className="group relative bg-surface rounded-2xl overflow-hidden border-2 border-blue-500/60 hover:border-blue-500 shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10" />
                                    <OptimizedImage
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        sizes="(min-width:1024px) 33vw, 100vw"
                                    />
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="bg-background/90 backdrop-blur text-blue-700 text-xs font-bold px-3 py-1 rounded-full border-2 border-blue-500/60">
                                            {event.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center text-accent text-xs font-bold uppercase tracking-widest mb-3">
                                        <Calendar size={14} className="mr-2" />
                                        {event.date}
                                    </div>
                                    <h3 className="text-xl font-bold text-primary mb-3 leading-snug group-hover:text-accent transition-colors">
                                        {event.title}
                                    </h3>
                                    <div className="flex items-center text-secondary text-sm">
                                        <MapPin size={14} className="mr-2" />
                                        {event.location}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-10 md:hidden flex justify-center">
                        <Link to="/events" className="flex items-center text-primary font-bold hover:text-accent transition-colors">
                            View All Events <ArrowRight className="ml-2" size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Essentials Video Showcase (Service Showcase) */}
            <motion.section
                data-cinematic-showcase
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="py-24 bg-surface border-y border-border"
            >
                <div className="container mx-auto px-6 mb-8 flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-display font-medium mb-2 text-primary">CopterCode In Action</h2>
                        <div className="w-12 h-1 bg-accent rounded-full"></div>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => scrollAction('left')}
                            className="p-3 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all text-primary"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => scrollAction('right')}
                            className="p-3 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all text-primary"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div
                    ref={actionScrollRef}
                    className="flex overflow-x-auto gap-6 px-6 pb-12 snap-x snap-mandatory scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {cinematicVideos.map((video, idx) => {
                        const potentialId = getVideoId(video.url);
                        const isYoutube = /^[a-zA-Z0-9_-]{11}$/.test(potentialId) && !video.url?.match(/\.(mp4|webm|ogg)$/i);

                        return (
                            <motion.div
                                key={video._key || idx}
                                whileHover={{ y: -5 }}
                                onMouseEnter={(e) => {
                                    if (!isYoutube) {
                                        const video = e.currentTarget.querySelector('video');
                                        if (video) {
                                            video._playPromise = video.play();
                                            if (video._playPromise !== undefined) {
                                                video._playPromise.catch(() => { });
                                            }
                                        }
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isYoutube) {
                                        const video = e.currentTarget.querySelector('video');
                                        if (video) {
                                            if (video._playPromise !== undefined) {
                                                video._playPromise.then(() => {
                                                    video.pause();
                                                }).catch(() => { });
                                            } else {
                                                video.pause();
                                            }
                                        }
                                    }
                                }}
                                className="min-w-[85vw] md:min-w-[450px] aspect-[16/9] bg-surface-highlight rounded-3xl overflow-hidden relative group snap-center border border-border shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                {isYoutube ? (
                                    <div className="w-full h-full pointer-events-none">
                                        <YouTube
                                            videoId={potentialId}
                                            opts={{
                                                height: '100%',
                                                width: '100%',
                                                playerVars: {
                                                    autoplay: 0,
                                                    mute: 1,
                                                    controls: 0,
                                                    loop: 1,
                                                    playlist: potentialId,
                                                    modestbranding: 1,
                                                    rel: 0
                                                }
                                            }}
                                            className="w-full h-full absolute inset-0"
                                            iframeClassName="w-full h-full object-cover"
                                            onReady={(event) => {
                                                // Store reference but don't play until hover
                                                event.target.setVolume(0);
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <video
                                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 scale-100 group-hover:scale-105 transition-transform"
                                        loop
                                        muted
                                        playsInline
                                        crossOrigin="anonymous"
                                        preload="metadata"
                                        webkit-playsinline="true"
                                        onError={(e) => console.error(`Video load error for ${video.label}:`, e)}
                                    >
                                        <source src={video.url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                                <div className="absolute bottom-6 left-6 z-20">
                                    <span className="bg-black/40 backdrop-blur-md text-white border border-white/20 px-4 py-2 rounded-lg text-xs font-extrabold uppercase tracking-widest shadow-lg">
                                        {video.label}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.section>

            {/* CAREERS SECTION (Enhanced) */}
            <section className="py-24 bg-[#020617] text-white relative overflow-hidden border-y border-slate-900">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-block px-4 py-2 bg-blue-950/40 text-blue-400 text-xs font-bold tracking-[0.15em] uppercase rounded-lg border border-blue-900/50 mb-6 backdrop-blur-sm">
                            {careerTagline}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                            {(() => {
                                if (careerHeading.toLowerCase().includes("coptercode")) {
                                    const parts = careerHeading.split(/(coptercode)/i);
                                    return parts.map((part, index) =>
                                        part.toLowerCase() === "coptercode"
                                            ? <span key={index} className="text-blue-400">{part}</span>
                                            : part
                                    );
                                }
                                return careerHeading;
                            })()}
                        </h2>
                        <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-normal max-w-2xl mx-auto">
                            {careerDesc}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {careerBenefits.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-8 rounded-3xl border border-slate-800 bg-[#080f25]/40 shadow-xl hover:shadow-2xl hover:border-blue-500/40 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm"
                            >
                                <div className="w-16 h-16 mb-6 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-500">
                                    <item.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link to="/careers" className="relative inline-flex group">
                            <span className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-[#020617] transition-all duration-200 bg-white hover:bg-slate-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white shadow-xl hover:shadow-2xl">
                                Explore Careers <Briefcase className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Announcements / Insights Section (Renamed) */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="py-24 bg-background text-primary relative border-t border-border"
            >
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
                        <div>
                            <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                                Stay Updated
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-medium text-primary">Automation & Bio-Medical Insights</h2>
                        </div>
                        <Link to="/news" className="hidden md:flex items-center text-primary font-bold hover:text-accent transition-colors mt-6 md:mt-0">
                            Read More News <ArrowRight className="ml-2" size={20} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {announcements.map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="group cursor-pointer bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 border border-border"
                            >
                                <div className="aspect-video bg-surface mb-6 overflow-hidden relative rounded-xl">
                                    <OptimizedImage src={item.img} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" alt={item.title} sizes="(min-width:1024px) 33vw, 100vw" />
                                </div>
                                <div className="border-l-2 border-accent pl-6 py-1 mb-6">
                                    <h3 className="text-xl font-bold leading-snug text-primary group-hover:text-accent transition-colors">
                                        {item.title}
                                    </h3>
                                </div>
                                <div className="flex items-center text-xs font-bold tracking-widest text-secondary uppercase space-x-3">
                                    <span className="bg-surface px-3 py-1 rounded-sm">{item.type}</span>
                                    <span className="text-border">|</span>
                                    <span className="text-secondary/70">{item.date}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* --- INVESTOR SUMMARY (New) --- */}
            <section className="py-24 bg-[#FAF9F5] relative overflow-hidden border-t border-border">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                            Corporate Governance
                        </span>
                        <h2 className="text-4xl md:text-5xl font-display font-medium text-primary mb-6">
                            {investorSummary.heading}
                        </h2>
                        <p className="text-xl text-secondary leading-relaxed font-light">
                            {investorSummary.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {investorSummary.highlights && investorSummary.highlights.map((item, idx) => {
                            const Icon = iconComponentMap[item.icon?.toLowerCase()] || BarChart;
                            return (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -5 }}
                                    className="bg-white p-8 rounded-2xl shadow-sm border border-border hover:shadow-xl hover:border-accent/30 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 bg-accent/5 rounded-full flex items-center justify-center text-accent mb-6">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                                    <p className="text-secondary text-sm leading-relaxed">{item.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Our Investors Subsection */}
                    {investorSummary.investors && investorSummary.investors.length > 0 && (
                        <div className="mb-16">
                            <div className="text-center mb-10">
                                <h3 className="text-3xl font-display font-medium text-primary inline-block relative pb-4">
                                    Our Investors
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full"></span>
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                {investorSummary.investors.map((investor, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -8 }}
                                        className="bg-[#030712] p-8 rounded-3xl shadow-[0_0_30px_rgba(59,130,246,0.25)] border border-blue-500/30 hover:border-blue-500/60 hover:shadow-[0_0_45px_rgba(59,130,246,0.45)] transition-all duration-500 text-center flex flex-col items-center h-full"
                                    >
                                        <div className="w-24 h-24 bg-slate-900 border border-slate-800/80 rounded-2xl flex items-center justify-center mb-6 shadow-inner overflow-hidden p-4">
                                            <img src={investor.logo} alt={investor.name} className="w-full h-full object-contain" />
                                        </div>
                                        <h4 className="text-xl font-bold text-white mb-4">{investor.name}</h4>
                                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">{investor.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="text-center">
                        <Link to="/investors" className="inline-flex items-center text-primary font-bold border-b-2 border-accent pb-1 hover:text-accent transition-colors">
                            Visit Investor Relations <ArrowRight className="ml-2" size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Advanced Technology Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-6 block flex items-center">
                            <div className="w-8 h-px bg-secondary mr-3"></div>
                            {"Advanced Technology"}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-display font-normal text-primary mb-8 leading-tight">
                            {advTechHeading}
                        </h2>

                        <div className="mb-12">
                            <div className="flex items-end mb-2">
                                <span className="text-4xl md:text-6xl font-bold text-primary">{advTechStat}</span>
                                <span className="text-2xl md:text-3xl font-bold text-primary mb-2">{advTechUnit}</span>
                            </div>
                            <h4 className="text-2xl text-secondary font-medium mb-1">{advTechLabel}</h4>
                        </div>
                    </div>

                    <div className="relative" data-advanced-tech-video>
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-border relative shadow-2xl bg-surface flex items-center justify-center">
                            {(() => {
                                if (!advTechVideo) {
                                    return <div className="w-full h-full bg-surface flex items-center justify-center text-secondary">Video not available</div>;
                                }

                                const potentialId = getVideoId(advTechVideo);
                                const isYoutube = /^[a-zA-Z0-9_-]{11}$/.test(potentialId);

                                if (isYoutube && !advTechVideo?.includes('pexels')) {
                                    return (
                                        <div className="w-full h-full absolute inset-0">
                                            <YouTube
                                                videoId={potentialId}
                                                opts={{
                                                    height: '100%',
                                                    width: '100%',
                                                    playerVars: {
                                                        autoplay: 1,
                                                        mute: 1,
                                                        controls: 0,
                                                        loop: 1,
                                                        playlist: potentialId,
                                                        modestbranding: 1,
                                                        rel: 0
                                                    },
                                                }}
                                                className="w-full h-full"
                                                iframeClassName="w-full h-full object-cover"
                                            />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <>
                                            <video
                                                key={advTechVideo}
                                                autoPlay={true}
                                                loop
                                                muted
                                                playsInline
                                                crossOrigin="anonymous"
                                                preload="auto"
                                                className="w-full h-full object-cover absolute inset-0"
                                                onLoadedData={() => console.log('Video loaded:', advTechVideo)}
                                                onError={(e) => {
                                                    const video = e.target;
                                                    if (video.error) {
                                                        const errorCodes = {
                                                            1: 'MEDIA_ERR_ABORTED',
                                                            2: 'MEDIA_ERR_NETWORK',
                                                            3: 'MEDIA_ERR_DECODE',
                                                            4: 'MEDIA_ERR_SRC_NOT_SUPPORTED'
                                                        };
                                                        console.error('Video error:', errorCodes[video.error.code] || 'Unknown', `Code: ${video.error.code}`, { url: advTechVideo });
                                                    }
                                                }}
                                            >
                                                <source src={advTechVideo} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </>
                                    );
                                }
                            })()}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ENGINEERING COMMAND CENTER (New) */}
            {/* ENGINEERING COMMAND CENTER (Refined) */}
            <section className="py-24 bg-primary text-white relative overflow-hidden">
                {/* Clean Dark Background - No Grids */}
                <div className="absolute inset-0 bg-primary" />

                {/* Subtle Ambient Glow (Optional, very faint) */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16 mb-20">
                        <div className="lg:w-2/3">
                            <div className="w-16 h-1 bg-white mb-6" />
                            <span className="text-gray-400 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
                                PRODUCT
                            </span>
                            <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-8 leading-none tracking-tight">
                                {COMMAND_CENTER_DATA.heading}
                            </h2>
                            <p className="text-xl text-gray-400 leading-relaxed font-light max-w-2xl">
                                {COMMAND_CENTER_DATA.subtext}
                            </p>
                        </div>
                        <div className="lg:w-1/3 flex justify-end">
                            {/* Right Side Info Card - Glassmorphism */}
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl relative overflow-hidden max-w-sm w-full shadow-2xl">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Cpu size={80} className="text-white" />
                                </div>
                                <h3 className="text-6xl font-bold text-white mb-2">{COMMAND_CENTER_DATA.infoCard?.engineersCount || "50+"}</h3>
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">Core Engineers</p>

                                <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-emerald-400 border-t border-white/10 pt-6">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    <span>{COMMAND_CENTER_DATA.infoCard?.status || "Status: Innovation Lab Active"}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {COMMAND_CENTER_DATA.focusAreas?.map((item, idx) => (
                            <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors group">
                                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-gray-200 transition-colors">{item.title}</h4>
                                <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-white/10 pt-16">
                        <h3 className="text-2xl font-bold text-white mb-8">Core Capabilities</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {COMMAND_CENTER_DATA.coreCapabilities?.map((item, idx) => (
                                <div key={idx} className="flex items-start space-x-4">
                                    <div className="w-1.5 h-1.5 bg-white rounded-full mt-2.5 flex-shrink-0" />
                                    <div>
                                        <h4 className="text-base font-bold text-white mb-1 uppercase tracking-wide">{item.title}</h4>
                                        <p className="text-sm text-gray-400">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-16">
                        <Link to="/technologies" className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-primary font-bold rounded-full transition-all shadow-lg hover:shadow-xl">
                            Explore Solutions <ArrowRight className="ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* INTERNSHIP SECTION (New) */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0">
                    <OptimizedImage
                        src={internshipImages[0]}
                        alt="Internship Background"
                        className="w-full h-full object-cover opacity-20 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="text-left">
                            <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                                Launch Your Career
                            </span>
                            <h2 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6">
                                {internshipHeading}
                            </h2>
                            <p className="text-xl text-secondary mb-8 leading-relaxed">
                                {internshipDesc}
                            </p>

                            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 mb-10 border-y border-border py-8">
                                {internshipStats.map((stat, idx) => (
                                    <div key={idx}>
                                        <div className="text-3xl font-bold text-primary mb-1">{stat.value || stat.metricValue}</div>
                                        <div className="text-xs text-secondary font-bold uppercase tracking-wider">{stat.label || stat.metricLabel}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to={internshipLink} target="_blank" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-all shadow-lg font-bold">
                                    Apply Now <GraduationCap className="ml-2" size={20} />
                                </Link>
                                <Link to="/internship" className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary border border-border rounded-full hover:bg-gray-50 transition-all font-bold">
                                    Learn More
                                </Link>
                            </div>
                        </div>

                        <div className="relative flex items-center justify-center">
                            <div className="w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden border border-border relative bg-surface shadow-xl hover:shadow-2xl transition-shadow duration-500">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentInternshipSlide}
                                        src={internshipImages[currentInternshipSlide]}
                                        alt={`Internship ${currentInternshipSlide + 1}`}
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1 }}
                                        className="w-full h-full object-cover absolute inset-0"
                                    />
                                </AnimatePresence>
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <h4 className="text-xl font-bold mb-2">Real-World Projects</h4>
                                    <p className="text-white/90 text-xs leading-relaxed">Join students from top universities working on cutting-edge aerospace challenges.</p>
                                </div>
                            </div>
                            {/* Decorative accent bar */}
                            <div className="absolute -left-4 top-1/2 w-1.5 h-24 bg-gradient-to-b from-accent to-accent/30 rounded-full hidden lg:block transform -translate-y-1/2" />
                        </div>
                    </div>
                </div>
            </section>

            {/* HACKATHON SHOWCASE SECTION */}
            {homeData?.hackathonShowcaseSection?.isEnabled !== false && (
                <section className="py-24 bg-[#020617] text-white border-y border-slate-900 relative overflow-hidden">
                    {/* Background decorative elements */}
                    <div className="absolute top-0 left-0 w-1/2 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            {/* Left Column - Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="px-3.5 py-1.5 bg-blue-950/40 text-blue-400 text-[10px] font-extrabold tracking-[0.2em] uppercase rounded border border-blue-900/55 inline-block mb-6 backdrop-blur-sm">
                                    {homeData?.hackathonShowcaseSection?.subheading || "Compete & Create"}
                                </span>
                                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                                    {(() => {
                                        const headingText = homeData?.hackathonShowcaseSection?.heading || "Innovation Challenges & Hackathons";
                                        if (headingText.includes("CopterCode")) {
                                            const parts = headingText.split("CopterCode");
                                            return (
                                                <>
                                                    {parts[0]}
                                                    <span className="text-blue-400">CopterCode</span>
                                                    {parts[1]}
                                                </>
                                            );
                                        }
                                        return headingText;
                                    })()}
                                </h2>
                                <p className="text-lg text-slate-400 leading-relaxed mb-8 border-l-4 border-blue-500 pl-6">
                                    {homeData?.hackathonShowcaseSection?.description || "Join our hackathons and innovation challenges to showcase your skills, collaborate with industry professionals, and win amazing prizes."}
                                </p>

                                {/* Highlights Grid */}
                                {homeData?.hackathonShowcaseSection?.highlights && homeData.hackathonShowcaseSection.highlights.length > 0 && (
                                    <div className="space-y-4 mb-8">
                                        {homeData.hackathonShowcaseSection.highlights.map((highlight, idx) => {
                                            const IconComponent = highlight.icon ? (iconComponentMap[highlight.icon] || Code) : Code;
                                            return (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                                                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#080f25]/40 transition-colors"
                                                >
                                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0 mt-1">
                                                        <IconComponent size={20} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-white mb-1">{highlight.title}</h4>
                                                        <p className="text-sm text-slate-400">{highlight.description}</p>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* CTA Button */}
                                <Link
                                    to={homeData?.hackathonShowcaseSection?.ctaLink || "/hackathon"}
                                    className="inline-flex items-center px-8 py-4 bg-white text-[#020617] rounded-full hover:bg-slate-100 transition-all shadow-lg font-bold hover:shadow-xl transform hover:scale-105"
                                >
                                    {homeData?.hackathonShowcaseSection?.ctaText || "Explore Hackathons"}
                                    <ArrowRight className="ml-2" size={20} />
                                </Link>
                            </motion.div>

                            {/* Right Column - Carousel Images */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative"
                            >
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/40 group h-[400px] md:h-[500px]">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeHackathonSlide}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 1 }}
                                            className="w-full h-full absolute inset-0"
                                        >
                                            <img
                                                src={hackathonCarouselImages[activeHackathonSlide]}
                                                alt={`Hackathon ${activeHackathonSlide + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.div>
                                    </AnimatePresence>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-100"></div>
                                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                                        <h3 className="text-2xl font-bold mb-2">Innovate with Purpose</h3>
                                        <p className="text-white/90 text-sm">Win prizes, build your portfolio, and land your dream role.</p>
                                    </div>
                                </div>
                                {/* Decorative accent */}
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}

            {/* SUSTAINABILITY SECTION (New) */}
            <section className="py-24 bg-background border-t border-border">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
                        <div className="md:w-1/2">
                            <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                                Our Impact
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-medium text-primary mb-6">
                                {sustainabilityHeading}
                            </h2>
                            <p className="text-lg text-secondary leading-relaxed">
                                {sustainabilityDesc}
                            </p>
                        </div>
                        <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {sustainabilityImpact.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-start space-x-4 p-4 rounded-xl hover:bg-surface transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                                        <item.icon size={20} />
                                    </div>
                                    <p className="font-medium text-primary text-sm">{item.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="relative rounded-3xl overflow-hidden h-[400px] group">
                        <OptimizedImage
                            src={sustainabilityBanner}
                            alt="Sustainability Initiative"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent flex flex-col justify-center p-12">
                            <div className="max-w-xl">
                                <h3 className="text-3xl font-bold text-white mb-4">Driving Change Through Technology</h3>
                                <p className="text-white/90 text-lg mb-8">
                                    From clean energy solutions to digital transformation for rural sectors, our initiatives are designed to create lasting positive impact.
                                </p>
                                <Link to="/sustainability" className="inline-flex items-center text-white font-bold hover:text-accent transition-colors">
                                    Explore Our Initiatives <ArrowRight className="ml-2" size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ESSENCE OF ARTICLES SECTION */}
            <section className="py-24 bg-[#050814] text-white border-t border-b border-slate-900 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-blue-400 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                            {articlesSubheading}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                            {articlesHeading}
                        </h2>
                        <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full" />
                        <p className="text-slate-400 max-w-2xl mx-auto mt-6 text-base leading-relaxed">
                            {articlesDescription}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {articlesPapers.map((paper, idx) => (
                            <div key={idx} className="bg-[#0b1329]/60 backdrop-blur-sm border border-slate-900 rounded-3xl overflow-hidden hover:border-slate-800 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between group">
                                {/* Paper Image */}
                                {paper.image && (
                                    <div className="w-full aspect-[16/10] overflow-hidden bg-slate-950 relative">
                                        <img
                                            src={paper.image}
                                            alt={paper.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] to-transparent opacity-80 pointer-events-none" />
                                    </div>
                                )}
                                <div className="p-8 flex flex-col justify-between flex-grow">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-md text-[10px] font-bold uppercase tracking-wider">
                                                {paper.category}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-4 line-clamp-3 group-hover:text-blue-400 transition-colors">
                                            {paper.title}
                                        </h3>
                                        <p className="text-slate-400 text-xs italic mb-4">
                                            {paper.authors}
                                        </p>
                                        <p className="text-slate-300 text-sm leading-relaxed mb-6 line-clamp-4">
                                            {paper.description}
                                        </p>
                                    </div>
                                    <Link to={paper.link} className="inline-flex items-center text-xs font-bold text-blue-400 group-hover:text-blue-300 uppercase tracking-widest mt-auto">
                                        Read Paper <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link to="/articles" className="inline-flex items-center px-8 py-4 bg-white text-[#020617] rounded-full hover:bg-slate-100 transition-all shadow-lg font-bold hover:shadow-xl transform hover:scale-105">
                            Explore All Publications <ArrowRight className="ml-2" size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials Video Section */}
            <section ref={voiceOfSuccessRef} data-testimonials-section className="py-24 bg-background border-t border-border">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-display font-medium mb-12 text-center text-primary">Voice of Success</h2>

                    <div className="max-w-5xl mx-auto relative group">
                        <div className="aspect-video bg-surface rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border border-border relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentTestimonial}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full"
                                >
                                    {(() => {
                                        const rawUrl = testimonials[currentTestimonial]?.url;
                                        if (!rawUrl) return null;

                                        const potentialId = getVideoId(rawUrl);
                                        const isYoutube = /^[a-zA-Z0-9_-]{11}$/.test(potentialId);

                                        if (isYoutube) {
                                            return (
                                                <YouTube
                                                    videoId={potentialId}
                                                    opts={{
                                                        height: '100%',
                                                        width: '100%',
                                                        playerVars: {
                                                            autoplay: 0,
                                                            mute: 1,
                                                            controls: 1,
                                                            rel: 0,
                                                            modestbranding: 1
                                                        },
                                                    }}
                                                    className="w-full h-full"
                                                    iframeClassName="w-full h-full object-cover"
                                                    onReady={(event) => {
                                                        youtubePlayerRef.current = event.target;
                                                        if (voiceOfSuccessVisible) {
                                                            setTimeout(() => event.target.playVideo(), 100);
                                                        }
                                                    }}
                                                    onEnd={nextTestimonial}
                                                />
                                            );
                                        } else {
                                            return (
                                                <video
                                                    className="w-full h-full object-cover"
                                                    loop={false}
                                                    muted
                                                    playsInline
                                                    controls
                                                    crossOrigin="anonymous"
                                                    preload="auto"
                                                    onEnded={nextTestimonial}
                                                >
                                                    <source src={rawUrl} type="video/mp4" />
                                                </video>
                                            );
                                        }
                                    })()}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <button
                            onClick={prevTestimonial}
                            className="absolute top-1/2 -left-4 md:-left-16 transform -translate-y-1/2 p-4 rounded-full bg-surface hover:bg-surface-highlight border border-white/10 text-primary shadow-xl transition-all hover:scale-110 z-30"
                        >
                            <ChevronLeft size={32} />
                        </button>
                        <button
                            onClick={nextTestimonial}
                            className="absolute top-1/2 -right-4 md:-right-16 transform -translate-y-1/2 p-4 rounded-full bg-surface hover:bg-surface-highlight border border-white/10 text-primary shadow-xl transition-all hover:scale-110 z-30"
                        >
                            <ChevronRight size={32} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Global Footprint */}
            <section className="py-24 bg-[#020617] text-white text-center border-y border-slate-900 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-1/2 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <h2 className="text-4xl font-display font-bold mb-12 text-white">{"Global Footprint of Our Talent"}</h2>

                    {/* Desktop View - Map Image with Blue Glow Shadow and Round Corners */}
                    <div className="hidden md:block max-w-5xl mx-auto border-0 shadow-[0_0_50px_rgba(59,130,246,0.45)] rounded-[2rem] overflow-hidden p-0 bg-transparent">
                        <OptimizedImage
                            src={globalFootprintSrc}
                            alt={"Global Footprint"}
                            className="w-full h-auto mix-blend-normal rounded-[2rem]"
                        />
                    </div>

                    {/* Mobile View - Infinite Logo Marquee Carousel wrapped in same shadow style */}
                    <div className="block md:hidden max-w-lg mx-auto border-0 shadow-[0_0_35px_rgba(59,130,246,0.4)] rounded-[2rem] overflow-hidden p-4 bg-[#030712]/50 backdrop-blur-sm">
                        <div className="relative flex overflow-hidden w-full">
                            <div className="flex animate-marquee w-max py-4 gap-4">
                                {[...FOOTPRINT_LOGOS, ...FOOTPRINT_LOGOS, ...FOOTPRINT_LOGOS, ...FOOTPRINT_LOGOS].map((logo, index) => (
                                    <div key={index} className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center p-3 shadow-md border border-slate-100 flex-shrink-0">
                                        <img
                                            src={logo}
                                            alt={`Talent Logo ${index}`}
                                            loading="lazy"
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                            {/* Fade masks for edges */}
                            <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-[#030712]/80 to-transparent z-10 pointer-events-none" />
                            <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-[#030712]/80 to-transparent z-10 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE SECTION (Refreshed - Light Mode) */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Left Column: Intro & Features */}
                        <div>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-8 leading-tight">
                                Why Enterprises Choose <br />
                                <span className="text-accent">CopterCode</span>
                            </h2>
                            <p className="text-lg text-secondary leading-relaxed mb-12 border-l-4 border-accent pl-6">
                                {WHY_CHOOSE_DATA.heading === "Why Choose CopterCode?" ? WHY_CHOOSE_DATA.description : WHY_CHOOSE_DATA.description}
                            </p>

                            <div className="space-y-6">
                                {WHY_CHOOSE_DATA.features?.map((feature, idx) => (
                                    <div key={idx} className="flex items-start group">
                                        <div className="mt-1 mr-4 flex-shrink-0 w-6 h-6 rounded-full bg-surface-highlight flex items-center justify-center text-primary border border-border group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <CheckCircle size={14} strokeWidth={3} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-primary mb-1">{feature.title}</h4>
                                            <p className="text-sm text-secondary">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Case Studies */}
                        <div>
                            <h3 className="text-2xl font-bold text-primary mb-8 flex items-center">
                                Case Study Snapshots
                                <Activity className="ml-3 text-accent" size={24} />
                            </h3>
                            <div className="space-y-6">
                                {WHY_CHOOSE_DATA.caseStudies?.map((study, idx) => (
                                    <div key={idx} className="bg-surface border border-border rounded-3xl p-8 hover:shadow-lg hover:border-accent/20 transition-all duration-300 group">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h4 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">{study.title}</h4>
                                                <p className="text-xs font-bold uppercase tracking-wider text-secondary/70">{study.subtitle}</p>
                                            </div>
                                            <div className="bg-white p-2 rounded-lg text-primary shadow-sm">
                                                <BarChart size={20} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 border-t border-border pt-6">
                                            {study.stats?.map((stat, sIdx) => (
                                                <div key={sIdx} className="text-center">
                                                    <div className="text-2xl md:text-3xl font-black text-primary mb-1">{stat.value}</div>
                                                    <div className="text-[10px] uppercase font-bold text-secondary tracking-wider">{stat.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Decorative Quote-like Box / Image Block */}
                            {WHY_CHOOSE_DATA.quoteImage ? (
                                <div className="mt-8 rounded-3xl overflow-hidden shadow-2xl relative w-full h-[200px] border border-border bg-primary/10">
                                    <img
                                        src={WHY_CHOOSE_DATA.quoteImage}
                                        alt="Zero Latency Quote"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="mt-8 bg-primary rounded-3xl p-8 text-center relative overflow-hidden shadow-2xl">
                                    <div className="relative z-10">
                                        <h4 className="text-2xl font-black text-white italic mb-2">"Zero Latency."</h4>
                                        <p className="text-gray-400 text-sm font-medium">Our commitment to real-time performance in both drone telemetry and digital infrastructure.</p>
                                    </div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ACCREDITATIONS & PARTNERSHIPS SECTION */}
            <section className="py-20 bg-primary text-white relative overflow-hidden border-t border-white/5">
                {/* Subtle Ambient Glow */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <h2 className="text-xl md:text-2xl font-bold font-medium mb-10 text-center text-white tracking-wide">
                        {homeData?.accreditationsSection?.heading || "Our Accreditations & Partnerships"}
                    </h2>

                    <div className="relative overflow-hidden w-full max-w-6xl mx-auto group pb-4 pt-4">
                        {(() => {
                            const logos = homeData?.accreditationsSection?.logos?.length > 0
                                ? homeData.accreditationsSection.logos
                                : [
                                    "/_optimized/mediafiles/Our Accreditations & Partnerships/ChatGPT Image Feb 24, 2026, 03_46_20 PM.webp",
                                    "/_optimized/mediafiles/Our Accreditations & Partnerships/ChatGPT Image Feb 24, 2026, 03_47_06 PM.webp"
                                ];

                            const enableAutoScroll = homeData?.accreditationsSection?.enableAutoScroll !== false;
                            const intervalSecs = homeData?.accreditationsSection?.scrollInterval || 3;
                            const shouldScroll = enableAutoScroll && logos.length > 3;

                            // Time to scroll the entire sequence equals (interval * number of logos)
                            const animationDuration = shouldScroll ? `${logos.length * intervalSecs}s` : '0s';

                            return (
                                <>
                                    {shouldScroll && (
                                        <>
                                            <style>{`
                                                @keyframes logoMarquee {
                                                    0% { transform: translateX(0); }
                                                    100% { transform: translateX(calc(-50% - 1rem)); } 
                                                }
                                            `}</style>
                                            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none"></div>
                                            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none"></div>
                                        </>
                                    )}
                                    <div
                                        className={`flex items-center gap-6 md:gap-8 ${shouldScroll ? 'w-max' : 'justify-center flex-wrap'}`}
                                        style={shouldScroll ? {
                                            animation: `logoMarquee ${animationDuration} linear infinite`,
                                            willChange: 'transform'
                                        } : {}}
                                    >
                                        {(shouldScroll ? [...logos, ...logos] : logos).map((logoUrl, i) => (
                                            <div key={i} className="bg-white px-6 py-6 md:px-8 md:py-8 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-white/10 flex items-center justify-center hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all shrink-0 w-44 md:w-56 h-28 md:h-36 hover:-translate-y-1">
                                                <img src={logoUrl} alt={`Partner ${i}`} className="max-w-[80%] max-h-[80%] object-contain" />
                                            </div>
                                        ))}
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </div>
            </section>

            <ImpactTabs data={homeData?.ourPhilosophySection || null} />
        </div>
    );
};

export default Home;
