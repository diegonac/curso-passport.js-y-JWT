import { Model, DataTypes, Sequelize } from "sequelize";

const CATEGORY_TABLE = "categorías";

const CategorySchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    unique: true,
  },
  Nombre: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  Imagen: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

class Category extends Model {
  static associate() {

  };
  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: "Category",
      timestamps: false
    };
  };
};

export { CATEGORY_TABLE, CategorySchema, Category };
