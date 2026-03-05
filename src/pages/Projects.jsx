import Section from '../components/Section.jsx'
import TiltCard from '../components/effects/TiltCard.jsx'
import { projects } from '../data/projects.js'

function Thumb({ icon: Icon }) {
  return (
    <div className="h-28 w-full rounded-xl bg-gradient-to-r from-primary via-sky to-violet flex items-center justify-center">
      <Icon size={36} className="text-white/90" />
    </div>
  )
}
const Badge = ({ children }) => <span className="badge">{children}</span>

function ProjectCard({ p }) {
  const hasLink = Boolean(p.href)
  return (
    <TiltCard className="p-0 overflow-hidden">
      <Thumb icon={p.icon} />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">
          {hasLink ? (
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="link link-strong"
            >
              {p.title}
            </a>
          ) : (
            <span>{p.title}</span>
          )}
        </h3>

        {p.tags?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        )}

        {p.summary && <p className="mt-4">{p.summary}</p>}

        {p.bullets?.length > 0 && (
          <ul className="list-disc pl-5 mt-3 space-y-1">
            {p.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}

        {p.reportUrl && (
          <div className="mt-5">
            <a
              href={p.reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              View Report (PDF)
            </a>
          </div>
        )}
      </div>
    </TiltCard>
  )
}

export default function Projects() {
  return (
    <div className="space-y-8">
      <Section>
        <h2 className="headline">My Projects</h2>
      </Section>

      <Section delay={0.06}>
        <div
          role="region"
          aria-label="Projects list"
          tabIndex={0}
          className="card p-4 md:p-5 h-[72vh] md:h-[75vh] lg:h-[78vh] overflow-y-auto"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p, idx) => (
              <ProjectCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}
