import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import path from 'path'

export default defineConfig({
  root: '.',
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'dist-agencia',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        app: path.resolve(__dirname, 'agencia.html'),
      },
    },
  },
})
