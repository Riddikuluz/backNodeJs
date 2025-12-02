import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const role = "user";
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const user = await User.create({ email, password, role });

    const userData = { id: user._id, email: user.email, role: role };

    return res.status(201).json({ user: userData });
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const payload = { id: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ token, user: payload });
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
export const assignRole = async (req, res) => {
  const { id, role } = req.body;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  user.role = role;
  await user.save();
  res.json({ id: user._id, email: user.email, role: user.role });
};
