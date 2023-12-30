import { AccountTypes, Permissions } from "@prisma/client";
import { prisma } from "./db.js";

/**
 * Default Account Types
 */
const accountTypesCount = await prisma.accountType.count();

if (accountTypesCount === 0) {
  const accTypes = await Promise.all([
    prisma.accountType.create({
      data: {
        type: AccountTypes.Guest,
        permissions: [Permissions.GUEST],
      },
    }),
    prisma.accountType.create({
      data: {
        type: "Teacher",
        permissions: [
          Permissions.MANAGE_STUDENTS,
          Permissions.MANAGE_ASSISTANCE,
        ],
      },
    }),
    prisma.accountType.create({
      data: {
        type: "Director",
        permissions: [Permissions.ALL],
      },
    }),
  ]);

  console.log(
    `Default account types created: ${accTypes.map((d) => d.type).join(", ")}`
  );
}

/**
 * Default Admin Account
 */

const defaultAccount = await prisma.user.findFirst({
  where: {
    firstName: "Default",
    lastName: "Account",
    email: "admin@local.com",
  },
});

if (!defaultAccount) {
  const defaultAccountType = await prisma.accountType.findFirst({
    where: { type: "Director" },
  });
  const defaultDirectorAccount = await prisma.user.create({
    data: {
      firstName: "Default",
      lastName: "Account",
      email: "admin@local.com",
      password: "admin1234",
      accountTypeId: defaultAccountType?.id!,
    },
  });

  console.log(`Default admin account created: ${defaultDirectorAccount.email}`);
}
