import { Model, DataTypes, Sequelize } from "sequelize";

const USER_TABLE = "usuarios";

const UserSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    unique: true,
  },
  Email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  Contraseña: {
    allowNull: false,
    type: DataTypes.STRING,
  },

};

class User extends Model {
  static associate() {

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
