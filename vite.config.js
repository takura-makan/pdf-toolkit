import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  publicDir: false, // ← これで画像の自動コピーを完全に止めます
  build: {
    outDir: 'clasp',
    emptyOutDir: false
  }
})