import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { GradeService } from "./grade.service";
import { CreateGradeDto } from "./dto/create.dto";
import { UpdateGradeDto } from "./dto/update.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { PermissionsGuard } from "src/auth/permissions/permissions.guard";
import {
  Permissions,
  PermsLevel,
} from "src/auth/permissions/permissions.decorator";

@Controller("grades")
@UseGuards(AuthGuard, PermissionsGuard)
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Get()
  retrieve() {
    return this.gradeService.retrieve();
  }

  @Get("/:id")
  retrieveOne(@Param("id") id: string) {
    return this.gradeService.retrieveOne(id);
  }

  @Post()
  @Permissions(PermsLevel.Admin)
  create(@Body() data: CreateGradeDto) {
    return this.gradeService.create(data);
  }

  @Patch("/:id")
  @Permissions(PermsLevel.Admin)
  update(@Param("id") id: string, @Body() data: UpdateGradeDto) {
    return this.gradeService.update(id, data);
  }

  @Delete("/:id")
  @Permissions(PermsLevel.Admin)
  delete(@Param("id") id: string) {
    return this.gradeService.delete(id);
  }
}
