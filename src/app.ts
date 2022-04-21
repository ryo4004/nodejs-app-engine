import express, { RequestHandler } from 'express'
import * as lib from './server/library'

const app = express()

app.use(express.json() as RequestHandler)
app.use(express.urlencoded({ extended: true }) as RequestHandler)

// ルートアクセス
app.get('/', (req, res) => {
  console.log('[' + lib.showTime() + '] root access')
  res.redirect(301, 'https://zatsuzen.com')
})

// CORSを許可する
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.listen(process.env.PORT || 8080)
