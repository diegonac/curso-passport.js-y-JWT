import Joi from "joi";

const id = Joi.string();
const ordenId = Joi.string();
const productoId = Joi.number();
const cantidad = Joi.number();

const buscarOrdenProductoSchema = Joi.object({
  id: id.required(),
});

const crearOrdenProductoSchema = Joi.object({
  ordenId: ordenId.required(),
  productoId: productoId.required(),
  cantidad: cantidad.required(),
});

const modificarOrdenProductoSchema = Joi.object({
  id,
  ordenId,
  productoId,
  cantidad,
});

export { buscarOrdenProductoSchema, crearOrdenProductoSchema, modificarOrdenProductoSchema };
