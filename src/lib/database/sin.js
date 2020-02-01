import Sequelize from 'sequelize'

const model = (sequelize, DataTypes) => {
  let Sin = sequelize.define('Sin', {
    uuid: {
      type: DataTypes.UUID,
			primaryKey: true,
      unique: true,
      defaultValue: Sequelize.UUIDV1
    },
    name: {
      type: DataTypes.STRING
    }
  })

  Sin.associate = (models) => {
    Sin.hasMany(models.Scenario, { as: 'scenarios', foreignKey: 'sinUUID' })
    Sin.hasMany(models.Vote, { as: 'votes', foreignKey: 'sinUUID' })
  }

  return Sin
}

export default model