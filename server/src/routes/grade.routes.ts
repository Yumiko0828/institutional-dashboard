import { Router } from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { onlyRoles } from "../middlewares/onlyRoles.js";
import {
  createGrade,
  getAllGrades,
  getGradeById,
  updateGrade,
} from "../controllers/grade.ctrls.js";
const grade = Router();

// Get all grades
grade.get("/all", isAuth, getAllGrades);

// Get grade by id
grade.get("/:id", isAuth, getGradeById);

// Register a new grade
grade.post("/register", isAuth, onlyRoles("admin"), createGrade);

// Update a grade
grade.put("/update/:id", isAuth, onlyRoles("admin"), updateGrade);

// Delete a grade
grade.delete("/delete/:id", isAuth, onlyRoles("admin"));

export { grade as gradeRouter };
