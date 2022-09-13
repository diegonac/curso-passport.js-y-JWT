import Joi from "joi";

const id = Joi.number().integer();
const Nombre = Joi.string().min(3).max(30);
const Precio = Joi.number().integer().min(1);
const Color = Joi.string();
const categoriaId = Joi.string();
const offset = Joi.number().integer();
const limit = Joi.number().integer();

// Agregamos precioMin y precioMax:
const precioMin = Joi.number().integer();
const precioMax = Joi.number().integer();

const buscarProductoSchema = Joi.object({
  id: id.required(),
});

const crearProductoSchema = Joi.object({
  id: id.required(),
  Nombre: Nombre.required(),
  Precio: Precio.required(),
  Color: Color.required(),
  categoriaId: categoriaId.required(),
});

const modificarProductoSchema = Joi.object({
  id: id,
  Nombre: Nombre,
  Precio: Precio,
  Color: Color,
});

const queryProductoSchema = Joi.object({
  offset,
  limit,

  // Agregamos precio, precioMin y precioMax:
  Precio,
  precioMin,

  // Podemos hacer que precioMax sea requerido si nos envian un precioMin
  // Lo hacemos con when();
  // 1er parámetro nombre de quién dependerá en este caso de "precioMin"
  // 2do parámetro objeto con 2 propiedades:
  precioMax: precioMax.when("precioMin", {
    // En "is" va una sentencia:
    is: Joi.exist(), // Le dice que cuando precioMin exista haga lo ponemos en "then"

    // En "then" va lo que sucederá con precioMax en caso de que se cumpla "is":
    then: Joi.required(), // Si se cumple "is" entonces precioMax se convierte en requerido
  }),
});

// Agregamos queryProductoSchema a las exportaciones:
export { buscarProductoSchema, crearProductoSchema, modificarProductoSchema, queryProductoSchema };
