import { Router } from "express";
import { login, register, assignRole } from "../controllers/authController.js";
import {
  authGuard,
  validateEmail,
  validatePassword,
  validateResults,
  roleGuard,
} from "../middleware/authGuard.js";

const router = Router();

router.post(
  "/register",
  validateEmail,
  validatePassword,
  validateResults,
  register
);

router.post("/login", login);

router.get("/protected", authGuard, (req, res) => {
  res.json({
    message: "Acceso permitido",
    user: req.user,
  });
});

router.get("/admin-only", authGuard, roleGuard(["admin"]), (req, res) => {
  res.json({ message: "Solo admin puede ver esto" });
});

router.post("/assign-role", authGuard, roleGuard(["admin"]), assignRole);

export default router;
