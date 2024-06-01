import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { StudentsService } from "./students.service";
import { AuthGuard } from "src/auth/auth.guard";
import { PermissionsGuard } from "src/auth/permissions/permissions.guard";
import {
  Permissions,
  PermsLevel,
} from "src/auth/permissions/permissions.decorator";
import { RegisterStudentsDto } from "./dto/register.dto";
import { UpdateStudentDto } from "./dto/update.dto";

@Controller("students")
@UseGuards(AuthGuard, PermissionsGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  getAll(
    @Query("grade", ParseIntPipe) grade: number,
    @Query("section") section: string,
    @Query("page", ParseIntPipe) page: number,
  ) {
    return this.studentsService.getAll(grade, section, page);
  }

  @Post()
  @Permissions(PermsLevel.Admin)
  register(@Body() data: RegisterStudentsDto) {
    return this.studentsService.register(data);
  }

  @Patch("/:id")
  @Permissions(PermsLevel.Admin)
  update(@Param("id") id: string, @Body() data: UpdateStudentDto) {
    return this.studentsService.update(id, data);
  }

  @Delete("/:id")
  @Permissions(PermsLevel.Admin)
  delete(@Param("id") id: string) {
    return this.studentsService.delete(id);
  }
}
