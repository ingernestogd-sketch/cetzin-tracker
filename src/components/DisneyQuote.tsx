import { getDailyQuote } from '../data/quotes';
import { CheshireTail } from './DisneyDecorations';

const Star = ({ delay = 0 }: { delay?: number }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    className="shine"
    style={{ animationDelay: `${delay}s` }}
  >
    <path
      d="M12 2 L14.5 8.5 L21 9 L16 13.5 L17.5 20.5 L12 16.5 L6.5 20.5 L8 13.5 L3 9 L9.5 8.5 Z"
      fill="#EF9F27"
    />
  </svg>
);

export default function DisneyQuote() {
  const { q, a } = getDailyQuote();
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: '#4B1528',
        border: '2px solid #EF9F27',
        borderRadius: 16,
        padding: '18px 18px 22px',
        marginTop: 16,
        color: '#fff',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Star delay={0} />
        <span
          style={{
            color: '#FAC775',
            fontSize: 11,
            letterSpacing: 2,
            fontWeight: 500,
          }}
        >
          INSPIRACION DEL DIA
        </span>
        <Star delay={0.4} />
        <span style={{ marginLeft: 'auto' }}>
          <Star delay={0.8} />
        </span>
      </div>
      <p
        style={{
          fontSize: 15,
          fontStyle: 'italic',
          lineHeight: 1.55,
          margin: 0,
          color: '#fff',
        }}
      >
        “{q}”
      </p>
      <p
        style={{
          fontSize: 12,
          color: '#FAC775',
          marginTop: 10,
          marginBottom: 0,
          textAlign: 'right',
        }}
      >
        — {a}
      </p>
      <div
        style={{
          position: 'absolute',
          right: -6,
          bottom: -10,
          opacity: 0.6,
        }}
      >
        <CheshireTail />
      </div>
    </div>
  );
}
