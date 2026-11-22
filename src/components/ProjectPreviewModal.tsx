import React, { useEffect, useState } from 'react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectPreviewModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectPreviewModal({ project, onClose }: ProjectPreviewModalProps) {
  const [hasRunDemo, setHasRunDemo] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setHasRunDemo(false);
    setIsRunning(false);
    setCopied(false);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const handleRunSimulation = () => {
    setIsRunning(true);
    setHasRunDemo(false);
    setTimeout(() => {
      setIsRunning(false);
      setHasRunDemo(true);
    }, 350);
  };

  const handleCopyCode = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(project.sampleCode);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-margin-sm sm:p-margin bg-surface-container-lowest/80 backdrop-blur-md animate-card-enter"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-xl bg-surface-container-lowest border border-outline-variant/50 shadow-[0_24px_64px_rgba(0,0,0,0.75)] overflow-hidden flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Terminal Bar */}
        <div className="flex items-center justify-between px-space-md py-3 bg-surface-container-high border-b border-outline-variant/30">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="w-3 h-3 rounded-full bg-error hover:brightness-110 transition-all cursor-pointer"
            />
            <span className="w-3 h-3 rounded-full bg-secondary inline-block" />
            <span className="w-3 h-3 rounded-full bg-primary inline-block" />
            <span className="font-label-code text-label-code text-on-surface-variant ml-2">
              {project.filename}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyCode}
              className="px-2.5 py-1 rounded bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-primary font-label-badge text-label-badge flex items-center gap-1 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            <button
              type="button"
              onClick={handleRunSimulation}
              className="px-2.5 py-1 rounded bg-primary text-on-primary font-label-badge text-label-badge font-semibold flex items-center gap-1 hover:bg-primary-fixed-dim transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">play_arrow</span>
              <span>Simulate Run</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-space-lg overflow-y-auto space-y-space-md">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-primary font-label-code text-label-code uppercase">
                <span className="material-symbols-outlined text-[18px]">{project.icon}</span>
                <span>{project.tagline}</span>
              </div>
              <h3
                id="project-modal-title"
                className="font-headline-md text-headline-md text-on-surface font-semibold mt-1"
              >
                {project.title}
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded bg-surface-container-low text-primary font-label-badge text-label-badge font-semibold border border-primary/20">
              {project.badge}
            </span>
          </div>

          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            {project.description}
          </p>

          {/* Python Source Preview */}
          <div className="rounded-lg bg-surface-container-low border border-outline-variant/30 overflow-hidden">
            <div className="px-space-md py-2 bg-surface-container border-b border-outline-variant/30 flex items-center justify-between">
              <span className="font-label-code text-[12px] text-primary">
                Core Implementation Snippet
              </span>
              <span className="font-label-badge text-[10px] text-outline uppercase">Python 3.12</span>
            </div>
            <pre className="p-space-md font-label-code text-[12px] sm:text-label-code text-on-surface overflow-x-auto leading-relaxed">
              <code>{project.sampleCode}</code>
            </pre>
          </div>

          {/* Interactive CLI Output */}
          {(isRunning || hasRunDemo) && (
            <div className="rounded-lg bg-surface-container border border-primary/30 p-space-md font-label-code text-[12px] space-y-1 animate-card-enter">
              <div className="flex items-center gap-1.5 text-primary font-semibold pb-1">
                <span className="material-symbols-outlined text-[15px]">terminal</span>
                <span>$ python3 {project.filename}</span>
              </div>
              {isRunning ? (
                <p className="text-on-surface-variant animate-pulse">Executing module...</p>
              ) : (
                project.sampleOutput.map((line, index) => (
                  <p key={index} className="text-on-surface-variant pl-2 border-l-2 border-primary/50">
                    {line}
                  </p>
                ))
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-space-lg py-space-md bg-surface-container-low border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-2">
          <span className="font-label-code text-label-code text-on-surface-variant">
            {project.repoSlug}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-space-md py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-nav text-label-nav hover:bg-surface-bright transition-colors cursor-pointer"
            >
              Close
            </button>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-space-md py-1.5 rounded-lg bg-primary text-on-primary font-label-nav text-label-nav font-medium hover:bg-primary-fixed-dim transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">code</span>
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
