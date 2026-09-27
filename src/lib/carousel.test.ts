import { describe, expect, it } from 'vitest';
import { slideOffset, swipeDirection, wrapIndex } from './carousel';

describe('project carousel navigation', () => {
  it('wraps in both directions, including repeated navigation', () => {
    expect(wrapIndex(-1, 6)).toBe(5);
    expect(wrapIndex(6, 6)).toBe(0);
    expect(wrapIndex(14, 6)).toBe(2);
    expect(wrapIndex(1, 0)).toBe(0);
  });

  it('positions adjacent cards across the wrap boundary', () => {
    expect(slideOffset(5, 0, 6)).toBe(-1);
    expect(slideOffset(0, 5, 6)).toBe(1);
    expect(slideOffset(2, 2, 6)).toBe(0);
  });

  it('ignores taps and vertical scrolling but accepts deliberate horizontal swipes', () => {
    expect(swipeDirection(12, 0)).toBe(0);
    expect(swipeDirection(60, 100)).toBe(0);
    expect(swipeDirection(60, 50)).toBe(0);
    expect(swipeDirection(-90, 10)).toBe(1);
    expect(swipeDirection(90, 10)).toBe(-1);
  });
});
