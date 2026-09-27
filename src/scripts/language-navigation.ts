export {};

const storageKey = 'portfolio-language-navigation';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const nativeTransitions = 'onpagereveal' in window;
let navigating = false;

// Only a deliberate language switch restores position, never ordinary links or reloads.
try {
  const stored = sessionStorage.getItem(storageKey);
  sessionStorage.removeItem(storageKey);
  if (stored) {
    const state: unknown = JSON.parse(stored);
    if (
      typeof state === 'object' &&
      state !== null &&
      'path' in state &&
      state.path === location.pathname &&
      'time' in state &&
      typeof state.time === 'number' &&
      Date.now() - state.time < 15000 &&
      'scrollY' in state &&
      typeof state.scrollY === 'number' &&
      Number.isFinite(state.scrollY)
    ) {
      window.scrollTo({ top: Math.max(0, state.scrollY), behavior: 'instant' });
      document.querySelector<HTMLElement>('[data-language-link][aria-current]')?.focus({
        preventScroll: true,
      });
      if (!nativeTransitions && !reducedMotion.matches) {
        document
          .querySelector('main')
          ?.animate(
            [{ opacity: 0.6, transform: 'translateY(5px)' }, { opacity: 1, transform: 'none' }],
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
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.hasAttribute('aria-current')) {
      event.preventDefault();
      return;
    }
    if (navigating) {
      event.preventDefault();
      return;
    }

    const destination = new URL(link.href);
    destination.hash = location.hash;
    link.href = destination.href;
    try {
      sessionStorage.setItem(
        storageKey,
        JSON.stringify({
          path: destination.pathname,
          scrollY: window.scrollY,
          time: Date.now(),
        }),
      );
    } catch {
      // The ordinary anchor remains usable without storage.
    }

    // Unsupported browsers get a short fade, not a custom router or DOM replacement.
    if (nativeTransitions || reducedMotion.matches) return;
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
