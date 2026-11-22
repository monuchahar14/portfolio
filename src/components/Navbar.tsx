import React, { useState } from 'react';
import { SectionId } from '../hooks/usePortfolioNavigation';

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (sectionId: SectionId) => void;
}

const DESKTOP_NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'space-explorer', label: '3D Space' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const MOBILE_DRAWER_ITEMS: { id: SectionId; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'space-explorer', label: '3D Space Explorer', icon: 'rocket_launch' },
  { id: 'about', label: 'About Me', icon: 'person' },
  { id: 'skills', label: 'Technical Skills', icon: 'code_blocks' },
  { id: 'projects', label: 'Featured Projects', icon: 'folder_code' },
  { id: 'education', label: 'Education', icon: 'school' },
  { id: 'journey', label: 'Learning Journey', icon: 'timeline' },
  { id: 'contact', label: 'Let’s Connect', icon: 'mail' },
];

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    e.preventDefault();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const isNavActive = (id: SectionId) => {
    if (id === 'education' && activeSection === 'journey') return true;
    return activeSection === id;
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 pt-safe bg-surface/75 backdrop-blur-2xl shadow-[0_4px_24px_rgba(0,0,0,0.45)] border-b border-outline-variant/30 transition-all duration-300"
      id="main-nav-bar"
    >
      <div className="h-16 max-w-7xl mx-auto px-margin-sm sm:px-margin lg:px-margin-lg flex items-center justify-between gap-space-md">
        {/* Logo Branding & Availability Pill */}
        <div className="flex items-center gap-space-lg">
          <a
            className="flex items-center gap-space-sm group text-decoration-none"
            href="#home"
            onClick={(e) => handleLinkClick(e, 'home')}
          >
            <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center border border-outline-variant/50 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(192,193,255,0.35)] transition-all">
              <span className="material-symbols-outlined text-primary text-[18px] group-hover:scale-110 transition-transform">
                code
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface group-hover:text-primary transition-colors leading-tight">
                Monu Chahar
              </span>
              <span className="md:hidden flex items-center gap-1 font-label-badge text-[10px] text-primary uppercase tracking-wider mt-0.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="beacon-ring absolute inline-flex h-full w-full rounded-full bg-primary"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                </span>
                Open to Work
              </span>
            </div>
          </a>

          <div className="hidden xl:flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container-low/90 border border-primary/20 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="beacon-ring absolute inline-flex h-full w-full rounded-full bg-primary"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="font-label-badge text-label-badge uppercase text-primary tracking-wider font-semibold">
              Available for Internships
            </span>
          </div>
        </div>

        {/* Desktop Navigation Tabs with active pill */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-1 p-1 bg-surface-container-lowest/80 border border-outline-variant/30 rounded-xl backdrop-blur-md"
          id="nav-links-container"
        >
          {DESKTOP_NAV_ITEMS.map((item) => {
            const active = isNavActive(item.id);
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`nav-item px-3 py-1.5 rounded-lg font-label-nav text-label-nav transition-all ${
                  active
                    ? 'text-primary bg-surface-container-high font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Button, Avatar & Mobile Menu Toggle */}
        <div className="flex items-center gap-space-sm sm:gap-space-md">
          <a
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-on-primary font-label-nav text-label-nav font-semibold hover:bg-primary-fixed-dim hover:shadow-[0_0_24px_-2px_rgba(192,193,255,0.6)] active:scale-95 transition-all"
            href="#contact"
            onClick={(e) => handleLinkClick(e, 'contact')}
          >
            <span>Get in Touch</span>
          </a>

          <a
            className="hidden sm:flex w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant/40 items-center justify-center hover:border-primary transition-colors group"
            href="#about"
            onClick={(e) => handleLinkClick(e, 'about')}
            title="View Monu's Bio"
          >
            <span className="material-symbols-outlined text-primary text-[18px] group-hover:scale-110 transition-transform">
              person
            </span>
          </a>

          <a
            aria-label="Quick Contact"
            className="sm:hidden flex items-center justify-center min-w-[40px] min-h-[40px] rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
            href="#contact"
            onClick={(e) => handleLinkClick(e, 'contact')}
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </a>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden flex items-center justify-center min-w-[40px] min-h-[40px] rounded-lg bg-surface-container-high border border-outline-variant/40 text-on-surface hover:border-primary hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Responsive Mobile Slide-Down Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-outline-variant/30 bg-surface-container-lowest/95 backdrop-blur-2xl px-margin-sm py-space-md animate-card-enter">
          <div className="flex flex-col gap-1">
            {MOBILE_DRAWER_ITEMS.map((item) => {
              const active = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-label-nav text-label-nav transition-all ${
                    active
                      ? 'bg-surface-container-high text-primary font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-primary">
                      {item.icon}
                    </span>
                    {item.label}
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-outline">
                    arrow_forward_ios
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
