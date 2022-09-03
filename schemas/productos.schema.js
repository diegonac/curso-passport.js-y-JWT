import Joi from "joi";

const id = Joi.number().integer();
const Nombre = Joi.string().min(3).max(30);
const Precio = Joi.number().integer().min(1);

const buscarProductoSchema = Joi.object({
  id: id.required(),
});

const crearProductoSchema = Joi.object({
  id: id.required(),
  Nombre: Nombre.required(),
  Precio: Precio.required(),
});

const modificarProductoSchema = Joi.object({
  id: id,
  Nombre: Nombre,
  Precio: Precio,
});

export { buscarProductoSchema, crearProductoSchema, modificarProductoSchema };
