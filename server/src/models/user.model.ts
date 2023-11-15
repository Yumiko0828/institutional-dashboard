import {
  Prop,
  Pre,
  Ref,
  getModelForClass,
  DocumentType,
} from "@typegoose/typegoose";
import { AccountType } from "./accountType.model.js";
import { hash, genSalt, compare } from "bcrypt";

@Pre<User>("save", async function () {
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
})
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ ref: () => AccountType, required: true })
  accountType: Ref<AccountType>;

  @Prop({ required: true })
  password: string;

  async comparePass(this: DocumentType<User>, password: string) {
    return await compare(password, this.password);
  }
}

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    versionKey: false,
  },
});
