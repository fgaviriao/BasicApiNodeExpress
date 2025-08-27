import { create } from "domain";
import { ref } from "process";
import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger.json";
const endpointsFiles = [
  "../routes/user.routes.ts",
  "../routes/auth.routes.ts",
  "../routes/credential.routes.ts",
  "../controllers/user.controller.ts",
  "../controllers/auth.controller.ts",
  "../controllers/credential.controller.ts",
];

const doc = {
  info: {
    title: "API Template",
    description:
      "Plantilla de API con Node, Express y TypeScript para iniciar proyectos rápidamente.",
    version: "1.0.0",
  },
  host: "localhost:4000",
  basePath: "/api",
  schemes: ["http"],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
  definitions: {
    User: {
      id: 1,
      username: "johndoe",
      email: "correo@ejemplo.com",
    },
    Users: [
      {
        id: 1,
        username: "johndoe",
        email: "correo@ejemplo.com",
      },
    ],
    CreateUserRequest: {
      username: "johndoe",
      email: "correo@ejemplo.com",
      password: "password",
      firstName: "John",
      lastName: "Doe",
    },
    EditUserRequest: {
      username: "johndoe",
      email: "correo@ejemplo.com",
      password: "password",
      firstName: "John",
      lastName: "Doe",
      isActive: true,
      isLocked: true,
    },
    EditUserActiveStateRequest: {
      id: 1,
      isActive: true,
    },
    EditUserLockedStateRequest: {
      id: 1,
      isLocked: true,
    },
    LoginRequest: {
      username: "johndoe",
      password: "password",
    },
    LoginResponse: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      refreshToken: "d1f1e1c1-1a1a-1b1b-1c1c-1d1d1e1e1f1f",
      expiresIn: 3600,
    },
    RefreshTokenRequest: {
      refreshToken: "d1f1e1c1-1a1a-1b1b-1c1c-1d1d1e1e1f1f",
    },
    RefreshTokenResponse: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      expiresIn: 3600,
    },
    Credentials: {
      username: "johndoe",
      password: "password",
    },
    ResetPasswordRequest: {
      email: "correo@ejemplo.com",
    },
    ResetPasswordResponse: {
      email: "correo@ejemplo.com",
      createAt: "2024-01-01T00:00:00.000Z",
      expireAt: "2024-01-01T01:00:00.000Z",
    },
    UpdatePasswordRequest: {
      email: "correo@ejemplo.com",
      password: "password",
      confirmPassword: "password",
      token: "d1f1e1c1-1a1a-1b1b-1c1c-1d1d1e1e1f1f",
    },
    UpdatePasswordResponse: {
      message: "Contraseña actualizada correctamente",
    },
  },
};

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc).then(
  console.log("Swagger generado")
);
