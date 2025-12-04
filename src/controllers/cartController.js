import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getMyCart = async (req, res) => {
  const userId = req.user.id;

  let cart = await Cart.findOne({ user: userId }).populate(
    "items.product",
    "name price stock category images"
  );

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  res.json(cart);
};

export const addOrUpdateItem = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const { quantity } = req.body;

  if (!productId || !quantity || typeof quantity !== "number" || quantity < 1) {
    return res.status(400).json({ message: "Datos inválidos" });
  }

  const product = await Product.findById(productId);
  if (!product || product.status === "inactive") {
    return res.status(400).json({ message: "Producto no disponible" });
  }
  if (quantity > product.stock) {
    return res.status(400).json({ message: "Stock insuficiente" });
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [{ product: productId, quantity }],
    });
    return res.json(cart);
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity = quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  res.json(cart);
};

export const removeItem = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ message: "Carrito no existe" });

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();
  res.json(cart);
};

export const clearCart = async (req, res) => {
  const userId = req.user.id;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ message: "Carrito no existe" });

  cart.items = [];
  await cart.save();

  res.json({ message: "Carrito vaciado" });
};
