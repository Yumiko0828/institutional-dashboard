import { Router } from "express";
import { isAuth } from "../../middlewares/isAuth.js";
import { onlyRoles } from "../../middlewares/onlyRoles.js";
import { GradesController } from "./grades.controller.js";
import { validateHandler } from "../../utils/validateHandler.js";
import {
  createGradeBody,
  updateGradeBody,
} from "../../validators/grade.validator.js";
const grade = Router();

const controller = new GradesController();

// Get all grades
grade.get("/all", isAuth, controller.getAll);

// Get grade by id
grade.get("/:id", isAuth, controller.getById);

// Register a new grade
grade.post(
  "/register",
  isAuth,
  onlyRoles("admin"),
  validateHandler("body", createGradeBody),
  controller.create
);

// Update a grade
grade.put(
  "/update/:id",
  isAuth,
  onlyRoles("admin"),
  validateHandler("body", updateGradeBody),
  controller.update
);

// Delete a grade
grade.delete("/delete/:id", isAuth, onlyRoles("admin"), controller.delete);

export { grade as gradeRouter };
