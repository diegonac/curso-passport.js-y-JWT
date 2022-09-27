import express from "express";
import clientesService from "../services/clientes.service.js";
import validatorHandler from "../middlewares/validator.handler.js";
import { buscarClienteSchema, crearClienteSchema, modificarClienteSchema } from "../schemas/clientes.schema.js";
import passport from "passport";
import { checkRole } from "../middlewares/auth.handler.js";

const router = express.Router();
const service = new clientesService();

router.get("/",
  passport.authenticate("jwt", {session: false}),
  checkRole("administrador", "vendedor", "cliente"),
  async (req, res) => {
	  res.json(await service.buscar());
  }
);

router.get("/:id",
  passport.authenticate("jwt", {session: false}),
  checkRole("administrador", "vendedor", "cliente"),
  validatorHandler(buscarClienteSchema, "params"),
  async (req, res, next) => {
	  try {
		  const { id } = req.params;
		  const cliente = await service.buscarId(id);
	  	res.json(cliente);
	  } catch (error) {
	  	  next(error);
	  };
  }
);

	router.post("/crear",
    validatorHandler(crearClienteSchema, "body"),
    async (req, res, next) => {
      try {
        const body = req.body;
        const cliente = await service.crear(body);
        res.status(201).json({
          message: "Creado",
          cliente,
        });
      } catch (error) {
          next(error);
      };
    }
);

	router.put("/:id",
    passport.authenticate("jwt", {session: false}),
    checkRole("administrador", "cliente"),
    validatorHandler(buscarClienteSchema, "params"),
    validatorHandler(modificarClienteSchema, "body"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const body = req.body;
        const cliente = await service.modificar(id, body);
        res.json({
          message: "Modificado",
          cliente,
        });
      } catch (error) {
          next(error);
      };
    }
  );

	router.patch("/:id",
    passport.authenticate("jwt", {session: false}),
    checkRole("administrador", "cliente"),
    validatorHandler(buscarClienteSchema, "params"),
    validatorHandler(modificarClienteSchema, "body"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const body =  req.body;
        const cliente = await service.modificar(id, body);
        res.json({
          message: "Modificado",
          cliente,
        });
      } catch (error) {
          next(error);
      };
    }
  );

	router.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    checkRole("administrador", "cliente"),
    validatorHandler(buscarClienteSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const cliente = await service.eliminar(id);
        res.json({
          message: "Eliminado",
          cliente,
        });
      } catch (error) {
          next(error);
      };
    }
  );

export default router;
