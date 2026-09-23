import { useEffect, useRef, useState } from 'react';

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// "4.2M+" -> { prefix: '', value: 4.2, decimals: 1, comma: false, suffix: 'M+' }
const parse = (raw) => {
  const match = String(raw).match(/^([^0-9]*)([0-9][0-9.,]*)(.*)$/);
  if (!match) return null;
  const [, prefix, number, suffix] = match;
  const clean = number.replace(/,/g, '');
  const decimals = clean.includes('.') ? clean.split('.')[1].length : 0;
  return {
    prefix,
    suffix,
    decimals,
    comma: number.includes(','),
    value: parseFloat(clean),
  };
};

const format = (value, { prefix, suffix, decimals, comma }) => {
  const body = comma
    ? Number(value).toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : value.toFixed(decimals);
  return `${prefix}${body}${suffix}`;
};

/**
 * Counts a metric up from zero the first time it scrolls into view.
 * Falls back to the raw string for non-numeric values and reduced-motion users.
 */
export function useCountUp(raw, { duration = 1500, threshold = 0.45 } = {}) {
  const ref = useRef(null);
  const [text, setText] = useState(raw);

  useEffect(() => {
    const el = ref.current;
    const parsed = parse(raw);
    if (!el || !parsed || Number.isNaN(parsed.value) || prefersReduced()) {
      setText(raw);
      return undefined;
    }

    let raf = 0;
    let start = 0;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setText(format(parsed.value * eased, parsed));
      if (progress < 1) raf = requestAnimationFrame(step);
      else setText(raw);
    };

    setText(format(0, parsed));
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          raf = requestAnimationFrame(step);
        }
      },
      { threshold }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [raw, duration, threshold]);

  return { ref, text };
}
