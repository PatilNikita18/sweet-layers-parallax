import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Strawberry, Blueberry, MintLeaf, CreamSwirl, ChocolateChunk, Macaron } from './icons/Ornaments';
import SectionHeading from './SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { Cmp: Strawberry, name: 'Sun-ripened Strawberry', note: 'Picked at dawn' },
  { Cmp: Blueberry, name: 'Wild Blueberry', note: 'Bursting & tart' },
  { Cmp: CreamSwirl, name: 'Whipped Crème', note: 'Whisked to silk' },
  { Cmp: ChocolateChunk, name: 'Single-origin Cacao', note: '72% dark' },
  { Cmp: MintLeaf, name: 'Garden Mint', note: 'A cool finish' },
  { Cmp: Macaron, name: 'Almond Flour', note: 'Delicate crumb' },
];

export default function IngredientsSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const distance = track.scrollWidth - window.innerWidth;

      const scrollTween = gsap.to(track, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${distance + window.innerHeight * 0.4}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray('.ingredient-card').forEach((card) => {
        gsap.fromTo(card, { y: 30, opacity: 0.5, scale: 0.94 }, {
          y: 0, opacity: 1, scale: 1,
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: 'left 82%',
            end: 'left 50%',
            scrub: true,
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="ingredients" ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#F1DFC4] to-[#EAD9BE]">
      <div className="absolute top-16 left-6 md:left-16 z-20">
        <SectionHeading index="01" label="Fresh & Considered" title={<span>Ingredients<br />Worth Waiting For</span>} italic />
      </div>
      <div ref={trackRef} className="absolute top-0 left-0 h-full flex items-center gap-8 pl-6 md:pl-16 pr-[20vw]" style={{ willChange: 'transform' }}>
        <div className="shrink-0 w-[40vw] md:w-[24vw]" />
        {ITEMS.map(({ Cmp, name, note }, i) => (
          <div key={i} className="ingredient-card shrink-0 w-[64vw] sm:w-[38vw] md:w-[22vw] aspect-[3/4] rounded-[2rem] glass p-6 flex flex-col justify-between" data-hover>
            <span className="eyebrow text-[#6E4A3B]/60">0{i + 1}</span>
            <div className="w-24 h-24 md:w-28 md:h-28 mx-auto drop-shadow-lg">
              <Cmp className="w-full h-full" />
            </div>
            <div className="text-center">
              <h3 className="font-display text-xl text-[#3C2620]">{name}</h3>
              <p className="eyebrow text-[#6E4A3B]/60 mt-1 normal-case tracking-normal font-normal text-sm">{note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
