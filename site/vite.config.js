import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { readFileSync, writeFileSync } from 'fs'
import process from 'node:process'

// Inline critical CSS and load the rest async (eliminates render-blocking stylesheet)
function viteCritters() {
  return {
    name: 'vite-critters',
    apply: 'build',
    async closeBundle() {
      const { default: Critters } = await import('critters')
      const critters = new Critters({
        path: path.resolve(process.cwd(), 'dist'),
        preload: 'swap',
        pruneSource: false,
        logLevel: 'silent',
      })
      const htmlPath = path.resolve(process.cwd(), 'dist/index.html')
      const html = readFileSync(htmlPath, 'utf-8')
      const result = await critters.process(html)
      writeFileSync(htmlPath, result)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteCritters()],
  server: {
    host: '0.0.0.0'
  }
})
