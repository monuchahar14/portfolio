/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { EducationJourneySection } from './components/EducationJourneySection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Navbar } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { SpaceExplorerSection } from './components/SpaceExplorerSection';
import { usePortfolioNavigation } from './hooks/usePortfolioNavigation';

export default function App() {
  const { activeSection, scrollToSection } = usePortfolioNavigation();
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isSpaceFullscreen, setIsSpaceFullscreen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!isSpaceFullscreen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isSpaceFullscreen]);

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased selection:bg-primary selection:text-on-primary min-h-screen flex flex-col justify-between relative overflow-x-hidden">
      {/* Interactive Dynamic Cursor Glow Spotlight */}
      <div
        ref={spotlightRef}
        id="cursor-spotlight"
        className="hidden md:block fixed top-0 left-0 w-[650px] h-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(128,131,255,0.12)_0%,rgba(47,58,163,0.06)_40%,transparent_70%)] blur-[50px] z-0 pointer-events-none transition-opacity duration-300"
      />

      {/* Subtle Studio Grid Mesh Background Pattern */}
      <div className="fixed inset-0 bg-grid-mesh opacity-60 pointer-events-none z-0" />

      {/* Glassmorphic Header Navigation Bar */}
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      <main className="w-full pt-16 bg-transparent flex-grow relative z-10">
        <div className="flex flex-col w-full">
          <div className="relative w-full overflow-hidden">
            {/* Ambient studio glow orbs */}
            <div
              className="absolute -top-40 left-1/4 w-[650px] h-[650px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse"
              style={{ animationDuration: '9s' }}
            />
            <div className="absolute top-[850px] -right-40 w-[550px] h-[550px] bg-secondary-container/20 rounded-full blur-[160px] pointer-events-none -z-10" />
            <div className="absolute top-[2300px] left-10 w-[580px] h-[580px] bg-primary/8 rounded-full blur-[160px] pointer-events-none -z-10" />

            <HeroSection onNavigate={scrollToSection} />
            <SpaceExplorerSection
              onNavigate={scrollToSection}
              isFullscreen={isSpaceFullscreen}
              onToggleFullscreen={() => setIsSpaceFullscreen((prev) => !prev)}
            />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <EducationJourneySection />
            <ContactSection />
          </div>
        </div>
      </main>

      <Footer onNavigate={scrollToSection} />

      {/* Mobile Bottom Tab Navigation (hidden during fullscreen 3D exploration) */}
      {!isSpaceFullscreen && (
        <MobileBottomNav activeSection={activeSection} onNavigate={scrollToSection} />
      )}
    </div>
  );
}
