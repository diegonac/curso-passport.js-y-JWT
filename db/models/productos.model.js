import { Model, DataTypes, Sequelize } from "sequelize";

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
  Color: {
    allowNull: false,
    type: DataTypes.STRING,
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
