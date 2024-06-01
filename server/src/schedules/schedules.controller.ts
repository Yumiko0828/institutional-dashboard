import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { SchedulesService } from "./schedules.service";
import { AuthGuard } from "src/auth/auth.guard";
import { PermissionsGuard } from "src/auth/permissions/permissions.guard";
import {
  Permissions,
  PermsLevel,
} from "src/auth/permissions/permissions.decorator";
import { CreateScheduleDto } from "./dto/create.dto";

@Controller("schedules")
@UseGuards(AuthGuard, PermissionsGuard)
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get()
  getAll() {
    return this.schedulesService.retrieve();
  }

  @Post()
  @Permissions(PermsLevel.Admin)
  create(@Body() data: CreateScheduleDto) {
    return this.schedulesService.create(data);
  }

  @Delete("/:id")
  @Permissions(PermsLevel.Admin)
  delete(@Param("id") id: string) {
    return this.schedulesService.delete(id);
  }
}
