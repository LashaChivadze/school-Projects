import { readdirSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

function collectHtmlFiles(directory) {
  return readdirSync(resolve(rootDir, directory)).flatMap((entry) => {
    const relativePath = `${directory}/${entry}`
    const absolutePath = resolve(rootDir, relativePath)

    if (statSync(absolutePath).isDirectory()) {
      return collectHtmlFiles(relativePath)
    }

    return entry.endsWith('.html') ? [relativePath] : []
  })
}

const htmlFiles = ['index.html', ...collectHtmlFiles('pages'), ...collectHtmlFiles('blog')]
const input = Object.fromEntries(
  htmlFiles.map((file) => [
    file.replace(/\.html$/, '').replace(/[^a-zA-Z0-9]/g, '_'),
    resolve(rootDir, file)
  ])
)

export default defineConfig({
  base: ' /school-Projects/LashaChivadze/school-Projects',
  root: '.',
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      input,
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  },
  server: {
    port: 3000,
    open: false
  }
})
