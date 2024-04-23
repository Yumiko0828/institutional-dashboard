import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { GradeService } from "./grade.service";
import { CreateGradeDto } from "./dto/create.dto";
import { UpdateGradeDto } from "./dto/update.dto";

@Controller("grade")
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Get()
  getAll() {
    return this.gradeService.getAll();
  }

  @Get("/:id")
  getById(@Param("id") id: string) {
    return this.gradeService.getById(id);
  }

  @Post()
  create(@Body() data: CreateGradeDto) {
    return this.gradeService.create(data);
  }

  @Patch("/:id")
  update(@Param("id") id: string, @Body() data: UpdateGradeDto) {
    return this.gradeService.update(id, data);
  }

  @Delete("/:id")
  delete(@Param("id") id: string) {
    return this.gradeService.delete(id);
  }
}
