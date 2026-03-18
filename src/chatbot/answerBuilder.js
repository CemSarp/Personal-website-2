import { getExactFactAnswer } from './exactFacts'
import { retrieveRelevantContext } from './retrieval'

function normalize(text) {
    return String(text || '')
        .toLowerCase()
        .replace(/[^a-z0-9çğıöşü\s/.-]/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

function mentions(q, terms) {
    return terms.some((term) => q.includes(term))
}

function buildProjectAnswer(projects) {
    return projects
        .map((project) => {
            const tech = project.tags?.length ? ` Technologies/topics: ${project.tags.join(', ')}.` : ''
            const highlights = project.bullets?.length ? ` Key highlights: ${project.bullets.slice(0, 3).join(' ')}` : ''
            return `${project.answer}${tech}${highlights}`
        })
        .join('\n\n')
}

function buildExperienceAnswer(experiences) {
    return experiences
        .map((item) => {
            const highlights = item.highlights?.length ? ` Highlights: ${item.highlights.slice(0, 2).join(' ')}` : ''
            return `${item.answer}${highlights}`
        })
        .join('\n\n')
}

function buildLowConfidenceAnswer() {
    return {
        answer:
            'I do not have a reliable local answer for that yet. Try asking about education, GPA, coursework, internships, projects, skills, languages, volunteering, extracurriculars, or contact.',
        confidence: 0.2,
        sources: [],
    }
}

export function buildAnswer(question) {
    const exact = getExactFactAnswer(question)
    if (exact) return exact

    const q = normalize(question)
    const context = retrieveRelevantContext(question, 4)

    if (!context.length) return buildLowConfidenceAnswer()

    const top = context[0]
    const confidence = Math.min(1, top.score / 30)

    const asksProjects = mentions(q, ['project', 'projects', 'built', 'portfolio', 'app', 'apps'])
    const asksExperience = mentions(q, ['intern', 'internship', 'experience', 'worked at', 'company'])
    const asksSkills = mentions(q, ['skill', 'skills', 'stack', 'technology', 'technologies', 'tools'])
    const asksLanguages = mentions(q, ['english', 'german', 'turkish', 'language', 'languages', 'ielts'])
    const asksVolunteering = mentions(q, ['volunteer', 'volunteering', 'mentor', 'cip'])
    const asksCoursework = mentions(q, ['coursework', 'courses', 'classes'])

    if (asksProjects || top.topic === 'projects') {
        const projects = context.filter((item) => item.type === 'project')
        if (projects.length) {
            return {
                answer: buildProjectAnswer(projects),
                confidence,
                sources: projects.map((item) => item.title),
            }
        }
    }

    if (asksExperience || top.topic === 'experience') {
        const experiences = context.filter((item) => item.type === 'experience')
        if (experiences.length) {
            return {
                answer: buildExperienceAnswer(experiences),
                confidence,
                sources: experiences.map((item) => item.title),
            }
        }
    }

    if (asksSkills) {
        const relevant = context.filter(
            (item) =>
                item.type === 'skills' ||
                item.type === 'tech-link' ||
                item.topic === 'skills' ||
                item.topic === 'technology-project-link'
        )

        if (relevant.length) {
            return {
                answer: relevant.map((item) => item.answer).join(' '),
                confidence,
                sources: relevant.map((item) => item.title),
            }
        }
    }

    if (asksLanguages) {
        const languageEntry = context.find((item) => item.topic === 'languages')
        if (languageEntry) {
            return {
                answer: languageEntry.answer,
                confidence,
                sources: [languageEntry.title],
            }
        }
    }

    if (asksVolunteering) {
        const volunteering = context.filter((item) => item.topic === 'volunteering')
        if (volunteering.length) {
            return {
                answer: volunteering
                    .map((item) => `${item.answer}${item.highlights?.length ? ` Highlights: ${item.highlights.slice(0, 2).join(' ')}` : ''}`)
                    .join('\n\n'),
                confidence,
                sources: volunteering.map((item) => item.title),
            }
        }
    }

    if (asksCoursework) {
        const courseworkEntry = context.find((item) => item.topic === 'coursework')
        if (courseworkEntry) {
            return {
                answer: courseworkEntry.answer,
                confidence,
                sources: [courseworkEntry.title],
            }
        }
    }

    if (confidence < 0.35) return buildLowConfidenceAnswer()

    return {
        answer: top.answer,
        confidence,
        sources: context.map((item) => item.title),
    }
}