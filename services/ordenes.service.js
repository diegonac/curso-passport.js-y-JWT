import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize.js";
const { models }  = sequelize;

class ordenesService {
  constructor() {
  };

  async buscar() {
    // Como sabemos la tabla clientes tiene asociado a la tabla usuarios
    // Al hacer un get de la tabla ordenes podemos hacer que nos muestre
    // la información anidada de la tabla relacionada que en este caso sería
    // la tabla de "clientes" y a su vez podemos pedir que nos anide también
    // la tabla que está relacionada con "clientes" que sería la tabla "usuarios":
    const res = await models.Order.findAll({
      include: [{
        // Le decimos que muestre la tabla asociada a ordenes:
        association: "cliente",
        // Y ahora que incluya las tablas asociadas a clientes:
        include: ["usuario"],
      }],
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
