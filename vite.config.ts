import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { aeoDevApiPlugin } from './vite.aeo-dev-api'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), aeoDevApiPlugin()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group the entire 3D stack so it loads as one cached vendor chunk
            // and stays out of the eager bundle.
            if (
              id.includes('/three/') ||
              id.includes('three-stdlib') ||
              id.includes('@react-three/fiber') ||
              id.includes('@react-three/drei') ||
              id.includes('three-mesh-bvh') ||
              id.includes('zustand') ||
              id.includes('suspend-react') ||
              id.includes('its-fine') ||
              id.includes('scheduler') && false
            ) {
              return 'three-vendor'
            }
            if (id.includes('framer-motion')) return 'framer'
            if (id.includes('react-router')) return 'router'
            if (id.includes('@marsidev/react-turnstile')) return 'turnstile'
            if (id.includes('react-markdown') || id.includes('remark-') || id.includes('micromark')) return 'markdown'
          }
        },
      },
    },
  },
})
