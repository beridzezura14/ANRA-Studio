import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import heroRoutes from "./routes/heroRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import adminRoutes from "./routes/admin.js";
import courseRoutes from "./routes/courseRoutes.js";

dotenv.config();
const app = express();
app.use(cors({
  origin: "*" // ან შენი frontend URL
}));
const PORT = process.env.PORT || 5000;

// __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());

// DB connect
connectDB();

console.log("hello")
// Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/courses", courseRoutes);


// Serve frontend build
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Catch-all route for React Router
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
