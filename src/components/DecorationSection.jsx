import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from './SectionHeading';
import { Sparkle, Strawberry, MintLeaf } from './icons/Ornaments';

gsap.registerPlugin(ScrollTrigger);

export default function DecorationSection() {
  const wrapRef = useRef(null);
  const pipeRef = useRef(null);
  const dripRef = useRef(null);
  const garnishRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pipeLen = pipeRef.current.getTotalLength();
      gsap.set(pipeRef.current, { strokeDasharray: pipeLen, strokeDashoffset: pipeLen });
      const dripLen = dripRef.current.getTotalLength();
      gsap.set(dripRef.current, { strokeDasharray: dripLen, strokeDashoffset: dripLen });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: '+=250%',
          scrub: 1,
          pin: true,
        },
      });

      tl.to(dripRef.current, { strokeDashoffset: 0, duration: 1 }, 0);
      tl.to(pipeRef.current, { strokeDashoffset: 0, duration: 1.2 }, 0.8);
      tl.from(garnishRefs.current, { scale: 0, opacity: 0, stagger: 0.15, ease: 'back.out(2)', duration: 0.8 }, 1.6);
      tl.to(wrapRef.current, { '--tilt': '6deg', duration: 1 }, 2.2);
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="decoration" ref={wrapRef} className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#EAD9BE] to-[#F1DFC4]">
      <div className="absolute top-16 left-6 md:left-16 z-20">
        <SectionHeading index="03" label="The Finishing Touch" title="Decoration is Devotion" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[70vw] max-w-[420px]">
          <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible">
            {/* base cake */}
            <rect x="60" y="150" width="180" height="90" rx="16" fill="#F6E9D8" />
            <rect x="80" y="90" width="140" height="70" rx="14" fill="#FFFCF6" />

            {/* drip drawn on scroll */}
            <path ref={dripRef} d="M80 96 Q95 120 88 128 Q100 128 104 108 Q118 130 110 138 Q128 136 130 112 Q145 136 138 144 Q158 140 160 114 Q175 138 166 144 Q186 138 188 112 Q200 134 192 140 Q210 134 220 96"
              fill="none" stroke="#C8A24A" strokeWidth="4" strokeLinecap="round" />

            {/* piping border drawn on scroll */}
            <path ref={pipeRef} d="M65 152 Q150 168 235 152" fill="none" stroke="#F1C7CF" strokeWidth="8" strokeLinecap="round" />
          </svg>

          {[...Array(3)].map((_, i) => (
            <div key={`s${i}`} ref={(el) => (garnishRefs.current[i] = el)} className="absolute w-8 h-8" style={{ top: `${8 + i * 4}%`, left: `${20 + i * 28}%` }}>
              <Sparkle className="w-full h-full" />
            </div>
          ))}
          <div ref={(el) => (garnishRefs.current[3] = el)} className="absolute w-12 h-12" style={{ top: '18%', left: '38%' }}>
            <Strawberry className="w-full h-full" />
          </div>
          <div ref={(el) => (garnishRefs.current[4] = el)} className="absolute w-9 h-9" style={{ top: '14%', left: '55%' }}>
            <MintLeaf className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
