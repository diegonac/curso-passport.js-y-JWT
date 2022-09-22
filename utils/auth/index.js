// Exportamos a passport:
import passport from "passport";

// Importamos "localStrategy":
import localStrategy from "./strategies/local.strategy.js";

// Comenzamos a definir que estrategias vamos a utilizar:
passport.use(localStrategy);
