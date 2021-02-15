const { DataTypes } = require('sequelize');
//carrito/orden

module.exports = (sequelize) => {
  const DescuentoGeneral = sequelize.define('DescuentoGeneral', {
  monto: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  porcentaje:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  duracion:{
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  estado:{
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
  });
};

