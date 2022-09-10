import Joi from "joi";

const id = Joi.string();
const Nombre = Joi.string().min(3).max(30);
const Imagen = Joi.string().uri();

const buscarCategoriaSchema = Joi.object({
  id: id.required(),
});

const crearCategoriaSchema = Joi.object({
  id: id.required(),
  Nombre: Nombre.required(),
  Imagen: Imagen.required(),
});

const modificarCategoriaSchema = Joi.object({
  id,
  Nombre,
  Imagen,
});

export { buscarCategoriaSchema, crearCategoriaSchema, modificarCategoriaSchema };
