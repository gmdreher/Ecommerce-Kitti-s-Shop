const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isAlpha:{
          msg:"El Nombre solo puede contener letras"
        },
        len:{
          args:[2,255],
          msg:"El nombre debe tener minimo DOS(2) caracteres"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
              msg: "Debe ingresar un correo válido"   
        }
      }
    },
    password: {
      type: DataTypes.STRING(64),
      is: /^[0-9a-f]{64}$/i
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false

    }
  })
};

