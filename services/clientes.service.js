import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize.js";
const { models }  = sequelize;
import bcrypt from "bcrypt";
import ordenesService from "./ordenes.service.js";
const serviceOrder = new ordenesService();
class clientesService {
  constructor() {
  };

  async buscar() {
    const res = await models.Client.findAll({
      include: ["usuario", "ordenes"],
    });
    res.map((client) => {
      delete client.dataValues.usuario.dataValues.contraseña;
      delete client.dataValues.usuario.dataValues.recoveryToken;
    });
		return res;
  };

  async buscarId(id) {
    const client = await models.Client.findByPk(id, {
      include: ["usuario", "ordenes"],
    });
		if (!client) {
			throw boom.notFound("El cliente no existe");
		};
    delete client.dataValues.usuario.dataValues.contraseña;
    delete client.dataValues.usuario.dataValues.recoveryToken;
		return client;
  };

  async crear(body) {
    if (body.usuario) {
      const hash = await bcrypt.hash(body.usuario.contraseña, 10);
      await models.User.create({
        ...body.usuario,
        contraseña: hash,
      });
      body = {
        ...body,
        usuarioId: body.usuario.id,
      };
    };
    const user = await models.User.findByPk(body["usuarioId"]);
    if (!user) {
      throw boom.notFound("El usuario que desea vincular no existe");
    };
    const client = await models.Client.findByPk(body["id"]);
		if (client) {
			throw boom.conflict("El cliente ya existe, seleccione otro id");
		};
    const newClient = await models.Client.create(body);
    if (body.usuario) delete body.usuario.contraseña;
		return body;
  };

  async modificar(id, body) {
    const client = await this.buscarId(id);

		const res = await client.update({
			...client,
			...body,
		});
		return res;
  };

  async eliminar(id) {
    let client = await this.buscarId(id);
		const nombre = client["nombre"];
    if(client.dataValues.ordenes) {
      await models.Order.destroy({
        where: {clienteId: client.dataValues.id}
      });
    };
    await client.destroy();
		return {
      id,
      nombre,
    };
  };
};

export default clientesService;
