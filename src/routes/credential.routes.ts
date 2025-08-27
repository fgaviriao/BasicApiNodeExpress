import { Router } from "express";
import * as credentialController from "../controllers/credential.controller";

const router = Router();
router.post(
  "/credentials/request_password_reset",
  credentialController.requestPasswordReset
);

router.put("/credentials/reset_password", credentialController.resetPassword);

export default router;
