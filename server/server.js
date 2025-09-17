import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path"
import connectDB from "./config/db.js";
import heroRoutes from "./routes/heroRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import adminRoutes from "./routes/admin.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// DB connect
connectDB();

// Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/admin", adminRoutes);

app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


