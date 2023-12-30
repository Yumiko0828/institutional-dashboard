import { NextFunction, Request, Response } from "express";
import { Server } from "socket.io";

export const activityLogger = (io: Server) =>
  async function(req: Request, res: Response, next: NextFunction) {
    // if (req.user) {
    //   const activity = await ActivityModel.findOne({
    //     user: req.user,
    //   });

    //   const index = activity!.actions.push({
    //     method: req.method,
    //     path: req.path,
    //     execute: new Date(),
    //   });

    //   await activity?.save();

    //   io.of("/admin")
    //     .to(`room:${req.user}`)
    //     .emit("activity", activity?.actions[index]);
    // }

    next();
  };
