import TiltCard from '../components/effects/TiltCard.jsx'
import profile from '../assets/profile2.jpeg'

const paragraphs = [
  "I'm <strong>Cem Sarp Takım</strong>, a Computer Science student at Sabancı University with a minor in Business Analytics. My work sits at the intersection of software engineering, data analysis, and intelligent systems, where I enjoy building applications that combine solid engineering with thoughtful design.",

  "Through my studies and internships, I've gained experience working with technologies such as Python, C++, React, and database systems. I'm particularly interested in developing data-driven applications and exploring how modern software systems can incorporate machine learning and AI capabilities.",

  "Alongside my technical development, I value contributing to the community. Through Sabancı University's Civil Involvement Project, I had the opportunity to mentor primary school students, focusing on creativity, communication, and awareness of children's rights.",

  "Looking ahead, I aim to deepen my knowledge in artificial intelligence and applied machine learning by pursuing a master's degree in the United Kingdom. My long-term goal is to build intelligent, human-centered software systems that create real-world impact."
]

const DEV = (name) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`

const skillGroups = [
  {
    label: 'Technical',
    items: [
      { name: 'Python', icon: DEV('python') },
      { name: 'C++', icon: DEV('cplusplus') },
      { name: 'MySQL', icon: DEV('mysql') },
      { name: 'MongoDB', icon: DEV('mongodb') },
      { name: 'PHP', icon: DEV('php') },
      { name: 'React', icon: DEV('react') },
      { name: 'Linux', icon: DEV('linux') },
      { name: 'Node.js', icon: DEV('nodejs') },
      { name: 'R', icon: DEV('r') },
    ],
  },
  {
    label: 'Tools',
    items: [
      { name: 'Github', icon: DEV('github') },
      { name: 'VS Code', icon: DEV('vscode') },
      { name: 'IntelliJ', icon: DEV('intellij') },
      { name: 'Unity', icon: DEV('unity') },
      { name: 'MS Excel', emoji: '📊' },
      { name: 'Antigravity', emoji: '🤖' },
    ],
  },
  {
    label: 'Soft Skills',
    items: [
      { name: 'Teamwork', emoji: '🤝' },
      { name: 'Problem Solving', emoji: '🧩' },
      { name: 'Communication', emoji: '💬' },
      { name: 'Research', emoji: '🔍' },
    ],
  },
]

export default function About() {
  return (
    <main className="bg-[#020617] text-white min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .about-section { animation: fade-up .5s ease both; }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Photo + CV */}
          <div className="lg:col-span-1 about-section flex flex-col items-center gap-6" style={{ animationDelay: '0.1s' }}>
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-2xl opacity-40" style={{ background: 'radial-gradient(closest-side, rgba(139,92,246,0.5), rgba(6,182,212,0.3), transparent)' }} />
              <img
                src={profile}
                alt="Cem Sarp Takım"
                className="relative w-48 h-48 rounded-full object-cover ring-4 ring-white/10"
              />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold">Cem Sarp Takım</h2>
              <p className="text-gray-400 text-sm mt-1">CS Student @ Sabancı University</p>
            </div>
            <a
              href="/Cem-Sarp-Takim-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
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

          {/* Bio + skills */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio paragraphs */}
            <div className="space-y-4 about-section" style={{ animationDelay: '0.15s' }}>
              {paragraphs.map((p, i) => (
                <TiltCard key={i} className="p-5">
                  <p className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
                </TiltCard>
              ))}
            </div>

            {/* Skills */}
            <TiltCard className="p-6 about-section" style={{ animationDelay: '0.25s' }}>
              <h3 className="text-xl font-bold mb-5 text-white">Skills &amp; Interests</h3>
              <div className="space-y-5">
                {skillGroups.map(({ label, items }) => (
                  <div key={label}>
                    <p className="mb-3 font-semibold text-gray-400 text-xs uppercase tracking-widest">{label}</p>
                    <div className="flex flex-wrap gap-2">
                      {items.map(({ name, icon, emoji }) => (
                        <span
                          key={name}
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl
                            bg-white/5 border border-white/10 text-gray-200 text-sm font-medium
                            hover:bg-white/10 hover:border-white/20 transition-colors duration-150"
                        >
                          {icon ? (
                            <img
                              src={icon}
                              alt={name}
                              className="w-5 h-5 object-contain"
                              loading="lazy"
                            />
                          ) : (
                            <span className="text-base leading-none">{emoji}</span>
                          )}
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </main>
  )
}
