import { User, UserSchema } from "./usuarios.model.js";
import { Product, ProductSchema } from "./productos.model.js";
import { Client, ClientSchema } from "./clientes.model.js";

function setupModels (sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Client.init(ClientSchema, Client.config(sequelize));

  // Luego de inicializarlos le decimos que Client tiene asociaciones
  // y que debemos pasarle sequelize que contiene los modelos (User, Product, etc)
  Client.associate(sequelize.models);
};

export default setupModels;
