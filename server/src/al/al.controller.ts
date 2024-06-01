import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AlService } from "./al.service";
import { AuthGuard } from "src/auth/auth.guard";
import { PermissionsGuard } from "src/auth/permissions/permissions.guard";
import {
  Permissions,
  PermsLevel,
} from "src/auth/permissions/permissions.decorator";
import { CreateAlDto } from "./dto/create.dto";

@Controller("al")
@UseGuards(AuthGuard, PermissionsGuard)
export class AlController {
  constructor(private readonly alService: AlService) {}

  @Get()
  retrieve() {
    return this.alService.retrieve();
  }

  @Post()
  @Permissions(PermsLevel.Admin)
  create(@Body() data: CreateAlDto) {
    return this.alService.create(data);
  }

  @Delete("/:id")
  @Permissions(PermsLevel.Admin)
  delete(@Param("id") id: string) {
    return this.alService.delete(id);
  }
}
