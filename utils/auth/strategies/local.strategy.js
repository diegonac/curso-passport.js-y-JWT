import { Strategy } from "passport-local";
import authService from "../../../services/auth.service.js";
// Podemos borrar las importaciones de boom y bcrypt

// Cambiamos el servicio al de auth:
const service = new authService();
const localStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "contraseña",
  },
  async (email, password, done) => {
    try {
      const user = await service.getUser(email, password);
      done(null, user);

    } catch (error) {
      done(error, false);
    };
  }
);

export default localStrategy;
