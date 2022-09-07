import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize.js";
const { models }  = sequelize;

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

  async crear(body) {

    // Primero preguntamos si el body viene con la propiedad "usuario"
    // para saber si en el post de clientes se va a crear el usuario:
    if (body.usuario) {
      await models.User.create(body.usuario);
    };

    // En caso de que en el post de clientes NO se cree el usuario y se
    // vaya a relacionar con uno ya existente DEBEMOS preguntar si el usuario
    // al cual queremos relacionar con el cliente existe o no:
    const user = await models.User.findByPk(body["usuarioId"]);
    if (!user) {
      throw boom.notFound("El usuario que desea vincular no existe");
    };

    // Preguntamos si el cliente ya existe o no:
    const client = await models.Client.findByPk(body["id"]);
		if (client) {
			throw boom.conflict("El cliente ya existe, seleccione otro id");
		};

    // Creamos el cliente:
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
