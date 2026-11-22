import React from 'react';
import { ABOUT_STRENGTHS, PROFILE } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';

export function AboutSection() {
  return (
    <section
      className="max-w-7xl mx-auto px-margin-sm sm:px-margin lg:px-margin-lg py-space-xl relative scroll-mt-20"
      id="about"
    >
      <div className="flex flex-col gap-space-lg">
        {/* Section Header */}
        <div className="flex flex-col gap-1 reveal-on-scroll">
          <span className="font-label-code text-label-code text-primary uppercase tracking-wider">
            // 01. PROFILE
          </span>
          <h2 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface">
            About Me
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            A methodical approach to computer science and an unwavering appetite for building
            engineered systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
          {/* Left Column: In-depth Narrative */}
          <SpotlightCard className="lg:col-span-6 flex flex-col gap-space-md bg-surface-container-low/90 border border-outline-variant/30 p-space-lg sm:p-space-xl rounded-xl shadow-md reveal-on-scroll">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Engineering with Principle, Purpose &amp; Pragmatism
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              I am a Computer Science &amp; Engineering ({PROFILE.degree}) undergraduate scholar at{' '}
              <strong className="text-on-surface font-semibold">{PROFILE.university}</strong>. My
              passion lies in understanding how software foundations intertwine—from lower-level data
              structures and memory paradigms to top-tier client architecture and responsive user
              interfaces.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              During my academic career, I have dedicated substantial time to mastering
              object-oriented design patterns with Python, practicing algorithmic analysis, and
              producing modular applications such as financial record auditors, billing calculators,
              and structured campus systems.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              I hold a strong belief that software should be straightforward to read, robust to
              execute, and adaptable to future scale. Whenever I am not writing code, I am
              dissecting technical documentation, solving competitive programming challenges, and
              staying abreast of the evolving web landscape.
            </p>
            <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
              <span className="px-space-sm py-1 rounded bg-surface-container-high text-primary font-label-code text-label-code border border-outline-variant/30">
                Python Specialist
              </span>
              <span className="px-space-sm py-1 rounded bg-surface-container-high text-primary font-label-code text-label-code border border-outline-variant/30">
                CSE (Hons) GLA Scholar
              </span>
              <span className="px-space-sm py-1 rounded bg-surface-container-high text-primary font-label-code text-label-code border border-outline-variant/30">
                Clean Architecture
              </span>
            </div>
          </SpotlightCard>

          {/* Right Column: 2x2 Strength Bento Grid with Interactive Hover Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-space-md reveal-on-scroll">
            {ABOUT_STRENGTHS.map((strength) => (
              <SpotlightCard
                key={strength.title}
                className="p-space-lg rounded-xl bg-surface-container-low/90 border border-outline-variant/30 shadow-sm flex flex-col gap-space-sm group"
              >
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                  <span className="material-symbols-outlined text-[24px]">{strength.icon}</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  {strength.title}
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {strength.description}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
