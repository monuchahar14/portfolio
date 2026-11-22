import React, { useEffect, useRef, useState } from 'react';
import { PROFILE } from '../data/portfolioData';
import { SectionId } from '../hooks/usePortfolioNavigation';

type TerminalTab = 'developer.py' | 'skills.json' | 'bash';

interface TerminalLine {
  id: number;
  type: 'command' | 'output' | 'accent' | 'error';
  text: string;
}

interface InteractiveTerminalProps {
  onNavigate?: (sectionId: SectionId) => void;
}

const DEVELOPER_PY_RAW = `from typing import List, Dict
# Monu Chahar Developer Profile
class MonuChahar:
    def __init__(self):
        self.name = "Monu Chahar"
        self.role = "Aspiring Software Developer"
        self.degree = "B.Tech CSE (Hons)"
        self.institute = "GLA University, Mathura"
        self.focus = ["Python", "DSA", "Modular Web"]
        self.status = "Available for Internships"

    def execute_mission(self) -> str:
        return "Turning complex logic into scalable code."

dev = MonuChahar()
print(dev.execute_mission())`;

const SKILLS_JSON_RAW = `{
  "developer": "Monu Chahar",
  "university": "GLA University, Mathura",
  "degree": "B.Tech CSE (Hons)",
  "primary_languages": ["Python", "JavaScript"],
  "web_technologies": ["HTML5", "CSS3", "Bootstrap"],
  "core_strengths": [
    "Object-Oriented Architecture",
    "Data Structures & Algorithms",
    "Persistent File Ledgers & Systems"
  ]
}`;

const INITIAL_BASH_HISTORY: TerminalLine[] = [
  { id: 1, type: 'output', text: '# Monu Chahar Developer Interactive Shell — type "help" for commands' },
  { id: 2, type: 'command', text: 'whoami' },
  { id: 3, type: 'accent', text: 'monuchahar (B.Tech CSE (Hons) — GLA University, Mathura)' },
  { id: 4, type: 'command', text: 'uptime' },
  { id: 5, type: 'output', text: 'LeetCode solved: 100+ | GPA: 3.8+ | Status: Ready to build' },
];

export function InteractiveTerminal({ onNavigate }: InteractiveTerminalProps) {
  const [activeTab, setActiveTab] = useState<TerminalTab>('developer.py');
  const [copied, setCopied] = useState(false);
  const [runDrawerOpen, setRunDrawerOpen] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [runOutputLines, setRunOutputLines] = useState<string[]>([]);

  const [bashHistory, setBashHistory] = useState<TerminalLine[]>(INITIAL_BASH_HISTORY);
  const [commandInput, setCommandInput] = useState('');
  const bashEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeTab === 'bash' && bashEndRef.current) {
      bashEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [bashHistory, activeTab]);

  const handleCopy = async () => {
    const contentToCopy =
      activeTab === 'developer.py'
        ? DEVELOPER_PY_RAW
        : activeTab === 'skills.json'
          ? SKILLS_JSON_RAW
          : bashHistory.map((l) => (l.type === 'command' ? `$ ${l.text}` : l.text)).join('\n');

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(contentToCopy);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRun = () => {
    setRunDrawerOpen(true);
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      if (activeTab === 'skills.json') {
        setRunOutputLines([
          '> JSON Schema Validated: 0 syntax errors.',
          '// Primary Stack: Python 3.12, HTML5, CSS3, Bootstrap, JS (ES6+), Git',
        ]);
      } else {
        setRunOutputLines([
          '> "Turning complex logic into scalable code."',
          `// Profile instantiated: ${PROFILE.name} | ${PROFILE.university} ${PROFILE.degree}`,
        ]);
      }
    }, 380);
  };

  const executeBashCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    const lower = cmd.toLowerCase();
    const nextId = Date.now();

    if (lower === 'clear') {
      setBashHistory([]);
      return;
    }

    const appended: TerminalLine[] = [{ id: nextId, type: 'command', text: cmd }];

    if (lower === 'help') {
      appended.push(
        { id: nextId + 1, type: 'accent', text: 'Available commands:' },
        { id: nextId + 2, type: 'output', text: '  whoami     - Developer bio & university status' },
        { id: nextId + 3, type: 'output', text: '  skills     - Technical stack & current focus' },
        { id: nextId + 4, type: 'output', text: '  projects   - List featured Python repositories' },
        { id: nextId + 5, type: 'output', text: '  education  - Academic degree & coursework' },
        { id: nextId + 6, type: 'output', text: '  contact    - Email, LinkedIn & GitHub handles' },
        { id: nextId + 7, type: 'output', text: '  python3    - Execute MonuChahar().execute_mission()' },
        { id: nextId + 8, type: 'output', text: '  clear      - Clear terminal screen' }
      );
    } else if (lower === 'whoami') {
      appended.push(
        { id: nextId + 1, type: 'accent', text: `${PROFILE.name} — ${PROFILE.role}` },
        { id: nextId + 2, type: 'output', text: `${PROFILE.degree} | ${PROFILE.university}` }
      );
    } else if (lower === 'skills') {
      appended.push(
        { id: nextId + 1, type: 'accent', text: 'Core: Python (90%), HTML5 (88%), Bootstrap (85%), CSS3 (82%)' },
        { id: nextId + 2, type: 'output', text: 'Active Lab: JavaScript (ES6+), Git & GitHub, Competitive DSA' }
      );
      onNavigate?.('skills');
    } else if (lower === 'projects') {
      appended.push(
        { id: nextId + 1, type: 'accent', text: '4 Featured Repositories:' },
        { id: nextId + 2, type: 'output', text: '  1. Electricity Bill Management System (electricity_bill_sys.py)' },
        { id: nextId + 3, type: 'output', text: '  2. Bank Account Management System (bank_ledger_system.py)' },
        { id: nextId + 4, type: 'output', text: '  3. Smart Attendance Calculator (attendance_engine.py)' },
        { id: nextId + 5, type: 'output', text: '  4. College Lost & Found System (campus_lost_found.py)' }
      );
      onNavigate?.('projects');
    } else if (lower === 'education') {
      appended.push(
        { id: nextId + 1, type: 'accent', text: `${PROFILE.degreeFull} (${PROFILE.degree})` },
        { id: nextId + 2, type: 'output', text: `${PROFILE.university} | Coursework: DSA, OOP, DBMS, OS` }
      );
      onNavigate?.('education');
    } else if (lower === 'contact') {
      appended.push(
        { id: nextId + 1, type: 'accent', text: `Email: ${PROFILE.email}` },
        { id: nextId + 2, type: 'output', text: `LinkedIn: ${PROFILE.linkedinHandle} | GitHub: ${PROFILE.githubHandle}` }
      );
      onNavigate?.('contact');
    } else if (lower.startsWith('python')) {
      appended.push({
        id: nextId + 1,
        type: 'accent',
        text: 'Turning complex logic into scalable code.',
      });
    } else {
      appended.push({
        id: nextId + 1,
        type: 'error',
        text: `bash: ${cmd}: command not found. Type "help" for available commands.`,
      });
    }

    setBashHistory((prev) => [...prev, ...appended]);
  };

  const handleBashSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeBashCommand(commandInput);
    setCommandInput('');
  };

  const statusLineText =
    activeTab === 'developer.py'
      ? 'Ln 16, Col 34'
      : activeTab === 'skills.json'
        ? 'Ln 12, Col 2'
        : 'Interactive Mode';

  return (
    <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/50 shadow-2xl overflow-hidden relative group">
      {/* Top Window Header Bar */}
      <div className="flex items-center justify-between px-space-md py-3 bg-surface-container-high border-b border-outline-variant/30">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-error inline-block hover:opacity-80 transition-opacity"></span>
          <span className="w-3 h-3 rounded-full bg-secondary inline-block hover:opacity-80 transition-opacity"></span>
          <span className="w-3 h-3 rounded-full bg-primary inline-block hover:opacity-80 transition-opacity"></span>
        </div>
        <div className="flex items-center gap-space-xs font-label-code text-label-code text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px] text-primary">terminal</span>
          <span className="truncate max-w-[140px] sm:max-w-none">{activeTab} — bash</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className={`px-2.5 py-1 rounded bg-surface-container hover:bg-surface-bright font-label-badge text-label-badge flex items-center gap-1 transition-all cursor-pointer ${
              copied ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
            }`}
            title="Copy snippet to clipboard"
          >
            <span className="material-symbols-outlined text-[13px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          <button
            type="button"
            onClick={handleRun}
            className="px-2.5 py-1 rounded bg-primary text-on-primary font-label-badge text-label-badge font-semibold flex items-center gap-1 hover:bg-primary-fixed-dim active:scale-95 transition-all shadow-sm cursor-pointer"
            title="Execute script simulation"
          >
            <span className="material-symbols-outlined text-[14px]">play_arrow</span>
            <span>Run</span>
          </button>
        </div>
      </div>

      {/* Interactive Terminal File Tabs */}
      <div className="flex items-center bg-surface-container px-space-sm pt-2 gap-1 font-label-code text-label-code border-b border-outline-variant/30 select-none overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab('developer.py')}
          className={`px-space-md py-1.5 rounded-t-lg flex items-center gap-space-xs border-t-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'developer.py'
              ? 'bg-surface-container-lowest text-primary font-semibold border-primary'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50 border-transparent'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">code</span>
          <span>developer.py</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('skills.json')}
          className={`px-space-md py-1.5 rounded-t-lg flex items-center gap-space-xs border-t-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'skills.json'
              ? 'bg-surface-container-lowest text-primary font-semibold border-primary'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50 border-transparent'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">data_object</span>
          <span>skills.json</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('bash');
            setTimeout(() => inputRef.current?.focus(), 60);
          }}
          className={`px-space-md py-1.5 rounded-t-lg flex items-center gap-space-xs border-t-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'bash'
              ? 'bg-surface-container-lowest text-primary font-semibold border-primary'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50 border-transparent'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">terminal</span>
          <span>terminal</span>
        </button>
      </div>

      {/* Code Editor Body Area */}
      <div className="p-space-md sm:p-space-lg font-label-code text-label-code leading-relaxed overflow-x-auto text-on-surface-variant bg-surface-container-lowest/95 min-h-[340px] max-h-[360px] overflow-y-auto">
        {activeTab === 'developer.py' && (
          <div className="flex gap-space-md">
            <div className="select-none text-outline/60 text-right space-y-1">
              {Array.from({ length: 16 }, (_, idx) => (
                <div key={idx}>{String(idx + 1).padStart(2, '0')}</div>
              ))}
            </div>
            <div className="space-y-1 text-on-surface whitespace-nowrap">
              <div>
                <span className="text-tertiary">from</span> typing{' '}
                <span className="text-tertiary">import</span> List, Dict
              </div>
              <div className="text-outline"># Monu Chahar Developer Profile</div>
              <div>
                <span className="text-primary font-semibold">class</span>{' '}
                <span className="text-secondary font-semibold">MonuChahar</span>:
              </div>
              <div className="pl-4">
                <span className="text-tertiary">def</span>{' '}
                <span className="text-secondary font-semibold">__init__</span>(self):
              </div>
              <div className="pl-8">
                self.name = <span className="text-primary-fixed-dim">"Monu Chahar"</span>
              </div>
              <div className="pl-8">
                self.role ={' '}
                <span className="text-primary-fixed-dim">"Aspiring Software Developer"</span>
              </div>
              <div className="pl-8">
                self.degree = <span className="text-primary-fixed-dim">"B.Tech CSE (Hons)"</span>
              </div>
              <div className="pl-8">
                self.institute ={' '}
                <span className="text-primary-fixed-dim">"GLA University, Mathura"</span>
              </div>
              <div className="pl-8">
                self.focus = [<span className="text-primary-fixed-dim">"Python"</span>,{' '}
                <span className="text-primary-fixed-dim">"DSA"</span>,{' '}
                <span className="text-primary-fixed-dim">"Modular Web"</span>]
              </div>
              <div className="pl-8">
                self.status ={' '}
                <span className="text-primary-fixed-dim">"Available for Internships"</span>
              </div>
              <div className="h-4" />
              <div className="pl-4">
                <span className="text-tertiary">def</span>{' '}
                <span className="text-secondary font-semibold">execute_mission</span>(self) -&gt;{' '}
                <span className="text-tertiary">str</span>:
              </div>
              <div className="pl-8">
                <span className="text-tertiary">return</span>{' '}
                <span className="text-primary-fixed-dim">
                  "Turning complex logic into scalable code."
                </span>
              </div>
              <div className="h-4" />
              <div>
                dev = <span className="text-secondary font-semibold">MonuChahar</span>()
              </div>
              <div>
                <span className="text-tertiary">print</span>(dev.
                <span className="text-secondary">execute_mission</span>())
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills.json' && (
          <div className="flex gap-space-md">
            <div className="select-none text-outline/60 text-right space-y-1">
              {Array.from({ length: 12 }, (_, idx) => (
                <div key={idx}>{String(idx + 1).padStart(2, '0')}</div>
              ))}
            </div>
            <div className="space-y-1 text-on-surface whitespace-nowrap">
              <div>{'{'}</div>
              <div className="pl-4">
                <span className="text-secondary">"developer"</span>:{' '}
                <span className="text-primary-fixed-dim">"Monu Chahar"</span>,
              </div>
              <div className="pl-4">
                <span className="text-secondary">"university"</span>:{' '}
                <span className="text-primary-fixed-dim">"GLA University, Mathura"</span>,
              </div>
              <div className="pl-4">
                <span className="text-secondary">"degree"</span>:{' '}
                <span className="text-primary-fixed-dim">"B.Tech CSE (Hons)"</span>,
              </div>
              <div className="pl-4">
                <span className="text-secondary">"primary_languages"</span>: [
                <span className="text-primary-fixed-dim">"Python"</span>,{' '}
                <span className="text-primary-fixed-dim">"JavaScript"</span>],
              </div>
              <div className="pl-4">
                <span className="text-secondary">"web_technologies"</span>: [
                <span className="text-primary-fixed-dim">"HTML5"</span>,{' '}
                <span className="text-primary-fixed-dim">"CSS3"</span>,{' '}
                <span className="text-primary-fixed-dim">"Bootstrap"</span>],
              </div>
              <div className="pl-4">
                <span className="text-secondary">"core_strengths"</span>: [
              </div>
              <div className="pl-8">
                <span className="text-primary-fixed-dim">"Object-Oriented Architecture"</span>,
              </div>
              <div className="pl-8">
                <span className="text-primary-fixed-dim">"Data Structures &amp; Algorithms"</span>,
              </div>
              <div className="pl-8">
                <span className="text-primary-fixed-dim">"Persistent File Ledgers &amp; Systems"</span>
              </div>
              <div className="pl-4">]</div>
              <div>{'}'}</div>
            </div>
          </div>
        )}

        {activeTab === 'bash' && (
          <div
            className="flex flex-col justify-between min-h-[285px] space-y-2 text-on-surface cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="space-y-1.5">
              {/* Quick Command Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-outline-variant/25">
                <span className="text-[11px] text-outline mr-1">Try:</span>
                {['help', 'whoami', 'skills', 'projects', 'education', 'contact', 'clear'].map((cmd) => (
                  <button
                    key={cmd}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      executeBashCommand(cmd);
                    }}
                    className="px-2 py-0.5 rounded bg-surface-container-high hover:bg-primary hover:text-on-primary text-primary text-[11px] transition-colors cursor-pointer"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              {bashHistory.map((line) => {
                if (line.type === 'command') {
                  return (
                    <p key={line.id}>
                      <span className="text-primary font-bold">visitor@portfolio:~$</span> {line.text}
                    </p>
                  );
                }
                if (line.type === 'accent') {
                  return (
                    <p key={line.id} className="text-secondary pl-3">
                      {line.text}
                    </p>
                  );
                }
                if (line.type === 'error') {
                  return (
                    <p key={line.id} className="text-error pl-3">
                      {line.text}
                    </p>
                  );
                }
                return (
                  <p key={line.id} className="text-on-surface-variant pl-3">
                    {line.text}
                  </p>
                );
              })}
              <div ref={bashEndRef} />
            </div>

            <form onSubmit={handleBashSubmit} className="flex items-center gap-1.5 pt-1">
              <span className="text-primary font-bold shrink-0">visitor@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                placeholder="type a command (e.g. help)..."
                aria-label="Interactive portfolio terminal input"
                className="w-full bg-transparent text-on-surface placeholder:text-outline/60 focus:outline-none font-label-code text-label-code"
              />
            </form>
          </div>
        )}
      </div>

      {/* Live Run Console Output Drawer (Toggleable via "Run" button) */}
      {runDrawerOpen && (
        <div className="border-t border-outline-variant/30 bg-surface-container-high/90 px-space-lg py-space-sm font-label-code text-label-code text-on-surface transition-all animate-card-enter">
          <div className="flex items-center justify-between pb-1 text-outline">
            <span className="text-xs uppercase tracking-wider font-semibold text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              Process Output: Exit Code 0
            </span>
            <button
              type="button"
              onClick={() => setRunDrawerOpen(false)}
              className="text-outline hover:text-on-surface text-xs cursor-pointer"
            >
              Dismiss
            </button>
          </div>
          <div className="text-primary-fixed-dim pl-2 border-l-2 border-primary mt-1 space-y-0.5">
            {isExecuting ? (
              <span className="animate-pulse">Executing script...</span>
            ) : (
              runOutputLines.map((line, i) => (
                <div
                  key={i}
                  className={i === 0 ? 'font-semibold text-primary' : 'text-xs text-outline'}
                >
                  {line}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Terminal Status Bar */}
      <div className="flex items-center justify-between px-space-md py-2 bg-surface-container-high border-t border-outline-variant/30 font-label-badge text-label-badge text-on-surface-variant">
        <div className="flex items-center gap-space-md">
          <span className="flex items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-[14px]">check_circle</span> UTF-8
          </span>
          <span>Python 3.12.2</span>
        </div>
        <div className="flex items-center gap-space-sm">
          <span>{statusLineText}</span>
          <span className="text-primary font-bold">Spaces: 4</span>
        </div>
      </div>
    </div>
  );
}
