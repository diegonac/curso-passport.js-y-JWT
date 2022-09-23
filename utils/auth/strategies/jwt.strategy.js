// Importamos Strategy y ExtractJwt de passport-jwt:
import { Strategy, ExtractJwt } from "passport-jwt";

// Importamos el environment del secret:
import { config } from "../../../config/config.js";

// Configuramos unas opciones:
const options = {
  // Es donde va a sacar el token:
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

  // Ponemos nuestro secret:
  secretOrKey: config.jwtSecret,

};

// Creamos nuestra estrategia:
const jwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});

// Exportamos jwtStrategy:
export default jwtStrategy;

