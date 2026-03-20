import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  clearScreen: false,

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },

  preview: {
    host: '127.0.0.1',
    port: 4173,
    strictPort: true,
  },

  build: {
    // Raise the warning threshold slightly — our vendor chunk is intentionally larger
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        /*
         * Manual chunk splitting:
         *   react-vendor — React runtime + router. These rarely change so they
         *                  get long-lived cache headers in production.
         * All other code (our components, data, hooks) stays in the main chunk,
         * which is small and changes with each deploy.
         */
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
