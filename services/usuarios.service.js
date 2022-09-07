import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize.js";
const { models }  = sequelize;

class usuariosService {
  constructor() {
  };

  async buscar() {

    // Agregamos el include con los alias:
    const res = await models.User.findAll({
      include: ["cliente"],
    });
		return res;
  };

  async buscarId(id) {
    const user = await models.User.findByPk(id);
		if (!user) {
			throw boom.notFound("El usuario no existe");
		};
		return user;
  };

  async crear(body) {
    const user = await models.User.findByPk(body["id"]);
		if (user) {
			throw boom.conflict("El usuario ya existe, seleccione otro user");
		};
    const newUser = await models.User.create(body);
		return newUser;
  };

  async modificar(id, body) {
    const user = await this.buscarId(id);
		const res = await user.update({
			...user,
			...body,
		});
		return res;
  };

  async eliminar(id) {
    const user = await this.buscarId(id);
		const email = user["Email"];
    await user.destroy();
		return {
      id,
      email,
    };
  };
};

export default usuariosService;
