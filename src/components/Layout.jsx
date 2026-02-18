import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-background text-primary overflow-x-hidden">
            <Navbar />
            <main className="flex-grow pt-20 min-h-screen">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
