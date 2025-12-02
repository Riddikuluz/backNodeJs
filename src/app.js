import express from "express";
import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

export default app;
