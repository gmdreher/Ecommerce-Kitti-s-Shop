const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

  const CreateAdoption = sequelize.define('createAdoption', {
    quantity: {
      type: DataTypes.INTEGER
    },
    reason: {
      type: DataTypes.STRING,
      
    },
    condition:{
      type: DataTypes.STRING,
    },
    state:{
        type: DataTypes.ENUM(['Creada','Aprobada','Adoptado','Cancelado'])
    }, 
    photo:{
      type: DataTypes.BLOB
    }
  });
};