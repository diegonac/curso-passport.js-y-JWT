import Joi from "joi";

const id = Joi.number().integer();
const clienteId = Joi.string();
const items = Joi.string();
const estado = Joi.string();

const buscarOrdenSchema = Joi.object({
  id: id.required(),
});

// Debemos sacar que el id y el clienteId sean requeridos:
const crearOrdenSchema = Joi.object({
});

const modificarOrdenSchema = Joi.object({
  id,
  clienteId,
  items,
  estado,
});

export { buscarOrdenSchema, crearOrdenSchema, modificarOrdenSchema };
