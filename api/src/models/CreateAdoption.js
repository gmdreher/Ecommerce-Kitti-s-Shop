const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

  const CreateAdoption = sequelize.define('createAdoption', {
    condition: {
      type: DataTypes.STRING
    },
    reason: {
      type: DataTypes.STRING,
      
    },
    contact:{
      type: DataTypes.STRING,
    },
    state:{
        type: DataTypes.ENUM(['Creada','Aprobada','Adoptado','Cancelado'])
    },
    province:{
        type: DataTypes.STRING,
    },  
    photo:{
      type: DataTypes.BLOB
    }
  });
};