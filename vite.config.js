import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// `base` is '/' by default (the local preview + cloudflare tunnel serve the site
// from the domain root). GitHub Pages serves the project from /curve-agency-website/,
// so that build is run with VITE_BASE=/curve-agency-website/ — otherwise every
// /assets/... URL 404s on Pages.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  preview: {
    allowedHosts: true,
  },
  server: {
    allowedHosts: true,
  }
})
