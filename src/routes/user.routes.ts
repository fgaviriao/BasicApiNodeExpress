import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import {
  createUser,
  editUser,
  editUserActiveState,
  editUserLockedState,
  findUserByCriteria,
  findUserById,
  findUserByUsername,
  findUsers,
} from "../controllers/user.controller";

const router = Router();

router.post("/users", authenticateToken, createUser);
router.put("/users", authenticateToken, editUser);
router.put(
  "/users/change_active_state",
  authenticateToken,
  editUserActiveState
);
router.put(
  "/users/change_locked_state",
  authenticateToken,
  editUserLockedState
);

router.get("/users", authenticateToken, findUsers);

router.get("/users/:id", authenticateToken, findUserById);
router.get("/users/username/:username", authenticateToken, findUserByUsername);
router.get("/users/criteria", authenticateToken, findUserByCriteria);

export default router;
