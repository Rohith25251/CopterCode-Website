import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Business from './pages/Business';
import Administration from './pages/Administration';
import Sustainability from './pages/Sustainability';
import News from './pages/News';
import Services from './pages/Services';
import Technologies from './pages/Technologies';
import Projects from './pages/Projects';
import Careers from './pages/Careers';
import Internship from './pages/Internship';
import Investors from './pages/Investors';
import Events from './pages/Events';
import GetInTouch from './pages/GetInTouch';
import Contact from './pages/Contact';
import IndustrialDrones from './pages/IndustrialDrones';
import DigitalServices from './pages/DigitalServices';
import NewEnergy from './pages/NewEnergy';
import ERPSolutions from './pages/ERPSolutions';
import RetailFood from './pages/RetailFood';
import InfraSecurity from './pages/InfraSecurity';

import Locations from './pages/Locations';

import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import BusinessTemplate from './pages/BusinessTemplate';

import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';

import StudioPage from './pages/StudioPage';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                {/* Sanity Studio Route - Outside Layout */}
                <Route path="/studio/*" element={<StudioPage />} />

                {/* Main Application Routes - Inside Layout */}
                <Route path="*" element={
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/business" element={<Business />} />
                            <Route path="/administration" element={<Administration />} />
                            <Route path="/sustainability" element={<Sustainability />} />
                            <Route path="/news" element={<News />} />
                            <Route path="/events" element={<Events />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/technologies" element={<Technologies />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/careers" element={<Careers />} />
                            <Route path="/internship" element={<Internship />} />
                            <Route path="/investors" element={<Investors />} />
                            <Route path="/get-in-touch" element={<GetInTouch />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/locations" element={<Locations />} />
                            <Route path="/industrial-drones" element={<IndustrialDrones />} />
                            <Route path="/digital-services" element={<DigitalServices />} />
                            <Route path="/new-energy" element={<NewEnergy />} />
                            <Route path="/erp-solutions" element={<ERPSolutions />} />
                            <Route path="/retail-food" element={<RetailFood />} />
                            <Route path="/infra-security" element={<InfraSecurity />} />
                            <Route path="/privacy" element={<PrivacyPolicy />} />
                            <Route path="/terms" element={<TermsAndConditions />} />

                            {/* Dynamic Route for New Businesses */}
                            <Route path="/:slug" element={<BusinessTemplate />} />
                        </Routes>
                    </Layout>
                } />
            </Routes>
        </Router>
    );
}

export default App;
