import { Router } from "express";
import { isAuth } from "../../middlewares/isAuth.js";
import { withPerms } from "../../middlewares/withPerms.js";
const eda = Router();

// Get all EDAs
eda.get("/all", isAuth);

// Get a EDA by Id
eda.get("/:id", isAuth);

// Register a new EDA
eda.post("/register", isAuth, withPerms("MANAGE_EDA"));

// Update a EDA
eda.put("/update/:id", isAuth, withPerms("MANAGE_EDA"));

// Delete a EDA
eda.delete("/delete/:id", isAuth, withPerms("MANAGE_EDA"));

export { eda as edaRouter };
