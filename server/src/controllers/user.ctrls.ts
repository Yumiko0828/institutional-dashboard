import { prisma } from "../db.js";
import { vrb } from "../middlewares/vrb.js";
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
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: false,
        accountTypeId: true,
      },
    });

    res.json(user);
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
      accountTypeId,
      password,
    }: RegisterUserBody = req.body;

    try {
      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password,
          accountTypeId,
        },
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
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: body,
    });

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
    const user = await prisma.user.delete({ where: { id: userId } });

    res.json(user);
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});
