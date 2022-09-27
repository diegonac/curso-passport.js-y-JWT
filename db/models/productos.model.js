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
  // Agregamos la relación con la tabla de categorías:
  categoriaId: {
    field: "categoria_id",
    allowNull: false,
    type: DataTypes.STRING,
    // Eliminamos la propiedad unique, ya que se va a repetir varias veces
    // el categoriaId
    references: {
      model: CATEGORY_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

class Product extends Model {
  // También podemos asociar desde productos:
  static associate(models) {
    this.belongsTo(models.Category, { as: "categoria" });
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
