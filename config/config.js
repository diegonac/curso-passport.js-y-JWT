import dotenv from "dotenv";
dotenv.config();

const config = {
	env: process.env.NODE_ENV || "dev",

  // Agregamos en el entorno de producción:
  isProd: process.env.NODE_ENV === "production",

	port: process.env.PORT || 3000,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbHost: process.env.DB_HOST,
	dbName: process.env.DB_NAME,
	dbPort: process.env.DB_PORT,

  // Agregamos a la variable DATABASE_URL:
  dbUrl: process.env.DATABASE_URL,
};

export { config };
