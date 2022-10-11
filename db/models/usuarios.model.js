import { Model, DataTypes, Sequelize } from "sequelize";

const USER_TABLE = "usuarios";

const UserSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  contraseña: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  // Agregamos la siguiente columna:
  recoveryToken: {
    field: "recovery_token",
    allowNull: true,
    type: DataTypes.STRING,
  },
  rol: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'cliente',
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

class User extends Model {
  static associate(models) {
    this.hasOne(models.Client, {
      as: "cliente",
      foreignKey: "usuarioId",
    });
  };
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      paranoid: true,
    };
  };
};

export { USER_TABLE, UserSchema, User };
