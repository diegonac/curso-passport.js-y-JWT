import { User, UserSchema } from "./usuarios.model.js";
import { Product, ProductSchema } from "./productos.model.js"

function setupModels (sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
};

export default setupModels;
