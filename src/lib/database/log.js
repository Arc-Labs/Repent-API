import Sequelize from 'sequelize'

const model = (sequelize, DataTypes) => {
  let Log = sequelize.define('Log', {
    uuid: {
      type: DataTypes.UUID,
			primaryKey: true,
      unique: true,
      defaultValue: Sequelize.UUIDV1
    },
    type: {
      type: DataTypes.ENUM('SUSPICIOUS', 'LOGIN_ATTEMPT', 'LOGIN')
    }
  })

  Log.associate = (models) => {
    Log.hasMany(models.Ip, { as: 'ip', foreignKey: 'logUUID' })
    //Log.hasMany(models.Attempt, { as: 'attempts', foreignKey: 'logUUID '})
  }

  return Log
}

export default model