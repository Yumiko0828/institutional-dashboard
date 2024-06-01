import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "src/auth/auth.guard";
import { PermissionsGuard } from "src/auth/permissions/permissions.guard";
import {
  Permissions,
  PermsLevel,
} from "src/auth/permissions/permissions.decorator";
import { CreateUserDto } from "./dto/create.dto";

@Controller("users")
@UseGuards(AuthGuard, PermissionsGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Post()
  @Permissions(PermsLevel.Admin)
  create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @Delete("/:id")
  @Permissions(PermsLevel.Admin)
  delete(@Param("id") id: string) {
    return this.usersService.delete(id);
  }
}
