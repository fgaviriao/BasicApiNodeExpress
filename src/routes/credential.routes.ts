import { Router } from "express";
import {
  requestPasswordReset,
  resetPassword,
} from "../controllers/credential.controller";

const router = Router();
router.post("/credentials/request_password_reset", requestPasswordReset);

router.put("/credentials/reset_password", resetPassword);

export default router;
