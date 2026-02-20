import React, { useRef, useEffect, useState } from 'react';

// LazyVideo: loads videos eagerly by default or lazily if eager={false}
export default function LazyVideo({ src, poster, className = '', autoPlay = true, loop = true, muted = true, playsInline = true, eager = true }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(eager); // Load immediately if eager=true

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

  useEffect(() => {
    if (isVisible && ref.current) {
      const videoEl = ref.current.querySelector('video');
      if (videoEl && autoPlay) {
        videoEl.play().catch(err => console.log('Autoplay prevented:', err));
      }
    }
  }, [isVisible, autoPlay]);

  return (
    <div ref={ref} className={className}>
      <video
        poster={poster}
        className="w-full h-full object-cover"
        autoPlay={isVisible && autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        crossOrigin="anonymous"
        webkit-playsinline="true"
        preload="auto"
      >
        {isVisible && <source src={src} type="video/mp4" />}
      </video>
    </div>
  );
}
