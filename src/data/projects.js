// src/data/projects.js
import { MessageSquare, FileBarChart, Database } from 'lucide-react'
import pureReport from '../assets/pure-csr-report.pdf'

export const projects = [
  {
    id: 'mobile-messaging',
    title: 'Mobile Messaging App',
    href: 'https://github.com/CemSarp/Mobile-message-app',
    icon: MessageSquare,
    tags: ['React Native', 'MongoDB', 'JWT', 'WebSockets', 'Java'],
    summary:
      'Full-stack messaging app with a responsive iOS-focused UI and a scalable backend. Includes auth, E2E-like privacy, and live chat updates.',
    bullets: [
      'Built the UI using React Native for a responsive and intuitive iOS experience.',
      'MongoDB data layer tuned for fast reads/writes.',
      'JWT-based auth and end-to-end encrypted messaging to ensure privacy/security.',
      'Real-time chat via WebSockets with instant updates.',
    ],
  },
  {
    id: 'pure-research',
    title: 'Research Assistant – PURE Initiative, Sabancı University',
    icon: FileBarChart,
    tags: ['Research', 'Data', 'CSR', 'Python'],
    summary:
      'Data-driven research under Sabancı University’s PURE program on CSR communication during the 2023 Kahramanmaraş earthquake.',
    bullets: [
      'Scraped and labeled thousands of posts (Platform X).',
      'Mapped content types to engagement outcomes.',
      'Emotional storytelling + images improved trust and interaction.',
      'Produced actionable guidance for disaster-time CSR comms.',
    ],
    reportUrl: pureReport, // ✅ opens in browser
  },
  {
    id: 'xampp-mysql-marketplace',
    title: 'XAMPP MySQL Web App – Marketplace & Support',
    icon: Database,
    tags: [
      'PHP',
      'MySQL',
      'MongoDB',
      'XAMPP',
    ],
    summary:
      'Built a course project marketplace app with a normalized MySQL schema, stored procedures for safe transactions, and triggers for data integrity. Integrated a MongoDB support ticket system with status tracking and admin views.',
    bullets: [
      'Relational model: Users, Vehicles, Listings, Prices, Photos.',
      'Stored procedures handle create/update actions transaction-safely.',
      'Triggers enforce rules and log changes.',
      'Support ticket system (MongoDB): lifecycle, comments, filtering.',
      'Admin & support views: filter tickets by status, view, update, comment and close them.',
    ],
  },
]
