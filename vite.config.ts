import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite 설정 문서: https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/auti/',
})
