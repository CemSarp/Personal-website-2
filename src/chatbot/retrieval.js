import { buildKnowledgeBase } from './knowledge'

const KNOWLEDGE_BASE = buildKnowledgeBase()

function normalize(text) {
    return String(text || '')
        .toLowerCase()
        .replace(/[^a-z0-9çğıöşü\s/.-]/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

function tokenize(text) {
    return normalize(text).split(' ').filter(Boolean)
}

function hasAny(q, list) {
    return list.some((item) => q.includes(item))
}

function detectIntent(question) {
    const q = normalize(question)

    if (hasAny(q, ['major', 'minor', 'study', 'student', 'university', 'department', 'gpa', 'scholarship'])) {
        return 'education'
    }
    if (hasAny(q, ['coursework', 'courses', 'classes'])) {
        return 'coursework'
    }
    if (hasAny(q, ['intern', 'internship', 'experience', 'worked at', 'worked on at', 'company'])) {
        return 'experience'
    }
    if (hasAny(q, ['project', 'projects', 'built', 'worked on', 'portfolio', 'app', 'apps'])) {
        return 'projects'
    }
    if (hasAny(q, ['skill', 'skills', 'stack', 'technology', 'technologies', 'tools'])) {
        return 'skills'
    }
    if (hasAny(q, ['english', 'german', 'turkish', 'ielts', 'language', 'languages'])) {
        return 'languages'
    }
    if (hasAny(q, ['volunteer', 'volunteering', 'mentor', 'mentoring', 'cip'])) {
        return 'volunteering'
    }
    if (hasAny(q, ['extracurricular', 'award', 'basketball', 'cakuf', 'fll'])) {
        return 'extracurriculars'
    }
    if (hasAny(q, ['contact', 'email', 'linkedin', 'reach'])) {
        return 'contact'
    }

    return null
}

function scoreEntry(question, entry) {
    const q = normalize(question)
    const questionTokens = tokenize(question)
    const entryTokens = new Set(tokenize(entry.text))

    let score = 0

    for (const keyword of entry.keywords || []) {
        if (q.includes(normalize(keyword))) score += 7
    }

    for (const token of questionTokens) {
        if (entryTokens.has(token)) score += 1.5
    }

    const intent = detectIntent(question)
    if (intent && entry.topic === intent) score += 10

    if (intent === 'skills' && entry.topic === 'technology-project-link') score += 4
    if (intent === 'projects' && entry.type === 'project') score += 4

    score += entry.priority || 0

    return score
}

export function retrieveRelevantContext(question, limit = 4) {
    return KNOWLEDGE_BASE
        .map((entry) => ({
            ...entry,
            score: scoreEntry(question, entry),
        }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
}