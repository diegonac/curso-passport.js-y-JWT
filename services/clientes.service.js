import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize.js";
const { models }  = sequelize;

class clientesService {
  constructor() {
  };

  async buscar() {
    const res = await models.Client.findAll();
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
