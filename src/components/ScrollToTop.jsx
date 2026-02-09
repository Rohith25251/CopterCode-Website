import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Disable browser's automatic scroll restoration on page reload
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, []);

    useEffect(() => {
        // Scroll to top when pathname changes
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });

        // Also scroll document body
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        // Force scroll after a tiny delay to ensure DOM is ready
        const timeoutId = setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant'
            });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 0);

        return () => clearTimeout(timeoutId);
    }, [pathname]);

    return null;
}

export default ScrollToTop;
