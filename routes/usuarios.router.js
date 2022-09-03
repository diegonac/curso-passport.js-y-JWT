import express from "express";
import usuariosService from "../services/usuarios.service.js";

import validatorHandler from "../middlewares/validator.handler.js";
import { buscarUsuarioSchema, crearUsuarioSchema, modificarUsuarioSchema } from "../schemas/usuarios.schema.js";

const router = express.Router();
const service = new usuariosService();

router.get("/", async (req, res) => {
	res.json(await service.buscar());
});

router.get("/:id",
  validatorHandler(buscarUsuarioSchema, "params"),
  async (req, res, next) => {
	  try {
		  const { id } = req.params;
		  const usuario = await service.buscarId(id);
	  	res.json(usuario);
	  } catch (error) {
	  	  next(error);
	  };
  }
);

	router.post("/crear",
    validatorHandler(crearUsuarioSchema, "body"),
    async (req, res, next) => {
      try {
        const body = req.body;
        const usuario = await service.crear(body);
        res.status(201).json({
          message: "Creado",
          usuario,
        });
      } catch (error) {
          next(error);
      };
    }
);

	router.put("/:id",
    validatorHandler(buscarUsuarioSchema, "params"),
    validatorHandler(modificarUsuarioSchema, "body"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const body = req.body;
        const usuario = await service.modificar(id, body);
        res.json({
          message: "Modificado",
          usuario,
        });
      } catch (error) {
          next(error);
      };
    }
  );

	router.patch("/:id/",
    validatorHandler(buscarUsuarioSchema, "params"),
    validatorHandler(modificarUsuarioSchema, "body"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const body =  req.body;
        const usuario = await service.modificar(id, body);
        res.json({
          message: "Modificado",
          usuario,
        });
      } catch (error) {
          next(error);
      };
    }
  );

	router.delete("/:id",
    validatorHandler(buscarUsuarioSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const usuario = await service.eliminar(id);
        res.json({
          message: "Eliminado",
          usuario,
        });
      } catch (error) {
          next(error);
      };
    }
  );

export default router;
