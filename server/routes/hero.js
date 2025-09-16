import express from "express";
import { getHero, createHero, updateHero } from "../controllers/heroController.js";
import { checkAdminPassword } from "../middleware/adminAuth.js";

const router = express.Router();

// ყველას შეუძლია hero ნახვა
router.get("/", getHero);

// მხოლოდ პაროლით დაცული creation / update
router.post("/", checkAdminPassword, createHero);
router.put("/", checkAdminPassword, updateHero);

export default router;
