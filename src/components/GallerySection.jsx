import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from './SectionHeading';
import { Macaron, CakeHero, Strawberry, ChocolateChunk, CreamSwirl, Blueberry } from './icons/Ornaments';

gsap.registerPlugin(ScrollTrigger);

const PIECES = [
  { Cmp: Macaron, name: 'Rose Macaron', big: false },
  { Cmp: CakeHero, name: 'Layered Celebration', big: true },
  { Cmp: Strawberry, name: 'Strawberry Tart', big: false },
  { Cmp: ChocolateChunk, name: 'Dark Truffle', big: false },
  { Cmp: CreamSwirl, name: 'Chantilly Cloud', big: true },
  { Cmp: Blueberry, name: 'Blueberry Compote', big: false },
];

export default function GallerySection() {
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
          end: () => `+=${distance + window.innerHeight * 0.5}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray('.gallery-piece').forEach((piece) => {
        gsap.fromTo(piece, { scale: 0.7, rotate: -6, opacity: 0.3 }, {
          scale: 1, rotate: 0, opacity: 1,
          scrollTrigger: {
            trigger: piece,
            containerAnimation: scrollTween,
            start: 'left 90%',
            end: 'left 40%',
            scrub: true,
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-[#3C2620]">
      <div className="absolute top-16 left-6 md:left-16 z-20">
        <SectionHeading index="05" label="A Closer Look" title="Dessert Gallery" light />
      </div>
      <div ref={trackRef} className="absolute top-0 left-0 h-full flex items-center gap-10 md:gap-16 pl-6 md:pl-16 pr-[24vw]">
        <div className="shrink-0 w-[40vw] md:w-[22vw]" />
        {PIECES.map(({ Cmp, name, big }, i) => (
          <div key={i} className={`gallery-piece shrink-0 flex flex-col items-center gap-6 ${big ? 'w-[70vw] md:w-[30vw]' : 'w-[50vw] md:w-[20vw]'}`}>
            <div className={`${big ? 'w-56 h-56 md:w-72 md:h-72' : 'w-36 h-36 md:w-44 md:h-44'} drop-shadow-2xl`}>
              <Cmp className="w-full h-full" />
            </div>
            <span className="eyebrow text-[#F3E6D3]/60">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
