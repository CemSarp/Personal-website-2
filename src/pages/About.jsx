import Section from '../components/Section.jsx'
import TiltCard from '../components/effects/TiltCard.jsx'
import cv from '../assets/Cem-Sarp-Takim-CV.pdf'

const paragraphs = [
  "I’m <strong>Cem Sarp</strong>, a 21 year old Computer Engineering student at Sabancı University with a strong interest in web development, data analytics, and technology that creates real impact.",
  "Outside of academics I care about community involvement. Through Sabancı’s Civil Involvement Project, I mentored primary school students on creativity, communication, and children’s rights.",
  "When I’m not building, I’m with friends, playing basketball, watching films, or being interrupted by my 8-year-old cat.",
  "I’m always exploring ways to combine technical skills with meaningful purpose."
]

const skills = {
  Technical: ['C++', 'Python', 'Linux', 'React', 'React Native', 'Tailwind', 'MongoDB'],
  Tools:     ['Git', 'VS Code', 'MS Office', 'Figma'],
  'Soft Skills': ['Teamwork', 'Problem Solving', 'Communication', 'Product Thinking']
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
