import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/globals.css'

// ----- Set initial theme before React renders (no flash) -----
try {
  const saved = localStorage.getItem('theme') // 'light' | 'dark' | null
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const initial = saved ?? (prefersDark ? 'dark' : 'dark') // default to dark
  document.documentElement.classList.remove('theme-light', 'theme-dark')
  document.documentElement.classList.add(initial === 'light' ? 'theme-light' : 'theme-dark')
} catch { /* no-op */ }

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="bg-aurora"></div>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
