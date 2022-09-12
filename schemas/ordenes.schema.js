import Joi from "joi";

const id = Joi.string();
const clienteId = Joi.string();

const buscarOrdenSchema = Joi.object({
  id: id.required(),
});

const crearOrdenSchema = Joi.object({
  id: id.required(),
  clienteId: clienteId.required(),
});

const modificarOrdenSchema = Joi.object({
  id,
  clienteId,
});

export { buscarOrdenSchema, crearOrdenSchema, modificarOrdenSchema };
