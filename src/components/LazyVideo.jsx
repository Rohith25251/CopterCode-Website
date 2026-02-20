import React, { useRef, useEffect, useState } from 'react';

// LazyVideo: loads videos eagerly by default or lazily if eager={false}
export default function LazyVideo({ src, poster, className = '', autoPlay = true, loop = true, muted = true, playsInline = true, eager = true }) {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(eager); // Load immediately if eager=true
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (eager) return; // Skip Intersection Observer if eager mode enabled

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      });
    }, { rootMargin: '300px', threshold: 0.01 }); // Trigger 300px before visible + low threshold

    obs.observe(el);
    return () => obs.disconnect();
  }, [eager]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleError = (e) => {
    console.error('Video error:', e.target.error?.message);
    setIsPlaying(false);
  };

  return (
    <div ref={ref} className={className}>
      <video
        ref={videoRef}
        poster={poster}
        className="w-full h-full object-cover"
        autoPlay={autoPlay && (eager || isVisible)}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        crossOrigin="anonymous"
        webkit-playsinline="true"
        preload="auto"
        onPlay={handlePlay}
        onPause={handlePause}
        onError={handleError}
      >
        {(eager || isVisible) && <source src={src} type="video/mp4" />}
      </video>
    </div>
  );
}
