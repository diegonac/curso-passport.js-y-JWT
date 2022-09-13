import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize.js";
const { models }  = sequelize;

class ordenesProductosService {
  constructor() {
  };

  async buscar() {
    const res = await models.OrderProduct.findAll();
		return res;
  };

  async buscarId(id) {
    const orderProduct = await models.OrderProduct.findByPk(id);
		if (!orderProduct) {
			throw boom.notFound("El item no existe en el carrito");
		};
		return orderProduct;
  };

  async crear(body) {
    const newOrderProduct = await models.OrderProduct.create(body);
		return newOrderProduct;
  };

  async modificar(id, body) {
    const orderProduct = await this.buscarId(id);

		const res = await orderProduct.update({
			...orderProduct,
			...body,
		});
		return res;
  };

  async eliminar(id) {
    const orderProduct = await this.buscarId(id);
    await orderProduct.destroy();
		return id;
  };
};

export default ordenesProductosService;
