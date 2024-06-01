import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AssistanceService } from "./assistance.service";
import { CreateAssistanceDto } from "./dto/create.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { PermissionsGuard } from "src/auth/permissions/permissions.guard";
import {
  Permissions,
  PermsLevel,
} from "src/auth/permissions/permissions.decorator";

@Controller("assistance")
@UseGuards(AuthGuard, PermissionsGuard)
export class AssistanceController {
  constructor(private readonly assistanceService: AssistanceService) {}

  @Get("/:scheduleId")
  retrieve(@Param("scheduleId") scheduleId: string) {
    return this.assistanceService.retrieve(scheduleId);
  }

  @Post()
  @Permissions(PermsLevel.Teacher)
  create(@Body() data: CreateAssistanceDto) {
    return this.assistanceService.create(data);
  }
}
