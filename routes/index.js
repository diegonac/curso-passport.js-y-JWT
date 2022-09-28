import productosRouter from "./productos.router.js";
import usuariosRouter from "./usuarios.router.js";
import clientesRouter from "./clientes.router.js";
import categoriasRouter from "./categorias.router.js";
import ordenesRouter from "./ordenes.router.js";
import ordenesProductosRouter from "./ordenes-productos.router.js";
import authRouter from "./auth.router.js";

// Importamos el router de profile:
import profileRouter from "./profile.router.js";

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
  router.use("/auth", authRouter);

  // Agregamos el router de profile:
  router.use("/profile", profileRouter);

};

export default routerApi;
