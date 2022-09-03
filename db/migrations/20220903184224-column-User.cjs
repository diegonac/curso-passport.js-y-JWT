'use strict';

const modelsUser = import("../models/usuarios.model.js");

module.exports = {
  up: async (queryInterface) => {
    const { USER_TABLE, UserSchema } = await modelsUser;

    // Aplicamos método addColumn() para agregar la columna
    // 2do parámetro es como se va a llamar esa columna
    // 3er parámetro debemos pasarle solo el schema de la columna que vamos a agregar
    await queryInterface.addColumn(USER_TABLE, "Telefono", UserSchema.Telefono);
  },

  down: async (queryInterface) => {
    const { USER_TABLE } = await modelsUser;

    // 2do parámetro es el nombre de la columna que queremos eliminar
    await queryInterface.removeColumn(USER_TABLE, "Telefono");
  }
};
