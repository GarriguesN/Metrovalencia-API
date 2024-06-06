import fs from 'fs';
import path from 'path';
import { defineNuxtConfig } from 'nuxt/config';

const sw = process.env.SW === 'true';

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'nuxt-primevue',
    "@vite-pwa/nuxt"
  ],
  primevue: {
    // Options
  },
  css: ['primevue/resources/themes/aura-light-noir/theme.css', '~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  pwa: {
    strategies: sw ? 'injectManifest' : 'generateSW',
    registerType: 'autoUpdate',
    srcDir: sw ? 'service-worker' : undefined,
    filename: sw ? 'sw.ts' : undefined,
    includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
    manifest: {
      name: 'MetroValencia Horarios',
      short_name: 'MVHorarios',
      description: 'Mejor aplicación para ver qué metro pasa en la parada seleccionada',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'icon192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icon512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'icon512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/, /^\/manifest.json$/],
      type: 'module',
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    https: {
      key: fs.readFileSync(path.resolve('/var/www/html/certs/key.pem')),
      cert: fs.readFileSync(path.resolve('/var/www/html/certs/cert.pem'))
    }
  }
});