import React from 'react';

// OptimizedImage: prefer generated AVIF/WebP variants under /_optimized/mediafiles
// Usage: <OptimizedImage src="/mediafiles/.../image.jpg" alt="..." className="..." loading="lazy" />
export default function OptimizedImage({ src, alt = '', className = '', loading = 'lazy', decoding = 'async', sizes = '100vw', style }) {
  if (!src) return null;

  // If the source is an SVG or an absolute external URL (CDN), render a plain <img>.
  const lower = src.split('?')[0].toLowerCase();
  if (lower.endsWith('.svg') || /^https?:\/\//.test(src)) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        sizes={sizes}
        style={style}
      />
    );
  }

  // Only handle absolute /mediafiles paths; otherwise fallback to src only
  const isMedia = src.startsWith('/mediafiles/') || src.includes('/mediafiles/');
  const relPath = isMedia ? src.replace(/^\//, '') : null; // mediafiles/...
  const optimizedBase = isMedia ? '/_optimized/' + relPath : null; // /_optimized/mediafiles/...

  // common widths to generate via script
  const widths = [400, 800, 1200, 2000];

  const makeSrcSet = (format) => {
    if (!optimizedBase) return '';
    return widths.map(w => {
      const url = `${optimizedBase.replace(/(\.[^.]+)$/, '')}-${w}.${format}`;
      return `${encodeURI(url)} ${w}w`;
    }).join(', ');
  };

  return (
    <picture>
      {isMedia && (
        <>
          <source type="image/avif" srcSet={makeSrcSet('avif')} sizes={sizes} />
          <source type="image/webp" srcSet={makeSrcSet('webp')} sizes={sizes} />
        </>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        sizes={sizes}
        style={style}
      />
    </picture>
  );
}
