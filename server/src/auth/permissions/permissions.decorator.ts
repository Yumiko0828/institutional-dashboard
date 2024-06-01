import { SetMetadata } from "@nestjs/common";

export enum PermsLevel {
  Guest = 0,
  Teacher,
  Admin,
}
export const PERMS_KEY = "permissions";
export const Permissions = (perms: PermsLevel) => SetMetadata(PERMS_KEY, perms);
