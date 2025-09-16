import express from "express";
import { getHero, createHero, updateHero } from "../controllers/heroController.js";

const router = express.Router();

router.get("/", getHero);       // hero data წამოღება
router.post("/", createHero);   // hero data შექმნა
router.put("/:id", updateHero); // hero data განახლება

export default router;
