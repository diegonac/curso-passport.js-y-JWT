import express from "express";
import productosService from "../services/productos.service.js";
import validatorHandler from "../middlewares/validator.handler.js";
import { buscarProductoSchema, crearProductoSchema, modificarProductoSchema, queryProductoSchema } from "../schemas/productos.schema.js";
import passport from "passport";
import { checkRole } from "../middlewares/auth.handler.js";

const router = express.Router();
const service = new productosService();

// Le decimos al get que valide los datos antes de darlos:
router.get("/",
  validatorHandler(queryProductoSchema, "query"),
  async (req, res, next) => {
    // Le enviamos los query al servicio:
    try {
      res.json(await service.buscar(req.query));
    } catch (error) {
      next(error);
    };
  }
);

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
    passport.authenticate("jwt", {session: false}),
    checkRole("administrador", "vendedor"),
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
    passport.authenticate("jwt", {session: false}),
    checkRole("administrador", "vendedor"),
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

	router.patch("/:id",
    passport.authenticate("jwt", {session: false}),
    checkRole("administrador", "vendedor"),
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
    passport.authenticate("jwt", {session: false}),
    checkRole("administrador", "vendedor"),
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
