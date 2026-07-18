import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CakeHero, Strawberry, Macaron, Blueberry, ChocolateChunk, CreamSwirl, MintLeaf, Sparkle } from './icons/Ornaments';

gsap.registerPlugin(ScrollTrigger);

const FLOATERS = [
  { Cmp: Strawberry, top: '18%', left: '12%', size: 64, depth: 40, scrollSpeed: 0.6, delay: 0 },
  { Cmp: Macaron, top: '68%', left: '10%', size: 88, depth: 25, scrollSpeed: 0.3, delay: 0.4 },
  { Cmp: Blueberry, top: '30%', left: '82%', size: 46, depth: 55, scrollSpeed: 0.75, delay: 0.2 },
  { Cmp: ChocolateChunk, top: '72%', left: '80%', size: 60, depth: 35, scrollSpeed: 0.45, delay: 0.6 },
  { Cmp: CreamSwirl, top: '10%', left: '68%', size: 54, depth: 20, scrollSpeed: 0.25, delay: 0.1 },
  { Cmp: MintLeaf, top: '50%', left: '6%', size: 42, depth: 60, scrollSpeed: 0.8, delay: 0.5 },
  { Cmp: MintLeaf, top: '86%', left: '46%', size: 34, depth: 30, scrollSpeed: 0.35, delay: 0.8 },
  { Cmp: Sparkle, top: '22%', left: '42%', size: 24, depth: 70, scrollSpeed: 0.9, delay: 0.15 },
  { Cmp: Sparkle, top: '78%', left: '62%', size: 20, depth: 65, scrollSpeed: 0.85, delay: 0.9 },
  { Cmp: Blueberry, top: '58%', left: '90%', size: 28, depth: 50, scrollSpeed: 0.5, delay: 1 },
  { Cmp: Strawberry, top: '82%', left: '18%', size: 40, depth: 45, scrollSpeed: 0.55, delay: 0.3 },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const cakeRef = useRef(null);
  const floaterRefs = useRef([]);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance
      const tl = gsap.timeline({ delay: 1.2 });
      tl.from(cakeRef.current, { y: 120, opacity: 0, scale: 0.85, duration: 1.4, ease: 'power4.out' })
        .from('.hero-word', { yPercent: 120, stagger: 0.08, duration: 1.1, ease: 'power4.out' }, '-=1')
        .from('.hero-eyebrow', { opacity: 0, y: 12, duration: 0.8 }, '-=0.8')
        .from(floaterRefs.current, { opacity: 0, scale: 0.4, stagger: 0.06, duration: 1, ease: 'back.out(1.7)' }, '-=1');

      // idle float loop for each ornament
      floaterRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: `+=${14 + (i % 4) * 6}`,
          x: `+=${(i % 2 === 0 ? 1 : -1) * (6 + (i % 3) * 4)}`,
          rotation: (i % 2 === 0 ? 1 : -1) * (6 + (i % 5)),
          duration: 3 + (i % 4),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: FLOATERS[i]?.delay || 0,
        });
      });

      // mouse parallax
      const onMouseMove = (e) => {
        const { innerWidth, innerHeight } = window;
        const relX = (e.clientX / innerWidth - 0.5) * 2;
        const relY = (e.clientY / innerHeight - 0.5) * 2;
        gsap.to(cakeRef.current, { x: relX * 18, y: relY * 12, duration: 0.8, ease: 'power2.out' });
        floaterRefs.current.forEach((el, i) => {
          if (!el) return;
          const depth = FLOATERS[i]?.depth || 30;
          gsap.to(el, { x: `+=${relX * depth * 0.12}`, y: `+=${relY * depth * 0.12}`, duration: 1.2, ease: 'power2.out', overwrite: 'auto' });
        });
      };
      const sectionEl = sectionRef.current;
      sectionEl.addEventListener('mousemove', onMouseMove);

      // scroll parallax + zoom out
      floaterRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          yPercent: -100 * (FLOATERS[i]?.scrollSpeed || 0.5),
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      gsap.to(cakeRef.current, {
        scale: 0.75,
        y: -60,
        opacity: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(titleRef.current, {
        opacity: 0,
        yPercent: -40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '40% top',
          scrub: 1,
        },
      });

      return () => sectionEl.removeEventListener('mousemove', onMouseMove);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#FBF3E7] via-[#F6E9D8] to-[#F1DFC4]">
      {/* animated gradient glow */}
      <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[140vw] h-[140vw] rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, #F1C7CF 0%, transparent 60%)' }} />

      {FLOATERS.map(({ Cmp, top, left, size }, i) => (
        <div
          key={i}
          ref={(el) => (floaterRefs.current[i] = el)}
          className="absolute drop-shadow-xl"
          style={{ top, left, width: size, height: size }}
        >
          <Cmp className="w-full h-full" />
        </div>
      ))}

      <div ref={titleRef} className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <span className="hero-eyebrow eyebrow text-[#8A5A3E] mb-5">Maison Crème — Est. Atelier</span>
        <h1 className="font-display text-center text-[#3C2620] leading-[0.95] overflow-hidden">
          <div className="overflow-hidden"><span className="hero-word block text-[15vw] md:text-[8vw] font-light italic">Every</span></div>
          <div className="overflow-hidden"><span className="hero-word block text-[15vw] md:text-[8vw] font-medium -mt-2 md:-mt-4">Layer</span></div>
          <div className="overflow-hidden"><span className="hero-word block text-[15vw] md:text-[8vw] font-light italic -mt-2 md:-mt-4">Tells a Story</span></div>
        </h1>
      </div>

      <div ref={cakeRef} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70vw] max-w-[480px] z-[5]">
        <CakeHero className="w-full h-auto" />
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70 z-10">
        <span className="eyebrow text-[#3C2620]">Scroll to begin</span>
        <div className="w-px h-10 bg-[#3C2620]/40 animate-pulse" />
      </div>
    </section>
  );
}
