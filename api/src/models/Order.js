const { DataTypes } = require('sequelize');
//carrito/orden

module.exports = (sequelize) => {
  const Order = sequelize.define('order', {
    state: {
      type: DataTypes.ENUM(["carrito", "creada", "procesando", "confirmado", "enviado", "cancelada", "completa"])
    },
    payment_status: {
      type: DataTypes.STRING,
      allowNull: true,
  },
  });
};