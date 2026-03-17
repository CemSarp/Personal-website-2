import { useEffect, useState } from 'react'
import { ExternalLink, FileText } from 'lucide-react'
import { projects } from '../data/projects.js'

function TypingText({ text, delay = 0, speed = 40 }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  useEffect(() => {
    if (!started) return

    let i = 0
    setDisplayed('')

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(interval)
    }, speed)

    return () => clearInterval(interval)
  }, [started, text, speed])

  return (
    <span>
      {displayed}
      {displayed.length < text.length && started && (
        <span className="animate-pulse">█</span>
      )}
    </span>
  )
}

function getProjectMeta(project) {
  if (project.id === 'mobile-messaging') {
    return {
      type: 'Full Stack',
      typeColor: '#4ade80',
      buildLabel: 'build',
      buildText: 'real-time messaging platform with auth, live updates, and privacy-focused communication',
      status: 'completed',
      mode: 'course project',
    }
  }

  if (project.id === 'pure-research') {
    return {
      type: 'Research',
      typeColor: '#60a5fa',
      buildLabel: 'analysis',
      buildText: 'csr communication research using scraped social data, labeling, and engagement pattern analysis',
      status: 'completed',
      mode: 'academic',
    }
  }

  if (project.id === 'xampp-mysql-marketplace') {
    return {
      type: 'Backend / DB',
      typeColor: '#818cf8',
      buildLabel: 'system',
      buildText: 'marketplace and support platform with mysql procedures, triggers, and mongodb ticket workflows',
      status: 'completed',
      mode: 'course project',
    }
  }

  if (project.id === 'cip101-volunteer-project') {
    return {
      type: 'Social Impact',
      typeColor: '#f59e0b',
      buildLabel: 'impact',
      buildText: 'community engagement project focused on mentoring, student development, and educational support',
      status: 'completed',
      mode: 'volunteering',
    }
  }

  return {
    type: 'Project',
    typeColor: '#22d3ee',
    buildLabel: 'build',
    buildText: 'software project',
    status: 'completed',
    mode: 'project',
  }
}

function ActionButton({ href, children, primary = false, icon: Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-mono transition-all duration-300 ${primary
        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/15 hover:border-emerald-400/50'
        : 'border-slate-600/50 bg-slate-800/50 text-slate-300 hover:border-slate-500 hover:bg-slate-800/70'
        }`}
    >
      {Icon && <Icon size={14} />}
      {children}
    </a>
  )
}

function ProjectCard({ project, index }) {
  const meta = getProjectMeta(project)
  const Icon = project.icon

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/70 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-slate-900/85 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]"
      style={{
        animation: `proj-fadeInUp 0.7s ease ${index * 0.12}s both`,
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent opacity-80" />

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-3 min-w-0">
            <div
              className="shrink-0 rounded-xl border border-slate-700/50 bg-slate-950/50 p-3 text-emerald-300"
              style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.02)' }}
            >
              {Icon ? <Icon size={22} strokeWidth={1.8} /> : null}
            </div>

            <div className="min-w-0">
              <h3 className="text-white font-bold text-lg sm:text-xl leading-tight">
                {project.title}
              </h3>
              <p className="text-slate-400 text-sm font-medium mt-1">
                Repository snapshot
              </p>
            </div>
          </div>

          <span
            className="shrink-0 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-mono"
            style={{
              color: meta.typeColor,
              borderColor: `${meta.typeColor}55`,
              backgroundColor: `${meta.typeColor}15`,
            }}
          >
            {meta.type}
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          {project.summary}
        </p>

        <div className="mb-4 rounded-lg border border-slate-700/40 bg-slate-950/40 px-3 py-2 text-xs font-mono text-slate-300">
          <span className="text-emerald-400">{meta.buildLabel}:</span>{' '}
          {meta.buildText}
        </div>

        <ul className="space-y-2.5 mb-5">
          {project.bullets.map((bullet, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-slate-300 leading-relaxed"
            >
              <span className="mt-0.5 shrink-0 font-mono text-xs text-emerald-400">
                ▸
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-slate-600/50 bg-slate-800/50 px-2.5 py-1 text-xs font-mono text-slate-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {project.href && (
            <ActionButton href={project.href} primary icon={ExternalLink}>
              Open Repo
            </ActionButton>
          )}

          {project.reportUrl && (
            <ActionButton href={project.reportUrl} icon={FileText}>
              View Report
            </ActionButton>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-700/40 pt-4 text-xs font-mono text-slate-500">
          <span>mode: {meta.mode}</span>
          <span>status: {meta.status}</span>
          <span>stack: {project.tags.length} tools</span>
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const [showTerminal, setShowTerminal] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowTerminal(true), 300)
    return () => clearTimeout(t)
  }, [])

  const totalTags = new Set(projects.flatMap((project) => project.tags)).size
  const repoCount = projects.filter((project) => project.href).length
  const reportCount = projects.filter((project) => project.reportUrl).length

  return (
    <>
      <style>{`
        @keyframes proj-fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <main className="min-h-screen bg-transparent px-4 pb-20 pt-24 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-6">

            <div className="text-center mb-5 exp-fade-in">
              {showTerminal && (
                <div className="inline-flex items-center gap-2 mb-1 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700/50 text-sm font-mono text-emerald-400">
                  <span className="text-slate-500 hidden sm:inline">~/portfolio</span>
                  <span className="text-slate-600">$</span>
                  <TypingText text="ls projects --view=repository" delay={200} speed={35} />
                </div>
              )}
            </div>
            {/*
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4 text-xs font-mono sm:gap-6">
              {[
                { label: 'projects', value: String(projects.length), icon: '⬡' },
                { label: 'repositories', value: String(repoCount), icon: '⎇' },
                { label: 'reports', value: String(reportCount), icon: '◷' },
                { label: 'tools used', value: `${totalTags}+`, icon: '◈' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-1.5 text-slate-400">
                  <span className="text-emerald-500">{stat.icon}</span>
                  <span className="font-bold text-white">{stat.value}</span>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
            {/* */}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <span className="text-xs font-mono text-slate-600">
              — more builds incoming...
            </span>
          </div>
        </div>
      </main>
    </>
  )
}