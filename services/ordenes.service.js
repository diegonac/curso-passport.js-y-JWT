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
    res.map((order) => {
      delete order.dataValues.cliente.dataValues.usuario.dataValues.contraseña;
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
    delete order.dataValues.cliente.dataValues.usuario.dataValues.contraseña;
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
    // Para que no se vea la contraseña:
    orders.map((order) => {
      delete order.dataValues.cliente.dataValues.usuario.dataValues.contraseña;
    });
    return orders;
  };

  async crear(body) {
    // Debemos buscar el cliente, lo hacemos mediante el método
    // findOne() que nos traer una fila de la tabla:
    const client = await models.Client.findOne({
      // Le decimos que en la tabla clientes cuando la columna "usuarioId"
      // sea igual al body (el body es el sub del payload, osea el usuarioId)
      // nos traiga esa fila del cliente que coincide con ese usuarioId:
      where: {usuarioId: body}
    });
    if (!client) {
      throw boom.notFound("El cliente que desea vincular no existe");
    };

    const order = await models.Order.findByPk(body["id"]);
		if (order) {
			throw boom.conflict("La orden ya existe, seleccione otro id");
		};
    // Si el cliente existe le decimos que cree una nueva orden:
    const newOrder = await models.Order.create({
      // Dentro de llaves establecemos el "clienteId", como ya tenemos
      // guardado el cliente en la variable "client":
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
