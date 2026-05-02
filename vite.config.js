import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const indexHtmlPath = path.join(__dirname, 'public', 'index.html')

export default defineConfig({
  appType: 'custom',
  publicDir: 'public',
  plugins: [
    {
      name: 'serve-canonical-index-html',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const pathname = (req.url || '/').split('?')[0]
          if (pathname !== '/' && pathname !== '/index.html') {
            next()
            return
          }

          res.statusCode = 200
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          fs.createReadStream(indexHtmlPath).pipe(res)
        })
      }
    }
  ]
})
