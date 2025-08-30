const swaggerAutogen = require("swagger-autogen")();
const { credential } = require("./definitions/credential.ts");
const { auth } = require("./definitions/auth.ts");
const { user } = require("./definitions/user.ts");

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
swaggerAutogen(outputFile, endpointsFiles, doc);
