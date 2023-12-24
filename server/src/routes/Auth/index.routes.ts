import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { validateHandler } from "../../utils/validateHandler.js";
import { refreshBody, signinBody } from "../../validators/auth.validator.js";
const auth = Router();

const controller = new AuthController();

// Signin
auth.post("/signin", validateHandler("body", signinBody), controller.signIn);

// Refresh session
auth.post("/refresh", validateHandler("body", refreshBody), controller.refresh);

export { auth as authRouter };
