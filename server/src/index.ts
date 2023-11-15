import e from "express";
import morgan from "morgan";
import "./db.js";
import "./setup.js";
import { authRouter } from "./routes/auth.routes.js";
import { Types } from "mongoose";
import { userRouter } from "./routes/user.routes.js";
import { studentRouter } from "./routes/student.routes.js";
import { assistanceRouter } from "./routes/assistance.routes.js";
import { edaRouter } from "./routes/eda.routes.js";
import { gradeRouter } from "./routes/grade.routes.js";
import { sectionRouter } from "./routes/section.routes.js";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import cors from "cors";

// Initialization
const app = e();
const httpServer = createServer(app);
const io = new Server(httpServer);

declare global {
  namespace Express {
    interface Request {
      user?: string;
      userType?: {
        _id: Types.ObjectId;
        type: string;
        roles: string[];
      };
      io: Server;
    }
  }
}

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(e.json());
app.use(cookieParser());
app.use(e.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin: ["*", "http://localhost:5173"],
  })
);
app.use((req, res, next) => {
  req.io = io;

  next();
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/student", studentRouter);
app.use("/api/assistance", assistanceRouter);
app.use("/api/eda", edaRouter);
app.use("/api/grade", gradeRouter);
app.use("/api/section", sectionRouter);

// Start server
app.listen(app.get("port"), () => {
  console.log("Server running on port:", app.get("port"));
});
