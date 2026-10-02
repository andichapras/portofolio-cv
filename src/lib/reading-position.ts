export interface ReadingPosition {
  path: string;
  time: number;
  scrollY: number;
  sectionId?: string;
  progress?: number;
}

// Session storage can be stale or malformed; it must never dictate arbitrary scrolling.
export function isReadingPosition(
  value: unknown,
  path: string,
  now: number,
): value is ReadingPosition {
  if (typeof value !== 'object' || value === null) return false;
  const state = value as Partial<ReadingPosition>;
  return (
    state.path === path &&
    typeof state.time === 'number' &&
    Number.isFinite(state.time) &&
    now >= state.time &&
    now - state.time < 15000 &&
    typeof state.scrollY === 'number' &&
    Number.isFinite(state.scrollY) &&
    state.scrollY >= 0 &&
    (state.sectionId === undefined || typeof state.sectionId === 'string') &&
    (state.progress === undefined ||
      (typeof state.progress === 'number' &&
        Number.isFinite(state.progress) &&
        state.progress >= 0 &&
        state.progress <= 1))
  );
}
