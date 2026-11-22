import * as THREE from 'three';

function createSeededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function createSolarTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  const rand = createSeededRandom(101);

  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, '#ff8f1f');
  grad.addColorStop(0.5, '#ffbe55');
  grad.addColorStop(1, '#ff7714');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 420; i++) {
    const x = rand() * canvas.width;
    const y = rand() * canvas.height;
    const r = 4 + rand() * 24;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    const bright = rand() > 0.45;
    g.addColorStop(0, bright ? 'rgba(255, 245, 200, 0.55)' : 'rgba(205, 65, 10, 0.42)');
    g.addColorStop(1, 'rgba(255, 140, 20, 0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

export function createTerrestrialTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  const rand = createSeededRandom(202);

  // Deep cobalt-indigo ocean
  const ocean = ctx.createLinearGradient(0, 0, 0, canvas.height);
  ocean.addColorStop(0, '#1e2761');
  ocean.addColorStop(0.5, '#2b3990');
  ocean.addColorStop(1, '#1a2254');
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Continental landmasses
  for (let i = 0; i < 48; i++) {
    const cx = rand() * canvas.width;
    const cy = 28 + rand() * (canvas.height - 56);
    const rx = 18 + rand() * 52;
    const ry = 10 + rand() * 26;
    ctx.fillStyle = rand() > 0.35 ? '#4f5bd5' : '#6f77f5';
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, rand() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  // Polar ice caps
  ctx.fillStyle = 'rgba(225, 232, 255, 0.72)';
  ctx.fillRect(0, 0, canvas.width, 16);
  ctx.fillRect(0, canvas.height - 16, canvas.width, 16);

  // Subtle cloud wisps
  for (let i = 0; i < 65; i++) {
    const x = rand() * canvas.width;
    const y = rand() * canvas.height;
    ctx.fillStyle = 'rgba(235, 240, 255, 0.22)';
    ctx.beginPath();
    ctx.ellipse(x, y, 16 + rand() * 36, 3 + rand() * 6, 0.1, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

export function createBandedGasTexture(
  palette: string[],
  seed: number,
  maxAnisotropy: number
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  const rand = createSeededRandom(seed);

  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  palette.forEach((hex, i) => {
    grad.addColorStop(i / Math.max(1, palette.length - 1), hex);
  });
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Zonal jet stream bands
  for (let y = 0; y < canvas.height; y += 5) {
    const alpha = 0.08 + rand() * 0.18;
    ctx.fillStyle = rand() > 0.5 ? `rgba(255, 255, 255, ${alpha})` : `rgba(14, 14, 24, ${alpha})`;
    ctx.fillRect(0, y, canvas.width, 2 + rand() * 4);
  }

  // Storm ovals
  for (let i = 0; i < 14; i++) {
    const x = rand() * canvas.width;
    const y = 30 + rand() * (canvas.height - 60);
    ctx.fillStyle = 'rgba(255, 235, 205, 0.25)';
    ctx.beginPath();
    ctx.ellipse(x, y, 14 + rand() * 24, 5 + rand() * 9, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

export function createCrateredTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  const rand = createSeededRandom(404);

  ctx.fillStyle = '#38344a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 120; i++) {
    const x = rand() * canvas.width;
    const y = rand() * canvas.height;
    const r = 3 + rand() * 14;
    ctx.fillStyle = rand() > 0.5 ? 'rgba(20, 18, 30, 0.55)' : 'rgba(192, 193, 255, 0.22)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(225, 224, 255, 0.16)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

export function createRingTexture(
  innerHex: string,
  outerHex: string,
  maxAnisotropy: number
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 32;
  const ctx = canvas.getContext('2d')!;
  const rand = createSeededRandom(505);

  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.14, innerHex);
  grad.addColorStop(0.45, outerHex);
  grad.addColorStop(0.55, 'rgba(15,15,24,0.12)'); // Cassini-like division gap
  grad.addColorStop(0.65, innerHex);
  grad.addColorStop(0.92, outerHex);
  grad.addColorStop(1, 'rgba(0,0,0,0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let x = 0; x < canvas.width; x += 3) {
    if (rand() > 0.65) {
      ctx.fillStyle = 'rgba(10, 10, 18, 0.35)';
      ctx.fillRect(x, 0, 1.5, canvas.height);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

export function createSolarPanelTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#0e1738';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#6378ff';
  ctx.lineWidth = 2;
  for (let x = 0; x <= canvas.width; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

export function createGlowSpriteTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createRadialGradient(64, 64, 2, 64, 64, 64);
  grad.addColorStop(0, 'rgba(255, 240, 200, 1)');
  grad.addColorStop(0.25, 'rgba(255, 190, 100, 0.55)');
  grad.addColorStop(0.6, 'rgba(128, 131, 255, 0.18)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
