import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Explicitly define environment variables for production builds
    'import.meta.env.VITE_PUBLIC_POSTHOG_KEY': JSON.stringify(process.env.VITE_PUBLIC_POSTHOG_KEY),
    'import.meta.env.VITE_PUBLIC_POSTHOG_HOST': JSON.stringify(process.env.VITE_PUBLIC_POSTHOG_HOST),
  },
}));