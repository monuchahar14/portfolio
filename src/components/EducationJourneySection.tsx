import React, { useState } from 'react';
import { EDUCATION_COURSEWORK, PROFILE, TIMELINE_STAGES } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';

export function EducationJourneySection() {
  const [selectedStage, setSelectedStage] = useState<string>('04');

  return (
    <section
      className="max-w-7xl mx-auto px-margin-sm sm:px-margin lg:px-margin-lg py-space-xl relative scroll-mt-20"
      id="education"
    >
      <div className="flex flex-col gap-space-lg">
        {/* Section Header */}
        <div className="flex flex-col gap-1 reveal-on-scroll">
          <span className="font-label-code text-label-code text-primary uppercase tracking-wider">
            // 04. ACADEMICS &amp; TIMELINE
          </span>
          <h2 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface">
            Education &amp; Learning Milestones
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            My collegiate foundation in Computer Science &amp; Engineering alongside my
            self-directed developer trajectory.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
          {/* Left Column: Academic Degree Card */}
          <div className="lg:col-span-5 flex flex-col gap-space-md reveal-on-scroll">
            <SpotlightCard className="p-space-lg sm:p-space-xl rounded-xl bg-surface-container-low/90 border border-outline-variant/30 shadow-md flex flex-col gap-space-md">
              <div className="flex items-center justify-between gap-2">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-[0_0_20px_rgba(192,193,255,0.4)] shrink-0">
                  <span className="material-symbols-outlined text-[28px]">school</span>
                </div>
                <span className="px-space-sm py-1 rounded-full bg-surface-container-high border border-primary/30 font-label-badge text-label-badge text-primary uppercase font-semibold">
                  Undergraduate • In Progress
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-headline-sm sm:font-headline-md text-headline-sm sm:text-headline-md text-on-surface font-semibold">
                  {PROFILE.degreeFull}
                </h3>
                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-label-badge bg-secondary-container text-on-secondary-container font-medium uppercase tracking-wider">
                    Honors
                  </span>
                  <span className="font-body-md text-body-md text-primary font-medium">
                    {PROFILE.university}
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Uttar Pradesh, India • {PROFILE.degree} Scholar
                </p>
              </div>

              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Acquiring a deep mathematical and computational foundation. Focus areas include
                complexity evaluation of data structures, relational database normalization,
                low-level operating system scheduling concepts, and clean object-oriented systems
                design.
              </p>

              {/* Relevant Coursework Grid */}
              <div className="pt-2">
                <span className="font-label-code text-label-code text-on-surface uppercase tracking-wider block mb-2 font-medium">
                  Key Coursework Covered:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {EDUCATION_COURSEWORK.map((course) => (
                    <span
                      key={course}
                      className="px-2.5 py-1 rounded bg-surface-container text-on-surface-variant font-label-badge text-label-badge border border-outline-variant/20"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>

            {/* Campus Highlight Box */}
            <SpotlightCard className="p-space-lg rounded-xl bg-surface-container-high/90 border border-outline-variant/30 shadow-sm flex items-center gap-space-md">
              <span className="material-symbols-outlined text-primary text-[32px]">hub</span>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Campus Tech Culture
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Active participant in hackathons, university peer workshops, and competitive code
                  jams.
                </p>
              </div>
            </SpotlightCard>
          </div>

          {/* Right Column: Interactive Timeline with Selectable Stages */}
          <div className="lg:col-span-7 flex flex-col gap-space-md reveal-on-scroll scroll-mt-20" id="journey">
            <div className="p-space-lg sm:p-space-xl rounded-xl bg-surface-container-low/90 border border-outline-variant/30 shadow-md">
              <div className="flex items-center justify-between mb-space-lg">
                <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2 font-semibold">
                  <span className="material-symbols-outlined text-primary">timeline</span>
                  <span>The Learning Progression</span>
                </h3>
                <span className="font-label-badge text-label-badge text-outline uppercase tracking-wider hidden sm:inline-block">
                  Click stages to inspect
                </span>
              </div>

              <div
                className="relative pl-6 space-y-space-md sm:space-y-space-lg before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-surface-container-high"
                id="timeline-container"
              >
                {TIMELINE_STAGES.map((stage) => {
                  const isSelected = selectedStage === stage.stageNumber;
                  return (
                    <button
                      key={stage.stageNumber}
                      type="button"
                      onClick={() => setSelectedStage(stage.stageNumber)}
                      className={`w-full text-left relative cursor-pointer group p-3.5 -ml-3 rounded-lg transition-all ${
                        isSelected
                          ? 'bg-surface-container/75 ring-1 ring-primary/40 shadow-sm'
                          : 'hover:bg-surface-container/50'
                      }`}
                    >
                      <div
                        className={`absolute -left-[27px] top-4 w-4 h-4 rounded-full ring-4 ring-surface-container-low group-hover:scale-125 transition-transform ${
                          stage.isCurrent ? 'bg-secondary' : 'bg-primary'
                        }`}
                      />
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`font-label-code text-label-code font-semibold ${
                              stage.isCurrent ? 'text-secondary' : 'text-primary'
                            }`}
                          >
                            {stage.stageLabel}
                          </span>
                          <span
                            className={`font-label-badge text-label-badge ${
                              stage.isCurrent ? 'text-secondary' : 'text-on-surface-variant'
                            }`}
                          >
                            {stage.stageTag}
                          </span>
                          {stage.isCurrent && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-label-badge bg-primary text-on-primary font-bold uppercase">
                              Current
                            </span>
                          )}
                        </div>
                        <h4
                          className={`font-headline-sm text-headline-sm text-on-surface font-medium transition-colors ${
                            stage.isCurrent
                              ? 'group-hover:text-secondary'
                              : 'group-hover:text-primary'
                          }`}
                        >
                          {stage.title}
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                          {stage.description}
                        </p>
                        {stage.focusPill && (
                          <div className="flex items-center gap-1.5 pt-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span className="font-label-code text-[11px] text-primary font-medium">
                              {stage.focusPill}
                            </span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
