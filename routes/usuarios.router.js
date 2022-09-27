import express from "express";
import usuariosService from "../services/usuarios.service.js";
import validatorHandler from "../middlewares/validator.handler.js";
import { buscarUsuarioSchema, crearUsuarioSchema, modificarUsuarioSchema } from "../schemas/usuarios.schema.js";
import passport from "passport";
import { checkRole } from "../middlewares/auth.handler.js";

const router = express.Router();
const service = new usuariosService();

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
    passport.authenticate("jwt", {session: false}),
    checkRole("administrador", "cliente"),
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

	router.patch("/:id",
    passport.authenticate("jwt", {session: false}),
    checkRole("administrador", "cliente"),
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
    passport.authenticate("jwt", {session: false}),
    checkRole("administrador", "cliente"),
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
