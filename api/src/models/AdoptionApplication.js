const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

  const AdoptionApplication = sequelize.define('adoptionApplication', {
    condition:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    state:{
        type: DataTypes.ENUM(['Creada','Aprobada'])
    }
  });
};