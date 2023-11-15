import { isDocument } from "@typegoose/typegoose";
import { UserModel } from "../models/user.model.js";
import { Handler } from "../utils/handler.js";
import { verifyAsync } from "../utils/jwt.js";

export const isAuth = Handler((req, res, next) => {
  const token: string | undefined = req.headers.authorization;

  if (!token || !/[Bb]earer /.test(token.slice(0, 7)))
    return res.status(401).json({
      message: "Unauthorized",
    });

  return verifyAsync(token.slice(7), "access")
    .then(({ userId }) => UserModel.findById(userId).populate("accountType"))
    .then((user) => {
      if (!user)
        return res.status(401).json({
          message: "Unknown user",
        });

      req.user = user._id.toString();

      if (isDocument(user.accountType)) {
        req.userType = user.accountType.toJSON();
      }

      return next();
    })
    .catch((e) => {
      console.error(e);

      res.status(401).json({
        message: "Invalid token",
      });
    });
});
