
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'https://chatify-7mge.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
