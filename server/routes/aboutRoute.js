import express from "express";
import { upsertAbout, getAbout } from "../controllers/aboutController.js";
import { checkAdminPassword } from "../middleware/adminAuth.js";

const router = express.Router();

// GET
router.get("/", getAbout);

// CREATE / UPDATE → require admin password
router.post("/", checkAdminPassword, upsertAbout);

export default router;
