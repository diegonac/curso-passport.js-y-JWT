import Joi from "joi";

const id = Joi.string();
const nombre = Joi.string().min(3).max(30);
const imagen = Joi.string().uri();

const buscarCategoriaSchema = Joi.object({
  id: id.required(),
});

const crearCategoriaSchema = Joi.object({
  id: id.required(),
  nombre: nombre.required(),
  imagen: imagen.required(),
});

const modificarCategoriaSchema = Joi.object({
  id,
  nombre,
  imagen,
});

export { buscarCategoriaSchema, crearCategoriaSchema, modificarCategoriaSchema };
