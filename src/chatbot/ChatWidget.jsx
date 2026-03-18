import { useEffect, useMemo, useRef, useState } from 'react'
import { Bot, MessageCircle, Send, Sparkles, User, X } from 'lucide-react'
import { buildAnswer } from './answerBuilder'

const SUGGESTED_QUESTIONS = [
  "What is Cem's major?",
  'Where did he intern?',
  'What projects has he worked on?',
  'How can I contact him?',
]

function SourceList({ sources }) {
  if (!sources?.length) return null

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {sources.map((source) => (
        <span
          key={source}
          className="badge border"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)',
            color: 'var(--text-muted)',
          }}
        >
          {source}
        </span>
      ))}
    </div>
  )
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hi, I'm Cem’s portfolio assistant. I answer from local CV and portfolio knowledge. Ask me about his education, internships, projects, skills, languages or contact.",
      sources: [],
    },
  ])

  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus()
  }, [isOpen])

  const canSend = useMemo(() => input.trim().length > 0, [input])

  function addUserMessage(content) {
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        role: 'user',
        content,
      },
    ])
  }

  function addAssistantMessage(content, sources = []) {
    setMessages((prev) => [
      ...prev,
      {
        id: `assistant-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        role: 'assistant',
        content,
        sources,
      },
    ])
  }

  function ask(rawQuestion) {
    const question = rawQuestion.trim()
    if (!question) return

    addUserMessage(question)
    setInput('')
    setIsTyping(true)

    window.setTimeout(() => {
      const result = buildAnswer(question)
      addAssistantMessage(result.answer, result.sources)
      setIsTyping(false)
    }, 250)
  }

  function onSubmit(e) {
    e.preventDefault()
    ask(input)
  }

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open chatbot"
          className="fixed bottom-6 right-6 z-[70] inline-flex items-center gap-2 rounded-full px-4 py-3 shadow-soft border transition-transform hover:scale-[1.03]"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--card-bg), #02013dff 50%)',
            borderColor: 'var(--card-border)',
            color: 'var(--text)',
          }}
        >
          <MessageCircle className="h-5 w-5" />
          <span className="font-semibold">Ask me</span>
        </button>
      )}

      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-[70] w-[min(92vw,430px)] overflow-hidden rounded-3xl border shadow-soft"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--card-bg), #262629ff 95%)',
            borderColor: 'var(--card-border)',
          }}
        >
          <div
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{ borderColor: 'var(--card-border)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-2xl"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(var(--acc1),0.18), rgba(var(--acc2),0.18))',
                }}
              >
                <Bot className="h-5 w-5" style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <div className="font-semibold" style={{ color: 'var(--heading)' }}>
                  Chatbot
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Local accuracy-first assistant
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
              className="rounded-xl p-2 transition-colors hover:bg-black/5"
              style={{ color: 'var(--text-muted)' }}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="max-h-[460px] min-h-[360px] overflow-y-auto px-4 py-4 space-y-4"
          >
            {messages.map((message) => {
              const isUser = message.role === 'user'

              return (
                <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div className="mb-1 flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                      {isUser ? <User className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
                      <span>{isUser ? 'You' : 'Assistant'}</span>
                    </div>

                    <div
                      className="rounded-2xl px-4 py-3 text-sm leading-6 whitespace-pre-wrap border"
                      style={{
                        backgroundColor: isUser
                          ? 'color-mix(in oklab, var(--accent), transparent 88%)'
                          : 'var(--card-bg)',
                        borderColor: 'var(--card-border)',
                        color: 'var(--text)',
                      }}
                    >
                      {message.content}
                    </div>

                    {!isUser && <SourceList sources={message.sources} />}
                  </div>
                </div>
              )
            })}

            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[85%]">
                  <div className="mb-1 flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Assistant</span>
                  </div>
                  <div
                    className="rounded-2xl px-4 py-3 text-sm border"
                    style={{
                      backgroundColor: 'var(--card-bg)',
                      borderColor: 'var(--card-border)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    Thinking…
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t px-4 py-3" style={{ borderColor: 'var(--card-border)' }}>
            <div className="mb-3 flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => ask(question)}
                  className="badge border transition-colors hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--card-border)',
                    color: 'var(--text)',
                  }}
                >
                  {question}
                </button>
              ))}
            </div>

            <form onSubmit={onSubmit} className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something about Cem..."
                className="input w-full"
              />
              <button
                type="submit"
                disabled={!canSend || isTyping}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border transition disabled:opacity-50"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--card-border)',
                  color: 'var(--accent)',
                }}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}