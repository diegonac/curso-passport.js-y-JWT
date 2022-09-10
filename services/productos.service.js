import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize.js";
const { models }  = sequelize;

class productosService {
  constructor() {
  };

  async buscar() {
    // Al hacer un get de todos los productos, le damos
    // que incluya la información de la categoría:
    const res = await models.Product.findAll({
      include: ["categoria"],
    });
		return res;
  };

  async buscarId(id) {
    // Al hacer un get de un producto específico, le damos
    // que incluya la información de la categoría:
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
