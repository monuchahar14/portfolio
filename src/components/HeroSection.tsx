import React from 'react';
import { HERO_METRICS, PROFILE } from '../data/portfolioData';
import { SectionId } from '../hooks/usePortfolioNavigation';
import { InteractiveTerminal } from './InteractiveTerminal';
import { SpotlightCard } from './SpotlightCard';

interface HeroSectionProps {
  onNavigate: (sectionId: SectionId) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, target: SectionId) => {
    e.preventDefault();
    onNavigate(target);
  };

  return (
    <section
      className="max-w-7xl mx-auto px-margin-sm sm:px-margin lg:px-margin-lg py-space-lg sm:py-space-xl lg:py-24 relative scroll-mt-20"
      id="home"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
        {/* Left Column: Bio, Counters & Interactive CTAs */}
        <div className="lg:col-span-7 flex flex-col gap-space-md reveal-on-scroll is-revealed">
          {/* Live Availability Badge & Prompt Indicator */}
          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="inline-flex items-center gap-space-xs px-3.5 py-1.5 rounded-full bg-surface-container-high/90 border border-primary/30 shadow-[0_0_15px_rgba(192,193,255,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="beacon-ring absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-label-badge text-label-badge uppercase tracking-wider text-primary font-semibold">
                Available for Internships &amp; Projects
              </span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container-low font-label-code text-label-code text-on-surface-variant border border-outline-variant/30">
              <span className="text-primary font-bold">&gt;</span>
              <span>print("Hello, World!")</span>
            </div>
          </div>

          {/* Hero Headings with Glow Typography */}
          <div className="space-y-space-xs">
            <h1 className="font-display-hero-mobile sm:font-display-hero text-display-hero-mobile sm:text-display-hero tracking-tight text-on-surface">
              Hi, I&apos;m <span className="hero-name-gradient">{PROFILE.name}</span>.
            </h1>
            <p className="font-headline-sm sm:font-headline-md text-headline-sm sm:text-headline-md text-primary-fixed-dim">
              {PROFILE.heroSubtitle}
            </p>
          </div>

          {/* Narrative Bio */}
          <p className="font-body-md sm:font-body-lg text-body-md sm:text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            {PROFILE.bio}
          </p>

          {/* Interactive Quote Callout */}
          <SpotlightCard className="p-space-md rounded-xl bg-surface-container-low/90 border border-outline-variant/40 shadow-lg max-w-xl">
            <div className="flex items-start gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[24px] select-none">
                terminal
              </span>
              <div className="flex flex-col gap-1">
                <p className="font-body-md text-body-md text-on-surface italic font-medium">
                  {PROFILE.quote}
                </p>
                <div className="flex flex-wrap items-center gap-space-xs text-on-surface-variant font-label-code text-label-code">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    location_on
                  </span>
                  <span>
                    {PROFILE.locationShort} • {PROFILE.degree}
                  </span>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* CTAs with Interactive Hover States */}
          <div className="flex flex-wrap items-center gap-space-sm sm:gap-space-md pt-2">
            <a
              className="w-full sm:w-auto inline-flex items-center justify-center gap-space-sm px-6 py-3 rounded-lg bg-primary text-on-primary font-label-nav text-label-nav font-semibold shadow-[0_0_25px_-5px_rgba(192,193,255,0.45)] hover:bg-primary-fixed-dim hover:scale-105 active:scale-95 transition-all group"
              href="#projects"
              onClick={(e) => handleAnchor(e, 'projects')}
            >
              <span>Explore My Work</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1.5 transition-transform">
                arrow_forward
              </span>
            </a>
            <a
              className="w-full sm:w-auto inline-flex items-center justify-center gap-space-sm px-6 py-3 rounded-lg bg-surface-container-high border border-outline-variant/40 text-on-surface font-label-nav text-label-nav hover:bg-surface-bright hover:border-primary/50 hover:scale-105 active:scale-95 transition-all shadow-md"
              href="#contact"
              onClick={(e) => handleAnchor(e, 'contact')}
            >
              <span className="material-symbols-outlined text-[18px] text-primary">mail</span>
              <span>Contact Me</span>
            </a>
            <a
              className="inline-flex items-center gap-space-xs px-space-md py-3 font-label-code text-label-code text-on-surface-variant hover:text-primary transition-colors group"
              href="#education"
              onClick={(e) => handleAnchor(e, 'education')}
            >
              <span className="material-symbols-outlined text-[18px] group-hover:-translate-y-0.5 transition-transform">
                description
              </span>
              <span>Academic Path</span>
            </a>
            <a
              className="inline-flex items-center gap-space-xs px-space-md py-3 rounded-lg bg-surface-container-low/90 border border-primary/30 font-label-code text-label-code text-primary hover:bg-surface-container-high hover:border-primary/60 transition-all group"
              href="#space-explorer"
              onClick={(e) => handleAnchor(e, 'space-explorer')}
            >
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                rocket_launch
              </span>
              <span>3D Space Explorer</span>
            </a>
          </div>

          {/* Interactive Stats Counters */}
          <div className="grid grid-cols-3 gap-space-sm pt-space-md">
            {HERO_METRICS.map((metric) => (
              <SpotlightCard
                key={metric.codeLabel}
                className="p-3 sm:p-space-md rounded-xl bg-surface-container-low/80 border border-outline-variant/30 shadow-sm flex flex-col gap-1"
              >
                <span className="font-label-code text-[10px] sm:text-label-code text-primary font-medium truncate">
                  {metric.codeLabel}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-sm sm:font-headline-md text-headline-sm sm:text-headline-md text-on-surface font-semibold">
                    {metric.value}
                  </span>
                </div>
                <span className="font-body-sm text-[11px] sm:text-body-sm text-on-surface-variant">
                  {metric.label}
                </span>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive IDE / Terminal Window */}
        <div className="lg:col-span-5 w-full reveal-on-scroll is-revealed">
          <InteractiveTerminal onNavigate={onNavigate} />
        </div>
      </div>
    </section>
  );
}
