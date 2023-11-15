import { Server } from "socket.io";
import { Handler } from "../utils/handler.js";
import { ActivityModel } from "../models/activity.js";

export const activityLogger = (io: Server) =>
  Handler(async (req, res, next) => {
    if (req.user) {
      const activity = await ActivityModel.findOne({
        user: req.user,
      });

      const index = activity!.actions.push({
        method: req.method,
        path: req.path,
        execute: new Date(),
      });

      await activity?.save();

      io.of("/admin")
        .to(`room:${req.user}`)
        .emit("activity", activity?.actions[index]);
    }

    next();
  });
