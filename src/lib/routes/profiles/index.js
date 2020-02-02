import { Router } from 'express'

import db from '../../database'
import { session } from '../../utils'

const router = Router()
const { User } = db

router.use(session(true))

router.route('/me')
  .post(async (req, res) => {
    try {
      const { name, photo } = req.body
      const user = await User.findOne({ where: { uuid: req.session.uuid } })

      if (!user)
        return res.json({ err: 25 })

      if (!name.match(/^[A-Za-z]+$/))
        return res.json({ err: 26 })

      if (name.length < 2)
        return res.json({ err: 0 })

      user.name = name

      try {
        await user.save()

        if (photo) {
          // AWS S3 Base64 Save
          // https://medium.com/@mayneweb/upload-a-base64-image-data-from-nodejs-to-aws-s3-bucket-6c1bd945420f
        }
        
        res.json({})
      } catch (err) {
        res.json({ err: 27 })
      }
    } catch (err) {
      res.json({ err: 24 })
    }
  })

router.route('/:uuid')
  .get(async (req, res) => {

  })

export default router