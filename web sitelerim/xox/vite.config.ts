import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-redirects',
      closeBundle() {
        try {
          mkdirSync(resolve(__dirname, 'dist'), { recursive: true })
          copyFileSync(
            resolve(__dirname, 'public/_redirects'),
            resolve(__dirname, 'dist/_redirects')
          )
        } catch (error) {
          console.log('_redirects copy skipped or completed')
        }
      },
    },
  ],
})
