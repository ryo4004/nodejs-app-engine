import express, { RequestHandler } from 'express'
import crypto from 'crypto'

import * as lib from './server/library'
import * as visit from './server/visit'

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

app.get('/access', async (req, res, next) => {
  const data = {
    timestamp: new Date(),
    ip: crypto.createHash('sha256').update(req.ip).digest('hex'),
    updated: false,
  }

  try {
    await visit.insertVisit(data)
    const entities = await visit.getVisits()
    const visits = entities.map((entity) => {
      return `time: ${entity.timestamp}, ip: ${entity.ip}, id: ${entity._id}`
    })
    res
      .status(200)
      .set('Content-Type', 'text/plain')
      .send(`Last 10 visits:\n${visits.join('\n')}`)
      .end()
  } catch (error) {
    next(error)
  }
})

app.get('/update/:id', async (req, res) => {
  const { id } = req.params
  try {
    const visitData = await visit.getVisit(id)
    const newVisitData = {
      ...visitData,
      updated: true,
    }
    await visit.updateVisit(id, newVisitData)
    res.status(200).set('Content-Type', 'text/plain').send(`updated: ${id}`).end()
  } catch (err) {
    res.status(404).set('Content-Type', 'text/plain').send(`update not found`).end()
  }
})

app.get('/remove/:id', async (req, res) => {
  const { id } = req.params
  try {
    await visit.getVisit(id)
    await visit.removeVisits(id)
    res.status(200).set('Content-Type', 'text/plain').send(`removed: ${id}`).end()
  } catch (err) {
    res.status(404).set('Content-Type', 'text/plain').send(`remove not found`).end()
  }
})

app.listen(process.env.PORT || 8080)
