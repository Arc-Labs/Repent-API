import Sequelize from 'sequelize'

const model = (sequelize, DataTypes) => {
  let Attempt = sequelize.define('Attempt', {
    uuid: {
      type: DataTypes.UUID,
			primaryKey: true,
      unique: true,
      defaultValue: Sequelize.UUIDV1
    },
    
  })

  Attempt.associate = (models) => {
  }

  return Attempt
}

export default model