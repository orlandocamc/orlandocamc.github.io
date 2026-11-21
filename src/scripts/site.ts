// Shared behaviour: nav tone, active nav item (scroll-spy), reading progress, deferred video slots,
// pause controls, scroll reveals and the shared names of the cross-document view transition.

const d = document.documentElement;
const rm = d.classList.contains('rm');
const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
const saveData = Boolean(conn && conn.saveData);

// ---- nav: glass only while it sits over video; solid on dark or light sections ----
const nav = document.querySelector<HTMLElement>('.nav');
const toned = Array.from(document.querySelectorAll<HTMLElement>('main [data-tone], footer[data-tone]'));
function setTone() {
  const y = (nav ? nav.offsetHeight : 64) / 2;
  let tone = 'dark';
  for (const el of toned) {
    const r = el.getBoundingClientRect();
    if (r.top <= y && r.bottom > y) { tone = el.dataset.tone ?? 'dark'; break; }
  }
  if (nav && nav.dataset.over !== tone) nav.dataset.over = tone;
}

// ---- active nav item: the section under the nav gets aria-current="location" (home page) ----
const spy = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav ul a[href^="#"]'))
  .map((a) => ({ a, el: document.getElementById(a.getAttribute('href')!.slice(1)) }))
  .filter((x): x is { a: HTMLAnchorElement; el: HTMLElement } => Boolean(x.el));
function setActive() {
  if (!spy.length) return;
  const y = (nav ? nav.offsetHeight : 64) + 1;
  let cur: (typeof spy)[number] | null = null;
  for (const x of spy) {
    const r = x.el.getBoundingClientRect();
    if (r.top <= y + window.innerHeight * 0.35 && r.bottom > y) cur = x;
  }
  for (const x of spy) {
    if (x === cur) x.a.setAttribute('aria-current', 'location');
    else x.a.removeAttribute('aria-current');
  }
}

// ---- reading progress (Ficha): CSS scroll timeline where supported, this otherwise ----
const prog = document.querySelector<HTMLElement>('.progress');
const cssProg = typeof CSS !== 'undefined' && CSS.supports('animation-timeline: scroll()');
function setProgress() {
  if (!prog || cssProg) return;
  const max = d.scrollHeight - window.innerHeight;
  prog.style.setProperty('--p', max > 0 ? Math.min(window.scrollY / max, 1).toFixed(4) : '0');
}

let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { ticking = false; setTone(); setActive(); setProgress(); });
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
setTone(); setActive(); setProgress();

// ---- video slots: <video data-src> is filled after load and only near the viewport ----
interface VState { loaded: boolean; paused: boolean; visible: boolean }
const videos = Array.from(document.querySelectorAll<HTMLVideoElement>('video[data-src]'));
const state = new Map<HTMLVideoElement, VState>();
function play(v: HTMLVideoElement) {
  const s = state.get(v);
  if (!s || !s.loaded || s.paused || !s.visible || document.hidden) return;
  v.play().catch(() => {});
}
function load(v: HTMLVideoElement) {
  const s = state.get(v)!;
  if (s.loaded || rm || saveData) return;
  s.loaded = true;
  v.addEventListener('playing', () => v.classList.add('on'), { once: true });
  // MP4 (H.264) first, WebM (VP9) as the fallback
  (['src', 'webm'] as const).forEach((k, i) => {
    const u = v.dataset[k];
    if (!u) return;
    const src = document.createElement('source');
    src.src = u;
    src.type = i ? 'video/webm' : 'video/mp4';
    v.appendChild(src);
  });
  v.load();
  play(v);
}
function initVideos() {
  if (!videos.length) return;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const v = e.target as HTMLVideoElement;
      const s = state.get(v)!;
      s.visible = e.isIntersecting;
      if (s.visible) { load(v); play(v); } else v.pause();
    }
  }, { rootMargin: '200px 0px' });
  for (const v of videos) { state.set(v, { loaded: false, paused: false, visible: false }); io.observe(v); }
}
if (document.readyState === 'complete') initVideos();
else window.addEventListener('load', initVideos, { once: true });
document.addEventListener('visibilitychange', () => {
  for (const v of videos) { if (document.hidden) v.pause(); else play(v); }
});

// ---- pause controls: each toggles the video in its own block (and the 3D map, via the event) ----
document.querySelectorAll<HTMLButtonElement>('[data-motion-toggle]').forEach((b) => {
  b.addEventListener('click', () => {
    const paused = b.getAttribute('aria-pressed') !== 'true';
    b.setAttribute('aria-pressed', String(paused));
    const label = b.querySelector('span');
    if (label) label.textContent = (paused ? b.dataset.labelPlay : b.dataset.labelPause) ?? '';
    const scope = b.closest('[data-motion-scope]');
    scope?.querySelectorAll<HTMLVideoElement>('video[data-src]').forEach((v) => {
      const s = state.get(v);
      if (!s) return;
      s.paused = paused;
      if (paused) v.pause(); else play(v);
    });
    b.dispatchEvent(new CustomEvent('motiontoggle', { bubbles: true, detail: { paused } }));
  });
});

// ---- reveals: once, 600 ms ease-out ----
if (!rm && 'IntersectionObserver' in window) {
  d.classList.add('motion');
  const rio = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); }
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => rio.observe(el));
}

// The cross-document view transition names live in an inline script at the end of <body>
// (Base.astro): pagereveal has to be handled before the first render, which a module script cannot promise.
