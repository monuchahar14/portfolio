import React, { useState } from 'react';
import { PROJECTS, ProjectCategory, ProjectItem } from '../data/portfolioData';
import { ProjectPreviewModal } from './ProjectPreviewModal';
import { SpotlightCard } from './SpotlightCard';

const PROJECT_FILTERS: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Projects (4)' },
  { id: 'python-systems', label: 'Python Systems' },
  { id: 'academic-apps', label: 'Academic Applications' },
];

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [highlightedTag, setHighlightedTag] = useState<string | null>(null);
  const [inspectedProject, setInspectedProject] = useState<ProjectItem | null>(null);

  const visibleProjects = PROJECTS.filter((project) => {
    const matchesCategory =
      selectedCategory === 'all' || project.category === selectedCategory;
    const matchesTag = !highlightedTag || project.tags.includes(highlightedTag);
    return matchesCategory && matchesTag;
  });

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    setHighlightedTag((prev) => (prev === tag ? null : tag));
  };

  return (
    <section
      className="max-w-7xl mx-auto px-margin-sm sm:px-margin lg:px-margin-lg py-space-xl relative scroll-mt-20"
      id="projects"
    >
      <div className="flex flex-col gap-space-lg">
        {/* Section Header + Category Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md reveal-on-scroll">
          <div className="flex flex-col gap-1">
            <span className="font-label-code text-label-code text-primary uppercase tracking-wider">
              // 03. REPOSITORIES
            </span>
            <h2 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface">
              Featured Projects
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              Software systems, calculation engines, and console utilities engineered with robust
              Python logic and object-oriented architecture.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-xs">
            {PROJECT_FILTERS.map((filter) => {
              const active = selectedCategory === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setSelectedCategory(filter.id)}
                  className={`px-3 py-1.5 rounded-full font-label-nav text-label-nav whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
            {highlightedTag && (
              <button
                type="button"
                onClick={() => setHighlightedTag(null)}
                className="px-2.5 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-badge text-label-badge flex items-center gap-1 hover:brightness-110 transition-all cursor-pointer"
              >
                <span>Tag: {highlightedTag}</span>
                <span className="material-symbols-outlined text-[13px]">close</span>
              </button>
            )}
          </div>
        </div>

        {/* 2x2 Desktop Grid of Terminal Window Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
          {visibleProjects.map((project) => (
            <SpotlightCard
              key={`${selectedCategory}-${project.id}`}
              className="animate-card-enter rounded-xl bg-surface-container-lowest border border-outline-variant/40 shadow-xl overflow-hidden flex flex-col justify-between group hover:border-primary/50"
            >
              <div>
                {/* Header Window Bar */}
                <div className="flex items-center justify-between px-space-md py-3 bg-surface-container-high border-b border-outline-variant/30">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-surface-variant inline-block group-hover:bg-error transition-colors" />
                    <span className="w-3 h-3 rounded-full bg-surface-variant inline-block group-hover:bg-secondary transition-colors" />
                    <span className="w-3 h-3 rounded-full bg-surface-variant inline-block group-hover:bg-primary transition-colors" />
                    <span className="font-label-code text-label-code text-on-surface-variant ml-2 truncate max-w-[160px] sm:max-w-none">
                      {project.filename}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-surface-container-low text-primary font-label-badge text-label-badge font-semibold border border-primary/20 shrink-0">
                    {project.badge}
                  </span>
                </div>

                {/* Card Body Content */}
                <div className="p-space-md sm:p-space-lg flex flex-col gap-space-md">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-space-xs text-primary">
                      <span className="material-symbols-outlined text-[20px]">{project.icon}</span>
                      <span className="font-label-code text-label-code uppercase">
                        {project.tagline}
                      </span>
                    </div>
                    <h3 className="font-headline-sm sm:font-headline-md text-headline-sm sm:text-headline-md text-on-surface font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className="font-body-sm sm:font-body-md text-body-sm sm:text-body-md text-on-surface-variant leading-relaxed">
                    {project.description}
                  </p>

                  {/* Architectural Highlights List */}
                  <div className="p-space-md rounded-lg bg-surface-container-low font-label-code text-label-code text-on-surface-variant space-y-1.5 border border-outline-variant/30 shadow-inner">
                    {project.highlights.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Clickable Interactive Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => {
                      const isTagActive = highlightedTag === tag;
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={(e) => handleTagClick(e, tag)}
                          title={`Filter projects by ${tag}`}
                          className={`px-2.5 py-1 rounded font-label-badge text-label-badge transition-colors cursor-pointer ${
                            isTagActive
                              ? 'bg-primary text-on-primary font-semibold'
                              : 'bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer Action Bar */}
              <div className="px-space-md sm:px-space-lg py-space-md bg-surface-container-low border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-2">
                <span className="font-label-code text-label-code text-on-surface-variant flex items-center gap-1 truncate">
                  <span className="material-symbols-outlined text-[15px] text-primary">
                    folder_open
                  </span>
                  <span className="truncate">{project.repoSlug}</span>
                </span>

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => setInspectedProject(project)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-nav text-label-nav font-medium border border-outline-variant/30 hover:border-primary/40 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px] text-primary">
                      play_circle
                    </span>
                    <span>Inspect Code</span>
                  </button>
                  <a
                    className="inline-flex items-center gap-1.5 px-space-md py-1.5 rounded-lg bg-primary text-on-primary font-label-nav text-label-nav font-medium hover:bg-primary-fixed-dim hover:scale-105 active:scale-95 transition-all shadow-sm"
                    href={project.githubUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined text-[16px]">code</span>
                    <span>View on GitHub</span>
                  </a>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Academic Standards & Practices CLI Footer Showcase (from Stitch mobile design) */}
        <div className="w-full rounded-xl bg-surface-container-lowest border border-outline-variant/30 p-space-md shadow-xl reveal-on-scroll">
          <div className="flex items-center justify-between pb-2 mb-3 bg-surface-container-low/60 -mx-space-md -mt-space-md px-space-md pt-3 rounded-t-xl border-b border-outline-variant/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-primary">code</span>
              <span className="font-label-code text-label-code text-on-surface font-medium">
                Academic Standards &amp; Practices
              </span>
            </div>
            <span className="font-label-badge text-label-badge text-outline">PEP 8 / Clean Code</span>
          </div>
          <div className="space-y-1.5 font-label-code text-label-code text-on-surface-variant">
            <div className="flex items-center gap-2 text-primary">
              <span>$</span>
              <span className="text-on-surface">git log --oneline --decorate</span>
            </div>
            <p className="text-outline pl-4">
              feat(core): implement object-oriented persistence &amp; modular drivers
            </p>
            <p className="text-outline pl-4">
              refactor(safety): validate edge inputs and sanitize console buffers
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Code & CLI Simulation Modal */}
      <ProjectPreviewModal
        project={inspectedProject}
        onClose={() => setInspectedProject(null)}
      />
    </section>
  );
}
