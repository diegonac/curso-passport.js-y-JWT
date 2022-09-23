import passport from "passport";

import localStrategy from "./strategies/local.strategy.js";

// Importamos jwtStrategy:
import jwtStrategy from "./strategies/jwt.strategy.js";

passport.use(localStrategy);

// Le decimos a passport que lo use:
passport.use(jwtStrategy);
