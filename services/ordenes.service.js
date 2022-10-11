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
    paranoid: false,
    });
    res.map((order) => {
      if(order.dataValues.estado == "vendido") {
        order.items.map(product => {
          product.dataValues.precio = product.dataValues.OrderProduct.dataValues.precio;
        });
      };

      delete order.dataValues.cliente.dataValues.usuario.dataValues.contraseña;
      delete order.dataValues.cliente.dataValues.usuario.dataValues.recoveryToken;
    });
    res.sort((a, b) => {
      return a.dataValues.id - b.dataValues.id;
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
      paranoid: false,
    });
		if (!order) {
			throw boom.notFound("La orden no existe");
		};
    if(order.dataValues.estado == "vendido") {
      order.items.map(product => {
        product.dataValues.precio = product.dataValues.OrderProduct.dataValues.precio;
      });
    };
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
    if (!client) throw boom.notFound("El cliente que desea vincular no existe");

    const newOrder = await models.Order.create({
      clienteId: client.id
    });
		return newOrder;
  };

  async modificar(id, body) {
    const order = await this.buscarId(id);
    if(order.dataValues.estado == "vendido" || order.dataValues.estado == "cancelado") {
      throw boom.badRequest("La orden no se puede modificar");
    };
		const res = await order.update({
			...order,
			...body,
		});
		return res;
  };

  async estado(id, body, user) {
    const order = await this.buscarId(id);
    if(order.dataValues.estado == "vendido" || order.dataValues.estado == "cancelado") throw boom.conflict();
    if(order.dataValues.cliente.dataValues.usuario.dataValues.id != user) throw boom.conflict();
    if(body.estado == "vendido" && !order.items) throw boom.badRequest("La orden no tiene productos");
		const res = await order.update({
			...order,
			...body,
		});
		return res;
  };

  async eliminar(id) {
    const order = await this.buscarId(id);
    await this.modificar(id, {estado: "cancelado"});
    await order.destroy();
		return id;
  };
};



export default ordenesService;
