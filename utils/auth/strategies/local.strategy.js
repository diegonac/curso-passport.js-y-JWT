// Importamos "Strategy" de passport-local:
import { Strategy } from "passport-local";

// Importamos el servicio de usuarios:
import usuariosService from "../../../services/usuarios.service.js";

// Importamos boom:
import boom from "@hapi/boom";

// Importamos bcrypt:
import bcrypt from "bcrypt";

// Creamos una clase de usuariosService:
const service = new usuariosService();

// Creamos una clase de Strategy y configuramos la estrategia de negocio:
// email => email
// password => contraseña
// done => es una función
// Strategy es asíncrono, nos devuelve una promesa
const localStrategy = new Strategy(
  {
    // Aquí podemos elegir como queremos que sea el schema de login:
    usernameField: "Email",
    passwordField: "Contraseña",
  },
  async (email, password, done) => {
    try {

      // Le pedimos que busque el usuario que tenga el email:
      const usuario = await service.buscarEmail(email);

      // En caso de que no exista el usuario:
      if(!usuario) {
        // En las estrategias de autenticación los errores se envían
        // junto a un false como 2do parámetro:
        done(boom.unauthorized(), false);
      };

      // Si el usuario existe debemos comparar la contraseña con el hash,
      // para ver si es correcta la contraseña ingresada:
      const isMatch = await bcrypt.compare(password, usuario.Contraseña);

      // Si isMatch es false la contraseña ingresada es incorrecta:
      if(!isMatch) {
        done(boom.unauthorized(), false);
      };

      // Antes de enviar el usuario debemos eliminar la contraseña
      // para que no se vea:
      delete usuario.dataValues.Contraseña;

      // Finalmente si todo salió bien envíamos done() con los parámetros
      // 1er parámetro null, diciendo que no hay errores
      // 2do parámetro le enviamos el usuario:
      done(null, usuario);

    } catch (error) {
      // Si algo sale mal le enviamos con done(), 1 el error y 2 false,
      // false significa que no se pudo realizar:
      done(error, false);
    };
  }
);

// Exportamos "localStrategy":
export default localStrategy;
