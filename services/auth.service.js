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
    // Eliminamos contraseña y recoveryToken:
    delete user.dataValues.contraseña;
    delete user.dataValues.recoveryToken;
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

  async changePassword(token, nuevaContraseña) {
    try {
      const payload = jwt.verify(token, config.jwtSecretRecovery);
      const user = await service.buscarId(payload.sub);
      if(user.recoveryToken !== token) {
        throw boom.unauthorized("Error de token");
      };
      const hash = await bcrypt.hash(nuevaContraseña, 10);
      await service.modificar(user.id, {recoveryToken: null, contraseña: hash})
      return { message: "Se ha cambiado la contraseña con éxito" };
    } catch (error) {
      throw boom.unauthorized();
    }
  };

};


export default authService;
