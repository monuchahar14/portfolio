import React, { useEffect, useRef, useState } from 'react';
import { SectionId } from '../hooks/usePortfolioNavigation';
import {
  CELESTIAL_BODIES,
  CelestialId,
  SPACE_THEMES,
  SpaceThemeId,
} from '../space/spaceData';
import { SpaceSceneManager } from '../space/SpaceSceneManager';

interface SpaceExplorerSectionProps {
  onNavigate: (sectionId: SectionId) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

const SPEED_OPTIONS = [0.5, 1, 2, 4];

export function SpaceExplorerSection({
  onNavigate,
  isFullscreen,
  onToggleFullscreen,
}: SpaceExplorerSectionProps) {
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const sceneManagerRef = useRef<SpaceSceneManager | null>(null);

  const [selectedId, setSelectedId] = useState<CelestialId>('overview');
  const [hoveredId, setHoveredId] = useState<CelestialId | null>(null);
  const [themeId, setThemeId] = useState<SpaceThemeId>('obsidian');
  const [isPaused, setIsPaused] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [showOrbits, setShowOrbits] = useState(true);
  const [dockCollapsed, setDockCollapsed] = useState(false);

  // Mount WebGL scene once and keep callbacks isolated from React re-renders
  useEffect(() => {
    const mountEl = canvasMountRef.current;
    if (!mountEl) return;

    const manager = new SpaceSceneManager(mountEl, {
      onSelectCelestial: (id) => setSelectedId(id),
      onHoverCelestial: (id) => setHoveredId(id),
    });
    sceneManagerRef.current = manager;

    return () => {
      manager.dispose();
      sceneManagerRef.current = null;
    };
  }, []);

  // Resize renderer cleanly when toggling fullscreen container layout
  useEffect(() => {
    const timer = window.setTimeout(() => {
      sceneManagerRef.current?.handleResize();
    }, 40);
    return () => window.clearTimeout(timer);
  }, [isFullscreen]);

  // Keyboard shortcut 'H' to toggle HUD dock (Cinema/Zen mode) & Escape to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }
      if (e.key === 'h' || e.key === 'H') {
        setDockCollapsed((prev) => !prev);
      } else if (e.key === 'Escape' && isFullscreen) {
        onToggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, onToggleFullscreen]);

  const handleSelectTarget = (id: CelestialId) => {
    setSelectedId(id);
    sceneManagerRef.current?.focusCelestial(id);
  };

  const handleThemeChange = (nextTheme: SpaceThemeId) => {
    setThemeId(nextTheme);
    sceneManagerRef.current?.setTheme(nextTheme);
  };

  const handleTogglePause = () => {
    setIsPaused((prev) => {
      const next = !prev;
      sceneManagerRef.current?.setPaused(next);
      return next;
    });
  };

  const handleSpeedChange = (nextSpeed: number) => {
    setSpeedMultiplier(nextSpeed);
    sceneManagerRef.current?.setSpeedMultiplier(nextSpeed);
  };

  const handleToggleOrbits = () => {
    setShowOrbits((prev) => {
      const next = !prev;
      sceneManagerRef.current?.setOrbitsVisible(next);
      return next;
    });
  };

  const activeSpec = CELESTIAL_BODIES.find((b) => b.id === selectedId) ?? null;
  const hoveredSpec = CELESTIAL_BODIES.find((b) => b.id === hoveredId) ?? null;

  return (
    <section
      className={
        isFullscreen
          ? 'fixed inset-0 z-[60] bg-[#09090d] flex flex-col'
          : 'max-w-7xl mx-auto px-margin-sm sm:px-margin lg:px-margin-lg py-space-xl relative scroll-mt-20'
      }
      id="space-explorer"
    >
      {!isFullscreen && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-md reveal-on-scroll is-revealed">
          <div className="flex flex-col gap-1">
            <span className="font-label-code text-label-code text-primary uppercase tracking-wider">
              // 00. 3D OBSERVATORY
            </span>
            <h2 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface">
              3D Space Theme Explorer
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              Orbit through Monu&apos;s interactive developer solar system. Drag to rotate, scroll
              to zoom, or click any planet or spacecraft to inspect its telemetry and module.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleFullscreen}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-high border border-outline-variant/40 text-on-surface font-label-nav text-label-nav hover:border-primary/60 hover:text-primary transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">fullscreen</span>
              <span>Fullscreen Explorer</span>
            </button>
          </div>
        </div>
      )}

      {/* 3D Viewport Container */}
      <div
        className={
          isFullscreen
            ? 'relative w-full h-full overflow-hidden'
            : 'relative w-full h-[540px] sm:h-[620px] rounded-xl border border-outline-variant/40 shadow-2xl overflow-hidden bg-[#09090d]'
        }
      >
        {/* Isolated WebGL Mount Node (No sibling HUD children inside) */}
        <div ref={canvasMountRef} className="absolute inset-0 w-full h-full" />

        {/* Minimal Top-Left Spec & Telemetry Readout (solid rgba surface, no backdrop-filter, no pulsing dots) */}
        <div
          className="absolute top-4 left-4 z-10 max-w-[300px] sm:max-w-[340px] rounded-xl border border-outline-variant/40 px-3.5 py-2.5 shadow-lg pointer-events-auto"
          style={{ backgroundColor: 'rgba(14, 14, 16, 0.90)' }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-sm shrink-0"
                style={{
                  backgroundColor: activeSpec ? activeSpec.primaryColor : '#c0c1ff',
                }}
              />
              <span className="font-label-code text-label-code text-on-surface font-semibold truncate">
                {activeSpec ? activeSpec.name : 'System Overview'}
              </span>
            </div>
            <span className="font-label-badge text-[10px] text-primary uppercase shrink-0">
              {activeSpec ? activeSpec.designation : '7 BODIES'}
            </span>
          </div>

          {activeSpec ? (
            <div className="mt-2 pt-2 border-t border-outline-variant/30 space-y-1.5">
              <div className="font-label-badge text-[10px] text-on-surface-variant uppercase tracking-wider">
                {activeSpec.classification}
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 font-label-code text-[11px] text-on-surface-variant">
                <span>Orbit: {activeSpec.telemetry.orbitalPeriod}</span>
                <span>Temp: {activeSpec.telemetry.temperature}</span>
              </div>
              <div className="font-body-sm text-[12px] text-on-surface leading-snug pt-0.5">
                <span className="text-primary font-medium">{activeSpec.portfolioNode.moduleName}:</span>{' '}
                {activeSpec.portfolioNode.summary}
              </div>
              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    if (isFullscreen) onToggleFullscreen();
                    onNavigate(activeSpec.portfolioNode.sectionId);
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-primary text-on-primary font-label-badge text-[11px] font-semibold hover:bg-primary-fixed-dim transition-colors cursor-pointer"
                >
                  <span>Open {activeSpec.portfolioNode.moduleName}</span>
                  <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectTarget('overview')}
                  className="font-label-badge text-[11px] text-on-surface-variant hover:text-on-surface cursor-pointer"
                >
                  Reset View
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-1 font-body-sm text-[12px] text-on-surface-variant">
              {hoveredSpec
                ? `Click to lock camera on ${hoveredSpec.name} (${hoveredSpec.portfolioNode.moduleName})`
                : 'Drag to orbit • Scroll to zoom • Click any planet'}
            </div>
          )}
        </div>

        {/* Fullscreen Exit Button (only when fullscreen is active, top-right corner) */}
        {isFullscreen && (
          <button
            type="button"
            onClick={onToggleFullscreen}
            className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-outline-variant/40 text-on-surface font-label-nav text-label-nav hover:border-primary hover:text-primary transition-colors cursor-pointer"
            style={{ backgroundColor: 'rgba(14, 14, 16, 0.90)' }}
          >
            <span className="material-symbols-outlined text-[18px]">fullscreen_exit</span>
            <span>Exit Fullscreen</span>
          </button>
        )}

        {/* Unified Collapsible Bottom Control Dock (Zero Viewport Occlusion) */}
        <div
          className="absolute z-10 left-1/2 -translate-x-1/2 transition-transform duration-300 ease-out"
          style={{
            bottom: '14px',
            width: 'min(920px, 94%)',
            transform: dockCollapsed
              ? 'translateX(-50%) translateY(calc(100% - 30px))'
              : 'translateX(-50%) translateY(0)',
          }}
        >
          {/* Collapse / Expand Handle */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setDockCollapsed((prev) => !prev)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-t-lg border border-b-0 border-outline-variant/40 text-on-surface-variant hover:text-primary font-label-badge text-[10px] uppercase tracking-wider cursor-pointer"
              style={{ backgroundColor: 'rgba(14, 14, 16, 0.94)' }}
              title="Toggle Controls (H)"
            >
              <span className="material-symbols-outlined text-[14px]">
                {dockCollapsed ? 'expand_less' : 'expand_more'}
              </span>
              <span>{dockCollapsed ? 'Show Controls (H)' : 'Hide Controls (H)'}</span>
            </button>
          </div>

          {/* Control Bar Surface */}
          <div
            className="rounded-xl border border-outline-variant/45 p-2.5 sm:p-3 shadow-2xl space-y-2"
            style={{ backgroundColor: 'rgba(14, 14, 16, 0.93)' }}
          >
            {/* Row 1: Camera Targets */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              <span className="font-label-badge text-[10px] text-outline uppercase tracking-wider shrink-0 mr-1">
                Target:
              </span>
              <button
                type="button"
                onClick={() => handleSelectTarget('overview')}
                className={`px-2.5 py-1 rounded-md font-label-badge text-[11px] whitespace-nowrap transition-colors cursor-pointer ${
                  selectedId === 'overview'
                    ? 'bg-primary text-on-primary font-semibold'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Overview
              </button>
              {CELESTIAL_BODIES.map((body) => {
                const active = selectedId === body.id;
                return (
                  <button
                    key={body.id}
                    type="button"
                    onClick={() => handleSelectTarget(body.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-label-badge text-[11px] whitespace-nowrap transition-colors cursor-pointer ${
                      active
                        ? 'bg-primary text-on-primary font-semibold'
                        : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: active ? '#1000a9' : body.primaryColor,
                      }}
                    />
                    <span>{body.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Row 2: Simulation Speed, Space Themes & Utility Toggles */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-outline-variant/25">
              {/* Orbit Playback & Speed */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleTogglePause}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-badge text-[11px] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px] text-primary">
                    {isPaused ? 'play_arrow' : 'pause'}
                  </span>
                  <span>{isPaused ? 'Resume' : 'Pause'}</span>
                </button>

                <div className="flex items-center rounded-md bg-surface-container p-0.5 border border-outline-variant/25">
                  {SPEED_OPTIONS.map((spd) => (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => handleSpeedChange(spd)}
                      className={`px-2 py-0.5 rounded font-label-badge text-[10px] transition-colors cursor-pointer ${
                        speedMultiplier === spd
                          ? 'bg-primary text-on-primary font-semibold'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Space Theme Palette Swatches */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                <span className="font-label-badge text-[10px] text-outline uppercase tracking-wider mr-1 hidden sm:inline">
                  Theme:
                </span>
                {(Object.keys(SPACE_THEMES) as SpaceThemeId[]).map((id) => {
                  const theme = SPACE_THEMES[id];
                  const active = themeId === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => handleThemeChange(id)}
                      className={`px-2.5 py-1 rounded-md font-label-badge text-[11px] whitespace-nowrap transition-colors cursor-pointer ${
                        active
                          ? 'bg-secondary-container text-on-secondary-container font-semibold'
                          : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {theme.label}
                    </button>
                  );
                })}
              </div>

              {/* Orbit Lines & Fullscreen */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleToggleOrbits}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-label-badge text-[11px] transition-colors cursor-pointer ${
                    showOrbits
                      ? 'bg-surface-container-high text-primary border border-primary/30'
                      : 'bg-surface-container text-on-surface-variant'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">radar</span>
                  <span>Orbits</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
