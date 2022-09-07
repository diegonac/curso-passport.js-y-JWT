import { Model, DataTypes, Sequelize } from "sequelize";

// Importamos el nombre de la tabla con la que se va a relacionar:
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
  // Debemos darle un identificador de la relación
  // Como clientes va a contener la relación, podemos poner el
  // id que ocupa su contraparte en la tabla de usuarios:
  // Esto vendría a ser una foreing key (clave externa)
  usuarioId: {
    field: "usuario_id",
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    // Especifiquemos la foreing key:
    references: {
      model: USER_TABLE, // Acá le decimos con quién va a tener la relación
      key: "id", // Acá le decimos con que columna se va a relacionar de la tabla user
    },
    // Establecemos que sucede en caso de que el id de la otra tabla se modifique:
    onUpdate: "CASCADE", // Así le decimos que actualice el id en la tabla clientes también
    onDelete: "SET NULL", // En caso de que se borre establece null como valor
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
