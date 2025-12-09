import dotenv from "dotenv";

dotenv.config();

export const logLevel =
  process.env.LOG_LEVEL ||
  (process.env.NODE_ENV === "production" ? "tiny" : "dev");
