import Joi from "joi";

const id = Joi.string().min(2).max(50);
const Email = Joi.string().min(2);
const Contraseña = Joi.string();

const buscarUsuarioSchema = Joi.object({
  id: id.required(),
});

const crearUsuarioSchema = Joi.object({
  id: id.required(),
  Email: Email.required(),
  Contraseña: Contraseña.required(),
});

const modificarUsuarioSchema = Joi.object({
  id: id,
  Email: Email,
  Contraseña: Contraseña,
});

export { buscarUsuarioSchema, crearUsuarioSchema, modificarUsuarioSchema };
