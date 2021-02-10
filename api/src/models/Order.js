const { DataTypes } = require('sequelize');
//carrito/orden

module.exports = (sequelize) => {
  const Order = sequelize.define('order', {
    state: {
      type: DataTypes.ENUM,
      values: ["carrito", "creada", "procesando", "cancelada", "completa"]
    },
  });
};