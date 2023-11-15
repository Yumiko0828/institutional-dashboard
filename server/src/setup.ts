import { AccountTypeModel } from "./models/accountType.model.js";
import { UserModel } from "./models/user.model.js";

/**
 * Default Account Types
 */
const accountTypesCount = await AccountTypeModel.countDocuments();

if (accountTypesCount === 0) {
  const accTypes = await Promise.all([
    AccountTypeModel.create({
      type: "guest",
      roles: ["guest"],
    }),
    AccountTypeModel.create({
      type: "teacher",
      roles: ["teacher"],
    }),
    AccountTypeModel.create({
      type: "director",
      roles: ["admin", "teacher"],
    }),
  ]);

  console.log(
    `Default account types created: ${accTypes.map((d) => d.type).join(", ")}`
  );
}

/**
 * Default Admin Account
 */

const defaultAccount = await UserModel.findOne({
  firstName: "Default",
  lastName: "Account",
  email: "admin@local.com",
});

if (!defaultAccount) {
  const defaultDirectorAccount = await UserModel.create({
    firstName: "Default",
    lastName: "Account",
    email: "admin@local.com",
    password: "admin1234",
    accountType: (await AccountTypeModel.findOne({ type: "director" }))?._id,
  });

  console.log(`Default admin account created: ${defaultDirectorAccount.email}`);
}
