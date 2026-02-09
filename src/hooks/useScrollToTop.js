import { useEffect } from 'react';

/**
 * Custom hook to force scroll to top on component mount
 * This is an aggressive implementation that overrides all scroll behaviors
 */
export const useScrollToTop = () => {
    useEffect(() => {
        // Force scroll to top immediately - multiple methods for maximum compatibility
        const scrollToTop = () => {
            // Method 1: window.scrollTo with instant behavior
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant'
            });

            // Method 2: Direct DOM manipulation
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;

            // Method 3: Using scrollIntoView on body
            document.body.scrollIntoView({ behavior: 'instant', block: 'start' });
        };

        // Execute immediately
        scrollToTop();

        // Execute after a tiny delay to override any animations
        const timeout1 = setTimeout(scrollToTop, 0);
        const timeout2 = setTimeout(scrollToTop, 50);
        const timeout3 = setTimeout(scrollToTop, 100);

        // Cleanup
        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
        };
    }, []);
};
