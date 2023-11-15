import { vrb } from "../middlewares/vrb.js";
import { UserModel } from "../models/user.model.js";
import { Handler } from "../utils/handler.js";
import {
  RegisterUserBody,
  UpdateUserBody,
  registerUserBody,
  updateUserBody,
} from "./validators/user.validator.js";

export const getProfile = Handler(async (req, res) => {
  const userId = req.user!;

  try {
    const user = await UserModel.findById(userId, {
      password: 0,
      comparePass: 0,
    });

    res.json(user?.toJSON());
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});

export const registerUser = Handler(
  ...vrb(registerUserBody),
  async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      accountType,
      password,
    }: RegisterUserBody = req.body;

    try {
      const user = await UserModel.create({
        firstName,
        lastName,
        email,
        password,
        accountType,
      });

      res.json(user);
    } catch (e) {
      res.status(400).json({
        message: e.message,
      });
    }
  }
);

export const updateUser = Handler(...vrb(updateUserBody), async (req, res) => {
  const { userId } = req.params;
  const body: UpdateUserBody = req.body;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, body);

    res.json(updatedUser);
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});

export const deleteUser = Handler(async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findByIdAndDelete(userId);

    res.json(user);
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});
