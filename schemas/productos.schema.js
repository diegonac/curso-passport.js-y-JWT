import Joi from "joi";

const id = Joi.number().integer();
const Nombre = Joi.string().min(3).max(30);
const Precio = Joi.number().integer().min(1);
const Color = Joi.string();
const categoriaId = Joi.string();

const buscarProductoSchema = Joi.object({
  id: id.required(),
});

const crearProductoSchema = Joi.object({
  id: id.required(),
  Nombre: Nombre.required(),
  Precio: Precio.required(),
  Color: Color.required(),
  categoriaId: categoriaId.required(),
});

const modificarProductoSchema = Joi.object({
  id: id,
  Nombre: Nombre,
  Precio: Precio,
  Color: Color,
});

export { buscarProductoSchema, crearProductoSchema, modificarProductoSchema };
