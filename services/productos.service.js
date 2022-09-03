import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize.js";
const { models }  = sequelize;

class productosService {
  constructor() {
  };

  async buscar() {
    const res = await models.Product.findAll();
		return res;
  };

  async buscarId(id) {
    const product = await models.Product.findByPk(id);
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
