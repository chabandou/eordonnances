import { useEffect, useState } from 'react';


export default function ScrollAnimatedCard({ render, children, className = '', style = {}, cardRef, rootMargin = '-30% 0px -40% 0px' }) {
  const [isCenterFocus, setIsCenterFocus] = useState(false);
  const [supportsHover, setSupportsHover] = useState(true);

  useEffect(() => {
    // Check if device supports hover
    const checkHover = () => {
      const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      setSupportsHover(hasHover);
      return hasHover;
    };

    const hasHover = checkHover();

    // Only set up scroll animation on non-hover devices
    if (!hasHover && cardRef.current) {
      const observerOptions = {
        root: null,
        rootMargin: rootMargin, // Adjust based on card height
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const ratio = entry.intersectionRatio;
          
          // Extra animation when element is centered
          setIsCenterFocus(ratio > 0.7);
        });
      }, observerOptions);

      observer.observe(cardRef.current);

      // Cleanup
      return () => {
        if (cardRef.current) {
          observer.unobserve(cardRef.current);
        }
      };
    }

    // Listen for media query changes (orientation/window resize)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const handleMediaChange = () => {
      setSupportsHover(mediaQuery.matches);
    };
    
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  return (
    <div
      ref={cardRef}
      style={style}
      className={className}
    >
      {render ? render({ isCenterFocus, supportsHover }) : children}
    </div>
  );
};
