import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changePassword,
} from "../controllers/usersController.js";

import { authGuard, roleGuard } from "../middleware/authGuard.js";

const router = Router();

router.get("/", authGuard, roleGuard(["admin"]), getAllUsers);

router.get("/:id", authGuard, roleGuard(["admin", "user"]), getUserById);

router.put("/:id", authGuard, roleGuard(["admin", "user"]), updateUser);

router.delete("/:id", authGuard, roleGuard(["admin"]), deleteUser);

router.put(
  "/:id/password",
  authGuard,
  roleGuard(["admin", "user"]),
  changePassword
);

export default router;
