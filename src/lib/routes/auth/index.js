import { Router } from 'express'
import bcrypt from 'bcryptjs'

import db from '../../database'
import { tokenize } from '../../utils'

const router = Router()
const { User } = db

router.route('/register')
  .post(async (req, res) => {
    try {
      const { name, email, password } = req.body

      if (name.length < 2)
        return res.json({ err: 0 })
        
      if (await User.findOne({ where: { email: email.toLowerCase() }}))
        return res.json({ err: 1 })

      if (password.length < 6)
        return res.json({ err: 2 })

      try {
        const hash = await bcrypt.hash(password, 8)

        try {
          const User = await User.create({ name, email: email.toLowerCase(), password: hash })
          const profile = User.get({ plain: true })
          delete profile.password

          try {
            res.json({ profile, token: await tokenize(profile) })
          } catch (err) {
            res.json({ err: 6 })
          }
        } catch (err) {
          res.json({ err: 5 })
        }
      } catch (err) {
        res.json({ err: 4 })
      }
    } catch (err) {
      res.json({ err: 3 })
    }
  })

router.route('/login')
  .post(async (req, res) => {
    try {
      const { email, password } = req.body
      const User = await User.findOne({ where: { email: email.toLowerCase() }})

      if (!User)
        return res.json({ err: 7 })

      try {
        if (!await bcrypt.compare(password, User.password))
          return res.json({ err: 9 })
      } catch (err) {
        res.json({ err: 10 })
      }

      const profile = User.get({ plain: true })
      delete profile.password

      try {
        res.json({ profile, token: await tokenize(profile) })
      } catch (err) {
        res.json({ err: 11 })
      }
    } catch (err) {
      res.json({ err: 8 })
    }
  })

export default router