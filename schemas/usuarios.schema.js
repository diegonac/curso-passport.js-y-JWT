import Joi from "joi";

const id = Joi.string().min(2).max(50);
const email = Joi.string().min(2);
const contraseña = Joi.string();
const rol = Joi.string();

const buscarUsuarioSchema = Joi.object({
  id: id.required(),
});

const crearUsuarioSchema = Joi.object({
  id: id.required(),
  email: email.required(),
  contraseña: contraseña.required(),
  rol: rol.required(),
});

const modificarUsuarioSchema = Joi.object({
  id,
  email,
  contraseña,
  rol,
});

export { buscarUsuarioSchema, crearUsuarioSchema, modificarUsuarioSchema };
