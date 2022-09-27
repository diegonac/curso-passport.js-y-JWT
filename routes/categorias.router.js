import express from "express";
import categoriasService from "../services/categorias.service.js";
import validatorHandler from "../middlewares/validator.handler.js";
import { buscarCategoriaSchema, crearCategoriaSchema, modificarCategoriaSchema } from "../schemas/categorias.schema.js";
import passport from "passport";

// Importamos checkRole():
import { checkRole } from "../middlewares/auth.handler.js";

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
    passport.authenticate("jwt", {session: false}),

    // Agregamos en los endpoint que queremos
    // Agregamos después del passport
    // Debemos pasarle un array con los roles que tendrán permisos de accionar el endpoint:
    checkRole("administrador", "vendedor"),
    // En este caso solo los usuarios con rol de administrador y vendedor podrán crear categorías

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
    passport.authenticate("jwt", {session: false}),
    checkRole("administrador", "vendedor"),
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

	router.patch("/:id",
    passport.authenticate("jwt", {session: false}),
    checkRole("administrador", "vendedor"),
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
    passport.authenticate("jwt", {session: false}),
    checkRole("administrador", "vendedor"),
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
