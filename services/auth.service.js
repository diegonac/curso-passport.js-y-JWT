// Importamos el servicio de usuarios:
import usuariosService from "./usuarios.service.js";

// Importamos boom:
import boom from "@hapi/boom";

// Importamos bcrypt:
import bcrypt from "bcrypt";

// Importmaos jwt:
import jwt from "jsonwebtoken";

// Importamos config:
import { config } from "../config/config.js";

// Importamos nodemailer:
import nodemailer from "nodemailer";

// Creamos el servicio de usuarios:
const service = new usuariosService();

// Creamos el servicio de auth:
class authService {
  // Creamos la siguiente función asíncrona:
  async getUser(email, password) {
    // Buscamos y guardamos el usuario:
    const user = await service.buscarEmail(email);
    // Preguntamos si no existe el usuario:
    if(!user) {
      throw boom.notFound();
    };
    // Verificamos si la contraseña ingresada es correcta:
    const isMatch = await bcrypt.compare(password, user.contraseña);
    // Preguntamos si la contraseña es incorrecta:
    if(!isMatch) {
      throw boom.unauthorized("Contraseña incorrecta");
    };
    // Borramos la contraseña del usuario para que no se vea:
    delete user.dataValues.contraseña;
    // Retornamos el usuario:
    return user;
  };

  // Creamos otra función para el firmado con signToken():
  async signToken(user) {
    const payload = {
      sub: user.id,
      rol: user.rol,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    }
  };

  // Creamos otra función para enviar el email:
  async sendMail(email) {
    // Verificamos que el usuario exista:
    const user = await service.buscarEmail(email);
    if(!user) {
      throw boom.notFound("No se encontró un usuario con ese email");
    };

    // Copiamos el trasnporter del "nodemailer.js":
    const transporter = nodemailer.createTransport({
      // Le decimos que el servidor smtp va a ser gmail.com:
      host: "smtp.gmail.com",
      // Le damos el puerto "465":
      port: 465,
      // Le decimos que es seguro porque es google:
      secure: true, // true for 465, false for other ports
      auth: {
        // Ponemos la cuenta de google:
        user: config.ggMail,

        // Pegamos la contraseña que nos dió google:
        pass: config.ggKey,
      },
    });

    // Copiamos el transporter.sendMail():
    await transporter.sendMail({
      // Quién envía el correo?:
      from: 'diegonacimientoJWT@gmail.com', // sender address
      // Quién recibirá el correo?:
      to: `${user.email}`, // Aquí ponemos el parámetro email o la propiedad email de user
      // El asunto del correo:
      subject: "Recuperación de contraseña", // Subject line
      // El texto:
      text: "Entre al siguiente link para restaurar su contraseña: www.recuperatucontraseña.com", // plain text body
      // El html:
      html: "<b>Entre al siguiente link para restaurar su contraseña: www.recuperatucontraseña.com</b>", // html body
    });
    // Si todo sale bien retornamos:
    return { message: "mail enviado" };
  };
};

// Exportamos authService:
export default authService;
