import express from "express";
import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);

export default app;
