import { Router } from "express";
import { CredentialController } from "../controllers/credential.controller";

const credentialController = new CredentialController();
const router = Router();
router.post(
  "/credentials/request_password_reset",
  credentialController.requestPasswordReset
);

router.put("/credentials/reset_password", credentialController.resetPassword);

export default router;
