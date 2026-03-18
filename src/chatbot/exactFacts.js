import education from './education.json'
import experience from './experience.json'
import skills from './skills.json'
import coursework from './coursework.json'

const internshipCompanies = experience.map((item) => item.company)

const languageMap = Object.fromEntries(
    skills.languages.map((lang) => [lang.name.toLowerCase(), lang])
)

export const EXACT_FACTS = {
    name: education.name,
    headline: education.headline,
    university: education.university,
    location: education.location,
    major: education.major,
    minor: education.minor,
    year: education.year,
    gpa: education.gpa,
    scholarship: education.scholarship,
    englishLevel: languageMap.english?.level || 'C1',
    ielts: '8',
    germanLevel: languageMap.german?.level || 'A2',
    turkishLevel: languageMap.turkish?.level || 'Native',
    internshipCompanies,
    coursework,
}

function normalize(text) {
    return String(text || '')
        .toLowerCase()
        .replace(/[^a-z0-9çğıöşü\s/.-]/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

export function getExactFactAnswer(question) {
    const q = normalize(question)

    if (/\b(gpa|grade point average)\b/.test(q)) {
        return {
            answer: `His cumulative GPA is ${EXACT_FACTS.gpa}.`,
            confidence: 1,
            sources: ['Exact Fact · GPA'],
        }
    }

    if (/\b(ielts)\b/.test(q)) {
        return {
            answer: `His IELTS score is ${EXACT_FACTS.ielts}.`,
            confidence: 1,
            sources: ['Exact Fact · IELTS'],
        }
    }

    if (/\b(english level|english|language proficiency)\b/.test(q) && !/\bgerman\b/.test(q) && !/\bturkish\b/.test(q)) {
        return {
            answer: `His English level is ${EXACT_FACTS.englishLevel}, and his IELTS score is ${EXACT_FACTS.ielts}.`,
            confidence: 1,
            sources: ['Exact Fact · English'],
        }
    }

    if (/\bgerman\b/.test(q)) {
        return {
            answer: `His German level is ${EXACT_FACTS.germanLevel}.`,
            confidence: 1,
            sources: ['Exact Fact · German'],
        }
    }

    if (/\bturkish\b/.test(q)) {
        return {
            answer: `Turkish is his native language.`,
            confidence: 1,
            sources: ['Exact Fact · Turkish'],
        }
    }

    if (/\b(major|what does he study|what is he studying|field of study|department)\b/.test(q)) {
        return {
            answer: `He is a ${EXACT_FACTS.major} student at ${EXACT_FACTS.university}.`,
            confidence: 1,
            sources: ['Exact Fact · Major'],
        }
    }

    if (/\b(minor)\b/.test(q)) {
        return {
            answer: `His minor is ${EXACT_FACTS.minor}.`,
            confidence: 1,
            sources: ['Exact Fact · Minor'],
        }
    }

    if (/\b(university|school|college)\b/.test(q) && !/\bhigh school\b/.test(q)) {
        return {
            answer: `He studies at ${EXACT_FACTS.university}.`,
            confidence: 1,
            sources: ['Exact Fact · University'],
        }
    }

    if (/\b(year|senior|4th year|fourth year)\b/.test(q)) {
        return {
            answer: `He is currently a ${EXACT_FACTS.year}.`,
            confidence: 1,
            sources: ['Exact Fact · Year'],
        }
    }

    if (/\b(where did he intern|internships|internship companies|companies did he intern)\b/.test(q)) {
        return {
            answer: `He has internship experience at ${EXACT_FACTS.internshipCompanies.join(', ')}.`,
            confidence: 1,
            sources: ['Exact Fact · Internship Companies'],
        }
    }

    if (/\b(coursework|courses|classes)\b/.test(q)) {
        return {
            answer: `Relevant coursework includes ${EXACT_FACTS.coursework.join(', ')}.`,
            confidence: 1,
            sources: ['Exact Fact · Coursework'],
        }
    }

    return null
}