// Importamos nodemailer:
import nodemailer from "nodemailer";

// Creamos la siguiente función asíncrona:
async function sendMail() {
  // Copiamos y pegamos el siguiente código:
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // Le decimos que el servidor smtp va a ser gmail.com:
    host: "smtp.gmail.com",
    // Le damos el puerto "465":
    port: 465,
    // Le decimos que es seguro porque es google:
    secure: true, // true for 465, false for other ports
    auth: {
      // Ponemos la cuenta de google:
      user: "diegonacimientoJWT@gmail.com",

      // Pegamos la contraseña que nos dió google:
      pass: "quszwfjullrklgkd",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    // Quién envía el correo?:
    from: 'diegonacimientoJWT@gmail.com', // sender address
    // Quién recibirá el correo?:
    to: "diegonacimiento18@gmail.com", // list of receivers
    // El asunto del correo:
    subject: "Este es un nuevo correo", // Subject line
    // El texto:
    text: "Hola Diego", // plain text body
    // El html:
    html: "<b>Hola Diego</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
sendMail();
