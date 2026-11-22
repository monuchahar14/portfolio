export type SkillCategory = 'all' | 'languages' | 'web' | 'tools';
export type ProjectCategory = 'all' | 'python-systems' | 'academic-apps';

export interface SkillItem {
  id: string;
  name: string;
  subtitle: string;
  percentage: number;
  description: string;
  tags: string[];
  icon: string;
  category: Exclude<SkillCategory, 'all'>;
  inProgress?: boolean;
  mobileBadge: string;
}

export interface ProjectItem {
  id: string;
  filename: string;
  badge: string;
  category: Exclude<ProjectCategory, 'all'>;
  icon: string;
  tagline: string;
  title: string;
  description: string;
  highlights: string[];
  tags: string[];
  repoSlug: string;
  githubUrl: string;
  sampleCode: string;
  sampleOutput: string[];
}

export interface TimelineStage {
  stageNumber: string;
  stageLabel: string;
  stageTag: string;
  title: string;
  description: string;
  icon: string;
  isCurrent?: boolean;
  focusPill?: string;
}

export const PROFILE = {
  name: 'Monu Chahar',
  role: 'Aspiring Software Developer',
  heroSubtitle: 'Aspiring Software Developer & CSE Undergraduate.',
  degree: 'B.Tech CSE (Hons)',
  degreeFull: 'B.Tech in Computer Science & Engineering',
  university: 'GLA University, Mathura',
  location: 'Agra / Mathura, Uttar Pradesh, India',
  locationShort: 'India • GLA University, Mathura',
  email: 'monu.chahar_cs.h26@gla.ac.in',
  githubUrl: 'https://github.com/monuchahar',
  githubHandle: '@monuchahar',
  linkedinUrl: 'https://www.linkedin.com/in/monu-chahar-b5a71b451',
  linkedinHandle: 'in/monu-chahar-b5a71b451',
  quote: '“Building ideas into reality, one line of code at a time.”',
  bio: 'Passionate about crafting modular backend logic, scalable system components, and intuitive user experiences with modern software paradigms and principled algorithms.',
};

export const HERO_METRICS = [
  {
    codeLabel: 'LEETCODE / DSA',
    value: '100+',
    label: 'Problems Solved',
  },
  {
    codeLabel: 'ACADEMIC DEGREE',
    value: 'B.Tech',
    label: 'CSE (Hons) Scholar',
  },
  {
    codeLabel: 'MERIT RATING',
    value: '3.8+',
    label: 'GPA Standard',
  },
];

export const ABOUT_STRENGTHS = [
  {
    icon: 'terminal',
    title: 'Python Architecture & OOP',
    description:
      'Strong fluency in object-oriented encapsulation, inheritance, file I/O operations, error mitigation, and script automation.',
  },
  {
    icon: 'web',
    title: 'Modern Web Interfaces',
    description:
      'Expertise in crafting responsive, accessible HTML5 document outlines, CSS Flexbox/Grid architectures, and modern UI systems.',
  },
  {
    icon: 'account_tree',
    title: 'Algorithmic Thinking & DSA',
    description:
      'Active problem solver practicing asymptotic complexity optimization, array manipulation, tree traversal, and dynamic problem breakdowns.',
  },
  {
    icon: 'verified',
    title: 'Pragmatic Clean Code',
    description:
      'Dedicated to descriptive naming conventions, single-responsibility functions, structured modularization, and Git commit discipline.',
  },
];

export const SKILLS: SkillItem[] = [
  {
    id: 'python',
    name: 'Python',
    subtitle: 'v3.12 Core Language',
    percentage: 90,
    description:
      'Extensive proficiency in OOP paradigms, modular programming, standard libraries, CLI utilities, and logic architecture.',
    tags: ['OOP', 'File Handling', 'CLI Tooling', 'Automation'],
    icon: 'terminal',
    category: 'languages',
    mobileBadge: 'Core Language',
  },
  {
    id: 'html5',
    name: 'HTML5',
    subtitle: 'Modern Web Arch',
    percentage: 88,
    description:
      'Semantic structuring, document accessibility standards, web forms validation, and modular component layout blueprints.',
    tags: ['Semantic Tags', 'a11y ARIA', 'SEO Standards'],
    icon: 'html',
    category: 'web',
    mobileBadge: 'Frontend',
  },
  {
    id: 'css3',
    name: 'CSS3',
    subtitle: 'Responsive Styling',
    percentage: 82,
    description:
      'Modern responsive layouts, Flexbox/Grid systems, media query constraints, CSS custom variables, and micro-transitions.',
    tags: ['Flexbox/Grid', 'Custom Props', 'Keyframes'],
    icon: 'css',
    category: 'web',
    mobileBadge: 'Styling',
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    subtitle: 'UI Component System',
    percentage: 85,
    description:
      'Rapid desktop & mobile prototyping with 12-column responsive grids, custom utility overwrites, and interactive modals.',
    tags: ['12-Col Grid', 'Prototyping', 'Modal Shells'],
    icon: 'dashboard',
    category: 'web',
    mobileBadge: 'Framework',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    subtitle: 'In Progress / Learning',
    percentage: 60,
    description:
      'Core ES6+ syntax, asynchronous event-driven flows, DOM manipulation, array higher-order methods, and client API data binding.',
    tags: ['ES6+', 'DOM Events', 'Fetch API'],
    icon: 'javascript',
    category: 'languages',
    inProgress: true,
    mobileBadge: 'In Progress',
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    subtitle: 'In Progress / Learning',
    percentage: 65,
    description:
      'Distributed version control, remote tracking, branch isolation, merge workflows, and structured commit documentation.',
    tags: ['Branching', 'Commits', 'PR Hygiene'],
    icon: 'source',
    category: 'tools',
    inProgress: true,
    mobileBadge: 'In Progress',
  },
];

export const ACADEMIC_FOCUS_AREAS = [
  { icon: 'account_tree', label: 'Data Structures & Algorithms' },
  { icon: 'layers', label: 'OOP Foundations' },
  { icon: 'memory', label: 'System Design Basics' },
  { icon: 'terminal', label: 'Terminal Tooling' },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'electricity-bill',
    filename: 'electricity_bill_sys.py',
    badge: 'CLI ENGINE',
    category: 'python-systems',
    icon: 'bolt',
    tagline: 'Python • File Persistence',
    title: 'Electricity Bill Management System',
    description:
      'A modular console-driven billing system featuring tiered tariff consumption formulas, automated late-surcharge computations, and persistent file-based record storage for tracking individual consumer utility metrics across billing cycles.',
    highlights: [
      'Automated multi-slab tariff calculation algorithm',
      'Structured file I/O for historical customer billing logs',
      'Class-based customer state & invoice generation',
    ],
    tags: ['Python', 'OOP', 'File Handling', 'Data Persistence'],
    repoSlug: 'monuchahar/electricity-bill-system',
    githubUrl: 'https://github.com/monuchahar',
    sampleCode: `class ElectricityBillCalculator:
    SLABS = [(100, 3.50), (200, 5.25), (float('inf'), 7.10)]

    def __init__(self, consumer_id: str, units: int):
        self.consumer_id = consumer_id
        self.units = max(0, units)

    def compute_charge(self, late_days: int = 0) -> dict:
        remaining, total = self.units, 0.0
        prev_limit = 0
        for limit, rate in self.SLABS:
            slab_units = min(remaining, limit - prev_limit)
            total += slab_units * rate
            remaining -= slab_units
            prev_limit = limit
            if remaining <= 0:
                break
        surcharge = round(total * 0.05, 2) if late_days > 15 else 0.0
        return {"base": round(total, 2), "surcharge": surcharge, "net": round(total + surcharge, 2)}`,
    sampleOutput: [
      '[INFO] Loading consumer registry: records/consumers.dat (48 records)',
      'Consumer ID : GLA-UTL-2041 | Meter Units: 245 kWh',
      'Slab 1 (0-100 @ ₹3.50)   : ₹350.00',
      'Slab 2 (101-245 @ ₹5.25) : ₹761.25',
      'Late Surcharge (0 days)  : ₹0.00',
      '-----------------------------------------',
      'NET PAYABLE AMOUNT       : ₹1111.25 [SAVED TO LEDGER]',
    ],
  },
  {
    id: 'bank-account',
    filename: 'bank_ledger_system.py',
    badge: 'SECURITY CORE',
    category: 'python-systems',
    icon: 'account_balance',
    tagline: 'Python • Ledger Logic',
    title: 'Bank Account Management System',
    description:
      'Console-based banking core implementing robust user authentication via PIN hashing, atomic transaction mechanisms (deposits, validated withdrawals, account transfers), and chronological balance statement generation.',
    highlights: [
      'Strict validation logic & overdraft prevention algorithms',
      'Interactive terminal menus with state integrity handling',
      'Atomic transaction logs with timestamp audits',
    ],
    tags: ['Python', 'Data Security', 'OOP Architecture', 'CLI Design'],
    repoSlug: 'monuchahar/bank-account-system',
    githubUrl: 'https://github.com/monuchahar',
    sampleCode: `import hashlib
from datetime import datetime

class BankAccount:
    def __init__(self, acct_no: str, pin: str, balance: float = 0.0):
        self.acct_no = acct_no
        self._pin_hash = hashlib.sha256(pin.encode()).hexdigest()
        self.balance = balance
        self.ledger = []

    def verify_pin(self, pin: str) -> bool:
        return hashlib.sha256(pin.encode()).hexdigest() == self._pin_hash

    def withdraw(self, amount: float, pin: str) -> str:
        if not self.verify_pin(pin):
            raise PermissionError("Invalid PIN verification.")
        if amount <= 0 or amount > self.balance:
            raise ValueError("Insufficient funds or invalid debit amount.")
        self.balance -= amount
        self.ledger.append((datetime.now().isoformat(), "DEBIT", amount, self.balance))
        return f"Debited ₹{amount:.2f}. Remaining Balance: ₹{self.balance:.2f}"`,
    sampleOutput: [
      '[AUTH] SHA-256 PIN verification passed for Account #AC-88412',
      '[TXN]  +₹5000.00 CREDIT | Ref: DEP-9012 | Bal: ₹14500.00',
      '[TXN]  -₹1250.00 DEBIT  | Ref: WDR-9013 | Bal: ₹13250.00',
      '[AUDIT] Overdraft guard active. Ledger checksum verified.',
      'Statement exported -> exports/statement_AC88412.log',
    ],
  },
  {
    id: 'smart-attendance',
    filename: 'attendance_engine.py',
    badge: 'MATH ENGINE',
    category: 'academic-apps',
    icon: 'calculate',
    tagline: 'Python • Academic Utility',
    title: 'Smart Attendance Calculator',
    description:
      'An algorithm-driven academic helper designed for college students to track course-by-course attendance against mandatory thresholds (75%). Features a predictive model calculating allowable future absences or recovery classes required.',
    highlights: [
      'Predictive cutoff simulation for 75% University regulations',
      'Short attendance alerting & recovery schedule projections',
      'Modular multi-course subject dictionaries & summary logs',
    ],
    tags: ['Python', 'Algorithms', 'Student Utility', 'Analytics'],
    repoSlug: 'monuchahar/attendance-calculator',
    githubUrl: 'https://github.com/monuchahar',
    sampleCode: `import math

def analyze_attendance(attended: int, total: int, target_pct: float = 75.0) -> dict:
    current = (attended / total) * 100 if total else 100.0
    ratio = target_pct / 100.0

    if current >= target_pct:
        safe_skips = math.floor((attended - ratio * total) / ratio)
        return {"pct": round(current, 2), "status": "SAFE", "skips_allowed": safe_skips}
    needed = math.ceil((ratio * total - attended) / (1 - ratio))
    return {"pct": round(current, 2), "status": "SHORTAGE", "classes_needed": needed}`,
    sampleOutput: [
      '[COURSE: BCSC-201 Data Structures]  Attended: 34/42 -> 80.95% [SAFE] (Can miss 3 lectures)',
      '[COURSE: BCSC-204 Operating Sys]    Attended: 22/32 -> 68.75% [WARN] (Attend next 8 consecutive)',
      '[COURSE: BCSE-210 Python Lab]       Attended: 18/20 -> 90.00% [SAFE] (Can miss 4 lectures)',
      '-------------------------------------------------------------------------------',
      'Aggregate Semester Attendance: 78.72% | Threshold Target: 75.00% [ON TRACK]',
    ],
  },
  {
    id: 'lost-and-found',
    filename: 'campus_lost_found.py',
    badge: 'PORTAL CORE',
    category: 'academic-apps',
    icon: 'manage_search',
    tagline: 'Python • Information Retrieval',
    title: 'College Lost & Found System',
    description:
      'A centralized campus portal logic system allowing students to report lost personal articles, claim verified found items, and conduct filtered attribute searches across categorized campus registries.',
    highlights: [
      'Filtered query indexes by date, campus zone, and category',
      'Status lifecycle tracking (Reported, Under Claim, Verified)',
      'Structured memory and local persistent schema representation',
    ],
    tags: ['Python', 'Data Records', 'Search Indexing', 'Campus System'],
    repoSlug: 'monuchahar/lost-and-found-portal',
    githubUrl: 'https://github.com/monuchahar',
    sampleCode: `from dataclasses import dataclass

@dataclass
class CampusItem:
    item_id: str
    title: str
    category: str
    zone: str
    status: str = "REPORTED"

class LostFoundRegistry:
    def __init__(self, items: list[CampusItem]):
        self.items = items

    def search(self, query: str = "", category: str | None = None) -> list[CampusItem]:
        q = query.lower().strip()
        return [
            item for item in self.items
            if (not category or item.category == category)
            and (q in item.title.lower() or q in item.zone.lower())
        ]`,
    sampleOutput: [
      '[INDEX] Searching campus_registry.json (126 logged items)...',
      'Match #LF-109 | "GLA Student ID Card" | Zone: Academic Block AB-1 | Status: VERIFIED_FOUND',
      'Match #LF-114 | "Matte Black Calculator" | Zone: Central Library   | Status: UNDER_CLAIM',
      '2 matching records returned in 0.002s.',
    ],
  },
];

export const EDUCATION_COURSEWORK = [
  'Data Structures & Algorithms',
  'Object-Oriented Programming (OOP)',
  'Database Management Systems (DBMS)',
  'Operating Systems Concepts',
  'Discrete Mathematics',
];

export const TIMELINE_STAGES: TimelineStage[] = [
  {
    stageNumber: '01',
    stageLabel: 'STAGE 01 • FOUNDATION',
    stageTag: 'ACADEMIC DAWN',
    title: 'Foundations in Programming & Logic',
    description:
      'Began with computational fundamentals, algorithmic thinking, condition control structures, memory representations, and fundamental problem-solving methodologies at GLA University.',
    icon: 'terminal',
  },
  {
    stageNumber: '02',
    stageLabel: 'STAGE 02 • CORE MASTERY',
    stageTag: 'SYSTEM FOCUS',
    title: 'Deep Dive into Python & OOP',
    description:
      'Engineered command-line applications, explored classes, inheritance hierarchies, standard file systems, and developed real-world student utilities like the Electricity Bill and Bank Account Management systems.',
    icon: 'data_object',
  },
  {
    stageNumber: '03',
    stageLabel: 'STAGE 03 • CLIENT LAYER',
    stageTag: 'FRONTEND DESIGN',
    title: 'Web Technologies & Responsive UI',
    description:
      'Expanded into web development architectures, crafting clean semantic HTML5 structures, responsive layout designs with modern CSS3 Flexbox/Grid, and modular Bootstrap frameworks.',
    icon: 'devices',
  },
  {
    stageNumber: '04',
    stageLabel: 'STAGE 04 • ACTIVE FRONTIER',
    stageTag: 'CURRENT ROADMAP',
    title: 'JavaScript, Version Control & Competitive DSA',
    description:
      'Actively mastering asynchronous modern JavaScript, establishing clean collaborative Git/GitHub commit workflows, and solving LeetCode problems daily to sharpen algorithmic efficiency.',
    icon: 'bolt',
    isCurrent: true,
    focusPill: 'Daily LeetCode & Fullstack Engineering',
  },
];
