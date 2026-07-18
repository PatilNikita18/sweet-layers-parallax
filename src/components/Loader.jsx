import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Loader({ onDone }) {
  const [hidden, setHidden] = useState(false);
  const fillRef = useRef(null);
  const wrapRef = useRef(null);
  const countRef = useRef(null);

  useEffect(() => {
    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(wrapRef.current, {
          yPercent: -100,
          duration: 1.1,
          ease: 'power4.inOut',
          onComplete: () => {
            setHidden(true);
            onDone?.();
          },
        });
      },
    });

    tl.to(fillRef.current, { scaleY: 1, duration: 1.6, ease: 'power2.inOut' }, 0);
    tl.to(counter, {
      v: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (countRef.current) countRef.current.textContent = Math.round(counter.v).toString().padStart(2, '0');
      },
    }, 0);
    tl.to({}, { duration: 0.35 });

    return () => tl.kill();
  }, [onDone]);

  if (hidden) return null;

  return (
    <div ref={wrapRef} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#3C2620]">
      <div className="relative w-24 h-32 overflow-hidden rounded-t-full rounded-b-lg border border-[#E7CD8F]/40">
        <div
          ref={fillRef}
          className="absolute bottom-0 left-0 right-0 origin-bottom"
          style={{ height: '100%', transform: 'scaleY(0)', background: 'linear-gradient(180deg,#F1C7CF,#C8A24A)' }}
        />
      </div>
      <div className="mt-8 flex items-baseline gap-2 font-display text-[#FBF3E7]">
        <span ref={countRef} className="text-4xl tracking-widest">00</span>
        <span className="text-sm eyebrow text-[#E7CD8F]">baking</span>
      </div>
    </div>
  );
}
