import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize.js";
const { models }  = sequelize;
import bcrypt from "bcrypt";
import clientesService from "./clientes.service.js";
const serviceClient = new clientesService();

class usuariosService {
  constructor() {
  };

  async buscar() {
    const res = await models.User.findAll({
      include: ["cliente"],
      paranoid: false,
    });
    res.map((user) => {
      delete user.dataValues.contraseña;
      delete user.dataValues.recoveryToken;
      delete user._previousDataValues.contraseña;
      delete user._previousDataValues.recoveryToken;
    });
		return res;
  };

  async buscarEmail(email) {
    const res = await models.User.findOne({
      where: { email },
      paranoid: false,
    });
    return res;
  };

  async buscarId(id) {
    const user = await models.User.findByPk(id, {
      include: ["cliente"],
    });
    if(!user) throw boom.notFound("El usuario no existe");
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
    delete newUser.dataValues.contraseña;
    delete newUser.dataValues.recoveryToken;
		return newUser;
  };

  async modificar(id, body) {
    if(body.contraseña || body.nuevaContraseña) throw boom.conflict();
    const user = await this.buscarId(id);
		const res = await user.update({
			...user,
			...body,
		});
    delete res.dataValues.contraseña;
    delete res.dataValues.recoveryToken;
		return res;
  };

  async modificarPassword(id, body) {
    const user = await this.buscarId(id);
    if(body.nuevaContraseña) {
      const isMatch = await bcrypt.compare(body.contraseña, user.contraseña);
      if(!isMatch) throw boom.unauthorized("Contraseña incorrecta");
      const hash = await bcrypt.hash(body.nuevaContraseña, 10);
      body = {
        contraseña: hash,
      };
    };
		const res = await user.update({
			...user,
			...body,
		});
		return res;
  };

  async eliminar(id) {
    const user = await this.buscarId(id);
		const email = user["email"];

    if(user.dataValues.cliente) await serviceClient.eliminar(user.dataValues.cliente.dataValues.id);

    await user.destroy();
		return {
      id,
      email,
    };
  };

  async recuperar(email, contraseña) {
    const user = await this.buscarEmail(email);
    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if(isMatch) await user.restore();
  };
};

export default usuariosService;
