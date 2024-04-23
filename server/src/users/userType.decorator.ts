import { SetMetadata } from "@nestjs/common";
import { UserType as Types } from "@prisma/client";

export const ROLES_KEY = "roles";
export const UserType = (...roles: Types[]) => SetMetadata(ROLES_KEY, roles);
