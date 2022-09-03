import express from "express";
import productosService from "../services/productos.service.js";
import validatorHandler from "../middlewares/validator.handler.js";
import { buscarProductoSchema, crearProductoSchema, modificarProductoSchema } from "../schemas/productos.schema.js";

const router = express.Router();
const service = new productosService();

router.get("/", async (req, res) => {
	res.json(await service.buscar());
});

router.get("/:id",
  validatorHandler(buscarProductoSchema, "params"),
  async (req, res, next) => {
	  try {
		  const { id } = req.params;
		  const producto = await service.buscarId(id);
	  	res.json(producto);
	  } catch (error) {
	  	  next(error);
	  };
  }
);

	router.post("/crear",
    validatorHandler(crearProductoSchema, "body"),
    async (req, res, next) => {
      try {
        const body = req.body;
        const producto = await service.crear(body);
        res.status(201).json({
          message: "Creado",
          producto,
        });
      } catch (error) {
          next(error);
      };
    }
);

	router.put("/:id",
    validatorHandler(buscarProductoSchema, "params"),
    validatorHandler(modificarProductoSchema, "body"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const body = req.body;
        const producto = await service.modificar(id, body);
        res.json({
          message: "Modificado",
          producto,
        });
      } catch (error) {
          next(error);
      };
    }
  );

	router.patch("/:id/",
    validatorHandler(buscarProductoSchema, "params"),
    validatorHandler(modificarProductoSchema, "body"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const body =  req.body;
        const producto = await service.modificar(id, body);
        res.json({
          message: "Modificado",
          producto,
        });
      } catch (error) {
          next(error);
      };
    }
  );

	router.delete("/:id",
    validatorHandler(buscarProductoSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const producto = await service.eliminar(id);
        res.json({
          message: "Eliminado",
          producto,
        });
      } catch (error) {
          next(error);
      };
    }
  );

export default router;
