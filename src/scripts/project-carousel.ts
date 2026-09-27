import { slideOffset, swipeDirection, wrapIndex } from '@/lib/carousel';

function initializeCarousel(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>('[data-project-stage]');
  const slides = [...root.querySelectorAll<HTMLElement>('[data-project-slide]')];
  const pickers = [...root.querySelectorAll<HTMLButtonElement>('[data-project-picker]')];
  const status = root.querySelector<HTMLElement>('[data-carousel-status]');
  if (!stage || !status || slides.length < 2) return;

  let active = 0;
  let gesture: { id: number; x: number; y: number } | null = null;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function show(index: number) {
    active = wrapIndex(index, slides.length);
    // Move focus before making the outgoing card inert.
    if (slides.some((slide, i) => i !== active && slide.contains(document.activeElement))) {
      stage?.focus({ preventScroll: true });
    }
    slides.forEach((slide, i) => {
      const offset = slideOffset(i, active, slides.length);
      const distance = Math.abs(offset);
      slide.style.setProperty('--offset', String(offset));
      slide.style.setProperty('--scale', String(1 - Math.min(distance, 3) * 0.12));
      slide.style.setProperty('--turn', `${offset * -9}deg`);
      slide.style.zIndex = String(slides.length - distance);
      slide.dataset.active = String(i === active);
      slide.dataset.visible = String(distance <= 2);
      slide.inert = i !== active;
      slide.setAttribute('aria-hidden', String(i !== active));
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${i + 1} / ${slides.length}: ${slide.dataset.title}`);
    });
    pickers.forEach((picker, i) => {
      picker.setAttribute('aria-disabled', String(i === active));
    });
    if (status) {
      status.textContent = `${active + 1} / ${slides.length} — ${slides[active]?.dataset.title ?? ''}`;
    }
  }

  root.querySelector('[data-previous]')?.addEventListener('click', () => show(active - 1));
  root.querySelector('[data-next]')?.addEventListener('click', () => show(active + 1));
  pickers.forEach((picker, i) =>
    picker.addEventListener('click', () => {
      if (i !== active) show(i);
    }),
  );
  stage.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const destinations: Record<string, number> = {
      ArrowLeft: active - 1,
      ArrowRight: active + 1,
      Home: 0,
      End: slides.length - 1,
    };
    const destination = destinations[event.key];
    if (destination === undefined) return;
    event.preventDefault();
    show(destination);
  });

  const resetGesture = () => {
    if (gesture && stage.hasPointerCapture(gesture.id)) stage.releasePointerCapture(gesture.id);
    gesture = null;
    root.removeAttribute('data-dragging');
    stage.style.removeProperty('--drag');
  };

  // Leave links, vertical scrolling, and pinch zoom to the browser.
  stage.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || event.button !== 0) {
      resetGesture();
      return;
    }
    if (event.target instanceof Element && event.target.closest('a, button')) return;
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY };
    stage.setPointerCapture(event.pointerId);
  });
  stage.addEventListener('pointermove', (event) => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const x = event.clientX - gesture.x;
    const y = event.clientY - gesture.y;
    if (Math.abs(y) > 12 && Math.abs(y) > Math.abs(x)) {
      resetGesture();
      return;
    }
    if (Math.abs(x) > 8 && !reducedMotion.matches) {
      root.dataset.dragging = 'true';
      stage.style.setProperty('--drag', `${Math.max(-65, Math.min(65, x * 0.4))}px`);
    }
  });
  stage.addEventListener('pointerup', (event) => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const direction = swipeDirection(event.clientX - gesture.x, event.clientY - gesture.y);
    resetGesture();
    if (direction) show(active + direction);
  });
  stage.addEventListener('pointercancel', resetGesture);
  stage.addEventListener('lostpointercapture', resetGesture);

  // Enable the layered layout only after the controls are ready.
  root.setAttribute('role', 'region');
  root.setAttribute('aria-roledescription', 'carousel');
  root.setAttribute('aria-labelledby', 'work-title');
  stage.tabIndex = 0;
  stage.setAttribute('role', 'group');
  stage.setAttribute('aria-describedby', 'project-hint');
  root.querySelectorAll<HTMLElement>('[data-carousel-controls]').forEach((control) => {
    control.hidden = false;
  });
  show(0);
  root.dataset.enhanced = 'true';
}

// Full-document navigation owns this module's lifetime; there is no global timer or observer.
document.querySelectorAll<HTMLElement>('[data-project-carousel]').forEach(initializeCarousel);
