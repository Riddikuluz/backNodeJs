import User from "../models/User.js";
import jwt from "jsonwebtoken";
export const registerService = async ({ email, password }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error("El correo ya está registrado");

  const user = await User.create({ email, password });

  return {
    id: user._id,
    email: user.email,
  };
};

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Credenciales inválidas");

  const match = await user.comparePassword(password);
  if (!match) throw new Error("Credenciales inválidas");

  const payload = { id: user._id, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return { token, user: payload };
};
