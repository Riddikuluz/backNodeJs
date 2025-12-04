import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).json({ message: "Producto no encontrado" });
  res.json(product);
};

export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product)
    return res.status(404).json({ message: "Producto no encontrado" });
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product)
    return res.status(404).json({ message: "Producto no encontrado" });
  res.json({ message: "Producto eliminado" });
};

export const deactivateProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product)
    return res.status(404).json({ message: "Producto no encontrado" });

  product.status = "inactive";
  await product.save();

  res.json({ message: "Producto desactivado" });
};
