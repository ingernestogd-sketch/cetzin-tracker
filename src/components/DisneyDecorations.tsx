import { CSSProperties } from 'react';

const noPointer: CSSProperties = { pointerEvents: 'none' };

export const MickeyEars = () => (
  <>
    <div
      aria-hidden
      style={{
        ...noPointer,
        position: 'absolute',
        top: -14,
        left: 24,
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: '#1a0a10',
        zIndex: 5,
      }}
    />
    <div
      aria-hidden
      style={{
        ...noPointer,
        position: 'absolute',
        top: -14,
        right: 24,
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: '#1a0a10',
        zIndex: 5,
      }}
    />
  </>
);

export const DonaldHat = () => (
  <svg
    aria-hidden
    width="44"
    height="38"
    viewBox="0 0 44 38"
    style={{ ...noPointer, position: 'absolute', top: 0, left: 6, opacity: 0.42 }}
  >
    <path d="M4 28 Q 4 6, 22 6 Q 40 6, 40 28 L 36 30 L 8 30 Z" fill="#1A3A8A" />
    <rect x="4" y="26" width="36" height="6" fill="#CC1111" rx="1" />
    <path d="M22 6 Q 22 0, 28 1 Q 26 4, 22 6 Z" fill="#FFFFFF" />
    <circle cx="22" cy="6" r="1.4" fill="#FFFFFF" />
  </svg>
);

export const HatterHat = () => (
  <svg
    aria-hidden
    width="46"
    height="58"
    viewBox="0 0 46 58"
    style={{ ...noPointer, position: 'absolute', top: 0, right: 6, opacity: 0.38 }}
  >
    <ellipse cx="23" cy="52" rx="22" ry="5" fill="#4B1528" />
    <rect x="9" y="14" width="28" height="38" fill="#4B1528" />
    <rect x="9" y="36" width="28" height="9" fill="#EF9F27" />
    <rect x="6" y="14" width="34" height="3" fill="#3a0e1c" />
    <text
      x="23"
      y="42.5"
      fontSize="6"
      fontWeight="700"
      fill="#4B1528"
      textAnchor="middle"
      fontFamily="system-ui"
    >
      10/6
    </text>
  </svg>
);

export const CheshireTail = () => (
  <svg
    aria-hidden
    width="52"
    height="78"
    viewBox="0 0 52 78"
    style={{ ...noPointer, opacity: 0.38 }}
  >
    <path
      d="M5 70 Q 0 50, 14 38 Q 30 28, 28 14 Q 26 4, 38 4 Q 50 4, 48 16 Q 44 36, 30 46 Q 18 56, 22 72 Z"
      fill="#D4537E"
    />
    <path
      d="M9 60 Q 8 52, 18 46 M 18 36 Q 28 30, 30 22 M 32 14 Q 38 10, 44 14"
      stroke="#FBEAF0"
      strokeWidth="3.5"
      fill="none"
      strokeLinecap="round"
    />
    <ellipse cx="44" cy="6" rx="3" ry="2.5" fill="#993556" />
  </svg>
);

export const Jack = () => (
  <svg
    aria-hidden
    width="34"
    height="70"
    viewBox="0 0 34 70"
    style={{ ...noPointer, position: 'absolute', top: 440, right: 0, opacity: 0.25 }}
  >
    <ellipse cx="17" cy="14" rx="13" ry="14" fill="#E0E0D8" />
    <ellipse cx="12" cy="13" rx="2.2" ry="3" fill="#2C2C2A" />
    <ellipse cx="22" cy="13" rx="2.2" ry="3" fill="#2C2C2A" />
    <path
      d="M9 20 Q 17 25, 25 20"
      stroke="#2C2C2A"
      strokeWidth="1.4"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M10 21 L 12 19 L 14 21 L 16 19 L 18 21 L 20 19 L 22 21 L 24 19"
      stroke="#2C2C2A"
      strokeWidth="0.8"
      fill="none"
    />
    <path d="M5 30 L 17 28 L 29 30 L 28 36 L 6 36 Z" fill="#2C2C2A" />
    <path
      d="M11 30 L 11 26 Q 17 24, 23 26 L 23 30"
      fill="#2C2C2A"
    />
    <ellipse cx="17" cy="30" rx="4" ry="1.5" fill="#7A1A1A" />
    <rect x="6" y="36" width="22" height="34" fill="#1a1a18" />
  </svg>
);

const sparklePath =
  'M5 0L6.2 3.8L10 5L6.2 6.2L5 10L3.8 6.2L0 5L3.8 3.8Z';

const Sparkle = ({
  top,
  side,
  color,
  delay,
  size = 10,
}: {
  top: number;
  side: 'left' | 'right';
  color: string;
  delay: number;
  size?: number;
}) => (
  <svg
    aria-hidden
    width={size}
    height={size}
    viewBox="0 0 10 10"
    className="sparkle"
    style={{
      ...noPointer,
      position: 'absolute',
      top,
      [side]: 4,
      animationDelay: `${delay}s`,
    }}
  >
    <path d={sparklePath} fill={color} />
  </svg>
);

export const Sparkles = () => (
  <>
    <Sparkle top={120} side="left" color="#EF9F27" delay={0} size={12} />
    <Sparkle top={300} side="left" color="#ED93B1" delay={0.5} size={9} />
    <Sparkle top={520} side="left" color="#EF9F27" delay={0.8} size={11} />
    <Sparkle top={170} side="right" color="#ED93B1" delay={1.3} size={10} />
    <Sparkle top={380} side="right" color="#EF9F27" delay={1.6} size={12} />
    <Sparkle top={620} side="right" color="#ED93B1" delay={2.0} size={9} />
  </>
);
