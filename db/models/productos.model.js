// Importamos lo siguiente:
import { Model, DataTypes, Sequelize } from "sequelize";

// Creamos una variable que va a guardar el nombre de la tabla que creará sequelize por nosotros:
const PRODUCT_TABLE = "productos";

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    unique: true,
  },
  Nombre: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  Precio: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
};

class Product extends Model {
  static associate() {

  };
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: "Product",
      timestamps: false
    };
  };
};

export { PRODUCT_TABLE, ProductSchema, Product };
