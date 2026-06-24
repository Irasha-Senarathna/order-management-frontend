const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

const port = process.env.PORT || 5000
const distDir = path.join(__dirname, 'dist')
const indexFile = path.join(distDir, 'index.html')

function contentType(filePath) {
  if (filePath.endsWith('.js')) return 'text/javascript; charset=utf-8'
  if (filePath.endsWith('.css')) return 'text/css; charset=utf-8'
  if (filePath.endsWith('.svg')) return 'image/svg+xml'
  if (filePath.endsWith('.png')) return 'image/png'
  if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) return 'image/jpeg'
  if (filePath.endsWith('.ico')) return 'image/x-icon'
  if (filePath.endsWith('.html')) return 'text/html; charset=utf-8'
  return 'application/octet-stream'
}

function send(res, statusCode, body, headers = {}) {
  res.writeHead(statusCode, { 'Content-Type': 'text/plain; charset=utf-8', ...headers })
  res.end(body)
}

const server = http.createServer((req, res) => {
  if (!fs.existsSync(indexFile)) {
    send(
      res,
      500,
      'Build output not found. Run npm run build before starting the server.',
    )
    return
  }

  const requestPath = decodeURIComponent((req.url || '/').split('?')[0])
  const safePath = requestPath === '/' ? 'index.html' : requestPath.replace(/^\/+/, '')
  const filePath = path.join(distDir, safePath)

  const resolvedPath = fs.existsSync(filePath) && fs.statSync(filePath).isFile()
    ? filePath
    : indexFile

  fs.readFile(resolvedPath, (error, fileContent) => {
    if (error) {
      send(res, 500, 'Failed to read build output.')
      return
    }

    res.writeHead(200, { 'Content-Type': contentType(resolvedPath) })
    res.end(fileContent)
  })
})

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})