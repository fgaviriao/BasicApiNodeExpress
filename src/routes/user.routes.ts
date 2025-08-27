import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/users", authenticateToken, userController.createUser);
router.put("/users", authenticateToken, userController.editUser);
router.put(
  "/users/change_active_state",
  authenticateToken,
  userController.editUserActiveState
);
router.put(
  "/users/change_locked_state",
  authenticateToken,
  userController.editUserLockedState
);

router.get("/users", authenticateToken, userController.findUsers);

router.get("/users/:id", authenticateToken, userController.findUserById);
router.get(
  "/users/username/:username",
  authenticateToken,
  userController.findUserByUsername
);

export default router;
