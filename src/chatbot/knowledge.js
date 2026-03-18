import education from './education.json'
import experience from './experience.json'
import skills from './skills.json'
import coursework from './coursework.json'
import extracurriculars from './extracurriculars.json'
import faq from './faq.json'
import { projects as siteProjects } from '../data/projects.js'

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

function slugify(text) {
    return normalize(text).replace(/\s+/g, '-')
}

function dedupe(list) {
    return [...new Set(list.filter(Boolean))]
}

function buildTechToProjectLinks(projects) {
    const map = {}

    const add = (tech, projectTitle) => {
        const key = normalize(tech)
        if (!key) return
        if (!map[key]) map[key] = new Set()
        map[key].add(projectTitle)
    }

    projects.forEach((project) => {
        ; (project.tags || []).forEach((tag) => add(tag, project.title))

        tokenize(project.title).forEach((token) => {
            if (['react', 'native', 'mongodb', 'jwt', 'websockets', 'java', 'php', 'mysql', 'python', 'xampp'].includes(token)) {
                add(token, project.title)
            }
        })

        tokenize(project.summary).forEach((token) => {
            if (['react', 'native', 'mongodb', 'jwt', 'websockets', 'java', 'php', 'mysql', 'python', 'xampp'].includes(token)) {
                add(token, project.title)
            }
        })

            ; (project.bullets || []).forEach((bullet) => {
                tokenize(bullet).forEach((token) => {
                    if (['react', 'native', 'mongodb', 'jwt', 'websockets', 'java', 'php', 'mysql', 'python', 'xampp'].includes(token)) {
                        add(token, project.title)
                    }
                })
            })
    })

    return Object.fromEntries(
        Object.entries(map).map(([key, value]) => [key, [...value]])
    )
}

export const TECH_TO_PROJECTS = buildTechToProjectLinks(siteProjects)

export function buildKnowledgeBase() {
    const entries = []

    entries.push({
        id: 'education-core',
        type: 'education',
        topic: 'education',
        source: 'cv',
        priority: 10,
        title: 'Education',
        text: `${education.name} is a ${education.year} ${education.major} student at ${education.university} with a ${education.minor} minor. GPA: ${education.gpa}.`,
        answer: `${education.name} is a ${education.year} ${education.major} student at ${education.university} with a ${education.minor} minor. His cumulative GPA is ${education.gpa}.`,
        keywords: [
            'major',
            'minor',
            'university',
            'student',
            'study',
            'studies',
            'gpa',
            'computer science and engineering',
            'business analytics',
            'sabancı',
            'sabanci'
        ]
    })

    entries.push({
        id: 'education-headline',
        type: 'education',
        topic: 'intro',
        source: 'cv',
        priority: 9,
        title: 'Headline',
        text: education.headline,
        answer: education.headline,
        keywords: ['headline', 'intro', 'summary', 'about', 'who is cem']
    })

    entries.push({
        id: 'coursework',
        type: 'coursework',
        topic: 'coursework',
        source: 'cv',
        priority: 9,
        title: 'Coursework',
        text: `Relevant coursework includes ${coursework.join(', ')}.`,
        answer: `Relevant coursework includes ${coursework.join(', ')}.`,
        keywords: ['coursework', 'courses', 'classes', ...coursework.map((item) => normalize(item))]
    })

    entries.push({
        id: 'skills-programming',
        type: 'skills',
        topic: 'skills',
        source: 'cv',
        priority: 9,
        title: 'Programming & Data Skills',
        text: `Programming and data skills: ${skills.programmingAndData.join(', ')}.`,
        answer: `Programming and data skills include ${skills.programmingAndData.join(', ')}.`,
        keywords: ['skills', 'technical skills', 'programming', 'languages', ...skills.programmingAndData.map((item) => normalize(item))]
    })

    entries.push({
        id: 'skills-ml',
        type: 'skills',
        topic: 'skills',
        source: 'cv',
        priority: 9,
        title: 'Data Science & Machine Learning Skills',
        text: `Data science and machine learning skills: ${skills.dataScienceAndML.join(', ')}.`,
        answer: `His data science and machine learning background includes ${skills.dataScienceAndML.join(', ')}.`,
        keywords: ['machine learning', 'ml', 'data science', 'eda', 'model evaluation', 'validation', ...skills.dataScienceAndML.map((item) => normalize(item))]
    })

    entries.push({
        id: 'skills-systems',
        type: 'skills',
        topic: 'skills',
        source: 'cv',
        priority: 9,
        title: 'Systems & Development Skills',
        text: `Systems and development skills: ${skills.systemsAndDevelopment.join(', ')}.`,
        answer: `His systems and development skills include ${skills.systemsAndDevelopment.join(', ')}.`,
        keywords: ['systems', 'development', 'linux', 'git', 'mongodb', 'mysql', ...skills.systemsAndDevelopment.map((item) => normalize(item))]
    })

    entries.push({
        id: 'skills-languages',
        type: 'languages',
        topic: 'languages',
        source: 'cv',
        priority: 10,
        title: 'Languages',
        text: `Languages: ${skills.languages.map((item) => `${item.name} (${item.level}${item.extra ? `, ${item.extra}` : ''})`).join(', ')}.`,
        answer: `He speaks English (${skills.languages[0].level}, IELTS: 8), German (${skills.languages[1].level}), and Turkish (${skills.languages[2].level}).`,
        keywords: ['english', 'german', 'turkish', 'languages', 'ielts', 'c1', 'a2', 'native']
    })

    entries.push({
        id: 'soft-skills',
        type: 'skills',
        topic: 'soft-skills',
        source: 'about',
        priority: 6,
        title: 'Soft Skills',
        text: `Soft skills include ${skills.softSkills.join(', ')}.`,
        answer: `His soft skills include ${skills.softSkills.join(', ')}.`,
        keywords: ['soft skills', 'teamwork', 'problem solving', 'communication', 'research', ...skills.softSkills.map((item) => normalize(item))]
    })

    experience.forEach((item) => {
        entries.push({
            id: `experience-${slugify(item.company)}`,
            type: 'experience',
            topic: 'experience',
            source: item.source || 'cv',
            priority: 10,
            title: `Experience · ${item.company}`,
            text: `${item.company}. ${item.role}. ${item.summary} ${item.highlights.join(' ')} Technologies: ${item.technologies.join(', ')}.`,
            answer: `${item.company}: ${item.role}. ${item.summary}`,
            company: item.company,
            role: item.role,
            highlights: item.highlights,
            technologies: item.technologies,
            keywords: dedupe([
                'experience',
                'internship',
                'intern',
                'worked at',
                normalize(item.company),
                ...tokenize(item.role),
                ...tokenize(item.summary),
                ...item.highlights.flatMap(tokenize),
                ...item.technologies.flatMap(tokenize)
            ])
        })
    })

    extracurriculars.forEach((item) => {
        entries.push({
            id: `extracurricular-${item.id}`,
            type: item.type.toLowerCase(),
            topic: item.type.toLowerCase() === 'volunteering' ? 'volunteering' : 'extracurriculars',
            source: item.source || 'cv',
            priority: item.type === 'Volunteering' ? 8 : 7,
            title: item.name,
            text: `${item.name}. ${item.summary} ${item.highlights.join(' ')}`,
            answer: `${item.name}: ${item.summary}`,
            highlights: item.highlights,
            keywords: dedupe([
                item.type.toLowerCase(),
                'extracurricular',
                ...tokenize(item.name),
                ...tokenize(item.summary),
                ...item.highlights.flatMap(tokenize)
            ])
        })
    })

    siteProjects.forEach((project) => {
        const bullets = project.bullets || []
        const tags = project.tags || []
        const linkedTechProjects = dedupe(
            tags.flatMap((tag) => TECH_TO_PROJECTS[normalize(tag)] || [])
        )

        entries.push({
            id: `project-${project.id}`,
            type: 'project',
            topic: 'projects',
            source: 'site-projects',
            priority: 8,
            title: `Project · ${project.title}`,
            text: `${project.title}. ${project.summary} ${bullets.join(' ')} Tags: ${tags.join(', ')}.`,
            answer: `${project.title}: ${project.summary}`,
            bullets,
            tags,
            href: project.href || null,
            reportUrl: project.reportUrl || null,
            linkedTechProjects,
            keywords: dedupe([
                'project',
                'projects',
                'built',
                'worked on',
                'portfolio',
                ...tokenize(project.title),
                ...tokenize(project.summary),
                ...bullets.flatMap(tokenize),
                ...tags.flatMap(tokenize)
            ])
        })
    })

    Object.entries(TECH_TO_PROJECTS).forEach(([tech, projectTitles]) => {
        entries.push({
            id: `tech-${slugify(tech)}`,
            type: 'tech-link',
            topic: 'technology-project-link',
            source: 'derived',
            priority: 9,
            title: `Technology Link · ${tech}`,
            text: `${tech} appears in these projects: ${projectTitles.join(', ')}.`,
            answer: `${tech} appears in these projects: ${projectTitles.join(', ')}.`,
            keywords: [tech, 'technology', 'tech', 'used', 'projects', 'experience']
        })
    })

    faq.forEach((item, index) => {
        entries.push({
            id: `faq-${index + 1}`,
            type: 'faq',
            topic: 'faq',
            source: 'faq',
            priority: 5,
            title: `FAQ · ${item.question}`,
            text: `${item.question} ${item.answer}`,
            answer: item.answer,
            keywords: tokenize(item.question)
        })
    })

    entries.push({
        id: 'contact',
        type: 'contact',
        topic: 'contact',
        source: 'site',
        priority: 8,
        title: 'Contact',
        text: 'Use the contact section on cemsarptakim.com for collaboration, internship, or professional opportunities.',
        answer: 'Use the contact section on cemsarptakim.com for collaboration, internship, or professional opportunities.',
        keywords: ['contact', 'email', 'linkedin', 'reach', 'website', 'hire', 'opportunity', 'collaboration']
    })

    return entries
}