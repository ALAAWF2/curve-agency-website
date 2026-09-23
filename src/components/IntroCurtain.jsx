import React, { useEffect, useState } from 'react';
import { introShouldPlay, markIntroSeen, setIntroActive } from '../lib/intro';

import { asset } from '../lib/asset';
/**
 * Black curtain with the CURVE mark, played once per browser session.
 * Total run ~1s: 520ms hold, 520ms lift.
 */
export default function IntroCurtain() {
  const [phase, setPhase] = useState(() => {
    if (!introShouldPlay()) {
      setIntroActive(false);
      return 'off';
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      markIntroSeen();
      setIntroActive(false);
      return 'off';
    }
    setIntroActive(true);
    return 'hold';
  });

  useEffect(() => {
    if (phase === 'off') {
      setIntroActive(false);
      return undefined;
    }

    const lift = setTimeout(() => setPhase('lift'), 520);
    const done = setTimeout(() => {
      markIntroSeen();
      setPhase('off');
      setIntroActive(false);
    }, 1040);

    return () => {
      clearTimeout(lift);
      clearTimeout(done);
    };
  }, [phase]);

  if (phase === 'off') return null;

  return (
    <div
      className={`intro-curtain${phase === 'lift' ? ' intro-curtain-lift' : ''}`}
      aria-hidden="true"
    >
      <img src={asset("/assets/svg/curve_logo_white.svg")} alt="" className="intro-mark" />
      <span className="intro-line" />
    </div>
  );
}
