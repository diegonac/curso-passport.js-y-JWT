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
        "items",
    ],
    });
    // Eliminamos contraseña y recoveryToken de la respuesta:
    res.map((order) => {
      delete order.dataValues.cliente.dataValues.usuario.dataValues.contraseña;
      delete order.dataValues.cliente.dataValues.usuario.dataValues.recoveryToken;
    });
		return res;
  };

  async buscarId(id) {
    const order = await models.Order.findByPk(id, {
      include: [{
        association: "cliente",
        include: ["usuario"],
      },
        "items",
    ],
    });
		if (!order) {
			throw boom.notFound("La orden no existe");
		};
    // Eliminamos contraseña y recoveryToken de la respuesta:
    delete order.dataValues.cliente.dataValues.usuario.dataValues.contraseña;
    delete order.dataValues.cliente.dataValues.usuario.dataValues.recoveryToken;
		return order;
  };

  async buscarPorUsuario(userId) {
    const orders = await models.Order.findAll({
      where: {
        "$cliente.usuario.id$": userId,
      },
      include: [
        {
        association: "cliente",
        include: ["usuario"],
        },
      ],
    });
    // Eliminamos contraseña y recoveryToken de la respuesta:
    orders.map((order) => {
      delete order.dataValues.cliente.dataValues.usuario.dataValues.contraseña;
      delete order.dataValues.cliente.dataValues.usuario.dataValues.recoveryToken;
    });
    return orders;
  };

  async crear(body) {
    const client = await models.Client.findOne({
      where: {usuarioId: body}
    });
    if (!client) {
      throw boom.notFound("El cliente que desea vincular no existe");
    };

    const order = await models.Order.findByPk(body["id"]);
		if (order) {
			throw boom.conflict("La orden ya existe, seleccione otro id");
		};
    const newOrder = await models.Order.create({
      clienteId: client.id
    });
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
