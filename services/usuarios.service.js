import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize.js";
const { models }  = sequelize;

// Importamos bcrypt:
import bcrypt from "bcrypt";

class usuariosService {
  constructor() {
  };

  async buscar() {
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

  // Debemos agregar el cambio en la función de crear:
  async crear(body) {
    // Agregamos el hash:
    const hash = await bcrypt.hash(body.Contraseña, 10);

    const user = await models.User.findByPk(body["id"]);
		if (user) {
			throw boom.conflict("El usuario ya existe, seleccione otro user");
		};

    // Al crear lo hacemos de la siguiente manera:
    const newUser = await models.User.create({
      ...body,
      Contraseña: hash,
    });

    // Y antes de rotornar debemos eliminar la contraseña
    // para que no se muestre el hash en el mensaje de "creado"
    // Como estamos usando sequelize debemos agregar la propiedad
    // "dataValues":
    delete newUser.dataValues.Contraseña;
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
