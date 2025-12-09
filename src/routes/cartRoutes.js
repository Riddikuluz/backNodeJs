import { Router } from "express";
import {
  getMyCart,
  addOrUpdateItem,
  removeItem,
  clearCart,
} from "../controllers/cartController.js";

import { authGuard } from "../middleware/authGuard.js";

import { validateObjectId } from "../middleware/validateObjectId.js";

const router = Router();

router.get("/", authGuard, getMyCart);

router.post("/:productId", authGuard, validateObjectId, addOrUpdateItem);

router.delete("/:productId", authGuard, validateObjectId, removeItem);

router.delete("/", authGuard, clearCart);

export default router;
