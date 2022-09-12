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
