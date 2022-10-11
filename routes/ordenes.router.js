import express from "express";
import ordenesService from "../services/ordenes.service.js";
import validatorHandler from "../middlewares/validator.handler.js";
import { buscarOrdenSchema, crearOrdenSchema, modificarOrdenSchema } from "../schemas/ordenes.schema.js";
import passport from "passport";
import { checkRole } from "../middlewares/auth.handler.js";

const router = express.Router();
const service = new ordenesService();

router.get("/",
  passport.authenticate("jwt", {session: false}),
  checkRole("administrador", "vendedor"),
  async (req, res) => {
	  res.json(await service.buscar());
  }
);

router.get("/:id",
  passport.authenticate("jwt", {session: false}),
  checkRole("administrador", "vendedor"),
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
    passport.authenticate("jwt", {session: false}),
    checkRole("administrador", "cliente"),
    validatorHandler(crearOrdenSchema, "body"),
    async (req, res, next) => {
      try {
        const body = req.user.sub;
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
    passport.authenticate("jwt", {session: false}),
    checkRole("administrador", "vendedor"),
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



	router.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    checkRole("administrador"),
    validatorHandler(buscarOrdenSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const orden = await service.eliminar(id);
        res.json({
          message: "Eliminado",
          id,
        });
      } catch (error) {
          next(error);
      };
    }
  );

export default router;
