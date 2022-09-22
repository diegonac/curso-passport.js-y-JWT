import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize.js";
const { models }  = sequelize;

// Importamos bcrypt:
import bcrypt from "bcrypt";

class clientesService {
  constructor() {
  };

  async buscar() {

    const res = await models.Client.findAll({
      include: ["usuario"],
    });
		return res;
  };

  async buscarId(id) {
    const client = await models.Client.findByPk(id);
		if (!client) {
			throw boom.notFound("El cliente no existe");
		};
		return client;
  };

  // Agregamos el hash en la función crear():
  async crear(body) {
    if (body.usuario) {
      // Creamos el hash con el await:
      const hash = await bcrypt.hash(body.usuario.Contraseña, 10);

      // Modificamos la creación del usuario:
      await models.User.create({
        ...body.usuario,

        // Que en la contraseña guarde el hash:
        Contraseña: hash,
      });
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
		return newClient;
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
		const nombre = client["Nombre"];
    await client.destroy();
		return {
      id,
      nombre,
    };
  };
};

export default clientesService;
