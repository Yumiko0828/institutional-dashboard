import { Router } from "express";
import { isAuth } from "../../middlewares/isAuth.js";
import { withPerms } from "../../middlewares/withPerms.js";
const section = Router();

// Get all sections
section.get("/all", isAuth);

// Get section by id
section.get("/:id", isAuth);

// Register a new section
section.post("/register", isAuth, withPerms("MANAGE_SECTIONS"));

// Update a section
section.put("/update/:id", isAuth, withPerms("MANAGE_SECTIONS"));

// Delete a section
section.delete("/delete/:id", isAuth, withPerms("MANAGE_SECTIONS"));

export { section as sectionRouter };
