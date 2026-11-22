import React from 'react';
import { SectionId } from '../hooks/usePortfolioNavigation';

interface MobileBottomNavProps {
  activeSection: SectionId;
  onNavigate: (sectionId: SectionId) => void;
}

const BOTTOM_TABS: { id: SectionId; label: string; icon: string }[] = [
  { id: 'space-explorer', label: '3D Space', icon: 'rocket_launch' },
  { id: 'about', label: 'About', icon: 'person' },
  { id: 'skills', label: 'Skills', icon: 'code_blocks' },
  { id: 'projects', label: 'Projects', icon: 'folder_code' },
  { id: 'education', label: 'Education', icon: 'school' },
  { id: 'journey', label: 'Journey', icon: 'timeline' },
  { id: 'contact', label: 'Contact', icon: 'mail' },
];

export function MobileBottomNav({ activeSection, onNavigate }: MobileBottomNavProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <nav
      aria-label="Mobile section navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.45)] border-t border-outline-variant/30"
    >
      <div className="flex justify-around items-center h-16 px-space-xs overflow-x-auto no-scrollbar">
        {BOTTOM_TABS.map((tab) => {
          const isActive = activeSection === tab.id || (tab.id === 'about' && activeSection === 'home');
          return (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={(e) => handleClick(e, tab.id)}
              className={`flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-all gap-0.5 ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {tab.icon}
              </span>
              <span className="font-label-nav text-[10px] tracking-tight">{tab.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
