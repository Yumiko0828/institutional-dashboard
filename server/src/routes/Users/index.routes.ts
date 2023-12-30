import { Router } from "express";
import { isAuth } from "../../middlewares/isAuth.js";
import { withPerms } from "../../middlewares/withPerms.js";
import { UsersController } from "./users.controller.js";
import { validateHandler } from "../../utils/validateHandler.js";
import {
  registerUserBody,
  updateUserBody,
} from "../../validators/user.validator.js";

const controller = new UsersController();

const user = Router();

// Get profile
user.get("/profile", isAuth, controller.profile);

// Update profile
// user.put("/profile", isAuth);

// Change password
// user.post("/changePass", isAuth);

// Register a new user
user.post(
  "/register",
  isAuth,
  withPerms("MANAGE_USERS"),
  validateHandler("body", registerUserBody),
  controller.register
);

// Update a user
user.put(
  "/update/:userId",
  isAuth,
  withPerms("MANAGE_USERS"),
  validateHandler("body", updateUserBody),
  controller.update
);

// Delete a user
user.delete(
  "/delete/:userId",
  isAuth,
  withPerms("MANAGE_USERS"),
  controller.delete
);

export { user as userRouter };
