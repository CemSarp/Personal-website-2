/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial']
      },
      colors: {
        // Softer dark theme + clear text hierarchy
        ink: '#121417',       // panels / strokes
        paper: '#1e1e22',     // page background (dark gray, not black)
        body: '#e5e7eb',      // warmer off-white for paragraph/body
        heading: '#ffffff',   // pure white for headings

        // Accents
        primary: '#18BC9C',   // teal (kept)
        neon: '#64ffda',      // used subtly
        sky: '#33b1ff',       // mix this more
        violet: '#9b59b6'     // and this too
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.15)',
        glow: '0 0 0 6px rgba(24,188,156,0.20)'
      }
    }
  },
  plugins: []
}
