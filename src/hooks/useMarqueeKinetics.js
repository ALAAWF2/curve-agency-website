import { useEffect } from 'react';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

/**
 * Turns a plain CSS marquee into a kinetic one:
 *  - speed follows scroll velocity (fast scroll = fast ribbon, it settles back)
 *  - pauses while hovered
 *  - drag/scrub with pointer (mouse or thumb) while touch scrolling still works vertically
 * No-ops for reduced-motion users, where the CSS animation keeps running as-is.
 */
export function useMarqueeKinetics(ref, { reverse = false, maxRate = 5, minRate = 0.3 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof el.getAnimations !== 'function') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const anim = el.getAnimations()[0];
    if (!anim) return undefined;

    let rate = 1;
    let velocity = 0;
    let lastY = window.scrollY;
    let hovering = false;
    let dragging = false;
    let dragOriginX = 0;
    let dragOriginY = 0;
    let dragOriginTime = 0;
    let raf = 0;
    let cancelled = false;

    const loopMs = () => {
      const timing = anim.effect && anim.effect.getTiming ? anim.effect.getTiming() : null;
      const duration = timing && typeof timing.duration === 'number' ? timing.duration : 35000;
      return duration > 0 && Number.isFinite(duration) ? duration : 35000;
    };

    const onScroll = () => {
      const y = window.scrollY;
      velocity = y - lastY;
      lastY = y;
    };

    const onEnter = () => { hovering = true; };
    const onLeave = () => { hovering = false; };

    const onPointerDown = (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      dragging = true;
      dragOriginX = event.clientX;
      dragOriginY = event.clientY;
      dragOriginTime = Number(anim.currentTime) || 0;
      el.dataset.dragging = 'true';
      try { el.setPointerCapture(event.pointerId); } catch { /* not fatal */ }
    };

    const onPointerMove = (event) => {
      if (!dragging) return;
      const dx = event.clientX - dragOriginX;
      const dy = event.clientY - dragOriginY;
      if (Math.abs(dy) > Math.abs(dx) * 1.6) return; // it is a page scroll, let it go
      const loop = loopMs();
      const delta = (reverse ? -dx : dx) * 2.2;
      const next = dragOriginTime - delta;
      anim.currentTime = ((next % loop) + loop) % loop;
      event.preventDefault();
    };

    const endDrag = (event) => {
      if (!dragging) return;
      dragging = false;
      delete el.dataset.dragging;
      try { el.releasePointerCapture(event.pointerId); } catch { /* not fatal */ }
    };

    const tick = () => {
      if (cancelled) return;
      const desired = dragging || hovering ? 0 : clamp(1 + velocity * 0.045, minRate, maxRate);
      rate += (desired - rate) * 0.12;
      velocity *= 0.9;
      anim.playbackRate = Math.max(0.02, rate);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', endDrag);
    el.addEventListener('pointercancel', endDrag);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', endDrag);
      el.removeEventListener('pointercancel', endDrag);
    };
  }, [ref, reverse, maxRate, minRate]);
}
