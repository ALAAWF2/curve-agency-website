import React, { useEffect, useState } from 'react';
import { SECTIONS } from '../data/sections';

const useScrollState = () => {
  const [state, setState] = useState({ progress: 0, index: 1 });

  useEffect(() => {
    let raf = 0;

    const measure = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

      let index = 1;
      for (let i = 0; i < SECTIONS.length; i += 1) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.getBoundingClientRect().top <= 160) index = i + 1;
      }
      setState((prev) =>
        prev.progress === progress && prev.index === index ? prev : { progress, index }
      );
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return state;
};

const pad = (n) => String(n).padStart(2, '0');

/** Thin white progress rail glued to the bottom edge of the fixed header. */
export function ReadingBar() {
  const { progress } = useScrollState();
  return (
    <div className="reading-bar" aria-hidden="true">
      <div className="reading-bar-fill" style={{ width: `${progress * 100}%` }} />
    </div>
  );
}

/** "03 / 08 — SELECTED WORK" chip that follows the reader through the page. */
export default function SectionIndex({ lang = 'en' }) {
  const { index } = useScrollState();
  const section = SECTIONS[index - 1] || SECTIONS[0];

  return (
    <span
      className="hidden xl:inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-neutral-500 uppercase"
      aria-hidden="true"
    >
      <span className="text-neutral-300">{pad(index)}</span>
      <span className="text-neutral-600">/</span>
      <span className="text-neutral-600">{pad(SECTIONS.length)}</span>
      <span className="w-4 h-px bg-neutral-700" />
      <span className="text-neutral-400">{section.label[lang] || section.label.en}</span>
    </span>
  );
}
