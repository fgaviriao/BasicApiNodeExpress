import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.json"; // Asegúrate de que este archivo exista después de generar la documentación

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Importa y usa tus rutas
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import credentialRoutes from "./routes/credential.routes";
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", credentialRoutes);

export default app;
