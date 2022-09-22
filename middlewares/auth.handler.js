// Importamos boom:
import boom from "@hapi/boom";

// Importamos config para traer la enviroment apiKey:
import { config } from "../config/config.js";

// Creamos la función para el middleware:
function checkApiKey (req, res, next) {

  // Guardamos en una variable la "apiKey" de los headers:
  const apiKey = req.headers["api"];

  // Preguntamos si la apiKey tiene el valor correspondiente:
  if (apiKey === config.apiKey) {

    // Si tiene el valor correspondiente le damos next():
    next();

  } else {

    // Si no tiene el valor correspondiente lanzamos un error:
    next(boom.unauthorized());
  };
};

// Exportamos checkApiKey:
export default checkApiKey;
