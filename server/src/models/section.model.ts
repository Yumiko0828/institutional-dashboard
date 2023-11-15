import { Prop, Ref, getModelForClass } from "@typegoose/typegoose";
import { Grade } from "./grade.model.js";
import { Student } from "./student.model.js";
import { Types } from "mongoose";

export class Section {
  @Prop({ type: () => [Types.ObjectId], ref: () => Grade })
  grade: Ref<Grade>;

  @Prop({ type: () => [Types.ObjectId], ref: () => Student })
  students: Ref<Student>[];
}

export const SectionModel = getModelForClass(Section, {
  schemaOptions: {
    versionKey: false,
  },
});
