import React, { useState } from 'react';
import { ACADEMIC_FOCUS_AREAS, SKILLS, SkillCategory } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';

const FILTER_TABS: { id: SkillCategory; label: string }[] = [
  { id: 'all', label: 'All Stack' },
  { id: 'languages', label: 'Core Languages' },
  { id: 'web', label: 'Frontend & Styling' },
  { id: 'tools', label: 'Tools & Workflow' },
];

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('all');

  const filteredSkills =
    selectedCategory === 'all'
      ? SKILLS
      : SKILLS.filter((skill) => skill.category === selectedCategory);

  return (
    <section
      className="max-w-7xl mx-auto px-margin-sm sm:px-margin lg:px-margin-lg py-space-xl relative scroll-mt-20"
      id="skills"
    >
      <div className="flex flex-col gap-space-lg">
        {/* Section Header with Functional Interactive Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md reveal-on-scroll">
          <div className="flex flex-col gap-1">
            <span className="font-label-code text-label-code text-primary uppercase tracking-wider">
              // 02. TOOLSET
            </span>
            <h2 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface">
              Technical Skills &amp; Competencies
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              Core technologies, languages, and tools I use to build robust, maintainable software
              solutions.
            </p>
          </div>

          {/* Filter Tabs with Active Pill Highlight */}
          <div
            className="flex items-center gap-1 p-1 bg-surface-container-low border border-outline-variant/30 rounded-xl shadow-sm overflow-x-auto no-scrollbar"
            id="skills-filter-tabs"
            role="tablist"
            aria-label="Filter technical skills"
          >
            {FILTER_TABS.map((tab) => {
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-space-md py-1.5 rounded-lg font-label-nav text-label-nav font-medium transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Grid with Dynamic Filtering & Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md" id="skills-grid">
          {filteredSkills.map((skill) => (
            <SpotlightCard
              key={`${selectedCategory}-${skill.id}`}
              className="animate-card-enter p-space-lg rounded-xl bg-surface-container-low/90 border border-outline-variant/30 shadow-sm flex flex-col justify-between gap-space-md group"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div
                      className={`w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant/30 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform ${
                        skill.inProgress ? 'text-secondary' : 'text-primary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[24px]">{skill.icon}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                          {skill.name}
                        </h3>
                        {skill.inProgress && (
                          <span className="relative flex h-2 w-2">
                            <span className="beacon-ring absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                          </span>
                        )}
                      </div>
                      <span
                        className={`font-label-code text-label-code ${
                          skill.inProgress ? 'text-secondary' : 'text-primary'
                        }`}
                      >
                        {skill.subtitle}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`font-label-code text-label-code font-semibold ${
                      skill.inProgress ? 'text-secondary' : 'text-primary'
                    }`}
                  >
                    {skill.percentage}%
                  </span>
                </div>

                <p className="font-body-sm text-body-sm text-on-surface-variant mt-3">
                  {skill.description}
                </p>
              </div>

              <div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      skill.inProgress ? 'bg-secondary' : 'bg-primary'
                    }`}
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
                <div className="flex flex-wrap gap-1">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-badge text-label-badge"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Areas of Academic Interest Ribbon */}
        <div className="p-space-lg rounded-xl bg-surface-container-high/90 border border-outline-variant/30 shadow-md reveal-on-scroll">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[28px]">school</span>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Areas of Academic &amp; Applied Focus
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Core Computer Science pillars cultivated throughout my degree at GLA University.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-space-xs">
              {ACADEMIC_FOCUS_AREAS.map((area) => (
                <div
                  key={area.label}
                  className="px-space-md py-1.5 rounded-lg bg-surface-container-low font-label-code text-label-code text-on-surface flex items-center gap-1.5 border border-outline-variant/30 shadow-sm hover:border-primary/50 transition-colors"
                >
                  <span className="material-symbols-outlined text-primary text-[16px]">
                    {area.icon}
                  </span>
                  <span>{area.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
