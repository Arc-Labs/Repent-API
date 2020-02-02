import async from 'async'
import { Router } from 'express'

import db from '../../database'
import { session } from '../../utils'

const router = Router()
const { Sin, Vote } = db

router.use(session(true))

router.route('/')
  .get(async (req, res) => {
    try {
      const { sort } = req.params
      let { page } = req.params

      if (!page)
        page = 0

      if (sort !== 'COMMON' && sort !== 'DEADLIEST')
        return res.json({ err: 28 })

      const sins = await Sin.findAll({})

      for (let x = 0; x < sins.length; x++)
        sins[x] = sins[x].get({ plain: true })

      const sinsWithVotes = async.eachSeries(sins, async (sin, next) => {
        try {
          const votes = await Vote.findAll({ where: { sinUUID: sin.uuid }})
          sin.commonVotes = 0
          sin.deadlyVotes = 0

          for (let x = 0; x < votes.length; x++)
            if (votes[x].type === 'COMMON')
              sin.commonVotes += votes[x].score
            else if (votes[x].type === 'DEADLIEST')
              sin.deadlyVotes += votes[x].score

          next()
        } catch (err) {
          sin = undefined
          next()
        }
      }, async err => {
        if (err)
          return res.json({ err: 30 })

        console.log(sinsWithvotes)
      })
    } catch (err) {
      res.json({ err: 29 })
    }
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