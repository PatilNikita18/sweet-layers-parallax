// Hand-built flat/gradient SVG ornaments used throughout the parallax scenes.
// Kept as pure, lightweight vector shapes — no external image assets required.

export const Strawberry = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <defs>
      <linearGradient id="straw" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F28FA0" />
        <stop offset="100%" stopColor="#D95C74" />
      </linearGradient>
    </defs>
    <path d="M50 92C25 92 12 62 15 45C18 28 34 22 50 34C66 22 82 28 85 45C88 62 75 92 50 92Z" fill="url(#straw)" />
    {[...Array(10)].map((_, i) => (
      <circle key={i} cx={28 + (i % 5) * 11} cy={48 + Math.floor(i / 5) * 16} r="2.1" fill="#FFE9C7" opacity="0.85" />
    ))}
    <path d="M50 34C44 22 34 14 22 16C30 26 38 30 50 34Z" fill="#5B8A4E" />
    <path d="M50 34C56 22 66 14 78 16C70 26 62 30 50 34Z" fill="#71A360" />
    <path d="M50 34C50 20 50 12 50 6C46 16 46 26 50 34Z" fill="#5B8A4E" />
  </svg>
);

export const Macaron = ({ className, top = '#F1C7CF', shell = '#FBF3E7' }) => (
  <svg viewBox="0 0 100 60" className={className}>
    <ellipse cx="50" cy="16" rx="34" ry="13" fill={top} />
    <path d="M16 16C16 16 12 30 12 30C12 36 24 39 24 32C24 39 38 41 38 33C38 41 50 42 50 34C50 42 62 41 62 33C62 41 76 39 76 32C76 39 88 36 88 30C88 30 84 16 84 16Z" fill="#EFA8B7" />
    <ellipse cx="50" cy="30" rx="20" ry="6" fill="#F9E4C6" />
    <ellipse cx="50" cy="44" rx="34" ry="13" fill={shell} />
  </svg>
);

export const Blueberry = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <defs>
      <radialGradient id="blue" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#8FA6E0" />
        <stop offset="60%" stopColor="#4C5FA0" />
        <stop offset="100%" stopColor="#33417A" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="52" r="38" fill="url(#blue)" />
    <g stroke="#2A3566" strokeWidth="2.5" strokeLinecap="round">
      <path d="M40 20 L44 26" />
      <path d="M50 18 L50 25" />
      <path d="M60 20 L56 26" />
    </g>
  </svg>
);

export const ChocolateChunk = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <defs>
      <linearGradient id="choc" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7A4B36" />
        <stop offset="100%" stopColor="#3C2620" />
      </linearGradient>
    </defs>
    <path d="M20 30 L55 15 L88 32 L82 72 L45 90 L15 68 Z" fill="url(#choc)" />
    <path d="M20 30 L55 15 L88 32 L60 42 Z" fill="#8E5A41" opacity="0.7" />
    <path d="M55 15 L60 42 L45 90 L40 55Z" fill="#2E1C17" opacity="0.4" />
  </svg>
);

export const CreamSwirl = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <defs>
      <linearGradient id="cream" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFCF6" />
        <stop offset="100%" stopColor="#F3E6D3" />
      </linearGradient>
    </defs>
    <path d="M50 95C30 95 22 78 30 66C22 62 20 48 32 42C24 36 28 20 44 20C40 8 58 4 66 14C78 8 92 20 84 34C96 38 94 54 82 58C90 68 82 84 66 82C64 92 56 95 50 95Z" fill="url(#cream)" />
  </svg>
);

export const MintLeaf = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M50 6C80 20 92 52 62 88C50 96 30 90 22 70C10 44 22 16 50 6Z" fill="#7CA36A" />
    <path d="M50 10 C50 40 50 65 46 90" stroke="#4F7A44" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);

export const Sparkle = ({ className, fill = '#C8A24A' }) => (
  <svg viewBox="0 0 60 60" className={className}>
    <path d="M30 2C31 18 32 29 48 30C32 31 31 42 30 58C29 42 28 31 12 30C28 29 29 18 30 2Z" fill={fill} />
  </svg>
);

export const CakeHero = ({ className }) => (
  <svg viewBox="0 0 420 420" className={className}>
    <defs>
      <linearGradient id="tier1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFCF6" />
        <stop offset="100%" stopColor="#F3E6D3" />
      </linearGradient>
      <linearGradient id="tier2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F6E9D8" />
        <stop offset="100%" stopColor="#E8D3B4" />
      </linearGradient>
      <linearGradient id="plate" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#E7CD8F" />
        <stop offset="50%" stopColor="#C8A24A" />
        <stop offset="100%" stopColor="#E7CD8F" />
      </linearGradient>
      <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#3C2620" floodOpacity="0.22" />
      </filter>
    </defs>

    <g filter="url(#soft)">
      {/* plate */}
      <ellipse cx="210" cy="360" rx="150" ry="16" fill="url(#plate)" />
      {/* bottom tier */}
      <rect x="90" y="270" width="240" height="90" rx="14" fill="url(#tier2)" />
      <path d="M90 285 Q210 300 330 285" stroke="#FFFCF6" strokeWidth="6" fill="none" opacity="0.7" />
      {/* middle tier */}
      <rect x="120" y="180" width="180" height="95" rx="14" fill="url(#tier1)" />
      <path d="M120 196 Q210 210 300 196" stroke="#F1C7CF" strokeWidth="6" fill="none" opacity="0.8" />
      {/* top tier */}
      <rect x="150" y="110" width="120" height="75" rx="12" fill="url(#tier2)" />
      {/* drip */}
      <path d="M150 118 Q165 145 155 150 Q170 150 172 130 Q185 155 178 160 Q195 158 196 132 Q210 158 205 165 Q222 160 222 135 Q238 158 228 165 Q248 158 248 130 Q260 150 250 150 Q265 148 270 118 L270 112 L150 112 Z" fill="#E7CD8F" opacity="0.9" />
      {/* piping dots along tiers */}
      {[...Array(7)].map((_, i) => (
        <circle key={i} cx={130 + i * 24} cy={272} r="5" fill="#FFFCF6" />
      ))}
      {[...Array(5)].map((_, i) => (
        <circle key={i} cx={132 + i * 24} cy={182} r="4.5" fill="#F1C7CF" />
      ))}
    </g>
  </svg>
);
