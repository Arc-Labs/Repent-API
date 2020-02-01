import Sequelize from 'sequelize'

const model = (sequelize, DataTypes) => {
  let Ip = sequelize.define('Ip', {
    uuid: {
      type: DataTypes.UUID,
			primaryKey: true,
      unique: true,
      defaultValue: Sequelize.UUIDV1
    },
    address: {
      type: DataTypes.STRING
    }
  })

  Ip.associate = (models) => {
  }

  return Ip
}

export default model