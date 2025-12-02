import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== "admin" && req.user.id !== id) {
    return res.status(403).json({ message: "Permiso denegado" });
  }

  const user = await User.findById(id).select("-password");
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  res.json(user);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  if (req.user.role !== "admin" && req.user.id !== id) {
    return res.status(403).json({ message: "Permiso denegado" });
  }

  const user = await User.findByIdAndUpdate(id, req.body, { new: true }).select(
    "-password"
  );
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json(user);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json({ message: "Usuario eliminado" });
};

export const changePassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  if (req.user.role !== "admin" && req.user.id !== id) {
    return res.status(403).json({ message: "Permiso denegado" });
  }

  if (req.user.role !== "admin") {
    const match = await user.comparePassword(currentPassword);
    if (!match)
      return res.status(400).json({ message: "Contraseña actual incorrecta" });
  }

  user.password = newPassword;
  await user.save();

  res.json({ message: "Contraseña actualizada correctamente" });
};
