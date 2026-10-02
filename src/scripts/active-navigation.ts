export {};

const links = document.querySelectorAll<HTMLAnchorElement>('[data-nav-section]');
const sections = ['experience', 'work', 'about', 'contact', 'playground']
  .map((id) => document.getElementById(id))
  .filter((section): section is HTMLElement => section !== null);

// Detail pages keep their server-rendered state; the homepage follows reading position.
if (sections.length > 0) {
  let frame = 0;
  let previous: string | null = null;
  const update = () => {
    frame = 0;
    let current = '';
    const readingLine = Math.min(window.innerHeight * 0.35, 220);
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= readingLine) current = section.id;
    }
    if (current === previous) return;
    previous = current;
    for (const link of links) {
      if (link.dataset.navSection === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  };
  const schedule = () => {
    if (!frame) frame = window.requestAnimationFrame(update);
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  window.addEventListener('pagehide', () => {
    window.cancelAnimationFrame(frame);
    frame = 0;
  });
  update();
}
