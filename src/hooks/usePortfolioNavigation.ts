import { useCallback, useEffect, useState } from 'react';

export type SectionId = 'home' | 'space-explorer' | 'about' | 'skills' | 'projects' | 'education' | 'journey' | 'contact';

const TRACKED_SECTIONS: SectionId[] = ['home', 'space-explorer', 'about', 'skills', 'projects', 'education', 'journey', 'contact'];

export function usePortfolioNavigation() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  const scrollToSection = useCallback((sectionId: SectionId) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const headerOffset = 76;
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = Math.max(0, elementPosition - headerOffset);

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });

    setActiveSection(sectionId);
  }, []);

  useEffect(() => {
    const updateActiveNav = () => {
      const scrollPos = window.scrollY + 140;

      // Check bottom of page -> activate contact
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection('contact');
        return;
      }

      let current: SectionId = 'home';
      for (const id of TRACKED_SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height + 60) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    updateActiveNav();
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveNav);
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (revealElements.length === 0) return;

    if (typeof IntersectionObserver === 'undefined') {
      revealElements.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );

    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) {
        el.classList.add('is-revealed');
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return { activeSection, scrollToSection };
}
