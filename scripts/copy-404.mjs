import { copyFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const indexHtml = join(projectRoot, 'dist', 'index.html')
const notFoundHtml = join(projectRoot, 'dist', '404.html')

if (!existsSync(indexHtml)) {
  console.error('dist/index.html tidak ditemukan. Jalankan `npm run build` dulu.')
  process.exit(1)
}

copyFileSync(indexHtml, notFoundHtml)
console.log('dist/404.html dibuat (salinan index.html untuk fallback SPA GitHub Pages).')
