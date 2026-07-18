import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFine) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };

    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      gsap.to(dot, { x: pos.x, y: pos.y, duration: 0.12, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', onMove);

    const ticker = gsap.ticker.add(() => {
      ringPos.x += (pos.x - ringPos.x) * 0.14;
      ringPos.y += (pos.y - ringPos.y) * 0.14;
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
    });

    const grow = () => gsap.to(ring, { scale: 1.8, duration: 0.3, ease: 'power2.out' });
    const shrink = () => gsap.to(ring, { scale: 1, duration: 0.3, ease: 'power2.out' });

    const interactive = document.querySelectorAll('a, button, [data-hover]');
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      gsap.ticker.remove(ticker);
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', grow);
        el.removeEventListener('mouseleave', shrink);
      });
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <div ref={ringRef} className="fixed top-0 left-0 w-9 h-9 rounded-full border border-[#C8A24A] mix-blend-multiply" />
      <div ref={dotRef} className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#3C2620]" />
    </div>
  );
}
