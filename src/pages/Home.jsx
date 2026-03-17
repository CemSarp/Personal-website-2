import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

/* -------------------------------------------------------------------------- */
/*                                Static content                              */
/* -------------------------------------------------------------------------- */

const PROFILE_CODE = `const profile = {
  name: 'Cem Sarp Takım',
  university: 'Sabancı University',
  major: 'Computer Science',
  minor: 'Business Analytics',
  gpa: 3.5,
  skills: [
    'Python', 'C++', 'MySQL', 
    'MongoDB', 'Git', 'Linux'
  ],
  interests: [
    'Web Development', 'Data Analytics', 'Applied AI' 
  ],
  hardWorker: true,
  quickLearner: true,
  hireable: function() {
    return (
      this.hardWorker &&
      this.quickLearner &&
      this.skills.length >= 5
    );
  }
};`;

const ROTATING_WORDS = [
  "Computer Science Student",
  "Software Developer",
  "Data Analytics & AI Enthusiast",
];

/* -------------------------------------------------------------------------- */
/*                         Lightweight syntax highlighting                     */
/* -------------------------------------------------------------------------- */

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlightCode(source) {
  const tokenRegex =
    /(\/\/[^\n]*|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b(?:const|let|var|function|return|true|false|this|new|if)\b|\b\d+\b)/g;

  const html = source
    .split(tokenRegex)
    .map((part) => {
      if (!part) return "";

      // comment
      if (/^\/\/[^\n]*$/.test(part)) {
        return `<span style="color:#546e7a;font-style:italic;">${escapeHtml(part)}</span>`;
      }

      // string
      if (/^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)$/.test(part)) {
        return `<span style="color:#c3e88d;">${escapeHtml(part)}</span>`;
      }

      // keyword
      if (/^(const|let|var|function|return|true|false|this|new|if)$/.test(part)) {
        return `<span style="color:#c792ea;">${escapeHtml(part)}</span>`;
      }

      // number
      if (/^\d+$/.test(part)) {
        return `<span style="color:#f78c6c;">${escapeHtml(part)}</span>`;
      }

      return escapeHtml(part);
    })
    .join("");

  return `
    <pre style="
      margin:0;
      padding:1.5rem 1.75rem;
      background:transparent;
      font-size:0.9rem;
      line-height:1.8;
      overflow-x:auto;
      overflow-y:auto;
      max-height:600px;
      white-space:pre;
      color:#d6deeb;
      font-family:'Fira Code','Cascadia Code',Consolas,monospace;
    ">${html}</pre>
  `;
}

/* -------------------------------------------------------------------------- */


function Meteors({ number = 8 }) {
  const [meteorStyles, setMeteorStyles] = useState([]);

  useEffect(() => {
    const styles = Array.from({ length: number }, () => ({
      top: `${Math.floor(Math.random() * 300)}px`,
      left: `${Math.floor(Math.random() * window.innerWidth)}px`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${Math.random() * 3 + 2}s`,
    }));

    setMeteorStyles(styles);
  }, [number]);

  return (
    <>
      {meteorStyles.map((style, index) => (
        <span
          key={index}
          className="pointer-events-none absolute size-0.5 rotate-[215deg] animate-meteor rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"
          style={style}
        >
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
        </span>
      ))}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Interactive pieces                            */
/* -------------------------------------------------------------------------- */

function FlipWords({ words, className = "" }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timeoutId;

    const intervalId = setInterval(() => {
      setVisible(false);

      timeoutId = setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setVisible(true);
      }, 400);
    }, 3000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [words.length]);

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        transition: "opacity 0.4s, transform 0.4s",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-8px)",
      }}
    >
      {words[index]}
    </span>
  );
}

function HeroActions() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Link
        to="/about"
        className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 p-0.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_2rem_-0.5rem_#34d399]"
      >
        <span className="block w-full px-7 py-3 rounded-[11px] bg-[#020617] transition-all duration-300 group-hover:bg-transparent">
          <span className="flex items-center justify-center gap-2 text-white font-semibold">
            Learn More
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </span>
      </Link>

      <a
        href="/Cem-Sarp-Takim-CV.pdf"
        target="_blank"
        rel="noreferrer"
        className="group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gray-800/60 border border-gray-700/50 text-gray-300 font-semibold transition-all duration-300 hover:scale-105 hover:text-white hover:border-gray-500"
      >
        View Resume
        <svg
          className="w-4 h-4 transition-transform group-hover:rotate-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </a>
    </div>
  );
}

function CodeWindow({ highlightedHtml }) {
  return (
    <div className="w-full lg:w-1/2">
      <div className="gradient-border-box">
        <div className="hero-code-window bg-[#07152b] rounded-[14px] overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 px-5 py-4 bg-[#0c2740] border-b border-white/5">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500" />
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-400" />
            <div className="w-3.5 h-3.5 rounded-full bg-green-500" />
            <span className="ml-5 text-[15px] font-semibold text-slate-400">
              developer.js
            </span>
          </div>

          <div
            className="min-h-[520px]"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Page                                     */
/* -------------------------------------------------------------------------- */

export default function Home() {
  const highlightedProfileCode = useMemo(() => highlightCode(PROFILE_CODE), []);

  return (
    <main className="bg-[#020617] text-white min-h-screen">
      <style>{`
        @keyframes meteor {
          0% {
            transform: rotate(215deg) translateX(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(215deg) translateX(-600px);
            opacity: 0;
          }
        }

        .animate-meteor {
          animation-name: meteor;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes gridPulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }

        .animate-gridPulse {
          animation: gridPulse 4s ease-in-out infinite;
        }

        .gradient-text {
          background: linear-gradient(90deg, #34d399, #06b6d4);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .gradient-border-box {
          padding: 2px;
          border-radius: 1rem;
          background: linear-gradient(135deg, #34d399, #06b6d4, #6366f1);
        }
      `}</style>

      <section className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8 py-10 pt-28 md:pt-32">

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Meteors number={10} />
        </div>

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10 max-w-6xl">
          <div className="w-full lg:w-1/2 space-y-6">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-400 text-2xl sm:text-3xl font-medium block mb-1">
                  Hello, I'm
                </span>
                <span className="gradient-text">Cem Sarp Takım</span>
              </h1>
            </div>

            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
              <FlipWords
                words={ROTATING_WORDS}
                className="text-base sm:text-lg text-cyan-300 font-medium"
              />
            </div>

            <p className="text-gray-300/90 text-base sm:text-lg leading-relaxed max-w-xl">
              Senior Computer Science student at Sabancı University.
              Passionate about building digital products that blend solid
              engineering with thoughtful design.
            </p>

            <HeroActions />
          </div>

          <CodeWindow highlightedHtml={highlightedProfileCode} />
        </div>
      </section>
    </main>
  );
}