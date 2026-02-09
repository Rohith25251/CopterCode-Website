import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description }) => {
    const location = useLocation();

    useEffect(() => {
        document.title = `${title} | CopterCode`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', description || "Premium software engineering and AI solutions.");
        }
    }, [title, description, location]);

    return null;
};

export default SEO;
