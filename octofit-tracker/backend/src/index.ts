import express from 'express'
import { connectDatabase } from './config/database.js'
import { apiBaseUrl } from './config/api-url.js'
import apiRouter from './routes/index.js'

const app = express()
const port = 8000

app.use(express.json())
app.use('/api', apiRouter)

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl })
})

async function startServer(): Promise<void> {
  try {
    await connectDatabase()
    app.listen(port, () => {
      console.log(`OctoFit API listening at ${apiBaseUrl}`)
    })
  } catch (error) {
    console.error('Error connecting to octofit_db:', error)
    process.exit(1)
  }
}

void startServer()
