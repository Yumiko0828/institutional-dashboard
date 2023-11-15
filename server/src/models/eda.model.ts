import { Prop, getModelForClass } from "@typegoose/typegoose";

export class EDA {
  @Prop({ required: true })
  number: number;

  @Prop({ type: () => Date, required: true })
  startDate: Date;

  @Prop({ type: () => Date, required: true })
  endDate: Date;

  @Prop({ type: () => [Date], default: [] })
  holydays: Date[];
}

export const EDAModel = getModelForClass(EDA, {
  schemaOptions: {
    versionKey: false,
  },
});
