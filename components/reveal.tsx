'use client';

import { ReactNode, ElementType } from 'react';
import { useInView } from './use-in-view';

export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref as any}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
        inView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6'
      } ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
}

/**
 * SplitReveal — splits a string of words and animates each in.
 * Used for headlines.
 */
export function SplitReveal({
  text,
  delay = 0,
  staggerMs = 50,
  className = '',
  emphasizeWords = [],
}: {
  text: string;
  delay?: number;
  staggerMs?: number;
  className?: string;
  emphasizeWords?: string[];
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const words = text.split(' ');

  return (
    <span ref={ref as any} className={className}>
      {words.map((w, i) => {
        const isEmphasized = emphasizeWords.includes(w);
        return (
          <span
            key={`${w}-${i}`}
            className="inline-block overflow-hidden align-baseline"
            style={{ marginRight: '0.25em' }}
          >
            <span
              className={`inline-block transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                inView ? 'translate-y-0 opacity-100' : 'translate-y-[1.1em] opacity-0'
              } ${isEmphasized ? 'italic text-terra' : ''}`}
              style={{
                transitionDelay: inView
                  ? `${delay + i * staggerMs}ms`
                  : '0ms',
              }}
            >
              {w}
            </span>
          </span>
        );
      })}
    </span>
  );
}
