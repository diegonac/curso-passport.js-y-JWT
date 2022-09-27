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
  rol: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'cliente',
  },
  creado: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'creado',
    defaultValue: Sequelize.NOW
  }
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
      timestamps: false,
    };
  };
};

export { USER_TABLE, UserSchema, User };
