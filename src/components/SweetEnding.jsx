import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CakeHero, Sparkle } from './icons/Ornaments';

gsap.registerPlugin(ScrollTrigger);

const BURST = new Array(14).fill(0).map((_, i) => ({
  angle: (360 / 14) * i,
  size: 12 + (i % 4) * 8,
}));

export default function SweetEnding() {
  const sectionRef = useRef(null);
  const cakeRef = useRef(null);
  const sparkleRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
      });
      tl.from(cakeRef.current, { scale: 0.6, opacity: 0, duration: 1.2, ease: 'back.out(1.5)' });
      tl.from(sparkleRefs.current, {
        scale: 0,
        opacity: 0,
        stagger: 0.03,
        duration: 0.8,
        ease: 'back.out(3)',
      }, '-=0.6');

      sparkleRefs.current.forEach((el, i) => {
        gsap.to(el, {
          y: `+=${8 + (i % 3) * 6}`,
          rotation: `+=${20}`,
          duration: 2 + (i % 3),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="finale" ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#FBF3E7] to-[#F1DFC4] flex items-center justify-center">
      <div className="absolute inset-0 opacity-50" style={{ background: 'radial-gradient(circle at 50% 55%, #F1C7CF 0%, transparent 55%)' }} />

      <div className="relative">
        {BURST.map(({ angle, size }, i) => {
          const rad = (angle * Math.PI) / 180;
          const radius = 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          return (
            <div
              key={i}
              ref={(el) => (sparkleRefs.current[i] = el)}
              className="absolute"
              style={{ width: size, height: size, top: `calc(50% + ${y}px)`, left: `calc(50% + ${x}px)`, transform: 'translate(-50%,-50%)' }}
            >
              <Sparkle className="w-full h-full" fill={i % 2 === 0 ? '#C8A24A' : '#E3A6B4'} />
            </div>
          );
        })}
        <div ref={cakeRef} className="relative w-[54vw] max-w-[360px]">
          <CakeHero className="w-full h-full" />
        </div>
      </div>

      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 text-center">
        <span className="font-display italic text-2xl md:text-3xl text-[#3C2620]">Baked with care, always.</span>
      </div>
    </section>
  );
}
