import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
const app = express();

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(`DB is Connected Successfully `);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.listen(process.env.PORT, () => {
  console.log(`⚙︎ Server is running on http://localhost:${process.env.PORT}`);
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Server Error ";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
