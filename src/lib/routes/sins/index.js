import { Router } from '../repentance/node_modules/router'

import db from '../../database'

const router = Router()
const { Sin, Vote } = db

router.route('/')
  .get(async (req, res) => {

  })

router.route('/:uuid/vote')
  .post(async (req, res) => {
    const { uuid } = req.params
    const { type, score } = req.body

    if (type !== 'COMMON' && type !== 'DEADLIEST')
      return res.json({ err: 12 })

    if (score < -1 || score > 1)
      return res.json({ err: 13 })

    try {
      const sin = await Sin.findOne({ where: { uuid } })

      if (!sin)
        return res.json({ err: 15 })

      try {
        const vote = await Vote.findOne({ where: { type, sinUUID: uuid } })

        try {
          if (!vote)
            await Vote.create({ type, score, sinUUID: uuid })
        } catch (err) {
          res.json({ err: 17 })
        }

        try {
          if (vote) {
            vote.score = score
            vote.type = type
            await vote.save()
          }
        } catch (err) {
          res.json({ err: 18 })
        }

        res.json({})
      } catch (err) {
        res.json({ err: 16 })
      }
    } catch (err) {
      res.json({ err: 14 })
    }
  })

export default router