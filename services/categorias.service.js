import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize.js";
const { models }  = sequelize;

class categoriasService {
  constructor() {
  };

  async buscar() {
    const res = await models.Category.findAll();
		return res;
  };

  async buscarId(id) {
    // // Al hacer un get de una categoría específica, le damos
    // que incluya la información de los productos que contiene:
    const category = await models.Category.findByPk(id, {
      include: ["productos"],
    });
		if (!category) {
			throw boom.notFound("La categoría no existe");
		};
		return category;
  };

  async crear(body) {
    const category = await models.Category.findByPk(body["id"]);
		if (category) {
			throw boom.conflict("La categoría ya existe");
		};
    const newCategory = await models.Category.create(body);
		return newCategory;
  };

  async modificar(id, body) {
    const category = await this.buscarId(id);

		const res = await category.update({
			...category,
			...body,
		});
		return res;
  };

  async eliminar(id) {
    const category = await this.buscarId(id);
		const nombre = category["nombre"];
    await category.destroy();
		return {
      id,
      nombre,
    };
  };
};

export default categoriasService;
