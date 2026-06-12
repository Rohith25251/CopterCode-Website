import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();

    // Paths where the footer should be hidden
    const hideFooter = [
        '/internship-registration',
        '/internshipregistration',
        '/intershipregisteration'
    ].includes(location.pathname);

    return (
        <div className="flex flex-col min-h-screen bg-background text-primary overflow-x-hidden">
            <Navbar />
            <main className="flex-grow pt-16 sm:pt-18 md:pt-20 lg:pt-20 min-h-screen">
                {children}
            </main>
            {!hideFooter && <Footer />}
        </div>
    );
};

export default Layout;
