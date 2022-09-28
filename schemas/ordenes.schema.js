import Joi from "joi";

const id = Joi.number().integer();
const clienteId = Joi.string();

const buscarOrdenSchema = Joi.object({
  id: id.required(),
});

// Debemos sacar que el id y el clienteId sean requeridos:
const crearOrdenSchema = Joi.object({
});

const modificarOrdenSchema = Joi.object({
  id,
  clienteId,
});

export { buscarOrdenSchema, crearOrdenSchema, modificarOrdenSchema };
