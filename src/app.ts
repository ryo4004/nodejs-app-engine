import express, { RequestHandler } from 'express'
const app = express()

app.use(express.json() as RequestHandler)
app.use(express.urlencoded({ extended: true }) as RequestHandler)

// ルートアクセス
app.get('/', (req, res) => {
  console.log('[' + lib.showTime() + '] root access')
  res.redirect(301, 'https://zatsuzen.com')
})

const client = './client/build'
app.use('/', express.static(client))
app.use('/login', express.static(client))
app.use('/signup', express.static(client))
app.use('/payment', express.static(client))
app.use('/list', express.static(client))
app.use('/setting', express.static(client))
app.use('/setting/osaifuname', express.static(client))
app.use('/setting/rate', express.static(client))
app.use('/setting/connect', express.static(client))
app.use('/setting/disconnect', express.static(client))
app.use('/setting/username', express.static(client))
app.use('/setting/othername', express.static(client))
app.use('/setting/password', express.static(client))
app.use('/setting/userdelete', express.static(client))

import * as lib from './server/library'

// CORSを許可する
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.listen(process.env.PORT || 8080)
