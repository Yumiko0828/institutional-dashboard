import { Prop, Ref, getModelForClass } from "@typegoose/typegoose";
import { User } from "./user.model.js";
import { Types } from "mongoose";

class Action {
  @Prop({ required: true })
  method: string;

  @Prop({ required: true })
  path: string;

  @Prop({ type: () => Date, default: new Date() })
  execute: Date;
}

export class Activity {
  @Prop({ type: () => Types.ObjectId, ref: () => User, required: true })
  user: Ref<User>;

  @Prop({ type: () => [Action], default: [], _id: true })
  actions: Action[];

  @Prop({ type: () => Date })
  createdAt: Date;

  @Prop({ type: () => Date })
  updatedAt: Date;
}

export const ActivityModel = getModelForClass(Activity, {
  schemaOptions: {
    versionKey: false,
    timestamps: false,
  },
});
