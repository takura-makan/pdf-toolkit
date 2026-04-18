import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'clasp',
    emptyOutDir: false  // ← これを追加（勝手に中身を消さないでという指示）
  }
})