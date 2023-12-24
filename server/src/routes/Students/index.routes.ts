import { Router } from "express";
import { isAuth } from "../../middlewares/isAuth.js";
import { onlyRoles } from "../../middlewares/onlyRoles.js";
import { StudentsController } from "./students.controller.js";
import { validateHandler } from "../../utils/validateHandler.js";
import {
  createStudentBody,
  updateStudentBody,
} from "../../validators/student.validator.js";
const student = Router();

const controller = new StudentsController();

// Get all students
student.get("/all", isAuth, controller.getAll);

// Get student by id
student.get("/:id", isAuth, controller.getById);

// Register a new student
student.post(
  "/register",
  isAuth,
  onlyRoles("admin", "teacher"),
  validateHandler("body", createStudentBody),
  controller.create
);

// Update a student
student.put(
  "/update/:id",
  isAuth,
  onlyRoles("admin", "teacher"),
  validateHandler("body", updateStudentBody),
  controller.update
);

// Delete a student
student.delete(
  "/delete/:id",
  isAuth,
  onlyRoles("admin", "teacher"),
  controller.delete
);

export { student as studentRouter };
