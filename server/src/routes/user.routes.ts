import { Router } from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { onlyRoles } from "../middlewares/onlyRoles.js";
import {
  deleteUser,
  getProfile,
  registerUser,
  updateUser,
} from "../controllers/user.ctrls.js";

const user = Router();

// Get profile
user.get("/profile", isAuth, getProfile);

// Update profile
// user.put("/profile", isAuth);

// Change password
// user.post("/changePass", isAuth);

// Register a new user
user.post("/register", isAuth, onlyRoles("admin"), registerUser);

// Update a user
user.put("/update/:userId", isAuth, onlyRoles("admin"), updateUser);

// Delete a user
user.delete("/delete/:userId", isAuth, onlyRoles("admin"), deleteUser);

export { user as userRouter };
