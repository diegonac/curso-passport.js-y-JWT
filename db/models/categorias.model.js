import { Model, DataTypes, Sequelize } from "sequelize";

const CATEGORY_TABLE = "categorias";

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
  static associate(models) {
    // Le digo que una categoría puede relacionarse con muchos productos:
    this.hasMany(models.Product, {
      // Le damos un alias:
      as: "productos",
       // Y debemos agregar la foreign key para que sepa dónde debe resolver
      // esa relación:
      foreignKey: "categoriaId",
});
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
