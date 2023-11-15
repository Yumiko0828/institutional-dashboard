import { Router } from "express";
import { refresh, signIn } from "../controllers/auth.ctrls.js";
const auth = Router();

// Signin
auth.post("/signin", signIn);

// Refresh session
auth.post("/refresh", refresh);

export { auth as authRouter };
