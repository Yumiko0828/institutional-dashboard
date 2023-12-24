import { Router } from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { onlyRoles } from "../middlewares/onlyRoles.js";
const section = Router();

// Get all sections
section.get("/all", isAuth);

// Get section by id
section.get("/:id", isAuth);

// Register a new section
section.post("/register", isAuth, onlyRoles("admin"));

// Update a section
section.put("/update/:id", isAuth, onlyRoles("admin"));

// Delete a section
section.delete("/delete/:id", isAuth, onlyRoles("admin"));

export { section as sectionRouter };
