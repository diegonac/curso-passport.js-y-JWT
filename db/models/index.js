import { User, UserSchema } from "./usuarios.model.js";
import { Product, ProductSchema } from "./productos.model.js";
import { Client, ClientSchema } from "./clientes.model.js";

function setupModels (sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Client.init(ClientSchema, Client.config(sequelize));

  // Agregamos la asociación de User:
  User.associate(sequelize.models);

  Client.associate(sequelize.models);
};

export default setupModels;
