const { DataTypes } = require('sequelize');
//carrito/orden

module.exports = (sequelize) => {
    const Order = sequelize.define('order', {
      state: {
        type: DataTypes.ENUM(["Carrito", "Creada", "Procesando", "Cancelada", "Completa"])
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
      
      
    },);
  };