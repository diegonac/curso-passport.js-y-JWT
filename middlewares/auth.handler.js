import boom from "@hapi/boom";
import { config } from "../config/config.js";

function checkApiKey (req, res, next) {
  const apiKey = req.headers["api"];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  };
};

// Creamos la siguiente función middleware:
function checkRole (...roles) {
  return (req, res, next) => {
    const user = req.user;
    // En el array de roles debemos preguntar si contiene el rol del user:
    if (roles.includes(user.rol)) {
      next();
    } else {
      next(boom.unauthorized("No tiene los permisos de requeridos para realizar la acción"));
    };
  };
};

// Exportamos "checkRole":
export { checkApiKey, checkRole };
