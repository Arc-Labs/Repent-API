import jwt from 'jsonwebtoken'

import { SECRET } from '../config'

export const session = (required = true) => {
  return (req, res, next) => {
    if (!req.headers.token)
      return res.json({ err: 403 })

    try {
      req.session = jwt.decode(req.headers.token, { json: true })
      next()
    } catch (err) {
      res.json({ err: 403 })
    }
  }
}

export const tokenize = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET, (err, token) => {
      if (err)
        return reject(err)

      resolve(token)
    })
  })
}