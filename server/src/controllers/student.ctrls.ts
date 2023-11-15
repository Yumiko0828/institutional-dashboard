import { vrb } from "../middlewares/vrb.js";
import { StudentModel } from "../models/student.model.js";
import { Handler } from "../utils/handler.js";
import {
  CreateStudentBody,
  UpdateStudentBody,
  createStudentBody,
  updateStudentBody,
} from "./validators/student.validator.js";

export const getAllStudents = Handler(async (req, res) => {
  try {
    const users = await StudentModel.find();

    res.json(users);
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});

export const getStudentById = Handler(async (req, res) => {
  const { id } = req.params;

  try {
    const user = await StudentModel.findById(id);

    res.json(user);
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});

export const createStudent = Handler(
  ...vrb(createStudentBody),
  async (req, res) => {
    const studentData: CreateStudentBody = req.body;

    try {
      const student = await StudentModel.create(studentData);

      res.json(student);
    } catch (e) {
      res.status(400).json({
        message: e.message,
      });
    }
  }
);

export const updateStudent = Handler(
  ...vrb(updateStudentBody),
  async (req, res) => {
    const { id } = req.params;
    const studentData: UpdateStudentBody = req.body;

    try {
      const student = await StudentModel.findByIdAndUpdate(id, studentData);

      res.json(student);
    } catch (e) {
      res.status(400).json({
        message: e.message,
      });
    }
  }
);

export const deleteStudent = Handler(async (req, res) => {
  const { id } = req.params;

  try {
    const user = await StudentModel.findByIdAndDelete(id);

    res.json(user);
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});
