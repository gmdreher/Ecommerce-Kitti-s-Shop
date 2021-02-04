const { DataTypes } = require('sequelize');
const authConfig = require('../config/auth');
const bcrypt = require('bcrypt');

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
  const setSaltAndPassword = async function(user) {
    if (user.changed('password')) {
      const salt = bcrypt.genSaltSync(+authConfig.rounds);
      user.password = bcrypt.hashSync(user.password, salt);
    }
  };

  User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  User.beforeCreate(setSaltAndPassword);
  User.beforeUpdate(setSaltAndPassword);

  return User;
};



