const { DataTypes } = require('sequelize');
//carrito/orden

module.exports = (sequelize) => {
  const DescuentoGeneral = sequelize.define('DescuentoGeneral', {
  monto: {
      type: DataTypes.STRING,
      allowNull: true,
  },
  porcentaje:{
    type: DataTypes.STRING,
    allowNull: true
  }
  });
};

