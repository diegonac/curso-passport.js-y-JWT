import productosRouter from "./productos.router.js";
import usuariosRouter from "./usuarios.router.js";
import express from "express";

function routerApi (expressApp) {
  const router = express.Router();
  expressApp.use("/api/v1", router);
	router.use("/productos", productosRouter);
  router.use("/usuarios", usuariosRouter);
};

export default routerApi;
