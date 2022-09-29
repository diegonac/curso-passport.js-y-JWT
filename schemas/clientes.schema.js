import Joi from "joi";
import { crearUsuarioSchema, modificarUsuarioSchema } from "./usuarios.schema.js";

const id = Joi.string();
const nombre = Joi.string().min(3).max(15);
const apellido = Joi.string().min(3).max(15);
const telefono = Joi.number().integer();
const usuarioId = Joi.string();

const buscarClienteSchema = Joi.object({
  id: id.required(),
});

const crearClienteSchema = Joi.object({
  id: id.required(),
  nombre: nombre.required(),
  apellido: apellido.required(),
  telefono: telefono.required(),
  // Hacemos que usuarioId no sea requerido:
  usuarioId,
  usuario: crearUsuarioSchema,
});

const modificarClienteSchema = Joi.object({
  id: id,
  nombre,
  apellido,
  telefono,
  usuarioId,
  usuario: modificarUsuarioSchema,
});

export { buscarClienteSchema, crearClienteSchema, modificarClienteSchema };
