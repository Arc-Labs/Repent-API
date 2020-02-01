import Sequelize from 'sequelize'

const model = (sequelize, DataTypes) => {
  let Scenario = sequelize.define('Scenario', {
    uuid: {
      type: DataTypes.UUID,
			primaryKey: true,
      unique: true,
      defaultValue: Sequelize.UUIDV1
    },
    details: {
      type: DataTypes.TEXT
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })

  Scenario.associate = (models) => {
    Scenario.hasMany(models.Repentance, { as: 'repentances', foreignKey: 'scenarioUUID' })
    Scenario.hasMany(models.Vote, { as: 'votes', foreignKey: 'scenarioUUID' })
  }

  return Scenario
}

export default model