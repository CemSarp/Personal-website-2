import { useMemo, useRef, useState, useEffect } from 'react'
import { Bot, MessageCircle, Send, Sparkles, User, X } from 'lucide-react'
import profile from './profile.json'
import projects from './projects.json'
import faq from './faq.json'

const SUGGESTED_QUESTIONS = [
  'What is Cem’s major?',
  'What are his main interests?',
  'Where did he intern?',
  'What projects has he worked on?',
]

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9çğıöşü\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokenize(text) {
  return normalize(text).split(' ').filter(Boolean)
}

function buildKnowledgeBase() {
  const entries = []

  entries.push({
    id: 'profile-basic',
    title: 'Profile',
    text: `${profile.name} is a ${profile.education.year} ${profile.education.major} student at ${profile.education.university}. He also has a ${profile.education.minor} minor.`,
    answer: `${profile.name} is a ${profile.education.year} ${profile.education.major} student at ${profile.education.university}, and he also has a ${profile.education.minor} minor.`,
    keywords: ['major', 'minor', 'university', 'student', 'study', 'studies', 'sabancı', 'sabanci', 'computer engineering', 'business analytics'],
  })

  entries.push({
    id: 'profile-interests',
    title: 'Interests',
    text: `${profile.name}'s main interests are ${profile.interests.join(', ')}.`,
    answer: `His main interests are ${profile.interests.join(', ')}.`,
    keywords: ['interests', 'interest', 'focus', 'ai', 'ml', 'machine learning', 'computer vision', 'software engineering', 'data analytics'],
  })

  entries.push({
    id: 'profile-goals',
    title: 'Career Goals',
    text: profile.goals,
    answer: profile.goals,
    keywords: ['goal', 'goals', 'career', 'future', 'role', 'roles', 'job', 'work'],
  })

  profile.experience.forEach((item) => {
    entries.push({
      id: `experience-${item.company.toLowerCase()}`,
      title: `Experience · ${item.company}`,
      text: `${profile.name} worked at ${item.company} as a ${item.role}. ${item.summary}`,
      answer: `${item.company}: ${item.role}. ${item.summary}`,
      keywords: ['experience', 'internship', 'intern', item.company.toLowerCase(), normalize(item.role)],
    })
  })

  projects.forEach((project) => {
    entries.push({
      id: `project-${normalize(project.name).replace(/\s+/g, '-')}`,
      title: `Project · ${project.name}`,
      text: `${project.name}. ${project.summary} ${project.details} Tags: ${project.tags.join(', ')}.`,
      answer: `${project.name}: ${project.summary} ${project.details}`,
      keywords: ['project', 'projects', ...project.tags.map((tag) => normalize(tag)), ...tokenize(project.name)],
    })
  })

  faq.forEach((item, index) => {
    entries.push({
      id: `faq-${index + 1}`,
      title: 'FAQ',
      text: `${item.question} ${item.answer}`,
      answer: item.answer,
      keywords: tokenize(item.question),
    })
  })

  entries.push({
    id: 'contact',
    title: 'Contact',
    text: profile.contact.note,
    answer: profile.contact.note,
    keywords: ['contact', 'email', 'linkedin', 'reach', 'hire', 'collaboration', 'opportunity'],
  })

  return entries
}

const KNOWLEDGE_BASE = buildKnowledgeBase()

function scoreEntry(question, entry) {
  const normalizedQuestion = normalize(question)
  const questionTokens = tokenize(question)

  const keywordScore = entry.keywords.reduce((score, keyword) => {
    return score + (normalizedQuestion.includes(normalize(keyword)) ? 4 : 0)
  }, 0)

  const tokenSet = new Set(tokenize(entry.text))
  const overlapScore = questionTokens.reduce((score, token) => score + (tokenSet.has(token) ? 1 : 0), 0)

  return keywordScore + overlapScore
}

function retrieveRelevantContext(question) {
  return KNOWLEDGE_BASE
    .map((entry) => ({ ...entry, score: scoreEntry(question, entry) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}

function buildAnswer(question) {
  const context = retrieveRelevantContext(question)

  if (context.length === 0) {
    return {
      answer:
        'I do not have that detail in my current local knowledge yet. Try checking the About, Projects, or Contact sections for the most reliable information.',
      sources: [],
    }
  }

  const top = context[0]
  const normalizedQuestion = normalize(question)
  const wantsProjects = normalizedQuestion.includes('project') || normalizedQuestion.includes('worked on') || normalizedQuestion.includes('built')
  const wantsExperience = normalizedQuestion.includes('intern') || normalizedQuestion.includes('experience')

  if (wantsProjects) {
    const projectEntries = context.filter((item) => item.title.startsWith('Project ·'))
    if (projectEntries.length > 0) {
      return {
        answer: projectEntries.map((item) => item.answer).join(' '),
        sources: projectEntries.map((item) => item.title),
      }
    }
  }

  if (wantsExperience) {
    const experienceEntries = context.filter((item) => item.title.startsWith('Experience ·'))
    if (experienceEntries.length > 0) {
      return {
        answer: `He has internship experience in several areas. ${experienceEntries.map((item) => item.answer).join(' ')}`,
        sources: experienceEntries.map((item) => item.title),
      }
    }
  }

  return {
    answer: top.answer,
    sources: context.map((item) => item.title),
  }
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState(() => [
    {
      id: crypto.randomUUID(),
      role: 'assistant',
      text:
        'Hi, I’m Cem’s local portfolio assistant. Ask about his major, interests, experience, or projects.',
      sources: [],
    },
  ])

  const scrollRef = useRef(null)

  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, isTyping, isOpen])

  const canSend = useMemo(() => input.trim().length > 0 && !isTyping, [input, isTyping])

  function sendMessage(text) {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return

    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text: trimmed,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    window.setTimeout(() => {
      const { answer, sources } = buildAnswer(trimmed)
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: answer,
          sources,
        },
      ])
      setIsTyping(false)
    }, 350)
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-x-4 bottom-20 md:inset-x-auto md:right-6 md:bottom-24 z-50 w-auto md:w-[390px]">
          <div
            className="rounded-3xl border shadow-2xl overflow-hidden backdrop-blur-xl"
            style={{
              background: 'color-mix(in oklab, var(--paper), var(--ink) 12%)',
              borderColor: 'var(--card-border)',
            }}
          >
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: 'var(--card-border)' }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="h-10 w-10 rounded-2xl flex items-center justify-center"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(var(--acc1),0.22), rgba(var(--acc2),0.22))',
                    color: 'var(--heading)',
                  }}
                >
                  <Bot size={18} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold truncate" style={{ color: 'var(--heading)' }}>
                    Cem-AI__Experimental
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    Local structured-data assistant
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="rounded-xl p-2 transition-transform hover:scale-105"
                style={{ color: 'var(--text)' }}
              >
                <X size={18} />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="max-h-[26rem] overflow-y-auto px-4 py-4 space-y-4"
            >
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => sendMessage(question)}
                    className="badge border transition-transform hover:scale-[1.02]"
                    style={{ borderColor: 'var(--card-border)' }}
                  >
                    <Sparkles size={12} className="mr-1" />
                    {question}
                  </button>
                ))}
              </div>

              {messages.map((message) => {
                const isAssistant = message.role === 'assistant'
                return (
                  <div
                    key={message.id}
                    className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className="max-w-[88%] space-y-2">
                      <div className="flex items-center gap-2 px-1">
                        {isAssistant ? <Bot size={14} /> : <User size={14} />}
                        <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                          {isAssistant ? 'Cem-AI' : 'You'}
                        </span>
                      </div>

                      <div
                        className="rounded-2xl px-4 py-3 border"
                        style={{
                          background: isAssistant
                            ? 'var(--card-bg)'
                            : 'linear-gradient(135deg, rgba(var(--acc1),0.18), rgba(var(--acc2),0.18))',
                          borderColor: 'var(--card-border)',
                          color: 'var(--text)',
                        }}
                      >
                        <p className="text-sm leading-6 whitespace-pre-wrap">{message.text}</p>
                      </div>

                      {isAssistant && message.sources?.length > 0 && (
                        <div className="flex flex-wrap gap-2 px-1">
                          {message.sources.map((source) => (
                            <span key={source} className="badge" title="Source section">
                              {source}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[88%] space-y-2">
                    <div className="flex items-center gap-2 px-1">
                      <Bot size={14} />
                      <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                        Cem-AI
                      </span>
                    </div>
                    <div
                      className="rounded-2xl px-4 py-3 border inline-flex items-center gap-2"
                      style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
                    >
                      <span className="h-2 w-2 rounded-full bg-current opacity-50 animate-pulse" />
                      <span className="h-2 w-2 rounded-full bg-current opacity-50 animate-pulse [animation-delay:120ms]" />
                      <span className="h-2 w-2 rounded-full bg-current opacity-50 animate-pulse [animation-delay:240ms]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault()
                sendMessage(input)
              }}
              className="border-t px-4 py-3"
              style={{ borderColor: 'var(--card-border)' }}
            >
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about Cem…"
                  rows={1}
                  className="textarea min-h-[46px] max-h-28 resize-none flex-1"
                />
                <button
                  type="submit"
                  disabled={!canSend}
                  aria-label="Send message"
                  className="h-[46px] w-[46px] rounded-2xl border flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    borderColor: 'var(--card-border)',
                    background: 'linear-gradient(135deg, rgba(var(--acc1),0.18), rgba(var(--acc2),0.18))',
                    color: 'var(--heading)',
                  }}
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
        className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-50 h-14 w-14 rounded-full border shadow-soft flex items-center justify-center transition-transform hover:scale-105"
        style={{
          background: 'linear-gradient(135deg, rgba(var(--acc1),0.22), rgba(var(--acc2),0.22))',
          borderColor: 'var(--card-border)',
          color: 'var(--heading)',
        }}
      >
        <MessageCircle size={22} />
      </button>
    </>
  )
}
