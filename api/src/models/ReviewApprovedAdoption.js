const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

  const ReviewApprovedAdoption = sequelize.define('reviewApprovedAdoption', {
    address:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    state:{
        type: DataTypes.ENUM(['En proceso','Adoptado','Cancelado'])
    }
  });
};