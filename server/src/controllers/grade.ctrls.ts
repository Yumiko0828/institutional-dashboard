import { vrb } from "../middlewares/vrb.js";
import { GradeModel } from "../models/grade.model.js";
import { Handler } from "../utils/handler.js";
import {
  CreateGradeBody,
  UpdateGradeBody,
  createGradeBody,
  updateGradeBody,
} from "./validators/grade.validator.js";

export const getAllGrades = Handler(async (req, res) => {
  try {
    const grades = await GradeModel.find();

    res.json(grades);
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});

export const getGradeById = Handler(async (req, res) => {
  const { id } = req.params;

  try {
    const grade = await GradeModel.findById(id);

    res.json(grade);
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});

export const createGrade = Handler(
  ...vrb(createGradeBody),
  async (req, res) => {
    const gradeData: CreateGradeBody = req.body;

    try {
      const grade = await GradeModel.create(gradeData);

      res.json(grade);
    } catch (e) {
      res.status(400).json({
        message: e.message,
      });
    }
  }
);

export const updateGrade = Handler(
  ...vrb(updateGradeBody),
  async (req, res) => {
    const { id } = req.params;
    const gradeData: UpdateGradeBody = req.body;

    try {
      const grade = await GradeModel.findByIdAndUpdate(id, gradeData);

      res.json(grade);
    } catch (e) {
      res.status(400).json({
        message: e.message,
      });
    }
  }
);

export const deleteGrade = Handler(async (req, res) => {
  const { id } = req.params;

  try {
    const grade = await GradeModel.findByIdAndDelete(id);

    res.json(grade);
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});
