import { Controller, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserType } from "./userType.decorator";
import { UserTypeGuard } from "./userType.guard";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("users")
@UseGuards(AuthGuard, UserTypeGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UserType("Admin")
  create() {}
}
