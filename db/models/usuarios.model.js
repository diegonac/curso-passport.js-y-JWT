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
  // Vamos a agregar un asociación:
  static associate(models) {
    // Como en el model de clientes ya aplicamos this.belongsTo()
    // aquí aplicaremos this.hasOne():
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
