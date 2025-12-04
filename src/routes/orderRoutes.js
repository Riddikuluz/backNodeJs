import { Router } from "express";
import { authGuard, roleGuard } from "../middleware/authGuard.js";

import {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/ordersController.js";

const router = Router();

router.post("/", authGuard, createOrder);

router.get("/my", authGuard, getMyOrders);

router.get("/", authGuard, roleGuard(["admin"]), getAllOrders);

router.get("/:id", authGuard, getOrderById);

router.put("/:id/status", authGuard, roleGuard(["admin"]), updateOrderStatus);

router.put("/:id/cancel", authGuard, cancelOrder);

export default router;
