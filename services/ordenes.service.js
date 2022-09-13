import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize.js";
const { models }  = sequelize;

class ordenesService {
  constructor() {
  };

  async buscar() {
    const res = await models.Order.findAll({
      include: [{
        association: "cliente",
        include: ["usuario"],
      },
      // Le digo que incluya la relación con la tabla productos y la tabla
      // intermediaria con el alias que pusimos:
        "items",
    ],
    });
		return res;
  };

  async buscarId(id) {
    const order = await models.Order.findByPk(id);
		if (!order) {
			throw boom.notFound("La orden no existe");
		};
		return order;
  };

  async crear(body) {
    const client = await models.Client.findByPk(body["clienteId"]);
    if (!client) {
      throw boom.notFound("El cliente que desea vincular no existe");
    };

    const order = await models.Order.findByPk(body["id"]);
		if (order) {
			throw boom.conflict("La orden ya existe, seleccione otro id");
		};

    const newOrder = await models.Order.create(body);
		return newOrder;
  };

  async modificar(id, body) {
    const order = await this.buscarId(id);

		const res = await order.update({
			...order,
			...body,
		});
		return res;
  };

  async eliminar(id) {
    const order = await this.buscarId(id);
    await order.destroy();
		return id;
  };
};

export default ordenesService;
