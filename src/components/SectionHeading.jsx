export default function SectionHeading({ index, label, title, italic, light, className = '' }) {
  return (
    <div className={`reveal-heading ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <span className={`font-display text-sm ${light ? 'text-[#E7CD8F]' : 'text-[#C8A24A]'}`}>{index}</span>
        <span className={`h-px w-10 ${light ? 'bg-[#E7CD8F]/50' : 'bg-[#C8A24A]/50'}`} />
        <span className={`eyebrow ${light ? 'text-[#F3E6D3]/70' : 'text-[#6E4A3B]/70'}`}>{label}</span>
      </div>
      <h2 className={`font-display text-[10vw] md:text-[4.2vw] leading-[0.95] ${light ? 'text-[#FBF3E7]' : 'text-[#3C2620]'} ${italic ? 'italic font-light' : 'font-medium'}`}>
        {title}
      </h2>
    </div>
  );
}
