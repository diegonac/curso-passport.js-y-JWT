// Importamos express:
import express from "express";

// Importamos passport:
import passport from "passport";

// Importamos el servicio de ordenes:
import ordenesService from "../services/ordenes.service.js";

// Creamos el servicio de ordenes:
const service = new ordenesService();

// Creamos un router:
const router = express.Router();

// Creamos el siguiente endpoint:
router.get("/mis-ordenes",
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) => {
    try {
      // Req.user es el payload del token:
      const user = req.user;
      const orders = await service.buscarPorUsuario(user.sub);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

// Exportamos:
export default router;
