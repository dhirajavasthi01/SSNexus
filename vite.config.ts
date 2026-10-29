import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const apiProxy = {
  '/api': {
    target: 'http://127.0.0.1:8001',
    changeOrigin: true,
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { proxy: apiProxy },
  preview: { proxy: apiProxy },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'react'
          }
          if (id.includes('node_modules/react-router')) {
            return 'router'
          }
          if (id.includes('node_modules/@radix-ui') || id.includes('node_modules/react-hook-form') || id.includes('node_modules/zod')) {
            return 'forms'
          }
        },
      },
    },
  },
})
