import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from './SectionHeading';
import ParallaxLayer from './ParallaxLayer';
import { CakeHero, Strawberry, ChocolateChunk, CreamSwirl, MintLeaf, Sparkle } from './icons/Ornaments';

gsap.registerPlugin(ScrollTrigger);

const CAKES = [
  { name: 'Rose & Berry', tag: 'Signature No. 01', Cmp: Strawberry, tint: 'from-[#F1C7CF]/40' },
  { name: 'Midnight Cacao', tag: 'Signature No. 02', Cmp: ChocolateChunk, tint: 'from-[#3C2620]/30' },
  { name: 'Vanilla Cloud', tag: 'Signature No. 03', Cmp: CreamSwirl, tint: 'from-[#E7CD8F]/40' },
];

function TiltCard({ cake }) {
  const cardRef = useRef(null);
  const innerRef = useRef(null);

  const handleMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(innerRef.current, { rotateY: x * 16, rotateX: -y * 16, duration: 0.5, ease: 'power2.out', transformPerspective: 700 });
  };
  const handleLeave = () => gsap.to(innerRef.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' });

  const { Cmp } = cake;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-hover
      className="cake-card relative rounded-[2rem] p-8 glass overflow-hidden"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div ref={innerRef} className="relative" style={{ transformStyle: 'preserve-3d' }}>
        <div className={`absolute -inset-10 bg-gradient-to-br ${cake.tint} to-transparent blur-2xl`} />
        <span className="eyebrow text-[#6E4A3B]/60 relative">{cake.tag}</span>
        <div className="relative w-32 h-32 mx-auto my-8 drop-shadow-2xl">
          <CakeHero className="w-full h-full opacity-90" />
          <div className="absolute -bottom-2 -right-2 w-10 h-10">
            <Cmp className="w-full h-full" />
          </div>
        </div>
        <h3 className="relative font-display text-2xl md:text-3xl text-[#3C2620] text-center">{cake.name}</h3>
      </div>
    </div>
  );
}

export default function SignatureCakes() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cake-card', {
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="signatures" ref={sectionRef} className="relative w-full py-32 md:py-40 px-6 md:px-16 bg-gradient-to-b from-[#F1DFC4] to-[#FBF3E7] overflow-hidden">
      {/* far layer — slow, soft, blurred color blobs for depth */}
      <ParallaxLayer speed={0.3} className="-top-20 -left-16 w-72 h-72 rounded-full blur-3xl opacity-40" style={{ background: 'radial-gradient(circle, #F1C7CF 0%, transparent 70%)' }} />
      <ParallaxLayer speed={0.35} className="top-1/3 right-0 w-96 h-96 rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(circle, #C8A24A 0%, transparent 70%)' }} />

      {/* mid layer — small ornaments drifting a little faster than the blobs */}
      <ParallaxLayer speed={0.6} className="top-24 right-[12%] w-10 h-10 opacity-70"><MintLeaf className="w-full h-full" /></ParallaxLayer>
      <ParallaxLayer speed={0.75} className="bottom-20 left-[8%] w-8 h-8 opacity-70"><Sparkle className="w-full h-full" /></ParallaxLayer>
      <ParallaxLayer speed={0.5} className="bottom-1/3 right-[6%] w-9 h-9 opacity-60"><Sparkle className="w-full h-full" fill="#E3A6B4" /></ParallaxLayer>

      <SectionHeading index="04" label="House Favorites" title="Signature Cakes" italic className="relative z-10 mb-16 md:mb-24" />
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
        {CAKES.map((cake, i) => <TiltCard key={i} cake={cake} />)}
      </div>
    </section>
  );
}
