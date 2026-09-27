type Theme = 'light' | 'dark';

const storageKey = 'portfolio-theme';
const root = document.documentElement;
const toggle = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
const themeColor = document.querySelector<HTMLMetaElement>('[data-theme-color]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let transitionTimer: number | undefined;

const readStoredTheme = (): Theme | null => {
  try {
    const value = localStorage.getItem(storageKey);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
};

const getCurrentTheme = (): Theme => (root.dataset.theme === 'light' ? 'light' : 'dark');

const syncToggle = (theme: Theme) => {
  if (!toggle) return;
  const targetTheme = theme === 'dark' ? 'light' : 'dark';
  toggle.dataset.currentTheme = theme;
  const indonesian = root.lang === 'id';
  toggle.setAttribute('aria-label', indonesian ? 'Mode gelap' : 'Dark mode');
  toggle.setAttribute('aria-pressed', String(theme === 'dark'));
  toggle.title = indonesian
    ? `Beralih ke mode ${targetTheme === 'dark' ? 'gelap' : 'terang'}`
    : `Switch to ${targetTheme} mode`;
};

const applyTheme = (theme: Theme, animate = false) => {
  if (animate && !reducedMotion.matches) {
    window.clearTimeout(transitionTimer);
    root.dataset.themeTransition = 'true';
    transitionTimer = window.setTimeout(() => {
      delete root.dataset.themeTransition;
    }, 360);
  }

  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  themeColor?.setAttribute('content', theme === 'light' ? '#f4f6f1' : '#0c0e12');
  syncToggle(theme);
  window.dispatchEvent(new CustomEvent('portfolio:themechange', { detail: { theme } }));
};

toggle?.addEventListener('click', () => {
  const nextTheme: Theme = getCurrentTheme() === 'dark' ? 'light' : 'dark';

  try {
    localStorage.setItem(storageKey, nextTheme);
  } catch {
    // The current page can still switch theme when storage is unavailable.
  }

  applyTheme(nextTheme, true);
});

window.addEventListener('storage', (event) => {
  if (event.key !== storageKey) return;
  const storedTheme = readStoredTheme();
  applyTheme(storedTheme ?? 'dark', true);
});

applyTheme(getCurrentTheme());
// Keep appearance stable during loading, enabling interaction only once handlers exist.
if (toggle) toggle.disabled = false;
