export {};

const links = document.querySelectorAll<HTMLAnchorElement>('[data-nav-section]');
const sections = ['work', 'about', 'contact']
  .map((id) => document.getElementById(id))
  .filter((section): section is HTMLElement => section !== null);

// Playground uses its server-rendered page state; the homepage follows the reading position.
if (sections.length > 0) {
  let frame = 0;
  const update = () => {
    frame = 0;
    let current = '';
    const readingLine = Math.min(window.innerHeight * 0.35, 220);
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= readingLine) current = section.id;
    }
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
