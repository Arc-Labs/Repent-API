import fs from 'fs'
import path from 'path'

import Sequelize from 'sequelize'

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: process.cwd() + '/database.dat',
  dialectOptions: {
    ssl: true
  },
  pool: {
    max: 40,
    min: 0,
    idle: 10000
  }
})

let db = {}

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach((file) => {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db