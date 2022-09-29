import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize.js";
const { models }  = sequelize;
import bcrypt from "bcrypt";

class clientesService {
  constructor() {
  };

  async buscar() {
    const res = await models.Client.findAll({
      include: ["usuario"],
    });
    // Eliminamos contraseña y recoveryToken:
    res.map((client) => {
      delete client.dataValues.usuario.dataValues.contraseña;
      delete client.dataValues.usuario.dataValues.recoveryToken;
    });
		return res;
  };

  async buscarId(id) {
    const client = await models.Client.findByPk(id, {
      include: ["usuario"],
    });
		if (!client) {
			throw boom.notFound("El cliente no existe");
		};
    // Eliminamos contraseña y recoveryToken:
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
    // Eliminamos la contraseña:
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
    const client = await this.buscarId(id);
		const nombre = client["nombre"];
    await client.destroy();
		return {
      id,
      nombre,
    };
  };
};

export default clientesService;
