import React, { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Section = ({ children, id, className = '', style }: SectionProps) => (
  <section
    id={id}
    className={`py-24 px-6 md:px-12 relative bg-no-repeat bg-cover bg-center scroll-mt-20 ${className}`}
    style={style}
  >
    {style?.backgroundImage && (
      <div className="absolute inset-0 bg-cream-100/70 pointer-events-none z-0"></div>
    )}
    <div className="max-w-6xl mx-auto relative z-10">{children}</div>
  </section>
);