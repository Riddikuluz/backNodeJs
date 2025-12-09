import mongoose from "mongoose";

export const validateObjectId = (req, res, next) => {
  const idParams = Object.values(req.params);

  for (const id of idParams) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }
  }

  next();
};
