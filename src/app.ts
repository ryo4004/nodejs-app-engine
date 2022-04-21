import express, { RequestHandler } from 'express'
import crypto from "crypto"
import { Datastore } from '@google-cloud/datastore'

import * as lib from './server/library'

const app = express()

app.use(express.json() as RequestHandler)
app.use(express.urlencoded({ extended: true }) as RequestHandler)

const datastore = new Datastore({
  projectId: 'upheld-beach-347714',
})

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

const insertVisit = visit => {
  return datastore.save({
    key: datastore.key('visit'),
    data: visit,
  });
};

const getVisits = () => {
  const query = datastore
    .createQuery('visit')
    .order('timestamp', {descending: true})
    .limit(10);

  return datastore.runQuery(query);
};

app.get('/access', async (req, res, next) => {
  const visit = {
    timestamp: new Date(),
    userIp: crypto.createHash('sha256').update(req.ip).digest('hex').substr(0, 7),
  }

  try {
    await insertVisit(visit)
    const [entities] = await getVisits()
    const visits = entities.map((entity) => `Time: ${entity.timestamp}, AddrHash: ${entity.userIp}`)
    res
      .status(200)
      .set('Content-Type', 'text/plain')
      .send(`Last 10 visits:\n${visits.join('\n')}`)
      .end()
  } catch (error) {
    next(error)
  }
})

app.listen(process.env.PORT || 8080)
