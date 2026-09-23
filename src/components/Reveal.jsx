import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { isIntroActive, onIntroDone } from '../lib/intro';

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Scroll-triggered reveal.
 *
 * <Reveal>              — fade + rise as one block
 * <Reveal stagger>      — children rise one after another
 * <Reveal delay={120}>  — extra offset in ms
 *
 * The entrance is driven by the Web Animations API, NOT by CSS transitions.
 * CSS is only allowed to *hide* the block before it plays (`.rv-hidden`, opacity
 * only, no `transition` declared). That matters: unlayered CSS rules would
 * outrank Tailwind's own `transition-all` on the very same nodes — which used
 * to replace a card's real hover transition (shadow/border) and leave the
 * stagger delay glued to every hover. Animating through WAAPI leaves the
 * element's `transition` completely untouched, so hover physics stay exactly
 * the component's own while the entrance plays.
 */
export default function Reveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  stagger = false,
  elementRef,
  children,
  ...rest
}) {
  const ownRef = useRef(null);
  const [reduced] = useState(prefersReduced);
  const [inView, setInView] = useState(false);
  const [introDone, setIntroDone] = useState(() => !isIntroActive());
  const [started, setStarted] = useState(false);
  const animsRef = useRef([]);

  const setNode = (node) => {
    ownRef.current = node;
    if (elementRef) elementRef.current = node;
  };

  useEffect(() => {
    if (introDone) return undefined;
    return onIntroDone(() => setIntroDone(true));
  }, [introDone]);

  useEffect(() => {
    const el = ownRef.current;
    if (!el || reduced || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }

    let fired = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fired = true;
          setInView(true);
          io.disconnect();
        }
      },
      // threshold 0 so tall sections (taller than the viewport) still trigger.
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);

    // Safety net: never leave content hidden, but only ever reveal something
    // that is actually on screen — otherwise the page reveals itself off-camera.
    const failsafe = setInterval(() => {
      if (fired) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        fired = true;
        setInView(true);
        clearInterval(failsafe);
      }
    }, 1200);

    return () => {
      io.disconnect();
      clearInterval(failsafe);
    };
  }, [reduced]);

  const ready = !reduced && inView && introDone;

  // Runs before paint, so the block is never visible in its resting state for a
  // frame before the entrance starts.
  useLayoutEffect(() => {
    const el = ownRef.current;
    if (!ready || started || !el || typeof el.animate !== 'function') return;

    const targets = stagger ? Array.from(el.children) : [el];
    if (!targets.length) {
      setStarted(true);
      return;
    }

    animsRef.current = targets.map((node, index) =>
      node.animate(
        [
          { opacity: 0, transform: 'translate3d(0, 12px, 0)' },
          { opacity: 1, transform: 'none' },
        ],
        {
          duration: stagger ? 620 : 800,
          delay: delay + (stagger ? Math.min(index, 11) * 45 : 0),
          easing: EASE,
          fill: 'both',
        }
      )
    );
    animsRef.current.forEach((anim) => {
      // Release the fill once done: resting styles equal the last keyframe, so
      // nothing moves and no compositor layer is kept alive.
      anim.finished.catch(() => {}).then(() => anim.cancel());
    });
    setStarted(true);
  }, [ready, started, stagger, delay]);

  useEffect(
    () => () => {
      animsRef.current.forEach((anim) => anim.cancel());
      animsRef.current = [];
    },
    []
  );

  const hidden = !reduced && !started;
  const classes = [hidden ? 'rv-hidden' : '', className].filter(Boolean).join(' ');

  return (
    <Tag ref={setNode} className={classes} {...rest}>
      {children}
    </Tag>
  );
}
