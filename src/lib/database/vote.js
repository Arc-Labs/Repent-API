import Sequelize from 'sequelize'

const model = (sequelize, DataTypes) => {
  let Vote = sequelize.define('Vote', {
    uuid: {
      type: DataTypes.UUID,
			primaryKey: true,
      unique: true,
      defaultValue: Sequelize.UUIDV1
    },
    score: {
      type: DataTypes.INTEGER
    },
    type: {
      type: DataTypes.ENUM('BEST', 'COMMON', 'DEADLIEST')
    }
  })

  Vote.associate = (models) => {
    Vote.hasMany(models.Scenario, { as: 'scenarios', foreignKey: 'VoteUUID' })
    Vote.hasMany(models.Vote, { as: 'votes', foreignKey: 'VoteUUID' })
  }

  return Vote
}

export default model