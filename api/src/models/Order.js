const { DataTypes } = require('sequelize');
//carrito/orden
module.exports = (sequelize) => {
    const Order = sequelize.define('order', {
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      state: {
        type: DataTypes.ENUM(["carrito", "creada", "procesando", "cancelada", "completa"])
      },
      quantity: {
          type: DataTypes.INTEGER,
          allowNull: false
      },

    },);
  };