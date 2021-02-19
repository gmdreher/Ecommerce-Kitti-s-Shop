const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

  const CreateAdoption = sequelize.define('createAdoption', {
    condition: {
      type: DataTypes.TEXT
    },
    reason: {
      type: DataTypes.TEXT,

    },
    contact: {
      type: DataTypes.TEXT,
    },
    state: {
      type: DataTypes.ENUM(['Creada', 'Aprobada', 'Adoptado', 'Cancelado'])
    },
    province: {
      type: DataTypes.TEXT,
    },
    photo: {
      type: DataTypes.BLOB
    }
  });
};