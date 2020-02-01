import axios from 'axios'
import express from 'express'
import bodyParser from 'body-parser'

import db from './lib/database'
import routes from './lib/routes'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/v1/auth', routes.auth)
app.use('/v1/repentance', routes.repentance)
app.use('/v1/scenarios', routes.scenarios)
app.use('/v1/sins', routes.sins)

db.sequelize.authenticate().then(() => {
  return db.sequelize.sync({ force: false });
}).then(() => {
  app.listen(3000, '0.0.0.0', err => {
    if(err)
      throw err

    console.log('Server is now running on *:', (process.env.PORT || 3000))
  })
}).catch(err => {
  throw err
})