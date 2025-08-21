import { useEffect, useState } from 'react'

export default function ThemeSwitch() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains('theme-light') ? 'light' : 'dark'
  )

  useEffect(() => {
    document.documentElement.classList.remove('theme-light', 'theme-dark')
    document.documentElement.classList.add(theme === 'light' ? 'theme-light' : 'theme-dark')
    try { localStorage.setItem('theme', theme) } catch {}
  }, [theme])

  const toggle = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  const isLight = theme === 'light'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      aria-pressed={isLight}
      className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-50 rounded-full border px-3 py-2 md:px-3.5 md:py-2.5 glass shadow-soft flex items-center gap-2 theme-toggle"
      style={{ minWidth: 44, minHeight: 44 }}
    >
      {isLight ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" stroke="currentColor" strokeWidth="1.7"/>
          <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
                stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      <span className="hidden sm:inline text-sm">
        {isLight ? 'Light' : 'Dark'}
      </span>
    </button>
  )
}
