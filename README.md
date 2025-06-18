# fcRivals Landing Page

This is the source code for the **fcRivals landing page**, built with **Vite**, **React**, and deployed via **GitHub Pages** with a custom domain.

---

## 🚀 Live Site

**Custom Domain**: [https://start.fcrivals.com/](https://start.fcrivals.com/)

**GitHub Pages URL**: [https://andreyb.github.io/fcrivals-lp/](https://andreyb.github.io/fcrivals-lp/)

---

## 🛠️ Development Setup (in GitHub Codespaces or Locally)

### 1. Start the dev server

```bash
npm install
npm run dev
```

### 2. Edit your files

* Code lives in `src/`
* Pages like the homepage or 404 are in `src/pages/`
* Routing is defined in `App.tsx`

---

## 🔁 How Deployment Works (Automated)

Whenever you push to the `main` branch:

1. GitHub Actions will automatically:

   * Build the app (`vite build`)
   * Copy `index.html` to `404.html` for SPA routing
   * Deploy contents of `/dist` to the `gh-pages` branch
   * Serve the site at `start.fcrivals.com` via custom domain

---

## 🧑‍💻 Manual Deploy (if needed)

If you ever need to deploy manually:

```bash
npm run deploy
```

This command will:
* Build the app
* Create CNAME file for custom domain
* Copy fallback 404 page
* Deploy using gh-pages

---

## ⚙️ GitHub Action Workflow

Stored in `.github/workflows/deploy.yml`, it automatically:

* Installs dependencies
* Builds the site
* Copies the fallback 404 page
* Deploys using `peaceiris/actions-gh-pages@v3`

---

## 🧩 Configuration Notes

* `vite.config.ts` uses `base: '/'` for custom domain setup
* React Router uses standard `<BrowserRouter>` (no basename needed for custom domain)
* Custom domain `start.fcrivals.com` is configured via CNAME file
* Static assets are placed in `dist/assets/` during build

---

## ✅ You're all set

To update the site, **just push to `main`**. Everything else is automatic!
