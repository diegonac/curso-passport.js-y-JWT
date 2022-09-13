import { Model, DataTypes, Sequelize } from "sequelize";

// Importamos los nombres de las tablas que se van a relacionar:
import { ORDER_TABLE } from "./ordenes.model.js";
import { PRODUCT_TABLE } from "./productos.model.js";

// Creamos variable con nombre de la tabla intermediaria:
const ORDER_PRODUCT_TABLE = "ordenes_productos";


// Creamos schema de la tabla intermediaria:
const OrderProductSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    unique: true,
  },
  Cantidad: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  // Agregamos los 2 id de las tablas que se van a relacionar:
  ordenId: {
    field: "orden_id",
    allowNull: false,
    type: DataTypes.STRING,
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
};

// Creamos la clase de la tabla intermediaria:
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

// Exportamos:
export { ORDER_PRODUCT_TABLE, OrderProductSchema, OrderProduct };
