import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ... your existing imports + app setup + /api routes ...

// Serve the built client
const clientDist = path.resolve(__dirname, '../client/dist')
app.use(express.static(clientDist))

// SPA fallback: anything NOT starting with /api should get index.html
app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'))
})