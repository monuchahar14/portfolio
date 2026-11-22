import { SectionId } from '../hooks/usePortfolioNavigation';

export type SpaceThemeId = 'obsidian' | 'solar' | 'void';

export type CelestialId =
  | 'overview'
  | 'helios'
  | 'probe'
  | 'pythia'
  | 'webula'
  | 'algonova'
  | 'glanexus'
  | 'commsbeacon';

export interface CelestialBodySpec {
  id: Exclude<CelestialId, 'overview'>;
  name: string;
  designation: string;
  classification: string;
  orbitRadius: number;
  orbitSpeed: number;
  initialAngle: number;
  radius: number;
  axialTilt: number;
  rotationSpeed: number;
  viewDistance: number;
  primaryColor: string;
  accentColor: string;
  telemetry: {
    orbitalPeriod: string;
    temperature: string;
    composition: string;
  };
  portfolioNode: {
    sectionId: SectionId;
    moduleName: string;
    summary: string;
  };
}

export interface SpaceThemeConfig {
  id: SpaceThemeId;
  label: string;
  backgroundHex: number;
  fogDensity: number;
  starTint: number;
  keyLightColor: number;
  keyLightIntensity: number;
  hemiSkyColor: number;
  hemiGroundColor: number;
  hemiIntensity: number;
  orbitColor: number;
}

export const SPACE_THEMES: Record<SpaceThemeId, SpaceThemeConfig> = {
  obsidian: {
    id: 'obsidian',
    label: 'Obsidian Nebula',
    backgroundHex: 0x09090d,
    fogDensity: 0.0055,
    starTint: 0xc0c1ff,
    keyLightColor: 0xffe4b8,
    keyLightIntensity: 3.4,
    hemiSkyColor: 0x8083ff,
    hemiGroundColor: 0x161626,
    hemiIntensity: 0.95,
    orbitColor: 0x4f52b8,
  },
  solar: {
    id: 'solar',
    label: 'Solar Flare',
    backgroundHex: 0x0d0908,
    fogDensity: 0.005,
    starTint: 0xffd7a8,
    keyLightColor: 0xffc67d,
    keyLightIntensity: 4.1,
    hemiSkyColor: 0xff9b66,
    hemiGroundColor: 0x1c1218,
    hemiIntensity: 0.9,
    orbitColor: 0xb8764f,
  },
  void: {
    id: 'void',
    label: 'Deep Void',
    backgroundHex: 0x040508,
    fogDensity: 0.004,
    starTint: 0xa5b4fc,
    keyLightColor: 0xe6ecff,
    keyLightIntensity: 3.0,
    hemiSkyColor: 0x64748b,
    hemiGroundColor: 0x0a0c12,
    hemiIntensity: 0.7,
    orbitColor: 0x3b4266,
  },
};

export const CELESTIAL_BODIES: CelestialBodySpec[] = [
  {
    id: 'helios',
    name: 'Helios Core',
    designation: 'SOL-MC01',
    classification: 'G-Type Main-Sequence Star',
    orbitRadius: 0,
    orbitSpeed: 0,
    initialAngle: 0,
    radius: 3.4,
    axialTilt: 0.12,
    rotationSpeed: 0.14,
    viewDistance: 12.5,
    primaryColor: '#ffad4d',
    accentColor: '#ffe0a3',
    telemetry: {
      orbitalPeriod: 'Core Anchor',
      temperature: '5,778 K',
      composition: 'Hydrogen-Helium Plasma',
    },
    portfolioNode: {
      sectionId: 'home',
      moduleName: 'Developer Core',
      summary: 'Monu Chahar — Aspiring Software Developer & B.Tech CSE (Hons) Scholar.',
    },
  },
  {
    id: 'pythia',
    name: 'Pythia Prime',
    designation: 'ORB-01',
    classification: 'Terrestrial Ocean World',
    orbitRadius: 8.2,
    orbitSpeed: 0.34,
    initialAngle: 0.7,
    radius: 1.05,
    axialTilt: 0.41,
    rotationSpeed: 0.42,
    viewDistance: 4.5,
    primaryColor: '#6366f1',
    accentColor: '#93c5fd',
    telemetry: {
      orbitalPeriod: '88 Days',
      temperature: '288 K',
      composition: 'Silicate Crust & Indigo Seas',
    },
    portfolioNode: {
      sectionId: 'skills',
      moduleName: 'Python & OOP Stack',
      summary: 'Core mastery in Python 3.12, object-oriented design, and CLI utilities.',
    },
  },
  {
    id: 'probe',
    name: 'Voyager-MC',
    designation: 'EXP-07',
    classification: 'Autonomous Deep-Space Probe',
    orbitRadius: 11.4,
    orbitSpeed: 0.27,
    initialAngle: 2.35,
    radius: 0.9,
    axialTilt: 0.15,
    rotationSpeed: 0.25,
    viewDistance: 4.2,
    primaryColor: '#c0c1ff',
    accentColor: '#facc15',
    telemetry: {
      orbitalPeriod: '132 Days',
      temperature: '195 K (Shielded)',
      composition: 'Titanium Bus & Gold MLI Foil',
    },
    portfolioNode: {
      sectionId: 'about',
      moduleName: 'Engineering Philosophy',
      summary: 'Clean architecture, modular abstractions, and pragmatic problem solving.',
    },
  },
  {
    id: 'webula',
    name: 'Webula',
    designation: 'ORB-02',
    classification: 'Banded Ice Giant',
    orbitRadius: 15.2,
    orbitSpeed: 0.2,
    initialAngle: 4.1,
    radius: 1.38,
    axialTilt: 0.52,
    rotationSpeed: 0.55,
    viewDistance: 5.5,
    primaryColor: '#38bdf8',
    accentColor: '#c0c1ff',
    telemetry: {
      orbitalPeriod: '240 Days',
      temperature: '142 K',
      composition: 'Crystalline Ice & Azimuth Bands',
    },
    portfolioNode: {
      sectionId: 'skills',
      moduleName: 'Frontend & Web UI',
      summary: 'Semantic HTML5, responsive CSS3 Grid/Flexbox, Bootstrap, and ES6+ JS.',
    },
  },
  {
    id: 'algonova',
    name: 'AlgoNova',
    designation: 'ORB-03',
    classification: 'Jovian Gas Giant',
    orbitRadius: 21.8,
    orbitSpeed: 0.13,
    initialAngle: 1.4,
    radius: 1.95,
    axialTilt: 0.18,
    rotationSpeed: 0.65,
    viewDistance: 7.4,
    primaryColor: '#818cf8',
    accentColor: '#f59e0b',
    telemetry: {
      orbitalPeriod: '490 Days',
      temperature: '165 K',
      composition: 'Zonal Storms & Twin Moons',
    },
    portfolioNode: {
      sectionId: 'projects',
      moduleName: 'Featured Repositories',
      summary: 'Electricity Billing, Bank Ledger, Smart Attendance, and Campus Portal.',
    },
  },
  {
    id: 'glanexus',
    name: 'GLA Nexus',
    designation: 'ORB-04',
    classification: 'Ringed Academic Super-Planet',
    orbitRadius: 28.4,
    orbitSpeed: 0.095,
    initialAngle: 5.1,
    radius: 1.65,
    axialTilt: 0.47,
    rotationSpeed: 0.48,
    viewDistance: 7.8,
    primaryColor: '#a78bfa',
    accentColor: '#e0e0ff',
    telemetry: {
      orbitalPeriod: '740 Days',
      temperature: '118 K',
      composition: 'Silicate Rings & Relay Moon',
    },
    portfolioNode: {
      sectionId: 'education',
      moduleName: 'GLA University, Mathura',
      summary: 'B.Tech CSE (Hons) • DSA, OOP, DBMS, Operating Systems & Milestones.',
    },
  },
  {
    id: 'commsbeacon',
    name: 'Comms Beacon',
    designation: 'ORB-05',
    classification: 'Outer Telemetry Dwarf World',
    orbitRadius: 34.5,
    orbitSpeed: 0.068,
    initialAngle: 3.15,
    radius: 0.92,
    axialTilt: 0.3,
    rotationSpeed: 0.35,
    viewDistance: 4.6,
    primaryColor: '#f472b6',
    accentColor: '#c0c1ff',
    telemetry: {
      orbitalPeriod: '1,120 Days',
      temperature: '74 K',
      composition: 'Basalt Craters & Signal Ring',
    },
    portfolioNode: {
      sectionId: 'contact',
      moduleName: 'Signal & Contact',
      summary: 'Direct channel to Monu Chahar for internships and engineering roles.',
    },
  },
];
