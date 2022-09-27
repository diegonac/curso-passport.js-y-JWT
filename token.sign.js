// Importamos jsonwebtoken:
import jwt from "jsonwebtoken";

// Guardamos en variable nuestra clave secreta:
const secret = "mydog";

// Creamos el payload (que es lo que vamos a
// encriptar dentro del token, la data):
const payload = {
  // Establecemos el sub (que es como vamos
  // a identificar al usuario):
  sub: 1, // Ponemos de ejemplo "1"
  rol: "administrador",
  // Valores que podemos poner:
  // scope: determina los permisos que habilita el token
  // role: establece el rol que tiene el usuario
};

// Creamos una función que genere el token:
function signToken (payload, secret) {
  // Le pasamos los parámetros "payload" y "secret":
  return jwt.sign(payload, secret);
};

// Guardamos en una variable la función:
const token = signToken(payload, secret);
console.log(token);
