const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

  const ReviewApprovedAdoption = sequelize.define('reviewApprovedAdoption', {
    condition:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    address:{
      type: DataTypes.STRING,
    },
    state:{
        type: DataTypes.ENUM(['Creada','Aprobada','En proceso','Adoptado','Cancelado'])
    }
  });
};