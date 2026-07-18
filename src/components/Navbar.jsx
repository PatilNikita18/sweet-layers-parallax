import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { label: 'Ingredients', anchor: 'ingredients' },
  { label: 'Process', anchor: 'process' },
  { label: 'Decoration', anchor: 'decoration' },
  { label: 'Signatures', anchor: 'signatures' },
  { label: 'Gallery', anchor: 'gallery' },
];

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    let lastY = window.scrollY;

    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll();
        const goingDown = y > lastY;
        lastY = y;

        gsap.to(navRef.current, {
          yPercent: goingDown && y > 120 ? -130 : 0,
          duration: 0.5,
          ease: 'power3.out',
        });
      },
    });

    return () => st.kill();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-4 md:py-5 glass rounded-none border-x-0 border-t-0"
    >
      <a href="#top" onClick={(e) => { e.preventDefault(); scrollTo('top'); }} data-hover className="font-display italic text-xl md:text-2xl text-[#3C2620] tracking-wide">
        Maison Crème
      </a>

      <nav className="hidden md:flex items-center gap-8">
        {LINKS.map((link) => (
          <button
            key={link.anchor}
            data-hover
            onClick={() => scrollTo(link.anchor)}
            className="eyebrow text-[#3C2620]/60 hover:text-[#C8A24A] transition-colors duration-300"
          >
            {link.label}
          </button>
        ))}
      </nav>

      <button data-hover onClick={() => scrollTo('finale')} className="eyebrow border border-[#3C2620]/25 rounded-full px-5 py-2 text-[#3C2620] hover:bg-[#3C2620] hover:text-[#FBF3E7] transition-colors duration-300">
        Reserve
      </button>
    </header>
  );
}
