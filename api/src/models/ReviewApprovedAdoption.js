const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

  const ReviewApprovedAdoption = sequelize.define('reviewApprovedAdoption', {
    condition: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
    },
    state: {
      type: DataTypes.ENUM(['Creada', 'Aprobada', 'En proceso', 'Adoptado', 'Cancelado'])
    },
    contact: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    province: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });
};