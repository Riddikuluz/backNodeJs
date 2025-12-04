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

const router = Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

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
  validateProductUpdate,
  updateProduct
);

router.delete("/:id", authGuard, roleGuard(["admin"]), deleteProduct);

router.put(
  "/deactivate/:id",
  authGuard,
  roleGuard(["admin"]),
  deactivateProduct
);

export default router;
