import { Router } from 'router'

import db from '../../database'

const router = Router()
const { Repentance, Vote } = db

router.route('/')
  .get(async (req, res) => {

  })

router.route('/:uuid/vote')
  .post(async (req, res) => {
    const { uuid } = req.params
    const { type, score } = req.body

    if (type !== 'BEST')
      return res.json({ err: 21 })

    if (score < -1 || score > 1)
      return res.json({ err: 13 })

    try {
      const repentance = await Repentance.findOne({ where: { uuid } })

      if (!repentance)
        return res.json({ err: 22 })

      try {
        const vote = await Vote.findOne({ where: { type, repentanceUUID: uuid } })

        try {
          if (!vote)
            await Vote.create({ type, score, repentanceUUID: uuid })
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
      res.json({ err: 23 })
    }
  })

export default router