import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  const userId = req.user.id;

  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "El carrito está vacío" });
  }

  for (const item of cart.items) {
    if (item.product.status === "inactive") {
      return res.status(400).json({
        message: `El producto ${item.product.name} no está disponible`,
      });
    }

    if (item.quantity > item.product.stock) {
      return res.status(400).json({
        message: `Stock insuficiente para ${item.product.name}`,
      });
    }
  }

  const items = cart.items.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
    priceAtPurchase: item.product.price,
  }));

  const total = items.reduce(
    (acc, item) => acc + item.priceAtPurchase * item.quantity,
    0
  );

  const order = await Order.create({
    user: userId,
    items,
    total,
  });

  for (const item of cart.items) {
    await Product.findByIdAndUpdate(item.product._id, {
      $inc: { stock: -item.quantity },
    });
  }

  cart.items = [];
  await cart.save();

  res.json(order);
};

export const getMyOrders = async (req, res) => {
  const userId = req.user.id;

  const orders = await Order.find({ user: userId }).sort("-createdAt");

  res.json(orders);
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user", "email role")
    .sort("-createdAt");

  res.json(orders);
};

export const getOrderById = async (req, res) => {
  const userId = req.user.id;
  const orderId = req.params.id;

  const order = await Order.findById(orderId).populate("items.product");

  if (!order) return res.status(404).json({ message: "Orden no encontrada" });

  if (req.user.role !== "admin" && order.user.toString() !== userId) {
    return res.status(403).json({ message: "No tienes acceso a esta orden" });
  }

  res.json(order);
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = [
    "pending",
    "paid",
    "shipped",
    "completed",
    "cancelled",
  ];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Estado inválido" });
  }

  const order = await Order.findById(id);
  if (!order) return res.status(404).json({ message: "Orden no encontrada" });

  order.status = status;
  await order.save();

  res.json(order);
};
export const cancelOrder = async (req, res) => {
  const orderId = req.params.id;
  const userId = req.user.id;

  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ message: "Orden no encontrada" });

  if (req.user.role !== "admin") {
    if (order.user.toString() !== userId) {
      return res.status(403).json({ message: "No puedes cancelar esta orden" });
    }
    if (order.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Solo órdenes pendientes pueden cancelarse" });
    }
  }

  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: item.quantity },
    });
  }

  order.status = "cancelled";
  await order.save();

  res.json({ message: "Orden cancelada", order });
};
