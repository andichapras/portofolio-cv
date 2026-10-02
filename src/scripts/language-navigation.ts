import { isReadingPosition, type ReadingPosition } from '@/lib/reading-position';

const storageKey = 'portfolio-language-navigation';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const nativeTransitions = 'onpagereveal' in window;
let navigating = false;
const readingLine = () => Math.min(window.innerHeight * 0.35, 220);

// Only a deliberate language switch restores position, never ordinary links or reloads.
try {
  const stored = sessionStorage.getItem(storageKey);
  sessionStorage.removeItem(storageKey);
  if (stored) {
    const state: unknown = JSON.parse(stored);
    if (isReadingPosition(state, location.pathname, Date.now())) {
      const restore = () => {
        const section = state.sectionId ? document.getElementById(state.sectionId) : null;
        const top =
          section && state.progress !== undefined
            ? section.getBoundingClientRect().top +
              window.scrollY +
              section.offsetHeight * state.progress -
              readingLine()
            : state.scrollY;
        document.documentElement.setAttribute('data-restoring-position', '');
        window.scrollTo(0, Math.max(0, top));
        requestAnimationFrame(() => {
          document.documentElement.removeAttribute('data-restoring-position');
        });
      };
      // Wait for page layout and native anchor scrolling before restoring the reading section.
      if (document.readyState === 'complete') restore();
      else window.addEventListener('pageshow', restore, { once: true });
      document.querySelector<HTMLElement>('[data-language-link]')?.focus({
        preventScroll: true,
      });
      if (!nativeTransitions && !reducedMotion.matches && 'animate' in Element.prototype) {
        document.querySelector('main')?.animate(
          [
            { opacity: 0.6, transform: 'translateY(5px)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 220, easing: 'ease-out' },
        );
      }
    }
  }
} catch {
  // Restricted storage must not prevent switching languages.
}

document.querySelectorAll<HTMLAnchorElement>('[data-language-link]').forEach((link) => {
  link.addEventListener('click', async (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    if (navigating) {
      event.preventDefault();
      return;
    }

    const destination = new URL(link.href);
    destination.hash = location.hash;
    link.href = destination.href;
    try {
      const state: ReadingPosition = {
        path: destination.pathname,
        scrollY: Math.max(0, window.scrollY),
        time: Date.now(),
      };
      // Translations have different heights; preserve the section, not just document pixels.
      for (const section of document.querySelectorAll<HTMLElement>('main section[id]')) {
        const bounds = section.getBoundingClientRect();
        if (bounds.top <= readingLine() && bounds.bottom > readingLine()) {
          state.sectionId = section.id;
          state.progress = Math.max(0, Math.min(1, (readingLine() - bounds.top) / bounds.height));
          break;
        }
      }
      sessionStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // The ordinary anchor remains usable without storage.
    }

    // Unsupported browsers get a short fade, not a custom router or DOM replacement.
    if (nativeTransitions || reducedMotion.matches || !('animate' in Element.prototype)) return;
    event.preventDefault();
    navigating = true;
    try {
      const animation = document
        .querySelector('main')
        ?.animate([{ opacity: 1 }, { opacity: 0.6 }], { duration: 120, easing: 'ease-out' });
      await animation?.finished;
    } catch {
      // A cancelled animation should still complete the requested navigation.
    } finally {
      window.location.assign(destination.href);
    }
  });
});

// A page restored from the back/forward cache must accept new navigation again.
window.addEventListener('pageshow', () => {
  navigating = false;
});
