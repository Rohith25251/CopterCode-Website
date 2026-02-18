import React, { useRef, useEffect, useState } from 'react';

// LazyVideo: only attaches `src` when the element is in the viewport to avoid network and CPU work.
export default function LazyVideo({ src, poster, className = '', autoPlay = true, loop = true, muted = true, playsInline = true }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      });
    }, { rootMargin: '200px' });

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && ref.current) {
      const videoEl = ref.current.querySelector('video');
      if (videoEl) {
        videoEl.play().catch(err => console.log('Autoplay prevented:', err));
      }
    }
  }, [isVisible]);

  return (
    <div ref={ref} className={className}>
      <video
        src={isVisible ? src : undefined}
        poster={poster}
        className="w-full h-full object-cover"
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        webkit-playsinline="true"
        preload="none"
      />
    </div>
  );
}
