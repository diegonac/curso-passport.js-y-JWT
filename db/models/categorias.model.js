import { Model, DataTypes, Sequelize } from "sequelize";

const CATEGORY_TABLE = "categorias";

const CategorySchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    unique: true,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  imagen: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  deletedAt: {
    field: "deleted_at",
    allowNull: true,
    type: DataTypes.DATE,
  },
};

class Category extends Model {
  static associate(models) {
    this.hasMany(models.Product, {
      as: "productos",
      foreignKey: "categoriaId",
});
  };
  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: "Category",
      paranoid: true,
      createdAt: false,
      updatedAt: false,
    };
  };
};

export { CATEGORY_TABLE, CategorySchema, Category };
