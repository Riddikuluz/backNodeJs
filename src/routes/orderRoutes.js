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

import { validateObjectId } from "../middleware/validateObjectId.js";
const router = Router();

router.post("/", authGuard, createOrder);

router.get("/my", authGuard, getMyOrders);

router.get("/", authGuard, roleGuard(["admin"]), getAllOrders);

router.get("/:id", authGuard, validateObjectId, getOrderById);

router.put(
  "/:id/status",
  authGuard,
  roleGuard(["admin"]),
  validateObjectId,
  updateOrderStatus
);

router.put("/:id/cancel", authGuard, validateObjectId, cancelOrder);

export default router;
