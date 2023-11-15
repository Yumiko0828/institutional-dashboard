import { Router } from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { onlyRoles } from "../middlewares/onlyRoles.js";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from "../controllers/student.ctrls.js";
const student = Router();

// Get all students
student.get("/all", isAuth, getAllStudents);

// Get student by id
student.get("/:id", isAuth, getStudentById);

// Register a new student
student.post("/register", isAuth, onlyRoles("admin", "teacher"), createStudent);

// Update a student
student.put(
  "/update/:id",
  isAuth,
  onlyRoles("admin", "teacher"),
  updateStudent
);

// Delete a student
student.delete(
  "/delete/:id",
  isAuth,
  onlyRoles("admin", "teacher"),
  deleteStudent
);

export { student as studentRouter };
