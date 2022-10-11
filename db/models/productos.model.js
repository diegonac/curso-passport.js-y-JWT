import { Model, DataTypes, Sequelize } from "sequelize";

// Importamos el nombre de la tabla de categorías:
import { CATEGORY_TABLE } from "./categorias.model.js";

const PRODUCT_TABLE = "productos";

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    unique: true,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  precio: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  color: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  categoriaId: {
    field: "categoria_id",
    allowNull: false,
    type: DataTypes.STRING,
    references: {
      model: CATEGORY_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  updatedAt: {
    field: "updated_at",
    allowNull: true,
    type: DataTypes.DATE,
  },
  deletedAt: {
    field: "delete_at",
    allowNull: true,
    type: DataTypes.DATE,
  },
};

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, { as: "categoria" });
  };
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: "Product",
      createdAt: false,
    };
  };
};

export { PRODUCT_TABLE, ProductSchema, Product };
