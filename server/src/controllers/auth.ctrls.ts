import { prisma } from "../db.js";
import { vrb } from "../middlewares/vrb.js";
import { Handler } from "../utils/handler.js";
import { signAsync, verifyAsync } from "../utils/jwt.js";
import {
  RefreshBody,
  SigninBody,
  refreshBody,
  signinBody,
} from "./validators/auth.validator.js";
import { compare } from "bcrypt";

export const signIn = Handler(...vrb(signinBody), async (req, res) => {
  const { email, password }: SigninBody = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const validPass = await compare(password, user.password);

  if (!validPass)
    return res.status(400).json({ message: "Invalid credentials" });

  const [access_token, refresh_token] = await Promise.all([
    signAsync({ userId: user.id }, "access"),
    signAsync({ userId: user.id }, "refresh"),
  ]);

  res.json({
    access_token,
    refresh_token,
  });
});

export const refresh = Handler(...vrb(refreshBody), async (req, res) => {
  const { refreshToken }: RefreshBody = req.body;

  try {
    const { userId } = await verifyAsync(refreshToken, "refresh");
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user)
      return res.status(400).json({
        message: "Invalid token",
      });

    const [access_token, refresh_token] = await Promise.all([
      signAsync({ userId }, "access"),
      signAsync({ userId }, "refresh"),
    ]);

    res.json({
      access_token,
      refresh_token,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});
