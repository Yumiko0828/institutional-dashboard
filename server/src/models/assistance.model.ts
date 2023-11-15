import { Prop, Ref, getModelForClass } from "@typegoose/typegoose";
import { EDA } from "./eda.model.js";
import { Types } from "mongoose";
import { Section } from "./section.model.js";

class Record {
  studentId: string;
  day: Date;
  assistanceType: Number;
}

export class Assistance {
  @Prop({ type: () => [Types.ObjectId], ref: () => EDA, required: true })
  eda: Ref<EDA>;

  @Prop({ type: () => Types.ObjectId, ref: () => Section })
  section: Ref<Section>;

  @Prop({ type: () => Date, required: true })
  startDate: Date;

  @Prop({ type: () => Date, required: true })
  endDate: Date;

  @Prop({ type: () => [Record] })
  record: Record[];
}

export const AssistanceModel = getModelForClass(Assistance, {
  schemaOptions: {
    versionKey: false,
  },
});
