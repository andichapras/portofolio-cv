import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Render on interaction/scroll only; no perpetual animation loop. */
export function mountSystemScene(host: HTMLElement): () => void {
  const container = host.querySelector<HTMLElement>('[data-canvas]');
  const status = host.querySelector<HTMLElement>('[data-status]');
  const explodeButton = host.querySelector<HTMLButtonElement>('[data-explode]');
  const interaction = host.querySelector<HTMLElement>('[data-interaction]');
  const resetButton = host.querySelector<HTMLButtonElement>('[data-reset]');
  if (!container || !status || !explodeButton || !interaction || !resetButton) return () => {};
  // 1. Create the renderer; keep the static preview if WebGL is unavailable.
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch {
    status.textContent = 'Static preview · WebGL is unavailable on this device.';
    return () => {};
  }
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-4, 4, 4, -4, .1, 100);
  camera.position.set(6, 5, 7); camera.lookAt(0, 0, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  container.append(renderer.domElement);
  const group = new THREE.Group(); scene.add(group);
  scene.add(new THREE.AmbientLight(0xffffff, 2));
  const light = new THREE.DirectionalLight(0xffffff, 3); light.position.set(3, 8, 5); scene.add(light);
  // 2. Build the layers and track GPU resources for cleanup.
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const layers = [0xb6cdfd, 0xd5f88c, 0x8b95a7].map((color, index) => {
    const layer = new THREE.Group();
    const geometry = new THREE.BoxGeometry(3.5, .18, 2.5); geometries.push(geometry);
    const material = new THREE.MeshStandardMaterial({ color, roughness: .45, metalness: .15 }); materials.push(material);
    layer.add(new THREE.Mesh(geometry, material));
    const edgeGeometry = new THREE.EdgesGeometry(geometry); geometries.push(edgeGeometry);
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: .35 }); materials.push(edgeMaterial);
    layer.add(new THREE.LineSegments(edgeGeometry, edgeMaterial));
    for (let n = 0; n < 3; n++) {
      const blockGeometry = new THREE.BoxGeometry(.7, .18, .65); geometries.push(blockGeometry);
      const block = new THREE.Mesh(blockGeometry, material); block.position.set((n - 1) * 1.05, .18, 0); layer.add(block);
    }
    layer.position.y = (1 - index) * .7; group.add(layer); return layer;
  });
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const state = { gap: .7, rotation: 0, tilt: 0 };
  let userControlled = false;
  let drag: { id: number; x: number; y: number; rotation: number; tilt: number; touch: boolean } | null = null;
  let visible = true;
  let disposed = false;
  let exploded = false;
  let scrollRotation = 0;
  let trigger: ScrollTrigger | undefined;
  const events = new AbortController();
  // 3. Render only when needed and while the illustration is visible.
  const draw = () => {
    if (disposed || !visible || document.hidden) return;
    layers.forEach((layer, index) => { layer.position.y = (1 - index) * state.gap; });
    group.rotation.y = state.rotation + scrollRotation;
    group.rotation.x = state.tilt;
    renderer.render(scene, camera);
  };
  // Match the camera framing to the card's responsive dimensions.
  const resize = new ResizeObserver(() => {
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height || disposed) return;
    camera.left = -3.3 * width / height; camera.right = 3.3 * width / height;
    camera.top = 3.3; camera.bottom = -3.3; camera.updateProjectionMatrix();
    renderer.setSize(width, height); draw();
  });
  resize.observe(container);
  const visibility = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? false; if (visible) draw(); });
  visibility.observe(host);
  const animate = (values: { gap?: number; rotation?: number; tilt?: number }) => {
    gsap.to(state, { ...values, duration: motion.matches ? 0 : .65, ease: 'power2.out', overwrite: 'auto', onUpdate: draw });
  };
  // 4. Apply decorative scroll motion until the visitor takes control.
  const updateMotion = () => {
    trigger?.kill(); trigger = undefined; scrollRotation = 0;
    gsap.killTweensOf(state);
    if (!motion.matches && !userControlled) {
      gsap.registerPlugin(ScrollTrigger);
      trigger = ScrollTrigger.create({ trigger: host, start: 'top bottom', end: 'bottom top', onUpdate: (self) => { scrollRotation = self.progress * .3; draw(); } });
    }
    draw();
  };
  // Hand ownership to the visitor without jumping from the scroll-driven pose.
  const takeControl = () => {
    userControlled = true;
    state.rotation += scrollRotation; scrollRotation = 0;
    trigger?.kill(); trigger = undefined;
    gsap.killTweensOf(state, 'rotation,tilt');
  };
  const endDrag = () => {
    const pointerId = drag?.id;
    drag = null;
    delete interaction.dataset.dragging;
    if (pointerId !== undefined && interaction.hasPointerCapture(pointerId)) interaction.releasePointerCapture(pointerId);
  };
  // 5. Capture the starting pose so drag movement stays relative to the pointer.
  interaction.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || event.button !== 0 || drag) return;
    takeControl();
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, rotation: state.rotation, tilt: state.tilt, touch: event.pointerType === 'touch' };
    interaction.setPointerCapture(event.pointerId);
    interaction.dataset.dragging = 'true';
    if (event.pointerType !== 'touch') interaction.focus({ preventScroll: true });
  }, { signal: events.signal });
  interaction.addEventListener('pointermove', (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    const width = Math.max(interaction.clientWidth, 1);
    state.rotation = drag.rotation + (event.clientX - drag.x) / width * Math.PI * 2;
    // Touch reserves vertical movement for page scrolling, including pinch zoom.
    if (!drag.touch) state.tilt = THREE.MathUtils.clamp(drag.tilt + (event.clientY - drag.y) / width * Math.PI, -.65, .65);
    draw();
  }, { signal: events.signal });
  for (const eventName of ['pointerup', 'pointercancel', 'lostpointercapture'] as const) {
    interaction.addEventListener(eventName, (event) => { if (event.pointerId === drag?.id) endDrag(); }, { signal: events.signal });
  }
  // Provide the same rotation controls without requiring a mouse or touchscreen.
  interaction.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home'].includes(event.key)) return;
    event.preventDefault(); takeControl();
    if (event.key === 'Home') { animate({ rotation: 0, tilt: 0 }); return; }
    animate({
      rotation: state.rotation + (event.key === 'ArrowLeft' ? -.2 : event.key === 'ArrowRight' ? .2 : 0),
      tilt: THREE.MathUtils.clamp(state.tilt + (event.key === 'ArrowUp' ? -.12 : event.key === 'ArrowDown' ? .12 : 0), -.65, .65),
    });
  }, { signal: events.signal });
  window.addEventListener('blur', endDrag, { signal: events.signal });
  explodeButton.addEventListener('click', () => { exploded = !exploded; explodeButton.setAttribute('aria-pressed', String(exploded)); animate({ gap: exploded ? 1.4 : .7 }); }, { signal: events.signal });
  resetButton.addEventListener('click', () => { endDrag(); takeControl(); exploded = false; explodeButton.setAttribute('aria-pressed', 'false'); animate({ gap: .7, rotation: 0, tilt: 0 }); }, { signal: events.signal });
  motion.addEventListener('change', updateMotion, { signal: events.signal });
  document.addEventListener('visibilitychange', () => { if (document.hidden) endDrag(); else draw(); }, { signal: events.signal });
  // 6. Stop events and animations before releasing the renderer and its resources.
  const cleanup = () => {
    if (disposed) return;
    disposed = true;
    endDrag();
    events.abort();
    resize.disconnect();
    visibility.disconnect();
    trigger?.kill();
    gsap.killTweensOf(state);
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    renderer.dispose();
    renderer.domElement.remove();
    delete host.dataset.ready;
    interaction.removeAttribute('tabindex');
    [explodeButton, resetButton].forEach((button) => { button.disabled = true; });
  };
  renderer.domElement.addEventListener('webglcontextlost', (event) => { event.preventDefault(); cleanup(); status.textContent = 'Static preview · 3D context lost. Reload to try again.'; }, { signal: events.signal });
  host.dataset.ready = 'true';
  interaction.tabIndex = 0;
  [explodeButton, resetButton].forEach((button) => { button.disabled = false; });
  status.textContent = 'Interactive concept · explore the layers.';
  updateMotion();
  return cleanup;
}
