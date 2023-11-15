import { Prop, getModelForClass } from "@typegoose/typegoose";

export class Grade {
  @Prop({ required: true })
  grade: number;

  @Prop({ required: true })
  level: number;
  /**
   * 0 = Primary
   * 1 = Secundary
   */
}

export const GradeModel = getModelForClass(Grade, {
  schemaOptions: {
    versionKey: false,
  },
});
