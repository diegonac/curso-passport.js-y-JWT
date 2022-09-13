import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize.js";
const { models }  = sequelize;

class productosService {
  constructor() {
  };

  async buscar(query) {
    // Vamos a crear una variable con las opciones:
    const opciones = {
      // Esta propiedad va a ir siempre:
      include: ["categoria"],
    };
    // Guardamos los querys si es que existen se guardarán
    // si no hay querys tendrá valor undefined:
    const { offset, limit } = query;
    // Preguntamos si hay querys:
    if (offset && limit) {
      // Si hay querys agregamos a las opciones los querys:
      opciones.offset = offset;
      opciones.limit = limit;
    };
    // Y ahora solamente le pasamos al finAll() las opciones:
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
		const nombre = product["Nombre"];
    await product.destroy();
		return {
      id,
      nombre,
    };
  };
};

export default productosService;
