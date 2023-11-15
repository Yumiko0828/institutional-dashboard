import { JWT_ACCESS_EXPIRED, JWT_REFRESH_EXPIRED } from "../config.js";
import { vrb } from "../middlewares/vrb.js";
import { UserModel } from "../models/user.model.js";
import { expireTime } from "../utils/expireTime.js";
import { Handler } from "../utils/handler.js";
import { signAsync, verifyAsync } from "../utils/jwt.js";
import {
  RefreshBody,
  SigninBody,
  refreshBody,
  signinBody,
} from "./validators/auth.validator.js";

export const signIn = Handler(...vrb(signinBody), async (req, res) => {
  const { email, password }: SigninBody = req.body;

  const user = await UserModel.findOne({
    email,
  });

  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const validPass = await user.comparePass(password);

  if (!validPass)
    return res.status(400).json({ message: "Invalid credentials" });

  const [access_token, refresh_token] = await Promise.all([
    signAsync({ userId: user._id.toString() }, "access"),
    signAsync({ userId: user._id.toString() }, "refresh"),
  ]);

  res.cookie("access_token", access_token, {
    httpOnly: true,
    expires: expireTime(JWT_ACCESS_EXPIRED),
  });
  res.cookie("refresh_token", refresh_token, {
    httpOnly: false,
    expires: expireTime(JWT_REFRESH_EXPIRED),
  });

  res.json({
    access_token,
    refresh_token,
  });
});

export const refresh = Handler(...vrb(refreshBody), async (req, res) => {
  const { refreshToken }: RefreshBody = req.body;

  try {
    const { userId } = await verifyAsync(refreshToken, "refresh");
    const user = await UserModel.findById(userId);

    if (!user)
      return res.status(400).json({
        message: "Invalid token",
      });

    const [access_token, refresh_token] = await Promise.all([
      signAsync({ userId }, "access"),
      signAsync({ userId }, "refresh"),
    ]);

    res.cookie("access_token", access_token, {
      httpOnly: true,
      expires: expireTime(JWT_ACCESS_EXPIRED),
    });
    res.cookie("refresh_token", refresh_token, {
      httpOnly: false,
      expires: expireTime(JWT_REFRESH_EXPIRED),
    });

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
