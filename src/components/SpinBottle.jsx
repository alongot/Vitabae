import React, { useRef, useState, useCallback, useEffect } from 'react';

/**
 * 360° Product Spin Viewer
 *
 * HOW TO SET UP YOUR 360 IMAGES:
 * 1. Place your product on a turntable
 * 2. Take 24-36 photos evenly spaced (every 10-15 degrees)
 * 3. Name them sequentially: bottle-01.jpg, bottle-02.jpg, ... bottle-36.jpg
 * 4. Put them in public/images/360/{productSlug}/
 * 5. Pass the folder path and frame count as props
 *
 * Example usage:
 *   <SpinBottle
 *     folder="/images/360/ashwagandha"
 *     frames={36}
 *     alt="Ashwagandha bottle"
 *   />
 *
 * If no 360 images exist yet, it falls back to a single static image
 * with a CSS-animated rotation effect.
 */
export default function SpinBottle({
  folder,
  frames = 36,
  alt = 'Product',
  fallbackImage = '/images/ilona-isha.jpg',
  className = '',
  autoSpin = true,
  autoSpinSpeed = 80, // ms per frame
}) {
  const containerRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [hasMultipleFrames, setHasMultipleFrames] = useState(false);
  const dragStartX = useRef(0);
  const frameAtDragStart = useRef(0);
  const autoSpinRef = useRef(null);

  // Generate frame URLs
  const frameUrls = Array.from({ length: frames }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return `${folder}/bottle-${num}.jpg`;
  });

  // Preload images and check if multi-frame set exists
  useEffect(() => {
    if (!folder) {
      setHasMultipleFrames(false);
      return;
    }

    const img = new Image();
    img.onload = () => {
      setHasMultipleFrames(true);
      setImagesLoaded(true);
      // Preload rest
      frameUrls.forEach((url) => {
        const preload = new Image();
        preload.src = url;
      });
    };
    img.onerror = () => {
      setHasMultipleFrames(false);
    };
    img.src = frameUrls[0];
  }, [folder]);

  // Auto-spin
  useEffect(() => {
    if (!autoSpin || !hasMultipleFrames || isDragging) return;
    autoSpinRef.current = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames);
    }, autoSpinSpeed);
    return () => clearInterval(autoSpinRef.current);
  }, [autoSpin, hasMultipleFrames, isDragging, frames, autoSpinSpeed]);

  // Drag handlers for manual spin
  const handlePointerDown = useCallback((e) => {
    if (!hasMultipleFrames) return;
    setIsDragging(true);
    dragStartX.current = e.clientX || e.touches?.[0]?.clientX || 0;
    frameAtDragStart.current = currentFrame;
    e.preventDefault();
  }, [hasMultipleFrames, currentFrame]);

  const handlePointerMove = useCallback((e) => {
    if (!isDragging || !hasMultipleFrames) return;
    const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
    const delta = clientX - dragStartX.current;
    const containerWidth = containerRef.current?.offsetWidth || 300;
    const frameDelta = Math.round((delta / containerWidth) * frames);
    const newFrame = ((frameAtDragStart.current + frameDelta) % frames + frames) % frames;
    setCurrentFrame(newFrame);
  }, [isDragging, hasMultipleFrames, frames]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove);
      window.addEventListener('touchend', handlePointerUp);
      return () => {
        window.removeEventListener('mousemove', handlePointerMove);
        window.removeEventListener('mouseup', handlePointerUp);
        window.removeEventListener('touchmove', handlePointerMove);
        window.removeEventListener('touchend', handlePointerUp);
      };
    }
  }, [isDragging, handlePointerMove, handlePointerUp]);

  // ── Fallback: Single image with CSS 3D auto-rotate ──
  if (!hasMultipleFrames) {
    return (
      <div className={`relative group ${className}`} ref={containerRef}>
        <div
          className="w-full h-full"
          style={{
            perspective: '1000px',
          }}
        >
          <div
            className="w-full h-full transition-transform duration-300"
            style={{
              transformStyle: 'preserve-3d',
              animation: autoSpin ? 'spinY 8s linear infinite' : 'none',
            }}
          >
            <img
              src={fallbackImage}
              alt={alt}
              className="w-full h-full object-contain select-none"
              draggable={false}
            />
          </div>
        </div>
        {/* Drag hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-[9px] uppercase tracking-widest px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          360&deg; view coming soon
        </div>
      </div>
    );
  }

  // ── Multi-frame 360 viewer ──
  return (
    <div
      ref={containerRef}
      className={`relative group select-none ${className}`}
      onMouseDown={handlePointerDown}
      onTouchStart={handlePointerDown}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <img
        src={frameUrls[currentFrame]}
        alt={`${alt} - angle ${currentFrame + 1}`}
        className="w-full h-full object-contain pointer-events-none"
        draggable={false}
      />
      {/* Drag hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12h22M5 8l-4 4 4 4M19 8l4 4-4 4" />
        </svg>
        Drag to spin
      </div>
    </div>
  );
}
