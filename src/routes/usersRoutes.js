import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changePassword,
  createUser,
} from "../controllers/usersController.js";

import {
  authGuard,
  roleGuard,
  validateEmail,
  validatePassword,
  validateChangePassword,
  validateResults,
} from "../middleware/authGuard.js";

const router = Router();

router.get("/", authGuard, roleGuard(["admin"]), getAllUsers);

router.get(
  "/:id",
  authGuard,
  roleGuard(["admin", "user"]),
  validateEmail,
  validateResults,
  getUserById
);

router.put("/:id", authGuard, roleGuard(["admin", "user"]), updateUser);

router.delete("/:id", authGuard, roleGuard(["admin"]), deleteUser);

router.put(
  "/:id/password",
  authGuard,
  roleGuard(["admin", "user"]),
  validateChangePassword,
  validateResults,
  changePassword
);

router.post(
  "/",
  authGuard,
  roleGuard(["admin"]),
  validateEmail,
  validatePassword,
  validateResults,
  createUser
);

export default router;
