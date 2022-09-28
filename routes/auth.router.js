import express from "express";
import passport from "passport";

// Podemos eliminar las importaciones de config y jwt:

// Importamos el servicio de auth:
import authService from "../services/auth.service.js";

// Creamos el servicio de auth:
const service = new authService();

const router = express.Router();

router.post("/login",
  passport.authenticate("local", {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      // Podemos eliminar lo que tenemos en el servicio de auth
      res.json(await service.signToken(user));
    } catch (error) {
      next(error);
    }
  },
);

// Creamos una nueva ruta:
router.post("/recuperar",
  async (req, res, next) => {
    try {
      // Guardamos el email:
      const { email } = req.body;
      // Enviamos el mail:
      const respuesta = await service.sendMail(email);
      // Respondemos:
      res.json(respuesta);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
