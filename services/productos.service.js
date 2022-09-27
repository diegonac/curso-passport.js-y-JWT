import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize.js";

// Importamos los operadores de sequelize:
import { Op } from "sequelize";

const { models }  = sequelize;

class productosService {
  constructor() {
  };

  async buscar(query) {
    const opciones = {
      include: ["categoria"],
      // Agregamos "where", propiedad que nos permite realizar una acción
      // si tenemos ciertos parámetros o querys
      // Lo dejaremos vacío para que sea dinámico en caso de que no se filtren precios:
      where: {},
    };
    const { offset, limit } = query;
    if (offset && limit) {
      opciones.offset = offset;
      opciones.limit = limit;
    };

    // PRECIO:
    // Guardamos el precio si nos envían:
    const { Precio } = query;
    // Preguntamos si tenemos un precio:
    if (Precio) {
      // Agrego el precio a las opciones:
      opciones.where.Precio = Precio;
    };

    // RANGO DE PRECIOS:
    // Guardamos los precios mínimos y máximos:
    const { precioMin, precioMax } = query;
    // Preguntamos si tenemos precioMin y precioMax y si precioMax es mayor que precioMin:
    if ((precioMin && precioMax) && precioMax > precioMin) {
      // Le decimos que el precio tendrá que ser mayor o igual
      // que "precioMin" y menor o igual a "precioMax":
      opciones.where.Precio = {
        // Le decimos >= "mayor o igual":
        [Op.gte]: precioMin,

        // Le decimos <= "menor o igual":
        [Op.lte]: precioMax,
      };
    }
    // En caso de que el precioMax sea menor o igual que el precioMin:
    else if (precioMax <= precioMin) {
      throw boom.conflict("El precio máximo debe ser mayor que el precio mínimo");
    };

    // En caso de que queramos productos que valgan menos de cierto precio:
    // El cliente solo nos pasará un precioMax:
    if (precioMax && !precioMin) {
      opciones.where.Precio = {
        // Le decimos <= "menor o igual":
        [Op.lte]: precioMax,
      };
    };


    const res = await models.Product.findAll(opciones);
		return res;
  };

  async buscarId(id) {
    const product = await models.Product.findByPk(id, {
      include: ["categoria"],
    });
		if (!product) {
			throw boom.notFound("El producto no existe");
		};
		return product;
  };

  async crear(body) {
    const product = await models.Product.findByPk(body["id"]);
		if (product) {
			throw boom.conflict("El producto ya existe, seleccione otro id");
		};
    const newProduct = await models.Product.create(body);
		return newProduct;
  };

  async modificar(id, body) {
    const product = await this.buscarId(id);

		const res = await product.update({
			...product,
			...body,
		});
		return res;
  };

  async eliminar(id) {
    const product = await this.buscarId(id);
		const nombre = product["nombre"];
    await product.destroy();
		return {
      id,
      nombre,
    };
  };
};

export default productosService;
