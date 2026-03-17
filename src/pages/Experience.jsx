import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    id: 1,
    title: "Image Processing Intern",
    company: "ASELSAN",
    type: "Internship",
    typeColor: "#4ade80",
    period: "Jun 2025 – Jul 2025",
    location: "Ankara, Turkey",
    bullets: [
      "Worked within the Image Processing Team of the Electro-Optical Systems (MEOS) department, contributing to an AI-based automation pipeline for object detection in infrared imagery.",
      "Focused on evaluating and integrating state-of-the-art open-source object detection models (e.g., OWL-V2, Florence-2) into ASELSAN’s in-house GUI software, designed for annotating and verifying IR surveillance footage.",
      "Conducted performance benchmarking and qualitative analysis of pre-trained vision models using custom datasets, measuring detection accuracy, class generalizability, and inference speed.",
      "Implemented prototype-level integrations of selected models into the software stack, enabling near real-time detection capabilities and easing the workload of manual data labeling.",
    ],
    tags: ["Computer Vision", "Object Detection", "OWL-V2", "Florence-2", "IR Imagery", "Benchmarking"],
    icon: "🔬",
    commitMsg: "feat: evaluated and integrated object detection models for IR imagery workflow",
    branch: "internship/aselsan-meos",
  },
  {
    id: 2,
    title: "ERP Consultancy Intern",
    company: "IAS (Industrial Application Software)",
    type: "Internship",
    typeColor: "#22d3ee",
    period: "Apr 2025 – May 2025",
    location: "Izmir, Turkey",
    bullets: [
      "Contributed to ERP implementation and customization processes within the consultancy department of caniasERP.",
      "Received training on PRJ (Project Management), SYS (System Management), and DEV (Development) modules, as well as on the proprietary TROIA development language.",
      "Supported the development of a company vehicle management application by creating database tables, classes, dialogs, and transactions, integrating both backend logic and frontend GUI elements.",
      "Learned practical aspects of ERP consulting, system configuration, and client-oriented customization, bridging technical implementation with business needs.",
    ],
    tags: ["ERP", "caniasERP", "TROIA", "Database", "GUI", "Consultancy"],
    icon: "💼",
    commitMsg: "feat: supported ERP customization and vehicle management app development",
    branch: "internship/ias-caniaserp",
  },
  {
    id: 3,
    title: "Network Systems Intern",
    company: "BNT PRO",
    type: "Internship",
    typeColor: "#818cf8",
    period: "Jul 2024 – Aug 2024",
    location: "Istanbul, Turkey",
    bullets: [
      "Assisted the Network and Security Team with day-to-day operations, including basic system configuration, troubleshooting, and documentation.",
      "Learned about cybersecurity fundamentals by supporting tasks like log monitoring, user access control, and simple vulnerability scans.",
      "Observed and learned from senior engineers during system audits and security assessments, gaining insights into best practices for enterprise infrastructure.",
    ],
    tags: ["Networking", "Cybersecurity", "System Configuration", "Troubleshooting", "Monitoring"],
    icon: "🛡️",
    commitMsg: "chore: supported network operations and cybersecurity workflows",
    branch: "internship/bnt-pro",
  },
];

function TypingText({ text, delay = 0, speed = 40 }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && started && (
        <span className="animate-pulse">█</span>
      )}
    </span>
  );
}

function GlowDot({ active }) {
  return (
    <div className="relative flex items-center justify-center w-5 h-5">
      {active && (
        <div className="absolute w-5 h-5 rounded-full bg-emerald-400 opacity-30 animate-ping" />
      )}
      <div
        className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${active
          ? "bg-emerald-400 border-emerald-300 shadow-[0_0_12px_#4ade80]"
          : "bg-slate-600 border-slate-500"
          }`}
      />
    </div>
  );
}

function ExperienceCard({ exp, index, isActive, onClick }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative cursor-pointer"
      onClick={onClick}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-32px)",
        transition: `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`,
      }}
    >
      <div
        className={`relative rounded-xl border transition-all duration-300 overflow-hidden ${isActive
          ? "border-emerald-500/60 bg-slate-800/90 shadow-[0_0_30px_rgba(74,222,128,0.12)]"
          : "border-slate-700/50 bg-slate-900/60 hover:border-slate-600 hover:bg-slate-800/70"
          }`}
        style={{ backdropFilter: "blur(12px)" }}
      >
        {isActive && (
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-emerald-400 to-transparent" />
        )}

        <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-950/60 border-b border-slate-700/40">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>

          <div className="flex items-center gap-2 ml-2 text-xs font-mono text-slate-400 min-w-0">
            <span className="text-emerald-400 shrink-0">⎇</span>
            <span className="truncate">{exp.branch}</span>
          </div>

          <div className="ml-auto shrink-0">
            <span
              className="text-xs font-mono px-2.5 py-0.5 rounded-full border whitespace-nowrap"
              style={{
                color: exp.typeColor,
                borderColor: exp.typeColor + "55",
                backgroundColor: exp.typeColor + "15",
              }}
            >
              {exp.type}
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3 mb-3">
            <div className="text-2xl mt-0.5 shrink-0">{exp.icon}</div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold text-lg sm:text-xl leading-tight">
                {exp.title}
              </h3>
              <p className="text-slate-300 text-sm font-medium mt-0.5">
                {exp.company}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <span>📅</span>
              {exp.period}
            </span>
            <span className="flex items-center gap-1.5">
              <span>📍</span>
              {exp.location}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4 px-3 py-2 bg-slate-950/50 rounded-lg border border-slate-700/30">
            <span className="text-yellow-400 text-xs font-mono whitespace-nowrap">
              $ git commit -m
            </span>
            <span className="text-emerald-300 text-xs font-mono break-all">
              "{exp.commitMsg}"
            </span>
          </div>

          <ul className="space-y-2.5 mb-5">
            {exp.bullets.map((bullet, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-slate-300 leading-relaxed"
              >
                <span className="text-emerald-400 mt-0.5 shrink-0 font-mono text-xs">
                  ▸
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {exp.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-md font-mono border border-slate-600/50 bg-slate-800/50 text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowTerminal(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @keyframes exp-fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .exp-fade-in { animation: exp-fadeInUp 0.8s ease both; }
        .exp-fade-in-delayed { animation: exp-fadeInUp 0.8s ease 0.35s both; }
      `}</style>

      <div className="relative overflow-x-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-16 sm:pt-24 sm:pb-20">
          <div className="text-center mb-5 exp-fade-in">
            {showTerminal && (
              <div className="inline-flex items-center gap-2 mb-1 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700/50 text-sm font-mono text-emerald-400">
                <span className="text-slate-500 hidden sm:inline">~/portfolio</span>
                <span className="text-slate-600">$</span>
                <TypingText text="git log --My professional work experience --so far" delay={200} speed={35} />
              </div>
            )}
          </div>

          <div className="relative">
            <div className="absolute left-2.5 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/60 via-slate-600/30 to-transparent" />

            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <div key={exp.id} className="relative flex">
                  <div className="relative z-10 flex flex-col items-center shrink-0 w-5 mt-[18px]">
                    <GlowDot active={activeIdx === i} />
                  </div>
                  <div className="flex-1 min-w-0 pl-4">
                    <ExperienceCard
                      exp={exp}
                      index={i}
                      isActive={activeIdx === i}
                      onClick={() => setActiveIdx(i)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center mt-6">
              <div className="w-5 flex justify-center shrink-0">
                <div className="w-2 h-2 rounded-full bg-slate-700 border border-slate-600" />
              </div>
              <span className="text-xs font-mono text-slate-600 ml-4">
                — more commits incoming...
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-10 text-xs font-mono exp-fade-in-delayed">
              {[
                { label: "commits", value: "3", icon: "⬡" },
                { label: "branches", value: "3", icon: "⎇" },
                { label: "technologies", value: "10+", icon: "◈" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-1.5 text-slate-400">
                  <span className="text-emerald-500">{stat.icon}</span>
                  <span className="text-white font-bold">{stat.value}</span>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}