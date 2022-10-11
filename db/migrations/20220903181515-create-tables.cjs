'use strict';

const modelsUser = import("../models/usuarios.model.js");
const modelsProduct = import("../models/productos.model.js");
const modelsClient = import("../models/clientes.model.js");
const modelsCategory = import("../models/categorias.model.js");
const modelsOrder = import("../models/ordenes.model.js");
const modelsOrderProduct = import("../models/ordenes-productos.model.js");
const { DataTypes } = require("sequelize");


module.exports = {
  up: async (queryInterface) => {
    const { USER_TABLE, UserSchema } = await modelsUser;
    const { PRODUCT_TABLE, ProductSchema } = await modelsProduct;
    const { CLIENT_TABLE, ClientSchema } = await modelsClient;
    const { CATEGORY_TABLE, CategorySchema } = await modelsCategory;
    const { ORDER_TABLE } = await modelsOrder;
    const { ORDER_PRODUCT_TABLE, OrderProductSchema } = await modelsOrderProduct;


    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CLIENT_TABLE, ClientSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        unique: true,
      },
      clienteId: {
        field: "cliente_id",
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: CLIENT_TABLE,
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      estado: {
        allowNull: false,
        defaultValue: "pendiente",
        type: DataTypes.STRING,
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: DataTypes.DATE,
      },

      deletedAt: {
        field: "deleted_at",
        allowNull: true,
        type: DataTypes.DATE,
      },
    });
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);

  },

  down: async (queryInterface) => {
    const { USER_TABLE } = await modelsUser;
    const { PRODUCT_TABLE } = await modelsProduct;
    const { CLIENT_TABLE } = await modelsClient;
    const { CATEGORY_TABLE } = await modelsCategory;
    const { ORDER_TABLE } = await modelsOrder;
    const { ORDER_PRODUCT_TABLE } = await modelsOrderProduct;


    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(CLIENT_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);


  },
};
