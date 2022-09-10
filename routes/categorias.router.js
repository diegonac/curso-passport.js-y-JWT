import express from "express";
import categoriasService from "../services/categorias.service.js";
import validatorHandler from "../middlewares/validator.handler.js";
import { buscarCategoriaSchema, crearCategoriaSchema, modificarCategoriaSchema } from "../schemas/categorias.schema.js";

const router = express.Router();
const service = new categoriasService();

router.get("/", async (req, res) => {
	res.json(await service.buscar());
});

router.get("/:id",
  validatorHandler(buscarCategoriaSchema, "params"),
  async (req, res, next) => {
	  try {
		  const { id } = req.params;
		  const categoria = await service.buscarId(id);
	  	res.json(categoria);
	  } catch (error) {
	  	  next(error);
	  };
  }
);

	router.post("/crear",
    validatorHandler(crearCategoriaSchema, "body"),
    async (req, res, next) => {
      try {
        const body = req.body;
        const categoria = await service.crear(body);
        res.status(201).json({
          message: "Creado",
          categoria,
        });
      } catch (error) {
          next(error);
      };
    }
);

	router.put("/:id",
    validatorHandler(buscarCategoriaSchema, "params"),
    validatorHandler(modificarCategoriaSchema, "body"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const body = req.body;
        const categoria = await service.modificar(id, body);
        res.json({
          message: "Modificado",
          categoria,
        });
      } catch (error) {
          next(error);
      };
    }
  );

	router.patch("/:id/",
    validatorHandler(buscarCategoriaSchema, "params"),
    validatorHandler(modificarCategoriaSchema, "body"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const body =  req.body;
        const categoria = await service.modificar(id, body);
        res.json({
          message: "Modificado",
          categoria,
        });
      } catch (error) {
          next(error);
      };
    }
  );

	router.delete("/:id",
    validatorHandler(buscarCategoriaSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const categoria = await service.eliminar(id);
        res.json({
          message: "Eliminado",
          categoria,
        });
      } catch (error) {
          next(error);
      };
    }
  );

export default router;
