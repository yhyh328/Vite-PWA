import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
		VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        "name": "김요한_2월_자율기사",
        "short_name": "김요한_2월_자율기사",
        "icons": [
          {
            "src": "/icons/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/icons/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          },
        ],
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#ffffff"
      },
      workbox: {
        runtimeCaching: [{
                urlPattern: /\.ico$/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'ico-cache',
                    expiration: {
                        maxEntries: 10, 
                        maxAgeSeconds: 60 * 60 * 24 * 365,  
                    }
                }
            },
            {
                urlPattern: /\.json$/,
                handler: 'StaleWhileRevalidate',
                options: {
                    cacheName: 'json-cache',
                    cacheableResponse: {
                        statuses: [200]
                    }
                },
            }
        ],
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})