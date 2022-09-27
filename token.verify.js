// Importamos jsonwebtoken:
import jwt from "jsonwebtoken";

// Guardamos en variable nuestra clave secreta:
const secret = "mydog";

// Guardamos el token en una variable:
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbCI6ImFkbWluaXN0cmFkb3IiLCJpYXQiOjE2NjQzMDU1MTN9.hsq7tJjXa6XPCaEZ2-fnfKhNzo3sgEyqh052Gv1hwmY";

// Creamos una función que verifique el token:
function verifyToken (token, secret) {
  // Le pasamos los parámetros "token" y "secret":
  return jwt.verify(token, secret);
};

// Guardamos en una variable la función:
const payload = verifyToken(token, secret);
console.log(payload);
