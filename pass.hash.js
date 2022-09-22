// Importamos bcrypt:
import bcrypt from "bcrypt";

// Guardamos en una variable la contraseña que nos envían:
const password = "ejemplo123!#";

// bcrypt es asíncrono por lo tanto nos devuelve una promesa
// Nos conviene trabajarlo con una función asíncrona:
async function hashing () {
  // Hasheamos con bcrypt,
  // hash(),
  // 1er parámetro le enviamos la variable que contiene la contraseña
  // 2do parámetro le decimos cuántas veces debe encriptar
  const hash = await bcrypt.hash(password, 10);
  console.log(hash);
};

// Ejecutamos la función:
hashing();

