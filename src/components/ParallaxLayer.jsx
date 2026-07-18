import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * A background element that drifts at its own speed while the section scrolls
 * past normally (no pin). speed < 1 moves slower than the page (feels "far away"),
 * speed > 1 moves faster (feels "close").
 */
export default function ParallaxLayer({ speed = 0.5, className = '', style = {}, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: 30 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });
    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={ref} className={`pointer-events-none absolute ${className}`} style={style}>
      {children}
    </div>
  );
}
