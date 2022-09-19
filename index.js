import express from "express";
import routerApi from "./routes/index.js";
import { logErr, errorHandler, boomErrorHandler, ormErrorHandler } from "./middlewares/error.handler.js";

import cors from "cors";

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
routerApi(expressApp);

expressApp.use(logErr);

expressApp.use(ormErrorHandler);
expressApp.use(boomErrorHandler);
expressApp.use(errorHandler);
