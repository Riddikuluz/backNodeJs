import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import {
  authGuard,
  validateRegister,
  validateResults,
} from "../middleware/authGuard.js";

const router = Router();

router.post("/register", validateRegister, validateResults, register);
router.post("/login", login);

router.get("/protected", authGuard, (req, res) => {
  res.json({
    message: "Acceso permitido",
    user: req.user,
  });
});

export default router;
