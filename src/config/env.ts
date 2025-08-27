import dotenv from "dotenv";
dotenv.config();
if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
  throw new Error("Faltan variables de entorno para los JWT secrets");
}
if (!process.env.DB_SERVER) {
  throw new Error("Falta la variable de entorno DB_SERVER");
}
export const config = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
  dbServer: process.env.DB_SERVER as string,
  dbUser: process.env.DB_USER as string,
  dbPassword: process.env.DB_PASSWORD as string,
  dbName: process.env.DB_DATABASE as string,
};
