import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "El stock no puede ser negativo"],
    },
    category: {
      type: String,
      required: true,
      enum: ["ropa", "juguetes", "higiene", "alimentación", "otros"], // modificable
      default: "otros",
    },
    images: {
      type: [String], // URLs
      default: [],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
