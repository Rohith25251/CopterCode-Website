import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Reusable Legal Page Layout Component
 * Provides consistent structure for Terms & Conditions and Privacy Policy pages
 * Features:
 * - Responsive layout (sidebar + content)
 * - Sticky sidebar navigation on desktop
 * - Scroll spy active section highlighting
 * - Mobile-friendly with stacked layout
 * - No overlapping elements or positioning hacks
 */
const LegalLayout = ({
  pageTitle,
  pageDescription,
  effectiveDate,
  lastUpdated,
  sections,
  children
}) => {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Scroll spy functionality
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {pageDescription}
            </p>
            <div className="flex flex-col sm:flex-row sm:gap-8 text-sm text-gray-500">
              <div>
                <p className="font-semibold text-gray-900 mb-1">Effective Date</p>
                <p>{effectiveDate}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Last Updated</p>
                <p>{lastUpdated}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            {/* Mobile Toggle Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg mb-6 hover:bg-gray-50 transition-colors"
              aria-label="Toggle navigation"
              aria-expanded={isSidebarOpen}
            >
              <span className="font-semibold text-gray-900">Table of Contents</span>
              <ChevronDown
                size={20}
                className={`text-gray-600 transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Navigation Menu */}
            <nav
              className={`lg:block bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm ${
                isSidebarOpen ? 'block' : 'hidden'
              }`}
              style={{ position: 'sticky', top: '100px' }}
            >
              <div className="p-6 space-y-1 max-h-[calc(100vh-150px)] overflow-y-auto">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest py-2">
                  Contents
                </h3>
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border-l-3 ${
                      activeSection === section.id
                        ? 'bg-blue-50 border-blue-600 text-blue-900'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    aria-current={activeSection === section.id ? 'page' : undefined}
                  >
                    {section.title}
                  </button>
                ))}
              </div>

              {/* Metadata */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-600 space-y-2">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Effective Date</p>
                  <p>{effectiveDate}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Last Updated</p>
                  <p>{lastUpdated}</p>
                </div>
              </div>
            </nav>
          </aside>

          {/* Content Area */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LegalLayout;
