import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from './SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  { title: 'Mixing', copy: 'Butter and sugar, folded to ribbons.' },
  { title: 'Pouring', copy: 'Batter meets the tin, unhurried.' },
  { title: 'Baking', copy: 'Warmth rises, the crumb finds its soul.' },
  { title: 'Cooling', copy: 'Patience, before the first layer.' },
];

export default function ProcessSection() {
  const wrapRef = useRef(null);
  const stageRefs = useRef([]);
  const bowlRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stages = stageRefs.current;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1,
          pin: true,
        },
      });

      stages.forEach((el, i) => {
        if (i > 0) tl.to(stages[i - 1], { opacity: 0, y: -30, duration: 0.4 }, i);
        tl.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4 }, i > 0 ? `<` : 0);
      });

      // bowl / whisk rotation through mixing + pouring, oven glow pulses on baking
      tl.to(bowlRef.current, { rotation: 360, duration: 2, ease: 'none' }, 0);
      tl.to(glowRef.current, { opacity: 0.9, scale: 1.15, duration: 1 }, 2);
      tl.to(glowRef.current, { opacity: 0.3, scale: 1, duration: 1 }, 3);
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={wrapRef} className="relative h-screen w-full overflow-hidden bg-[#3C2620]">
      <div ref={glowRef} className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 50% 60%, #E7CD8F 0%, transparent 55%)' }} />

      <div className="absolute top-16 left-6 md:left-16 z-20">
        <SectionHeading index="02" label="The Baking Process" title="From Batter to Warmth" italic light />
      </div>

      {/* central visual */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div ref={bowlRef} className="relative w-56 h-56 md:w-72 md:h-72">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <radialGradient id="bowl" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FBF3E7" />
                <stop offset="100%" stopColor="#C8A24A" />
              </radialGradient>
            </defs>
            <ellipse cx="100" cy="110" rx="80" ry="60" fill="url(#bowl)" opacity="0.9" />
            <ellipse cx="100" cy="90" rx="60" ry="30" fill="#F6E9D8" />
            <path d="M100 40 L100 90" stroke="#E7CD8F" strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="100" cy="40" rx="18" ry="8" fill="#E7CD8F" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="relative text-center max-w-md w-full h-40">
          {STAGES.map((s, i) => (
            <div key={i} ref={(el) => (stageRefs.current[i] = el)} className="absolute inset-0 flex flex-col items-center justify-center" style={{ opacity: i === 0 ? 1 : 0 }}>
              <span className="eyebrow text-[#E7CD8F]">Stage 0{i + 1}</span>
              <h3 className="font-display text-white text-4xl md:text-6xl mt-3 mb-3">{s.title}</h3>
              <p className="text-[#F3E6D3]/70 text-sm md:text-base font-light">{s.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
