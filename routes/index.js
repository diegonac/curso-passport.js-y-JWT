import productosRouter from "./productos.router.js";
import usuariosRouter from "./usuarios.router.js";
import clientesRouter from "./clientes.router.js";
import categoriasRouter from "./categorias.router.js";
import ordenesRouter from "./ordenes.router.js";
import ordenesProductosRouter from "./ordenes-productos.router.js";
import express from "express";

function routerApi (expressApp) {
  const router = express.Router();
  expressApp.use("/api/v1", router);
	router.use("/productos", productosRouter);
  router.use("/usuarios", usuariosRouter);
  router.use("/clientes", clientesRouter);
  router.use("/categorias", categoriasRouter);
  router.use("/ordenes", ordenesRouter);
  router.use("/carrito", ordenesProductosRouter);
};

export default routerApi;
