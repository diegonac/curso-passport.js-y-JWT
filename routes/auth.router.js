import express from "express";
import passport from "passport";
import authService from "../services/auth.service.js";

// Importamos el schema de modificar usuarios:
import { modificarUsuarioSchema } from "../schemas/usuarios.schema.js";

// Importamos el validatorHandler:
import validatorHandler from "../middlewares/validator.handler.js";

const service = new authService();

const router = express.Router();

router.post("/login",
  passport.authenticate("local", {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(await service.signToken(user));
    } catch (error) {
      next(error);
    }
  },
);

router.post("/recuperar",
  async (req, res, next) => {
    try {
      const { email } = req.body;
      // Cambiamos el método a resetPassword():
      const respuesta = await service.sendRecovery(email);
      res.json(respuesta);
    } catch (error) {
      next(error);
    }
  }
);

// Creamos una nueva ruta para el cambio de contraseña:
router.post("/change-password",
  // Agregamos la validación del schema para modificar:
  validatorHandler(modificarUsuarioSchema, "body"),
  async (req, res, next) => {
    try {
      // Tener en cuenta: const {} = req.body sacará del body lo que le pidamos
      // es decir si escribimos mal token por ejemplo "toquen" no nos traerá
      // nada. Debemos escribir tal cual se escribió en el body al realizar la petición
      // debemos escribir: const { token, nuevaContraseña } = req.body;
      // porque así se escribió las propiedades el cliente cuando las envió
      const { token, nuevaContraseña } = req.body;
      const respuesta = await service.changePassword(token, nuevaContraseña);
      res.json(respuesta);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
