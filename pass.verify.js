// Importamos bcrypt:
import bcrypt from "bcrypt";

// Guardamos en una variable la contraseña que nos envían:
const password = "ejemplo123!#";

// Creamos una función para verificar la contraseña:
async function verifyPassword () {
  // Guardamos el hash creado en "pass.hash.js":
  const hash = "$2b$10$rNdXowjGsqRrLf.fzi6tNe3Dm2l3vnz77Jc3wc1NqklnLwqPqBcf2";

  // Comparamos con el método compare()
  // 1er parámetro le enviamos la contraseña del usuario
  // 2do parámetro le enviamos el hash
  const isMatch = await bcrypt.compare(password, hash);

  // isMacth será true si la contraseña coincide con el hash
  // y será false si no coincide
  // De esta manera se verifica que la contraseña haya sido bien escrita
  // ya que en la base de datos se guarda el hash más no la contraseña
  console.log(isMatch);
  // Que coincida significa que ese hash pertenece o fue creado a partir
  // de dicha contraseña. Cada usuario tendrá su hash, el cual es comparado
  // con una contraseña al ingresarla, se comparan y si coinciden se da el acceso
  // al usuario y si no coincide se lanza un error de contraseña incorrecta
};

// Ejecutamos la función:
verifyPassword();

