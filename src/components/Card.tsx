import { ReactNode, CSSProperties } from 'react';

export default function Card({
  children,
  title,
  subtitle,
  style,
  className = '',
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        background: '#FFFFFF',
        border: '1.5px solid #F4C0D1',
        borderRadius: 16,
        padding: 16,
        marginTop: 12,
        ...style,
      }}
    >
      {title && (
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: '#4B1528',
            marginBottom: subtitle ? 4 : 10,
            letterSpacing: 0.3,
          }}
        >
          {title}
        </div>
      )}
      {subtitle && (
        <div style={{ fontSize: 11, color: '#72243E', marginBottom: 10 }}>
          {subtitle}
        </div>
      )}
      {children}
    </div>
  );
}
