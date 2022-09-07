import Joi from "joi";

// Importamos los schemas de usuarios:
import { crearUsuarioSchema, modificarUsuarioSchema } from "./usuarios.schema.js";

const id = Joi.number().integer();
const Nombre = Joi.string().min(3).max(15);
const Apellido = Joi.string().min(3).max(15);
const Telefono = Joi.number().integer();
const usuarioId = Joi.string();

const buscarClienteSchema = Joi.object({
  id: id.required(),
});

const crearClienteSchema = Joi.object({
  id: id.required(),
  Nombre: Nombre.required(),
  Apellido: Apellido.required(),
  Telefono: Telefono.required(),
  usuarioId: usuarioId.required(),

  // Agregamos la propiedad "usuario" con el schema de usuarios:
  usuario: crearUsuarioSchema,
});

const modificarClienteSchema = Joi.object({
  id: id,
  Nombre: Nombre,
  Apellido: Apellido,
  Telefono: Telefono,
  usuarioId: usuarioId,

  // Agregamos la propiedad "usuario" con el schema de usuarios:
  usuario: modificarUsuarioSchema,
});

export { buscarClienteSchema, crearClienteSchema, modificarClienteSchema };
