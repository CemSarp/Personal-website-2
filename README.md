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

## Deploy to Vercel (recommended)

1. Push this folder to a new GitHub repo.
2. On https://vercel.com, **New Project → Import GitHub Repo**.
3. Framework preset: **Vite**.
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Deploy. (Add your custom domain if needed.)

> Note: A `CNAME` file is not used on Vercel. Configure your domain in the Vercel dashboard.

## Deploy to GitHub Pages (optional)

### Option A — GitHub Actions
Use a Vite + Pages action (e.g. `peaceiris/actions-gh-pages`).

### Option B — gh-pages CLI
```bash
npm i -D gh-pages
# add to package.json:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"
npm run deploy
```

If you keep using a custom domain on GitHub Pages, add a `CNAME` file into `public/` containing your domain (e.g., `www.cemsarptakim.com`).

## Assets
- Images and PDF are under `src/assets/` (except `favicon.png` which is under `public/`)
- Form uses your original Formspree endpoint.
