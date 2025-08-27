import sql from "mssql";
import { config as env } from "./env";

export const dbConfig: sql.config = {
  user: env.dbUser,
  password: env.dbPassword,
  server: env.dbServer,
  database: env.dbName,
  options: {
    encrypt: false, // true si usas Azure
    trustServerCertificate: true, // para desarrollo local
  },
};

export async function getConnection() {
  try {
    console.log("Connecting to DB with config:", dbConfig);
    const pool = await sql.connect(dbConfig);
    return pool;
  } catch (err) {
    console.error("Database connection error:", err);
    throw err;
  }
}
