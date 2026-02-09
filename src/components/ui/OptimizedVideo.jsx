import { useRef, useState, useEffect } from 'react';

const OptimizedVideo = ({
    src,
    className = "",
    poster,
    autoPlay = true,
    muted = true,
    loop = true,
    controls = false
}) => {
    const videoRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (videoRef.current) {
            // Ensure muted is set for autoplay support
            if (muted) videoRef.current.muted = true;
        }
    }, [muted]);

    const handleLoadedData = () => {
        setIsLoaded(true);
    };

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {!isLoaded && (
                <div className="absolute inset-0 bg-gray-900 animate-pulse z-0" />
            )}
            <video
                ref={videoRef}
                src={src}
                className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                poster={poster}
                autoPlay={autoPlay}
                muted={muted}
                loop={loop}
                playsInline
                controls={controls}
                onLoadedData={handleLoadedData}
            />
        </div>
    );
};

export default OptimizedVideo;
