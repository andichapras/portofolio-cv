import { describe, expect, it } from 'vitest';
import { isReadingPosition } from './reading-position';

describe('language reading position', () => {
  const state = { path: '/id/', time: 1000, scrollY: 200, sectionId: 'work', progress: 0.5 };

  it('accepts a recent position only for its destination', () => {
    expect(isReadingPosition(state, '/id/', 2000)).toBe(true);
    expect(isReadingPosition(state, '/', 2000)).toBe(false);
    expect(isReadingPosition(state, '/id/', 16000)).toBe(false);
    expect(isReadingPosition(state, '/id/', 999)).toBe(false);
  });

  it('accepts a pixel fallback on pages without named sections', () => {
    expect(isReadingPosition({ path: '/', time: 1000, scrollY: 0 }, '/', 1001)).toBe(true);
  });

  it('rejects malformed storage and invalid coordinates', () => {
    for (const value of [null, {}, 'work', { ...state, scrollY: -1 }, { ...state, time: NaN }]) {
      expect(isReadingPosition(value, '/id/', 2000)).toBe(false);
    }
    for (const progress of [-1, 1.1, Infinity, '0.5']) {
      expect(isReadingPosition({ ...state, progress }, '/id/', 2000)).toBe(false);
    }
  });
});
