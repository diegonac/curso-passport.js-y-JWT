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
  Nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  Apellido: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  Telefono: {
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
};

class Client extends Model {
  static associate(models) {
    this.belongsTo(models.User, {as: "usuario"});
  };
  static config(sequelize) {
    return {
      sequelize,
      tableName: CLIENT_TABLE,
      modelName: "Client",
      timestamps: false
    };
  };
};

export { CLIENT_TABLE, ClientSchema, Client };
