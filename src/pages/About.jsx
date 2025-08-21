import Section from '../components/Section.jsx'
import TiltCard from '../components/effects/TiltCard.jsx'
import cv from '../assets/Cem-Sarp-Takim-CV.pdf'

const paragraphs = [
  "I’m <strong>Cem Sarp</strong>, a 21 year old Computer Engineering student at Sabancı University with a passion for web development, data analytics, and creating new things.",
  "Beyond academics, I value giving back to the community. Through Sabancı’s Civil Involvement Project, I had the chance to mentor primary school students, encouraging creativity, communication, and awareness of children’s rights.",
  "Outside of building and learning, you’ll usually find me with friends, on the basketball court, watching films, or being interrupted by my cat.",
  "I’m driven by the idea of using my technical skills to create meaningful, human centered solutions and I’m always looking for new opportunities to grow and contribute."
]


const skills = {
  Technical: ['C++', 'Python', 'Linux', 'PHP', 'MySQL', 'MongoDB', 'React Native'],
  Tools:     ['Git', 'VS Code', 'Excel', 'AI Agents', 'IntelliJ', 'Unity'],
  'Soft Skills': ['Teamwork', 'Problem Solving', 'Communication', 'Creative Thinking']
}

export default function About() {
  return (
    <div className="space-y-8">
      <Section>
        <h2 className="headline">About Me</h2>
      </Section>

      <div className="grid lg:grid-cols-2 gap-6">
        <Section className="space-y-4">
          {paragraphs.map((p, i) => (
            <TiltCard key={i} className="p-5">
              <p className="prose max-w-none" dangerouslySetInnerHTML={{ __html: p }} />
            </TiltCard>
          ))}
        </Section>

        <Section delay={0.1}>
          <TiltCard className="p-6">
            <h3 className="text-xl font-bold mb-4">Skills &amp; Interests</h3>
            <div className="space-y-5">
              {Object.entries(skills).map(([group, list]) => (
                <div key={group}>
                  <p className="mb-2 font-semibold">{group}</p>
                  <div className="flex flex-wrap gap-2">
                    {list.map((item) => (
                      <span key={item} className="pill">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <a href={cv} download className="btn btn-lg mt-8">Download CV</a>
          </TiltCard>
        </Section>
      </div>
    </div>
  )
}
