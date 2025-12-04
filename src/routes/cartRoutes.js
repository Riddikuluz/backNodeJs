import { Router } from "express";
import {
  getMyCart,
  addOrUpdateItem,
  removeItem,
  clearCart,
} from "../controllers/cartController.js";

import { authGuard } from "../middleware/authGuard.js";

const router = Router();

router.get("/", authGuard, getMyCart);

router.post("/:productId", authGuard, addOrUpdateItem);

router.delete("/:productId", authGuard, removeItem);

router.delete("/", authGuard, clearCart);

export default router;
