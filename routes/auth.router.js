import express from "express";
import passport from "passport";

// Importamos jwt:
import jwt from "jsonwebtoken";

// Importamos el environment de secret:
import { config } from "../config/config.js";

const router = express.Router();

router.post("/login",
  passport.authenticate("local", {session: false}),

  async (req, res, next) => {
    try {
      // Guardamos el user:
      const user = req.user;

      // Creamos un payload:
      const payload = {
        // En sub establecemos el id del user:
        sub: user.id,
      };

      // Creamos el token:
      const token = jwt.sign(payload, config.jwtSecret);

      // Enviamos como respuesta lo siguiente:
      res.json({
        user,
        token,
      });

    } catch (error) {
      next(error);
    }
  },
);

export default router;
