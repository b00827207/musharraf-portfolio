'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function Cursor() {
  const [variant, setVariant] = useState<'default' | 'hover' | 'text' | 'view'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { damping: 30, stiffness: 350, mass: 0.4 });
  const springY = useSpring(cursorY, { damping: 30, stiffness: 350, mass: 0.4 });

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window) {
      setIsTouch(true);
      document.body.style.cursor = 'auto';
      return;
    }

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (target.closest('[data-cursor="view"]')) setVariant('view');
      else if (target.closest('a, button, [data-cursor="hover"]')) setVariant('hover');
      else if (target.matches('input, textarea, [data-cursor="text"]')) setVariant('text');
      else setVariant('default');
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouch) return null;

  const sizes = {
    default: { dot: 6, ring: 32 },
    hover: { dot: 4, ring: 56 },
    text: { dot: 2, ring: 24 },
    view: { dot: 4, ring: 80 },
  };

  const { dot, ring } = sizes[variant];

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          className="rounded-full border border-signal"
          animate={{
            width: ring,
            height: ring,
            x: -ring / 2,
            y: -ring / 2,
            borderColor: variant === 'view' ? '#5BE9E9' : 'rgba(232, 228, 220, 0.6)',
          }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        >
          {variant === 'view' && (
            <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] uppercase tracking-[0.2em] text-signal">
              View
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          className="rounded-full bg-bone"
          animate={{
            width: dot,
            height: dot,
            x: -dot / 2,
            y: -dot / 2,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
        />
      </motion.div>
    </>
  );
}
