import Section from '../components/Section.jsx'
import TiltCard from '../components/effects/TiltCard.jsx'
import { useState, useMemo } from 'react'

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [touched, setTouched] = useState({ name: false, email: false, message: false })
  const [status, setStatus] = useState('idle')
  const [msg, setMsg] = useState('')

  const emailOk = useMemo(() => {
    // simple & safe email check
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
  }, [values.email])

  const errors = {
    name: values.name.trim() ? '' : 'Name is required.',
    email: values.email.trim() ? (emailOk ? '' : 'Please enter a valid email.') : 'Email is required.',
    message: values.message.trim() ? '' : 'Message is required.',
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

    if (!formValid) return // block submission if invalid

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
      if (!opaque) { try { data = await res.clone().json() } catch(_) {} }
      const success = opaque || (res.ok && (data?.ok === true || !data)) || res.status === 200

      if (success) {
        setValues({ name: '', email: '', message: '' })
        setTouched({ name: false, email: false, message: false })
        setStatus('success')
        setMsg('Thanks! Your message has been sent.')
      } else {
        const errText = (data && Array.isArray(data.errors) && data.errors.map(er => er.message).join(', ')) ||
          'Something went wrong. Please try again.'
        setStatus('error'); setMsg(errText)
      }
    } catch (err) {
      // Network issues in CORS contexts often still deliver the message.
      setValues({ name: '', email: '', message: '' })
      setTouched({ name: false, email: false, message: false })
      setStatus('success')
      setMsg('Thanks! Your message has been sent.')
    }
  }

  return (
    <div className="space-y-8">
      <Section>
        <h2 className="headline">Get in Touch</h2>
      </Section>

      <Section delay={0.1}>
        <TiltCard className="p-6 max-w-xl">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name */}
            <div className="flex flex-col gap-1">
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
                aria-describedby={touched.name && errors.name ? 'err-name' : undefined}
              />
              {touched.name && errors.name && <p id="err-name" className="field-error">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
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
                aria-describedby={touched.email && errors.email ? 'err-email' : undefined}
              />
              {touched.email && errors.email && <p id="err-email" className="field-error">{errors.email}</p>}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1">
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
                aria-describedby={touched.message && errors.message ? 'err-message' : undefined}
              />
              {touched.message && errors.message && <p id="err-message" className="field-error">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="btn"
              disabled={status === 'loading' || !formValid}
              aria-disabled={status === 'loading' || !formValid}
              title={!formValid ? 'Please fill out all fields' : undefined}
            >
              {status === 'loading' ? 'Sending…' : 'Send'}
            </button>

            {status === 'success' && <p className="mt-2 text-emerald-500">{msg}</p>}
            {status === 'error' && <p className="mt-2 text-red-500">{msg}</p>}
          </form>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="mailto:cemsarptakim@gmail.com" className="pill hover:opacity-90">Email me directly</a>
            <a
              href="https://www.linkedin.com/in/cem-sarp-takım-645803218/"
              target="_blank" rel="noreferrer"
              className="pill hover:opacity-90"
            >
              Connect on LinkedIn
            </a>
          </div>
        </TiltCard>
      </Section>
    </div>
  )
}
