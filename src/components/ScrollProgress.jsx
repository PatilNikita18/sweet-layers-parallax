import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STAGES = ['Ingredients', 'Baking', 'Decoration', 'Signatures', 'Gallery', 'Finale'];

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        gsap.set(barRef.current, { scaleY: self.progress });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div className="fixed right-5 md:right-8 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col items-center gap-3">
      <div className="relative w-px h-40 bg-[#3C2620]/15 overflow-hidden">
        <div ref={barRef} className="absolute top-0 left-0 w-full h-full origin-top bg-[#C8A24A]" style={{ transform: 'scaleY(0)' }} />
      </div>
      <span className="eyebrow text-[#3C2620]/50 [writing-mode:vertical-rl] tracking-[0.3em]">Scroll</span>
    </div>
  );
}

export { STAGES };
