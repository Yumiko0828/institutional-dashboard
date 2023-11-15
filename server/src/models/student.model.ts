import { Prop, Ref, getModelForClass } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Section } from "./section.model.js";

export class Student {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ type: () => [Types.ObjectId], ref: () => Section })
  section: Ref<Section>;
}

export const StudentModel = getModelForClass(Student, {
  schemaOptions: {
    versionKey: false,
  },
});
