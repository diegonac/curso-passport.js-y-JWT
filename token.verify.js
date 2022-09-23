// Importamos jsonwebtoken:
import jwt from "jsonwebtoken";

// Guardamos en variable nuestra clave secreta:
const secret = "mydog";

// Guardamos el token en una variable:
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY2Mzk1MzkzN30.v2NCQfmxwjj-ZTvcdjubL8GnJMgcERsM78yksO_D7tE";

// Creamos una función que verifique el token:
function verifyToken (token, secret) {
  // Le pasamos los parámetros "token" y "secret":
  return jwt.verify(token, secret);
};

// Guardamos en una variable la función:
const payload = verifyToken(token, secret);
console.log(payload);
