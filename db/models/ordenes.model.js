import { Model, DataTypes, Sequelize } from "sequelize";
import { CLIENT_TABLE } from "./clientes.model.js";

const ORDER_TABLE = "ordenes";

const OrderSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    unique: true,
  },
  clienteId: {
    field: "cliente_id",
    allowNull: false,
    type: DataTypes.STRING,
    references: {
      model: CLIENT_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

class Order extends Model {
  static associate (models) {
    this.belongsTo(models.Client, {as: "cliente"});

    // Le decimos con belongsToMany() que los datos de la tabla ordenes
    // se van a relacionar con muchos datos de la tabla productos
    // 1er parámetro modelo de la tabla a relacionar
    // 2do parámetro modelo de la tabla intermediaria:
    this.belongsToMany(models.Product, {
       // Le damos como alias "items" porque la orden tendrá muchos items:
      as: "items",
      // through le dice a través de cuál tabla intermediaria se resuelve:
      through: models.OrderProduct,
      // Le pasamos la primera foreignKey:
      foreignKey: "ordenId",
      // Le pasamos la segunda foreignKey:
      otherKey: "productoId",
    });
  };

  static config (sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: "Order",
      timestamps: false,
    };
  };
};

export { ORDER_TABLE, OrderSchema, Order };
