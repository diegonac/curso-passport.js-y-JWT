import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize.js";
import ordenesProductosService from "./ordenes-productos.service.js";
const serviceOrderProduct = new ordenesProductosService();

import { Op } from "sequelize";

const { models }  = sequelize;

class productosService {
  constructor() {
  };

  async buscar(query) {
    const opciones = {
      include: ["categoria"],
      where: {},
    };
    const { offset, limit } = query;
    if (offset && limit) {
      opciones.offset = offset;
      opciones.limit = limit;
    };

    const { Precio } = query;
    if (Precio) {
      opciones.where.Precio = Precio;
    };
    const { precioMin, precioMax } = query;
    if ((precioMin && precioMax) && precioMax > precioMin) {
      opciones.where.Precio = {
        [Op.gte]: precioMin,
        [Op.lte]: precioMax,
      };
    }
    else if (precioMax <= precioMin) {
      throw boom.conflict("El precio máximo debe ser mayor que el precio mínimo");
    };
    if (precioMax && !precioMin) {
      opciones.where.Precio = {
        [Op.lte]: precioMax,
      };
    };


    const res = await models.Product.findAll(opciones);
		return res;
  };

  async buscarId(id) {
    const product = await models.Product.findByPk(id, {
      include: ["categoria"],
    });
		if (!product) {
			throw boom.notFound("El producto no existe");
		};
		return product;
  };

  async crear(body) {
    const product = await models.Product.findByPk(body["id"]);
		if (product) throw boom.conflict("El producto ya existe, seleccione otro id");
    const categoria = await models.Category.findByPk(body.categoriaId);
    if(!categoria) throw boom.notFound("La categoría no existe");
    const newProduct = await models.Product.create(body);
		return newProduct;
  };

  async modificar(id, body) {
    const product = await this.buscarId(id);
    const orders = await models.Order.findAll({where: {estado: "pendiente"}});
    if(body.precio && orders){
     const promises = orders.map(async order => {
        const orderProducts = await models.OrderProduct.findAll({where: {productoId: id, ordenId: order.dataValues.id}});
        const promises = orderProducts.map(async orderProduct => {
          const id = orderProduct.dataValues.id;
          await serviceOrderProduct.modificar(id, {
           precio: body.precio,
          });
        });
        await Promise.all(promises);
      });
      await Promise.all(promises);
    };

		const res = await product.update({
			...product,
			...body,
		});
		return res;
  };

  async eliminar(id) {
    const product = await this.buscarId(id);
		const nombre = product["nombre"];
    await product.destroy();
		return {
      id,
      nombre,
    };
  };
};

export default productosService;
