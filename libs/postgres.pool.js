import pg from "pg";
const { Pool } = pg;

import { config } from "../config/config.js";

// Creamos la variable options:
const options = {};

// Preguntamos el entorno es de producción:
if (config.isProd) {
  options.connectionString = config.dbUrl,
  options.ssl = {
    rejectUnauthorized: false,
  };
} else {
  // En caso de que estemos en desarrollo:
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
  options.connectionString = URI;
};

// Cambiamos el parámetro de new Pool() por options:
const pool = new Pool(options);

export default pool;
