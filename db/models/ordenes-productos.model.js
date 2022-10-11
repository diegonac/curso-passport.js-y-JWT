import { Model, DataTypes, Sequelize } from "sequelize";
import { ORDER_TABLE } from "./ordenes.model.js";
import { PRODUCT_TABLE } from "./productos.model.js";

const ORDER_PRODUCT_TABLE = "ordenes_productos";


const OrderProductSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    unique: true,
  },
  cantidad: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  ordenId: {
    field: "orden_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  productoId: {
    field: "producto_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  precio: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
};

class OrderProduct extends Model {
  static associate (models) {
  };

  static config (sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: "OrderProduct",
      timestamps: false,
    };
  };
};

export { ORDER_PRODUCT_TABLE, OrderProductSchema, OrderProduct };
