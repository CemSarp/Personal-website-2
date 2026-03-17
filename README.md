# Cem Sarp Takım — Personal Portfolio

A modern, interactive, and fully responsive personal portfolio website built to showcase my projects, experience, and skills. Designed with a sleek developer-focused aesthetic, featuring glassmorphism elements, terminal-like UI interactions, and a built-in local AI assistant.

## 🚀 Features

- **Modern Aesthetic**: Glassmorphism cards, glowing borders, smooth gradient backgrounds, and dynamic layouts.
- **Interactive UI**: Fluid animations powered by Framer Motion and custom CSS keyframes.
- **Developer-Centric Design**: Embedded terminal-like UI elements for the Experience and Projects sections.
- **Local AI Assistant (Cem-AI)**: A custom-built chatbot inside the UI that answers questions about my background and projects using local structured data.
- **3D Visuals**: Integration of Three.js and React Three Fiber for interactive background elements.
- **Fully Responsive**: Carefully optimized for seamless viewing across all desktop, tablet, and mobile devices.
- **Functional Contact Form**: Direct messaging form powered by the Formspree API.

## 🛠️ Tech Stack

- **Core**: React 18, Vite
- **Styling**: Tailwind CSS, PostCSS, Custom CSS
- **Routing**: React Router DOM (v6)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **3D Graphics**: Three.js, React Three Fiber
- **Analytics & Performance**: Vercel Analytics, Vercel Speed Insights

## 📂 Project Structure

```text
cem-sarp-portfolio/
├── public/                 # Static assets like favicon
├── src/
│   ├── assets/             # Images, PDFs, and local media
│   ├── chatbot/            # Local AI Assistant implementation (Cem-AI)
│   ├── components/         # Reusable UI components (Navbar, Footer, UI Effects)
│   ├── data/               # Structured local data for projects and experiences
│   ├── pages/              # Main route pages (Home, About, Experience, Projects, Contact)
│   ├── styles/             # Global CSS and structural styles
│   ├── App.jsx             # Main router configuration and layout wrapper
│   └── main.jsx            # Application entry point
├── index.html              # Entry HTML file
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite build configuration
└── package.json            # Node.js dependencies and scripts
```

## 💻 Local Development

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v16 or higher) and `npm` installed on your machine.

### Installation

1. Clone the repository (or download the source code):
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. Navigate into the project directory:
   ```bash
   cd cem-sarp-portfolio
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the local development server:
   ```bash
   npm run dev
   ```
   The site will be available locally, usually at `http://localhost:5173`.

## 📦 Build for Production

To create an optimized production build, run:

```bash
npm run build
```

The output will be generated inside the `dist` directory. To locally preview the production build, run:

```bash
npm run preview
```

## 🚀 Deployment

This project is optimized for out-of-the-box deployment on platforms like Vercel and Netlify.

### Deploying to Vercel (Recommended)

1. Push your repository to GitHub.
2. Log in to your [Vercel Dashboard](https://vercel.com/) and click **Add New > Project**.
3. Import your GitHub repository.
4. Select **Vite** as the Framework Preset (Vercel usually detects this automatically).
5. Ensure the Build Command is `npm run build` and the Output Directory is `dist`.
6. Click **Deploy**.

## 📬 Contact & Links

- **Name**: Cem Sarp Takım
- **LinkedIn**: [Connect on LinkedIn](https://www.linkedin.com/in/cem-sarp-takım-645803218/)
- **Contact Me**: Feel free to reach out via the Contact page on the site.
