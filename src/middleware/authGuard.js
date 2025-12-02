import jwt from "jsonwebtoken";
import { body } from "express-validator";
import { validationResult } from "express-validator";

export const authGuard = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token no enviado" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Formato de autorización inválido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
export const validateEmail = [
  body("email").isEmail().withMessage("Email inválido"),
];

export const validatePassword = [
  body("password").isLength({ min: 6 }).withMessage("Mínimo 6 caracteres"),
];

export const validateChangePassword = [
  body("currentPassword")
    .isLength({ min: 6 })
    .withMessage("Mínimo 6 caracteres"),
  body("newPassword").isLength({ min: 6 }).withMessage("Mínimo 6 caracteres"),
];

export const validateResults = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
};
export const roleGuard =
  (role = []) =>
  (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res.status(403).json({ message: "Permiso denegado" });
    }
    next();
  };
