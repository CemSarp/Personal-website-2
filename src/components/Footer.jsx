export default function Footer() {
  const Item = ({ href, children, to }) =>
    href ? (
      <a href={href} target="_blank" rel="noreferrer" className="text-body/80 hover:text-[var(--accent)]">
        {children}
      </a>
    ) : (
      <button onClick={() => {
        if (to === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          const el = document.getElementById(to)
          if (el) {
            const header = document.querySelector('header')
            const offset = header ? header.getBoundingClientRect().height : 0
            const y = el.getBoundingClientRect().top + window.pageYOffset - offset - 8
            window.scrollTo({ top: y, behavior: 'smooth' })
          }
        }
      }} className="text-body/80 hover:text-[var(--accent)]">
        {children}
      </button>
    )
  return (
    <footer className="glass">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 text-center text-xs sm:text-sm text-body/80 space-y-3">
        <nav className="flex items-center justify-center gap-4 flex-wrap">
          <Item to="home">Home</Item>
          <Item to="about">About</Item>
          <Item to="projects">Projects</Item>
          <Item to="contact">Contact</Item>
        </nav>
        <p>Built with React. © 2025 Cem Sarp</p>
      </div>
    </footer>
  )
}
