import { Model, DataTypes, Sequelize } from "sequelize";
import { CLIENT_TABLE } from "./clientes.model.js";

const ORDER_TABLE = "ordenes";

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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

  Total: {
    type: DataTypes.VIRTUAL,
    get () {
      if (this.items && (this.items.length > 0)) {
        return this.items.reduce((total, item) => {
          return total + (item.OrderProduct.precio * item.OrderProduct.cantidad);
        }, 0);
      };
      return 0;
    },
  },

  estado: {
    allowNull: false,
    defaultValue: "pendiente",
    type: DataTypes.STRING,
  },

  createdAt: {
    field: "created_at",
    allowNull: false,
    type: DataTypes.DATE,
  },

  deletedAt: {
    field: "deleted_at",
    allowNull: true,
    type: DataTypes.DATE,
  },
};

class Order extends Model {
  static associate (models) {
    this.belongsTo(models.Client, {as: "cliente"});
    this.belongsToMany(models.Product, {
      as: "items",
      through: models.OrderProduct,
      foreignKey: "ordenId",
      otherKey: "productoId",
    });
  };

  static config (sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: "Order",
      paranoid: true,
      updatedAt: false,
    };
  };
};

export { ORDER_TABLE, OrderSchema, Order };
