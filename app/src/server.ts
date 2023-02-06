import express, { type NextFunction, type Request, type Response } from 'express'
import 'express-async-errors'
import { routes } from './routes'

const app = express()
app.use(express.json())
app.use(routes)

app.get('/ping', (req, res) => {
  return res.json({
    message: 'pong!'
  })
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      message: err.message
    })
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

app.listen(3000, () => { console.log('Server is running!') })
