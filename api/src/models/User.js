const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    fullname:{
        type: DataTypes.STRING,
    allowNull: false,     
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validation:{
          isEmail:true,
      },
    },
    password: {
        type: DataTypes.STRING(64),
        is: /^[0-9a-f]{64}$/i
    },
    rol:{
        type: DataTypes.STRING,
        allowNull:false
    }
  });
};