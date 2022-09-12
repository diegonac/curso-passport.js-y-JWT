import express from "express";
import ordenesService from "../services/ordenes.service.js";
import validatorHandler from "../middlewares/validator.handler.js";
import { buscarOrdenSchema, crearOrdenSchema, modificarOrdenSchema } from "../schemas/ordenes.schema.js";

const router = express.Router();
const service = new ordenesService();

router.get("/", async (req, res) => {
	res.json(await service.buscar());
});

router.get("/:id",
  validatorHandler(buscarOrdenSchema, "params"),
  async (req, res, next) => {
	  try {
		  const { id } = req.params;
		  const orden = await service.buscarId(id);
	  	res.json(orden);
	  } catch (error) {
	  	  next(error);
	  };
  }
);

	router.post("/crear",
    validatorHandler(crearOrdenSchema, "body"),
    async (req, res, next) => {
      try {
        const body = req.body;
        const orden = await service.crear(body);
        res.status(201).json({
          message: "Creado",
          orden,
        });
      } catch (error) {
          next(error);
      };
    }
);

	router.put("/:id",
    validatorHandler(buscarOrdenSchema, "params"),
    validatorHandler(modificarOrdenSchema, "body"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const body = req.body;
        const orden = await service.modificar(id, body);
        res.json({
          message: "Modificado",
          orden,
        });
      } catch (error) {
          next(error);
      };
    }
  );

	router.patch("/:id/",
    validatorHandler(buscarOrdenSchema, "params"),
    validatorHandler(modificarOrdenSchema, "body"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const body =  req.body;
        const orden = await service.modificar(id, body);
        res.json({
          message: "Modificado",
          orden,
        });
      } catch (error) {
          next(error);
      };
    }
  );

	router.delete("/:id",
    validatorHandler(buscarOrdenSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const orden = await service.eliminar(id);
        res.json({
          message: "Eliminado",
          orden,
        });
      } catch (error) {
          next(error);
      };
    }
  );

export default router;
