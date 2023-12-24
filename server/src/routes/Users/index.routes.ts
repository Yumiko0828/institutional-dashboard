import { Router } from "express";
import { isAuth } from "../../middlewares/isAuth.js";
import { onlyRoles } from "../../middlewares/onlyRoles.js";
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
  onlyRoles("admin"),
  validateHandler("body", registerUserBody),
  controller.register
);

// Update a user
user.put(
  "/update/:userId",
  isAuth,
  onlyRoles("admin"),
  validateHandler("body", updateUserBody),
  controller.update
);

// Delete a user
user.delete("/delete/:userId", isAuth, onlyRoles("admin"), controller.delete);

export { user as userRouter };
