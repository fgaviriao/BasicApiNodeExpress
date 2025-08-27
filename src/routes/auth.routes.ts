import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
router.get("/protected", authenticateToken, authController.protectedRoute);

export default router;
