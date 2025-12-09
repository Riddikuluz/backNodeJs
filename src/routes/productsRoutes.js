import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deactivateProduct,
} from "../controllers/productsController.js";

import { authGuard, roleGuard } from "../middleware/authGuard.js";
import {
  validateProduct,
  validateProductUpdate,
} from "../middleware/productGuard.js";

import { validateObjectId } from "../middleware/validateObjectId.js";

const router = Router();

router.get("/", getAllProducts);

router.get("/:id", validateObjectId, getProductById);

router.post(
  "/",
  authGuard,
  roleGuard(["admin"]),
  validateProduct,
  createProduct
);

router.put(
  "/:id",
  authGuard,
  roleGuard(["admin"]),
  validateObjectId,
  validateProductUpdate,
  updateProduct
);

router.delete(
  "/:id",
  authGuard,
  roleGuard(["admin"]),
  validateObjectId,
  deleteProduct
);

router.put(
  "/deactivate/:id",
  authGuard,
  roleGuard(["admin"]),
  validateObjectId,
  deactivateProduct
);

export default router;
