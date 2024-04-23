import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { LevelService } from "./level.service";
import { CreateLevelDto } from "./dto/create.dto";
import { UpdateLevelDto } from "./dto/update.dto";

@Controller("level")
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Get()
  getAll() {
    return this.levelService.getAll();
  }

  @Get("/:id")
  getById(@Param("id") id: string) {
    return this.levelService.getById(id);
  }

  @Post()
  create(@Body() data: CreateLevelDto) {
    return this.levelService.create(data);
  }

  @Patch("/:id")
  update(@Param("id") id: string, @Body() data: UpdateLevelDto) {
    return this.levelService.update(id, data);
  }

  @Delete("/:id")
  delete(@Param("id") id: string) {
    return this.levelService.delete(id);
  }
}
