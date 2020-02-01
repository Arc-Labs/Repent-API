import Sequelize from 'sequelize'

const model = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    uuid: {
      type: DataTypes.UUID,
			primaryKey: true,
      unique: true,
      defaultValue: Sequelize.UUIDV1
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.TEXT('long')
    }
  })

  User.associate = (models) => {
    User.hasMany(models.Ip, { as: 'ips', foreignKey: 'userUUID' })
    User.hasMany(models.Vote, { as: 'votes', foreignKey: 'userUUID' })
  }

  return User
}

export default model