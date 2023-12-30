import express from "express";
import morgan from "morgan";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import { prisma } from "./db.js";
import { authRouter } from "./routes/Auth/index.routes.js";
import { userRouter } from "./routes/Users/index.routes.js";
import { studentRouter } from "./routes/Students/index.routes.js";
import { assistanceRouter } from "./routes/Assistances/index.routes.js";
import { edaRouter } from "./routes/EDA/index.routes.js";
import { gradeRouter } from "./routes/Grades/index.routes.js";
import { sectionRouter } from "./routes/Sections/index.routes.js";
import { AccountType } from "@prisma/client";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "@hapi/boom";

await prisma.$connect();
await import("./setup.js");

// Initialization
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

declare global {
  namespace Express {
    interface Request {
      user?: string;
      /* Changes this: */
      userType?: AccountType;
      io: Server;
    }
  }
}

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["*"],
  })
);
app.use((req, _res, next) => {
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
app.use("/*", (req, res, next) => {
  next(notFound("Not found"));
});
app.use(errorHandler);

// Start server
app.listen(app.get("port"), () => {
  console.log("Server running on port:", app.get("port"));
});
