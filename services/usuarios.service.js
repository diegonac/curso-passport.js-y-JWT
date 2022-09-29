import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize.js";
const { models }  = sequelize;
import bcrypt from "bcrypt";

class usuariosService {
  constructor() {
  };

  async buscar() {
    const res = await models.User.findAll({
      include: ["cliente"],
    });
    // Eliminamos contraseña y recoveryToken de la respuesta:
    res.map((user) => {
      delete user.dataValues.contraseña;
      delete user.dataValues.recoveryToken;
    });
		return res;
  };

  async buscarEmail(email) {
    const res = await models.User.findOne({
      where: { email },
    });
    return res;
  };

  async buscarId(id) {
    const user = await models.User.findByPk(id);
		if (!user) {
			throw boom.notFound("El usuario no existe");
		};
    // Eliminamos contraseña y recoveryToken de la respuesta:
    delete user.dataValues.contraseña;
    delete user.dataValues.recoveryToken;
		return user;
  };

  async crear(body) {
    const hash = await bcrypt.hash(body.contraseña, 10);
    const user = await models.User.findByPk(body["id"]);
		if (user) {
			throw boom.conflict("El usuario ya existe, seleccione otro user");
		};
    const newUser = await models.User.create({
      ...body,
      contraseña: hash,
    });
    // Eliminamos contraseña y recoveryToken de la respuesta:
    delete newUser.dataValues.contraseña;
    delete newUser.dataValues.recoveryToken;
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
		const email = user["email"];
    await user.destroy();
		return {
      id,
      email,
    };
  };
};

export default usuariosService;
