import Joi from "joi";

const id = Joi.string();
const ordenId = Joi.string();
const productoId = Joi.number();
const Cantidad = Joi.number();

const buscarOrdenProductoSchema = Joi.object({
  id: id.required(),
});

const crearOrdenProductoSchema = Joi.object({
  ordenId: ordenId.required(),
  productoId: productoId.required(),
  Cantidad: Cantidad.required(),
});

const modificarOrdenProductoSchema = Joi.object({
  id,
  ordenId,
  productoId,
  Cantidad,
});

export { buscarOrdenProductoSchema, crearOrdenProductoSchema, modificarOrdenProductoSchema };
