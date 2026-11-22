import * as THREE from 'three';
import {
  createBandedGasTexture,
  createCrateredTexture,
  createGlowSpriteTexture,
  createRingTexture,
  createSolarPanelTexture,
  createSolarTexture,
  createTerrestrialTexture,
} from './proceduralTextures';
import { CelestialBodySpec } from './spaceData';

export interface CelestialRuntimeObject {
  spec: CelestialBodySpec;
  orbitPivot: THREE.Group;
  bodyGroup: THREE.Group;
  spinTarget: THREE.Object3D;
  moonPivots: { pivot: THREE.Group; speed: number }[];
  angle: number;
  ringMesh?: THREE.Mesh;
}

function tagInteractiveTree(root: THREE.Object3D, celestialId: string) {
  root.traverse((obj) => {
    obj.userData.celestialId = celestialId;
    obj.layers.enable(1);
  });
}

export function createHeliosStar(
  spec: CelestialBodySpec,
  maxAnisotropy: number
): CelestialRuntimeObject {
  const orbitPivot = new THREE.Group();
  const bodyGroup = new THREE.Group();
  orbitPivot.add(bodyGroup);

  const solarTex = createSolarTexture(maxAnisotropy);
  const glowTex = createGlowSpriteTexture();

  // 1. Core Plasma Sphere
  const coreGeo = new THREE.SphereGeometry(spec.radius, 48, 48);
  const coreMat = new THREE.MeshStandardMaterial({
    map: solarTex,
    emissive: new THREE.Color(0xff9d2e),
    emissiveMap: solarTex,
    emissiveIntensity: 2.1,
    roughness: 0.75,
    metalness: 0.0,
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  bodyGroup.add(coreMesh);

  // 2. Inner Convective Corona Shell
  const innerCoronaGeo = new THREE.SphereGeometry(spec.radius * 1.12, 32, 32);
  const innerCoronaMat = new THREE.MeshBasicMaterial({
    color: 0xffb347,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.BackSide,
  });
  const innerCorona = new THREE.Mesh(innerCoronaGeo, innerCoronaMat);
  bodyGroup.add(innerCorona);

  // 3. Outer Indigo-Amber Atmospheric Glow Halo
  const outerHaloGeo = new THREE.SphereGeometry(spec.radius * 1.38, 32, 32);
  const outerHaloMat = new THREE.MeshBasicMaterial({
    color: 0x8083ff,
    transparent: true,
    opacity: 0.1,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.BackSide,
  });
  const outerHalo = new THREE.Mesh(outerHaloGeo, outerHaloMat);
  bodyGroup.add(outerHalo);

  // 4 & 5. Dual Tilted Solar Prominence Rings
  const promGeo = new THREE.TorusGeometry(spec.radius * 1.18, 0.035, 12, 96);
  const promMat = new THREE.MeshBasicMaterial({
    color: 0xffd180,
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const promRingA = new THREE.Mesh(promGeo, promMat);
  promRingA.rotation.set(Math.PI / 2.6, 0.35, 0);
  bodyGroup.add(promRingA);

  const promRingB = new THREE.Mesh(promGeo, promMat);
  promRingB.rotation.set(-Math.PI / 3.1, -0.5, 0.4);
  bodyGroup.add(promRingB);

  // 6. Soft Corona Sprite
  const spriteMat = new THREE.SpriteMaterial({
    map: glowTex,
    color: 0xffc87a,
    transparent: true,
    opacity: 0.72,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const coronaSprite = new THREE.Sprite(spriteMat);
  coronaSprite.scale.setScalar(spec.radius * 4.4);
  bodyGroup.add(coronaSprite);

  tagInteractiveTree(bodyGroup, spec.id);

  return {
    spec,
    orbitPivot,
    bodyGroup,
    spinTarget: coreMesh,
    moonPivots: [],
    angle: 0,
  };
}

export function createExplorerProbe(
  spec: CelestialBodySpec,
  maxAnisotropy: number,
  isSoftwareGl: boolean
): CelestialRuntimeObject {
  const orbitPivot = new THREE.Group();
  const bodyGroup = new THREE.Group();
  bodyGroup.position.set(spec.orbitRadius, 0, 0);
  orbitPivot.add(bodyGroup);

  const probeRig = new THREE.Group();
  probeRig.rotation.z = spec.axialTilt;
  bodyGroup.add(probeRig);

  const panelTex = createSolarPanelTexture(maxAnisotropy);

  // Materials with clear roughness/metalness contrast (>= 0.25 variance)
  const titaniumMat = new THREE.MeshStandardMaterial({
    color: 0xd0d4e6,
    metalness: 0.88,
    roughness: 0.22,
  });
  const goldFoilMat = new THREE.MeshStandardMaterial({
    color: 0xe6b422,
    metalness: 0.92,
    roughness: 0.36,
  });
  const carbonMat = new THREE.MeshStandardMaterial({
    color: 0x1c1e26,
    metalness: 0.25,
    roughness: 0.78,
  });
  const solarMat = new THREE.MeshStandardMaterial({
    map: panelTex,
    metalness: 0.35,
    roughness: 0.28,
    emissive: new THREE.Color(0x1e2b6b),
    emissiveIntensity: 0.35,
  });

  // 1. Octagonal Spacecraft Bus Hull
  const busGeo = new THREE.CylinderGeometry(0.36, 0.42, 0.62, 8);
  const busMesh = new THREE.Mesh(busGeo, titaniumMat);
  busMesh.castShadow = !isSoftwareGl;
  probeRig.add(busMesh);

  // 2. Gold MLI Thermal Core Collar
  const collarGeo = new THREE.CylinderGeometry(0.43, 0.43, 0.24, 8);
  const collarMesh = new THREE.Mesh(collarGeo, goldFoilMat);
  collarMesh.position.y = -0.08;
  probeRig.add(collarMesh);

  // 3. Parabolic High-Gain Antenna Dish (LatheGeometry)
  const dishPoints = [
    new THREE.Vector2(0.01, 0),
    new THREE.Vector2(0.18, 0.03),
    new THREE.Vector2(0.36, 0.11),
    new THREE.Vector2(0.52, 0.24),
  ];
  const dishGeo = new THREE.LatheGeometry(dishPoints, 28);
  const dishMat = new THREE.MeshStandardMaterial({
    color: 0xe5e7f4,
    metalness: 0.6,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const dishMesh = new THREE.Mesh(dishGeo, dishMat);
  dishMesh.position.y = 0.34;
  probeRig.add(dishMesh);

  // 4. Feed Horn & Telemetry Mast
  const mastGeo = new THREE.CylinderGeometry(0.025, 0.035, 0.46, 12);
  const mastMesh = new THREE.Mesh(mastGeo, carbonMat);
  mastMesh.position.y = 0.56;
  probeRig.add(mastMesh);

  const beaconTipGeo = new THREE.SphereGeometry(0.06, 16, 16);
  const beaconTipMat = new THREE.MeshStandardMaterial({
    color: 0xc0c1ff,
    emissive: new THREE.Color(0x8083ff),
    emissiveIntensity: 2.2,
    roughness: 0.2,
  });
  const beaconTip = new THREE.Mesh(beaconTipGeo, beaconTipMat);
  beaconTip.position.y = 0.8;
  probeRig.add(beaconTip);

  // 5 & 6. Dual Articulated Solar Array Wings + Mounting Booms
  const boomGeo = new THREE.CylinderGeometry(0.028, 0.028, 2.5, 10);
  boomGeo.rotateZ(Math.PI / 2);
  const boomMesh = new THREE.Mesh(boomGeo, carbonMat);
  probeRig.add(boomMesh);

  const wingGeo = new THREE.BoxGeometry(0.95, 0.03, 0.46);
  const leftWing = new THREE.Mesh(wingGeo, solarMat);
  leftWing.position.set(-0.92, 0, 0);
  leftWing.rotation.x = 0.35;
  probeRig.add(leftWing);

  const rightWing = new THREE.Mesh(wingGeo, solarMat);
  rightWing.position.set(0.92, 0, 0);
  rightWing.rotation.x = 0.35;
  probeRig.add(rightWing);

  // 7. Ion Thruster Nozzle & Indigo Plume Cone
  const nozzleGeo = new THREE.CylinderGeometry(0.11, 0.18, 0.22, 16, 1, true);
  const nozzleMesh = new THREE.Mesh(nozzleGeo, carbonMat);
  nozzleMesh.position.y = -0.4;
  probeRig.add(nozzleMesh);

  const plumeGeo = new THREE.ConeGeometry(0.14, 0.48, 16);
  plumeGeo.rotateX(Math.PI);
  const plumeMat = new THREE.MeshBasicMaterial({
    color: 0x8083ff,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const plumeMesh = new THREE.Mesh(plumeGeo, plumeMat);
  plumeMesh.position.y = -0.68;
  probeRig.add(plumeMesh);

  // Invisible slightly larger raycast proxy sphere for smooth clicking
  const hitProxy = new THREE.Mesh(
    new THREE.SphereGeometry(1.15, 12, 12),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  probeRig.add(hitProxy);

  tagInteractiveTree(bodyGroup, spec.id);

  return {
    spec,
    orbitPivot,
    bodyGroup,
    spinTarget: probeRig,
    moonPivots: [],
    angle: spec.initialAngle,
  };
}

export function createPlanetGroup(
  spec: CelestialBodySpec,
  maxAnisotropy: number,
  isSoftwareGl: boolean
): CelestialRuntimeObject {
  const orbitPivot = new THREE.Group();
  const bodyGroup = new THREE.Group();
  bodyGroup.position.set(spec.orbitRadius, 0, 0);
  orbitPivot.add(bodyGroup);

  const tiltGroup = new THREE.Group();
  tiltGroup.rotation.z = spec.axialTilt;
  bodyGroup.add(tiltGroup);

  // Choose procedural surface texture per planet
  let surfaceTex: THREE.CanvasTexture;
  if (spec.id === 'pythia') {
    surfaceTex = createTerrestrialTexture(maxAnisotropy);
  } else if (spec.id === 'webula') {
    surfaceTex = createBandedGasTexture(['#0c4a6e', '#0284c7', '#38bdf8', '#7dd3fc', '#0369a1'], 303, maxAnisotropy);
  } else if (spec.id === 'algonova') {
    surfaceTex = createBandedGasTexture(['#1e1b4b', '#4338ca', '#818cf8', '#f59e0b', '#312e81'], 309, maxAnisotropy);
  } else if (spec.id === 'glanexus') {
    surfaceTex = createBandedGasTexture(['#2e1065', '#6d28d9', '#a78bfa', '#c4b5fd', '#4c1d95'], 315, maxAnisotropy);
  } else {
    surfaceTex = createCrateredTexture(maxAnisotropy);
  }

  // 1. Primary Planetary Sphere
  const sphereGeo = new THREE.SphereGeometry(spec.radius, 48, 48);
  const sphereMat = new THREE.MeshStandardMaterial({
    map: surfaceTex,
    roughness: spec.id === 'pythia' ? 0.55 : spec.id === 'commsbeacon' ? 0.88 : 0.65,
    metalness: spec.id === 'commsbeacon' ? 0.15 : 0.05,
  });
  const planetMesh = new THREE.Mesh(sphereGeo, sphereMat);
  planetMesh.castShadow = !isSoftwareGl;
  planetMesh.receiveShadow = !isSoftwareGl;
  tiltGroup.add(planetMesh);

  // 2. Atmospheric Rim Halo Layer
  const atmoGeo = new THREE.SphereGeometry(spec.radius * 1.08, 32, 32);
  const atmoMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(spec.primaryColor),
    transparent: true,
    opacity: 0.16,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.BackSide,
  });
  const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
  tiltGroup.add(atmoMesh);

  // 3. Optional Planetary Rings or Telemetry Beacon Ring
  let ringMesh: THREE.Mesh | undefined;
  if (spec.id === 'webula' || spec.id === 'glanexus') {
    const innerR = spec.radius * 1.38;
    const outerR = spec.radius * (spec.id === 'glanexus' ? 2.45 : 1.95);
    const ringGeo = new THREE.RingGeometry(innerR, outerR, 96);
    // Remap radial UVs so linear gradient maps radially
    const pos = ringGeo.attributes.position;
    const uv = ringGeo.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dist = Math.sqrt(x * x + y * y);
      const u = (dist - innerR) / (outerR - innerR);
      uv.setXY(i, u, 0.5);
    }

    const ringTex = createRingTexture(
      spec.id === 'glanexus' ? 'rgba(192, 193, 255, 0.85)' : 'rgba(125, 211, 252, 0.65)',
      spec.id === 'glanexus' ? 'rgba(167, 139, 250, 0.35)' : 'rgba(56, 189, 248, 0.25)',
      maxAnisotropy
    );
    const ringMat = new THREE.MeshStandardMaterial({
      map: ringTex,
      transparent: true,
      side: THREE.DoubleSide,
      roughness: 0.72,
      metalness: 0.1,
      depthWrite: false,
    });
    ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    tiltGroup.add(ringMesh);
  } else if (spec.id === 'commsbeacon') {
    const beaconRingGeo = new THREE.TorusGeometry(spec.radius * 1.48, 0.025, 12, 64);
    const beaconRingMat = new THREE.MeshStandardMaterial({
      color: 0xc0c1ff,
      emissive: new THREE.Color(0x8083ff),
      emissiveIntensity: 1.4,
      metalness: 0.8,
      roughness: 0.2,
    });
    const beaconRing = new THREE.Mesh(beaconRingGeo, beaconRingMat);
    beaconRing.rotation.x = Math.PI / 2.2;
    tiltGroup.add(beaconRing);
  }

  // 4. Orbiting Moons
  const moonPivots: { pivot: THREE.Group; speed: number }[] = [];
  if (spec.id === 'pythia' || spec.id === 'algonova' || spec.id === 'glanexus') {
    const moonCount = spec.id === 'algonova' ? 2 : 1;
    for (let m = 0; m < moonCount; m++) {
      const moonPivot = new THREE.Group();
      moonPivot.rotation.z = m === 0 ? 0.08 : -0.14;
      bodyGroup.add(moonPivot);

      const moonRadius = spec.radius * (m === 0 ? 0.22 : 0.15);
      const moonDist = spec.radius * (m === 0 ? 2.1 : 2.85);
      const moonMesh = new THREE.Mesh(
        new THREE.SphereGeometry(moonRadius, 20, 20),
        new THREE.MeshStandardMaterial({
          color: m === 0 ? 0xcbd5e1 : 0xfbbf24,
          roughness: 0.85,
          metalness: 0.05,
        })
      );
      moonMesh.position.set(moonDist, 0, 0);
      moonPivot.add(moonMesh);
      moonPivots.push({ pivot: moonPivot, speed: m === 0 ? 1.15 : 0.72 });
    }
  }

  tagInteractiveTree(bodyGroup, spec.id);

  return {
    spec,
    orbitPivot,
    bodyGroup,
    spinTarget: planetMesh,
    moonPivots,
    angle: spec.initialAngle,
    ringMesh,
  };
}

export function createAsteroidBelt(count = 240): THREE.InstancedMesh {
  const geo = new THREE.DodecahedronGeometry(0.18, 0);
  const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.86,
    metalness: 0.18,
  });
  const mesh = new THREE.InstancedMesh(geo, mat, count);

  const dummy = new THREE.Object3D();
  const color = new THREE.Color();

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + (Math.sin(i * 12.9898) * 0.15);
    const radius = 17.6 + ((i * 7919) % 100) / 100 * 2.4;
    const yOffset = (((i * 3571) % 100) / 100 - 0.5) * 1.1;

    dummy.position.set(Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius);
    dummy.rotation.set((i * 0.7) % Math.PI, (i * 1.3) % Math.PI, (i * 0.4) % Math.PI);
    const scaleJitter = 0.65 + (((i * 2333) % 100) / 100) * 0.75;
    dummy.scale.set(scaleJitter, scaleJitter * 0.82, scaleJitter * 1.12);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);

    const shade = 0.48 + (((i * 1777) % 100) / 100) * 0.35;
    color.setRGB(shade * 0.9, shade * 0.92, shade * 1.08);
    mesh.setColorAt(i, color);
  }

  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  mesh.computeBoundingSphere();
  return mesh;
}

export function createStarfield(count = 1800): THREE.Points {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const color = new THREE.Color();

  for (let i = 0; i < count; i++) {
    // Spherical shell distribution between radius 65 and 175
    const u = ((i * 9301 + 49297) % 233280) / 233280;
    const v = ((i * 49297 + 9301) % 233280) / 233280;
    const theta = u * 2 * Math.PI;
    const phi = Math.acos(2 * v - 1);
    const r = 70 + ((i * 1277) % 105);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    const spectralRoll = i % 10;
    if (spectralRoll < 4) {
      color.setHex(0xc0c1ff); // Electric indigo star
    } else if (spectralRoll < 8) {
      color.setHex(0xe5e7ff); // Blue-white star
    } else {
      color.setHex(0xffd7a8); // Warm amber star
    }
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.42,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    fog: false,
  });

  return new THREE.Points(geo, mat);
}

export function createOrbitRingLine(radius: number, colorHex: number): THREE.LineLoop {
  const segments = 128;
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = new THREE.LineBasicMaterial({
    color: colorHex,
    transparent: true,
    opacity: 0.34,
  });
  return new THREE.LineLoop(geo, mat);
}
