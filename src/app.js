import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import { sanitizeBody } from "./middleware/sanitize.js";
import { corsOptions } from "./config/corsOptions.js";
import { apiLimiter } from "./config/rateLimit.js";
import { connectDB } from "./config/db.js";
import { logLevel } from "./config/logLevel.js";
dotenv.config();
connectDB();

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(sanitizeBody);
app.use(helmet());
app.use(cors(corsOptions));
app.use(apiLimiter);
app.use(hpp());
if (logLevel !== "none") {
  app.use(morgan(logLevel));
}
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Error interno del servidor",
  });
});

export default app;
