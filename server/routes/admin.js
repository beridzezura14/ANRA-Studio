import express from "express";
import { checkAdminPassword } from "../middleware/adminAuth.js";

const router = express.Router();

// მხოლოდ პაროლით შემოწმებული
router.post("/check", checkAdminPassword, (req, res) => {
  res.json({ message: "Admin password correct" });
});

export default router;
