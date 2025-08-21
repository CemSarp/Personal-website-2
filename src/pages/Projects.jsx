import Section from '../components/Section.jsx'
import TiltCard from '../components/effects/TiltCard.jsx'
import { MessageSquare, FileBarChart } from 'lucide-react'

function Thumb({ icon: Icon }) {
  return (
    <div className="h-28 w-full rounded-xl bg-gradient-to-r from-primary via-sky to-violet flex items-center justify-center">
      <Icon size={36} className="text-white/90" />
    </div>
  )
}
const Badge = ({ children }) => <span className="badge">{children}</span>

export default function Projects() {
  return (
    <div className="space-y-8">
      <Section>
        <h2 className="headline">My Projects</h2>
      </Section>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Project 1 */}
        <Section delay={0.05}>
          <TiltCard className="p-0 overflow-hidden">
            <Thumb icon={MessageSquare} />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">
                <a
                  href="https://github.com/CemSarp/Mobile-message-app"
                  target="_blank"
                  rel="noreferrer"
                  className="link link-strong"
                >
                  Mobile Messaging App
                </a>
              </h3>

              <div className="mt-2 flex flex-wrap gap-2">
                <Badge>React Native</Badge>
                <Badge>MongoDB</Badge>
                <Badge>JWT</Badge>
                <Badge>WebSockets</Badge>
                <Badge>iOS</Badge>
              </div>

              <p className="mt-4">
                Full-stack messaging app with a responsive iOS-focused UI and a scalable backend.
                Includes auth, E2E-like privacy, and live chat updates.
              </p>

              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>Responsive, touch-friendly UI (React Native).</li>
                <li>MongoDB data layer tuned for fast reads/writes.</li>
                <li>JWT-based auth; secure message handling.</li>
                <li>Real-time chat via WebSockets.</li>
              </ul>
            </div>
          </TiltCard>
        </Section>

        {/* Project 2 */}
        <Section delay={0.1}>
          <TiltCard className="p-0 overflow-hidden">
            <Thumb icon={FileBarChart} />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">
                Research Assistant – PURE Initiative, Sabancı University
              </h3>

              <div className="mt-2 flex flex-wrap gap-2">
                <Badge>Research</Badge>
                <Badge>Data</Badge>
                <Badge>CSR</Badge>
                <Badge>Python</Badge>
              </div>

              <p className="mt-4">
                Analyzed disaster-related corporate posts to understand what kinds of
                messages build trust and engagement during crises.
              </p>

              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>Scraped and labeled thousands of posts (Platform X).</li>
                <li>Mapped content types to engagement outcomes.</li>
                <li>Found emotional storytelling + images drove trust and interaction.</li>
                <li>Actionable guidance for disaster-time CSR comms.</li>
              </ul>
            </div>
          </TiltCard>
        </Section>
      </div>
    </div>
  )
}
