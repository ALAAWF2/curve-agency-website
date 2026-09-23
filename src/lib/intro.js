// One-per-session intro curtain state.
// Scroll reveals wait for the curtain to finish so the first screen animates
// *after* the mark fades, instead of behind it.

const KEY = 'curve_intro_seen';

let active = false;
const listeners = new Set();

export function introShouldPlay() {
  try {
    return !sessionStorage.getItem(KEY);
  } catch {
    return false;
  }
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(KEY, '1');
  } catch {
    /* private mode: play it once per load, that is fine */
  }
}

export function setIntroActive(value) {
  active = value;
  if (!value) {
    const pending = [...listeners];
    listeners.clear();
    pending.forEach((cb) => cb());
  }
}

export function isIntroActive() {
  return active;
}

export function onIntroDone(cb) {
  if (!active) {
    cb();
    return () => {};
  }
  listeners.add(cb);
  return () => listeners.delete(cb);
}
