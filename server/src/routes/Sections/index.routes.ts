import { Router } from "express";
import { isAuth } from "../../middlewares/isAuth.js";
import { withPerms } from "../../middlewares/withPerms.js";
import { SectionsController } from "./sections.controller.js";
import { validateHandler } from "../../utils/validateHandler.js";
import {
  registerSectionBody,
  updateSectionBody,
} from "../../validators/section.validator.js";
const section = Router();

const controller = new SectionsController();

// Get all sections
section.get("/", isAuth, controller.getAll);

// Get section by id
section.get("/:id", isAuth, controller.getById);

// Register a new section
section.post(
  "/register",
  isAuth,
  withPerms("MANAGE_SECTIONS"),
  validateHandler("body", registerSectionBody),
  controller.register
);

// Update a section
section.put(
  "/:id",
  isAuth,
  withPerms("MANAGE_SECTIONS"),
  validateHandler("body", updateSectionBody),
  controller.update
);

// Delete a section
section.delete("/:id", isAuth, withPerms("MANAGE_SECTIONS"), controller.delete);

export { section as sectionRouter };
