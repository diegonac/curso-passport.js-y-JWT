import usuariosService from "./usuarios.service.js";
import boom from "@hapi/boom";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import nodemailer from "nodemailer";

const service = new usuariosService();

class authService {
  async getUser(email, password) {
    const user = await service.buscarEmail(email);
    if(!user) {
      throw boom.notFound();
    };
    const isMatch = await bcrypt.compare(password, user.contraseña);
    if(!isMatch) {
      throw boom.unauthorized("Contraseña incorrecta");
    };
    delete user.dataValues.contraseña;
    return user;
  };

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

  async sendRecovery(email) {
    const user = await service.buscarEmail(email);
    if(!user) {
      throw boom.unauthorized();
    };
    const payload = {sub: user.id};
    const token = jwt.sign(payload, config.jwtSecretRecovery, {expiresIn: "15 min"});
    const link = `https://myfrontend.com/recovery?token=${token}`;
    await service.modificar(user.id, {recoveryToken: token});

    const mail = {
      from: 'diegonacimientoJWT@gmail.com',
      to: `${user.email}`,
      subject: "Recuperación de contraseña",
      html: `<b>Entre al siguiente link para restaurar su contraseña: ${link}`,
    };

    const rta = await this.sendMail(mail);

    return rta;
  };

  async sendMail(infoEmail) {

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: config.ggMail,
        pass: config.ggKey,
      },
    });

    await transporter.sendMail(infoEmail);
    return { message: "mail enviado" };
  };

  // Creamos una función asíncrona para cambiar la contraseña:
  async changePassword(token, nuevaContraseña) {
    try {
      // Verificamos el token:
      // Le pasamos el token y la clave secreta utilizada para el cambio
      // de contraseña:
      const payload = jwt.verify(token, config.jwtSecretRecovery);
      // Si todo sale bien nos devuelve el payload
      // Guardamos el usuario:
      const user = await service.buscarId(payload.sub);

      // Preguntamos si el token es diferente con el recoveryToken de la base de datos:
      if(user.recoveryToken !== token) {
        // Si es diferente lanzamos un error:
        throw boom.unauthorized("Error de token");
      };

      // Hasheamos la nueva contraseña:
      console.log(nuevaContraseña)
      const hash = await bcrypt.hash(nuevaContraseña, 10);

      // Modificamos la contraseña y borramos el recoveryToken:
      await service.modificar(user.id, {recoveryToken: null, contraseña: hash})

      // Podemos retornar un mensaje:
      return { message: "Se ha cambiado la contraseña con éxito" };

    } catch (error) {
      throw boom.unauthorized();
    }
  };

};


export default authService;
