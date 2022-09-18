import { config } from "../config/config.js";


// Elimino las variables de URI, PASSWORD y USER


// Cambiamos URI por config.dbUrl:
export default {
  development: {
    url: config.dbUrl,
    dialect: "postgres",
  },
  // Agregamos ssl a production:
  production: {
    url: config.dbUrl,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
