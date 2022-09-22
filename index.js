import express from "express";
import routerApi from "./routes/index.js";
import { logErr, errorHandler, boomErrorHandler, ormErrorHandler } from "./middlewares/error.handler.js";
import cors from "cors";
import checkApiKey from "./middlewares/auth.handler.js";

// Importamos de la siguiente manera el index.js de la carpeta "auth" de la carpeta "utils":
import {} from "./utils/auth/index.js";

const expressApp = express();
const PORT = process.env.PORT || 3000;
expressApp.listen(PORT, () => {
	console.log(`Servidor levantado en el puerto: ${PORT}`);
});

expressApp.use(express.json());
expressApp.use(express.text());

const whitelist = ["http://localhost:8000", "https://unejemplocualquiera.com"];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("No permitido"));
    }
  }
};
expressApp.use(cors());

expressApp.get("/", (req, res) => {
  res.send("Bienvenido a mi api rest");
});

expressApp.get("/nueva-pagina",
  checkApiKey,
  (req, res) => {
    res.send("Nueva página je");
  }
);

routerApi(expressApp);

expressApp.use(logErr);

expressApp.use(ormErrorHandler);
expressApp.use(boomErrorHandler);
expressApp.use(errorHandler);
