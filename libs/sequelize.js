import { Sequelize } from "sequelize";
import { config } from "../config/config.js";

import setupModels from "../db/models/index.js";

// Elimino las variables de URI, PASSWORD y USER

// Creo la variable options:
const options = {
  dialect: "postgres",
  logging: config.isProd ? false : true,
};

// Pregunto si estamos en producción:
if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
};

// Cambio como primer parámetro a URI por config.dbUrl
// y como segundo parámetro le pasamos options:
const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);


export { sequelize };
