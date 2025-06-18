# fcRivals Landing Page

This is the source code for the **fcRivals landing page**, built with **Vite**, **React**, and **TypeScript**, deployed via **GitHub Pages** with a custom domain.

## 🚀 Live Site

**Custom Domain**: [https://start.fcrivals.com/](https://start.fcrivals.com/)

**GitHub Pages URL**: [https://andreyb.github.io/fcrivals-lp/](https://andreyb.github.io/fcrivals-lp/)

---

## 🛠️ Development Setup

### Prerequisites
- Node.js 20+ and npm
- Git
- Docker (for dev container) or VS Code with Dev Containers extension

### Option A: Dev Container (Recommended)
This project includes a dev container configuration for consistent development environments.

1. **Clone the repository:**
```bash
git clone https://github.com/andreyb/fcrivals-lp.git
cd fcrivals-lp
```

2. **Open in VS Code and start dev container:**
   - Open the project in VS Code
   - VS Code will prompt to "Reopen in Container" or use `Ctrl+Shift+P` → "Dev Containers: Reopen in Container"
   - The container will automatically set up Node.js 20 and configure git with your credentials

3. **Install dependencies and start:**
```bash
npm install
npm run dev
```

### Option B: Local Development
1. **Clone and Install:**
```bash
git clone https://github.com/andreyb/fcrivals-lp.git
cd fcrivals-lp
npm install
```

2. **Start Development Server:**
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Dev Container Notes
- **Git Configuration**: The dev container automatically configures git with the credentials specified in `.devcontainer/devcontainer.json`
- **Isolated Environment**: The container provides a consistent Node.js 20 environment regardless of your host system
- **Auto-setup**: Dependencies and git configuration are handled automatically on container creation

### 3. Project Structure
```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Site header
│   ├── Hero.tsx        # Hero section
│   └── ...
├── pages/              # Page components
│   ├── Index.tsx       # Homepage
│   └── NotFound.tsx    # 404 page
├── hooks/              # Custom React hooks
├── lib/                # Utilities
└── App.tsx            # Main app with routing
```

### 4. Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run deploy` - Manual deployment to GitHub Pages

---

## 🔐 Environment Variables & Secrets

### Required Environment Variables
The application uses the following environment variables for analytics and feature flagging:

```bash
VITE_PUBLIC_POSTHOG_KEY=your_posthog_project_key
VITE_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Local Development
For local development, create a `.env` file in the project root:

```bash
# .env
VITE_PUBLIC_POSTHOG_KEY=phc_your_development_key
VITE_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

⚠️ **Never commit `.env` files to version control**

### GitHub Actions Secrets
For automated deployments to work properly, configure the following secrets in your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following **Repository secrets**:

| Secret Name | Description | Required |
|-------------|-------------|----------|
| `VITE_PUBLIC_POSTHOG_KEY` | PostHog project API key | ✅ Yes |
| `VITE_PUBLIC_POSTHOG_HOST` | PostHog API host URL | ✅ Yes |

### PostHog Configuration
- **Analytics**: Tracks user interactions (CTA clicks, page views)
- **Feature Flags**: Powers A/B testing (currently testing hero headlines)
- **Setup**: Requires PostHog project with configured feature flags

For detailed PostHog implementation, see `docs/posthog-implementation.md`

---

## 🚀 Deployment

### Automated Deployment (Recommended)
Every push to the `main` branch automatically triggers deployment via GitHub Actions:

1. **Build Process**: Runs `vite build` to create optimized production files
2. **SPA Routing**: Copies `index.html` to `404.html` for client-side routing fallback
3. **Custom Domain**: Creates `CNAME` file with `start.fcrivals.com` for custom domain
4. **Deploy**: Publishes to `gh-pages` branch using GitHub Pages

**⏱️ Deployment Time**: ~2-3 minutes after push

### Manual Deployment
For immediate deployments or testing:

```bash
npm run deploy
```

This command performs the same steps as the automated workflow:
```bash
vite build && echo 'start.fcrivals.com' > dist/CNAME && cp dist/index.html dist/404.html && gh-pages -d dist
```

---

## ⚙️ GitHub Actions Workflow

**File**: `.github/workflows/deploy.yml`

**Triggers**: Push to `main` branch

**Steps**:
1. Checkout repository
2. Setup Node.js 20
3. Install dependencies (`npm ci`)
4. Build the site (`npm run build`)
5. Copy fallback for SPA routing
6. **Create CNAME for custom domain** ⚠️ *Critical for custom domain functionality*
7. Deploy to GitHub Pages using `peaceiris/actions-gh-pages@v3`

---

## 🔧 Configuration Details

### Custom Domain Setup
- **CNAME Record**: Points `start.fcrivals.com` to `andreyb.github.io`
- **CNAME File**: Created during build process with domain name
- **GitHub Pages**: Configured to serve from `gh-pages` branch

### Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  base: '/',  // Root path for custom domain
  // ... other config
})
```

### React Router
- Uses `<BrowserRouter>` (no basename needed for custom domain)
- 404 fallback handles client-side routing on page refresh
- All routes defined in `App.tsx`

### Tech Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router DOM
- **Deployment**: GitHub Pages + GitHub Actions

---

## 🔍 Troubleshooting

### Dev Container Issues
1. **Container won't start**: Ensure Docker is running and VS Code has Dev Containers extension
2. **Git not configured**: Rebuild container to apply git config from `devcontainer.json`
3. **Node version mismatch**: Container uses Node.js 20 - rebuild if issues persist
4. **File permission issues**: Try rebuilding container with "Dev Containers: Rebuild Container"

### Environment Variables
1. **PostHog not working locally**: Create `.env` file with PostHog credentials
2. **Analytics not tracking**: Check browser console for PostHog errors
3. **Feature flags not loading**: Verify PostHog secrets are set in GitHub repository settings
4. **Build missing env vars**: Ensure GitHub Actions secrets are properly configured

### Custom Domain Not Working
1. Check if `CNAME` file exists in deployed site
2. Verify DNS settings point to `andreyb.github.io`
3. Check GitHub Pages settings in repository

### Build Failures
1. Check GitHub Actions logs in "Actions" tab
2. Ensure all dependencies are properly installed
3. Test build locally: `npm run build`
4. Verify all required environment variables/secrets are set

### SPA Routing Issues
1. Verify `404.html` exists in deployed site
2. Check that it's identical to `index.html`

---

## ✅ Quick Start

To update the site:
1. Make your changes
2. Push to `main` branch
3. Wait ~2-3 minutes for automatic deployment
4. Check [https://start.fcrivals.com/](https://start.fcrivals.com/)

Everything else is handled automatically! 🎉
