import Sequelize from 'sequelize'

const model = (sequelize, DataTypes) => {
  let Repentance = sequelize.define('Repentance', {
    uuid: {
      type: DataTypes.UUID,
			primaryKey: true,
      unique: true,
      defaultValue: Sequelize.UUIDV1
    },
    details: {
      type: DataTypes.TEXT
    },
  })

  Repentance.associate = (models) => {
    Repentance.hasMany(models.Vote, { as: 'votes', foreignKey: 'repentanceUUID' })
  }

  return Repentance
}

export default model