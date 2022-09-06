import Joi from "joi";

const id = Joi.number().integer();
const Nombre = Joi.string().min(3).max(15);
const Apellido = Joi.string().min(3).max(15);
const Telefono = Joi.number().integer();

// Agregamos a usuarioId en nuestro schema:
const usuarioId = Joi.string();

const buscarClienteSchema = Joi.object({
  id: id.required(),
});

const crearClienteSchema = Joi.object({
  id: id.required(),
  Nombre: Nombre.required(),
  Apellido: Apellido.required(),
  Telefono: Telefono.required(),

  // Agregamos usuarioId:
  usuarioId: usuarioId.required(),
});

const modificarClienteSchema = Joi.object({
  id: id,
  Nombre: Nombre,
  Apellido: Apellido,
  Telefono: Telefono,

  // Agregamos usuarioId:
  usuarioId: usuarioId,
});

export { buscarClienteSchema, crearClienteSchema, modificarClienteSchema };
