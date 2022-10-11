import { Model, DataTypes, Sequelize } from "sequelize";

import { USER_TABLE } from "./usuarios.model.js";

const CLIENT_TABLE = "clientes";

const ClientSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    unique: true,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  apellido: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  telefono: {
    allowNull: false,
    type: DataTypes.NUMERIC,
    unique: true,
  },
  usuarioId: {
    field: "usuario_id",
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    references: {
      model: USER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  createdAt: {
    field: "created_at",
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    field: "updated_at",
    allowNull: true,
    type: DataTypes.DATE,
  },
  deletedAt: {
    field: "deleted_at",
    allowNull: true,
    type: DataTypes.DATE,
  },
};

class Client extends Model {
  static associate(models) {
    this.belongsTo(models.User, {as: "usuario"});
    this.hasMany(models.Order, {
      as: "ordenes",
      foreignKey: "clienteId",
    });
  };
  static config(sequelize) {
    return {
      sequelize,
      tableName: CLIENT_TABLE,
      modelName: "Client",
      paranoid: true,
    };
  };
};

export { CLIENT_TABLE, ClientSchema, Client };
