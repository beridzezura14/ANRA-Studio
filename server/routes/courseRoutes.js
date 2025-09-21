import express from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  addTopicToCourse,
  deleteTopicFromCourse,
  updateTopicInCourse, 
} from "../controllers/courseController.js";
import { checkAdminPassword } from "../middleware/adminAuth.js";

const router = express.Router();

// Public
router.get("/", getCourses);
router.get("/:id", getCourseById);

// Protected
router.post("/", checkAdminPassword, createCourse);
router.put("/:id", checkAdminPassword, updateCourse);
router.delete("/:id", checkAdminPassword, deleteCourse);
router.post("/:id/topics",checkAdminPassword, addTopicToCourse);
router.delete("/:id/topics/:topicId", checkAdminPassword, deleteTopicFromCourse);
router.put("/:id/topics/:topicId", checkAdminPassword, updateTopicInCourse);


export default router;
