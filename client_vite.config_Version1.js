import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For local development the proxy forwards /api requests to the backend on port 3000
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})