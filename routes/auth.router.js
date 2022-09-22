// Importamos express:
import express from "express";

// Importamos passport:
import passport from "passport";

// Creamos un router:
const router = express.Router();

// Creamos un endpoint de post:
router.post("/login",
  // Le decimos a passport que estrategias vamos a usar,
  // Y le decimos que no queremos sesiones:
  passport.authenticate("local", {session: false}),

  // Luego creamos la función asíncrona para el endpoint:
  async (req, res, next) => {
    try {
      // Damos como respuesta req.user:
      res.json(req.user);

    } catch (error) {
      next(error);
    }
  },
);

// Exportamos el router:
export default router;
