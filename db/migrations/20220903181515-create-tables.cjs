'use strict';

const modelsUser = import("../models/usuarios.model.js");
const modelsProduct = import("../models/productos.model.js");
const modelsClient = import("../models/clientes.model.js");

module.exports = {
  up: async (queryInterface) => {
    const { USER_TABLE, UserSchema } = await modelsUser;
    const { PRODUCT_TABLE, ProductSchema } = await modelsProduct;
    const { CLIENT_TABLE, ClientSchema } = await modelsClient;
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(CLIENT_TABLE, ClientSchema);
  },

  down: async (queryInterface) => {
    const { USER_TABLE } = await modelsUser;
    const { PRODUCT_TABLE } = await modelsProduct;
    const { CLIENT_TABLE } = await modelsClient;
    await queryInterface.dropTable(CLIENT_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
  },
};
