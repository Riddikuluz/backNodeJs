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

import { validateObjectId } from "../middleware/validateObjectId.js";

const router = Router();

router.get("/", authGuard, roleGuard(["admin"]), getAllUsers);

router.get(
  "/:id",
  authGuard,
  roleGuard(["admin", "user"]),
  validateObjectId,
  getUserById
);

router.put(
  "/:id",
  authGuard,
  roleGuard(["admin", "user"]),
  validateObjectId,
  updateUser
);

router.delete(
  "/:id",
  authGuard,
  roleGuard(["admin"]),
  validateObjectId,
  deleteUser
);

router.put(
  "/:id/password",
  authGuard,
  roleGuard(["admin", "user"]),
  validateObjectId,
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
