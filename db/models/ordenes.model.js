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

  // Agrego la siguiente columna:
  Total: {

    // Le damos la propiedad de tipo "virtual", esto hace que no se agregue a la tabla
    // y que solo quede la columna como algo de Node:
    type: DataTypes.VIRTUAL,

    // Le damos una función para que haga las operaciones:

    get () {
      if (this.items && (this.items.length > 0)) {
        return this.items.reduce((total, item) => {
          return total + (item.precio * item.OrderProduct.cantidad);
        }, 0);
      };
      return 0;
    },
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
      timestamps: false,
    };
  };
};

export { ORDER_TABLE, OrderSchema, Order };
