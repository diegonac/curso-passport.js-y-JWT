'use strict';

const modelsUser = import("../models/usuarios.model.js");
const modelsProduct = import("../models/productos.model.js");
const modelsClient = import("../models/clientes.model.js");
const modelsCategory = import("../models/categorias.model.js");

module.exports = {
  up: async (queryInterface) => {
    const { USER_TABLE, UserSchema } = await modelsUser;
    const { PRODUCT_TABLE, ProductSchema } = await modelsProduct;
    const { CLIENT_TABLE, ClientSchema } = await modelsClient;
    const { CATEGORY_TABLE, CategorySchema } = await modelsCategory;

    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CLIENT_TABLE, ClientSchema);

    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
  },

  down: async (queryInterface) => {
    const { USER_TABLE } = await modelsUser;
    const { PRODUCT_TABLE } = await modelsProduct;
    const { CLIENT_TABLE } = await modelsClient;
    const { CATEGORY_TABLE } = await modelsCategory;

    await queryInterface.dropTable(CLIENT_TABLE);
    await queryInterface.dropTable(USER_TABLE);

    // Y para eliminar en primer lugar debemos poner la tabla de productos
    // ya que la tabla categorias depende de objetos de la tabla productos:
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
  },
};
