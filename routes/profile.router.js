import express from "express";
import passport from "passport";
import ordenesService from "../services/ordenes.service.js";
import usuariosService from "../services/usuarios.service.js";
import { modificarUsuarioSchema } from "../schemas/usuarios.schema.js";
import validatorHandler from "../middlewares/validator.handler.js";
import { buscarOrdenSchema } from "../schemas/ordenes.schema.js";

const serviceOrder = new ordenesService();
const serviceUser = new usuariosService();
const router = express.Router();

router.get("/mis-ordenes",
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await serviceOrder.buscarPorUsuario(user.sub);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/mi-perfil",
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const myUser = await serviceUser.buscarId(user.sub);
      res.json(myUser);
    } catch (error) {
      next(error);
    }
  }
);

router.put("/mis-ordenes/comprar/:id",
    passport.authenticate("jwt", {session: false}),
    validatorHandler(buscarOrdenSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const body = {
          estado: "vendido",
        };
        const user = req.user.sub;
        const orden = await serviceOrder.estado(id, body, user);
        res.json({
          message: "Comprado",
          orden,
        });
      } catch (error) {
          next(error);
      };
    }
  );

  router.delete("/mis-ordenes/cancelar/:id",
  passport.authenticate("jwt", {session: false}),
  validatorHandler(buscarOrdenSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = {
        estado: "cancelado",
      };
      const user = req.user.sub;
      const orden = await serviceOrder.estado(id, body, user);
      await serviceOrder.eliminar(id);
      res.json({
        message: "Cancelado",
        id,
      });
    } catch (error) {
        next(error);
    };
  }
);

router.put("/mi-perfil/editar",
  passport.authenticate("jwt", {session: false}),
  validatorHandler(modificarUsuarioSchema, "body"),
  async (req, res, next) => {
    try {
      const user = req.user;
      const body = req.body;
      const myUser = await serviceUser.modificar(user.sub, body);
      res.json({
        message: "Perfil actualizado",
        myUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put("/mi-perfil/editar/password",
  passport.authenticate("jwt", {session: false}),
  validatorHandler(modificarUsuarioSchema, "body"),
  async (req, res, next) => {
    try {
      const user = req.user;
      const body = req.body;
      const myUser = await serviceUser.modificarPassword(user.sub, body);
      res.json({
        message: "Contraseña actualizada",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/mi-perfil",
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const myUser = await serviceUser.eliminar(user.sub);
      res.json({
        message: "Usuario eliminado",
        myUser
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
