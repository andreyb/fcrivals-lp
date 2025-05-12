# fcRivals Landing Page

This is the source code for the **fcRivals landing page**, built with **Vite**, **React**, and deployed via **GitHub Pages**.

---

## 🚀 Live Site

[https://andreyb.github.io/fcrivals-lp/](https://andreyb.github.io/fcrivals-lp/)

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
   * Deploy contents of `/dist` to the `gh-pages` branch using the `gh-pages` package

---

## 🧑‍💻 Manual Deploy (if needed)

If you ever need to deploy manually:

```bash
npm run build
cp dist/index.html dist/404.html
npm run deploy
```

---

## ⚙️ GitHub Action Workflow

Stored in `.github/workflows/deploy.yml`, it automatically:

* Installs dependencies
* Builds the site
* Copies the fallback 404 page
* Deploys using `gh-pages`

---

## 🧩 Notes

* `vite.config.ts` sets `base: './'` because absolute paths caused issues with GitHub Pages subpath handling
* React Router uses `<BrowserRouter basename="/fcrivals-lp">`
* Static assets are placed in `dist/assets/` during build

---

## ✅ You're all set

To update the site, **just push to `main`**. Everything else is automatic!
