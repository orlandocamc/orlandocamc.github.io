// Hero 3D: the real occupancy grid salon_v2 (296 x 218 cells, 0.05 m/cell) as a quiet point cloud.
// Free cells are a faint floor grid, occupied cells are short grey wall columns with a faint emerald
// cast (22 %), unknown cells stay empty. A LiDAR sweep turns slowly from an illustrative scan origin:
// the first turn draws the map, later turns leave a short emerald trail.
// Loaded by <hero-3d> (Hero3D.astro) only with WebGL, without reduced motion, once the hero is visible
// and the browser is idle.
import {
  BufferGeometry, CircleGeometry, Color, Float32BufferAttribute, Group, Line, LineBasicMaterial, MathUtils,
  Mesh, MeshBasicMaterial, PerspectiveCamera, Points, Scene, ShaderMaterial, Vector3, WebGLRenderer, DoubleSide,
} from 'three';

const TAU = Math.PI * 2;
const MAP_ROT = (-19.5 * Math.PI) / 180; // aligns the dominant walls with the screen (Hough on occupied cells)
const PERIOD = 7.5; // seconds per LiDAR turn: calm, never a spin
const T0 = 0.6; // first turn starts after the page has settled

export interface Hero3DOptions {
  canvas: HTMLCanvasElement;
  hero: HTMLElement;
  stage: HTMLElement;
  mapUrl: string;
  signal: string;
  onFirstFrame?: () => void;
  onFail?: () => void;
}
export interface Hero3DControl {
  setPaused(v: boolean): void;
}

interface GridMap { w: number; h: number; px: Uint8Array }

export async function createHero3D(o: Hero3DOptions): Promise<Hero3DControl> {
  const { canvas, hero, stage, onFirstFrame, onFail } = o;
  const map = await loadMap(o.mapUrl);
  const SIGNAL = new Color(o.signal || '#10B981');

  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); stop(); onFail?.(); });

  const scene = new Scene();
  const camera = new PerspectiveCamera(28, 1, 1, 6000);
  const target = new Vector3(0, 0, 0);

  // ---------- point cloud from the map ----------
  const cs = Math.cos(MAP_ROT), sn = Math.sin(MAP_ROT);
  const pts: [number, number, number][] = []; // [x, z, kind]  kind 0 = free, 1 = occupied
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for (let r = 0; r < map.h; r++) for (let c = 0; c < map.w; c++) {
    const v = map.px[r * map.w + c];
    if (v === 205) continue; // unknown
    if (v === 254 && (r + c) % 2) continue; // every other free cell
    const lx = c + 0.5 - map.w / 2, lz = r + 0.5 - map.h / 2;
    const x = lx * cs - lz * sn, z = lx * sn + lz * cs;
    pts.push([x, z, v === 0 ? 1 : 0]);
    if (v === 0) { minX = Math.min(minX, x); maxX = Math.max(maxX, x); minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z); }
  }
  const cx = (minX + maxX) / 2, cz = (minZ + maxZ) / 2;
  const half = { x: (maxX - minX) / 2 + 2, z: (maxZ - minZ) / 2 + 2 };

  // illustrative scan origin: the free cell closest to the centroid of free space
  let fx = 0, fz = 0, nf = 0;
  for (const p of pts) if (!p[2]) { fx += p[0]; fz += p[1]; nf++; }
  fx /= nf; fz /= nf;
  let origin: [number, number] = [fx, fz], best = Infinity;
  for (const p of pts) if (!p[2]) {
    const dd = (p[0] - fx) ** 2 + (p[1] - fz) ** 2;
    if (dd < best) { best = dd; origin = [p[0], p[1]]; }
  }
  const ox = origin[0] - cx, oz = origin[1] - cz;

  const P: number[] = [], A: number[] = [], K: number[] = [];
  for (const [x0, z0, kind] of pts) {
    const x = x0 - cx, z = z0 - cz;
    const a = Math.atan2(z - oz, x - ox);
    if (kind) for (let k = 0; k < 3; k++) { P.push(x, 0.5 + k * 1.1, z); A.push(a); K.push(1); }
    else { P.push(x, 0, z); A.push(a); K.push(0); }
  }
  const a0 = -Math.PI / 2; // first turn starts pointing "up" the screen
  const geo = new BufferGeometry();
  geo.setAttribute('position', new Float32BufferAttribute(P, 3));
  geo.setAttribute('aAng', new Float32BufferAttribute(A, 1));
  geo.setAttribute('aKind', new Float32BufferAttribute(K, 1));

  const uniforms = {
    uTime: { value: 0 }, uBeam: { value: a0 }, uA0: { value: a0 }, uT0: { value: T0 }, uPeriod: { value: PERIOD },
    uScale: { value: 400 }, uPR: { value: 1 }, uSignal: { value: SIGNAL },
  };
  const cloud = new Points(geo, pointMaterial(uniforms));
  cloud.frustumCulled = false;
  scene.add(cloud);

  // beam: a thin line and a very faint wedge; origin: one small dot
  const R = Math.hypot(half.x, half.z) * 1.05;
  const beam = new Group();
  const lineMat = new LineBasicMaterial({ color: SIGNAL, transparent: true, opacity: 0 });
  beam.add(new Line(new BufferGeometry().setFromPoints([new Vector3(0, 0.05, 0), new Vector3(R, 0.05, 0)]), lineMat));
  const wedgeGeo = new CircleGeometry(R, 40, -0.32, 0.32);
  wedgeGeo.rotateX(Math.PI / 2);
  const wedgeMat = new MeshBasicMaterial({ color: SIGNAL, transparent: true, opacity: 0, depthWrite: false, side: DoubleSide });
  beam.add(new Mesh(wedgeGeo, wedgeMat));
  const dotGeo = new CircleGeometry(1.1, 24);
  dotGeo.rotateX(-Math.PI / 2);
  const dotMat = new MeshBasicMaterial({ color: SIGNAL, transparent: true, opacity: 0, depthWrite: false });
  const dot = new Mesh(dotGeo, dotMat);
  const rig = new Group();
  rig.add(beam, dot);
  rig.position.set(ox, 0.06, oz);
  scene.add(rig);

  // ---------- camera fit: the map fills the stage rectangle, whatever the layout ----------
  const view = { dist: 600, elev: 0.92, az: 0.0, offX: 0, offY: 0 };
  const corners: Vector3[] = [];
  for (const x of [-half.x, half.x]) for (const y of [0, 3.5]) for (const z of [-half.z, half.z]) corners.push(new Vector3(x, y, z));
  const tmp = new Vector3();
  function place(dist: number, elev: number, az: number) {
    camera.position.set(
      target.x + dist * Math.sin(az) * Math.cos(elev),
      target.y + dist * Math.sin(elev),
      target.z + dist * Math.cos(az) * Math.cos(elev),
    );
    camera.lookAt(target);
    camera.updateMatrixWorld();
  }
  function projBox(W: number, H: number) {
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const c of corners) {
      tmp.copy(c).project(camera);
      const px = ((tmp.x + 1) / 2) * W, py = ((1 - tmp.y) / 2) * H;
      x0 = Math.min(x0, px); x1 = Math.max(x1, px); y0 = Math.min(y0, py); y1 = Math.max(y1, py);
    }
    return { w: x1 - x0, h: y1 - y0, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2 };
  }
  function fit() {
    const W = Math.max(hero.clientWidth, 1), H = Math.max(hero.clientHeight, 1);
    const hr = hero.getBoundingClientRect(), sr = stage.getBoundingClientRect();
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    camera.clearViewOffset();
    camera.updateProjectionMatrix();
    let lo = 20, hi = 6000;
    for (let i = 0; i < 30; i++) {
      const mid = (lo + hi) / 2;
      place(mid, view.elev, view.az);
      const b = projBox(W, H);
      if (b.w <= sr.width && b.h <= sr.height) hi = mid; else lo = mid;
    }
    view.dist = hi;
    place(hi, view.elev, view.az);
    const b = projBox(W, H);
    view.offX = b.cx - (sr.left - hr.left + sr.width / 2);
    view.offY = b.cy - (sr.top - hr.top + sr.height / 2);
    camera.setViewOffset(W, H, view.offX, view.offY, W, H);
    const pr = renderer.getPixelRatio();
    uniforms.uPR.value = pr;
    uniforms.uScale.value = (H * pr) / (2 * Math.tan(MathUtils.degToRad(camera.fov) / 2));
  }

  // ---------- loop ----------
  let t = 0, last = 0, raf = 0, running = false, paused = false, first = true;
  function update() {
    uniforms.uTime.value = t;
    const e = Math.max(t - T0, 0);
    const a = a0 + (e / PERIOD) * TAU;
    uniforms.uBeam.value = a % TAU;
    beam.rotation.y = -a;
    const k = Math.min(Math.max((t - 0.2) / 0.6, 0), 1);
    lineMat.opacity = 0.75 * k; wedgeMat.opacity = 0.05 * k; dotMat.opacity = k;
    // slow drift of the camera, plus a gentle rise as the hero scrolls away
    const hr = hero.getBoundingClientRect();
    const p = MathUtils.clamp(-hr.top / Math.max(hr.height, 1), 0, 1);
    canvas.style.opacity = String(1 - p * 1.2);
    place(view.dist, view.elev + p * 0.3, view.az + Math.sin(t * 0.035) * 0.06);
  }
  function frame(now: number) {
    if (!running) return;
    const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
    last = now;
    if (!paused) t += dt;
    update();
    renderer.render(scene, camera);
    if (first) { first = false; onFirstFrame?.(); }
    raf = requestAnimationFrame(frame);
  }
  function start() { if (running || paused) return; running = true; last = 0; raf = requestAnimationFrame(frame); }
  function stop() { running = false; cancelAnimationFrame(raf); }
  function renderOnce() { update(); renderer.render(scene, camera); }

  fit();
  let onScreen = true;
  new IntersectionObserver((es) => {
    onScreen = es[0].isIntersecting;
    if (onScreen && !document.hidden) start(); else stop();
  }).observe(hero);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else if (onScreen) start(); });
  new ResizeObserver(() => { fit(); if (!running) renderOnce(); }).observe(hero);
  window.addEventListener('scroll', () => { if (!running && onScreen) renderOnce(); }, { passive: true });
  start();

  return {
    setPaused(v: boolean) {
      paused = v;
      if (v) { stop(); t = Math.max(t, T0 + PERIOD); renderOnce(); }
      else if (onScreen && !document.hidden) start();
    },
  };
}

// ---------- helpers ----------
async function loadMap(src: string): Promise<GridMap> {
  const img = new Image();
  img.decoding = 'async';
  img.src = src;
  await img.decode();
  const c = document.createElement('canvas');
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  const g = c.getContext('2d', { willReadFrequently: true });
  if (!g) throw new Error('2d context unavailable');
  g.drawImage(img, 0, 0);
  const d = g.getImageData(0, 0, c.width, c.height).data;
  const px = new Uint8Array(c.width * c.height);
  for (let i = 0; i < px.length; i++) { const v = d[i * 4]; px[i] = v < 50 ? 0 : v > 230 ? 254 : 205; }
  return { w: c.width, h: c.height, px };
}

function pointMaterial(uniforms: Record<string, { value: unknown }>) {
  return new ShaderMaterial({
    uniforms, transparent: true, depthWrite: false,
    vertexShader: /* glsl */ `
      attribute float aAng; attribute float aKind;
      uniform float uTime, uBeam, uA0, uT0, uPeriod, uScale, uPR;
      uniform vec3 uSignal;
      varying vec3 vCol; varying float vA;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.);
        gl_Position = projectionMatrix * mv;
        // first turn draws the map: a cell appears when the beam has passed it once
        float seenAt = uT0 + mod(aAng - uA0, 6.2831853) / 6.2831853 * uPeriod;
        float e = uTime - seenAt;
        if (e < 0.) { vA = 0.; gl_PointSize = 0.; return; }
        // short trail behind the beam (about 12 degrees)
        float trail = exp(-mod(uBeam - aAng, 6.2831853) * 5.);
        vec3 base = aKind > .5 ? mix(vec3(.72), uSignal, .22) : vec3(.52);
        float a = aKind > .5 ? .62 : .26;
        vCol = mix(base, uSignal, trail * .85);
        vA = clamp(a + trail * .3, 0., 1.) * min(e * 3., 1.);
        float sz = aKind > .5 ? .42 : .26;
        gl_PointSize = max(sz * uScale / -mv.z, 1.2 * uPR);
      }`,
    fragmentShader: /* glsl */ `
      varying vec3 vCol; varying float vA;
      void main() { if (vA < .01) discard; gl_FragColor = vec4(vCol, vA); }`,
  });
}
