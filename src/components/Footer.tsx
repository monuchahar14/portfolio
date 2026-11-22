import React from 'react';
import { PROFILE } from '../data/portfolioData';
import { SectionId } from '../hooks/usePortfolioNavigation';

interface FooterProps {
  onNavigate: (sectionId: SectionId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleScrollTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate('home');
  };

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 pt-space-xl pb-24 md:pb-space-xl mt-space-xl relative">
      <div className="max-w-7xl mx-auto px-margin-sm sm:px-margin lg:px-margin-lg flex flex-col md:flex-row items-center justify-between gap-space-lg">
        <div className="flex flex-col items-center md:items-start gap-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[18px]">terminal</span>
            <span className="font-label-code text-label-code text-on-surface font-semibold">
              monu_chahar.sh
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Mathura, India • Remote Worldwide
          </p>
          <p className="font-body-sm text-body-sm text-outline">
            © 2025 {PROFILE.name}. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-space-lg flex-wrap justify-center">
          <a
            className="flex items-center gap-space-xs font-label-code text-label-code text-on-surface-variant hover:text-primary transition-colors group"
            href={PROFILE.githubUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">
              deployed_code
            </span>
            <span>GitHub</span>
          </a>
          <a
            className="flex items-center gap-space-xs font-label-code text-label-code text-on-surface-variant hover:text-primary transition-colors group"
            href={PROFILE.linkedinUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">
              badge
            </span>
            <span>LinkedIn</span>
          </a>
          <a
            className="flex items-center gap-space-xs font-label-code text-label-code text-on-surface-variant hover:text-primary transition-colors group"
            href={`mailto:${PROFILE.email}`}
          >
            <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">
              mail
            </span>
            <span>Email</span>
          </a>
          <a
            className="flex items-center gap-space-xs font-label-code text-label-code text-on-surface-variant hover:text-primary transition-colors group"
            href="#home"
            onClick={handleScrollTop}
          >
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-y-0.5 transition-transform">
              arrow_upward
            </span>
            <span>Top</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
