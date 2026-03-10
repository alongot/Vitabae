import React, { useRef, useCallback } from 'react';

/**
 * Mouse-tracking 3D tilt effect (like Seed.com bottles).
 * On hover, the element tilts toward the cursor position.
 */
export default function TiltBottle({ children, className = '', maxTilt = 15, scale = 1.05, speed = 400 }) {
  const ref = useRef(null);
  const frameRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;   // 0 to 1
      const y = (e.clientY - rect.top) / rect.height;    // 0 to 1
      const rotateX = (0.5 - y) * maxTilt;               // tilt up/down
      const rotateY = (x - 0.5) * maxTilt;               // tilt left/right
      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
    });
  }, [maxTilt, scale]);

  const handleMouseLeave = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    const el = ref.current;
    if (el) {
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
