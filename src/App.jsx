import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import PageTransitionLoader from './components/PageTransitionLoader';
import Layout from './components/Layout';
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Business = lazy(() => import('./pages/Business'));
const Administration = lazy(() => import('./pages/Administration'));
const Sustainability = lazy(() => import('./pages/Sustainability'));
const Articles = lazy(() => import('./pages/Articles'));
const Services = lazy(() => import('./pages/Services'));
const Technologies = lazy(() => import('./pages/Technologies'));
const Projects = lazy(() => import('./pages/Projects'));
const Careers = lazy(() => import('./pages/Careers'));
const Internship = lazy(() => import('./pages/Internship'));
const InternshipRegistration = lazy(() => import('./pages/InternshipRegistration'));
const Investors = lazy(() => import('./pages/Investors'));
const Events = lazy(() => import('./pages/Events'));
const Hackathon = lazy(() => import('./pages/Hackathon'));
const GetInTouch = lazy(() => import('./pages/GetInTouch'));
const Contact = lazy(() => import('./pages/Contact'));
const IndustrialDrones = lazy(() => import('./pages/IndustrialDrones'));
const DigitalServices = lazy(() => import('./pages/DigitalServices'));
const NewEnergy = lazy(() => import('./pages/NewEnergy'));
const ERPSolutions = lazy(() => import('./pages/ERPSolutions'));
const RetailFood = lazy(() => import('./pages/RetailFood'));
const InfraSecurity = lazy(() => import('./pages/InfraSecurity'));
const CertificateVerify = lazy(() => import('./pages/CertificateVerify'));
const InternPortal = lazy(() => import('./pages/InternPortal'));

const Locations = lazy(() => import('./pages/Locations'));

const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const BusinessTemplate = lazy(() => import('./pages/BusinessTemplate'));

import ScrollToTop from './components/ScrollToTop';

const StudioPage = lazy(() => import('./pages/StudioPage'));

// Placeholder component to prevent layout shift while loading
const PagePlaceholder = () => <div className="min-h-screen" />;

/**
 * InsightsRedirect — handles the old /insights URL that was removed.
 * 1. Injects <meta name="robots" content="noindex"> so Google stops indexing it.
 * 2. Redirects users immediately to /articles (the replacement page).
 * Google will drop /insights from its index on the next crawl.
 */
const InsightsRedirect = () => {
    useEffect(() => {
        // Inject noindex tag so Google de-indexes this URL
        let noindexTag = document.querySelector("meta[name='robots'][data-insights]");
        if (!noindexTag) {
            noindexTag = document.createElement('meta');
            noindexTag.setAttribute('name', 'robots');
            noindexTag.setAttribute('content', 'noindex, nofollow');
            noindexTag.setAttribute('data-insights', 'true');
            document.head.appendChild(noindexTag);
        }
        return () => {
            // Clean up when navigating away so it doesn't affect other pages
            if (noindexTag && noindexTag.parentNode) {
                noindexTag.parentNode.removeChild(noindexTag);
            }
        };
    }, []);
    return <Navigate to="/articles" replace />;
};

function AppContent() {
    const location = useLocation();
    const [isPageTransition, setIsPageTransition] = useState(false);

    useEffect(() => {
        // Start loader when route changes
        setIsPageTransition(true);
        
        // End loader after a brief moment to show smooth transition
        const timer = setTimeout(() => {
            setIsPageTransition(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <AnimatePresence mode="wait">
            {isPageTransition && <PageTransitionLoader key="loader" />}
            <Routes location={location} key={location.pathname}>
                {/* Sanity Studio Route - Outside Layout */}
                <Route path="/studio/*" element={<Suspense fallback={<div className="min-h-screen"/>}><StudioPage /></Suspense>} />

                {/* Main Application Routes - Inside Layout */}
                <Route path="*" element={
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Suspense fallback={<div className="min-h-screen"/>}><Home /></Suspense>} />
                            <Route path="/about" element={<Suspense fallback={<PagePlaceholder />}><About /></Suspense>} />
                            <Route path="/business" element={<Suspense fallback={<PagePlaceholder />}><Business /></Suspense>} />
                            <Route path="/administration" element={<Suspense fallback={<PagePlaceholder />}><Administration /></Suspense>} />
                            <Route path="/sustainability" element={<Suspense fallback={<PagePlaceholder />}><Sustainability /></Suspense>} />
                            <Route path="/articles" element={<Suspense fallback={<PagePlaceholder />}><Articles /></Suspense>} />
                            <Route path="/events" element={<Suspense fallback={<PagePlaceholder />}><Events /></Suspense>} />
                            <Route path="/hackathon" element={<Suspense fallback={<PagePlaceholder />}><Hackathon /></Suspense>} />
                            <Route path="/services" element={<Suspense fallback={<PagePlaceholder />}><Services /></Suspense>} />
                            <Route path="/technologies" element={<Suspense fallback={<PagePlaceholder />}><Technologies /></Suspense>} />
                            <Route path="/projects" element={<Suspense fallback={<PagePlaceholder />}><Projects /></Suspense>} />
                            <Route path="/careers" element={<Suspense fallback={<PagePlaceholder />}><Careers /></Suspense>} />
                            <Route path="/internship" element={<Suspense fallback={<PagePlaceholder />}><Internship /></Suspense>} />
                            <Route path="/internship-registration" element={<Suspense fallback={<PagePlaceholder />}><InternshipRegistration /></Suspense>} />
                            <Route path="/internshipregistration" element={<Suspense fallback={<PagePlaceholder />}><InternshipRegistration /></Suspense>} />
                            <Route path="/intershipregisteration" element={<Suspense fallback={<PagePlaceholder />}><InternshipRegistration /></Suspense>} />
                            <Route path="/investors" element={<Suspense fallback={<PagePlaceholder />}><Investors /></Suspense>} />
                            <Route path="/get-in-touch" element={<Suspense fallback={<PagePlaceholder />}><GetInTouch /></Suspense>} />
                            <Route path="/contact" element={<Suspense fallback={<PagePlaceholder />}><Contact /></Suspense>} />
                            <Route path="/locations" element={<Suspense fallback={<PagePlaceholder />}><Locations /></Suspense>} />
                            <Route path="/industrial-drones" element={<Suspense fallback={<PagePlaceholder />}><IndustrialDrones /></Suspense>} />
                            <Route path="/digital-services" element={<Suspense fallback={<PagePlaceholder />}><DigitalServices /></Suspense>} />
                            <Route path="/new-energy" element={<Suspense fallback={<PagePlaceholder />}><NewEnergy /></Suspense>} />
                            <Route path="/erp-solutions" element={<Suspense fallback={<PagePlaceholder />}><ERPSolutions /></Suspense>} />
                            <Route path="/retail-food" element={<Suspense fallback={<PagePlaceholder />}><RetailFood /></Suspense>} />
                            <Route path="/infra-security" element={<Suspense fallback={<PagePlaceholder />}><InfraSecurity /></Suspense>} />
                            <Route path="/verify" element={<Suspense fallback={<PagePlaceholder />}><CertificateVerify /></Suspense>} />
                            <Route path="/verify/:certCode" element={<Suspense fallback={<PagePlaceholder />}><CertificateVerify /></Suspense>} />
                            <Route path="/intern-portal" element={<Suspense fallback={<PagePlaceholder />}><InternPortal /></Suspense>} />
                            <Route path="/privacy" element={<Suspense fallback={<PagePlaceholder />}><PrivacyPolicy /></Suspense>} />
                            <Route path="/terms" element={<Suspense fallback={<PagePlaceholder />}><TermsAndConditions /></Suspense>} />

                            {/* /insights — removed page: noindex + redirect to /articles */}
                            <Route path="/insights" element={<InsightsRedirect />} />

                            {/* Dynamic Route for New Businesses */}
                            <Route path="/:slug" element={<Suspense fallback={<PagePlaceholder />}><BusinessTemplate /></Suspense>} />
                        </Routes>
                    </Layout>
                } />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    const [loading, setLoading] = useState(true);

    return (
        <Router>
                <ScrollToTop />
                <AnimatePresence mode="wait">
                    {loading && (
                        <Suspense fallback={<div className="min-h-screen"/>}>
                            <Preloader setLoading={setLoading} />
                        </Suspense>
                    )}
                </AnimatePresence>
                {!loading && <AppContent />}
                {/* Custom cursor removed */}
            </Router>
    );
}
export default App;
