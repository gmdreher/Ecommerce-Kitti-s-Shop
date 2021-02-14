const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

  const CreateAdoption = sequelize.define('createAdoption', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    condition:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    state:{
        type: DataTypes.ENUM(['Creada','Aprobada'])
    }
  });
};