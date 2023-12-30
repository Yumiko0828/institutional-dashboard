import { Router } from "express";
import { isAuth } from "../../middlewares/isAuth.js";
import { withPerms } from "../../middlewares/withPerms.js";
const assistance = Router();

// Get all assistances
assistance.get("/all", isAuth);

// Get assistance by Id
assistance.get("/:id", isAuth);

// Register a new assistance
assistance.post("/register", isAuth, withPerms("MANAGE_ASSISTANCE"));

// Update a assistance
assistance.put("/update/:id", isAuth, withPerms("MANAGE_ASSISTANCE"));

// Delete a assistance
assistance.delete("/delete/:id", isAuth, withPerms("MANAGE_ASSISTANCE"));

export { assistance as assistanceRouter };
