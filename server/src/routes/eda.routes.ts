import { Router } from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { onlyRoles } from "../middlewares/onlyRoles.js";
const eda = Router();

// Get all EDAs
eda.get("/all", isAuth);

// Get a EDA by Id
eda.get("/:id", isAuth);

// Register a new EDA
eda.post("/register", isAuth, onlyRoles("admin"));

// Update a EDA
eda.put("/update/:id", isAuth, onlyRoles("admin"));

// Delete a EDA
eda.delete("/delete/:id", isAuth, onlyRoles("admin"));

export { eda as edaRouter };
