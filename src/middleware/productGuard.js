export const validateProduct = (req, res, next) => {
  const { name, price, stock, category } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Nombre requerido" });
  }

  if (price == null || price <= 0) {
    return res.status(400).json({ message: "El precio debe ser mayor a 0" });
  }

  if (stock == null || stock < 1) {
    return res.status(400).json({ message: "El stock debe ser mínimo 1" });
  }

  if (!category) {
    return res.status(400).json({ message: "Categoría requerida" });
  }

  next();
};

export const validateProductUpdate = (req, res, next) => {
  const { price, stock } = req.body;

  if (price !== undefined && price < 0)
    return res.status(400).json({ message: "Precio inválido" });

  if (stock !== undefined && stock < 0)
    return res.status(400).json({ message: "Stock inválido" });

  next();
};
