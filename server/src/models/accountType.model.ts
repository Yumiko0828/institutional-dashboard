import { Prop, getModelForClass } from "@typegoose/typegoose";

export class AccountType {
  @Prop({ required: true })
  type: string;

  @Prop({ type: () => [String], required: true })
  roles: string[];
}

export const AccountTypeModel = getModelForClass(AccountType, {
  schemaOptions: {
    versionKey: false,
  },
});
