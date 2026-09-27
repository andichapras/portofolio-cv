// Keep wraparound and gesture rules independent from DOM presentation.
export function wrapIndex(index: number, count: number): number {
  return count > 0 ? ((index % count) + count) % count : 0;
}

export function slideOffset(index: number, active: number, count: number): number {
  const distance = wrapIndex(index - active, count);
  return distance > count / 2 ? distance - count : distance;
}

export function swipeDirection(x: number, y: number): number {
  if (Math.abs(x) < 45 || Math.abs(x) <= Math.abs(y) * 1.3) return 0;
  return x < 0 ? 1 : -1;
}
