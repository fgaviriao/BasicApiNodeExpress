import swaggerAutogen from "swagger-autogen";
import { credential } from "./definitions/credential.js";
import { auth } from "./definitions/auth.js";
import { user } from "./definitions/user.js";

const outputFile = "./swagger.json";
const endpointsFiles = ["../app.ts"];
const definitions = { ...user, ...credential, ...auth };

const doc = {
  info: {
    title: "API Template",
    description:
      "Plantilla de API con Node, Express y TypeScript para iniciar proyectos rápidamente.",
    version: "1.0.0",
  },
  host: "localhost:4000",
  basePath: "/",
  schemes: ["http"],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
  definitions,
};

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc).then(() =>
  console.log("Swagger generado")
);
