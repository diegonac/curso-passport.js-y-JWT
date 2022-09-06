import productosRouter from "./productos.router.js";
import usuariosRouter from "./usuarios.router.js";
import clientesRouter from "./clientes.router.js";
import express from "express";

function routerApi (expressApp) {
  const router = express.Router();
  expressApp.use("/api/v1", router);
	router.use("/productos", productosRouter);
  router.use("/usuarios", usuariosRouter);
  router.use("/clientes", clientesRouter);
};

export default routerApi;
