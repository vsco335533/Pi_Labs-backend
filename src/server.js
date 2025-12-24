import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import { connectMongo } from "./config/mongo.js";

dotenv.config();

const app = express();

/* =======================
   DATABASE CONNECTION
======================= */
connectMongo();

/* =======================
   SECURITY & MIDDLEWARE
======================= */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);
app.use(morgan("dev"));
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", limiter);

/* =======================
   HEALTH CHECK
======================= */
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Research Platform API running"
  });
});

/* =======================
   ROUTES
======================= */
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api", categoryRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/users", userRoutes);

/* =======================
   ERROR HANDLING
======================= */
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error"
  });
});

/* =======================
   EXPORT ONLY (IMPORTANT)
======================= */
export default app;

