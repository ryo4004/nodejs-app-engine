import express from 'express'

import { mainConcert } from './asset/concert/main'
import { miniConcert } from './asset/concert/mini'
import { otherConcert } from './asset/concert/other'

import type { Concert } from './asset/types/types'

const router = express.Router()

router.get('/', function (req, res) {
  res.send('respond with a resource')
})

router.get('/concert', (req, res) => {
  const mainConcertList = mainConcert()
  const miniConcertList = miniConcert()
  const otherConcertList = otherConcert()

  const concertList = [mainConcertList, miniConcertList, otherConcertList]
    .flat()
    .sort((a: Concert, b: Concert) => a.time.timestamp - b.time.timestamp)
  return res.status(200).json({ status: true, list: concertList })
})

export default router
