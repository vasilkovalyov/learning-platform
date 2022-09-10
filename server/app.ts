import { Request, Response, Express } from 'express'
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors')

dotenv.config()

const BuildClientPath = path.join(__dirname, '/client/build')

const app: Express = express()
app.use(cors())
const port = process.env.PORT || 9000

app.use(express.static(BuildClientPath))

app.get('/api', (req:Request, res:Response) => {
  res.send('Express + TypeScript Server12')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
