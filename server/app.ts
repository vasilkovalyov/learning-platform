import express, { Request, Response, Express, NextFunction } from 'express'
import next from 'next'
import database from './database'
import errorMiddleware from './middleware/error.middleware'
const cors = require('cors')
const bodyParser = require('body-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const PORT = process.env.PORT || 3000

import authRoute from './routes/auth.route'
import studentRoute from './routes/student.route'
import teacherRoute from './routes/teacher.route'
;(async () => {
  try {
    await app.prepare()

    const server: Express = express()
    server.use(bodyParser.json())
    server.use(cors({ credentials: true, origin: process.env.API_URL }))
    server.use(express.json())
    server.use(express.urlencoded({ extended: true }))

    server.all('*', (req: Request, res: Response, next: NextFunction) => {
      if (req.url.startsWith('/api')) return next()
      return handle(req, res)
    })

    server.use('/api', authRoute)
    server.use('/api', studentRoute)
    server.use('/api', teacherRoute)
    server.use(errorMiddleware)

    database()
      .then((response) => {
        server.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))
      })
      .catch((e) => console.log(e))
  } catch (e) {
    process.exit(1)
  }
})()
