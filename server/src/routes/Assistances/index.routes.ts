import { Router } from "express";
import { isAuth } from "../../middlewares/isAuth.js";
import { onlyRoles } from "../../middlewares/onlyRoles.js";
const assistance = Router();

// Get all assistances
assistance.get("/all", isAuth);

// Get assistance by Id
assistance.get("/:id", isAuth);

// Register a new assistance
assistance.post("/register", isAuth, onlyRoles("admin", "teacher"));

// Update a assistance
assistance.put("/update/:id", isAuth, onlyRoles("admin", "teacher"));

// Delete a assistance
assistance.delete("/delete/:id", isAuth, onlyRoles("admin", "teacher"));

export { assistance as assistanceRouter };
