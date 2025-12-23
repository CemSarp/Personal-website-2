# Cem Sarp Takım — Modern React Portfolio

A full redesign of the original static site using **React + Vite + Tailwind + Framer Motion**.
- **Animations**: smooth page/section reveals and a dynamic gradient background
- **Colorful & modern**: glassmorphism cards, hover glow accents
- **Routing**: `/`, `/about`, `/projects`, `/contact`
- **Content**: *All text preserved exactly from the original site*

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this folder to a new GitHub repo.
2. On https://vercel.com, **New Project → Import GitHub Repo**.
3. Framework preset: **Vite**.
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Deploy. (Add your custom domain if needed.)

> Note: A `CNAME` file is not used on Vercel. Configure your domain in the Vercel dashboard.
