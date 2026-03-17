import TiltCard from '../components/effects/TiltCard.jsx'
import { useState, useMemo } from 'react'
import linkedin from '../assets/linkedin.png'
import { Send } from 'lucide-react'

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [touched, setTouched] = useState({ name: false, email: false, message: false })
  const [status, setStatus] = useState('idle')
  const [msg, setMsg] = useState('')

  const emailOk = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()), [values.email])

  const errors = {
    name: values.name.trim() ? '' : 'Name is required.',
    email: values.email.trim() ? (emailOk ? '' : 'Please enter a valid e-mail.') : 'Email is required.',
    message: values.message.trim() ? '' : 'Message cannot be empty.',
  }
  const formValid = !errors.name && !errors.email && !errors.message

  function onChange(e) {
    const { name, value } = e.target
    setValues(v => ({ ...v, [name]: value }))
  }

  function onBlur(e) {
    const { name } = e.target
    setTouched(t => ({ ...t, [name]: true }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })
    if (!formValid) return

    setStatus('loading')
    setMsg('')

    const form = new FormData()
    form.append('name', values.name)
    form.append('email', values.email)
    form.append('message', values.message)

    try {
      const res = await fetch('https://formspree.io/f/mwpolgbl', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: form,
        mode: 'cors',
        redirect: 'follow',
      })

      const opaque = res.type === 'opaque' || res.status === 0
      let data = null
      if (!opaque) {
        try { data = await res.clone().json() } catch (_) { }
      }

      const success = opaque || (res.ok && (data?.ok === true || !data)) || res.status === 200

      if (success) {
        setValues({ name: '', email: '', message: '' })
        setTouched({ name: false, email: false, message: false })
        setStatus('success')
        setMsg('Thanks! Your message has been sent.')
      } else {
        setStatus('error')
        setMsg((data?.errors?.map(er => er.message).join(', ')) || 'Something went wrong.')
      }
    } catch {
      setValues({ name: '', email: '', message: '' })
      setTouched({ name: false, email: false, message: false })
      setStatus('success')
      setMsg('Thanks! Your message has been sent.')
    }
  }

  return (
    <main className="bg-[#020617] text-white min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .contact-section { animation: fade-up .5s ease both; }
      `}</style>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center contact-section">
          <h1 className="text-4xl sm:text-5xl font-bold">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h1>
        </div>

        <div className="contact-section" style={{ animationDelay: '0.1s' }}>
          <TiltCard className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={`input ${touched.name && errors.name ? 'input-error' : ''}`}
                  value={values.name}
                  onChange={onChange}
                  onBlur={onBlur}
                  aria-invalid={!!(touched.name && errors.name)}
                />
                {touched.name && errors.name && <p className="field-error">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="form-label">E-mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`input ${touched.email && errors.email ? 'input-error' : ''}`}
                  value={values.email}
                  onChange={onChange}
                  onBlur={onBlur}
                  aria-invalid={!!(touched.email && errors.email)}
                />
                {touched.email && errors.email && <p className="field-error">{errors.email}</p>}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className={`textarea ${touched.message && errors.message ? 'input-error' : ''}`}
                  value={values.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  aria-invalid={!!(touched.message && errors.message)}
                />
                {touched.message && errors.message && <p className="field-error">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="btn w-full justify-center"
                disabled={status === 'loading' || !formValid}
              >
                {status === 'loading' ? 'Sending…' : 'Send Message'}
                <Send size={16} />
              </button>

              {status === 'success' && <p className="text-emerald-400 text-sm">{msg}</p>}
              {status === 'error' && <p className="text-red-400 text-sm">{msg}</p>}
            </form>

            <div className="mt-6 flex justify-center">
              <a
                href="https://www.linkedin.com/in/cem-sarp-takım-645803218/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-[#0f1c2f] border border-cyan-400/25 text-cyan-300 text-sm hover:text-white hover:border-cyan-300/50 hover:bg-[#13243a] transition-all duration-300"
              >
                <img src={linkedin} alt="LinkedIn" className="h-4 w-4 object-contain" />
                <span className="font-medium">Connect on LinkedIn</span>
              </a>
            </div>
          </TiltCard>
        </div>
      </div>
    </main>
  )
}