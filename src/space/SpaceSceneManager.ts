import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  CelestialRuntimeObject,
  createAsteroidBelt,
  createExplorerProbe,
  createHeliosStar,
  createOrbitRingLine,
  createPlanetGroup,
  createStarfield,
} from './celestialModels';
import {
  CELESTIAL_BODIES,
  CelestialId,
  SPACE_THEMES,
  SpaceThemeId,
} from './spaceData';

// Pre-allocated scratch helpers (zero GC inside animation loop)
const _targetWorldPos = new THREE.Vector3();
const _desiredCamPos = new THREE.Vector3();
const _radialDir = new THREE.Vector3();
const _pointer = new THREE.Vector2();

function detectSoftwareWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') as WebGL2RenderingContext | null;
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export interface SpaceSceneCallbacks {
  onSelectCelestial: (id: CelestialId) => void;
  onHoverCelestial: (id: CelestialId | null) => void;
}

export class SpaceSceneManager {
  private container: HTMLElement;
  private callbacks: SpaceSceneCallbacks;
  private isSoftwareGl: boolean;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private envRT: THREE.WebGLRenderTarget;

  private starLight: THREE.PointLight;
  private rimLight: THREE.DirectionalLight;
  private hemiLight: THREE.HemisphereLight;

  private starfield: THREE.Points;
  private asteroidBelt: THREE.InstancedMesh;
  private orbitLines: THREE.LineLoop[] = [];
  private celestials = new Map<string, CelestialRuntimeObject>();
  private raycastTargets: THREE.Object3D[] = [];
  private raycaster = new THREE.Raycaster();

  private clock = new THREE.Clock();
  private frameId = 0;
  private disposed = false;

  // Interactive runtime state
  private speedMultiplier = 1;
  private isPaused = false;
  private selectedId: CelestialId = 'overview';
  private isTransitioning = false;
  private pointerDownPos = { x: 0, y: 0 };
  private lastHoverRaycast = 0;

  private resizeObserver: ResizeObserver;

  constructor(container: HTMLElement, callbacks: SpaceSceneCallbacks) {
    this.container = container;
    this.callbacks = callbacks;
    this.isSoftwareGl = detectSoftwareWebGL();

    const width = Math.max(container.clientWidth, 320);
    const height = Math.max(container.clientHeight, 320);

    // Renderer setup per Three.js skill specification
    this.renderer = new THREE.WebGLRenderer({
      antialias: !this.isSoftwareGl,
      powerPreference: 'high-performance',
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.12;
    this.renderer.setPixelRatio(
      this.isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2)
    );
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = !this.isSoftwareGl;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.domElement.style.display = 'block';
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    container.appendChild(this.renderer.domElement);

    const maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();

    // Scene & Fog
    const initialTheme = SPACE_THEMES.obsidian;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(initialTheme.backgroundHex);
    this.scene.fog = new THREE.FogExp2(initialTheme.backgroundHex, initialTheme.fogDensity);

    // Studio Environment Reflection (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    const roomEnv = new RoomEnvironment();
    this.envRT = pmremGenerator.fromScene(roomEnv, 0.04);
    this.scene.environment = this.envRT.texture;
    roomEnv.dispose();
    pmremGenerator.dispose();

    // Camera & OrbitControls
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 350);
    this.camera.position.set(0, 22, 42);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = !this.isSoftwareGl;
    this.controls.dampingFactor = 0.06;
    this.controls.minDistance = 2.6;
    this.controls.maxDistance = 95;
    this.controls.target.set(0, 0, 0);
    this.controls.addEventListener('start', () => {
      // Cancel scripted fly-to so user manual orbit always takes priority
      this.isTransitioning = false;
    });

    // Balanced Lighting Rig (same intensities on software WebGL and GPU)
    this.starLight = new THREE.PointLight(
      initialTheme.keyLightColor,
      initialTheme.keyLightIntensity * 28,
      140,
      1.35
    );
    this.starLight.position.set(0, 0, 0);
    if (!this.isSoftwareGl) {
      this.starLight.castShadow = true;
      this.starLight.shadow.bias = -0.0005;
      this.starLight.shadow.normalBias = 0.02;
    }
    this.scene.add(this.starLight);

    this.hemiLight = new THREE.HemisphereLight(
      initialTheme.hemiSkyColor,
      initialTheme.hemiGroundColor,
      initialTheme.hemiIntensity
    );
    this.scene.add(this.hemiLight);

    this.rimLight = new THREE.DirectionalLight(0xc0c1ff, 0.75);
    this.rimLight.position.set(-28, 18, -24);
    this.scene.add(this.rimLight);

    // Deep Starfield & Instanced Asteroid Belt
    this.starfield = createStarfield(1800);
    this.scene.add(this.starfield);

    this.asteroidBelt = createAsteroidBelt(240);
    this.scene.add(this.asteroidBelt);

    // Raycaster only inspects Layer 1 (celestial objects)
    this.raycaster.layers.set(1);

    // Build all celestial groups and orbit paths
    for (const spec of CELESTIAL_BODIES) {
      let runtimeObj: CelestialRuntimeObject;
      if (spec.id === 'helios') {
        runtimeObj = createHeliosStar(spec, maxAnisotropy);
      } else if (spec.id === 'probe') {
        runtimeObj = createExplorerProbe(spec, maxAnisotropy, this.isSoftwareGl);
      } else {
        runtimeObj = createPlanetGroup(spec, maxAnisotropy, this.isSoftwareGl);
      }

      runtimeObj.orbitPivot.rotation.y = spec.initialAngle;
      this.scene.add(runtimeObj.orbitPivot);
      this.celestials.set(spec.id, runtimeObj);
      this.raycastTargets.push(runtimeObj.bodyGroup);

      if (spec.orbitRadius > 0) {
        const orbitLine = createOrbitRingLine(spec.orbitRadius, initialTheme.orbitColor);
        this.scene.add(orbitLine);
        this.orbitLines.push(orbitLine);
      }
    }

    if (!this.isSoftwareGl) {
      this.renderer.compile(this.scene, this.camera);
    }

    // Bind pointer events for raycast hover/click
    this.renderer.domElement.addEventListener('pointerdown', this.handlePointerDown);
    this.renderer.domElement.addEventListener('pointerup', this.handlePointerUp);
    this.renderer.domElement.addEventListener('pointermove', this.handlePointerMove);

    // ResizeObserver handles both container resizes & fullscreen transitions
    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(this.container);

    this.tick();
  }

  public setTheme(themeId: SpaceThemeId) {
    const theme = SPACE_THEMES[themeId];
    this.scene.background = new THREE.Color(theme.backgroundHex);
    this.scene.fog = new THREE.FogExp2(theme.backgroundHex, theme.fogDensity);
    this.starLight.color.setHex(theme.keyLightColor);
    this.starLight.intensity = theme.keyLightIntensity * 28;
    this.hemiLight.color.setHex(theme.hemiSkyColor);
    this.hemiLight.groundColor.setHex(theme.hemiGroundColor);
    this.hemiLight.intensity = theme.hemiIntensity;

    for (const line of this.orbitLines) {
      (line.material as THREE.LineBasicMaterial).color.setHex(theme.orbitColor);
    }
  }

  public setSpeedMultiplier(speed: number) {
    this.speedMultiplier = speed;
  }

  public setPaused(paused: boolean) {
    this.isPaused = paused;
  }

  public setOrbitsVisible(visible: boolean) {
    for (const line of this.orbitLines) {
      line.visible = visible;
    }
  }

  public focusCelestial(id: CelestialId) {
    this.selectedId = id;
    this.isTransitioning = true;
  }

  public handleResize = () => {
    if (this.disposed) return;
    const width = Math.max(this.container.clientWidth, 320);
    const height = Math.max(this.container.clientHeight, 320);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  private handlePointerDown = (e: PointerEvent) => {
    this.pointerDownPos = { x: e.clientX, y: e.clientY };
  };

  private handlePointerUp = (e: PointerEvent) => {
    const dx = e.clientX - this.pointerDownPos.x;
    const dy = e.clientY - this.pointerDownPos.y;
    if (Math.hypot(dx, dy) > 6) return; // Ignore orbit drags

    const rect = this.renderer.domElement.getBoundingClientRect();
    _pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    _pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(_pointer, this.camera);
    const hits = this.raycaster.intersectObjects(this.raycastTargets, true);
    if (hits.length > 0) {
      const hitId = hits[0].object.userData.celestialId as CelestialId | undefined;
      if (hitId) {
        this.focusCelestial(hitId);
        this.callbacks.onSelectCelestial(hitId);
      }
    }
  };

  private handlePointerMove = (e: PointerEvent) => {
    const now = performance.now();
    if (now - this.lastHoverRaycast < 45) return;
    this.lastHoverRaycast = now;

    const rect = this.renderer.domElement.getBoundingClientRect();
    _pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    _pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(_pointer, this.camera);
    const hits = this.raycaster.intersectObjects(this.raycastTargets, true);
    if (hits.length > 0) {
      const hitId = hits[0].object.userData.celestialId as CelestialId | undefined;
      this.renderer.domElement.style.cursor = hitId ? 'pointer' : 'grab';
      this.callbacks.onHoverCelestial(hitId ?? null);
    } else {
      this.renderer.domElement.style.cursor = 'grab';
      this.callbacks.onHoverCelestial(null);
    }
  };

  private afterDraw(cb: () => void) {
    const gl = this.renderer.getContext() as WebGL2RenderingContext;
    if (!gl || typeof gl.fenceSync !== 'function') {
      this.frameId = window.setTimeout(cb, 80);
      return;
    }
    const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    gl.flush();
    const poll = () => {
      if (this.disposed) return;
      const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
      if (state === gl.UNSIGNALED) {
        this.frameId = window.setTimeout(poll, 5);
      } else {
        if (sync) gl.deleteSync(sync);
        this.frameId = window.setTimeout(cb, 80);
      }
    };
    this.frameId = window.setTimeout(poll, 5);
  }

  private tick = () => {
    if (this.disposed) return;

    const delta = Math.min(this.clock.getDelta(), 0.1);
    const simDelta = this.isPaused ? 0 : delta * this.speedMultiplier;

    // Advance orbits & axial rotations
    for (const item of this.celestials.values()) {
      if (item.spec.orbitSpeed > 0) {
        item.angle += item.spec.orbitSpeed * simDelta;
        item.orbitPivot.rotation.y = item.angle;
      }
      item.spinTarget.rotation.y += item.spec.rotationSpeed * (this.isPaused ? 0 : delta);

      for (const moon of item.moonPivots) {
        moon.pivot.rotation.y += moon.speed * simDelta;
      }
    }

    // Slow cosmic drift of asteroid belt & distant stars
    if (!this.isPaused) {
      this.asteroidBelt.rotation.y += 0.032 * simDelta;
      this.starfield.rotation.y += 0.004 * delta;
    }

    // Smoothly track or fly to selected celestial target
    if (this.selectedId === 'overview') {
      if (this.isTransitioning) {
        _targetWorldPos.set(0, 0, 0);
        _desiredCamPos.set(0, 22, 42);
        this.controls.target.x = THREE.MathUtils.damp(this.controls.target.x, 0, 5, delta);
        this.controls.target.y = THREE.MathUtils.damp(this.controls.target.y, 0, 5, delta);
        this.controls.target.z = THREE.MathUtils.damp(this.controls.target.z, 0, 5, delta);

        this.camera.position.x = THREE.MathUtils.damp(this.camera.position.x, _desiredCamPos.x, 4.5, delta);
        this.camera.position.y = THREE.MathUtils.damp(this.camera.position.y, _desiredCamPos.y, 4.5, delta);
        this.camera.position.z = THREE.MathUtils.damp(this.camera.position.z, _desiredCamPos.z, 4.5, delta);

        if (this.camera.position.distanceTo(_desiredCamPos) < 0.25) {
          this.isTransitioning = false;
        }
      }
    } else {
      const targetObj = this.celestials.get(this.selectedId);
      if (targetObj) {
        targetObj.bodyGroup.getWorldPosition(_targetWorldPos);

        // Keep controls target locked smoothly onto orbiting planet
        this.controls.target.x = THREE.MathUtils.damp(this.controls.target.x, _targetWorldPos.x, 7, delta);
        this.controls.target.y = THREE.MathUtils.damp(this.controls.target.y, _targetWorldPos.y, 7, delta);
        this.controls.target.z = THREE.MathUtils.damp(this.controls.target.z, _targetWorldPos.z, 7, delta);

        if (this.isTransitioning) {
          const dist = targetObj.spec.viewDistance;
          _radialDir.copy(_targetWorldPos);
          if (_radialDir.lengthSq() < 0.01) {
            _radialDir.set(0, 0, 1);
          } else {
            _radialDir.normalize();
          }

          _desiredCamPos
            .copy(_targetWorldPos)
            .addScaledVector(_radialDir, dist * 0.92);
          _desiredCamPos.y += dist * 0.42;

          this.camera.position.x = THREE.MathUtils.damp(this.camera.position.x, _desiredCamPos.x, 4.8, delta);
          this.camera.position.y = THREE.MathUtils.damp(this.camera.position.y, _desiredCamPos.y, 4.8, delta);
          this.camera.position.z = THREE.MathUtils.damp(this.camera.position.z, _desiredCamPos.z, 4.8, delta);

          if (this.camera.position.distanceTo(_desiredCamPos) < 0.18) {
            this.isTransitioning = false;
          }
        }
      }
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);

    if (this.isSoftwareGl) {
      this.afterDraw(this.tick);
    } else {
      this.frameId = requestAnimationFrame(this.tick);
    }
  };

  public dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.frameId);
    window.clearTimeout(this.frameId);
    this.resizeObserver.disconnect();

    this.renderer.domElement.removeEventListener('pointerdown', this.handlePointerDown);
    this.renderer.domElement.removeEventListener('pointerup', this.handlePointerUp);
    this.renderer.domElement.removeEventListener('pointermove', this.handlePointerMove);

    this.controls.dispose();
    this.envRT.dispose();

    this.scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh || (obj as THREE.Points).isPoints || (obj as THREE.Line).isLine) {
        const renderable = obj as THREE.Mesh;
        renderable.geometry?.dispose();
        const mat = renderable.material;
        if (Array.isArray(mat)) {
          mat.forEach((m) => m.dispose());
        } else if (mat) {
          mat.dispose();
        }
      }
    });

    this.renderer.dispose();
    if (this.renderer.domElement.parentNode === this.container) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
